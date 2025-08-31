"use client";

import { useState } from "react";
import Image from "next/image";

import { signIn } from "@/lib/auth-client";

import { Button, buttonVariants } from "@/components/ui/button";

import WalletConnectButton from "@/components/wallet-connect-button";

import FORM_STEPS from "../form-steps";
import { cn } from "@/lib/utils";

export default function SignInPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");

  const signInWithGoogle = async () => {
    const data = await signIn.social({
      provider: "google",
    });
  };

  const signInWithGithub = async () => {
    const data = await signIn.social({
      provider: "github",
    });
  };

  const StepComponent = FORM_STEPS[currentStep].component;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[352px] space-y-[24px]">
      <Image
        width={131}
        height={85.5}
        alt="Stacks Pay"
        src="/logo/stacked.svg"
      />

      {currentStep === 0 && (
        <p className="text-center w-full text-[14px] text-[#505154] font-medium ">
          Sign in to start accepting payments <br /> using Bitcoin
        </p>
      )}

      {currentStep === 2 && (
        <p className="text-center w-full text-[14px] text-[#505154] font-medium ">
          Connect your wallet and sign transaction to verify the ownership of
          the account
        </p>
      )}

      <StepComponent
        email={email}
        setEmail={setEmail}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />

      {currentStep === 0 && (
        <>
          <div>
            <p className="text-center mb-2">OR</p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-2 w-full">
            <Button
              type="button"
              variant="tertiary"
              onClick={signInWithGoogle}
              className="w-full"
            >
              <Image
                width={14}
                height={14}
                alt="Stacks Pay"
                src="/socials/google-icon-logo.svg"
              />
              Sign In with Google
            </Button>
            <Button
              type="button"
              variant="tertiary"
              onClick={signInWithGithub}
              className="w-full"
            >
              <Image
                width={14}
                height={14}
                alt="Stacks Pay"
                src="/socials/github-icon-logo.svg"
              />
              Sign In with Github
            </Button>

            <WalletConnectButton
              className={cn(
                "w-full",
                buttonVariants({
                  variant: "secondary",
                })
              )}
            />
          </div>
        </>
      )}
    </div>
  );
}
