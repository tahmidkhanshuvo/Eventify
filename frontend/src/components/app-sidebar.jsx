import * as React from "react";

import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarHeader,   // ✅ added
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
// Sample data with `url` and `isActive` properties.
const data = {
  navMain: [
    {
      title: "Home",
      url: "superadmin/home",
      isActive: true,
    },
    {
      title: "Building Your Application",
      url: "",
      isActive: false,
    },
    {
      title: "API Reference",
      url: "#",
      isActive: false,
    },
    {
      title: "Architecture",
      url: "#",
      isActive: false,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        drctbhjjhj
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={item.isActive} className ="py-6 font-bold">
                  {/* The `<a>` tag makes the item clickable */}
                  <a href={item.url } className="font-sora-500 font-bold">{item.title}</a>
                  
                </SidebarMenuButton>
                <hr className="h-px bg-gray-200 border-0 dark:bg-gray-300" />
              </SidebarMenuItem>
              
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
     <div className="mt-auto p-4 border-t flex items-center gap-0.5 flex-col">
      <span className="font-sora-400 font-semibold items-center">John Doe</span>
      <span className="font-sora-300 text-sm text-gray-500">@johndoe</span>
       </div>
      <div className="mt-auto p-4 border-t">
        <Button className="w-full" variant="destructive">
          Logout
        </Button>
      </div>
      <SidebarRail />
    </Sidebar>
  );
}
