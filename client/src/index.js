import dva, { connect } from 'dva';

// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@alifd/next/reset.scss';
import router from './router';
import models from './models/';

const ICE_CONTAINER = document.getElementById('ice-container');

if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}
const createHashHistory=require("history").createHashHistory
// 1. Initialize
const app = dva({
  history:createHashHistory()
});

// 3.注册model
models.forEach((m) => {
  app.model(m);
});
// ReactDOM.render(router, ICE_CONTAINER);
// 4. Router
app.router(router);

// 5. Start
app.start('#ice-container');