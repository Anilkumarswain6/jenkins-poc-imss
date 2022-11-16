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
        userProfileData: [],
        profileImageUpdated: false,
        allManagerList:[],
        allTeamLeadList:[],
        allTeamMemberList:[],
        notificationData:{},
        logoData:[],
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
                userProfileData: [],
                profileImageUpdated: false,
                allManagerList:[],
                allTeamLeadList:[],
                allTeamMemberList:[],
                notificationData:{},
                logoData:[],
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
                userProfileData: action.payload.data
            }
        },
        loadUserProfileError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },


        updateUserProfileStart: (state) => {
            return {
                ...state,
                loading: true,
            }
        },
        updateUserProfileSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                profileImageUpdated: true
            }
        },
        updateUserProfileError: (state, action) => {
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
                loading: false,
            }
        },
        updateProjectError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },

        
        changePasswordStart: (state) => {
            return {
                ...state,
                loading: true,
            }
        },
        changePasswordSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
            }
        },
        changePasswordError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },


        getAllManagerStart: (state) => {
            return {
                ...state,
                loading: true,
            }
        },
        getAllManagerSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                allManagerList:action.payload.data
            }
        },
        getAllManagerError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },


        assignProjectToManagerStart: (state) => {
            return {
                ...state,
                loading: true,
            }
        },
        assignProjectToManagerSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
            }
        },
        assignProjectToManagerError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },


        getAllTeamLeadStart: (state) => {
            return {
                ...state,
                loading: true,
            }
        },
        getAllTeamLeadSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                allTeamLeadList:action.payload.data
            }
        },
        getAllTeamLeadError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },


        assignProjectToTeamLeadStart: (state) => {
            return {
                ...state,
                loading: true,
            }
        },
        assignProjectToTeamLeadSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
            }
        },
        assignProjectToTeamLeadError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },



        getAllTeamMemberStart: (state) => {
            return {
                ...state,
                loading: true,
            }
        },
        getAllTeamMemberSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                allTeamMemberList:action.payload.data
            }
        },
        getAllTeamMemberError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },


        assignProjectToTeamMemberStart: (state) => {
            return {
                ...state,
                loading: true,
            }
        },
        assignProjectToTeamMemberSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
            }
        },
        assignProjectToTeamMemberError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },


        getNotificationStart: (state) => {
            return {
                ...state,
                loading: true,
            }
        },
        getNotificationSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                notificationData:action.payload.data
            }
        },
        getNotificationError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },


        logoDataStart: (state) => {
            return {
                ...state,
                loading: true,
            }
        },
        logoDataSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                logoData:action.payload.result
            }
        },
        logoDataError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },



    }
});

export const { logout,
    loadUserStart, loadUserSuccess, loadUserError,
    updateUserProfileStart, updateUserProfileSuccess, updateUserProfileError,
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


    changePasswordStart, changePasswordSuccess, changePasswordError,


    getAllManagerStart, getAllManagerSuccess, getAllManagerError,
    assignProjectToManagerStart, assignProjectToManagerSuccess, assignProjectToManagerError,


    getAllTeamLeadStart, getAllTeamLeadSuccess, getAllTeamLeadError,
    assignProjectToTeamLeadStart, assignProjectToTeamLeadSuccess, assignProjectToTeamLeadError,


    getAllTeamMemberStart, getAllTeamMemberSuccess, getAllTeamMemberError,
    assignProjectToTeamMemberStart, assignProjectToTeamMemberSuccess, assignProjectToTeamMemberError,

    getNotificationStart, getNotificationSuccess, getNotificationError,

    logoDataStart, logoDataSuccess, logoDataError,

} = listSlice.actions;

export default listSlice.reducer