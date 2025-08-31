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
import { BOTTOM_NAV_ITEMS, NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export interface SidebarItemProps {
  item: {
    label: string;
    href: string;
    icon: React.ReactNode;
    pathname?: string;
  };
  pathname: string;
}

export function SidebarItem({ item }: SidebarItemProps) {
  return (
    <Link
      key={item.href}
      href={item.href}
      className={`h-[28px] space-x-[6px] flex items-center px-3 py-2 text-[14px] font-medium rounded-[8px] hover:bg-[#F5F5F5] ${
        item.pathname === item.href
          ? "bg-[#E6E8EB] text-black"
          : "text-[#505154] hover:text-black"
      }`}
    >
      <span className="mr-3 tracking-tighter">{item.icon}</span>
      {item.label}
    </Link>
  );
}

export default function AppSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
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

      <SidebarContent className="gap-0">
        <SidebarGroup className="flex flex-col space-y-[6px] w-full border-[#EEEFF1]">
          search
        </SidebarGroup>
        <SidebarGroup className="flex flex-col space-y-[6px] w-full border-[#EEEFF1] border-b border-t">
          {NAV_ITEMS.map((item) => (
            <SidebarItem key={item.href} item={item} pathname={pathname} />
          ))}
        </SidebarGroup>

        <SidebarGroup className="flex-1 flex flex-col justify-end space-y-[6px] w-full border-[#EEEFF1] border-b">
          {BOTTOM_NAV_ITEMS.map((item) => (
            <SidebarItem key={item.href} item={item} pathname={pathname} />
          ))}
        </SidebarGroup>

        <SidebarGroup>
          <div className="flex items-center justify-start space-x-[10px] px-3 py-2 text-[14px] font-medium rounded-[8px] hover:bg-[#F5F5F5]">
            <Avatar className="w-[24px] h-[24px] rounded-lg overflow-hidden">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <span className="text-[15px] font-medium w-full">daniel</span>
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
