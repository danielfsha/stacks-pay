"use client";

import Image from "next/image";
import { useSession } from "@/lib/auth-client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";
import { BOTTOM_NAV_ITEMS, MIDDLE_NAV_ITEMS, NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "./ui/input";
import { Search, Slash } from "lucide-react";

export interface SidebarItemProps {
  item: {
    label: string;
    href: string;
    icon: React.ReactNode;
  };
  pathname: string;
}

export function SidebarItem({ item, pathname }: SidebarItemProps) {
  return (
    <Link
      key={item.href}
      href={item.href}
      className={`h-[28px] space-x-[6px] flex items-center px-3 py-2 text-[14px] font-medium rounded-[8px] hover:bg-[#F5F5F5] ${
        pathname == item.href
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
  const { data: session } = useSession();

  if (pathname === "/auth/sign-in" || pathname === "/checkout") {
    return <>{children}</>;
  }

  return (
    <Sidebar>
      <SidebarHeader className="px-4 border-b border-[#EEEFF1] h-[46px] flex">
        <Image
          width={135}
          height={27}
          alt="Stacks Pay"
          src="/logo/default.svg"
        />
      </SidebarHeader>

      <SidebarContent className="gap-0">
        <div className="w-full flex justify-center items-center border-[#EEEFF1] px-4 py-2 space-x-2 space-y-0">
          <div className="flex-1">
            <Input placeholder="Quick actions" className="w-full" />
          </div>

          <div className="p-1 w-[56px] h-[32px] flex items-center justify-between rounded-[8px] bg-white text-black shadow-[0_0px_2px_0px_rgba(28,40,64,.18),0_1px_3px_0px_rgba(24,41,75,0.04)]">
            <div className="flex-1 flex items-center justify-center pr-1.5">
              <Search className="size-4 text-[#505154]" />
            </div>
            <div className="flex items-center justify-center rounded-[6px] bg-white text-black shadow-[0_0px_0px_2px_rgba(0,0,0,0.05)] size-[24px]">
              <Slash className="size-3" />
            </div>
          </div>
        </div>

        <SidebarGroup className="flex flex-col space-y-[6px] w-full border-[#EEEFF1] border-b border-t">
          {NAV_ITEMS.map((item) => (
            <SidebarItem key={item.href} item={item} pathname={pathname} />
          ))}
        </SidebarGroup>

        <SidebarGroup className="flex flex-col justify-end space-y-[6px] w-full border-[#EEEFF1] border-b">
          {MIDDLE_NAV_ITEMS.map((item) => (
            <SidebarItem key={item.href} item={item} pathname={pathname} />
          ))}
        </SidebarGroup>

        <SidebarGroup className="flex-1 flex flex-col justify-end space-y-[6px] w-full border-[#EEEFF1] border-b">
          {BOTTOM_NAV_ITEMS.map((item) => (
            <SidebarItem key={item.href} item={item} pathname={pathname} />
          ))}
        </SidebarGroup>

        <SidebarGroup>
          {session && (
            <div className="flex items-center justify-start space-x-[10px] px-3 py-2 text-[14px] font-medium rounded-[8px] hover:bg-[#F5F5F5]">
              <Avatar className="w-[24px] h-[24px] rounded-lg overflow-hidden">
                <AvatarImage src={`${session?.user.image}`} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <span className="text-[15px] font-medium w-full">
                {session.user.name}
              </span>
            </div>
          )}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
