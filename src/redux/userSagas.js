/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { take, takeEvery, takeLatest, put, all, delay, fork, call } from "redux-saga/effects"
import {
    assignProjectToManagerError,
    assignProjectToManagerSuccess,
    assignProjectToTeamLeadError,
    assignProjectToTeamLeadSuccess,
    assignProjectToTeamMemberError,
    assignProjectToTeamMemberSuccess,
    changePasswordError,
    changePasswordSuccess,
    createProjectError, createProjectSuccess, createUserError, createUserSuccess,
    deleteProjectError, deleteProjectSuccess, deleteUserError, deleteUserSuccess,
    getAllManagerError,
    getAllManagerSuccess,
    getAllTeamLeadError,
    getAllTeamLeadSuccess,
    getAllTeamMemberError,
    getAllTeamMemberSuccess,
    getNotificationError,
    getNotificationSuccess,
    loadProjectError, loadProjectSuccess, loadProjectSuccessForAll, loadProjectSuccesspagination,
    loadProjectSuccesspaginationForAll, loadUserError,
    loadUserProfileError, loadUserProfileSuccess, loadUserSuccess, loadUserSuccesspagination,
    loginError, loginStartSuccess, logoDataError, logoDataSuccess, updateProjectError, updateProjectSuccess, updateUserError,
    updateUserProfileError,
    updateUserProfileSuccess,
    updateUserSuccess
} from "./usersSlice"
import {
    assignMangertoProjectApi,
    assigTeamLeadtoProjectApi,
    assigTeamMembertoProjectApi,
    changePasswordApi,
    createProjectApi, createUsersApi, deleteProjectApi, deleteUsersApi, getLogoApi, getNotificationApi, loadManagerListApi, loadProjectApi,
    loadProjectApiForAll, loadTeamLeadListApi, loadTeamMemberListApi, loadUserProfileApi, loadUsersApi, loginApi, updateProjectApi,
    updateUserProfileApi,
    updateUsersApi
} from "./api"
import * as sagaActions from './sagaActions'

function* onLoginStartAsync(page) {
    try {
        const responce = yield call(loginApi, page)
        yield delay(500)
        yield put(loginStartSuccess(responce.data))
    } catch (error) {
        yield put(loginError(error.responce.data))
    }
}

function* onUpdateProfilePictureAsync(profile) {
    try {
        const responce = yield call(updateUserProfileApi, profile.profile)
        yield delay(500)
        yield put(updateUserProfileSuccess(responce.data))
    } catch (error) {
        yield put(updateUserProfileError(error.responce.data))
    }
}
function* onLoadProfilePictureAsync(page) {
    try {
        const responce = yield call(loadUserProfileApi, page)
        yield delay(500)
        yield put(loadUserProfileSuccess(responce.data))
    } catch (error) {
        yield put(loadUserProfileError(error.responce.data))
    }
}
function* onChangePasswordAsync(input) {
    try {
        const responce = yield call(changePasswordApi, input)
        yield delay(500)
        yield put(changePasswordSuccess(responce.data))
    } catch (error) {
        yield put(changePasswordError(error.responce.data))
    }
}


function* onLoadUsersStartAsync(header) {
    try {
        const responce = yield call(loadUsersApi, header)
        yield delay(500)
        yield put(loadUserSuccess(responce.data))
        yield put(loadUserSuccesspagination(header))
    } catch (error) {
        yield put(loadUserError(error.responce.data))
    }
}
function* onCreateUsersStartAsync({ type, formValue, header }) {
    try {
        const responce = yield call(createUsersApi, formValue, header)
        yield delay(1000)
        yield put(createUserSuccess(responce.data))
    } catch (error) {
        yield put(createUserError(error.responce.data))
    }
}
function* onDeleteUsersStartAsync({ type, deleteId, header }) {
    try {
        // eslint-disable-next-line no-unused-vars
        const responce = yield call(deleteUsersApi,deleteId, header)
        yield put(deleteUserSuccess(responce))
    } catch (error) {
        yield put(deleteUserError(error.responce))
    }
}
function* onUpdateUsersStartAsync({ type, formValue, header }) {
    try {
        // eslint-disable-next-line no-unused-vars
        const responce = yield call(updateUsersApi, formValue, header)
        yield put(updateUserSuccess())
    } catch (error) {
        yield put(updateUserError(error.responce.data))
    }
}



