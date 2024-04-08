<template>
  <div class="logo" v-if="Setting.logoHidden">
    <img :src="Setting.logo" alt="" />
    <p>{{ Setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import Setting from "@/setting";
</script>
<script lang="ts">
export default {
  name: "Logo",
};
</script>

<style lang="scss" scoped>
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: $base-logo-title-fontSize;
  padding: 10px;

  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
}
</style>
