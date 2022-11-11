/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unreachable */
/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
// import { useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-in-cover.jpeg";
import httpInstance from "../../../../redux/config/axiosConfig";
import * as sagaActions from '../../../../redux/sagaActions'
// import firebase from "firebase.js";

function Cover() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.userData.token)
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const onInputChange = (e) => {
    const { name, value } = e.target
    setFormValue({ ...formValue, [name]: value })
  }
  const { email, password } = formValue
  const navigate = useNavigate();
  const [emaillErrMsg, setEmaillErrMsg] = useState(null)
  const [passworddErrMsg, setPassworddErrMsg] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [loginResponce, setLoginResponce] = useState(null)
  const [tokenState, setTokenState] = useState("")
  const [roleState, setRoleState] = useState("")




const [loadProfile, setloadProfile] = useState(false)
  const loginResponceBtn = async () => {
    dispatch({ type: sagaActions.LOGIN_START, formValue })
    setloadProfile(!loadProfile)
    // const responce = await httpInstance.post('/users/login', formValue)
    // setRoleState(responce.data.data.payload.role)
    // setTokenState(responce.data.data.token)
    // setLoginResponce(responce.status)
    // localStorage.setItem('loginUserId', JSON.stringify(responce.data.data.payload._id));
    // localStorage.setItem('user fname', JSON.stringify(responce.data.data.payload.fname));
    // const fname = JSON.parse(localStorage.getItem("user fname"));
  }
  const reduxState = useSelector(state => state.userData)
 const [loginSuccess, setloginSuccess] = useState(false)
  const SignInBtnClick = () => {
    if (!email) {
      setEmaillErrMsg("Email is required*")
    } else {
      setEmaillErrMsg("")
    }
    if (password.length <= 4) {
      setPassworddErrMsg("Minimum 8 character required*")
    } else {
      setPassworddErrMsg("")
    }
    if (email && password.length >= 5) {
      setEmaillErrMsg("")
      setPassworddErrMsg("")
      loginResponceBtn()
      setloginSuccess(!loginSuccess)
    }
  }
  useEffect(() => {
    if (token) {
      navigate("/dashboards/analytics");
    }
  }, [token])



  const [imageSelectedId, setImageSelectedId] = useState("")
  useEffect(() => {
    setImageSelectedId(JSON.parse(localStorage.getItem("loginUserId")))
  }, [])
  const _id = reduxState.loginData._id
  const loadUserProfile = async () => {
    dispatch({ type: sagaActions.LOAD_USERS_PROFILE,_id })
    // const responce = await httpInstance.get(`/users/getProfile/${imageSelectedId}`)
    // localStorage.setItem('user image', JSON.stringify(responce.data.data.image));

  }

  // useEffect(() => {
  //   loadUserProfile()
  // }, [loadProfile===true])



  useEffect(() => {
    if (tokenState) {
      localStorage.setItem('dataKey', JSON.stringify(tokenState));
    }
  }, [tokenState])
  useEffect(() => {
    if (roleState) {
      localStorage.setItem('role', JSON.stringify(roleState));
    }
  }, [roleState])

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
            Sign in
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to Sign In
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
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
          <MDBox mt={4} mb={1}>
            <MDButton
              fullWidth
              variant="gradient"
              color="info"
              onClick={() => { SignInBtnClick() }}
            >
              Sign In
            </MDButton>
          </MDBox>
          <MDBox mt={1} textAlign="center">
            <MDTypography variant="button" color="text">
              <MDTypography
                component={Link}
                to="/authentication/reset-password/cover1"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                Forgot Password
              </MDTypography>
            </MDTypography>
          </MDBox>
          <MDBox mt={1} mb={1} textAlign="center">
            <MDTypography variant="button" color="text">
              Don&apos;t have an account?{" "}
              <MDTypography
                component={Link}
                to="/authentication/sign-up/cover"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                Sign up
              </MDTypography>
            </MDTypography>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
