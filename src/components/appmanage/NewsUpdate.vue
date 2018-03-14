<template>
  <div id="NewslAdd">
    <div class="breadcrumb">
      <span>位置：</span>
      <el-breadcrumb separator=">" separator-class="el-icon-d-arrow-right">
        <el-breadcrumb-item :to="{path:'/news'}">新闻资讯管理</el-breadcrumb-item>
        <el-breadcrumb-item>新增新闻资讯</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="wrap">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题：" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="图片：" prop="img">
          <div>
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
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
        <el-form-item label="内容：">
          <quill-editor ref="myTextEditor"
                        v-model="content"
                        :options="editorOption"
          ></quill-editor>
        </el-form-item>
        <el-form-item>
          <el-button size="small" class="close">关闭</el-button>
          <el-button size="small" type="primary" class="save" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import {quillEditor} from 'vue-quill-editor';
  import unit from '@/unit/unit.js'
  export default{
    components: {
      quillEditor
    },
    data(){
      return {
        content: '',
        session: sessionStorage.getItem('session'),
        editorOption: {
//            debug:'info',
          placeholder: '请输入内容',
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              [{'script': 'sub'}, {'script': 'super'}],
              [{'align': []}],
              ['blockquote', {'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
              ['link', 'clean']
            ]
          },
          theme: 'snow'
        },
        area: '',
        ruleForm: {
          title: '',
          img: '',
          thumbImage: 'http://f.hiphotos.baidu.com/image/pic/item/c75c10385343fbf2f7da8133bc7eca8065388f2f.jpg',
          author: sessionStorage.getItem('userName'),
          url: 'http://www.baidu.com',
          enableFlag: 0
        },
        areaOptions: [
          {
            value: '111',
            label: '河源'
          }, {
            value: '222',
            label: '惠州'
          }, {
            value: '233',
            label: '其他'
          }
        ],
        rules: {
          title: [
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
        }
      }
    },
    methods: {
      save(){
        var vm = this;
        vm.ruleForm = unit.removeEmptyString(vm.ruleForm);
        var remote = new RemoteCall();
        remote.init({
          router: '/ips/article/update',
          session: vm.session,
          data: vm.ruleForm,
          callback: function (data) {
            if (data.ret.errorCode === 0) {
              vm.$alert('添加成功', '提示', {
                confirmButtonText: '确定',
                callback: () => {
                  vm.$router.push('/news')
                }
              })
            }
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
  #NewslAdd {
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
    .v-note-wrapper .v-note-op .right {
      max-width: 0%;
      width: 0%;
    }
    .ql-blank {
      height: 250px;
    }
    .ql-editor {
      height: 250px;
    }
  }
</style>
