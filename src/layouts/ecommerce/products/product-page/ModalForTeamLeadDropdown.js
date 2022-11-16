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
import { useSelector,useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MDBox from 'components/MDBox';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import MDButton from 'components/MDButton';
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

export default function ModalForTeamLeadDropdown({ open1, handleClose1, editId1, setOpen1 }) {
    const dispatch=useDispatch()
    const token = useSelector(state => state.userData.token)
    const allTeamLeadList = useSelector(state => state.userData.allTeamLeadList)
    const header = { headers: { "Authorization": `Bearer ${token}` } }
    const getallTeamLead = async () => {
        dispatch({ type: sagaActions.GET_TEAM_LEAD_START, header })
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
        dispatch({ type: sagaActions.ASSIGN_TEAM_LEAD_START, teamLeadIdProjectSelected, header })
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
                                {allTeamLeadList && allTeamLeadList.map((e, i) => (
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
