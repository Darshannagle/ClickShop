import {
  Box,
  Step,
  StepLabel,
  Stepper,
  Typography,
  IconButton,
} from "@mui/material";
import { useState, type ReactNode } from "react";
import { FcLeft, FcRight } from "react-icons/fc";

const SelectAddress = () => {
  const [addresses, setAddresses] = useState<string[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  return <>Select Addresses</>;
};

const ShoppingCart = () => {
  return <>Shopping Cart</>;
};

const PaymentForm = () => {
  return <>Payment Form</>;
};

const Order = () => {
  const steps = ["Address", "Shopping", "Payment"];

  const getStepContent: { [key: string]: ReactNode } = {
    Address: <SelectAddress />,
    Shopping: <ShoppingCart />,
    Payment: <PaymentForm />,
  };

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const isStepOptional = (step: number): boolean => {
    console.log(step);
    return false;
  };
  const isStepSkipped = (step: number) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prev) => prev + 1);
    if (activeStep === steps.length) {
      setActiveStep(0);
    }
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    if (!isStepOptional(activeStep)) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // throw error if skipping not allowed
      return;
    }
    setActiveStep((prev) => prev + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => setActiveStep(0);

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper sx={{ m: 2 }} activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {
        <>
          <IconButton onClick={handleBack}>
            <FcLeft />
          </IconButton>
          {getStepContent[steps[activeStep]]}
          <IconButton onClick={handleNext}>
            <FcRight />
          </IconButton>
        </>
      }
    </Box>
  );
};

export default Order;
