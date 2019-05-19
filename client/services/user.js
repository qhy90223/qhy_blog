import http from '../utils/http';
const prefix='/api/user'
const userLogin=(postData) => {
  return http.post(prefix+'/login',postData)
}
const getUserListServer=()=>{
  return http.get(prefix+'/list')
}
const createUser=(postBody) => {
  return http.post(prefix+'/create',postBody)
}
const updateUser=(postBody)=>{
  return http.post(prefix+'/update',postBody)
}
const deleteUser=(postBody)=>{
  return http.post(prefix+'/delete',postBody)
}
const rePassword=(postBody)=>{
  return http.post(prefix+'/repassword',postBody)
}
export {
  userLogin,
  getUserListServer,
  createUser,
  updateUser,
  deleteUser,
  rePassword
}