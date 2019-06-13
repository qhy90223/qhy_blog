import http from '../utils/http';
const prefix='/api/tag'
const getTagListServer=(query)=>{
  console.log(query,'query');
  
  return http.get(prefix+'/list'+`${query?query:""}`)
}
const createTag=(postBody) => {
  return http.post(prefix+'/create',postBody)
}
const updateTag=(postBody)=>{
  return http.post(prefix+'/update',postBody)
}
const deleteTag=(postBody)=>{
  return http.post(prefix+'/delete',postBody)
}
export {
  getTagListServer,
  createTag,
  updateTag,
  deleteTag
}