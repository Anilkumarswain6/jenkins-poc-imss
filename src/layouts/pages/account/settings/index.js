/* eslint-disable no-underscore-dangle */
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
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Settings page components
import BaseLayout from "layouts/pages/account/components/BaseLayout";
import Sidenav from "layouts/pages/account/settings/components/Sidenav";
import Header from "layouts/pages/account/settings/components/Header";
import BasicInfo from "layouts/pages/account/settings/components/BasicInfo";
import ChangePassword from "layouts/pages/account/settings/components/ChangePassword";
import { useEffect, useState } from "react";
import httpInstance from "redux/config/axiosConfig";
import { useSelector,useDispatch } from "react-redux";
import * as sagaActions from '../../../../redux/sagaActions'

function Settings() {
  const dispatch=useDispatch()
  const [imageSelectedId1, setImageSelectedId1] = useState("")
  const [userProfileData, setUserProfileData] = useState({})
  const userId1 = useSelector(state => state.userData.loginUserId)
  const userId = useSelector(state => state.userData.loginUserId.data.payload._id)
  useEffect(() => {
    setImageSelectedId1(userId1.data.payload._id)
  }, [])
  const loadUserProfile = async () => {
    const responce = await httpInstance.get(`/users/getProfile/${imageSelectedId1}`)
    localStorage.setItem('user image', JSON.stringify(responce.data.data.image));
    setUserProfileData(responce.data.data)
  }

  useEffect(() => {
    dispatch({ type: sagaActions.LOAD_USERS_PROFILE, userId})
}, [])
  return (
    <BaseLayout>
      <MDBox mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={3}>
            <Sidenav />
          </Grid>
          <Grid item xs={12} lg={9}>
            <MDBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Header userProfileData={userProfileData} imageSelectedId={imageSelectedId1} loadUserProfile={loadUserProfile} />
                </Grid>
                <Grid item xs={12}>
                  <BasicInfo userProfileData={userProfileData} />
                </Grid>
                <Grid item xs={12}>
                  <ChangePassword />
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </BaseLayout>
  );
}

export default Settings;
