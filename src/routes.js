/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import Analytics from "layouts/dashboards/analytics";
import NewUser from "layouts/pages/users/new-user";
import Settings from "layouts/pages/account/settings";
import DataTables from "layouts/applications/data-tables";
import NewProduct from "layouts/ecommerce/products/new-product";
import ProductPage from "layouts/ecommerce/products/product-page";
import SignInCover from "layouts/authentication/sign-in/cover";
import SignUpCover from "layouts/authentication/sign-up/cover";
import ResetCover from "layouts/authentication/reset-password/cover";
// import ResetCoverr from "layouts/authentication/reset-password/coverr";
import MDAvatar from "components/MDAvatar";
import Icon from "@mui/material/Icon";
import ApiForgotPassword from "layouts/authentication/reset-password/coverr/ApiForgotPassword";
import httpInstanceImg from "./redux/config/axiosConfigImg"

const id = JSON.parse(localStorage.getItem("user image"));
const fname = JSON.parse(localStorage.getItem("user fname"));
const str = fname.charAt(0).toUpperCase() + fname.slice(1);
const routes = [
  {
    type: "collapse",
    name: str,
    key: "brooklyn-alice",
    icon: <MDAvatar src={`${httpInstanceImg }${id}`} alt="" size="sm" />,
    collapse: [
      {
        name: "Settings",
        key: "profile-settings",
        route: "/pages/account/settings",
        component: <Settings />,
      },
    ],
  },
  { type: "divider", key: "divider-0" },
  {
    type: "collapse",
    name: "Dashboards",
    key: "dashboards",
    icon: <Icon fontSize="medium">dashboard</Icon>,
    collapse: [
      {
        name: "Analytics",
        key: "analytics",
        route: "/dashboards/analytics",
        component: <Analytics />,
      },
    ],
  },
  { type: "title", title: "Pages", key: "title-pages" },
  {
    type: "collapse",
    name: "Users",
    icon: <Icon fontSize="medium">image</Icon>,
    collapse: [
      {
        name: "Add Users",
        key: "new-user",
        route: "/new-user/add-user",
        component: <NewUser />,
      }, {
        name: "List Users",
        key: "data-tables",
        route: "/applications/data-tables",
        component: <DataTables />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Projects",
    key: "ecommerce",
    icon: <Icon fontSize="medium">shopping_basket</Icon>,
    collapse: [
      {
        name: "Add Projects",
        key: "new-product",
        route: "/ecommerce/products/new-product",
        component: <NewProduct />,
      },
      {
        name: "List Projects",
        key: "product-page",
        route: "/ecommerce/products/product-page",
        component: <ProductPage />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Authentication",
    key: "authentication",
    icon: <Icon fontSize="medium">content_paste</Icon>,
    collapse: [
      {
        name: "Sign In",
        key: "sign-in",
        collapse: [
          {
            name: "Cover",
            key: "cover",
            route: "/authentication/sign-in/cover",
            component: <SignInCover />,
          },
        ],
      },
      {
        name: "Sign Up",
        key: "sign-up",
        collapse: [
          {
            name: "Cover",
            key: "cover",
            route: "/authentication/sign-up/cover",
            component: <SignUpCover />,
          },
        ],
      },
      {
        name: "Reset Password",
        key: "reset-password",
        collapse: [
          {
            name: "Cover",
            key: "cover",
            route: "/authentication/reset-password/cover1",
            component: <ResetCover />,
          },
        ],
      },
      {
        name: "Reset Password",
        key: "reset-password",
        collapse: [
          {
            name: "Cover",
            key: "cover",
            route: "/authentication/reset-password/cover",
            component: <ApiForgotPassword />,
          },
        ],
      },
    ],
  },
];

export default routes;
