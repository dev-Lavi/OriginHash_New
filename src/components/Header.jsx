import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Menu,
  LayoutDashboard,
  BookOpen,
  Award,
  FileCheck,
  CheckCircle,
  Settings,
  LogOut,
  ChevronDown,
  PenTool,
  Edit,
  Layers,
  FileEdit,
  Footprints,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = ({ onItemClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [certDropOpen, setCertDropOpen] = useState(false);
  const [updateDropOpen, setUpdateDropOpen] = useState(false);

  useEffect(() => {
    if (
      location.pathname.startsWith("/admin/issue-certificate") ||
      location.pathname.startsWith("/admin/issued-certificates") ||
      location.pathname.startsWith("/admin/verified-certificates")
    ) {
      setCertDropOpen(true);
    }
  }, [location.pathname]);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/courses",
    },
    {
      id: "courses",
      label: "Courses",
      icon: BookOpen,
      path: "/admin/courses-list",
    },
            {
      id: "Manage Users",
      label: "Manage Users",
      icon: Users,
      path: "/update-users",
    },
    {
      id: "certificates",
      label: "Certificates",
      icon: Award,
      hasDropdown: true,
      subItems: [
        { id: "issue", label: "Issue", icon: PenTool, path: "/admin/issue-certificate" },
        { id: "issued", label: "Issued", icon: FileCheck, path: "/admin/issued-certificates" },
        { id: "verified", label: "Verified", icon: CheckCircle, path: "/admin/verified-certificates" },
      ],
    },
    {
      id: "update-details",
      label: "Update Details",
      icon: Edit,
      hasDropdown: true,
      dropdownState: updateDropOpen,
      setDropdownState: setUpdateDropOpen,
      subItems: [
        { id: "update-header", label: "Header Region", icon: Layers, path: "/HeaderRegion" },
        { id: "update-core", label: "Core Details", icon: FileEdit, path: "/CoreUpdate" },
        { id: "update-above-footer", label: "Above Footer", icon: Layers, path: "/abovefooter" },
        { id: "update-footer", label: "Footer", icon: Footprints, path: "/update-footer" },
      ],
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    onItemClick?.();
  };

  const isActive = (path) => location.pathname === path;
  const isParentActive = (subItems) =>
    subItems?.some((item) => location.pathname === item.path);

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
          <span className="text-xl font-semibold text-gray-900">OriginHash</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {menuItems.map((item) => {
            if (item.hasDropdown) {
              const isDropdownActive = isParentActive(item.subItems);
              return (
                <Collapsible
                  key={item.id}
                  open={certDropOpen}
                  onOpenChange={setCertDropOpen}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-between hover:bg-gray-100",
                        isDropdownActive && "bg-gray-100 text-blue-600"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          certDropOpen && "rotate-180"
                        )}
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 mt-1 ml-4">
                    {item.subItems.map((subItem) => (
                      <Button
                        key={subItem.id}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start pl-8 hover:bg-gray-100",
                          isActive(subItem.path) &&
                            "bg-blue-50 text-blue-600 hover:bg-blue-50"
                        )}
                        onClick={() => handleNavigation(subItem.path)}
                      >
                        <subItem.icon className="h-4 w-4 mr-3" />
                        {subItem.label}
                      </Button>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              );
            }

            return (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start hover:bg-gray-100",
                  isActive(item.path) &&
                    "bg-blue-50 text-blue-600 hover:bg-blue-50"
                )}
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="border-t px-3 py-4">
        <div className="space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-gray-100"
            onClick={() => handleNavigation("/admin/settings")}
          >
            <Settings className="h-5 w-5 mr-3" />
            <span className="font-medium">Settings</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-red-50 text-red-600 hover:text-red-700"
            onClick={() => {
              // Add logout logic
              console.log("Admin Logout clicked");
            }}
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span className="font-medium">Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

const AdminHeader = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile/Tablet Header */}
      <header className="lg:hidden sticky top-0 z-50 w-full border-b bg-white">
        <div className="flex h-16 items-center justify-between px-4">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <Sidebar onItemClick={() => setSidebarOpen(false)} />
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Logo" className="h-7 w-7" />
            <span className="text-lg font-semibold">OriginHash Admin</span>
          </div>

          <Avatar className="h-9 w-9">
            <AvatarImage src="/admin.jpg" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 h-screen w-64 border-r bg-white z-40">
        <Sidebar />
      </aside>
    </>
  );
};

export default AdminHeader;
