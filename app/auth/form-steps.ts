import AnimatedOTP from "./components/animated-otp";
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
];

export default FORM_STEPS;
