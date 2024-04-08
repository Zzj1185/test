<template>
  <div class="setting">
    <el-button
      size="small"
      icon="Refresh"
      circle
      @click="handleRefsh"
    ></el-button>
    <el-button
      size="small"
      icon="FullScreen"
      circle
      @click="handleScreen"
    ></el-button>
    <el-button size="small" icon="Setting" circle></el-button>
    <img
      style="height: 24px; width: 24px; margin: 0 10px; border-radius: 50%"
      :src="userStore.avatar"
      alt=""
    />
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
//@ts-ignore
import useLayOutSettingStore from "@/store/modules/setting";
//@ts-ignore
import useUserStore from "@/store/modules/user";
import { useRouter, useRoute } from "vue-router";
let $router = useRouter();
let $route = useRoute();
let layOutSettingStore = useLayOutSettingStore();
// 刷新
const handleRefsh = () => {
  layOutSettingStore.refsh = !layOutSettingStore.refsh;
};

// 全屏
const handleScreen = () => {
  let full = document.fullscreenElement; //全屏true  非全屏null

  if (!full) {
    // 利用文档根节点的方法实现
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

// user仓库
let userStore = useUserStore();

// 退出登录
const logout = async () => {
  // 1.向服务器发请求
  // 2.仓库中用户信息清空
  // 3.跳转到登录页面
  await userStore.userLogout(); ///里面有异步 需要成功之后调到login

  $router.push({ path: "/login", query: { redirect: $route.path } });
};
</script>
<script lang="ts">
export default {
  name: "Setting",
};
</script>
<style lang="scss" scoped>
.setting {
  display: flex;
  align-items: center;
}
</style>