function* onLoadProjectStartAsync(header) {
    try {
        const responce = yield call(loadProjectApi, header)
        yield delay(500)
        yield put(loadProjectSuccess(responce.data))
        yield put(loadProjectSuccesspagination(header))
    } catch (error) {
        yield put(loadProjectError(error.responce.data))
    }
}
function* onLoadProjectStartAsyncForAll(header) {
    try {
        const responce = yield call(loadProjectApiForAll, header)
        yield delay(500)
        yield put(loadProjectSuccessForAll(responce.data))
        yield put(loadProjectSuccesspaginationForAll(header))
    } catch (error) {
        yield put(loadProjectError(error.responce.data))
    }
}
function* onCreateProjectStartAsync({ type, projectDetails, header }) {
    try {
        const responce = yield call(createProjectApi, projectDetails, header)
        yield delay(1000)
        yield put(createProjectSuccess(responce.data))
    } catch (error) {
        yield put(createProjectError(error.responce.data))
    }
}
function* onDeleteProjectStartAsync({ type, deleteId, header }) {
    try {
        // eslint-disable-next-line no-unused-vars
        const responce = yield call(deleteProjectApi,deleteId, header)
        yield put(deleteProjectSuccess(responce))
    } catch (error) {
        yield put(deleteProjectError(error.responce.data))
    }
}
function* onUpdateProjectStartAsync({ type, projectDetails, header }) {
    try {
        // eslint-disable-next-line no-unused-vars
        const responce = yield call(updateProjectApi, projectDetails, header)
        yield put(updateProjectSuccess())
    } catch (error) {
        yield put(updateProjectError(error.responce.data))
    }
}


function* onLoadManagerListAsync(header) {
    try {
        const responce = yield call(loadManagerListApi, header.header)
        yield delay(500)
        yield put(getAllManagerSuccess(responce.data))
    } catch (error) {
        yield put(getAllManagerError(error.responce.data))
    }
}
function* onAssignProjectToMangerAsync({ type, managerIdProjectSelected, header }) {
    try {
        const responce = yield call(assignMangertoProjectApi,managerIdProjectSelected, header)
        yield delay(500)
        yield put(assignProjectToManagerSuccess(responce.data))
    } catch (error) {
        yield put(assignProjectToManagerError(error.responce.data))
    }
}


function* onLoadTeamLeadListAsync(header) {
    try {
        const responce = yield call(loadTeamLeadListApi, header.header)
        yield delay(500)
        yield put(getAllTeamLeadSuccess(responce.data))
    } catch (error) {
        yield put(getAllTeamLeadError(error.responce.data))
    }
}
function* onAssignProjectToTeamLeadAsync({ type, teamLeadIdProjectSelected, header }) {
    try {
        const responce = yield call(assigTeamLeadtoProjectApi,teamLeadIdProjectSelected, header)
        yield delay(500)
        yield put(assignProjectToTeamLeadSuccess(responce.data))
    } catch (error) {
        yield put(assignProjectToTeamLeadError(error.responce.data))
    }
}

function* onLoadTeamMemberListAsync(header) {
    try {
        const responce = yield call(loadTeamMemberListApi, header.header)
        yield delay(500)
        yield put(getAllTeamMemberSuccess(responce.data))
        } catch (error) {
        yield put(getAllTeamMemberError(error.responce.data))
    }
}
function* onAssignProjectToTeamMemberAsync({ type, userIdProjectSelected, header }) {
    try {
        const responce = yield call(assigTeamMembertoProjectApi,userIdProjectSelected, header)
        yield delay(500)
        yield put(assignProjectToTeamMemberSuccess(responce.data))
    } catch (error) {
        yield put(assignProjectToTeamMemberError(error.responce.data))
    }
}

function* ongetNotificationAsync(header) {
    try {
        const responce = yield call(getNotificationApi, header)
        yield delay(500)
        yield put(getNotificationSuccess(responce.data))
    } catch (error) {
        yield put(getNotificationError(error.responce.data))
    }
}

