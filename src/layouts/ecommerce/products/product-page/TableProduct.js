/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable no-alert */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/function-component-definition */
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Pagination, Tooltip } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import EditModal from './EditModal';
import ModalForManagerDropdown from './ModalForManagerDropdown';
import httpInstance from "../../../../redux/config/axiosConfig"
import ModalForTeamLeadDropdown from './ModalForTeamLeadDropdown';
import ModalUserDropdown from './ModalUserDropdown';
import * as sagaActions from '../../../../redux/sagaActions'


const TableProduct = () => {
    const dispatch = useDispatch()
    const userTableData = useSelector(state => state.userData.project)
    const loadAssignedProjectData = useSelector(state => state.userData.projectForAll)
    const token = useSelector(state => state.userData.token)
    const roleOnLogin = useSelector(state => state.userData.roleLogin)
    const reduxState = useSelector(state => state.userData.loginData._id)
    const header = { headers: { "Authorization": `Bearer ${token}` } }

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [rowOptions, setRowOptions] = useState([
        {
            label: "5",
            value: 5
        },
        {
            label: "10",
            value: 10
        },
        {
            label: "20",
            value: 20
        }
    ])
    const onDroupdownChange = (e) => {
        setRowsPerPage(e.target.value)
        setPage(1)
    }
    // const roleOnLogin = JSON.parse(localStorage.getItem("role"));

    const [loadingUserApi, setLoadingUserApi] = useState(false)
    const loadUsersApi = async () => {
        //     setLoadingUserApi(true)
        //     const api = `/projects/get-projects?pageno=${page}&pagesize=${rowsPerPage}&regex=${searchTerm}`;
        //     const token = JSON.parse(localStorage.getItem('dataKey'))
        //     httpInstance.get(api, { headers: { "Authorization": `Bearer ${token}` } })
        //         .then(res => {setUserTableData(res.data.data)})
        //         .catch(err => { console.log('error', err); })
    }


    // const [loadAssignedProjectData, setLoadAssignedProjectData] = useState([])
    // const loadUsersApiForAll = async () => {
    //     const userId = JSON.parse(localStorage.getItem('loginUserId'))
    //     const api = `/managers/getMyProjectList/${userId}?pageno=${page}&pagesize=${rowsPerPage}&regex=${searchTerm}`;
    //     // /managers/getMyProjectList/634653ed28839b2064b2692d?pageno=1&pagesize=10
    //     httpInstance.get(api)
    //         .then(res => { setLoadAssignedProjectData(res.data.result) })
    //         .catch(err => { console.log('error', err); })
    // }




    const assignedProjects = []
    for (let key in loadAssignedProjectData) {
        const assignedProjects1 = []
        if (key < loadAssignedProjectData.length) {
            assignedProjects1.push(loadAssignedProjectData[key].projects)
        }
        for (let key in assignedProjects1) {
            if (key < assignedProjects1.length) {
                assignedProjects.push(assignedProjects1[key][key])
            }
        }
    }
    const handelSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: sagaActions.LOAD_PROJECT_START, header })
    }
    const [deleteId, setdeleteId] = useState("")
    const handelDelete = (id) => {
        if (window.confirm('Are you sure that you want to delete the user ?')) {
            setdeleteId(id)
        }
    };

    const deleteUsersApi = async () => {
        const deletedIdSelect = { data: { "_id": deleteId } }
        // const token = JSON.parse(localStorage.getItem('dataKey'))
        // const responce = await httpInstance.delete('/projects/delete-project', {
        //     headers: { "Authorization": `Bearer ${token}` },
        //     data: { "_id": deleteId }
        // })
        dispatch({ type: sagaActions.DELETE_USER_START, deletedIdSelect, header })
        // // dispatch({ type: sagaActions.LOAD_USERS_START, header })
        dispatch({ type: sagaActions.LOAD_USERS_START, header, page, searchTerm, rowsPerPage })
        // loadUsersApi()
    }
    useEffect(() => { if (deleteId) { deleteUsersApi() } }, [deleteId])

    useEffect(() => {
        if (roleOnLogin == 1) {
            // loadUsersApi()
            setLoadingUserApi(true)
            dispatch({ type: sagaActions.LOAD_PROJECT_START, header, page, searchTerm, rowsPerPage })
        } else {
            // loadUsersApiForAll()
            dispatch({ type: sagaActions.LOAD_PROJECT_START_FOR_ALL, header, page, searchTerm, rowsPerPage, reduxState })
        }
    }, [page, searchTerm, rowsPerPage])
    // useEffect(() => {
    //     dispatch({ type: sagaActions.LOAD_PROJECT_START, header, page, searchTerm, rowsPerPage })
    // }, [page, searchTerm, rowsPerPage])



    const [showModal, setShowModal] = useState(false)
    const [open, setOpen] = React.useState(true);
    const [editId, setEditId] = useState("")
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false); setShowModal(false) };
    const [editedId, setEditedId] = useState("")
    const handelEdit = (id) => {
        setEditedId(id)
        setOpen(true);
        setShowModal(true);
    }
    const [showModal1, setShowModal1] = useState(false)
    const [open1, setOpen1] = React.useState(true);
    const [editId1, setEditId1] = useState("")
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => { setOpen1(false); setShowModal1(false) };
    const handelAssign = (id) => {
        setOpen1(true); setShowModal1(true); setEditId1(id); setEditId(id)
    }

    return (
        // <DashboardLayout>
        <div className='p-5'>
            <div>
                <Grid container spacing={3} className='serachFORM' sx={{ mt: -5, mb: 3 }}>
                    <Grid item xs={12} sm={4}>
                        <form className='d-flex input-group w-auto' onSubmit={handelSubmit}>
                            <input className='form-control' type='text' placeholder='Search Name...'
                                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </form>
                    </Grid>
                </Grid>
            </div>
            <table className="table">
                <thead className="text-primary">
                    <tr>
                        <th scope="col" className='text-center'>Id</th>
                        <th scope="col" className='text-center'>Client Name</th>
                        <th scope="col" className='text-center'>Project Name</th>
                        <th scope="col" className='text-center'> Project Description</th>
                        <th scope="col" className='text-center'>Date</th>
                        {roleOnLogin == 1 || roleOnLogin == 2 || roleOnLogin == 3 ?
                            <th scope="col" className='text-center'>Action</th> : null}
                    </tr>
                </thead>
                {loadingUserApi ?
                    <>
                        {
                            !userTableData ? (
                                <tbody className='align-center text-warning mb-0'>
                                    <tr>
                                        <td colSpan={8} className='text-center mb-0'>No Data Found</td>
                                    </tr>
                                </tbody>
                            ) :
                                <tbody className='text-muted'>
                                    {
                                        userTableData &&
                                        // eslint-disable-next-line array-callback-return, consistent-return
                                        userTableData.map((e, i) => {
                                            return (
                                                <tr key={e.id}>
                                                    <th className='text-center' scope="row">{i + 1}</th>
                                                    <td className='text-center'>
                                                        {e.clientName && e.clientName.charAt(0).toUpperCase() + e.clientName.slice(1)}
                                                    </td>
                                                    <td className='text-center'>
                                                        {e.projectName && e.projectName.charAt(0).toUpperCase() + e.projectName.slice(1)}
                                                    </td>
                                                    <td className='text-center'>
                                                        {e.projectDescription && e.projectDescription.charAt(0).toUpperCase() + e.projectDescription.slice(1)}
                                                    </td>
                                                    <td className='text-center'>{e.date}</td>
                                                    {roleOnLogin == 1 &&
                                                        <td className='text-center' style={{ width: "10%" }}>
                                                            <Tooltip title="Delete" placement="top">
                                                                <DeleteIcon className='text-danger' style={{ cursor: 'pointer' }}
                                                                    onClick={() => { handelDelete(e._id) }} />
                                                            </Tooltip>
                                                            {"  "}
                                                            <Tooltip title="Edit" placement="top">
                                                                <EditIcon className='text-info' style={{ cursor: 'pointer' }}
                                                                    onClick={() => { handelEdit(e._id) }} />
                                                            </Tooltip>
                                                            {"  "}
                                                            <Tooltip title="Assign" placement="top">
                                                                <AddIcon className='text-info' style={{ cursor: 'pointer' }}
                                                                    onClick={() => { handelAssign(e._id) }} />
                                                            </Tooltip>
                                                        </td>
                                                    }
                                                    {roleOnLogin == 2 || roleOnLogin == 3 ?
                                                        <td className='text-center' style={{ width: "10%" }}>
                                                            <Tooltip title="Assign" placement="top">
                                                                <AddIcon className='text-info' style={{ cursor: 'pointer' }}
                                                                    onClick={() => { handelAssign(e._id) }} />
                                                            </Tooltip>
                                                        </td> : null
                                                    }
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                        }
                    </>
                    :
                    <>
                        {
                            assignedProjects.length === 0 ? (
                                <tbody className='align-center text-warning mb-0'>
                                    <tr>
                                        <td colSpan={8} className='text-center mb-0'>No Data Found</td>
                                    </tr>
                                </tbody>
                            ) :
                                <tbody className='text-muted'>
                                    {
                                        assignedProjects &&
                                        // eslint-disable-next-line array-callback-return, consistent-return
                                        assignedProjects.map((e, i) => {
                                            return (
                                                <tr key={e.id}>
                                                    <th className='text-center' scope="row">{i + 1}</th>
                                                    <td className='text-center'>
                                                        {e.clientName && e.clientName.charAt(0).toUpperCase() + e.clientName.slice(1)}
                                                    </td>
                                                    <td className='text-center'>
                                                        {e.projectName && e.projectName.charAt(0).toUpperCase() + e.projectName.slice(1)}
                                                    </td>
                                                    <td className='text-center'>
                                                        {e.projectDescription && e.projectDescription.charAt(0).toUpperCase() + e.projectDescription.slice(1)}
                                                    </td>
                                                    <td className='text-center'>{e.date}</td>
                                                    {roleOnLogin == 1 &&
                                                        <td className='text-center' style={{ width: "10%" }}>
                                                            <Tooltip title="Delete" placement="top">
                                                                <DeleteIcon className='text-danger' style={{ cursor: 'pointer' }}
                                                                    onClick={() => { handelDelete(e._id) }} />
                                                            </Tooltip>
                                                            {"  "}
                                                            <Tooltip title="Edit" placement="top">
                                                                <EditIcon className='text-info' style={{ cursor: 'pointer' }}
                                                                    onClick={() => { handelEdit(e._id) }} />
                                                            </Tooltip>
                                                            {"  "}
                                                            <Tooltip title="Assign" placement="top">
                                                                <AddIcon className='text-info' style={{ cursor: 'pointer' }}
                                                                    onClick={() => { handelAssign(e._id) }} />
                                                            </Tooltip>
                                                        </td>
                                                    }
                                                    {roleOnLogin == 2 || roleOnLogin == 3 ?
                                                        <td className='text-center' style={{ width: "10%" }}>
                                                            <Tooltip title="Assign" placement="top">
                                                                <AddIcon className='text-info' style={{ cursor: 'pointer' }}
                                                                    onClick={() => { handelAssign(e._id) }} />
                                                            </Tooltip>
                                                        </td> : null
                                                    }
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                        }
                    </>
                }

            </table>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <div>
                        Rows per page :  {" "}<select className="selectOptionintable"
                            style={{ width: '13%', borderRadius: '4px', height: "35px", borderColor: '#83cc5' }}
                            onChange={onDroupdownChange}
                            // eslint-disable-next-line no-restricted-globals
                            value={rowsPerPage}
                        >
                            {rowOptions.map((option, index) => {
                                // eslint-disable-next-line react/no-array-index-key
                                return (<option value={option.value} key={index}>
                                    {option.label}
                                </option>
                                )
                            })}
                        </select>
                    </div>
                </Grid>
                {loadingUserApi ?
                    <Grid item xs={12} sm={6}>
                        < Pagination count={10} color="primary"
                            page={page}
                            onChange={(e, v) => {
                                setPage(v)
                                // loadUsersApi()
                                dispatch({ type: sagaActions.LOAD_PROJECT_START, header, page, searchTerm, rowsPerPage })
                            }}
                        />
                    </Grid>
                    :

                    <Grid item xs={12} sm={6}>
                        <Pagination count={10} color="primary"
                            page={page}
                            onChange={(e, v) => {
                                setPage(v)
                                // loadUsersApi()
                                dispatch({ type: sagaActions.LOAD_PROJECT_START_FOR_ALL, header, page, searchTerm, rowsPerPage, reduxState })
                            }}
                        />
                    </Grid>
                }
            </Grid>
            {showModal1 && roleOnLogin == 1 ? <ModalForManagerDropdown open1={open1} setOpen1={setOpen1} editId1={editId1} handleOpen1={handleOpen1} handleClose1={handleClose1} /> : null}
            {showModal1 && roleOnLogin == 2 ? <ModalForTeamLeadDropdown open1={open1} setOpen1={setOpen1} editId1={editId1} handleOpen1={handleOpen1} handleClose1={handleClose1} /> : null}
            {showModal1 && roleOnLogin == 3 ? <ModalUserDropdown open1={open1} setOpen1={setOpen1} editId1={editId1} handleOpen1={handleOpen1} handleClose1={handleClose1} /> : null}
            {showModal && <EditModal loadUsersApi={loadUsersApi}editedId={editedId} setOpen={setOpen} open={open} editId={editId} handleOpen={handleOpen} handleClose={handleClose} />}
        </div >
        // </DashboardLayout>
    )
}

export default TableProduct