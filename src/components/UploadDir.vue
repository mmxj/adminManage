<template>
  <div id="UploadDir">
    <el-row :gutter="20">
      <el-col :span="3"><label for="">使用范围：</label></el-col>
      <el-col :span="6">
        <!--<div class="distpicker"><v-distpicProvinceince="省" city="市" area="区"></v-distpicker></div>-->
        <div class="distpicker">
          <Province :propdata="inputData"></Province>
        </div>
      </el-col>
      <!--<el-col :span="6">-->
      <!--<input type="text" placeholder="请填写所属镇区或街区办">-->
      <!--</el-col>-->
    </el-row>
    <!--<el-row :gutter="20">-->
    <!--<el-col :span="3">-->
    <!--<label for="">文件标识名称：</label>-->
    <!--</el-col>-->
    <!--<el-col :span="6">-->
    <!--<input type="text">-->
    <!--</el-col>-->
    <!--</el-row>-->
    <el-row :gutter="20">
      <el-col :offset="3" :span="3">
        <div class="el-button upExcelBox">浏览上传三大目录<input type="file" class="upExcel" @change="importf"></div>
      </el-col>
      <el-col :span="3">
        <el-button @click="importData">导入目录列表</el-button>
      </el-col>
      <el-col :span="3">
        <!--<el-button @click="downExcel">下载三大目录模板</el-button>-->
        <a class="downExcel" href="static/xlsx/three_charge_catalog.xlsx">下载三大目录模板</a>
      </el-col>
    </el-row>
    <el-table :data="tableData" border width="100%" max-height="800" align="center">
      <el-table-column prop="companyId" label="医院编号" width="120"></el-table-column>
      <el-table-column prop="itemCode" label="项目类别" width="150"></el-table-column>
      <el-table-column prop="itemNo" label="项目编码" width="150"></el-table-column>
      <el-table-column prop="itemNameCh" label="项目中文名称" width="150"></el-table-column>
      <el-table-column prop="itemNameEn" label="项目英文名称" width="200"></el-table-column>
      <el-table-column prop="commonNames" label="通用名" width="200"></el-table-column>
      <el-table-column prop="specifications" label="规格" width="200"></el-table-column>
      <el-table-column prop="dosageForms" label="剂型" width="150"></el-table-column>
      <el-table-column prop="materialCategory" label="材料类别" width="150"></el-table-column>
      <el-table-column prop="materialType" label="材料分类" width="150"></el-table-column>
      <el-table-column prop="hospitalTypeCode" label="医院分类代码" width="300"></el-table-column>
      <el-table-column prop="unitPrice" label="单价" width="150"></el-table-column>
      <el-table-column prop="unit" label="单位" width="100"></el-table-column>
      <el-table-column prop="internationalCode" label="国际码" width="150"></el-table-column>
      <el-table-column prop="mnemonicCode" label="助记码" width="100"></el-table-column>
      <el-table-column prop="effectiveDate" label="生效日期" width="100"></el-table-column>
      <el-table-column porp="remark" label="备注" width="100"></el-table-column>
      <el-table-column porp="socialSecurityCode" label="社保项目编码" width="100"></el-table-column>
    </el-table>
    <div style="display:none">
      <table id="tableExcel" width="100%" border="1" cellspacing="0" cellpadding="0">
        <tr>
          <td>医院编号</td>
          <td>项目类别</td>
          <td>项目编码</td>
          <td>项目中文名称</td>
          <td>项目英文名称</td>
          <td>通用名</td>
          <td>规格</td>
          <td>剂型</td>
          <td>材料类别</td>
          <td>材料分类</td>
          <td>医院分类代码</td>
          <td>单价</td>
          <td>单位</td>
          <td>国际码</td>
          <td>助记码</td>
          <td>生效日期</td>
          <td>备注</td>
          <td>社保项目编码</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {mapGetters, mapActions} from 'vuex'
  import Province from '@/common/Province'
  import '@/assets/js/jquery-table2excel.js'
  export default{
    components: {
      Province
    },
    data(){
      return {
        tableData: [],
        MerchantUp: null,
        inputData: {},
        ev: null
      }
    },
    computed: mapGetters(['saveSession']),
    methods: {
      importf(e) {//导入
        var vm = this;
        if (e.currentTarget.files.length > 0) {
          this.ev = e.currentTarget;
          this.loading = this.$loading({
            lock: true,
            text: '正在读取文件',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          setTimeout(function () {
            vm.inputChange();
          }, 100)
        }
      },
      inputChange(){
        var _this = this;
        var obj = this.ev;
        var vm = this;
        var wb;//读取完成的数据
        var wbData;//存储json
        var rABS = false; //是否将文件读取为二进制字符串
        if (!obj.files) {
          return false;
        }
        if (obj.files[0].name.split('.')[1] != 'xlsx') {
          vm.loading.close();
          vm.$alert('请上传格式后缀为xlsx的文件', '提示', {
            confirmButtonText: '确定'
          })
          return
        }
        var f = obj.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
          var data = e.target.result;
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(data)), {//手动转化
              type: 'base64'
            });
          } else {
            wb = XLSX.read(data, {
              type: 'binary'
            });
          }
          //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
          //wb.Sheets[Sheet名]获取第一个Sheet的数据
          wbData = JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
          _this.createTable(wbData)
        };
        if (rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }
      },
      fixdata(data) { //文件流转BinaryString
        var o = "",
          l = 0,
          w = 10240;
        for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
        return o;
      },
      createTable(data) { //在页面中生成表格
        data = JSON.parse(data);
        if (data.length > 0) {
          document.getElementsByClassName("el-table")[0].style.display = "block";
        }
        this.tableData = [];
        for (var i = 0; i < data.length; i++) {
          var table = {};
          if (data[i].医院编号) {
            table.companyId = data[i].医院编号;
          }
          if (data[i].项目类别) {
            table.itemCode = data[i].项目类别;
          }
          if (data[i].项目编码) {
            table.itemNo = data[i].项目编码;
          }
          if (data[i].项目中文名称) {
            table.itemNameCh = trim(data[i].项目中文名称);
          }
          if (data[i].项目英文名称) {
            table.itemNameEn = data[i].项目英文名称;
          }
          if (data[i].通用名) {
            table.commonNames = data[i].通用名;
          }
          if (data[i].规格) {
            table.specifications = data[i].规格;
          }
          if (data[i].剂型) {
            table.dosageForms = data[i].剂型;
          }
          if (data[i].材料类别) {
            table.materialCategory = data[i].材料类别;
          }
          if (data[i].材料分类) {
            table.materialType = data[i].材料分类;
          }
          if (data[i].医院分类代码) {
            table.hospitalTypeCode = data[i].医院分类代码;
          }
          if (data[i].单价) {
            table.unitPrice = parseInt(data[i].单价 * 100);
          }
          if (data[i].单位) {
            table.unit = trim(data[i].单位);
          }
          if (data[i].国际码) {
            table.internationalCode = data[i].国际码;
          }
          if (data[i].助记码) {
            table.mnemonicCode = data[i].助记码;
          }
          if (data[i].生效日期) {
            table.effectiveDate = transition(data[i].生效日期);
          }
          if (data[i].备注) {
            table.remark = data[i].备注;
          }
          if (data[i].社保项目编码) {
            table.socialSecurityCode = data[i].社保项目编码;
          }
          if (JSON.stringify(table) != "{}") {
            this.tableData.push(table);
          }
          this.loading.close();
        }
        console.log(this.tableData);
        function transition(str) {//处理日期的方法
          var time = str;
          var arr = time.split("/");
          var saveNum = arr[0];
          arr[0] = '20' + arr[arr.length - 1];
          arr[arr.length - 1] = saveNum;
          time = arr.join("/");
          return time
        }

        function trim(str) { //删除左右两端的空格方法
          return str.replace(/(^\s*)|(\s*$)/g, "");
        }
      },//在页面中生成表格结束
      importData(){ //处理发送出去的数据
        var _this = this;

        var num = null;//数据长度
        var shartNum = 0; //起始数据的下标
        var saveNum = null; //保存数据的总长度
        var index = 0;  //数据的倍数 分批上传
        if (_this.tableData.length < 50) { //判断数据长度是否小于50
          num = _this.tableData.length; //给数据长度赋值
          _this.importDatas() //是的话直接调用函数
        } else { //否的话执行下面判断
          saveNum = _this.tableData.length; //将数据总长度赋值
          function checkNum() { //检查数字
            num = 50 * (index + 1); //目标长度等于50*倍数+1
            shartNum = index * 50; //开始长度等于倍数
            index++; //倍数每次执行都自增
            if (num < saveNum) { //如果目标长度小于最大长度则执行发送函数并传自身函数过去形成递归函数
              _this.importDatas(checkNum);
            } else { //如果目标长度已经大于数据本身长度则将本身最大长度替换给目标长度 调用函数
              num = saveNum;
              _this.importDatas();
            }
          }
          checkNum()
        }
      },
      importDatas(cb){
        var vm = this;
        var _this = this;
        var timer = vm.tableData.length * 200 / 1000;
        if (timer > 60) {
          timer = Math.round(timer / 60);
          vm.text = vm.text = '正在上传大概需要' + timer + '分钟';
        } else {
          timer = Math.round(timer)
          vm.text = vm.text = '正在上传大概需要' + timer + '秒';
        }

        this.loadings = this.$loading({
          lock: true,
          text: vm.text,
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        setTimeout(function () {
          if (vm.tableData.length == 0) {
            vm.$alert('请先选择文件，或者您选的文件格式不对；请与下载的模板保持一致' +
              ' +', '提示', {
              confirmButtonText: '确定',
            });
            vm.loadings.close();
            return
          }
          for (let i = 0; i < _this.tableData.length; i++) {
            _this.MerchantUp = new RemoteCall();
            _this.MerchantUp.init({
              router: "/base/hospital_charging_item_detail/import",
              session: vm.saveSession,
              async: false,
              data: {
                companyId: _this.tableData[i].companyId,
                itemCode: _this.tableData[i].itemCode,
                itemNo: _this.tableData[i].itemNo,
                itemNameCh: _this.tableData[i].itemNameCh,
                itemNameEn: _this.tableData[i].itemNameEn,
                commonNames: _this.tableData[i].commonNames,
                specifications: _this.tableData[i].specifications,
                dosageForms: _this.tableData[i].dosageForms,
                materialCategory: _this.tableData[i].materialCategory,
                materialType: _this.tableData[i].materialType,
                hospitalTypeCode: _this.tableData[i].hospitalTypeCode,
                unitPrice: _this.tableData[i].unitPrice,
                unit: _this.tableData[i].unit,
                internationalCode: _this.tableData[i].internationalCode,
                mnemonicCode: _this.tableData[i].mnemonicCode,
                effectiveDate: _this.tableData[i].effectiveDate,
                remark: _this.tableData[i].remark,
                socialSecurityCode: _this.tableData[i].socialSecurityCode,
                enableFlag: 1,
                areaId: vm.inputData.areaId
              },
              callback: function (data) {
                if (data.ret.errorCode === 0) {
                  if (i == vm.tableData.length - 1) {
                    vm.loadings.close();
                    vm.$alert('上传成功', '提示', {
                      confirmButtonText: '确定',
                      callback: function () {
                        document.getElementsByClassName("el-table")[0].style.display = 'none';
                        vm.tableData = [];
                        document.getElementsByClassName("upExcel")[0].value = null;
                      }
                    });
                  }
                } else {
                  vm.loadings.close();
                  vm.$alert('上传失败', '提示', {
                    confirmButtonText: '确定',
                  })
                }
              }
            })
          }
        }, 1000)
        if (cb) {
          cb()
        }
      },
      downExcel(){
        $("#tableExcel").table2excel({
          exclude: ".noExl", //过滤位置的 css 类名
          filename: "三大目录模板" + new Date().getTime() + ".xls", //文件名称
          name: "Excel Document Name.xlsx",
          exclude_img: true,
          exclude_links: true,
          exclude_inputs: true
        });
      }
    },
    mounted: function () {
    }
  }
