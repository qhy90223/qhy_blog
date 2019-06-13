import {getCateListServer,
  createCate,
  updateCate,
  deleteCate} from '../../services/cate'
import {routerRedux} from 'dva/router'
import { Input, Grid, Form, Button, Select, Message } from '@alifd/next';
const Toast = Message;
export default {
  namespace: 'cate',
  state: {
    cateList:[]
  },

  effects: {
    * queryCateList({payload}, {call, put}) {
      
      const res=yield call(getCateListServer)
     
      
      if(res&&res.success){
        yield put({type:'getCateListSuccess',payload:{cateList:res.entity}})
      }
    },
    *createCate({payload},{call,put,select}){
      let  {postBody}=payload
      const res = yield call(createCate,postBody)
      if(res.success){
        Toast.success('添加成功');
        
        yield put(routerRedux.push('/cms/cate/list'))
        yield put({type:'queryCateList'})
      }
    },
    *updateCate({payload},{call,put,select}){
      let  {postBody,closeDialog}=payload
      const res = yield call(updateCate,postBody)
      if(res.success){
        Message.success(res.message)
        closeDialog({
          visible:false
        })
        yield put({type:'queryCateList'})
      }
    },
    *deleteCate({payload},{call,put,select}){
      let  {postBody}=payload
    
    
      const res = yield call(deleteCate,postBody)
      if(res.success){
        Message.success(res.message)
        // closeDialog({
        //   visible:false
        // })
        yield put({type:'queryCateList'})
      }else{
        Message.error(res.message)
      }
    },
    * logout(_, {call, put}) {

      // const response = yield call(accountLogout, {});
      localStorage.removeItem('BASICLAYOUT_REFRESH_KEY');
      localStorage.removeItem('token');

      window.onLogout();
    },
  },

  reducers: {
    getCateListSuccess(state,action){
      const {cateList}=action.payload;
      cateList.forEach(item => {
        item.label=item.cateName
        item.value=item.cateId

      });
      return {...state,cateList}
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
