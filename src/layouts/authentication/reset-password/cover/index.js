/* eslint-disable dot-notation */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import httpInstance from "redux/config/axiosConfig";
import ApiForgotPassword from "../coverr/ApiForgotPassword";

function Cover() {
  const [resetEmail, setResetEmail] = useState({
    email: ""
  })
  const resetInputChange = (e) => {
    setResetEmail({ ...resetEmail, email: e.target.value })
  }
  const data = async () => {
    const responce = await httpInstance.post('/password/forgotPassword', resetEmail)
    localStorage.setItem('forgotPasId', JSON.stringify(responce.data.userId));
  }
  const resetBtnClick = () => {
    data()
  }
  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Forgot Password
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            You will receive an e-mail in maximum 60 seconds
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={4}>
              <MDInput type="email"
                label="Email"
                name="email"
                value={resetEmail.email}
                onChange={resetInputChange}
                variant="standard"
                fullWidth />
            </MDBox><MDBox mt={6} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={resetBtnClick}>
                Send
              </MDButton>
            </MDBox>

            <MDBox mt={3} textAlign="center">
              <MDTypography variant="button" color="text">
                Click here to{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in/cover"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Login Page
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
