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
      tagList:[],
      totalCount:1,
      pageSize:5,
      totalPage:1,
      currentPage:1,
    },
  
    effects: {
      * queryTagList({payload}, {call, put,select}) {
        let [currentPage,pageSize]=["",""]
        if(payload&&payload.currentPage){
          currentPage=payload.currentPage
        }else{
          currentPage=yield select ((state) => state.tag.currentPage)
        }
        if(payload&&payload.pageSize){
          pageSize=payload.pageSize
        }else{
          pageSize=yield select ((state) => state.tag.pageSize)
        }

       
        
        const res=yield call(getTagListServer,`?currentPage=${currentPage}&pageSize=${pageSize}`)
       
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
        const {
          entityData,
          totalCount,
          pageSize,
          totalPage,
          currentPage,
        }=action.payload.tagList;
        
        
        entityData.forEach(item => {
          item.key=item.id
          item.label=item.tagName
          item.value=item.tagId
  
        });
        return {
          ...state,
          tagList:entityData,
          totalCount,
          pageSize,
          totalPage,
          currentPage
        }
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
  