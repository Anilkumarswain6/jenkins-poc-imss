/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
    name: "userData",
    initialState: {
        loginData: [],
        users: [],
        project: [],
        projectForAll: [],
        loginUserId: "",
        loading: false,
        error: null,
        page: 1,
        searchTerm: "",
        rowsPerPage: 5,
        projectPage: 1,
        projectSearchTerm: "",
        projectRowsPerPage: 5,
        statusCode: null,
        token: null,
        roleLogin: null,
    },
    reducers: {
        logout: (state) => {
            return {
                ...state,
                loginData: [],
                users: [],
                project: [],
                projectForAll: [],
                loginUserId: "",
                loading: false,
                error: null,
                page: 1,
                searchTerm: "",
                rowsPerPage: 5,
                projectPage: 1,
                projectSearchTerm: "",
                projectRowsPerPage: 5,
                statusCode: null,
                token: null,
                roleLogin: null,
            }
        },
        loginStart: (state) => {
            return {
                ...state,
                loading: true,
            }
        },
        loginStartSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                loginData: action.payload.data.payload,
                statusCode: action.payload.statusCode,
                token: action.payload.data.token,
                roleLogin: action.payload.data.payload.role,
                loginUserId: action.payload
            }
        },
        loginError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        loadUserProfileStart: (state) => {
            return {
                ...state,
                loading: true,
            }
        },
        loadUserProfileSuccess: (state, action) => {
            return {
                ...state,
                loading: false,  
            }
        },
        loadUserProfileError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        loadUserStart: (state) => {
            return {
                ...state,
                loading: true
            }
        },
        loadUserSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                users: action.payload
            }
        },
        loadUserSuccesspagination: (state, action) => {
            return {
                ...state,
                loading: false,
                page: action.payload.page,
                searchTerm: action.payload.searchTerm,
                rowsPerPage: action.payload.rowsPerPage,
            }
        },
        loadUserError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        createUserStart: (state) => {
            return {
                ...state,
                loading: true
            }
        },
        createUserSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
            }
        },
        createUserError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        deleteUserStart: (state, action) => {
            return {
                ...state,
                loading: true,
                users: action.payload
            }
        },
        deleteUserSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                users: state.users.filter((item) => item.id !== action.payload)
            }
        },
        deleteUserError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        updateUserStart: (state) => {
            return {
                ...state,
                loading: true,
            }
        },
        updateUserSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
            }
        },
        updateUserError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },



        loadProjectStart: (state) => {
            return {
                ...state,
                loading: true
            }
        },
        loadProjectSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                project: action.payload.data
            }
        },
        loadProjectSuccesspagination: (state, action) => {
            return {
                ...state,
                loading: false,
                projectPage: action.payload.page,
                projectSearchTerm: action.payload.searchTerm,
                projectRowsPerPage: action.payload.rowsPerPage,
            }
        },
        loadProjectSuccessForAll: (state, action) => {
            return {
                ...state,
                loading: false,
                projectForAll: action.payload.result
            }
        },
        loadProjectSuccesspaginationForAll: (state, action) => {
            return {
                ...state,
                loading: false,
                projectPage: action.payload.page,
                projectSearchTerm: action.payload.searchTerm,
                projectRowsPerPage: action.payload.rowsPerPage,
            }
        },
        loadProjectError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        createProjectStart: (state) => {
            return {
                ...state,
                loading: true
            }
        },
        createProjectSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
            }
        },
        createProjectError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        deleteProjectStart: (state, action) => {
            return {
                ...state,
                loading: true,
                project: action.payload
            }
        },
        deleteProjectSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                project: state.project.filter((item) => item.id !== action.payload)
            }
        },
        deleteProjectError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        updateProjectStart: (state) => {
            return {
                ...state,
                loading: true,
            }
        },
        updateProjectSuccess: (state, action) => {
            return {
                ...state,
                loading: false,}
        },
        updateProjectError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
    }
});

export const { logout, loadUserStart, loadUserSuccess, loadUserError,
    createUserStart, createUserSuccess, createUserError,
    deleteUserStart, deleteUserSuccess, deleteUserError,
    updateUserStart, updateUserSuccess, updateUserError,
    loginStart, loginStartSuccess, loginError,
    loadUserProfileStart, loadUserProfileSuccess, loadUserProfileError,

    loadUserSuccesspagination,

    loadProjectStart, loadProjectSuccess, loadProjectError,
    loadProjectSuccessForAll, loadProjectSuccesspaginationForAll,
    loadProjectSuccesspagination,

    createProjectStart, createProjectSuccess, createProjectError,
    deleteProjectStart, deleteProjectSuccess, deleteProjectError,
    updateProjectStart, updateProjectSuccess, updateProjectError,

} = listSlice.actions;

export default listSlice.reducer