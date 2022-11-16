/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
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

// @material-ui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// import Autocomplete from "@mui/material/Autocomplete";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useSelector } from "react-redux";

function BasicInfo() {
  const profileData = useSelector(state => state.userData.userProfileData)
  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <MDBox p={3}>
        <MDTypography variant="h5">Basic Info</MDTypography>
      </MDBox>
      <MDBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                First Name
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="medium">
                {profileData.fname && profileData.fname.charAt(0).toUpperCase() + profileData.fname.slice(1)}
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
            <MDTypography variant="h5" fontWeight="medium">
                Last Name
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="medium">
                {profileData.lname && profileData.lname.charAt(0).toUpperCase() + profileData.lname.slice(1)}
              </MDTypography>
            </MDBox>
          </Grid>

        </Grid>
        <Grid container spacing={3} sx={{mt:1}}>
          <Grid item xs={12} sm={4}>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
               <MDTypography variant="h5" fontWeight="medium">
                Email
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="medium">
                {profileData.email && profileData.email.charAt(0).toUpperCase() + profileData.email.slice(1)}
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
            <MDTypography variant="h5" fontWeight="medium">
                Date
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="medium">
                {profileData.date && profileData.date.charAt(0).toUpperCase() + profileData.date.slice(1)}
              </MDTypography>
            </MDBox>
          </Grid>

        </Grid>
      </MDBox>
    </Card>
  );
}

export default BasicInfo;
