/* eslint-disable no-underscore-dangle */
/* eslint-disable dot-notation */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import { useSelector,useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useEffect, useState } from "react";
import httpInstance from "redux/config/axiosConfig";
import * as sagaActions from '../../../../../../redux/sagaActions'

function ChangePassword() {
  const dispatch=useDispatch()
  const userId = useSelector(state => state.userData.loginUserId)
  const [input, setInput] = useState({
    current_password: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState({
    current_password: '',
    password: '',
    confirmPassword: ''
  })
  const [loginId, setLoginId] = useState("")
  useEffect(() => {
    setLoginId(userId.data.payload._id)
  }, [])
  const [input2, setInput2] = useState({
    _id: "",
    password: "",
    newpassword: ""
  });

  const validateInput = e => {
    const { name, value } = e.target;
    setError(prev => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "current_password":
          if (!value) {
            stateObj[name] = "Please enter Current password*";
          }
          break;

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
      _id: loginId, password: input.current_password,
      newpassword: input.password
    })
    validateInput(e);
  }
  const [formErr, setFormErr] = useState("")
  const updatePasswordBtn = () => {
    if (input.current_password && input.password && input.confirmPassword) {
      dispatch({ type: sagaActions.CHANGE_PASSWORD_START, input2})
      setFormErr("")
    } else {
      setFormErr("Please fill password below*")
    }
  }
  return (
    <Card id="change-password">
      <MDBox p={3}>
        <MDTypography variant="h5">Change Password</MDTypography>
      </MDBox>
      <MDTypography className='err text-danger' sx={{ mt: -2, mb: 2, ml: 3.3, fontSize: "15px" }}>
        {formErr}
      </MDTypography>
      <MDBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MDInput
              fullWidth
              label="Current Password"
              type="text"
              name="current_password"
              value={input.current_password}
              onChange={onInputChange}
              onBlur={validateInput} />
            <br />
            {error.current_password && <span className='err text-danger' style={{ fontSize: "15px" }}>{error.current_password}</span>}
          </Grid>
          <Grid item xs={12}>
            <MDInput
              fullWidth
              label="New Password"
              type="password"
              name="password"
              value={input.password}
              onChange={onInputChange}
              onBlur={validateInput} />
            <br />
            {error.password && <span className='err text-danger' style={{ fontSize: "15px" }}>{error.password}</span>}
          </Grid>
          <Grid item xs={12}>
            <MDInput
              fullWidth
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={onInputChange}
              onBlur={validateInput} />
            <br />
            {error.confirmPassword && <span className='err text-danger' style={{ fontSize: "15px" }}>{error.confirmPassword}</span>}
          </Grid>
        </Grid>
        <MDBox display="flex" sx={{ mt: 3 }} justifyContent="space-between" alignItems="flex-end" flexWrap="wrap">
          <MDBox ml="auto">
            <MDButton variant="gradient" color="dark" size="small"
              onClick={updatePasswordBtn}
            >
              update password
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default ChangePassword;
