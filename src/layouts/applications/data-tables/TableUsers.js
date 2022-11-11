/* eslint-disable eqeqeq */
/* eslint-disable no-alert */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/function-component-definition */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Pagination, Tooltip } from '@mui/material'
import React, { useState, useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BasicModal from './BasicModal';
import httpInstance from '../../../redux/config/axiosConfig';
import * as sagaActions from '../../../redux/sagaActions'

const TableUsers = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.userData.users.data)
    const token = useSelector(state => state.userData.token)
    const roleOnLogin = useSelector(state => state.userData.roleLogin)
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
    const handelSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: sagaActions.LOAD_USERS_START, header })
    }
    const [deleteId, setdeleteId] = useState("")
    const handelDelete = (id) => {
        if (window.confirm('Are you sure that you want to delete the user ?')) {
            setdeleteId(id)
        }
    };

    const deleteUsersApi = async () => {
        const deletedIdSelect = { data: { "_id": deleteId } }
        // const responce = await httpInstance.delete('/users/removeUser', {
        //     headers: { "Authorization": `Bearer ${token}` },
        //     data: { "_id": deleteId }
        // })
        dispatch({ type: sagaActions.DELETE_USER_START, deletedIdSelect ,header})
        // // dispatch({ type: sagaActions.LOAD_USERS_START, header })
        dispatch({ type: sagaActions.LOAD_USERS_START, header, page, searchTerm, rowsPerPage })
    }
    useEffect(() => { if (deleteId) { deleteUsersApi() } }, [deleteId])



    // useEffect(() => {
    //     dispatch({ type: sagaActions.LOAD_USERS_START, header, page, searchTerm, rowsPerPage })
    // }, [])
    useEffect(() => {
        dispatch({ type: sagaActions.LOAD_USERS_START, header, page, searchTerm, rowsPerPage })
    }, [page, searchTerm, rowsPerPage])



    const [showModal, setShowModal] = useState(false)
    const [open, setOpen] = React.useState(true);
    const [editId, setEditId] = useState("")
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false); setShowModal(false) };
    const handelEdit = (id) => { setOpen(true); setShowModal(true); setEditId(id) }

    return (
        <div className='p-5'>
            <div>
                <Grid container spacing={3} className='serachFORM'>
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
                        <th scope="col" className='text-center'>First Name</th>
                        <th scope="col" className='text-center'>Last Name</th>
                        <th scope="col" className='text-center'>Email</th>
                        <th scope="col" className='text-center'>Date</th>
                        {roleOnLogin === 1 &&
                            <th scope="col" className='text-center'>Action</th>}
                    </tr>
                </thead>
                {users && users.length === 0 ? (
                    <tbody className='align-center text-warning mb-0'>
                        <tr>
                            <td colSpan={8} className='text-center mb-0'>No Data Found</td>
                        </tr>
                    </tbody>
                ) :
                    <tbody className='text-muted'>
                        {users && users.map((e, i) => {
                            return (
                                <tr key={e.email}>
                                    <th className='text-center' scope="row">{i + 1}</th>
                                    <td className='text-center'>
                                        {e.fname && e.fname.charAt(0).toUpperCase() + e.fname.slice(1)}
                                    </td>
                                    <td className='text-center'>
                                        {e.lname && e.lname.charAt(0).toUpperCase() + e.lname.slice(1)}
                                    </td>
                                    <td className='text-center'>
                                        {e.email}
                                    </td>
                                    <td className='text-center'>{e.date}</td>
                                    {roleOnLogin == 1 &&
                                        <td className='text-center'>
                                            <Tooltip title="Delete" placement="top">
                                                <DeleteIcon className='text-danger' style={{ cursor: 'pointer' }}
                                                    onClick={() => { handelDelete(e._id) }} />
                                            </Tooltip>
                                            {"  "}
                                            <Tooltip title="Edit" placement="top">
                                                <EditIcon className='text-info' style={{ cursor: 'pointer' }}
                                                    onClick={() => { handelEdit(e._id) }} />
                                            </Tooltip>
                                        </td>}


                                </tr>
                            )
                        })
                        }
                    </tbody>
                }
            </table>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <div>
                        Rows per page :  {" "}<select className="selectOptionintable"
                            style={{ width: '10%', borderRadius: '4px', height: "35px", borderColor: '#83cc5' }}
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
                <Grid item xs={12} sm={6}>
                    <Pagination count={10} color="primary"
                        page={page}
                        onChange={(e, v) => {
                            setPage(v)
                            dispatch({ type: sagaActions.LOAD_USERS_START, header })
                        }}
                    />
                </Grid>
            </Grid>
            {showModal && <BasicModal open={open} editId={editId} handleOpen={handleOpen} handleClose={handleClose} />}
        </div >
    )
}

export default TableUsers