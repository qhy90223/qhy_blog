import http from '../utils/http';
const prefix='/api/blog'
const getBlogListServer=(query)=>{
  return http.get(prefix+'/list'+`?blogState=${query}`)
}
const createBlog=(postBody) => {
  return http.post(prefix+'/create',postBody)
}
const updateBlog=(postBody)=>{
  return http.post(prefix+'/update',postBody)
}
const deleteBlog=(postBody)=>{
  return http.post(prefix+'/delete',postBody)
}
export {
  getBlogListServer,
  createBlog,
  updateBlog,
  deleteBlog
}