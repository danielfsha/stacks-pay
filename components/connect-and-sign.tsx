import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ConnectAndSign({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center space-x-2 w-full">
        <Button
          className={cn("flex-1")}
          variant={"tertiary"}
          onClick={() => {
            // Go back to previous step
            setCurrentStep(currentStep > 0 ? currentStep - 1 : currentStep);
          }}
        >
          Go back
        </Button>

        <Button className={cn("flex-1")} variant={"secondary"}>
          Sign Transaction
        </Button>
      </div>
    </div>
  );
}
