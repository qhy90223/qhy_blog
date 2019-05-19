// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置
import {prefix} from '../utils/prefixSetting'
let preFixPath=window.routerPrefix||''
let headerMenuConfig = [
  {
    name: '首页',
    path: '/',
    icon: 'home',
  },
  {
    name: '反馈',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    name: '帮助',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
  },
];

let asideMenuConfig = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'home',
    children: [
      {
        name: '监控页',
        path: '/dashboard/monitor',
      },
    ],
  },
  {
    name: '文章管理',
    path: '/blog',
    icon: 'copy',
    children: [
      { name: '文章列表', path: '/blog/list' },
      { name: '添加文章', path: '/blog/create' },
    ],
  },
  {
    name: '分类管理',
    path: '/cate',
    icon: 'cascades',
    children: [
      { name: '分类列表', path: '/cate/list' },
      { name: '添加分类', path: '/cate/create' },
    ],
  },
  {
    name: '标签管理',
    path: '/tag',
    icon: 'pin',
    children: [
      { name: '标签列表', path: '/tag/list' },
      { name: '添加标签', path: '/tag/create' },
    ],
  },
  {
    name: '用户管理',
    path: '/users',
    icon: 'yonghu',
    children: [
      { name: '用户列表', path: '/users/list' },
      { name: '添加用户', path: '/users/create' },
      { name: '修改密码', path: '/users/pwd' },
    ],
  },
  {
    name: '通用设置',
    path: '/setting',
    icon: 'shezhi',
    children: [
      { name: '基础设置', path: '/setting/basic' },
      {
        name: '菜单设置',
        path: '/setting/navigation',
      },
    ],
  },
  {
    name: '\u6B22\u8FCE\u9875',
    path: '/welcome',
    icon: 'home',
  },
];
headerMenuConfig=prefix(headerMenuConfig,preFixPath)
asideMenuConfig=prefix(asideMenuConfig,preFixPath)


export { headerMenuConfig, asideMenuConfig };
