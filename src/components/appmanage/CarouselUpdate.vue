<template>
  <div id="CarouselAdd">
    <div class="breadcrumb">
      <span>位置：</span>
      <el-breadcrumb separator=">" separator-class="el-icon-d-arrow-right">
        <el-breadcrumb-item :to="{path:'/carousel'}">轮播广告管理</el-breadcrumb-item>
        <el-breadcrumb-item>新增轮播广告</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="wrap">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题：" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="图片：" prop="img">
          <div>
            <el-upload
              class="upload-demo"
              drag
              :on-change="fileChange"
              action=""
              list-type="picture"
              :http-request="upload"
              :file-list="fileLists"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="排序：" prop="sliderIndex">
          <el-input v-model="ruleForm.sliderIndex" class="index"></el-input>
        </el-form-item>
        <el-form-item label="发布区域：" prop="area">
          <el-select v-model="area" multiple placeholder="请选择">
            <el-option
              v-for="item in areaOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="链接：" prop="jumpUrl">
          <el-input v-model="ruleForm.jumpUrl"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" class="close" @click="$router.push('/carousel')">关闭</el-button>
          <el-button size="small" type="primary" @click="addContent" class="save">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import unit from '@/unit/unit.js';
  export default{
    data(){
      return {
        ruleForm: {
          name: '',
          imageDownloadUrl: '',
          jumpUrl: '',
//              area:[],
          sliderIndex: null,
        },
        area: [],
        session: sessionStorage.getItem('session'),
        fileLists: [],
        areaOptions: [{
          value: '111',
          label: '河源'
        }, {
          value: '222',
          label: '惠州'
        }, {
          value: '233',
          label: '其他'
        }],
        rules: {
          name: [
            {required: true, message: '请输入标题', trigger: 'blur'}
          ],
          img: [
            {required: true, message: '请选择图片', trigger: 'blur'}
          ],
          sliderIndex: [
            {required: true, message: '请填写排序', trigger: 'blur'}
          ],
          area: [
            {required: true, message: '请选择发布区域', trigger: 'blur'}
          ],
          jumpUrl: [
            {required: true, message: '请填写链接', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      fileChange(file, fileList){
        fileList = [];
        fileList[0] = file;
        this.fileLists = [];
        this.fileLists[0] = file;
      },
      upload(param){
        var vm = this;
        var fileObj = param.file;
        var FileComtroller = "http://www.yxunionpay.com:8087/yxsj-openapi-web/openapi/upload/upload.do";
        var form = new FormData();
        form.append('file', fileObj);
        form.append('upload_type', '4');
        vm.$http.post(FileComtroller, form, {"Content-Type": "multipart/form-data;"}).then(function (data) {
//              console.log(vm.fileLists);
        }, function (data) {
          console.log('失败');
        })
      },
      addContent(){
        var vm = this;
        vm.ruleForm = unit.removeEmptyString(vm.ruleForm);
//            console.log(vm.ruleForm)
        var add = new RemoteCall();
        add.init({
          router: '/ips/slider/update',
          session: vm.session,
          data: vm.ruleForm,
          callback: function (data) {
            vm.$alert('修改成功', '提示', {
              confirmButtonText: '确定',
              callback: function () {
                vm.$router.push('/carousel')
              }
            })
          }
        })
      },
      newsFlag(status){//状态转换 0|null = 未发布 1=发布
        if (status == '已发布') {
          return 1
        } else {
          return 0
        }
      },
    },
    mounted: function () {
      this.$route.params.data.enableFlag = this.newsFlag(this.$route.params.data.enableFlag)
      this.ruleForm = this.$route.params.data;
    }
  }
</script>
<style lang="scss">
  #CarouselAdd {
    background: #fff;
    padding: 20px 0;
    margin: 20px 24px;
    .breadcrumb {
      vertical-align: middle;
      padding-left: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #e8e8e8
    }
    .breadcrumb span {
      display: inline-block;
      font-size: 14px;
      line-height: 16px;
      vertical-align: middle;
    }
    .el-breadcrumb {
      display: inline-block;
      vertical-align: middle;
    }
    .wrap {
      width: 740px;
      min-height: 760px;
      margin: 20px auto;
    }
    .index {
      width: 80px;
    }
    .close {

    }
    .el-button {
      width: 100px;
    }
    .save {
      background: #32BC6F;
    }
  }
</style>
