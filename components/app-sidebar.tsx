import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"
import Image from "next/image"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar/sidebar"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Men's Fashion",
      url: "/men",
      items: [
        {
          title: "Men's Accessories",
          url: "#",
        },
        {
          title: "Men's Clothing",
          url: "#",
        },
        {
          title: "Men's Shoes",
          url: "#",
        },
      ],
    },
    {
      title: "Women's Fashion",
      url: "/women",
      items: [
        {
          title: "Women's Accessories",
          url: "#",
        },
        {
          title: "Women's Clothing",
          url: "#",
          isActive: true,
        },
        {
          title: "Women's Jewellery",
          url: "#",
        },     
      ],
    },
    {
      title: "Kids Fashion",
      url: "/kids",
      items: [
        {
          title: "Boys' Fashion",
          url: "#",
        },
        {
          title: "Girls' Fashion",
          url: "#",
        },
        {
          title: "Infants' Fashion",
          url: "#",
        },
      ],
    },
    {
      title: "Sports and Outdoor",
      url: "/sports",
      items: [
        {
          title: "Cardio Training",
          url: "#",
        },
        {
          title: "Fitness",
          url: "#",
        },
       
      ],
    },
    {
      title: "Electronics and Gadgets",
      url: "/digitals",
      items: [
        {
          title: "Mobile Phones",
          url: "#",
        },
        {
          title: "Video Games",
          url: "#",
        },
      ],
    },
    {
      title: "Furniture and Luggage",
      url: "/furniture",
      items: [
        {
          title: "Home Decor",
          url: "#",
        },
        {
          title: "Furniture Collection",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">               
                <Image  src="/logo.svg" alt="logo" width={50} height={50} className="w-auto" />
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Mega Store</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
