"use client";

import { useState } from "react";

import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import WalletConnectButton from "./wallet-connect-button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CheckoutPagePreview() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  return (
    <main className="w-full h-full flex items-start justify-start">
      {/* left side */}
      <aside className="hidden h-full bg-sidebar border-r border-[#EEEFF1] w-[50%] pt-16 px-[5%] lg:flex flex-col items-center justify-start">
        <div className="flex flex-col space-x-2 w-full space-y-10">
          <header>
            <Button
              onClick={() => router.back()}
              variant="tertiary"
              size="icon"
            >
              <ArrowLeft />
            </Button>
          </header>

          <div className="pt-16 flex flex-col items-start justify-start space-y-4">
            <p className="text-[14px] text-[#8E8E8E]">One time payment</p>
            <div className="flex items-start justify-start space-x-3">
              <Image width={28} height={28} alt="USD" src="/logo/icon.svg" />
              <div className="flex flex-col items-start justify-start space-y-1">
                <h1 className="text-4xl font-bold -mt-2">0.0006 sBTC</h1>
                <p className="text-[16px] text-[#8E8E8E]">$62.78</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-start space-y-2">
            <h1 className="text-medium text-lg">PaymentPal test transaction</h1>
            <p className="text-[14px] text-[#8E8E8E]">
              PaymentPal is a platform built on stacks L2 which allows to
              utilize sBTC as payment method
            </p>
          </div>

          <div className="flex flex-col items-start justify-start">
            <div className="h-12 w-full py-2 flex items-center justify-between border-t border-[#EEEFF1]">
              <h1 className="text-medium text-[16px]">sub total </h1>
              <p className="text-medium text-[16px]">0.0006 sBTC</p>
            </div>
            <div className="h-12 w-full py-2 flex items-center justify-between border-t border-[#EEEFF1]">
              <h1 className="text-medium text-[16px] uppercase text-orange-500 flex-1">
                Promo code
              </h1>
              <Input
                className="w-auto max-w-[100px] text-right rounded-none"
                placeholder="2CX7AM"
              />
            </div>

            <div className="h-12 w-full py-2 flex items-center justify-between border-t border-[#EEEFF1]">
              <h1 className="text-medium text-[16px]">Total</h1>
              <p className="text-medium text-[16px]">0.0006 sBTC</p>
            </div>

            <div className="h-12 w-full py-2 flex items-center justify-end border-t border-b border-[#EEEFF1]">
              <p className="text-medium text-[16px]">$43.87</p>
            </div>
          </div>
        </div>
      </aside>

      {/* right side */}
      <div className="w-full h-full flex flex-col items-center justify-start pt-16 px-[15%] lg:px-[25%] space-y-32">
        <header className="flex flex-col justify-start items-end w-full space-y-12">
          <WalletConnectButton />
        </header>

        <form
          onSubmit={() => alert("")}
          className="flex flex-col space-y-3 w-full flex-1"
        >
          <p>Enter email </p>

          <p className="text-[15px] text-[#8E8E8E]">
            Provide us with your email so we can send you your payment reciept.
          </p>

          <Input
            type="email"
            placeholder="daniel@stackspay.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-none"
          />
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>

        <div className="w-full flex items-center justify-center py-4 space-x-2">
          <p className="text-medium text-lg">Powered by </p>
          <Image width={120} height={28} alt="USD" src="/logo/default.svg" />
        </div>
      </div>
    </main>
  );
}
