# shadcn/ui Components

This project includes all the essential shadcn/ui components. Here's a comprehensive list of what's available:

## Layout Components

- **Accordion** - Collapsible content sections
- **Aspect Ratio** - Maintains aspect ratio for responsive content
- **Card** - Container with header, content, and footer
- **Collapsible** - Expandable/collapsible content
- **Resizable** - Resizable panels and layouts
- **Scroll Area** - Custom scrollable areas with styled scrollbars
- **Separator** - Visual dividers between content
- **Sheet** - Slide-out panels from screen edges
- **Sidebar** - Collapsible sidebar navigation
- **Skeleton** - Loading placeholders

## Navigation Components

- **Breadcrumb** - Navigation breadcrumbs
- **Command** - Command palette and search interface
- **Context Menu** - Right-click context menus
- **Dropdown Menu** - Dropdown menus with various item types
- **Menubar** - Horizontal menu bars
- **Navigation Menu** - Multi-level navigation menus
- **Tabs** - Tabbed content interface

## Form Components

- **Button** - Various button styles and variants
- **Checkbox** - Checkbox inputs
- **Form** - Form handling with React Hook Form
- **Input** - Text input fields
- **Label** - Form labels
- **Radio Group** - Radio button groups
- **Select** - Dropdown select inputs
- **Slider** - Range slider inputs
- **Switch** - Toggle switches
- **Textarea** - Multi-line text inputs
- **Toggle** - Toggle buttons

## Data Display Components

- **Alert** - Alert messages
- **Alert Dialog** - Confirmation dialogs
- **Avatar** - User avatars and images
- **Badge** - Status badges and labels
- **Calendar** - Date picker calendar
- **Carousel** - Image/content carousel
- **Chart** - Data visualization charts
- **Hover Card** - Hover-triggered information cards
- **Popover** - Floating content panels
- **Table** - Data tables with sorting and pagination
- **Tooltip** - Hover tooltips

## Feedback Components

- **Progress** - Progress bars and indicators
- **Toast** - Notification toasts
- **Toaster** - Toast container and manager
- **Sonner** - Alternative toast system

## Overlay Components

- **Dialog** - Modal dialogs
- **Sheet** - Slide-out panels
- **Popover** - Floating content panels
- **Hover Card** - Hover-triggered cards
- **Tooltip** - Hover tooltips

## Utility Components

- **Variants** - Component variant utilities
- **useToast** - Toast hook for notifications

## Usage

All components can be imported from the UI components directory:

```tsx
import { Button, Card, Input } from "@/components/ui"
```

Or import individual components:

```tsx
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
```

## Dependencies

The components use the following key dependencies:
- **Radix UI** - Accessible component primitives
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Class Variance Authority** - Component variants
- **Embla Carousel** - Carousel functionality
- **Sonner** - Toast notifications

## Styling

All components are styled with Tailwind CSS and follow the shadcn/ui design system. They include:
- Responsive design
- Dark/light mode support
- Accessibility features
- Consistent spacing and typography
- Hover and focus states
- Animation and transitions

## Accessibility

Components are built with accessibility in mind:
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Semantic HTML structure
