/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
// import { TextField } from "@mui/material";
import { useSelector,useDispatch } from "react-redux";
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import FormField from "layouts/pages/account/components/FormField";
import { useState } from "react";
import { useTheme } from '@mui/material/styles';
import './productform.css'
import * as sagaActions from '../../../../../../redux/sagaActions'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "React js",
  "Angular Js",
  "View Js",
  "Java",
  "Python",
  "Node",
];

function getStyles(name, technologyName, theme) {
  return {
    fontWeight:
      technologyName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


function ProductInfo() {
  const token = useSelector(state => state.userData.token)
  const header = { headers: { "Authorization": `Bearer ${token}` } }
  const dispatch = useDispatch()
  const [projectDetails, setProjectDetails] = useState({
    projectName: "",
    clientName: "",
    duration: "",
    technologies: [],
    projectDescription: "",
  });
  const theme = useTheme();
  const [technologyName, settechnologyName] = useState([]);

  const handleChange1 = (event) => {
    const { target: { value }, } = event;
    settechnologyName(typeof value === 'string' ? value.split(',') : value,);
    setProjectDetails({ ...projectDetails, technologies: typeof value === 'string' ? value.split(',') : value, })
  };
  const { projectName, clientName, duration, technologies, projectDescription } = projectDetails

  const handleChange = (e) => {
    const { name, value } = e.target
    setProjectDetails({ ...projectDetails, [name]: value })
  };
  const [projectNameErrMsg, setProjectNameErrMsg] = useState(null)
  const [clienTnameErrMsg, setClienTnameErrMsg] = useState(null)
  const [durationErrMsg, setDurationErrMsg] = useState(null)
  const [projectDescriptionErrMsg, setprojectDescriptionErrMsg] = useState(null)
  const [technologiesErrMsg, seTechnologiesErrMsg] = useState(null)

  
  const formDatapost = async () => {
    // const token = JSON.parse(localStorage.getItem('dataKey'))
    // const responce = await httpInstance.post('/projects/add-project', projectDetails,
    //   { headers: { "Authorization": `Bearer ${token}` } })
    dispatch({ type: sagaActions.CREATE_PROJECT_START, projectDetails,header })
  }

  
  const userFormSubmit = () => {
    if (projectName.length <= 3) {
      setProjectNameErrMsg("Project Name Required*")
    } else {
      setProjectNameErrMsg("")
    }
    if (clientName.length <= 3) {
      setClienTnameErrMsg("Client Name Required*")
    } else {
      setClienTnameErrMsg("")
    }
    if (duration.length <= 3) {
      setDurationErrMsg("Duration Required*")
    } else {
      setDurationErrMsg("")
    }
    if (technologies.length <= 1) {
      seTechnologiesErrMsg("Technologies Required*")
    } else {
      seTechnologiesErrMsg("")
    }
    if (projectDescription.length <= 3) {
      setprojectDescriptionErrMsg("projectDescription Required*")
    } else {
      setprojectDescriptionErrMsg("")
    }
    // eslint-disable-next-line no-sequences
    if (projectName >= 4, clientName >= 4, duration >= 4, technologies, projectDescription)
      formDatapost()
    setProjectDetails({
      projectName: "",
      clientName: "",
      duration: "",
      technologies: [],
      projectDescription: "",
    })
    settechnologyName([])
  }
  return (
    <MDBox>
      <MDTypography variant="h5">Project Information</MDTypography>
      <MDBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type="text"
              label="Project Name"
              name="projectName"
              value={projectName}
              placeholder="Enter Project Name"
              onChange={handleChange}
            />
            {projectNameErrMsg && (
              <div style={{ color: 'red', textAlign: 'left', fontSize: '14px' }}>
                {projectNameErrMsg}
              </div>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type="text"
              label="Client Name"
              name="clientName"
              value={clientName}
              placeholder="Enter Client Name"
              onChange={handleChange}
            />
            {clienTnameErrMsg && (
              <div style={{ color: 'red', textAlign: 'left', fontSize: '14px' }}>
                {clienTnameErrMsg}
              </div>
            )}
          </Grid>
        </Grid>


        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <FormField
              type="text"
              label="Duration"
              name="duration"
              value={duration}
              placeholder="Enter Project Duration"
              onChange={handleChange}
            />
            {durationErrMsg && (
              <div style={{ color: 'red', textAlign: 'left', fontSize: '14px' }}>
                {durationErrMsg}
              </div>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              sx={{ width: '100%' }}
              id="standard-multiline-flexible"
              label="projectDescription"
              multiline
              maxRows={3}
              name="projectDescription"
              value={projectDescription}
              placeholder="Enter Project projectDescription"
              onChange={handleChange}
              variant="standard"
            />
            {projectDescriptionErrMsg && (
              <div style={{ color: 'red', textAlign: 'left', fontSize: '14px' }}>
                {projectDescriptionErrMsg}
              </div>
            )}
          </Grid>
        </Grid>


        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6} sx={{ mt: -2 }}>
            <FormControl variant="standard" sx={{ mb: 1, minWidth: 310 }}>
              <InputLabel id="demo-simple-select-helper-label">Please Select Technology</InputLabel>
              <Select
                sx={{ height: 45 }}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                multiple
                value={technologyName}
                onChange={handleChange1}
              >
                {names.map((name) => (
                  <MenuItem
                    className='select-box-product1'
                    key={name}
                    value={name}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {technologiesErrMsg && (
              <div style={{ color: 'red', textAlign: 'left', fontSize: '14px' }}>
                {technologiesErrMsg}
              </div>
            )}
          </Grid>
        </Grid>


      </MDBox>
      <br />
      <MDButton
        type="submit"
        variant="gradient"
        color="dark"
        onClick={() => { userFormSubmit() }}
      >
        Submit
      </MDButton>
    </MDBox>
  );
}

export default ProductInfo;
