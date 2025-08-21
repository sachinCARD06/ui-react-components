import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  TrendingUp,
  Users,
  Package,
  Activity,
  ArrowUpRight,
  Calendar,
  Star,
} from "lucide-react";

export function Dashboard() {
  return (
    <div className="space-y-6 duration-700 animate-in slide-in-from-bottom-4">
      {/* Page Header */}
      <div className="duration-500 delay-100 animate-in slide-in-from-bottom-2">
        <h1 className="text-3xl font-bold text-gray-900 transition-all duration-200 hover:text-blue-600">
          Dashboard
        </h1>
        <p className="mt-2 text-gray-600 transition-colors duration-200">
          Welcome back! Here's what's happening with your components.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Components",
            value: "2,847",
            change: "+12%",
            icon: Package,
            color: "text-blue-600",
          },
          {
            title: "Active Users",
            value: "1,234",
            change: "+8%",
            icon: Users,
            color: "text-green-600",
          },
          {
            title: "Downloads",
            value: "45,231",
            change: "+23%",
            icon: TrendingUp,
            color: "text-purple-600",
          },
          {
            title: "Performance",
            value: "98.2%",
            change: "+2.1%",
            icon: Activity,
            color: "text-orange-600",
          },
        ].map((stat, index) => (
          <Card
            key={stat.title}
            className="transition-all duration-300 duration-500 transform hover:shadow-lg hover:scale-105 animate-in slide-in-from-bottom-2"
            style={{ animationDelay: `${200 + index * 100}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium transition-colors duration-200">
                {stat.title}
              </CardTitle>
              <stat.icon
                className={`w-4 h-4 text-muted-foreground transition-all duration-200 hover:scale-110 ${stat.color}`}
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold transition-colors duration-200">
                {stat.value}
              </div>
              <p className="text-xs transition-colors duration-200 text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last
                month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card className="transition-all duration-300 duration-500 delay-300 hover:shadow-lg animate-in slide-in-from-left-2">
          <CardHeader>
            <CardTitle className="transition-colors duration-200">
              Recent Activity
            </CardTitle>
            <CardDescription className="transition-colors duration-200">
              Latest updates and changes to your components
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                user: "Sarah Chen",
                action: "updated Button component",
                time: "2 hours ago",
                avatar: "SC",
              },
              {
                user: "Mike Johnson",
                action: "added new Card variants",
                time: "4 hours ago",
                avatar: "MJ",
              },
              {
                user: "Emma Wilson",
                action: "fixed Input component bug",
                time: "6 hours ago",
                avatar: "EW",
              },
              {
                user: "Alex Brown",
                action: "created new Modal component",
                time: "1 day ago",
                avatar: "AB",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center p-2 space-x-4 transition-all duration-200 transform rounded-lg hover:bg-gray-100 hover:shadow-md"
              >
                <Avatar className="w-8 h-8 transition-all duration-200 hover:scale-110">
                  <AvatarFallback className="font-semibold text-white bg-gradient-to-br from-blue-500 to-purple-600">
                    {activity.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none transition-colors duration-200">
                    {activity.user} {activity.action}
                  </p>
                  <p className="text-sm transition-colors duration-200 text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="transition-all duration-200 hover:scale-110 hover:bg-blue-50 hover:text-blue-600"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="transition-all duration-300 duration-500 delay-300 hover:shadow-lg animate-in slide-in-from-right-2">
          <CardHeader>
            <CardTitle className="transition-colors duration-200">
              Quick Actions
            </CardTitle>
            <CardDescription className="transition-colors duration-200">
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Package, label: "New Component", variant: "default" },
                { icon: Calendar, label: "Schedule Demo", variant: "outline" },
                { icon: Users, label: "Invite Team", variant: "outline" },
                { icon: Star, label: "Rate Us", variant: "outline" },
              ].map((action, index) => (
                <Button
                  key={action.label}
                  variant={action.variant as "default" | "outline"}
                  className={`h-20 flex-col space-y-2 transition-all duration-200 hover:shadow-md transform ${
                    action.variant === "default"
                      ? "hover:bg-yellow-500 hover:text-primary"
                      : "hover:bg-primary/20 hover:text-primary"
                  }`}
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                >
                  <action.icon className="w-6 h-6 transition-transform duration-200 hover:rotate-12" />
                  <span className="text-sm">{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Component Status */}
      <Card className="transition-all duration-300 duration-500 hover:shadow-lg animate-in slide-in-from-bottom-2 delay-400">
        <CardHeader>
          <CardTitle className="transition-colors duration-200">
            Component Status
          </CardTitle>
          <CardDescription className="transition-colors duration-200">
            Overview of your component library health
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: "Core Components",
                status: "Healthy",
                count: 45,
                color: "bg-green-500",
                textColor: "text-green-600",
              },
              {
                name: "Form Elements",
                status: "Warning",
                count: 23,
                color: "bg-yellow-500",
                textColor: "text-yellow-600",
              },
              {
                name: "Layout Components",
                status: "Healthy",
                count: 18,
                color: "bg-green-500",
                textColor: "text-green-600",
              },
              {
                name: "Data Display",
                status: "Error",
                count: 12,
                color: "bg-red-500",
                textColor: "text-red-600",
              },
            ].map((component, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 transition-all duration-200 transform rounded-lg hover:bg-gray-100 hover:shadow-md"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${component.color} transition-all duration-200 hover:scale-125`}
                  ></div>
                  <span className="font-medium transition-colors duration-200">
                    {component.name}
                  </span>
                  <Badge
                    variant="secondary"
                    className="transition-all duration-200 hover:scale-110"
                  >
                    {component.count}
                  </Badge>
                </div>
                <span
                  className={`text-sm font-medium transition-all duration-200 ${component.textColor}`}
                >
                  {component.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
