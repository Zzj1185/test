//小仓库:layout组件相关配置仓库
import { defineStore } from "pinia";
import { reqC1, reqC2, reqC3 } from "@/api/product/attr/index.ts";
import type { CategoryResponseData } from "@/api/product/attr/type";
import type { CategoryState } from "./types/types";
const useCategoryStore = defineStore("Category", {
    state: (): CategoryState => {
        return {
            c1Arr: [],
            c1Id: '',
            c2Arr: [],
            c2Id: '',
            c3Arr: [],
            c3Id: '',
        };
    },
    actions: {
        async getC1() {//获取一级分类
            let res: CategoryResponseData = await reqC1()
            if (res.code == 200) {
                this.c1Arr = res.data
            }
        },
        async getC2() {//获取二级分类
            let res: CategoryResponseData = await reqC2(this.c1Id)
            if (res.code == 200) {
                this.c2Arr = res.data
            }
        },
        async getC3() {//获取三级分类
            let res: CategoryResponseData = await reqC3(this.c2Id)
            if (res.code == 200) {
                this.c3Arr = res.data
            }
        },

    },
    getters: {

    }
});

export default useCategoryStore;
