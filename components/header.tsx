"use client";

import Image from "next/image";

import { SidebarTrigger } from "./ui/sidebar";
import WalletConnectButton from "./wallet-connect-button";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";

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
      <WalletConnectButton />
    </header>
  );
}
