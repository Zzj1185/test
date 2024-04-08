<template>
    <el-card>
        <el-form :inline="true">

            <el-form-item label="一级分类">
                <el-select style="width:200px" v-model="categoryStore.c1Id" @change="changeC1Id">
                    <el-option v-for="(item, index) in categoryStore.c1Arr" :key="index" :label="item.name"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select style="width:200px" v-model="categoryStore.c2Id" @change="changeC2Id">
                    <el-option v-for="(item2, index2) in categoryStore.c2Arr" :key="index2" :label="item2.name"
                        :value="item2.id"></el-option>

                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select style="width:200px" v-model="categoryStore.c3Id" @change="changeC3Id">
                    <el-option v-for="(item, index) in categoryStore.c3Arr" :key="index" :label="item.name"
                        :value="item.id"></el-option>

                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
// import { reqC1, reqC2, reqC3 } from "@/api/product/attr/index";
import useCategoryStore from "@/store/modules/category";
let categoryStore = useCategoryStore()




onMounted(() => {
    getC1()
})
const getC1 = async () => {
    categoryStore.getC1()

}
// 一级分类的下拉change
const changeC1Id = (e) => {
    categoryStore.c2Id = ''
    categoryStore.c3Id = ''
    categoryStore.getC2()
}
// 二级分类的下拉change
const changeC2Id = (e) => {
    categoryStore.c3Id = ''
    categoryStore.getC3()
}
// 三级分类的下拉change
const changeC3Id = (e) => {

}



</script>
<style lang="scss" scoped></style>
