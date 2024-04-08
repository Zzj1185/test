<template>
  <!-- 路由组件出口的位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout一级路由组件的子路由 -->
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick, watch } from "vue";
//@ts-ignore
import useLayOutSettingStore from "@/store/modules/setting";
let layOutSettingStore = useLayOutSettingStore();

// 控制组件是否销毁重建
let flag = ref(true); //先默认不销毁
// 监听仓库内部数据是否发生变化 如果变化 说明用户点击了刷新按钮 用v-if可以销毁组件
watch(
  () => layOutSettingStore.refsh,
  () => {
    flag.value = false;
    nextTick(() => {
      flag.value = true;
    });
  },
);
</script>
<script lang="ts">
export default {
  name: "Main",
};
</script>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
