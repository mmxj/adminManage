<template>
  <div id="TerminalAudit">
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
        size="mini"
        style="width:100%"
        :row-key="getRowKeys"
        :expand-row-keys="expands"
      >
        <el-table-column align="center" label="归属商户" prop="mercial" min-width="100"></el-table-column>
        <el-table-column align="center" label="商户编号" prop="number" min-width="100"></el-table-column>
        <el-table-column align="center" label="终端编号" prop="termainalNumber" min-width="100"></el-table-column>
        <el-table-column align="center" label="终端密钥索引" prop="index" min-width="130"></el-table-column>
        <el-table-column align="center" label="PSAM卡号" prop="psam" min-width="120"></el-table-column>
        <el-table-column align="center" label="安装地址" prop="address" min-width="100"
                         show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="收单机构" prop="acquirer" min-width="100"></el-table-column>
        <el-table-column align="center" label="详情" min-width="100">
          <template slot-scope="props">
            <span class="button" @click="show(props.$index)">{{props.$index == expands[0] ? '收起' : '展开'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" min-width="100">
          <template slot-scope="props">
            <span class="button" @click="outerVisible = true">审核</span>
          </template>
        </el-table-column>
        <el-table-column type="expand" max-width="0%">
          <template slot-scope="props">
            <el-form label-position="left" :inline="true" class="demo-table-expand">
              <el-form-item label="维护公司" label-width="100px">
                <span>{{props.row.maintain}}</span>
              </el-form-item>
              <el-form-item label="终端经纬度" label-width="100px">
                <span>{{props.row.position}}</span>
              </el-form-item>
              <el-form-item label="代理申请主体" label-width="100px">
                <span>{{props.row.agency}}</span>
              </el-form-item>
              <el-form-item label="开通日期" label-width="100px">
                <span>{{props.row.createDate}}</span>
              </el-form-item>
              <el-form-item label="商户主营业务" label-width="100px">
                <span>{{props.row.business}}</span>
              </el-form-item>
              <el-form-item label="终端型号" label-width="100px">
                <span>{{props.row.model}}</span>
              </el-form-item>
              <el-form-item label="终端厂家" label-width="100px">
                <span>{{props.row.manufacturers}}</span>
              </el-form-item>
              <el-form-item label="终端状态" label-width="100px">
                <span>{{props.row.status}}</span>
              </el-form-item>
              <el-form-item label="详细安装地址" label-width="100px" style="width:100%">
                <span>{{props.row.address}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--弹窗-->
    <!--终端信息弹窗-->
    <div class="terminalMessage">
      <el-dialog title="终端审核" :visible.sync="outerVisible">
        <el-form :model="formData" inline>
          <el-form-item label="归属商户" :label-width="formLabelWidth">
            <el-input readonly size="small" v-model="formData.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="PSAM卡号" :label-width="formLabelWidth">
            <el-input readonly size="small" v-model="formData.psam" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="安装地址" :label-width="formLabelWidth">
            <el-input readonly size="small" v-model="formData.address" auto-complete="off"
                      class="address-input"></el-input>
          </el-form-item>
          <el-form-item label="维护公司" :label-width="formLabelWidth">
            <el-input readonly size="small" v-model="formData.maintain" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="收单机构" :label-width="formLabelWidth">
            <el-input readonly size="small" v-model="formData.acquirer" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="代理申请主体" :label-width="formLabelWidth">
            <el-input readonly size="small" v-model="formData.agency" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="归属地区" :label-width="formLabelWidth">
            <el-input readonly size="small" v-model="formData.affiliation" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="开通日期" :label-width="formLabelWidth">
            <el-input readonly size="small" v-model="formData.createDate" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="商户编码" :label-width="formLabelWidth">
            <el-input readonly size="small" v-model="formData.commercialCode" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="申请日期" :label-width="formLabelWidth">
            <el-input readonly size="small" v-model="formData.applicationDate" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="终端编号" :label-width="formLabelWidth">
            <el-input readonly size="small" v-model="formData.TerminalCode" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="商户主营业务" :label-width="formLabelWidth">
            <el-input readonly size="small" v-model="formData.business" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="终端密钥索引" :label-width="formLabelWidth">
            <el-input readonly size="small" v-model="formData.secretKey" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="终端厂家" :label-width="formLabelWidth">
            <el-input readonly size="small" v-model="formData.manufacturers" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="终端型号" :label-width="formLabelWidth">
            <el-input readonly size="small" v-model="formData.model" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="deal">
          <span class="radio-title"><i>*</i>审核结果:</span>
          <el-radio v-model="radio" label="1">审核通过</el-radio>
          <el-radio v-model="radio" label="2">审核不通过</el-radio>
          <div>
            <span style="vertical-align: top;margin-top:20px;display:inline-block">备注：</span>
            <el-input type="textarea"
                      :autosize="{ minRows: 4}"
                      placeholder="请输入内容"
                      v-model="textarea"
                      resize="none"
                      style="width: 650px;margin-top:10px"
            ></el-input>
          </div>
        </div>
        <div slot="footer" class="dialog-footer" center>
          <el-button @click="outerVisible = false">关闭</el-button>
          <el-button @click="outerVisible = false">确定</el-button>
        </div>
      </el-dialog>
    </div>
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
        form: {},
        currentPage: 1,
        textarea: null,
        formData: {},
        radio: null,
        outerVisible: false,
        formLabelWidth: '100px',
        tableData: [
          {
            id: 1,
            mercial: 1111,
            number: 1111,
            termainalNumber: 11111,
            index: 0,
            psam: 1111,
            address: '11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
            acquirer: 11111,
            maintain: 11111,
            position: 111111,
            agency: 111111,
            createDate: 11111,
            business: 111111,
            model: 11111,
            manufacturers: 111111,
            status: 11111
          },
          {
            id: 2,
            mercial: 1111,
            number: 1111,
            termainalNumber: 11111,
            index: 1,
            psam: 1111,
            address: 1111,
            acquirer: 11111,
            maintain: 11111,
            position: 111111,
            agency: 111111,
            createDate: 11111,
            business: 111111,
            model: 11111,
            manufacturers: 111111,
            status: 11111
          },
          {
            id: 3,
            mercial: 1111,
            number: 1111,
            termainalNumber: 11111,
            index: 2,
            psam: 1111,
            address: 1111,
            acquirer: 11111,
            maintain: 11111,
            position: 111111,
            agency: 111111,
            createDate: 11111,
            business: 111111,
            model: 11111,
            manufacturers: 111111,
            status: 11111
          },
          {
            id: 4,
            mercial: 1111,
            number: 1111,
            termainalNumber: 11111,
            index: 3,
            psam: 1111,
            address: 1111,
            acquirer: 11111,
            maintain: 11111,
            position: 111111,
            agency: 111111,
            createDate: 11111,
            business: 111111,
            model: 11111,
            manufacturers: 111111,
            status: 11111
          },
          {
            id: 5,
            mercial: 1111,
            number: 1111,
            termainalNumber: 11111,
            index: 4,
            psam: 1111,
            address: 1111,
            acquirer: 11111,
            maintain: 11111,
            position: 111111,
            agency: 111111,
            createDate: 11111,
            business: 111111,
            model: 11111,
            manufacturers: 111111,
            status: 11111
          },
          {
            id: 6,
            mercial: 1111,
            number: 1111,
            termainalNumber: 11111,
            index: 5,
            psam: 1111,
            address: 1111,
            acquirer: 11111,
            maintain: 11111,
            position: 111111,
            agency: 111111,
            createDate: 11111,
            business: 111111,
            model: 11111,
            manufacturers: 111111,
            status: 11111
          },
          {
            id: 7,
            mercial: 1111,
            number: 1111,
            termainalNumber: 11111,
            index: 6,
            psam: 1111,
            address: 1111,
            acquirer: 11111,
            maintain: 11111,
            position: 111111,
            agency: 111111,
            createDate: 11111,
            business: 111111,
            model: 11111,
            manufacturers: 111111,
            status: 11111
          },
          {
            id: 8,
            mercial: 1111,
            number: 1111,
            termainalNumber: 11111,
            index: 7,
            psam: 1111,
            address: 1111,
            acquirer: 11111,
            maintain: 11111,
            position: 111111,
            agency: 111111,
            createDate: 11111,
            business: 111111,
            model: 11111,
            manufacturers: 111111,
            status: 11111
          }, {
            id: 9,
            mercial: 1111,
            number: 1111,
            termainalNumber: 11111,
            index: 8,
            psam: 1111,
            address: 1111,
            acquirer: 11111,
            maintain: 11111,
            position: 111111,
            agency: 111111,
            createDate: 11111,
            business: 111111,
            model: 11111,
            manufacturers: 111111,
            status: 11111
          },
          {
            id: 10,
            mercial: 1111,
            number: 1111,
            termainalNumber: 11111,
            index: 9,
            psam: 1111,
            address: 1111,
            acquirer: 11111,
            maintain: 11111,
            position: 111111,
            agency: 111111,
            createDate: 11111,
            business: 111111,
            model: 11111,
            manufacturers: 111111,
            status: 11111
          },
        ],
        getRowKeys(row) {
          return row.index
        },
        expands: []
      }
    },
    methods: {
      handleCurrentChange(val){
        console.log(`当前页: ${val}`);
      },
      show(data){

        if (this.expands[0] !== data) {
          this.expands = [];
          this.expands.push(data);
        } else {
          this.expands = [];
        }

      }
    },
    mounted: function () {
    }
  }
