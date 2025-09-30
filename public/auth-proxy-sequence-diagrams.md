# Card91 Authentication Proxy - Sequence Diagrams

## Overview

This document contains detailed sequence diagrams for the Card91 Authentication Proxy (C91 Auth Proxy) using the **Option 1: Thin Authentication Service** approach with **simplified RBAC claims** where UI rendering logic is based on the same permissions used for API authorization. This architecture implements federated authentication through Cloud IAM services with custom attributes support.

## Key Architectural Principles

- **Single Source of Truth**: One permission system for both UI and API
- **Consistency**: What users see = what they can do
- **Two-Token System**: Identity JWT (from Auth Proxy) + Service/Portal JWT (from Microservice)
- **Business Logic Permissions**: Permissions named after business capabilities (e.g., `cards.read`, `cards.create`)
- **Federated Authentication**: Users authenticate with Bank/FI IdP, never with C91 directly
- **Custom Attributes Support**: Bank-defined attributes flow through tokens to microservices
- **Distributed Authorization**: Each microservice manages its own RBAC with custom attribute rules

---

## 1. Initial Web Portal Login Flow

```mermaid
sequenceDiagram
    participant U as User
    participant B as Browser
    participant Portal as Web Portal
    participant AuthProxy as C91 Auth Proxy
    participant Cognito as AWS Cognito
    participant IdP as Bank IdP
    participant MS as Microservice
    participant DB as Service DB

    U->>B: Access portal URL
    B->>Portal: GET /portal
    Portal->>B: Redirect to Auth Proxy
    B->>AuthProxy: GET /auth/login
    AuthProxy->>B: Redirect to Cognito
    B->>Cognito: Authenticate
    Cognito->>IdP: SAML/OIDC Request
    IdP->>U: Bank login page
    U->>IdP: Enter credentials
    IdP->>Cognito: SAML Response (success)
    Cognito->>B: Authorization code
    B->>AuthProxy: Authorization code
    AuthProxy->>Cognito: Exchange code for tokens
    Cognito->>AuthProxy: ID token + Access token
    AuthProxy->>Cognito: Fetch user info + custom attributes from Cloud IAM
    Cognito->>AuthProxy: User info with Cloud IAM custom attributes
    AuthProxy->>AuthProxy: Generate Identity JWT<br/>(minimal claims + custom attributes)
    AuthProxy->>B: Set secure cookies + Identity JWT
    B->>Portal: Access portal with Identity JWT
    
    Note over Portal,DB: Portal needs full permissions for UI rendering
    
    Portal->>MS: POST /auth/portal-token<br/>Authorization: Bearer {Identity JWT}
    MS->>MS: Validate Identity JWT signature<br/>Extract user context + Cloud IAM custom attributes
    MS->>DB: Query user permissions<br/>SELECT permissions FROM user_roles...
    DB->>MS: User permissions list
    MS->>MS: Apply Cloud IAM custom attribute rules<br/>Generate Portal JWT (permissions + custom attributes)
    MS->>Portal: Portal JWT + User profile
    Portal->>Portal: Parse JWT permissions<br/>Render UI based on permissions
    Portal->>B: Display personalized dashboard
```

**Key Points:**
- User authenticates through federated identity (Bank IdP → Cognito → Auth Proxy)
- Auth Proxy fetches custom attributes from Cloud IAM layer and includes them in Identity JWT
- Portal exchanges Identity JWT for Portal JWT containing full RBAC permissions + Cloud IAM custom attributes
- Microservices apply business rules based on Cloud IAM custom attributes (department, grade, branch, etc.)
- UI renders based on same permissions that control API access

---

## 2. Subsequent Portal Usage (Cached Permissions)

