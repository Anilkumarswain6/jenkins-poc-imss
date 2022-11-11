/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
import PropTypes from "prop-types";
import "./userInfo.css"
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import FormField from "layouts/pages/users/new-user/components/FormField";
import { useState } from "react";
import MDButton from "components/MDButton";
import { useDispatch,useSelector } from 'react-redux';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import * as sagaActions from '../../../../../../redux/sagaActions'

// eslint-disable-next-line no-unused-vars
function UserInfo({ formData }) {
  const token = useSelector(state => state.userData.token)
  const header = { headers: { "Authorization": `Bearer ${token}` } }
  const dispatch = useDispatch()
  const [formValue, setFormValue] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    role: "",
    department: ''
  })
  // eslint-disable-next-line no-unused-vars
  const { fname, lname, email, password, role, department } = formValue
  // eslint-disable-next-line no-unused-vars
  const [options, setOptions] = useState([
    {
      label: "Manager",
      value: "manager"
    },
    {
      label: "Team lead",
      value: "teamLead"
    },
    {
      label: "Team member",
      value: "teamMember"
    }
  ])
  const [options1, setOptions1] = useState([
    {
      label: "IT",
      value: "it"
    },
    {
      label: "Technician",
      value: "technician"
    },
    {
      label: "Developer",
      value: "developer"
    }
  ])
  const onInputChange = (e) => {
    const { name, value } = e.target
    setFormValue({ ...formValue, [name]: value })
  }
  const [fnameErrMsg, setfnameErrMsg] = useState(null)
  const [lnameErrMsg, setlnameErrMsg] = useState(null)
  const [emailErrMsg, setemailErrMsg] = useState(null)
  const [passwordErrMsg, setpasswordErrMsg] = useState(null)
  const [roleErrMsg, setroleErrMsg] = useState(null)
  const [departmentErrMsg, setDepartmentErrMsg] = useState(null)
  const onDroupdownChange = (e) => {
    setFormValue({ ...formValue, role: e.target.value })
  }
  const onDroupdownChange1 = (e) => {
    setFormValue({ ...formValue, department: e.target.value })
  }

  const formDatapost = async () => {
    // const token = JSON.parse(localStorage.getItem('dataKey'))
    // const responce = await httpInstance.post('/users/addUsers', formValue,
    //   { headers: { "Authorization": `Bearer ${token}` } })
    dispatch({ type: sagaActions.CREATE_USER_START, formValue,header })
  }
  const userFormSubmit = () => {
    if (fname.length <= 3) {
      setfnameErrMsg("Minimum 4 letter required*")
    } else {
      setfnameErrMsg("")
    }
    if (lname.length <= 1) {
      setlnameErrMsg("Required*")
    } else {
      setlnameErrMsg("")
    }
    if (!email) {
      setemailErrMsg("Email is required*")
    } else {
      setemailErrMsg("")
    }
    if (password.length <= 3) {
      setpasswordErrMsg("Minimum 4 character required*")
    } else {
      setpasswordErrMsg("")
    }
    if (!role) {
      setroleErrMsg("Role is required*")
    } else {
      setroleErrMsg("")
    }
    if (!department) {
      setDepartmentErrMsg("Department is required*")
    } else {
      setDepartmentErrMsg("")
    }
    if (fname.length >= 3 && lname.length >= 1 && email && password.length >= 3 && role && department) {
      formDatapost()
    }
  }
  return (
    <MDBox>
      <MDBox lineHeight={0}>
        <MDTypography variant="h5">About me</MDTypography>
        <MDTypography variant="button" color="text">
          Mandatory informations
        </MDTypography>
      </MDBox>
      <MDBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl variant="standard" sx={{ mb: 1, minWidth: 310 }}>
              <InputLabel id="demo-simple-select-helper-label">Please Select Role</InputLabel>
              <Select
                sx={{ height: 45 }}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={role}
                label="Please Select Role"
                onChange={onDroupdownChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {options.map((e, i) => {
                  // eslint-disable-next-line react/no-array-index-key
                  return <MenuItem value={e.value} key={i}>{e.label}</MenuItem>
                })}
              </Select>
            </FormControl>
            {roleErrMsg && (
              <div style={{ color: 'red', textAlign: 'left', fontSize: '14px' }} >
                {roleErrMsg}
              </div>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="standard" sx={{ mb: 1, minWidth: 310 }}>
              <InputLabel id="demo-simple-select-helper-label">Please Select Department</InputLabel>
              <Select
                sx={{ height: 45 }}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={department}
                label="Please Select Role"
                onChange={onDroupdownChange1}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {options1.map((e, i) => {
                  // eslint-disable-next-line react/no-array-index-key
                  return <MenuItem value={e.value} key={i}>{e.label}</MenuItem>
                })}
              </Select>
            </FormControl>
            {departmentErrMsg && (
              <div style={{ color: 'red', textAlign: 'left', fontSize: '14px' }} >
                {departmentErrMsg}
              </div>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type="text"
              label="First Name"
              name="fname"
              value={fname}
              placeholder="Enter First Name"
              onChange={onInputChange}
            />
            {fnameErrMsg && (
              <div style={{ color: 'red', textAlign: 'left', fontSize: '14px' }}>
                {fnameErrMsg}
              </div>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type="text"
              label="Last Name"
              name="lname"
              value={lname}
              placeholder="Enter Last Name"
              onChange={onInputChange}
            />
            {lnameErrMsg && (
              <div style={{ color: 'red', textAlign: 'left', fontSize: '14px' }}>
                {lnameErrMsg}
              </div>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              sx={{ mt: 2 }}
              type="email"
              label="Email"
              name="email"
              value={email}
              placeholder="Enter Email"
              onChange={onInputChange}
            />
            {emailErrMsg && (
              <div style={{ color: 'red', textAlign: 'left', fontSize: '14px' }}>
                {emailErrMsg}
              </div>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              sx={{ mt: 2 }}
              type="password"
              label="Password"
              name="password"
              value={password}
              placeholder="Enter Password"
              onChange={onInputChange}
            />
            {passwordErrMsg && (
              <div style={{ color: 'red', textAlign: 'left', fontSize: '14px' }}>
                {passwordErrMsg}
              </div>
            )}
          </Grid>
        </Grid>

        <br />
        <MDButton
          type="submit"
          variant="gradient"
          color="dark"
          onClick={() => { userFormSubmit() }}
        >
          Submit
        </MDButton>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for UserInfo
UserInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default UserInfo;
