"use client";

import { useState, useEffect } from "react";
import { connect, disconnect, isConnected } from "@stacks/connect";
import { Button } from "@/components/ui/button";

import Image from "next/image";

import { cn } from "@/lib/utils";

interface WalletConnectButtonProps {
  className?: string;
}

export default function WalletConnectButton({
  className,
}: WalletConnectButtonProps) {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    setConnected(isConnected());
    if (isConnected()) {
    }
  }, []);

  // Check for connection changes
  useEffect(() => {
    const checkConnection = () => {
      const connectionStatus = isConnected();
      if (connectionStatus !== connected) {
        setConnected(connectionStatus);
        if (connectionStatus) {
        }
      }
    };

    const intervalId = setInterval(checkConnection, 500);
    return () => clearInterval(intervalId);
  }, [connected]);

  const connectWallet = async () => {
    try {
      await connect({});
    } catch (error) {
      console.error("Connection failed:", error);
    }
  };

  const disconnectWallet = () => {
    disconnect();
    setConnected(false);
  };

  return (
    <>
      {!connected ? (
        <Button onClick={connectWallet} className={cn(className)}>
          Connect Wallet
        </Button>
      ) : (
        <div className="flex items-center space-x-2">
          <Button variant="tertiary" className="px-2 py-0">
            <Image width={20} height={20} alt="USD" src="/logo/icon.svg" />
            Stacks
            {/* <ChevronDown size={14} /> */}
          </Button>
          <Button onClick={disconnectWallet} className={cn(className)}>
            0xA3...F6B2
          </Button>
        </div>
      )}
    </>
  );
}
