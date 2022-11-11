/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MDBox from 'components/MDBox';
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import FormField from 'layouts/pages/account/components/FormField';
import MDButton from 'components/MDButton';
import MDTypography from 'components/MDTypography';
import { useTheme } from '@emotion/react';
import * as sagaActions from '../../../../redux/sagaActions'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const names = [
    "React js",
    "Angular Js",
    "View Js",
    "Java",
    "Python",
    "Node",
];
export default function EditModal({ setOpen, open, handleClose, loadUsersApi, editedId }) {
    const token = useSelector(state => state.userData.token)
    const header = { headers: { "Authorization": `Bearer ${token}` } }
    const dispatch = useDispatch()
    const roleOnLogin = useSelector(state => state.userData.roleLogin)
    const page = useSelector(state => state.userData.page)
    const searchTerm = useSelector(state => state.userData.searchTerm)
    const rowsPerPage = useSelector(state => state.userData.rowsPerPage)
    const reduxState = useSelector(state => state.userData.loginData._id)

    const [projectDetails, setProjectDetails] = useState({
        _id: editedId,
        projectName: "",
        clientName: "",
        duration: "",
        technologies: [],
        projectDescription: "",
    });
    const theme = useTheme();
    const [technologyName, settechnologyName] = useState([]);
    // useEffect(() => {
    //     loadUsersApi()
    // }, [])

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

    const [upadetStart, setupadetStart] = useState(false)
    const updateDatapost = async () => {
        dispatch({ type: sagaActions.UPDATE_PROJECT_START, projectDetails, header })
        setupadetStart(!upadetStart)

    }
    useEffect(() => {
        dispatch({ type: sagaActions.LOAD_PROJECT_START, header, page, searchTerm, rowsPerPage })
    }, [upadetStart])



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
            updateDatapost()
        setProjectDetails({
            projectName: "",
            clientName: "",
            duration: "",
            technologies: [],
            projectDescription: "",
        })
        settechnologyName([])
        setOpen(!open)
    }

    return (
        <div>
            <Modal

                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-projectDescription"
            >
                <MDBox sx={style}>
                    <MDTypography variant="h5">Edit Project Information</MDTypography>
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
                        Save
                    </MDButton>
                </MDBox>
            </Modal>
        </div>
    );
}
