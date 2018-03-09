<template>
  <div id="TerminalError">
    <div class="form-wrap">
      <el-form :inline="true">
        <el-form-item label="商户名称" label-width="100px">
          <el-input v-model="form.name" placeholder="请输入商户名称"></el-input>
        </el-form-item>
        <el-form-item label="终端编号" label-width="100px">
          <el-input v-model="form.number" placeholder="请输入终端编号"></el-input>
        </el-form-item>
        <el-form-item label="安装地址" label-width="100px">
          <el-input v-model="form.address" placeholder="请输入安装地址"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="button-wrap">
            <el-button>查询</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-wrap">
      <el-table
        :data="tableData"
        stripe
        align="center"
        style="width: 100%;">
        <el-table-column
          align="center"
          prop="incident"
          label="异常预警时间"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="number"
          label="终端编号"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="psam"
          label="PSAM卡号"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="status"
          label="终端状态"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="explainCode"
          label="异常代码号"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="explain"
          label="异常情况说明"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
        >
          <template slot-scope="scope">
            <span class="button" @click="handleClick(scope.row,1)">查看</span>
            <span class="button" type="text" @click="handleClick(scope.row,2)">异常处理</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--终端信息弹窗-->
    <div class="terminalMessage">
      <el-dialog :title="dialogType==1?'终端信息':'终端异常管理'" :visible.sync="outerVisible">
        <el-form :model="formData" inline>
          <el-form-item label="归属商户" :label-width="formLabelWidth">
            <el-input :readonly="dialogType==1" size="small" v-model="formData.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="PSAM卡号" :label-width="formLabelWidth">
            <el-input :readonly="dialogType==1" size="small" v-model="formData.psam" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="安装地址" :label-width="formLabelWidth">
            <el-input :readonly="dialogType==1" size="small" v-model="formData.address" auto-complete="off"
                      class="address-input"></el-input>
          </el-form-item>
          <el-form-item label="维护公司" :label-width="formLabelWidth">
            <el-input :readonly="dialogType==1" size="small" v-model="formData.maintain" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="收单机构" :label-width="formLabelWidth">
            <el-input :readonly="dialogType==1" size="small" v-model="formData.acquirer" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="代理申请主体" :label-width="formLabelWidth">
            <el-input :readonly="dialogType==1" size="small" v-model="formData.agency" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="归属地区" :label-width="formLabelWidth">
            <el-input :readonly="dialogType==1" size="small" v-model="formData.affiliation"
                      auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="开通日期" :label-width="formLabelWidth">
            <el-input :readonly="dialogType==1" size="small" v-model="formData.createDate"
                      auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="商户编码" :label-width="formLabelWidth">
            <el-input :readonly="dialogType==1" size="small" v-model="formData.commercialCode"
                      auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="申请日期" :label-width="formLabelWidth">
            <el-input :readonly="dialogType==1" size="small" v-model="formData.applicationDate"
                      auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="终端编号" :label-width="formLabelWidth">
            <el-input :readonly="dialogType==1" size="small" v-model="formData.TerminalCode"
                      auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="商户主营业务" :label-width="formLabelWidth">
            <el-input :readonly="dialogType==1" size="small" v-model="formData.business" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="终端密钥索引" :label-width="formLabelWidth">
            <el-input :readonly="dialogType==1" size="small" v-model="formData.secretKey"
                      auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="终端厂家" :label-width="formLabelWidth">
            <el-input :readonly="dialogType==1" size="small" v-model="formData.manufacturers"
                      auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="终端型号" :label-width="formLabelWidth">
            <el-input :readonly="dialogType==1" size="small" v-model="formData.model" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" v-if="dialogType==2" class="deal">
          <span class="radio-title">交易状态:</span>
          <el-radio v-model="radio" label="1">禁止交易</el-radio>
          <el-radio v-model="radio" label="2">开发交易</el-radio>
        </div>
        <div slot="footer" class="dialog-footer" center>
          <el-button v-if="dialogType==1" @click="outerVisible = false">关闭</el-button>
          <el-button v-if="dialogType==2" @click="outerVisible = false">关闭</el-button>
          <el-button v-if="dialogType==2" @click="outerVisible = false">确定</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="内层 Dialog"
        :visible.sync="innerVisible"
        append-to-body
        class="innerdialog"
      >
      </el-dialog>
    </div>
    <!--终端信息弹窗end-->

    <!--分页-->
    <div class="pagination clearfix">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="100">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        outerVisible: false,
        innerVisible: false,
        currentPage: 1,
        formLabelWidth: '120px',
        radio: '1',
        form: {},
        dialogType: 1,//定义弹窗的类型1为查看 2为异常处理
        formData: {
          name: '中国移动',
          psam: '1008610086',
          address: '中国北京天安门广场东南天格北门自莫西门店'
        },
        tableData: [
          {
            id: 1,
            incident: 12131,
            number: 1214,
            psam: 123456,
            status: 1,
            explain: 10,
          },
          {
            id: 1,
            incident: 12131,
            number: 1214,
            psam: 123456,
            status: 1,
            explain: 10,
          },
          {
            id: 1,
            incident: 12131,
            number: 1214,
            psam: 123456,
            status: 1,
            explain: 10,
          },
          {
            id: 1,
            incident: 12131,
            number: 1214,
            psam: 123456,
            status: 1,
            explain: 10,
          },
          {
            id: 1,
            incident: 12131,
            number: 1214,
            psam: 123456,
            status: 1,
            explain: 10,
          },
          {
            id: 1,
            incident: 12131,
            number: 1214,
            psam: 123456,
            status: 1,
            explain: 10,
          },
          {
            id: 1,
            incident: 12131,
            number: 1214,
            psam: 123456,
            status: 1,
            explain: 10,
          },
          {
            id: 1,
            incident: 12131,
            number: 1214,
            psam: 123456,
            status: 1,
            explain: 10,
          },
          {
            id: 1,
            incident: 12131,
            number: 1214,
            psam: 123456,
            status: 1,
            explain: 10,
          },
          {
            id: 1,
            incident: 12131,
            number: 1214,
            psam: 123456,
            status: 1,
            explain: 10,
          },
        ]
      }
    },
    methods: {
      handleClick(row, dialogType){
        console.log(dialogType)
        this.dialogType = dialogType;
        this.outerVisible = true
      },
      handleCurrentChange(val){
        console.log('当前页' + val)
      }
    }
  }
