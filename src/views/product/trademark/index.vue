<template>
  <div>
    <el-card class="box-card">
      <!-- 按钮 -->
      <el-button type="primary" size="default" icon="Plus" @click="addTradeMark">添加品牌</el-button>
      <!-- 表格 -->
      <el-table style="margin: 10px 0" :data="tableData" border>
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <el-table-column prop="tmName" label="品牌名称" align="center">
        </el-table-column>
        <el-table-column prop="logoUrl" label="品牌LoGo" align="center">
          <template #="{ row, $index }">
            <img :src="row.logoUrl" style="width:100px;height: 100px;">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="品牌操作" align="center">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" icon="Edit" @click="updateTrademark(row)"></el-button>
            <el-popconfirm :title="`您确定要删除${row.tmName}?`" width="250px" icon="Delete" @confirm='removeTradeMark(row.id)'>
              <template #reference>
                <el-button type="primary" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination :current-page="currentPage" :page-size="pageSize" :page-sizes="[10, 20, 30, 40]" :small="false"
        :disabled="false" :background="false" layout=" prev, pager, next, jumper,->,sizes,total " :total="total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-card>
    <el-dialog v-model="dialogVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'" width="500">
      <el-form style="width: 80%;" :model="trademarkParams" :rules="rules" ref="formRef">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input placeholder="请您输入品牌名称" v-model="trademarkParams.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- upload组件属性:action图片上传路径书写/api,否则代理服务器不发送这次post请求  -->
          <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>

        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from "vue";
import { reqHasTrademark, reqAddOrUpdateTrademark, reqDeleteTrademark } from '@/api/product/trademark';
import type { Records, TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type'
import { ElMessage, UploadProps, formEmits } from 'element-plus'



let currentPage = ref<number>(1);
let pageSize = ref<number>(10);
let total = ref<number>(0);
let tableData = ref<Records>([]);
let dialogVisible = ref(false);
let trademarkParams = reactive<TradeMark>({//新增品牌数据
  tmName: '',
  logoUrl: ''
})

//品牌自定义校验规则方法
const validatorTmName = (rule: any, value: any, callBack: any) => {
  //是当表单元素触发blur时候,会触发此方法
  //自定义校验规则
  if (value.trim().length >= 2) {
    callBack();
  } else {
    //校验未通过返回的错误的提示信息
    callBack(new Error('品牌名称位数大于等于两位'))
  }
}
//品牌LOGO图片的自定义校验规则方法
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  //如果图片上传
  if (value) {
    callBack();
  } else {
    callBack(new Error('LOGO图片务必上传'))
  }
}
let rules = {
  tmName: [
    //required:这个字段务必校验,表单项前面出来五角星
    //trigger:代表触发校验规则时机[blur、change]
    { required: true, trigger: 'blur', validator: validatorTmName }
  ],
  logoUrl: [
    { required: true, validator: validatorLogoUrl }
  ]
}
//获取el-form组件实例
let formRef = ref();




// 分页器方法
let handleSizeChange = (val: number) => {
  currentPage.value = 1//每页的数据量发生变化时候 页码归一
  pageSize.value = val
  getHasTradeMark()
};
let handleCurrentChange = (val: number) => {
  currentPage.value = val
  getHasTradeMark()

};

// 获取已有品牌
const getHasTradeMark = async () => {
  let res: TradeMarkResponseData = await reqHasTrademark(currentPage.value, pageSize.value)

  if (res.code == 200) {
    total.value = res.data.total
    tableData.value = res.data.records
  }
}

// 表格方法
// 修改按钮
const updateTrademark = (row: TradeMark) => {
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
  // trademarkParams.tmName = row.tmName;
  // trademarkParams.logoUrl = row.logoUrl;
  // trademarkParams.id = row.id

  // 合并对象
  trademarkParams = Object.assign(trademarkParams, row)


  dialogVisible.value = true;


}
// 删除按钮
const removeTradeMark = async (id) => {

  let res = await reqDeleteTrademark(id);
  if (res.code == 200) {

    ElMessage({
      type: 'success',
      message: '删除品牌成功'
    });
    getHasTradeMark();
  } else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败'
    });
  }
}



// 弹框方法
const cancel = () => {
  dialogVisible.value = false
}
const confirm = async () => {
  // 表单检验 全部通过才可以放行
  await formRef.value.validate()
  dialogVisible.value = false;
  let res = await reqAddOrUpdateTrademark(trademarkParams);
  if (res.code == 200) {
    dialogVisible.value = false;
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功'
    });
    getHasTradeMark();

  } else {
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败'
    });
  }



}

const addTradeMark = () => {
  // id也要清空
  trademarkParams.tmName = '';
  trademarkParams.logoUrl = '';
  trademarkParams.id = 0
  dialogVisible.value = true;
  // formRef.value?.clearValidate('tmName')
  // formRef.value?.clearValidate('logoUrl')
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
}

//上传图片组件->上传图片之前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  //钩子是在图片上传成功之前触发,上传文件之前可以约束文件类型与大小
  //要求:上传文件格式png|jpg|gif 4M
  if (rawFile.type == 'image/png' || rawFile.type == 'image/jpeg' || rawFile.type == 'image/gif') {
    if (rawFile.size / 1024 / 1024 < 4) {//字节-kb-M
      return true;
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件大小小于4M'
      })
      return false;
    }
  } else {
    ElMessage({
      type: 'error',
      message: "上传文件格式务必PNG|JPG|GIF"
    })
    return false;
  }
}
//图片上传成功钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  //response:即为当前这次上传图片post请求服务器返回的数据
  //收集上传图片的地址,添加一个新的品牌的时候带给服务器
  trademarkParams.logoUrl = response.data;
  //图片上传成功,清除掉对应图片校验结果
  formRef.value.clearValidate('logoUrl');

}


onMounted(() => {
  getHasTradeMark()
})
</script>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
