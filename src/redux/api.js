/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
/* eslint-disable no-return-await */
/* eslint-disable prettier/prettier */
import httpInstance from "./config/axiosConfig"

export const loginApi = async (ele) => {
  return await httpInstance.post(`/users/login`, ele.formValue)
}
export const loadUserProfileApi = async (ele) => {
  return await httpInstance.get(`/users/getProfile/${ele.userId}`)
}

export const updateUserProfileApi = async (profile) => {
  return await httpInstance.post('/users/uploadProfileImg', profile)
}

export const changePasswordApi = async (input2) => {
  return await httpInstance.put('/users/changePassword', input2.input2)
}

// eslint-disable-next-line arrow-body-style
export const loadUsersApi = async (header) => {
  return await httpInstance.get(`/users/getUsers?pageno=${header.page}&pagesize=${header.rowsPerPage}&regex=${header.searchTerm}`, header.header)
}


export const createUsersApi = async (formValue, header) => {
  return await httpInstance.post("/users/addUsers", formValue, header)
}


export const deleteUsersApi = async (deleteId, header) => {
  return await httpInstance.delete(`/users/removeUser/${deleteId}`, header)

}


export const updateUsersApi = async (formValue, header) => {
  return await httpInstance.put(`/users/updateUser`, formValue, header)
}



export const loadProjectApi = async (header) => {
  return await httpInstance.get(`/projects/get-projects?pageno=${header.page}&pagesize=${header.rowsPerPage}&regex=${header.searchTerm}`, header.header)
}
export const loadProjectApiForAll = async (header) => {
  return await httpInstance.get(`/managers/getMyProjectList/${header.reduxState}?pageno=${header.page}&pagesize=${header.rowsPerPage}&regex=${header.searchTerm}`, header.header)
}


export const createProjectApi = async (formValue, header) => {
  return await httpInstance.post("/projects/add-project", formValue, header)
}


export const deleteProjectApi = async (deleteId, header) => {
    return await httpInstance.delete(`/projects/delete-project/${deleteId}`, header)
}


export const updateProjectApi = async (formValue, header) => {
  return await httpInstance.put(`/projects/edit-project`, formValue, header)
}


export const loadManagerListApi = async (header) => {
  return await httpInstance.get(`/managers/get-managers?pageno=1&pagesize=10`, header)
}
export const assignMangertoProjectApi = async (managerId, header) => {
  return await httpInstance.post('/managers/assignProject', managerId, header)
}

export const loadTeamLeadListApi = async (header) => {
  return await httpInstance.get(`/teamLead/getList?pageno=1&pagesize=10`, header)
}

export const assigTeamLeadtoProjectApi = async (teamLeadIdProjectSelected, header) => {
  return await httpInstance.post('/teamLead/assignProjectToLead', teamLeadIdProjectSelected, header)
}

export const loadTeamMemberListApi = async (header) => {
  return await httpInstance.get(`/teamMember/getMembers?pageno=1&pagesize=10`, header)
}

export const assigTeamMembertoProjectApi = async (teamLeadIdProjectSelected, header) => {
  return await httpInstance.post('/teamMember/AssignedProjectToteamMember', teamLeadIdProjectSelected, header)
}

export const getNotificationApi = async ( header) => {
  return await httpInstance.get(`/users/getNotification?pageno=1&pagesize=200`, header)
}

export const getLogoApi = async () => {
  return await httpInstance.get(`/logo/getLogo`,)
}