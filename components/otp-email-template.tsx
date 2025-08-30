import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  OTP: string;
}

export function EmailTemplate({ firstName, OTP }: EmailTemplateProps) {
  return (
    <div>
      <h1>
        Welcome, {firstName}! Here is your {OTP}
      </h1>
    </div>
  );
}
