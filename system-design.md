# C91 Merchant Verification System - System Design

## Overview

The C91 Merchant Verification System is a React-based web application designed for managing merchant verification processes, case management, and risk assessment workflows. The system provides a comprehensive platform for banks and financial institutions to verify merchant applications, manage portfolios, and configure risk settings.

## Architecture Overview

### Technology Stack

- **Frontend Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.2
- **State Management**: Redux Toolkit 2.9.0
- **Routing**: React Router DOM 7.8.2
- **UI Components**: Radix UI primitives with custom styling
- **Styling**: Tailwind CSS 3.4.17
- **Form Management**: React Hook Form 7.62.0 with Zod validation
- **HTTP Client**: Axios 1.11.0
- **Storage**: React Secure Storage 1.3.2
- **Charts**: Recharts 2.15.4
- **Icons**: Lucide React 0.542.0

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        Frontend Application Layer                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │   React     │  │   Redux     │  │   Router    │  │   Error     │      │
│  │ Components  │  │   Store     │  │   System    │  │ Boundaries  │      │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘      │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │   API       │  │   Secure    │  │   Form      │  │   Cache     │      │
│  │  Service    │  │  Storage    │  │ Validation  │  │  Manager    │      │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘      │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │   Theme     │  │   I18n      │  │   Analytics │  │   Testing   │      │
│  │  Provider   │  │   System    │  │   & Logging │  │   Utils     │      │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘      │
└─────────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        Backend API Layer                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │   Auth      │  │   Merchant  │  │   Risk      │  │   Audit     │      │
│  │  Service    │  │   Service   │  │   Engine    │  │   Service   │      │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Component Interaction Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   User      │───▶│   Router    │───▶│  Layout     │
│ Interaction │    │   Guard     │    │ Component   │
└─────────────┘    └─────────────┘    └─────────────┘
                           │                   │
                           ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Error     │◀───│   Redux     │◀───│   Page      │
│ Boundary    │    │   Store     │    │ Component   │
└─────────────┘    └─────────────┘    └─────────────┘
                           │                   │
                           ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Cache     │◀───│   API       │◀───│   Form      │
│   Layer     │    │  Service    │    │ Validation  │
└─────────────┘    └─────────────┘    └─────────────┘
```

## Project Structure

### Core Directories

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (Radix UI based)
│   ├── MerchantVerification/  # Merchant-specific components
│   ├── Header.tsx       # Application header
│   ├── Sidebar.tsx      # Navigation sidebar
│   ├── Footer.tsx       # Application footer
│   └── ...
├── pages/               # Page-level components
│   ├── Dashboard.tsx
│   ├── CaseManagement.tsx
│   ├── MerchantPortfolio.tsx
│   ├── WorkflowRules.tsx
│   ├── RiskSettings.tsx
│   └── LoginPage.tsx
├── layouts/             # Layout components
│   ├── MainLayout.tsx   # Authenticated layout
│   └── AuthLayout.tsx   # Authentication layout
├── store/               # Redux store configuration
│   ├── actions/         # Redux actions
│   ├── reducers/        # Redux reducers
│   └── store.ts         # Store configuration
├── services/            # API services
│   └── apiService.ts    # Axios configuration
├── types/               # TypeScript type definitions
├── constants/           # Application constants
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
└── routes/              # Routing configuration
```

## Component Architecture

### Layout System

#### MainLayout
- **Purpose**: Main application layout for authenticated users
- **Features**:
  - Header with user information and navigation
  - Sidebar with main navigation menu
  - Main content area with outlet for page components
  - Footer with application information
  - Scroll-based header styling
  - Authentication state management

#### AuthLayout
- **Purpose**: Layout for authentication pages
- **Features**:
  - Simple layout for login/authentication
  - Redirects authenticated users to main app
  - Loading state management

### Core Components

#### Header Component
- **Location**: `src/components/Header.tsx`
- **Features**:
  - User profile dropdown
  - Notification system
  - Logout functionality
  - Responsive design

