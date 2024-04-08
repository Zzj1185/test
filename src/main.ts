import { createApp } from "vue";
import App from "./App.vue";

// 引入elementPlus插件与样式
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// @ts-expect-error忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

// 获取应用实例对象
const app = createApp(App);
// 应用element-plus插件
app.use(ElementPlus, {
  locale: zhCn,
});
// svg需要的配置代码
import "virtual:svg-icons-register";

// 引入自定义插件：注册全局组件
import gloablComponent from "./components/index";
app.use(gloablComponent);

import "@/styles/index.scss";

import api from "./api/index";
app.provide("$api", api);

// 引入和注册路由
import router from "./router";
app.use(router);

// 引入安装仓库
import pinia from "./store";
app.use(pinia);

// 引入路由鉴权文件 这样就至少执行一次
import "./permission";

// 将应用挂载到挂载点上
app.mount("#app");
