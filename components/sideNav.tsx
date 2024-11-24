"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/sidebar/breadcrumb";
import { Separator } from "@/components/ui/sidebar/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar/sidebar";

import { usePathname } from "next/navigation";
import { Fragment } from "react";

export default function SideNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  let link = "";
  const crumbs = pathname.split("/").filter((crumb) => crumb !== "");

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>

                {crumbs.map((crumb) => {
                  link += `/${crumb}`
                  return (
                  <Fragment key={crumb}>
                  <BreadcrumbSeparator  className="hidden md:block" />
                  <BreadcrumbItem  className="hidden md:block">
                  {crumb == crumbs[crumbs.length - 1] ? <BreadcrumbPage>{crumb}</BreadcrumbPage> : 
                    <BreadcrumbLink href={link}>{crumb}</BreadcrumbLink>}
                  </BreadcrumbItem>
                  </Fragment>
                )})}

                {/* <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem> */}

              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
