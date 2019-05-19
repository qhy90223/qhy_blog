/**
 * 定义应用路由
 */
// import { HashRouter, Switch, Route,Redirect } from 'react-router-dom';
import { Router, Route, Switch ,Redirect} from 'dva/router';

import React from 'react';
import UserLayout from './layouts/UserLayout';
import BasicLayout from './layouts/BasicLayout';

// 按照 Layout 分组路由
// UserLayout 对应的路由：/user/xxx
// BasicLayout 对应的路由：/xxx
const router = ({app,history}) => {
  
  return (
    <Router history={history}> 
      <Switch>
        <Route path="/cms/user" component={UserLayout} />
        <Route path="/cms/" component={BasicLayout} />
        <Redirect to="/cms/dashboard/monitor" />
      </Switch>
    </Router>
  );
};

export default router;
