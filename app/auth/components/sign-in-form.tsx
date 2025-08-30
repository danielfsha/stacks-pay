"use client";
import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { emailOtp } from "@/lib/auth-client";

import { FORM_STEPS } from "../sign-in/page";

export default function EmailInputForm({
  email,
  setEmail,
  currentStep,
  setCurrentStep,
}: {
  email: string;
  setEmail: (email: string) => void;

  currentStep: number;
  setCurrentStep: (step: number) => void;
}) {
  const signInWithOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) return;

    try {
      const { data, error } = await emailOtp.sendVerificationOtp({
        email: email,
        type: "sign-in",
      });

      if (!error) {
        setCurrentStep(
          currentStep < FORM_STEPS.length - 1 ? currentStep + 1 : currentStep
        );
      }
      console.log(data);
    } catch (error) {
      throw error;
    }
  };

  return (
    <form
      onSubmit={signInWithOTP}
      className="flex flex-col space-y-2 mb-4 w-full"
    >
      <p>Enter email </p>
      <Input
        type="email"
        placeholder="daniel@stackspay.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full"
      />
      <Button type="submit" className="w-full">
        Continue
      </Button>
    </form>
  );
}
