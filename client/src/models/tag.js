import {getTagListServer,
    createTag,
    updateTag,
    deleteTag} from '../../services/tag'
  import {routerRedux} from 'dva/router'
  import { Input, Grid, Form, Button, Select, Message } from '@alifd/next';
  const Toast = Message;
  export default {
    namespace: 'tag',
    state: {
      tagList:[]
    },
  
    effects: {
      * queryTagList({payload}, {call, put}) {
        
        const res=yield call(getTagListServer)
       
        
        if(res&&res.success){
          yield put({type:'getTagListSuccess',payload:{tagList:res.entity}})
        }
      },
      *createTag({payload},{call,put,select}){
        let  {postBody}=payload
        const res = yield call(createTag,postBody)
        if(res.success){
          Toast.success('添加成功');
          yield put(routerRedux.push('/cms/tag/list'))
          yield put({type:'queryTagList'})
        }
      },
      *updateTag({payload},{call,put,select}){
        let  {postBody,closeDialog}=payload
        const res = yield call(updateTag,postBody)
        if(res.success){
          Message.success(res.message)
          closeDialog({
            visible:false
          })
          yield put({type:'queryTagList'})
        }
      },
      *deleteTag({payload},{call,put,select}){
        let  {postBody}=payload
      
      
        const res = yield call(deleteTag,postBody)
        if(res.success){
          Message.success(res.message)
          // closeDialog({
          //   visible:false
          // })
          yield put({type:'queryTagList'})
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
      getTagListSuccess(state,action){
        const {tagList}=action.payload;
        // TagList.forEach(item => {
        //   if(item.state==0){
        //     item.status='已发布'
        //   }else if(item.state==1){
        //     item.status='审核中'
        //   }else{
        //     item.status='已拒绝'
        //   }
  
        // });
        return {...state,tagList}
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
  