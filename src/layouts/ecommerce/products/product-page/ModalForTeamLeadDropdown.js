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

export default function ModalForTeamLeadDropdown({ open1, handleClose1, editId1, setOpen1 }) {
    const [allTeamLead, setallTeamLead] = useState([])
    const getallTeamLead = async () => {
        const api = `/teamLead/getList?pageno=1&pagesize=10`;
        const token = JSON.parse(localStorage.getItem('dataKey'))
        httpInstance.get(api, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => {setallTeamLead(res.data); })
            .catch(err => { console.log('error', err); })
    }
    useEffect(() => {
        getallTeamLead()
    }, [])
    const [teamLeadIdProjectSelected, setTeamLeadIdProjectSelected] = useState({
        "teamleadId": "",
        "projectId": editId1
    })

    const teamleadId = (ev) => {
        setTeamLeadIdProjectSelected({ ...teamLeadIdProjectSelected, teamleadId: ev })
    }
    const teamLeadAssign = async () => {
        const token = JSON.parse(localStorage.getItem('dataKey'))
        const responce = await httpInstance.post('/teamLead/assignProjectToLead', teamLeadIdProjectSelected,
            { headers: { "Authorization": `Bearer ${token}` } })
    }
    const userFormSubmit = () => {
        teamLeadAssign()
        setOpen1(false)
    }
    const [teamLeadValue, setteamLeadValue] = useState({
        teamLead: ""
    })
    const handleChange13 = (e) => {
        setteamLeadValue({ ...teamLeadValue, teamLead: e.target.value })
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
                            <InputLabel id="demo-simple-select-helper-label">Please Select TeamLead</InputLabel>
                            <Select
                                sx={{ height: 45 }}
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={teamLeadValue.teamLead}
                                onChange={handleChange13}
                            >
                                {allTeamLead.data && allTeamLead.data.map((e, i) => (
                                    <MenuItem
                                        className='select-box-product1'
                                        key={i}
                                        value={e.teamLeadName}
                                        onClick={() => { teamleadId(e._id) }}
                                    >
                                        {e.leadName}
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
