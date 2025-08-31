import AnimatedOTP from "./components/animated-otp";
import ConnectAndSign from "./components/connect-and-sign";
import EmailInputForm from "./components/email-input-form";

const FORM_STEPS = [
  {
    id: "email",
    description: "Ask user to enter email",
    component: EmailInputForm,
  },
  {
    id: "otp",
    description: "verify the sent OTP",
    component: AnimatedOTP,
  },
  {
    id: "wallet",
    description: "Connect wallet and sign transaction",
    component: ConnectAndSign, // Replace with actual WalletConnect component
  },
];

export default FORM_STEPS;