</script>
<style scoped>
  #TerminalAudit {
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
    width: 100px;
  }

  .button-wrap {
    width: 90px;
    text-align: right;
  }

  .el-input {
    width: 200px;
  }

  .form-wrap {
    border-bottom: 1px solid #e8e8e8;
  }

  @media screen and (max-width: 1600px) {
    /*.el-input{*/
    /*width:240px;*/
    /*}*/
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 43%;
  }

  .table-wrap {
    margin: 20px 0;
    padding: 0 32px;
  }

  .el-pagination {
    float: right;
    margin-right: 30px;
    font-weight: normal;
  }

  .demo-table-expand {
    text-align: left;
    padding: 10px 80px;
  }

  .apply {
    padding: 20px 32px 0 32px;
  }

  .apply-button {
    padding: 10px 25px;
  }

  .button {
    color: #1890ff;
    padding: 0 10px;
    cursor: pointer;
  }

  .terminalMessage .el-dialog--small {
    width: 826px;
    border-radius: 5px;
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

  .radio-title i {
    color: red;
    padding: 4px;
    vertical-align: middle;
    position: relative;
    top: 2px;
  }
</style>
<style>
  .el-dialog__footer {
    padding-left: 0;
    padding-right: 0;
  }

  .terminalMessage .el-dialog__title {
    font-weight: normal;
    font-size: 16px;
  }

  #TerminalAudit .el-dialog__body {
    margin-top: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-top: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
  }

  #TerminalAudit .dialog-footer .el-button {
    width: 100px;
  }

  #TerminalAudit .dialog-footer {
    text-align: center;
  }

  #TerminalAudit .terminalMessage .el-form-item {
    margin-right: 70px;
    margin-bottom: 10px;
  }

  .el-table th {
    padding: 6px 0 !important;
  }

  .el-table td {
    padding: 2px 0 !important;
  }

  .el-table__expand-column .cell {
    width: 0;
    marign: 0;
    padding: 0;
    display: none;
  }

  .el-table__expand-column {
    width: 0 !important;
    marign: 0;
    padding: 0;
  }

  .terminalMessage .el-dialog--small {
    width: 826px;
    border-radius: 5px;
  }
</style>
