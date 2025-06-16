import * as React from "react";
import { ChevronRight } from "lucide-react";

// import { SearchForm } from "../components/search-form";
// import { VersionSwitcher } from "../components/version-switcher";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

// This is sample data.
const data = {
  // versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Job Management",
      items: [
        {
          title: "Application Overview",
          url: "/JobsManagement/ApplicationOverview",
        },
        { title: "Current Jobs", url: "/JobsManagement/CurrentJobs" },
        { title: "Archived Jobs", url: "/JobsManagement/ArchivedJobs" },
      ],
    },
    {
      title: "Media Management",
      items: [
        { title: "Home Page", url: "/MediaManagement/HomePage" },
        { title: "About Page", url: "/MediaManagement/AboutPage" },
        { title: "Careers Page", url: "/MediaManagement/CareersPage" },
        { title: "Contact Page", url: "/MediaManagement/ContactPage" },
      ],
    },
    {
      title: "Analytics",
      items: [
        { title: "Applied Jobs", url: "/Analytics/AppliedJobs" },
        { title: "Traffic", url: "/Analytics/Traffic" },
        { title: "User Engagement", url: "/Analytics/UserEngagement" },
        { title: "Bounce Rate", url: "/Analytics/BounceRate" },
        { title: "Click Through Rate", url: "/Analytics/ClickThroughRate" },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="h-5 py-3 mb-2">
          <h1 className="text-center border-b-2 border-slate-300  ">
            Admin's Dashboard
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger className="!font-semibold">
                  {item.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => {
                      const isActive = location.pathname === item.url;
                      return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild isActive={isActive}>
                            <Link to={item.url}>{item.title}</Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
