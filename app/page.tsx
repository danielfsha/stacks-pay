"use client";

import { useState, useEffect } from "react";
import { connect, disconnect, isConnected } from "@stacks/connect";
import { Button } from "@/components/ui/button";

const network = "testnet";

function App() {
  const [connected, setConnected] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div>
      <header className="p-4 border-b flex justify-between items-center">
        <h1>Stacks App</h1>

        {!connected ? (
          <Button onClick={connectWallet}>Connect Wallet</Button>
        ) : (
          <Button onClick={disconnectWallet}>Disconnect</Button>
        )}
      </header>

      {connected && (
        <main className="h-screen flex flex-col items-center justify-center over">
          <div>wallet connected</div>
        </main>
      )}
    </div>
  );
}

export default App;