#### Sidebar Component
- **Location**: `src/components/Sidebar.tsx`
- **Features**:
  - Navigation menu with icons
  - Active route highlighting
  - Collapsible design
  - Role-based menu items

#### MerchantVerification Component
- **Location**: `src/components/MerchantVerification/MerchantVerification.tsx`
- **Purpose**: Core merchant verification form
- **Features**:
  - Multi-step form with validation
  - Document upload functionality
  - Real-time form validation
  - Integration with merchant application schema

## State Management

### Redux Store Structure

```typescript
interface RootState {
  auth: AuthState;
  caseManagement: CaseManagementState;
  merchantPortfolio: MerchantPortfolioState;
  workflowRules: WorkflowRulesState;
}
```

### State Slices

#### Auth State
- **Purpose**: User authentication and authorization
- **Actions**:
  - `loginUser`: User login with credentials
  - `logoutUser`: User logout and session cleanup
  - `userDetails`: Fetch user profile information
- **State Properties**:
  - `isAuthenticated`: Authentication status
  - `users`: User profile data
  - `permissions`: User permissions
  - `loading`: Loading states

#### Case Management State
- **Purpose**: Merchant application case management
- **Actions**:
  - `getCaseManagement`: Fetch merchant applications
- **State Properties**:
  - `applications`: List of merchant applications
  - `loading`: Loading states
  - `error`: Error states

#### Merchant Portfolio State
- **Purpose**: Merchant portfolio management
- **Actions**:
  - `getMerchantPortfolio`: Fetch merchant portfolio data
- **State Properties**:
  - `portfolio`: Merchant portfolio data
  - `loading`: Loading states
  - `error`: Error states

#### Workflow Rules State
- **Purpose**: Workflow and rule configuration
- **Actions**:
  - `getWorkflowRules`: Fetch workflow rules
- **State Properties**:
  - `rules`: Workflow rules data
  - `loading`: Loading states
  - `error`: Error states

## API Service Architecture

### API Client Configuration

#### Base Configuration
- **Location**: `src/services/apiService.ts`
- **Features**:
  - Axios instance with base URL configuration
  - Request/response interceptors
  - Dynamic API key injection
  - Global error handling
  - 401 unauthorized handling with redirect

#### Security Features
- **API Key Management**: Secure storage and dynamic injection
- **Request Interceptors**: Automatic authorization header injection
- **Response Interceptors**: Global error handling and session management
- **Secure Storage**: React Secure Storage for sensitive data

### API Endpoints

#### Authentication Endpoints
- `POST /login`: User authentication
- `GET /user`: User profile information

#### Merchant Management Endpoints
- `GET /merchants`: Merchant applications list
- `POST /merchants`: Create merchant application
- `PUT /merchants/:id`: Update merchant application
- `GET /merchants/:id`: Get merchant details

## Data Models

### Merchant Application Schema

```typescript
interface MerchantApplicationSchema {
  officialName: string;
  mobileNumber: string;
  panNumber: string;
  gstNumber?: string;
  shopEstablishment?: string;
  udhyamCertificate?: string;
  declaredMCC?: string;
  merchantUrl?: string;
  userConsent: boolean;
  hasOfflineStores?: boolean;
  storeLocation?: string;
  storefrontImagePath?: string;
  brandName?: string;
}
```

### User Schema

```typescript
interface User {
  userId: string;
  name: string;
  mobile: string;
  email: string;
  bankId: string;
  role: string;
  permissions: Permission[];
}
```

## Routing System

### Route Structure

```
/ (MainLayout)
├── / (Dashboard)
├── /case-management (CaseManagement)
├── /merchant-portfolio (MerchantPortfolio)
├── /workflow-rules (WorkflowRules)
└── /settings (Settings)
    ├── /risk-settings (RiskSettings)
    └── /configure-risk-settings (ConfigureRiskSettings)

/login (AuthLayout)
└── / (LoginPage)

/* (NotFound)
```

