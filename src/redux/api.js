/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
/* eslint-disable no-return-await */
/* eslint-disable prettier/prettier */
import httpInstance from "./config/axiosConfig"

export const loginApi = async (ele) => {
  return await httpInstance.post(`/users/login`, ele.formValue)
}
export const loadUserProfileApi = async () => {
  return await httpInstance.get(`/users/getProfile`)
}
// eslint-disable-next-line arrow-body-style
export const loadUsersApi = async (header) => {
  return await httpInstance.get(`/users/getUsers?pageno=${header.page}&pagesize=${header.rowsPerPage}&regex=${header.searchTerm}`, header.header)
}


export const createUsersApi = async (formValue, header) => {
  return await httpInstance.post("/users/addUsers", formValue, header)
}


export const deleteUsersApi = async (deletedIdSelect, header) => {
  return await httpInstance.delete(`/users/removeUser`, deletedIdSelect, header)
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


export const deleteProjectApi = async (deletedIdSelect, header) => {;
  return await httpInstance.delete(`/users/removeUser`, deletedIdSelect, header)
}


export const updateProjectApi = async (formValue, header) => {
  return await httpInstance.put(`/projects/edit-project`, formValue, header)
}

