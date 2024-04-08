// 创建用户相关的小仓库
import { defineStore } from "pinia";
// 引入接口
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user";
// 引入数据类型
import type {
  loginFormData,
  userInfoReponseData,
  loginResponseData,
} from "@/api/user/type";
import type { UserState } from "./types/types";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
import { constantRoutes } from "@/router/routes";
// 选择式api
const useUserStore = defineStore("user", {
  // 数据储存
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户的唯一标识
      menuRoutes: constantRoutes, //仓库存储生成菜单需要的数组
      username: "",
      avatar: "",
    };
  },
  // 异步和逻辑
  actions: {
    // 用户登录的方法 async 会返回一个promise对象 有三种状态
    async userLogin(data: loginFormData) {
      const res: loginResponseData = await reqLogin(data);
      console.log(res);

      // 成功
      if (res.code == 200) {
        this.token = res.data as string;
        // 保证token持久化-本地存储  由于pinia|vuex存储数据其实利用js对象

        SET_TOKEN(res.data as string);
        // 能保证当前async函数返回一个成功的promise
        return "ok";
      } else {
        // 失败
        // 返回失败的promise对象
        return Promise.reject(new Error(res.message));
      }
    },
    async userInfo() {
      // 获取用户的信息存到仓库里面
      let res: userInfoReponseData = await reqUserInfo();
      if (res.code == 200) {
        this.username = res.data.name;
        this.avatar = res.data.avatar;
        return "ok";
      } else {
        return Promise.reject("获取用户信息失败");
      }
    },
    async userLogout() {
      let res = await reqLogout();
      if (res.code == 200) {
        this.username = "";
        this.token = "";
        this.avatar = "";
        REMOVE_TOKEN();
        return "ok";
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
  },
  getters: {},
});
export default useUserStore;
