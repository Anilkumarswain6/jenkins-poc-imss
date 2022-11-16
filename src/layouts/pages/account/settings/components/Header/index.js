/* eslint-disable eqeqeq */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
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

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import "./profileheadrs.css"
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import { useEffect, useState } from "react";
import httpInstance from "redux/config/axiosConfig";
import httpInstanceImg from "redux/config/axiosConfigImg";
import { useSelector,useDispatch } from "react-redux";
import * as sagaActions from '../../../../../../redux/sagaActions'  

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function Header() {
  const profileData = useSelector(state => state.userData.userProfileData)
  const userId = useSelector(state => state.userData.loginUserId.data.payload._id)
  const dispatch=useDispatch()
  const imageChange = (e) => {
    window.location.reload(false)
    const file = e.target.files[0];
    const profile = new FormData();
    profile.append("profile", file);
    profile.append("id", userId);
   dispatch({ type: sagaActions.UPDATE_USERS_PROFILE, profile})
     }
  return (
    <Card id="profile">
      <MDBox p={2}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <div className="container">
              <MDAvatar src={`${httpInstanceImg}${profileData.image}`} alt="profile-image" className="image" size="xl" shadow="sm" />
              <div className="middle">
                <div className="text">
                  <Tooltip title="Add" placement="top">
                    <IconButton color="primary" aria-label="upload picture" component="label">
                      <input hidden accept="image/*" type="file" onChange={(e) => imageChange(e)} />
                      <CreateIcon sx={{ color: 'blue', cursor: 'pointer' }} />
                    </IconButton>
                  </Tooltip>
                  {" "}
                </div>
              </div>
              <div className="bg-penIcon"> <AddIcon fontSize="medium" className="penIcon" /> </div>
            </div>
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {profileData.fname && profileData.fname.charAt(0).toUpperCase() + profileData.fname.slice(1)}
                {" "}
                {profileData.lname && profileData.lname.charAt(0).toUpperCase() + profileData.lname.slice(1)}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="medium">
                {profileData.email && profileData.email.charAt(0).toUpperCase() + profileData.email.slice(1)}
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </Card >
  );
}

export default Header;
