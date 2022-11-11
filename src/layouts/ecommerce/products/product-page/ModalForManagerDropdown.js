/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MDBox from 'components/MDBox';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import MDButton from 'components/MDButton';
import httpInstance from "../../../../redux/config/axiosConfig"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "auto",
    bgcolor: 'background.paper',
    boxShadow: 44,
    p: 4,
    borderRadius: 4,
};

export default function ModalForManagerDropdown({ open1, handleClose1, editId1, setOpen1 }) {
    const [allManager, setAllManager] = useState([])
    const getAllManager = async () => {
        const api = `/managers/get-managers?pageno=1&pagesize=10`;
        const token = JSON.parse(localStorage.getItem('dataKey'))
        httpInstance.get(api, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => {setAllManager(res.data.data); })
            .catch(err => { console.log('error', err); })
    }
    useEffect(() => {
        getAllManager()
    }, [])
    const [managerIdProjectSelected, setMangerIdProjectSelected] = useState({
        "managerId": "",
        "projectId": editId1
    })

    const managerId = (ev) => {
        setMangerIdProjectSelected({ ...managerIdProjectSelected, managerId: ev })
    }
    const managerAssign = async () => {
        const token = JSON.parse(localStorage.getItem('dataKey'))
        const responce = await httpInstance.post('/managers/assignProject', managerIdProjectSelected,
            { headers: { "Authorization": `Bearer ${token}` } })
    }
    const userFormSubmit = () => {
        managerAssign()
        setOpen1(false)
    }
    const [mangerValue, setMangerValue] = useState({
        manager: ""
    })
    const handleChange13 = (e) => {
        setMangerValue({ ...mangerValue, manager: e.target.value })
    }
    return (
        <div>
            <Modal
                open={open1}
                onClose={handleClose1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <MDBox mt={1.625}>
                        <FormControl variant="standard" sx={{ mb: 1, minWidth: 310 }}>
                            <InputLabel id="demo-simple-select-helper-label">Please Select Manager</InputLabel>
                            <Select
                                sx={{ height: 45 }}
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={mangerValue.manager}
                                onChange={handleChange13}
                            >
                                {allManager.map((e, i) => (
                                    <MenuItem
                                        className='select-box-product1'
                                        key={i}
                                        value={e.managerName}
                                        onClick={() => { managerId(e._id) }}
                                    >
                                        {e.managerName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
