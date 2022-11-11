import { useState, useEffect } from "react";
import Icon from "@mui/material/Icon";
import Popper from "@mui/material/Popper";
import Grow from "@mui/material/Grow";
import Container from "@mui/material/Container";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import breakpoints from "assets/theme/base/breakpoints";

function DefaultNavbar() {
  const [arrowRef, setArrowRef] = useState(null);
  const [mobileNavbar, setMobileNavbar] = useState(false);

  const openMobileNavbar = () => setMobileNavbar(!mobileNavbar);

  useEffect(() => {
    function displayMobileNavbar() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileNavbar(false);
      } else {
        setMobileNavbar(false);
      }
    }

    window.addEventListener("resize", displayMobileNavbar);

    displayMobileNavbar();

    return () => window.removeEventListener("resize", displayMobileNavbar);
  }, []);

  const dropdownMenu = (
    <Popper
      popperRef={null}
      placement="top-start"
      transition
      style={{ zIndex: 999 }}
      modifiers={[
        {
          name: "arrow",
          enabled: true,
          options: {
            element: arrowRef,
          },
        },
      ]}
    >
      {({ TransitionProps }) => (
        <Grow
          {...TransitionProps}
          sx={{
            transformOrigin: "left top",
            background: ({ palette: { white } }) => white.main,
          }}
        >
          <MDBox borderRadius="lg">
            <MDTypography variant="h1" color="white">
              <Icon ref={setArrowRef} sx={{ mt: -3 }}>
                arrow_drop_up
              </Icon>
            </MDTypography>
          </MDBox>
        </Grow>
      )}
    </Popper>
  );

  return (
    <Container>
      <MDBox
        py={1}
        my={3}
        mx={3}
        width="calc(100% - 48px)"
        borderRadius="lg"
        position="absolute"
        left={0}
        zIndex={99}
      >
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          <MDBox
            display={{ xs: "inline-block", lg: "none" }}
            lineHeight={0}
            py={1.5}
            pl={1.5}
            sx={{ cursor: "pointer" }}
            onClick={openMobileNavbar}
          >
            <Icon fontSize="default">{mobileNavbar ? "close" : "menu"}</Icon>
          </MDBox>
        </MDBox>
      </MDBox>
      {dropdownMenu}
    </Container>
  );
}

export default DefaultNavbar;
