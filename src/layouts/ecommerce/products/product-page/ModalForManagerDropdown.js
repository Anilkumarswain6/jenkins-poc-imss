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
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MDBox from 'components/MDBox';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import MDButton from 'components/MDButton';
import httpInstance from "../../../../redux/config/axiosConfig"
import * as sagaActions from '../../../../redux/sagaActions'



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
    const dispatch = useDispatch()
    const token = useSelector(state => state.userData.token)
    const allManagerList = useSelector(state => state.userData.allManagerList)
    const header = { headers: { "Authorization": `Bearer ${token}` } }
    const getAllManager = async () => {
        dispatch({ type: sagaActions.GET_MANAGER_START, header })
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
        dispatch({ type: sagaActions.ASSIGN_MANAGER_START, managerIdProjectSelected, header })
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
                                {allManagerList.map((e, i) => (
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
