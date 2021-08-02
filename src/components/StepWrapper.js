import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Card,
} from "@material-ui/core";
import React from "react";

const steps = ["Track information", "Download the cover", "Download track"];

const StepWrapper = ({ activeStep, children }) => {
  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={index} completed={activeStep > index}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid
        container
        justifyContent="center"
        style={{ margin: "70px 0", height: 300 }}
      >
        <Card style={{ width:700 }}>{children}</Card>
      </Grid>
    </Container>
  );
};

export default StepWrapper;
