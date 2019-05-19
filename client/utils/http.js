import axios from 'axios';
import {routerRedux} from 'dva/router';
const getResponse= (res) => {
  if(res.status===200){
    return res.data
  }
}

let reqHeader={
  
}
const http = {
  get:(url,config) =>{
    const headers=config?config:reqHeader
    return axios.get(url,headers)
    .then(getResponse)
    .catch((err)=>{
      if(err.response){
        if(err.response.status===302){
          console.log(err.response);
         }else if(err.response.status===401){
          location.replace('#/cms/user/login')
        } 
      }
    })
  },
  post:(url,data,config)=>{
    const headers=config?config:reqHeader
    return axios.post(url,data,headers)
    .then(getResponse)
    .catch((err)=>{
      if(err.response){
        if(err.response.status===302){
          
          return err.response.data
          

         }else if(err.response.status===401){
          location.replace('#/cms/user/login')
        } 
      }
    })
  }
}
export default http