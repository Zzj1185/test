<template>
  <div class="">
    <!-- 三级分类全局组件 -->
    <Categroy></Categroy>
    <el-card style="margin:10px 0">
      <el-button :disabled="!categoryStore.c3Id" type="primary" size="default" icon="Plus">添加属性</el-button>
      <el-table border style="margin:10px 0">
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="属性名称" align="center" width="120px"></el-table-column>
        <el-table-column label="属性值名称" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="120px"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { reqAttr } from "@/api/product/attr"
import useCategoryStore from "@/store/modules/category";
import type { AttrResponseData, Attr } from "@/api/product/attr/type";
let categoryStore = useCategoryStore();
let attrArr = ref<Attr[]>([])


const getAttr = async () => {
  // 解构分类的3个id
  const { c1Id, c2Id, c3Id } = categoryStore
  let res: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id);
  console.log(res);

  if (res.code == 200) {
    attrArr.value = res.data;
    console.log(attrArr);

  }

}
watch(() =>
  categoryStore.c3Id
  , () => {
    getAttr();


  })





</script>
<style lang="scss" scoped></style>
