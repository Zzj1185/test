//分类相关数据的ts类型

export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}
export interface CategoryObj {
    id: number | string,
    name: string,
    category1Id?: number,
    category2Id?: number
}


export interface CategoryResponseData extends ResponseData {
    data: CategoryObj[]
}

// 属性与属性值返回的类型

// 已有属性值对象
export interface AttrValue {
    id: number,
    valueName: string,
    attrId: number
}
// 存储每个属性值的数组
export type AttrValueList = AttrValue[]

// 属性对象
export interface Attr {
    id: number,
    attrName: string,
    categoryId: number,
    categoryLevel: number,
    attrValueList: AttrValueList
}
// 存储每一个属性对象的数组ts类型
export type AttrList = Attr[];

// 属性接口返回的数据接口
export interface AttrResponseData extends ResponseData {
    data: Attr[]
}