</script>
<style scoped>
  #TerminalError {
    background: #fff;
    padding: 20px 0;
    margin: 20px 24px;
  }

  .el-button {
    background: #32BC6F;
    color: #fff;
    height: 30px;
    line-height: 0px;
    marign-top: 3px;
  }

  .el-input {
    width: 200px;
  }

  .button-wrap {
    width: 90px;
    text-align: right;
  }

  .table-wrap {
    margin: 20px 0;
    padding: 0 32px;
  }

  .button {
    color: #1890ff;
    padding: 0 10px;
    cursor: pointer;
  }

  .deal {
    text-align: center;
    padding-bottom: 10px;
    margin-bottom: 10px;
    font-size: 14px;
    border-bottom: 1px solid #e8e8e8;
  }

  .radio-title {
    padding-right: 20px;
  }

  .el-pagination {
    float: right;
    margin-right: 30px;
    font-weight: normal;
  }

  .el-button {
    width: 100px;
  }
</style>
<style>
  .innerdialog .el-dialog--small {
    width: 30%;
  }

  .terminalMessage .el-dialog--small {
    width: 826px;
    border-radius: 5px;
  }

  .el-dialog__footer {
    padding-left: 0;
    padding-right: 0;
  }

  .terminalMessage .el-dialog__title {
    font-weight: normal;
    font-size: 16px;
  }

  #TerminalError .el-form-item {
    margin-right: 50px;
    margin-bottom: 10px;
  }

  #TerminalError .address-input {
    width: 574px;
  }

  #TerminalError .el-dialog__body {
    margin-top: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-top: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
  }

  #TerminalError .dialog-footer {
    text-align: center;
  }

  #TerminalError .dialog-footer .el-button {
    width: 100px;
  }

  #TerminalError .el-radio__inner {
    width: 14px;
    height: 14px;
    margin-left: 10px;
  }
</style>