function* ongetLogoAsync() {
    try {
        const responce = yield call(getLogoApi)
        yield delay(500)
        yield put(logoDataSuccess(responce.data))
    } catch (error) {
        yield put(logoDataError(error.responce.data))
    }
}




function* onLogin() {
    yield takeEvery(sagaActions.LOGIN_START, onLoginStartAsync)
}


function* onLoadProfile() {
    yield takeEvery(sagaActions.LOAD_USERS_PROFILE, onLoadProfilePictureAsync)
}
function* onUpdateProfile() {
    yield takeEvery(sagaActions.UPDATE_USERS_PROFILE, onUpdateProfilePictureAsync)
}
function* onChangePassword() {
    yield takeEvery(sagaActions.CHANGE_PASSWORD_START, onChangePasswordAsync)
}



function* onLoadUsers() {
    yield takeEvery(sagaActions.LOAD_USERS_START, onLoadUsersStartAsync)
}
function* onCreateUsers() {
    yield takeLatest(sagaActions.CREATE_USER_START, onCreateUsersStartAsync)
}
function* onDeleteUser() {
    yield takeEvery(sagaActions.DELETE_USER_START, onDeleteUsersStartAsync)
}
function* onUpdateUsers() {
    yield takeEvery(sagaActions.UPDATE_USER_START, onUpdateUsersStartAsync)
}


function* onLoadProject() {
    yield takeEvery(sagaActions.LOAD_PROJECT_START, onLoadProjectStartAsync)
}
function* onLoadProjectForAll() {
    yield takeEvery(sagaActions.LOAD_PROJECT_START_FOR_ALL, onLoadProjectStartAsyncForAll)
}
function* onCreateProject() {
    yield takeLatest(sagaActions.CREATE_PROJECT_START, onCreateProjectStartAsync)
}
function* onDeleteProject() {
    yield takeEvery(sagaActions.DELETE_PROJECT_START, onDeleteProjectStartAsync)
}
function* onUpdateProject() {
    yield takeEvery(sagaActions.UPDATE_PROJECT_START, onUpdateProjectStartAsync)
}


function* onLoadMangerList() {
    yield takeEvery(sagaActions.GET_MANAGER_START, onLoadManagerListAsync)
}
function* onAssignProjectToManger() {
    yield takeEvery(sagaActions.ASSIGN_MANAGER_START, onAssignProjectToMangerAsync)
}


function* onLoadTeamLeadList() {
    yield takeEvery(sagaActions.GET_TEAM_LEAD_START, onLoadTeamLeadListAsync)
}
function* onAssignProjectToTeamLead() {
    yield takeEvery(sagaActions.ASSIGN_TEAM_LEAD_START, onAssignProjectToTeamLeadAsync)
}

function* onLoadTeamMemberList() {
    yield takeEvery(sagaActions.GET_TEAM_MEMBER_START, onLoadTeamMemberListAsync)
}
function* onAssignProjectToTeamMember() {
    yield takeEvery(sagaActions.ASSIGN_TEAM_MEMBER_START, onAssignProjectToTeamMemberAsync)
}
function* ongetNotification() {
    yield takeEvery(sagaActions.GET_NOTIFICATION_START, ongetNotificationAsync)
}
function* ongetLogo() {
    yield takeEvery(sagaActions.GET_LOGO_START, ongetLogoAsync)
}


const usersSagas = [
    fork(onLoadUsers), fork(onCreateUsers), fork(onDeleteUser), fork(onUpdateUsers),
    fork(onLogin),
    fork(onChangePassword),
    fork(onLoadProfile), fork(onUpdateProfile),
    fork(onLoadProject), fork(onCreateProject), fork(onDeleteProject), fork(onUpdateProject),
    fork(onLoadProjectForAll),
    fork(onLoadMangerList),
    fork(onAssignProjectToManger),
    fork(onLoadTeamLeadList),
    fork(onAssignProjectToTeamLead),
    fork(onLoadTeamMemberList),
    fork(onAssignProjectToTeamMember),
    fork(ongetNotification),
    fork(ongetLogo),
]
export default function* rootSaga() {
    yield all([...usersSagas])
}