import {routerRedux} from 'dva/router';
// import {accountLogin, accountLogout, login} from '../services/api';
import {genPassword} from '../../utils/cryp'
import { Message } from '@alifd/next';
import {
  userLogin,
  getUserListServer,
  createUser,
  updateUser,
  deleteUser,
  rePassword
} from '../../services/user';
const Toast=Message
export default {
  namespace: 'user',
  state: {
    user: {},
    userList:[]
  },

  effects: {
    * login({payload}, {call, put}) {
      const postBody=payload
      const res=yield call(userLogin,postBody)
      
      if(res.success){
        const {currentPath} = res.entity
        Message.success('登录成功')
        yield put(routerRedux.push(currentPath))
        // location.replace('#'+currentPath)
        
      }else{
        Message.error('用户名和密码不正确')
      }
    },
    * queryUserList({payload}, {call, put}) {
        
      const res=yield call(getUserListServer)
     
      
      if(res&&res.success){
        yield put({type:'getUserListSuccess',payload:{userList:res.entity}})
      }
    },
    *createUser({payload},{call,put,select}){
      let  {postBody}=payload
      const res = yield call(createUser,postBody)
      if(res.success){
        Toast.success('添加成功');
        yield put(routerRedux.push('/cms/users/list'))
        yield put({type:'queryUserList'})
      }
    },
    *updateUser({payload},{call,put,select}){
      let  {postBody,closeDialog}=payload
      const res = yield call(updateUser,postBody)
      if(res.success){
        Message.success(res.message)
        closeDialog({
          visible:false
        })
        yield put({type:'queryUserList'})
      }
    },
    *deleteUser({payload},{call,put,select}){
      let  {postBody}=payload
      const res = yield call(deleteUser,postBody)
      if(res.success){
        Message.success(res.message)
        yield put({type:'queryUserList'})
      }else{
        Message.error(res.message)
      }
    },
    *rePassword({payload},{call,put,select}){
      let {postBody}=payload;
      postBody.password=genPassword(postBody.password)
      const res = yield call(rePassword,postBody)
      if(res.success){
        Toast.success('密码修改成功');
        yield put(routerRedux.push('/cms/users/list'))
      }
    },
    * logout(_, {call, put}) {
      localStorage.removeItem('BASICLAYOUT_REFRESH_KEY');
      localStorage.removeItem('token');
      window.onLogout();
    },
  },

  reducers: {
    getUserListSuccess(state,action){
      const {userList}=action.payload;
      userList.forEach(item => {
        if(item.authority==0){
          item.group='管理员'
        }else{
          item.group='普通用户'
        }
      })
      // });
      return {...state,userList}
    },
    onSaveEditer(state,action){
      const {editerValue}=action.payload
      return {...state,editerValue}
    },
    changeLoginStatus(state, {payload}) {
      return {
        ...state,
        status: payload.code === 200 ? 'ok' : 'error',
        type: payload.type || 'account',
        submitting: false,
      };
    },
    changeSubmitting(state, {payload}) {
      return {
        ...state,
        submitting: payload,
      };
    },
  },
};
