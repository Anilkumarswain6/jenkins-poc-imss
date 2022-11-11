/* eslint-disable prettier/prettier */

import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";
import "./data/tableindex.css";
import TableUsers from "./TableUsers";
// Data
// import dataTableData from "layouts/applications/data-tables/data/dataTableData";

function DataTables() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
            <MDTypography variant="h5" fontWeight="medium">
              Datatable Search
            </MDTypography>
            <MDTypography variant="button" color="text">
              A lightweight, extendable, dependency-free javascript HTML table plugin.
            </MDTypography>
          </MDBox>
          {/* <TableContainer>
            <Table sx={{ ml: 3, mr: 3, mb: 4, width: "auto", border: "2px solid red" }} aria-label="simple table">
              <thead>
                <TableRow sx={{ display: "flex", justifyContent: "space-evenly" }}>
                  <th>First Name</th>
                  <th>Last name</th>
                  <th>Emial</th>
                  <th>Role</th>
                </TableRow>
              </thead>
              <TableBody>
                <tbody className="tablerow">
                  <TableCell align="left"> row.name </TableCell>
                  <TableCell align="left">row.calories</TableCell>
                  <TableCell align="left">row.fat</TableCell>
                  <TableCell align="left">row.carbs</TableCell>
                </tbody>
                <tbody className="tablerow">
                  <TableCell> row.name </TableCell>
                  <TableCell>row.calories</TableCell>
                  <TableCell>row.fat</TableCell>
                  <TableCell>row.carbs</TableCell>
                </tbody>
              </TableBody>
            </Table>
          </TableContainer> */}
          <TableUsers/>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DataTables;
