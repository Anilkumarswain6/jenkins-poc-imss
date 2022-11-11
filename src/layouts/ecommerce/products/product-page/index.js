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
// import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";

// ProductPage page components
// import ProductImages from "layouts/ecommerce/products/product-page/components/ProductImages";
// import ProductInfo from "layouts/ecommerce/products/product-page/components/ProductInfo";
import TableProduct from "./TableProduct";

// Data
// import dataTableData from "layouts/ecommerce/products/product-page/data/dataTableData";

function ProductPage() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Card sx={{ overflow: "visible" }}>
          <MDBox p={3}>
            <MDBox mt={1} mb={1}>
              <MDBox ml={2}>
                <MDTypography variant="h5" fontWeight="medium">
                  Project List
                </MDTypography>
              </MDBox>
              <TableProduct />
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ProductPage;
