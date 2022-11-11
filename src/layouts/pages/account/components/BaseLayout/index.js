/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import breakpoints from "assets/theme/base/breakpoints";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function BaseLayout({ stickyNavbar, children }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }
    window.addEventListener("resize", handleTabsOrientation);
    handleTabsOrientation();
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <DashboardLayout>
      <DashboardNavbar absolute={!stickyNavbar} isMini />
      <MDBox mt={stickyNavbar ? 3 : 10}>
        {children}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
BaseLayout.defaultProps = {
  stickyNavbar: false,
};
BaseLayout.propTypes = {
  stickyNavbar: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default BaseLayout;
