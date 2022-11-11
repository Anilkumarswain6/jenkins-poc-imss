/* eslint-disable prettier/prettier */
import Analytics from "layouts/dashboards/analytics";
import Settings from "layouts/pages/account/settings";
import DataTables from "layouts/applications/data-tables";
import ProductPage from "layouts/ecommerce/products/product-page";
import MDAvatar from "components/MDAvatar";
import Icon from "@mui/material/Icon";
import httpInstanceImg from "./redux/config/axiosConfigImg"

const id = JSON.parse(localStorage.getItem("user image"));
const fname = JSON.parse(localStorage.getItem("user fname"));
const str = fname.charAt(0).toUpperCase() + fname.slice(1);
const userRoutes = [
    {
        type: "collapse",
        name: str,
        key: "brooklyn-alice",
        icon: <MDAvatar src={`${httpInstanceImg}${id}`} alt="" size="sm" />,
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
                name: "List Users",
                key: "data-tables",
                route: "/applications/data-tables",
                component: <DataTables />,
            },
        ],
    },
    {
        type: "collapse",
        name: "Products",
        key: "ecommerce",
        icon: <Icon fontSize="medium">shopping_basket</Icon>,
        collapse: [
            {
                name: "Product Page",
                key: "product-page",
                route: "/ecommerce/products/product-page",
                component: <ProductPage />,
            },
        ],
    },
];

export default userRoutes;
