<template>
  <div class="breadcrumb">
    <el-icon style="margin-right: 10px" @click="changeIcon">
      <!-- 动态加载组件 -->
      <component :is="layoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight">
      <!-- 面包屑通过路由对象动态展示名字与标题  v-show过滤layout一级路由-->
      <el-breadcrumb-item
        v-for="(item, index) in $route.matched"
        v-show="item.meta.title"
        :key="index"
        :to="item.path"
      >
        <el-icon style="margin-right: 3px" v-if="item.meta.icon">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>
          {{ item.meta.title }}
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script setup lang="ts">
// @ts-ignore
import useLayoutSettingStore from "@/store/modules/setting";
import { useRoute } from "vue-router";
import { ref, reactive } from "vue";

let layoutSettingStore = useLayoutSettingStore();

// 点击图标
const changeIcon = () => {
  layoutSettingStore.fold = !layoutSettingStore.fold;
};

let $route = useRoute();
</script>
<script lang="ts">
export default {
  name: "Breadcrumb",
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  align-items: center;
}
</style>
