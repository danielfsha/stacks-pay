"use client";

import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";

export function AppSidebar({ children }: { children: React.ReactNode }) {
  // remove the sidebar on the sign-in page
  const pathname = usePathname();

  if (pathname === "/auth/sign-in" || pathname === "/auth/sign-up") {
    return <>{children}</>;
  }

  return (
    <Sidebar>
      <SidebarHeader className="px-2 border-b border-[#EEEFF1] h-[46px] flex">
        <Image
          width={135}
          height={27}
          alt="Stacks Pay"
          src="/logo/default.svg"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
