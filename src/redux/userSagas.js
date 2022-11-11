/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { take, takeEvery, takeLatest, put, all, delay, fork, call } from "redux-saga/effects"
import {
    createProjectError, createProjectSuccess, createUserError, createUserSuccess,
    deleteProjectError, deleteProjectSuccess, deleteUserError, deleteUserSuccess,
    loadProjectError, loadProjectSuccess, loadProjectSuccessForAll, loadProjectSuccesspagination,
    loadProjectSuccesspaginationForAll, loadUserError,
    loadUserProfileError, loadUserProfileSuccess, loadUserSuccess, loadUserSuccesspagination,
    loginError, loginStartSuccess, updateProjectError, updateProjectSuccess, updateUserError,
    updateUserSuccess
} from "./usersSlice"
import {
    createProjectApi, createUsersApi, deleteProjectApi, deleteUsersApi, loadProjectApi,
    loadProjectApiForAll, loadUserProfileApi, loadUsersApi, loginApi, updateProjectApi,
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
function* onLoadProfilePictureAsync(page) {
    try {
        const responce = yield call(loadUserProfileApi, page)
        yield delay(500)
        yield put(loadUserProfileSuccess(responce.data))
    } catch (error) {
        yield put(loadUserProfileError(error.responce.data))
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
function* onDeleteUsersStartAsync({ deletedIdSelect, header }) {
    try {
        // eslint-disable-next-line no-unused-vars
        const responce = yield call(deleteUsersApi, deletedIdSelect.data, header)
        yield put(deleteUserSuccess(deletedIdSelect.data._id))
    } catch (error) {
        yield put(deleteUserError(error.responce.data))
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
function* onCreateProjectStartAsync({ type, formValue, header }) {
    try {
        const responce = yield call(createProjectApi, formValue, header)
        yield delay(1000)
        yield put(createProjectSuccess(responce.data))
    } catch (error) {
        yield put(createProjectError(error.responce.data))
    }
}
function* onDeleteProjectStartAsync({ deletedIdSelect, header }) {
    try {
        // eslint-disable-next-line no-unused-vars
        const responce = yield call(deleteProjectApi, deletedIdSelect.data, header)
        yield put(deleteProjectSuccess(deletedIdSelect.data._id))
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


function* onLogin() {
    yield takeEvery(sagaActions.LOGIN_START, onLoginStartAsync)
}
function* onLoadProfile() {
    yield takeEvery(sagaActions.LOAD_USERS_PROFILE, onLoadProfilePictureAsync)
}
function* onLoadUsers() {
    yield takeEvery(sagaActions.LOAD_USERS_START, onLoadUsersStartAsync)
}
function* onCreateUsers() {
    yield takeLatest(sagaActions.CREATE_USER_START, onCreateUsersStartAsync)
}
function* onDeleteUser() {
    while (true) {
        const payload = yield take(sagaActions.DELETE_USER_START)
        yield call(onDeleteUsersStartAsync, payload)
    }
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
    while (true) {
        const payload = yield take(sagaActions.DELETE_PROJECT_START)
        yield call(onDeleteProjectStartAsync, payload)
    }
}
function* onUpdateProject() {
    yield takeEvery(sagaActions.UPDATE_PROJECT_START, onUpdateProjectStartAsync)
}



const usersSagas = [fork(onLoadUsers), fork(onCreateUsers), fork(onDeleteUser), fork(onUpdateUsers)
    , fork(onLogin), fork(onLoadProfile),
fork(onLoadProject), fork(onCreateProject), fork(onDeleteProject), fork(onUpdateProject),
fork(onLoadProjectForAll)
]
export default function* rootSaga() {
    yield all([...usersSagas])
}