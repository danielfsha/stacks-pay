"use client";

import { useState, useEffect } from "react";
import { connect, disconnect, isConnected } from "@stacks/connect";
import { Button } from "@/components/ui/button";

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
        <Button onClick={disconnectWallet} className={cn(className)}>
          Disconnect
        </Button>
      )}
    </>
  );
}
