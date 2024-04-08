// 对外暴露插件对象 自定义插件
import SvgIcon from "./SvgIcon/index.vue";
import Categroy from "./Category/index.vue"
import type { App, Component } from "vue";
// 引入elementPlus全部图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
const components: { [name: string]: Component } = { SvgIcon, Categroy };
export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key]);
    });
    // 将elementPlus提供的图标注册成组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
