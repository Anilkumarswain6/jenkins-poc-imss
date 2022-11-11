/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { useState } from "react";
// import { Button } from "@mui/material";

function Cover() {
  const [formValue, setFormValue] = useState({
    fName: '',
    email: '',
    password: ''
  })
  const onInputChange = (e) => {
    // eslint-disable-next-line prefer-const
    let { name, value } = e.target
    setFormValue({ ...formValue, [name]: value })
  }
  const { fName, email, password } = formValue
  // const handleSetRememberMe = () => setRememberMe(!rememberMe);
  // const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [fNameErrMsg, setFnameErrMsg] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [emaillErrMsg, setEmaillErrMsg] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [passworddErrMsg, setPassworddErrMsg] = useState(null)
  const SignInBtnClick = () => {
    if (fName.length <= 3) {
      setFnameErrMsg("Minimum 4 letter required*")
    } else {
      setFnameErrMsg("")
    }
    if (!email) {
      setEmaillErrMsg("email is required*")
    } else {
      setEmaillErrMsg("")
    }
    if (password.length <= 8) {
      setPassworddErrMsg("Minimum 8 character required*")
    } else {
      setPassworddErrMsg("")
    }
    if (fName.length >= 4 && email && password.length >= 8) {
      console.log('formValue', formValue);
    }
  }
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="First Name"
              name="fName"
              value={fName}
              placeholder="Enter First Name"
              variant="standard"
              fullWidth
              InputLabelProps={{ shrink: true }}
              onChange={onInputChange}
            />
            {fNameErrMsg && (
              <div style={{ color: 'red', textAlign: 'left', fontSize: '14px' }}>
                {fNameErrMsg}
              </div>
            )}
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="email"
              label="Email"
              variant="standard"
              fullWidth
              placeholder="john@example.com"
              InputLabelProps={{ shrink: true }}
              value={email} name="email"
              onChange={onInputChange}
            />
            {emaillErrMsg && (
              <div style={{ color: 'red', textAlign: 'left', fontSize: '14px' }}>
                {emaillErrMsg}
              </div>
            )}
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="password"
              label="Password"
              variant="standard"
              fullWidth
              placeholder="************"
              InputLabelProps={{ shrink: true }}
              value={password} name="password"
              onChange={onInputChange}
            />
            {passworddErrMsg && (
              <div style={{ color: 'red', textAlign: 'left', fontSize: '14px' }}>
                {passworddErrMsg}
              </div>
            )}
          </MDBox>
          {/* <br/> */}
          <MDBox mt={4} mb={1}>
            <MDButton
              // style={{position: "absolute"}}
              fullWidth
              variant="gradient"
              color="info"
              onClick={() => { SignInBtnClick() }}
            >
              Sign Up
            </MDButton>
          </MDBox>
          <MDBox mt={3} mb={1} textAlign="center">
            <MDTypography variant="button" color="text">
              Don&apos;t have an account?{" "}
              <MDTypography
                component={Link}
                to="/authentication/sign-in/cover"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                Sign in
              </MDTypography>
            </MDTypography>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