```mermaid
sequenceDiagram
    participant U as User
    participant B as Browser  
    participant Portal as Web Portal
    participant MS as Microservice

    U->>B: Navigate to Cards section
    B->>Portal: Route change to /cards
    Portal->>Portal: Check permissions in JWT<br/>hasPermission('cards.read')?
    
    alt Has cards.read permission
        Portal->>Portal: Render Cards dashboard<br/>Check specific action permissions:
        Portal->>Portal: canCreateCards() -> hasPermission('cards.create')
        Portal->>Portal: canExportData() -> hasPermission('cards.batch.view')  
        Portal->>Portal: Show/hide buttons accordingly
        Portal->>B: Display Cards UI
        
        Note over U,MS: User clicks "Create Card" button
        
        U->>B: Click Create Card
        B->>Portal: Handle create action
        Portal->>MS: POST /api/v1/cards<br/>Authorization: Bearer {Portal JWT}
        MS->>MS: Validate Portal JWT<br/>Check hasPermission('cards.create')
        MS->>MS: Execute business logic
        MS->>Portal: Success response
        Portal->>B: Update UI
        
    else No cards.read permission
        Portal->>B: Show "Access Denied" or redirect
    end
```

**Key Points:**
- UI navigation and element visibility based on JWT permissions
- Same permission check (`cards.create`) used for both button visibility and API call authorization
- No separate UI permission system - direct mapping from API permissions to UI elements

---

## 3. Token Refresh Flow

```mermaid
sequenceDiagram
    participant B as Browser
    participant Portal as Web Portal
    participant AuthProxy as C91 Auth Proxy
    participant MS as Microservice

    B->>Portal: API call with Portal JWT
    Portal->>MS: API request
    MS->>MS: Validate Portal JWT
    MS->>Portal: 401 Unauthorized (token expired)
    
    Portal->>Portal: Check Identity JWT expiry
    
    alt Identity JWT still valid
        Portal->>MS: POST /auth/portal-token<br/>Authorization: Bearer {Identity JWT}
        MS->>MS: Validate Identity JWT
        MS->>MS: Refresh user permissions from DB
        MS->>Portal: New Portal JWT
        Portal->>Portal: Update stored token<br/>Refresh UI permissions
        Portal->>MS: Retry original API call
        MS->>Portal: Success response
        
    else Identity JWT also expired  
        Portal->>AuthProxy: POST /auth/refresh<br/>(using refresh token)
        AuthProxy->>Portal: New Identity JWT
        Portal->>MS: POST /auth/portal-token<br/>Authorization: Bearer {New Identity JWT}
        MS->>Portal: New Portal JWT  
        Portal->>Portal: Update tokens & UI
        Portal->>MS: Retry original API call
        MS->>Portal: Success response
        
    else Refresh failed
        Portal->>B: Redirect to login page
    end
```

**Key Points:**
- Graceful token refresh without user intervention
- UI permissions automatically updated when new Portal JWT is issued
- Fallback to re-authentication if refresh fails

---

## 4. API Client Authentication Flow (Non-Portal)

```mermaid
sequenceDiagram
    participant Client as API Client
    participant AuthProxy as C91 Auth Proxy  
    participant Cognito as AWS Cognito
    participant MS as Microservice
    participant DB as Service DB

    Client->>AuthProxy: POST /auth/token<br/>{client_id, client_secret, grant_type}
    AuthProxy->>Cognito: Validate service account
    Cognito->>AuthProxy: Access token + user info
    AuthProxy->>AuthProxy: Generate Identity JWT<br/>(service account context)
    AuthProxy->>Client: Identity JWT
    
    Note over Client,DB: Client needs service token for API calls
    
    Client->>MS: POST /auth/service-token<br/>Authorization: Bearer {Identity JWT}
    MS->>MS: Validate Identity JWT
    MS->>DB: Query service account permissions
    DB->>MS: Service permissions
    MS->>MS: Generate Service JWT<br/>(long-lived, 90 days)
    MS->>Client: Service JWT
    
    Note over Client,MS: Subsequent API calls use Service JWT
    
    Client->>MS: GET /api/v1/cards<br/>Authorization: Bearer {Service JWT}
    MS->>MS: Validate Service JWT<br/>Check permissions locally
    MS->>Client: Cards data
```

