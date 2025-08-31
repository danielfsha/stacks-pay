"use client";

import Image from "next/image";

import { SidebarTrigger } from "./ui/sidebar";
import WalletConnectButton from "./wallet-connect-button";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { Input } from "./ui/input";
import { Search, Slash } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  if (pathname === "/auth/sign-in" || pathname === "/auth/sign-up") {
    return <></>;
  }

  return (
    <header className="p-4 border-b border-[#EEEFF1] h-[46px] flex justify-between items-center">
      <SidebarTrigger className={cn(buttonVariants({ variant: "ghost" }))}>
        <Image
          width={131}
          height={85.5}
          alt="Stacks Pay"
          src="/icons/List.svg"
        />
      </SidebarTrigger>

      <div className="w-full max-w-screen-md mx-auto flex justify-center items-center border-[#EEEFF1] px-4 py-2 space-x-2 space-y-0">
        <div className="flex-1">
          <Input placeholder="Quick actions" className="w-full" />
        </div>

        <div className="p-1 w-[56px] h-[32px] flex items-center justify-between rounded-[8px] bg-white text-black shadow-[0_0px_2px_0px_rgba(28,40,64,.18),0_1px_3px_0px_rgba(24,41,75,0.04)]">
          <div className="flex-1 flex items-center justify-center pr-1.5">
            <Search className="size-4 text-[#505154]" />
          </div>
          <div className="flex items-center justify-center rounded-[6px] bg-[#FBFBFB] text-black shadow-[0_0px_0px_2px_rgba(0,0,0,0.05)] size-[24px]">
            <Slash className="size-3" />
          </div>
        </div>
      </div>

      <WalletConnectButton />
    </header>
  );
}
