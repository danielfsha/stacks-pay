"use client";

import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import WalletConnectButton from "./wallet-connect-button";

export default function Header() {
  return (
    <header className="p-4 border-b border-[#EEEFF1] h-[46px] flex justify-between items-center">
      <SidebarTrigger>open</SidebarTrigger>
      <WalletConnectButton />
    </header>
  );
}