</script>
<style lang="scss" scoped>
  #UploadDir {
    margin: 15px;
    padding: 20px;
    background: #fff;
  }

  .el-row {
    margin-top: 20px;
    input {
      width: 100%;
      height: 32px;
      border: 1px solid #aaa;
      border-radius: 4px;
      text-indent: 1em;
    }
    .el-button {
      border: 0;
      width: 100%;
      color: #fff;
      background: #32BC6F;
    }
    .downExcel {
      display: block;
      width: 100%;
      height: 32px;
      line-height: 32px;
      text-decoration: none;
      color: #fff;
      background: #32BC6F;
      text-align: center;
      border-radius: 4px;
      font-size: 14px;
    }
  }
  label {
    display: block;
    text-align: right;
    height: 36px;
    line-height: 36px;
  }

  .el-col-3 {
    min-width: 11em;
  }
  @media screen and (max-width: 1450px) {
    .el-col-3 {
      width: 17.5%;
    }
    .el-col-offset-3 {
      margin-left: 17.5%;
    }
  }

  .upExcelBox {
    position: relative;
    .upExcel {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      position: absolute;
      cursor: pointer;
    }
  }

  .el-table {
    margin-top: 50px;
    display: none;
    max-height: 1000px;
  }
</style>
<style type="text/css" lang="scss">
  #UploadDir {
    .distpicker select {
      width: 32% !important;
      height: 36px;
      line-height: 36px;
      padding: 0.25rem;
      outline: none;
      border: 1px solid #aaa;
      border-radius: 3px
    }
  }


  @media screen and (max-width: 1450px) {
    #UploadDir {
      .distpicker select {
        width: 31% !important;
      }
    }
  }
</style>

