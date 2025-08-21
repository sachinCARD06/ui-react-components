import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bell, Search } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50"
          : "bg-white/80 backdrop-blur-sm border-b border-gray-100"
      }`}
    >
      <div className="flex items-center h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div
            className={`h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center transition-transform duration-300 hover:scale-110 ${
              isScrolled ? "shadow-lg" : ""
            }`}
          >
            <span className="text-sm font-bold text-white">RC</span>
          </div>
          <span
            className={`font-semibold text-lg hidden sm:inline-block transition-all duration-300 ${
              isScrolled ? "text-gray-900" : "text-gray-700"
            }`}
          >
            React Components
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 hidden max-w-md mx-4 md:block">
          <div className="relative group">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                isScrolled ? "text-gray-500" : "text-gray-400"
              } group-hover:text-blue-500 h-4 w-4`}
            />
            <input
              type="text"
              placeholder="Search components..."
              className={`w-full pl-10 pr-4 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isScrolled
                  ? "border-gray-200 bg-gray-50/50"
                  : "border-gray-200 bg-white/80"
              } hover:border-gray-300`}
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="items-center hidden space-x-6 lg:flex">
          {[
            { name: "Components", href: "#" },
            { name: "Documentation", href: "#" },
            { name: "Examples", href: "#" },
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`transition-all duration-200 hover:text-blue-600 ${
                isScrolled ? "text-gray-700" : "text-gray-600"
              } hover:scale-105`}
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center ml-auto space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className={`relative transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 ${
              isScrolled ? "text-gray-600" : "text-gray-500"
            }`}
          >
            <Bell className="w-6 h-6 transition-transform duration-200 hover:scale-110" />
            <Badge className="absolute flex items-center justify-center w-5 h-5 p-0 text-xs rounded-full -top-1 -right-0.5 animate-pulse">
              9+
            </Badge>
          </Button>

          <Avatar
            className={`h-8 w-8 transition-all duration-200 hover:scale-110 cursor-pointer ${
              isScrolled ? "ring-2 ring-gray-200" : ""
            }`}
          >
            <AvatarImage src="/avatars/01.png" alt="User" />
            <AvatarFallback className="font-semibold text-white bg-gradient-to-br from-blue-500 to-purple-600">
              U
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
