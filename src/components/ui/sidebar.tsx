import * as React from "react"

import { cn } from "@/lib/utils"

const Sidebar = React.forwardRef<
  React.ElementRef<"nav">,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn(
      // Add background and default text color here for clarity
      "h-full bg-white border-r shadow-sm text-gray-900",
      className
    )}
    {...props}
  />
));
Sidebar.displayName = "Sidebar";

// SidebarContent
const SidebarContent = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Ensure content uses consistent readable text color
      "flex flex-1 flex-col p-4 text-gray-900", // override text color
      className
    )}
    {...props}
  />
));
SidebarContent.displayName = "SidebarContent";

// SidebarGroupLabel
const SidebarGroupLabel = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Increase font-bold and set color for better contrast
      "uppercase font-semibold mb-2 mt-4 pl-2 text-xs text-gray-700 tracking-widest",
      className
    )}
    {...props}
  />
));
SidebarGroupLabel.displayName = "SidebarGroupLabel";

// SidebarMenuButton
const SidebarMenuButton = React.forwardRef<
  React.ElementRef<"button">,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      // Set bg on hover for active feedback, readable text color
      "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors",
      className
    )}
    {...props}
  />
));
SidebarMenuButton.displayName = "SidebarMenuButton";

// SidebarNav
const SidebarNav = React.forwardRef<
  React.ElementRef<"ul">,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      "mt-2 space-y-1",
      className
    )}
    {...props}
  />
));
SidebarNav.displayName = "SidebarNav";

// SidebarNavItem
const SidebarNavItem = React.forwardRef<
  React.ElementRef<"li">,
  React.LiHTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn(
      "px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors",
      className
    )}
    {...props}
  />
));
SidebarNavItem.displayName = "SidebarNavItem";

export { Sidebar, SidebarContent, SidebarGroupLabel, SidebarMenuButton, SidebarNav, SidebarNavItem };
