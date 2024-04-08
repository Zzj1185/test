// 路由鉴权 某一个路由什么条件下可以访问 什么条件下不可以访问
import router from "@/router";

//@ts-ignore
import nprogress from "nprogress";
import "nprogress/nprogress.css";
nprogress.configure({ showSpinner: false });

// 在组件外部 同步获取仓库的数据 不行 必须获取大仓库先
import pinia from "./store";
import useUserStore from "./store/modules/user";
let userStore = useUserStore(pinia);

import setting from "./setting";

// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = `${setting.title}-${to.meta.title}`;
  nprogress.start();
  // 获取token 判断用户登录情况
  let token = userStore.token;
  let username = userStore.username;
  if (token) {
    if (to.path == "/login") {
      next({ path: "/" });
    } else {
      //登录成功必须有用户信息才可以访问路由 否者 发请求用户信息
      if (username) {
        next();
      } else {
        //获取用户信息成功 放行
        try {
          await userStore.userInfo();
          next();
        } catch (error) {
          // token 过期 | 用户手动修改了本地token
          // 退出登录 清空相关数据
          await userStore.userLogout();
          next({ path: "/login", query: { redirect: to.path } });
          console.log(error);
        }
      }
    }
  } else {
    if (to.path == "/login") {
      next();
    } else {
      next({ path: "/login", query: { redirect: to.path } }); //指向login 想去而没有去的地方也带上
    }
  }
  // next()
});

// 全局后置守卫
router.afterEach((to: any, from: any, next: any) => {
  nprogress.done();
});

// 路由鉴权
// 全部路由：登录 404 任意 首页 数据大屏 权限管理（3个子路由） 商品管理（4个子路由）
// 用户未登录(通过仓库的token)：可以访问login 其余的不能（指向login0）
// 用户登录成功：不可以访问login(指向首页) 其余的可以访问
