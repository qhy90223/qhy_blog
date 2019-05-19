import http from '../utils/http';
const prefix='/api/cate'
const getCateListServer=()=>{
  return http.get(prefix+'/list')
}
const createCate=(postBody) => {
  return http.post(prefix+'/create',postBody)
}
const updateCate=(postBody)=>{
  return http.post(prefix+'/update',postBody)
}
const deleteCate=(postBody)=>{
  return http.post(prefix+'/delete',postBody)
}
export {
  getCateListServer,
  createCate,
  updateCate,
  deleteCate
}