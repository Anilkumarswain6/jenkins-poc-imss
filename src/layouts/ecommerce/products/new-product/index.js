/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProductInfo from "layouts/ecommerce/products/new-product/components/ProductInfo";

function getSteps() {
  return ["Project Info"];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <ProductInfo />;
    default:
      return null;
  }
}

function NewProduct() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={5} mb={9}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <MDBox mt={6} mb={8} textAlign="center">
              <MDBox mb={1}>
                <MDTypography variant="h3" fontWeight="bold">
                  Add New Project
                </MDTypography>
              </MDBox>
              <MDTypography variant="h5" fontWeight="regular" color="secondary">
                This information will describe more about the project.
              </MDTypography>
            </MDBox>
            <Card>
              <MDBox mt={-3} mb={3} mx={2}>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </MDBox>
              <MDBox p={2}>
                <MDBox>
                  {getStepContent(activeStep)}
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default NewProduct;