### Route Protection
- **Authentication Guard**: MainLayout checks authentication status
- **Redirect Logic**: Unauthenticated users redirected to login
- **Role-based Access**: Future implementation for role-based routing

## Form Management

### Form Validation
- **Library**: React Hook Form with Zod validation
- **Schema-based**: Type-safe form validation
- **Real-time Validation**: Immediate feedback on form errors
- **Custom Validators**: Business-specific validation rules

### Form Components
- **MerchantVerification**: Multi-step merchant application form
- **LoginForm**: User authentication form
- **RiskSettings**: Risk configuration forms

## UI Component System

### Design System
- **Base Components**: Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **Theme**: Consistent color palette and typography
- **Responsive**: Mobile-first responsive design

### Component Categories

#### Form Components
- Input, Textarea, Select, Checkbox, Radio
- Form validation and error handling
- Custom form field components

#### Layout Components
- Card, Dialog, Sheet, Drawer
- Navigation components
- Layout containers

#### Data Display
- Table, Badge, Avatar, Progress
- Chart components (Recharts integration)
- Status indicators

#### Feedback Components
- Toast notifications (Sonner)
- Loading states
- Error boundaries

## Error Handling & Resilience

### Error Boundary Implementation
- **Global Error Boundary**: Catches unhandled errors at the application level
- **Route-level Boundaries**: Isolates errors within specific routes
- **Component-level Boundaries**: Handles errors in individual components
- **Error Recovery**: Provides fallback UI and recovery mechanisms

### Error Types & Handling
```typescript
interface ErrorState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
  lastRetryTime: number;
}
```

### Error Reporting
- **Client-side Logging**: Structured error logging with context
- **Error Aggregation**: Centralized error collection and analysis
- **User-friendly Messages**: Contextual error messages for users
- **Developer Debugging**: Detailed error information for development

## Testing Strategy

### Testing Framework
- **Unit Testing**: Jest with React Testing Library
- **Integration Testing**: Component interaction testing
- **E2E Testing**: Playwright for end-to-end scenarios
- **Visual Testing**: Storybook for component visual testing

### Test Coverage Areas
- **Component Logic**: Business logic and user interactions
- **API Integration**: Mock API responses and error scenarios
- **Form Validation**: Input validation and error handling
- **Authentication Flow**: Login, logout, and session management
- **Routing**: Navigation and route protection

### Testing Utilities
```typescript
// Test utilities for common scenarios
export const renderWithProviders = (ui: ReactElement) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    ),
  });
};
```

## Caching Strategy

### Client-side Caching
- **Redux Persist**: State persistence across sessions
- **API Response Caching**: Intelligent caching of API responses
- **Component Memoization**: React.memo and useMemo optimization
- **Asset Caching**: Static asset caching strategies

### Cache Management
```typescript
interface CacheConfig {
  ttl: number; // Time to live in milliseconds
  maxSize: number; // Maximum cache size
  strategy: 'lru' | 'fifo' | 'ttl'; // Cache eviction strategy
}
```

### Cache Invalidation
- **Time-based**: Automatic expiration after TTL
- **Event-based**: Invalidation on specific events
- **Manual**: Programmatic cache clearing
- **Selective**: Targeted cache invalidation

## Accessibility (A11y) Implementation

### WCAG Compliance
- **Level AA Compliance**: Meets WCAG 2.1 AA standards
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: ARIA labels and descriptions
- **Color Contrast**: Sufficient color contrast ratios

### Accessibility Features
- **Focus Management**: Proper focus handling and indicators
- **Semantic HTML**: Meaningful HTML structure
- **Alternative Text**: Descriptive alt text for images
- **Form Labels**: Proper form labeling and associations

### Accessibility Testing
- **Automated Testing**: axe-core integration
- **Manual Testing**: Screen reader and keyboard testing
- **User Testing**: Testing with users with disabilities
- **Continuous Monitoring**: Ongoing accessibility audits

## Security Implementation

