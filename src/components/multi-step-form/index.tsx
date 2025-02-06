"use client";

import { useEffect, useMemo, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { checkVariants, stepsVariants } from "@/lib/utils";
import { Check } from "lucide-react";

export type Step<
  TPossibleFormData,
  TMultiStepFormData,
  TOtherData = unknown
> = {
  form: React.ComponentType<{
    onSubmit: (data: TPossibleFormData) => void;
    formData: TMultiStepFormData;
    useBackButton?: {
      onClick: () => void;
    };
    otherData?: TOtherData;
  }>;
  label: string;
};

export default function MultiStepForm<
  TPossibleFormData,
  TMultiStepFormData,
  TOtherData = unknown
>({
  onFinished,
  steps,
  otherData,
}: {
  onFinished: (formData: TMultiStepFormData) => void;
  steps: Step<TPossibleFormData, TMultiStepFormData, TOtherData>[];
  otherData?: TOtherData;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setformData] = useState<TMultiStepFormData>(
    {} as TMultiStepFormData
  );

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const confirmationMessage =
        "Você realmente quer recarregar a página? As mudanças podem ser perdidas.";
      event.preventDefault();
      event.returnValue = confirmationMessage;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const onStepSubmit = (data: TPossibleFormData) => {
    const updatedFormValues = { ...formData, ...data };
    setformData(updatedFormValues);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onFinished(formData);
    }
  };

  const onBackStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const CurrentComponent = useMemo(
    () => steps[currentStep].form,
    [currentStep, steps]
  );

  return (
    <div>
      <section className="w-full">
        <section>
          <div className="p-2 w-full flex items-center justify-center gap-2">
            {steps.map((_, ind) => (
              <motion.span
                key={ind}
                className={clsx(
                  "select-none rounded-full border-2 h-8 w-8 flex items-center justify-center",
                  {
                    " border-ipilOrange": ind <= currentStep,
                    "bg-ipilOrange": ind < currentStep,
                  }
                )}
              >
                <AnimatePresence mode="popLayout">
                  {ind < currentStep ? (
                    <motion.span
                      key={`check-${ind}`}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={checkVariants}
                      transition={{ duration: 0.4 }}
                      className="text-white w-full h-full flex items-center justify-center  rounded-full"
                    >
                      <Check size={20} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key={`number-${ind}`}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={checkVariants}
                      transition={{ duration: 0.4 }}
                      className={
                        ind === currentStep
                          ? "text-ipilOrange font-semibold"
                          : "text-black"
                      }
                    >
                      {ind + 1}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.span>
            ))}
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentStep}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={stepsVariants}
              transition={{ duration: 0.5 }}
              className="w-full px-3 py-2"
            >
              <CurrentComponent
                otherData={otherData}
                formData={formData}
                onSubmit={(data) => onStepSubmit(data)}
                useBackButton={
                  currentStep > 0 ? { onClick: onBackStep } : undefined
                }
              />
            </motion.div>
          </AnimatePresence>
        </section>
      </section>
    </div>
  );
}
