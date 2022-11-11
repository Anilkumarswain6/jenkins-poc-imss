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

function ApiForgotPassword() {

    const [input, setInput] = useState({
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState({
        password: '',
        confirmPassword: ''
    })
    const [loginId, setLoginId] = useState("")
    useEffect(() => {
        setLoginId(JSON.parse(localStorage.getItem("forgotPasId")))
    }, [])
    const [input2, setInput2] = useState({
        userId: "",
        newPassword: "",
    });

    const validateInput = e => {
        const { name, value } = e.target;
        setError(prev => {
            const stateObj = { ...prev, [name]: "" };

            switch (name) {
                case "password":
                    if (!value) {
                        stateObj[name] = "Please enter Password*";
                    } else if (input.confirmPassword && value !== input.confirmPassword) {
                        stateObj["confirmPassword"] = "Password and Confirm Password does not match*";
                    } else {
                        stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
                    }
                    break;

                case "confirmPassword":
                    if (!value) {
                        stateObj[name] = "Please enter Confirm Password*";
                    } else if (input.password && value !== input.password) {
                        stateObj[name] = "Password and Confirm Password does not match*";
                    }
                    break;

                default:
                    break;
            }

            return stateObj;
        });
    }
    const onInputChange = e => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
        setInput2({
            ...input2,
            userId: loginId, newPassword: input.password,
            
        })
        validateInput(e);
    }
    const [changepasswordMsg, setChangepasswordMsg] = useState("")
    const changePasswordApi = async () => {
        const responce = await httpInstance.put('/password/changeForgotPassword', input2)
        setChangepasswordMsg(responce.data.message)
    }
    const updatePasswordBtn = () => {
        if (!input.password && !input.confirmPassword) {
            changePasswordApi()
        }
        if (input.password && input.confirmPassword) {
            changePasswordApi()
        }
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
                    <MDTypography className='err text-warning' sx={{ mt: -2, mb: 2, fontSize: "15px" }}>
                       {changepasswordMsg && changepasswordMsg}
                    </MDTypography>
                    <MDBox component="form" role="form">
                        <MDBox mb={4}>
                            <MDInput
                                variant="standard"
                                fullWidth
                                label="New Password"
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={onInputChange}
                                onBlur={validateInput} />
                            <br />
                            {error.password && <span className='err text-danger' style={{ fontSize: "15px" }}>{error.password}</span>}
                            <br />
                            <MDInput
                                variant="standard"
                                fullWidth
                                label="Confirm New Password"
                                type="password"
                                name="confirmPassword"
                                value={input.confirmPassword}
                                onChange={onInputChange}
                                onBlur={validateInput} />
                            {error.confirmPassword && <span className='err text-danger' style={{ fontSize: "15px" }}>{error.confirmPassword}</span>}
                        </MDBox><MDBox mt={6} mb={1}>
                            <MDButton variant="gradient" color="info" fullWidth onClick={updatePasswordBtn}>
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
        </CoverLayout >
    );
}

export default ApiForgotPassword;
