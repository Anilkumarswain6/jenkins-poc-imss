/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MDBox from 'components/MDBox';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import FormField from 'layouts/pages/account/components/FormField';
import MDButton from 'components/MDButton';
import * as sagaActions from '../../../redux/sagaActions'

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

export default function BasicModal({ open, handleClose, editId }) {
    const token = useSelector(state => state.userData.token)
    const header = { headers: { "Authorization": `Bearer ${token}` } }
    const dispatch = useDispatch()

    const page = useSelector(state => state.userData.page)
    const searchTerm = useSelector(state => state.userData.searchTerm)
    const rowsPerPage = useSelector(state => state.userData.rowsPerPage)

    const [formValue, setFormValue] = useState({
        _id: editId,
        fname: "",
        lname: "",
        role: "",
        department: ''
    })
    // eslint-disable-next-line no-unused-vars
    const { fname, lname, role, department } = formValue
    // eslint-disable-next-line no-unused-vars
    const [options, setOptions] = useState([
        {
            label: "Manager",
            value: 2
        },
        {
            label: "Team lead",
            value: 3
        },
        {
            label: "Team member",
            value: 4
        }
    ])
    // eslint-disable-next-line no-unused-vars
    const [options1, setOptions1] = useState([
        {
            label: "IT",
            value: "it"
        },
        {
            label: "Technician",
            value: "technician"
        },
        {
            label: "Developer",
            value: "developer"
        }
    ])
    const onInputChange = (e) => {
        const { name, value } = e.target
        setFormValue({ ...formValue, [name]: value })
    }
    const [fnameErrMsg, setfnameErrMsg] = useState(null)
    const [lnameErrMsg, setlnameErrMsg] = useState(null)
    const [roleErrMsg, setroleErrMsg] = useState(null)
    const [departmentErrMsg, setDepartmentErrMsg] = React.useState(null)
    const onDroupdownChange = (e) => {
        setroleErrMsg(null)
        setFormValue({ ...formValue, role: e.target.value })
    }
    const onDroupdownChange1 = (e) => {
        setroleErrMsg(null)
        setFormValue({ ...formValue, department: e.target.value })
    }
    const [upadetStart, setupadetStart] = useState(false)
    const updateDatapost = async () => {
        dispatch({ type: sagaActions.UPDATE_USER_START, formValue, header })
        setupadetStart(!upadetStart)
        // dispatch({ type: sagaActions.LOAD_USERS_START, header, page, searchTerm, rowsPerPage })
    }
    useEffect(() => {
        dispatch({ type: sagaActions.LOAD_USERS_START, header, page, searchTerm, rowsPerPage })
    }, [upadetStart])
    const userFormSubmit = () => {
        if (fname.length <= 3) {
            setfnameErrMsg("Minimum 4 letter required*")
        } else {
            setfnameErrMsg("")
        }
        if (lname.length <= 1) {
            setlnameErrMsg("Required*")
        } else {
            setlnameErrMsg("")
        }
        if (!role) {
            setroleErrMsg("Role is required*")
        } else {
            setroleErrMsg("")
        }
        if (!department) {
            setDepartmentErrMsg("Department is required*")
        } else {
            setDepartmentErrMsg("")
        }
        if (fname && lname && role && department) {
            updateDatapost()
            handleClose(false)
        }
    }
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <MDBox mt={1.625}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                                <FormControl variant="standard" sx={{ mb: 1, minWidth: 632 }}>
                                    <InputLabel id="demo-simple-select-helper-label">Please Select Role</InputLabel>
                                    <Select
                                        sx={{ height: 45 }}
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={role}
                                        label="Please Select Role"
                                        onChange={onDroupdownChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {options.map((e, i) => {
                                            return <MenuItem value={e.value} key={i}>{e.label}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                                {roleErrMsg && (
                                    <div style={{ color: 'red', textAlign: 'left', fontSize: '14px' }} >
                                        {roleErrMsg}
                                    </div>
                                )}
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                                <FormControl variant="standard" sx={{ mb: 1, minWidth: 632 }}>
                                    <InputLabel id="demo-simple-select-helper-label">Please Select Department</InputLabel>
                                    <Select
                                        sx={{ height: 45 }}
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={department}
                                        label="Please Select Role"
                                        onChange={onDroupdownChange1}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {options1.map((e, i) => {
                                            return <MenuItem value={e.value} key={i}>{e.label}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                                {departmentErrMsg && (
                                    <div style={{ color: 'red', textAlign: 'left', fontSize: '14px' }} >
                                        {departmentErrMsg}
                                    </div>
                                )}
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
                                <FormField
                                    type="text"
                                    label="First Name"
                                    name="fname"
                                    value={fname}
                                    placeholder="Enter First Name"
                                    onChange={onInputChange}
                                />
                                {fnameErrMsg && (
                                    <div style={{ color: 'red', textAlign: 'left', fontSize: '14px' }}>
                                        {fnameErrMsg}
                                    </div>
                                )}
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
                                <FormField
                                    type="text"
                                    label="Last Name"
                                    name="lname"
                                    value={lname}
                                    placeholder="Enter Last Name"
                                    onChange={onInputChange}
                                />
                                {lnameErrMsg && (
                                    <div style={{ color: 'red', textAlign: 'left', fontSize: '14px' }}>
                                        {lnameErrMsg}
                                    </div>
                                )}
                            </Grid>
                        </Grid>
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
                </Box>
            </Modal>
        </div>
    );
}
