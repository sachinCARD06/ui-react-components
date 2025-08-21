import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Package,
  Code,
  Eye,
  Copy,
  Search,
  Filter,
  Grid,
  List,
} from "lucide-react";

const componentExamples = [
  {
    name: "Button",
    description: "A button component with multiple variants and sizes",
    category: "Form",
    status: "Stable",
    usage: "High",
    examples: ["Primary", "Secondary", "Outline", "Ghost"],
  },
  {
    name: "Card",
    description: "A flexible card component for displaying content",
    category: "Layout",
    status: "Stable",
    usage: "High",
    examples: ["Basic", "With Header", "With Footer", "Interactive"],
  },
  {
    name: "Input",
    description: "An input component with validation states",
    category: "Form",
    status: "Stable",
    usage: "High",
    examples: ["Text", "Email", "Password", "Search"],
  },
  {
    name: "Badge",
    description: "A badge component for status and labels",
    category: "Data Display",
    status: "Stable",
    usage: "Medium",
    examples: ["Default", "Secondary", "Destructive", "Outline"],
  },
  {
    name: "Avatar",
    description: "An avatar component for user profiles",
    category: "Data Display",
    status: "Stable",
    usage: "Medium",
    examples: ["Image", "Fallback", "Group", "With Status"],
  },
  {
    name: "Tabs",
    description: "A tabs component for organizing content",
    category: "Navigation",
    status: "Beta",
    usage: "Medium",
    examples: ["Horizontal", "Vertical", "With Icons", "Animated"],
  },
];

export function Components() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Components</h1>
        <p className="mt-2 text-gray-600">
          Browse and explore our collection of reusable React components.
        </p>
      </div>

      {/* Search and Filters */}

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <Input placeholder="Search components..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
        <Button variant="outline">
          <Grid className="w-4 h-4 mr-2" />
        </Button>
        <Button variant="outline">
          <List className="w-4 h-4 mr-2" />
        </Button>
      </div>

      {/* Component Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {componentExamples.map((component, index) => (
          <Card key={index} className="p-0 transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    <span>{component.name}</span>
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {component.description}
                  </CardDescription>
                </div>
                <Badge
                  variant={
                    component.status === "Stable"
                      ? "default"
                      : component.status === "Beta"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {component.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Category:</span>
                <Badge variant="outline">{component.category}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Usage:</span>
                <Badge variant="outline">{component.usage}</Badge>
              </div>

              <Separator />

              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">
                  Examples:
                </p>
                <div className="flex flex-wrap gap-1">
                  {component.examples.map((example, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Code className="w-4 h-4 mr-2" />
                  Code
                </Button>
                <Button size="sm" variant="ghost">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Component Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Component Categories</CardTitle>
          <CardDescription>
            Organized by functionality and purpose
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="layout" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="layout">Layout</TabsTrigger>
              <TabsTrigger value="forms">Forms</TabsTrigger>
              <TabsTrigger value="data">Data Display</TabsTrigger>
              <TabsTrigger value="navigation">Navigation</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>

            <TabsContent value="layout" className="mt-6">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                  "Card",
                  "Container",
                  "Grid",
                  "Stack",
                  "Divider",
                  "Spacer",
                  "AspectRatio",
                  "Center",
                ].map((item) => (
                  <div
                    key={item}
                    className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <Package className="w-5 h-5 mb-2 text-blue-600" />
                    <p className="text-sm font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="forms" className="mt-6">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                  "Button",
                  "Input",
                  "Select",
                  "Checkbox",
                  "Radio",
                  "Switch",
                  "Textarea",
                  "Form",
                ].map((item) => (
                  <div
                    key={item}
                    className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <Package className="w-5 h-5 mb-2 text-green-600" />
                    <p className="text-sm font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="data" className="mt-6">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                  "Table",
                  "List",
                  "Avatar",
                  "Badge",
                  "Progress",
                  "Chart",
                  "Timeline",
                  "Stats",
                ].map((item) => (
                  <div
                    key={item}
                    className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <Package className="w-5 h-5 mb-2 text-purple-600" />
                    <p className="text-sm font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="navigation" className="mt-6">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                  "Tabs",
                  "Breadcrumb",
                  "Pagination",
                  "Menu",
                  "Dropdown",
                  "Sidebar",
                  "Navbar",
                  "Stepper",
                ].map((item) => (
                  <div
                    key={item}
                    className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <Package className="w-5 h-5 mb-2 text-orange-600" />
                    <p className="text-sm font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="feedback" className="mt-6">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                  "Alert",
                  "Toast",
                  "Modal",
                  "Dialog",
                  "Tooltip",
                  "Popover",
                  "Notification",
                  "Loading",
                ].map((item) => (
                  <div
                    key={item}
                    className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <Package className="w-5 h-5 mb-2 text-red-600" />
                    <p className="text-sm font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
