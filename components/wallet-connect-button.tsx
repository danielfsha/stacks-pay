"use client";

import { useState, useEffect } from "react";
import { connect, disconnect, isConnected, request } from "@stacks/connect";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface WalletConnectButtonProps {
  className?: string;
}

// Helper function to shorten the wallet address
function shortenAddress(address: string) {
  if (!address) return "";
  return address.slice(0, 6) + "...." + address.slice(-6);
}

export default function WalletConnectButton({
  className,
}: WalletConnectButtonProps) {
  const [address, setAddress] = useState("");
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
    setAddress("");
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
          </Button>
          <Button onClick={disconnectWallet} className={cn(className)}>
            {shortenAddress("tb1q4x3rwrqyu7jf8nhkvld2dxkd68vt89des50mwt")}
          </Button>
        </div>
      )}
    </>
  );
}