**Key Points:**
- API clients follow same two-token pattern as portal
- Service accounts get long-lived Service JWTs for M2M communication
- Same permission validation logic for both portal and API clients

---

## 5. Cross-Service Communication Flow

```mermaid
sequenceDiagram
    participant Portal as Web Portal
    participant CardsMS as Cards Microservice  
    participant LoansMS as Loans Microservice
    participant ReportsMS as Reports Microservice

    Portal->>CardsMS: GET /api/v1/cards/summary<br/>Authorization: Bearer {Portal JWT}
    CardsMS->>CardsMS: Validate Portal JWT<br/>Extract user context
    
    Note over CardsMS,ReportsMS: Cards service needs data from other services
    
    CardsMS->>CardsMS: Generate delegation token<br/>for Reports service (5 min expiry)
    CardsMS->>ReportsMS: GET /api/v1/reports/cards-metrics<br/>Authorization: Bearer {Delegation JWT}
    ReportsMS->>ReportsMS: Validate delegation token<br/>Check original user permissions
    ReportsMS->>CardsMS: Metrics data
    
    CardsMS->>CardsMS: Generate delegation token<br/>for Loans service
    CardsMS->>LoansMS: GET /api/v1/loans/customer-summary<br/>Authorization: Bearer {Delegation JWT}
    LoansMS->>LoansMS: Validate delegation token
    LoansMS->>CardsMS: Customer loan summary
    
    CardsMS->>CardsMS: Aggregate data from all services
    CardsMS->>Portal: Combined summary response
```

**Key Points:**
- Services can delegate user context to other services using short-lived delegation tokens
- Original user permissions are preserved across service boundaries
- Enables secure cross-service communication while maintaining user context

---

## 6. Permission Changes Propagation

```mermaid
sequenceDiagram
    participant Admin as Admin User
    participant AdminPortal as Admin Portal
    participant IAMMS as IAM Microservice
    participant CardsMS as Cards Microservice
    participant Cache as Redis Cache
    participant EventBus as Event Bus (Kafka)

    Admin->>AdminPortal: Update user permissions
    AdminPortal->>IAMMS: PUT /api/v1/users/{userId}/permissions
    IAMMS->>IAMMS: Update user permissions in DB<br/>Increment permission_version
    IAMMS->>EventBus: Publish user.permissions.updated
    IAMMS->>Cache: Invalidate user permission cache
    IAMMS->>AdminPortal: Success response
    
    Note over EventBus,CardsMS: Other services listen to permission changes
    
    EventBus->>CardsMS: user.permissions.updated event
    CardsMS->>Cache: Invalidate user's service tokens<br/>Add to token revocation list
    CardsMS->>CardsMS: Next API call will require<br/>new portal token (with updated permissions)
    
    Note over Admin,CardsMS: User's next portal interaction
    
    Admin->>AdminPortal: Refresh page or navigate
    AdminPortal->>CardsMS: API call with old Portal JWT
    CardsMS->>CardsMS: Check token version vs current<br/>user permission version
    CardsMS->>AdminPortal: 401 Unauthorized (stale permissions)
    AdminPortal->>CardsMS: POST /auth/portal-token<br/>(get fresh token)
    CardsMS->>AdminPortal: New Portal JWT (updated permissions)
    AdminPortal->>AdminPortal: Update UI based on new permissions
```

**Key Points:**
- Real-time permission changes propagated via event bus
- Token versioning prevents use of stale permissions
- UI automatically updates when permissions change

---

## Token Structures

### Identity JWT (from C91 Auth Proxy)
```json
{
  "sub": "user-123",
  "tenant": "hdfc",
  "email": "user@hdfcbank.com",
  "name": "John Doe",
  "external_id": "emp-456",
  "iss": "c91-auth",
  "aud": "c91-services",
  "exp": 1643724300,
  "token_type": "identity",
  "custom_attributes": {
    "department": "retail-banking",
    "branch_code": "BOM001",
    "employee_grade": "M3",
    "cost_center": "CC-1234",
    "reporting_manager": "manager-789",
    "authorized_products": ["cards", "loans"],
    "risk_level": "low"
  }
}
```