### Authentication Flow
1. User submits login credentials
2. API validates credentials
3. JWT token received and stored securely
4. Token included in subsequent requests
5. Automatic logout on token expiration

### Data Protection
- **Secure Storage**: Sensitive data encrypted in localStorage
- **API Key Management**: Dynamic injection of API keys
- **HTTPS**: All API communications over HTTPS
- **Input Validation**: Client and server-side validation

### Security Headers
- **CSP**: Content Security Policy implementation
- **HSTS**: HTTP Strict Transport Security
- **X-Frame-Options**: Clickjacking protection
- **X-Content-Type-Options**: MIME type sniffing protection

### Security Best Practices
- **Input Sanitization**: XSS prevention
- **CSRF Protection**: Cross-site request forgery prevention
- **Rate Limiting**: API rate limiting implementation
- **Audit Logging**: Security event logging

## Performance Optimizations

### Code Splitting & Lazy Loading
- **Route-based**: Lazy loading of page components
- **Component-based**: Dynamic imports for heavy components
- **Bundle Optimization**: Vite build optimization with tree shaking
- **Preloading**: Strategic preloading of critical resources

### State Management Optimization
- **Redux Toolkit**: Optimized state updates with Immer
- **Memoization**: React.memo for expensive components
- **Selective Updates**: Precise state subscriptions with useSelector
- **Normalized State**: Efficient data structure for complex state

### Asset Optimization
- **Image Optimization**: WebP format with fallbacks
- **Font Loading**: Efficient font loading strategies
- **CSS Optimization**: Tailwind CSS purging and minification
- **Bundle Analysis**: Regular bundle size monitoring

### Runtime Performance
- **Virtual Scrolling**: For large data sets
- **Debouncing**: Input and API call debouncing
- **Throttling**: Scroll and resize event throttling
- **Web Workers**: CPU-intensive tasks offloading

### Performance Monitoring
- **Core Web Vitals**: LCP, FID, CLS tracking
- **Bundle Analysis**: Webpack Bundle Analyzer
- **Performance Budgets**: Automated performance checks
- **Real User Monitoring**: Production performance tracking

## Development Workflow

### Build System
- **Vite**: Fast development server and build tool
- **TypeScript**: Type safety and development experience
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting and style consistency
- **Hot Reload**: Instant development feedback

### Code Organization
- **Feature-based**: Components organized by feature
- **Shared Components**: Reusable UI components
- **Type Safety**: Comprehensive TypeScript coverage
- **Documentation**: Inline code documentation
- **Code Standards**: Consistent coding patterns and conventions

### Development Tools
- **Storybook**: Component development and documentation
- **React DevTools**: Component debugging and profiling
- **Redux DevTools**: State management debugging
- **VS Code Extensions**: Development environment optimization

### Quality Assurance
- **Pre-commit Hooks**: Automated code quality checks
- **CI/CD Pipeline**: Automated testing and deployment
- **Code Reviews**: Peer review process
- **Static Analysis**: Automated code analysis

## Deployment Considerations

### Environment Configuration
- **Environment Variables**: API endpoints and configuration
- **Build Optimization**: Production build optimization
- **Asset Management**: Static asset optimization
- **Feature Flags**: Environment-specific feature toggles

### Deployment Strategy
- **Blue-Green Deployment**: Zero-downtime deployments
- **Canary Releases**: Gradual rollout of new features
- **Rollback Strategy**: Quick rollback capabilities
- **Health Checks**: Application health monitoring

### Infrastructure
- **CDN Integration**: Global content delivery
- **Load Balancing**: Traffic distribution
- **Auto-scaling**: Dynamic resource allocation
- **Monitoring**: Application and infrastructure monitoring

### Browser Support
- **Modern Browsers**: ES6+ support required
- **Progressive Enhancement**: Graceful degradation
- **Polyfills**: Legacy browser support
- **Accessibility**: WCAG compliance considerations

## Future Enhancements

