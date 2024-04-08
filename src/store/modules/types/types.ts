import type { RouteRecordRaw } from "vue-router"; //路由对象的ts类型
import type { CategoryObj } from "@/api/product/attr/type"
export interface UserState {
  token: null | string;
  menuRoutes: RouteRecordRaw[];
  username: string;
  avatar: string;
}


// 定义分类仓库state 对象的ts类型
export interface CategoryState {
  c1Arr: CategoryObj[],
  c1Id: string | number,

  c2Arr: CategoryObj[],
  c2Id: string | number,

  c3Arr: CategoryObj[],
  c3Id: string | number,
}