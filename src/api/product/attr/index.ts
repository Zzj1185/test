// 书写属性相关api文件
import request from "@/utils/request";
import type { CategoryResponseData, AttrResponseData } from "./type"
enum API {
    C1_URL = '/admin/product/getCategory1',
    C2_URL = '/admin/product/getCategory2/',
    C3_URL = '/admin/product/getCategory3/',
    ATTR_URL = '/admin/product/attrInfoList/'



}
// 获取一级分类
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL);
// 获取二级分类 
export const reqC2 = (category2Id: number | string) => request.get<any, CategoryResponseData>(API.C2_URL + category2Id);
// 获取三级分类
export const reqC3 = (category3Id: number | string) => request.get<any, CategoryResponseData>(API.C2_URL + category3Id);

// 获取分类下 已有的属性与属性值
export const reqAttr = (category1Id: number | string, category2Id: number | string, category3Id: number | string) => request.get<any, AttrResponseData>(API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`);