### Portal/Service JWT (from Microservice)
```json
{
  "sub": "user-123",
  "tenant": "hdfc",
  "email": "user@hdfcbank.com",
  "name": "John Doe",
  "iss": "cards-service",
  "aud": "cards-portal",
  "exp": 1643727900,
  "token_type": "portal_authorization",
  
  "permissions": [
    "cards.read",
    "cards.create", 
    "cards.update",
    "cards.batch.view",
    "reports.cards.view"
  ],
  
  "roles": ["CARD_OPERATOR"],
  
  "context": {
    "branch_codes": ["BOM001", "BOM002"],
    "product_access": ["credit", "debit"],
    "max_transaction_limit": 100000
  },
  
  "custom_attributes": {
    "department": "retail-banking",
    "branch_code": "BOM001",
    "employee_grade": "M3",
    "cost_center": "CC-1234",
    "reporting_manager": "manager-789",
    "authorized_products": ["cards", "loans"],
    "risk_level": "low"
  },
  
  "permission_version": 5
}
```

## Permission Naming Convention

```yaml
Permission Structure: {resource}.{action}

Examples:
  cards.read          # Can view cards
  cards.create        # Can create new cards  
  cards.update        # Can modify existing cards
  cards.delete        # Can delete cards
  cards.batch.view    # Can export/view batch operations
  
  reports.cards.view  # Can view card reports
  reports.cards.export # Can export reports
  
  admin.users.read    # Can view user management
  admin.users.create  # Can create users
  admin.roles.manage  # Can manage roles and permissions
```

---

## Custom Attributes Usage Examples

The C91 Auth Proxy architecture enables rich business logic through custom attributes **defined and managed entirely in the Cloud IAM layer** (AWS Cognito/Azure AD B2C), **not in C91 systems**:

### Common Custom Attributes (Defined in Cloud IAM)
- `department`: "retail-banking", "corporate-banking", "treasury" *(Cloud IAM: custom:department)*
- `branch_code`: "BOM001", "DEL002", "CHN003" *(Cloud IAM: custom:branch_code)*
- `employee_grade`: "M1", "M2", "M3", "M4" (Manager levels) *(Cloud IAM: custom:employee_grade)*
- `cost_center`: "CC-1234", "CC-5678" *(Cloud IAM: custom:cost_center)*
- `reporting_manager`: "manager-789" *(Cloud IAM: custom:reporting_manager)*
- `authorized_products`: ["cards", "loans", "deposits"] *(Cloud IAM: custom:authorized_products)*
- `risk_level`: "low", "medium", "high" *(Cloud IAM: custom:risk_level)*

**Note**: All these attributes are stored and managed in the Cloud IAM layer, not in C91 databases.

### Business Rules Examples
- **Branch-based Access**: Users can only see data for their assigned branch
- **Grade-based Permissions**: M3+ managers get batch approval rights
- **Product Authorization**: Users can only access products they're authorized for
- **Risk-based Restrictions**: High-risk users can't perform bulk operations
- **Department Routing**: Different workflows for retail vs corporate banking

---

## Summary

These sequence diagrams illustrate a clean, decoupled authentication architecture where:

1. **Authentication is centralized** through C91 Auth Proxy and cloud IAM services
2. **Authorization is distributed** with each microservice managing its own RBAC
3. **UI and API permissions are unified** - same permission strings control both visibility and access
4. **Token lifecycle is managed** through a two-token system providing both identity and authorization
5. **Cross-service communication** is enabled through delegation tokens
6. **Permission changes propagate** in real-time through event-driven architecture
7. **Custom attributes enable** sophisticated business rules and fine-grained access control
8. **Federated authentication** ensures users authenticate only with their bank/FI, never with C91

This approach provides the flexibility and autonomy that existing microservices need while maintaining security, consistency, and a great user experience. The custom attributes support enables banks to implement their own business rules without code changes in the C91 platform.