import {
  BarChart3,
  Code,
  Component,
  FileText,
  Image,
  Home,
  Layers,
  Package,
  Palette,
  Settings,
  Users,
  Zap,
} from "lucide-react";

export const mainRoutes = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Components", href: "/ui-components", icon: Package },
  { name: "Features", href: "/features/explorer", icon: Component },
  { name: "Svgs", href: "/svgs/animated-beam", icon: Image },
  { name: "Documentation", href: "/docs", icon: FileText },
  { name: "Examples", href: "/examples", icon: Code },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Team", href: "/team", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const componentCategories = [
  { name: "Layout", icon: Layers, count: 8 },
  { name: "Forms", icon: Palette, count: 12 },
  { name: "Data Display", icon: BarChart3, count: 6 },
  { name: "Feedback", icon: Zap, count: 4 },
];
