/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Sidenav from "examples/Sidenav";
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import routes from "routes";
import managerRoutes from "managerRoutes";
import userRoutes from "userRoutes";
import { useMaterialUIController, setMiniSidenav } from "context"; 
// animationPlayState: 
// import brandWhite from "assets/images/logo-ct.png";
// import brandDark from "assets/images/logo-ct-dark.png";
import product from "assets/images/product-12.jpg";
import favicon from "assets/images/favicon.png";
import "./messaging_init_in_sw";
import httpInstance from "redux/config/axiosConfig";
// import { Provider } from "react-redux";
// import store from "redux/store";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });
    setRtlCache(cacheRtl);
  }, []);
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });
  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              // brand={(transparentSidenav && !darkMode) || whiteSidenav ? favicon : product}
              // brandName="Admin anil"
              routes={routes}
              managerRoutes={managerRoutes}
              userRoutes={userRoutes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            {/*  */}
          </>
        )}
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/authentication/sign-in/cover" />} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            // brand={(transparentSidenav && !darkMode) || whiteSidenav ? favicon : product}
            // brandName="Admin Anil"
            routes={routes}
            managerRoutes={managerRoutes}
            userRoutes={userRoutes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          {/*  */}
        </>
      )}
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/authentication/sign-in/cover" />} />
      </Routes>
    </ThemeProvider>
  );
}
