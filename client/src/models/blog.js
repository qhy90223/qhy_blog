import {getBlogListServer,createBlog,updateBlog,deleteBlog} from '../../services/blog';
import { Input, Grid, Form, Button, Select, Message } from '@alifd/next';
import {routerRedux} from 'dva/router'
export default {
  namespace: 'blog',
  state: {
    blogList:[],
    totalCount:1,
    pageSize:5,
    totalPage:1,
    currentPage:1,
    editerValue:"",
    tabKey:0
  },

  effects: {
    *queryBlogList({payload}, {call, put, select}) {
      let blogState=payload?payload.blogState:"";
      let currentPage = payload?payload.currentPage:"";
      if(!blogState){
        blogState=yield select(state => state.blog.tabKey)
      }
      if(!currentPage){
        currentPage=yield select(state => state.blog.currentPage)
      }
      const res=yield call(getBlogListServer,{blogState,currentPage})
      if(res&&res.success){
        yield put({type:'getBlogListSuccess',payload:{blogInfo:res.entity}})
      }
    },
    *createBlog({payload},{call,put,select}){
      let  {postBody}=payload
      postBody.content=yield select(state=>state.blog.editerValue)
      const res = yield call(createBlog,postBody)
      if(res.success){
        Message.success(res.message)
        yield put(routerRedux.push('/cms/blog/list'))
        yield put({type:'queryBlogList'})
      }
    },
    *updateBlog({payload},{call,put,select}){
      let  {postBody,closeDialog}=payload
      const res = yield call(updateBlog,postBody)
      if(res.success){
        Message.success(res.message)
        closeDialog({
          visible:false
        })
        yield put({type:'queryBlogList'})
      }
    },
    *deleteBlog({payload},{call,put,select}){
      let  postBody=payload
      const res = yield call(deleteBlog,postBody)
      if(res.success){
        Message.success(res.message)
        // closeDialog({
        //   visible:false
        // })
        yield put({type:'queryBlogList'})
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
    setEditerValue(state,action){
      const {editerValue}=action.payload;
      return {...state,editerValue}
    },
    getBlogListSuccess(state,action){
      const {currentPage,totalCount,pageSize,totalPage}=action.payload.blogInfo
      const blogList=action.payload.blogInfo.entityData;
      blogList.forEach(item => {
        if(item.state==1){
          item.status='已发布'
        }else if(item.state==2){
          item.status='审核中'
        }else if(item.state==3){
          item.status='已拒绝'
        }

      });
      return {...state,blogList,currentPage,totalCount,pageSize,totalPage}
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
