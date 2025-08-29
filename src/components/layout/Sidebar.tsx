import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { componentCategories, mainRoutes } from "@/routes/mainRoutes";

export function Sidebar() {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isParentActivePath = location.pathname.split("/")[1] || "";

  // Keyboard shortcut for toggling sidebar (Ctrl/Cmd + B)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "b") {
        event.preventDefault();
        setIsExpanded((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Save sidebar state to localStorage
  useEffect(() => {
    localStorage.setItem("sidebarExpanded", JSON.stringify(isExpanded));
  }, [isExpanded]);

  // Load sidebar state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("sidebarExpanded");
    if (saved !== null) {
      setIsExpanded(JSON.parse(saved));
    }
  }, []);

  // Handle hover events
  const handleMouseEnter = () => {
    if (!isExpanded) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isExpanded) {
      setIsHovered(false);
    }
  };

  // Determine if sidebar should appear expanded (either manually expanded or hovered)
  const shouldShowExpanded = isExpanded || isHovered;

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed z-50 border shadow-sm top-20 left-4 lg:hidden bg-white/90 backdrop-blur-sm"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? (
          <X className="w-4 h-4" />
        ) : (
          <Menu className="w-4 h-4" />
        )}
      </Button>

      {/* Sidebar */}
      <div
        data-sidebar
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] flex flex-col bg-gray-50 border-r transition-all duration-300 hover:shadow-lg z-40 transform ${
          shouldShowExpanded ? "w-64" : "w-16"
        } ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Sidebar Header */}

        {/* Main Navigation */}
        <div className="flex-1 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <nav className="px-3 space-y-1">
            {mainRoutes.map((item, index) => {
              const isActive =
                isParentActivePath === item.href.split("/")[1] ||
                location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 transform hover:scale-105 relative ${
                    isActive
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:translate-x-1"
                  } ${!shouldShowExpanded ? "justify-center" : ""}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setIsMobileOpen(false)}
                  title={!shouldShowExpanded ? item.name : undefined}
                >
                  <item.icon
                    className={`flex-shrink-0 transition-all duration-200 ${
                      shouldShowExpanded ? "mr-3 h-5 w-5" : "mx-auto h-5 w-5"
                    } ${
                      isActive
                        ? "text-primary scale-110"
                        : "text-gray-400 group-hover:text-gray-500 group-hover:scale-110"
                    }`}
                  />
                  {shouldShowExpanded && (
                    <span className="transition-all duration-200">
                      {item.name}
                    </span>
                  )}

                  {/* Active indicator for collapsed state */}
                  {!shouldShowExpanded && isActive && (
                    <div className="absolute right-0 w-1 h-8 rounded-l-full"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          {shouldShowExpanded && (
            <>
              <Separator className="my-6 transition-all duration-300" />

              {/* Component Categories */}
              <div className="px-3">
                <h3 className="mb-3 text-xs font-semibold tracking-wider text-gray-500 uppercase transition-colors duration-200">
                  Component Categories
                </h3>
                <nav className="space-y-1">
                  {componentCategories.map((category, index) => (
                    <Button
                      key={category.name}
                      variant="ghost"
                      className="justify-start w-full px-3 text-sm font-normal transition-all duration-200 transform h-9 hover:bg-blue-50 hover:text-blue-700 hover:scale-105"
                      style={{ animationDelay: `${index * 100}ms` }}
                      title={category.name}
                    >
                      <category.icon className="w-4 h-4 mr-3 text-gray-400 transition-all duration-200 group-hover:text-blue-500 group-hover:scale-110" />
                      {category.name}
                      <Badge
                        variant="secondary"
                        className="ml-auto text-xs transition-all duration-200 hover:scale-110"
                      >
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </nav>
              </div>
            </>
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t bg-white/50 backdrop-blur-sm">
          <div className="flex items-center space-x-3 transition-all duration-200 cursor-pointer group hover:scale-105">
            <div className="flex items-center justify-center w-8 h-8 transition-all duration-300 rounded-full bg-gradient-to-br from-green-400 to-blue-500 group-hover:shadow-lg group-hover:rotate-3">
              <span className="text-xs font-bold text-white">RC</span>
            </div>
            {shouldShowExpanded && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate transition-colors duration-200">
                  React Components
                </p>
                <p className="text-xs text-gray-500 truncate transition-colors duration-200">
                  v1.0.0
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