### Planned Features
- **Real-time Updates**: WebSocket integration for live data
- **Advanced Analytics**: Enhanced reporting and dashboard capabilities
- **Mobile App**: React Native mobile application
- **API Integration**: Additional third-party integrations
- **AI/ML Integration**: Machine learning for risk assessment
- **Multi-language Support**: Internationalization (i18n)

### Scalability Considerations
- **Microservices**: Backend service decomposition
- **Caching Strategy**: Redis-based caching with intelligent invalidation
- **CDN Integration**: Global static asset delivery optimization
- **Database Optimization**: Query optimization and indexing
- **Horizontal Scaling**: Load distribution across multiple instances
- **Event-driven Architecture**: Asynchronous processing capabilities

### Technology Upgrades
- **React 19 Features**: Leveraging latest React capabilities
- **TypeScript 5.0+**: Enhanced type safety and performance
- **Vite 5.0+**: Improved build performance and features
- **Modern CSS**: CSS-in-JS or CSS Modules for better styling

## Monitoring and Analytics

### Application Monitoring
- **Error Tracking**: Client-side error monitoring with Sentry
- **Performance Monitoring**: Core Web Vitals tracking
- **User Analytics**: User behavior tracking with Google Analytics
- **API Monitoring**: Request/response monitoring and alerting
- **Real User Monitoring**: Production performance tracking

### Business Metrics
- **Merchant Verification**: Success rates and processing times
- **User Engagement**: Feature usage analytics and heatmaps
- **System Performance**: Response times and availability
- **Security Metrics**: Authentication and authorization events
- **Conversion Funnels**: User journey and conversion tracking

### Alerting and Notifications
- **Error Alerts**: Critical error notifications
- **Performance Alerts**: Performance degradation warnings
- **Security Alerts**: Suspicious activity notifications
- **Business Alerts**: Key business metric thresholds

### Logging Strategy
- **Structured Logging**: JSON-formatted logs for analysis
- **Log Aggregation**: Centralized log collection and analysis
- **Log Retention**: Appropriate log retention policies
- **Privacy Compliance**: GDPR-compliant logging practices

## Implementation Patterns & Best Practices

### Component Design Patterns
- **Container/Presentational Pattern**: Separation of logic and presentation
- **Compound Components**: Flexible component composition
- **Render Props**: Dynamic component behavior
- **Custom Hooks**: Reusable stateful logic

### State Management Patterns
- **Normalized State**: Efficient data structure for complex state
- **Selective Subscriptions**: Optimized Redux selectors
- **Async State Handling**: Proper loading and error states
- **State Persistence**: Strategic state persistence

### API Integration Patterns
- **Service Layer**: Centralized API logic
- **Request/Response Interceptors**: Global API handling
- **Error Boundary Integration**: API error handling
- **Caching Strategy**: Intelligent data caching

### Performance Patterns
- **Lazy Loading**: On-demand component loading
- **Memoization**: Strategic component and value memoization
- **Virtualization**: Efficient large list rendering
- **Debouncing/Throttling**: Optimized event handling

## Conclusion

The C91 Merchant Verification System is a well-architected React application that provides a comprehensive platform for merchant verification and management. The system leverages modern web technologies, follows best practices for security and performance, and provides a scalable foundation for future enhancements.

### Key Strengths
- **Modern Architecture**: React 19 with TypeScript and Redux Toolkit
- **Comprehensive Testing**: Unit, integration, and E2E testing strategies
- **Security First**: Robust authentication and data protection
- **Performance Optimized**: Code splitting, caching, and monitoring
- **Accessibility Compliant**: WCAG 2.1 AA compliance
- **Developer Experience**: Excellent tooling and development workflow

### Enterprise Readiness
The modular architecture, comprehensive state management, and robust security implementation make it suitable for enterprise-level banking and financial services applications. The system's design prioritizes user experience, maintainability, and scalability while ensuring data security and regulatory compliance.

### Future-Proof Design
The system is designed with future enhancements in mind, including real-time capabilities, AI/ML integration, and mobile application support. The architecture supports horizontal scaling and can adapt to changing business requirements.
