<template>
  <div id="TerminalMessage">
    <div class="form-wrap">
      <el-form :inline="true">
        <el-form-item label="商户名称" label-width="100px">
          <el-input v-model="form.merchantName" placeholder="请输入商户名称"></el-input>
          <!--<GetCompany :data="company" :holder="'请输入商户名称'"></GetCompany>-->
        </el-form-item>
        <el-form-item label="终端号" label-width="100px">
          <el-input v-model="form.terminalNo" placeholder="请输入终端编号"></el-input>
        </el-form-item>
        <el-form-item label="安装地址" label-width="100px">
          <el-input v-model="form.address" placeholder="请输入安装地址"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="button-wrap">
            <el-button @click="sreach">查询</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <!--<div class="apply">-->
    <!--<el-button class="apply-button" @click="goRoute">终端申请</el-button>-->
    <!--</div>-->
    <div class="table-wrap">
      <el-table
        :data="tableData"
        size="mini"
        style="width:100%"
        :row-key="getRowKeys"
        :expand-row-keys="expands"
      >
        <el-table-column align="center" label="归属商户" prop="companyName" min-width="100"></el-table-column>
        <el-table-column align="center" label="商户号" prop="merchantNo" min-width="100"></el-table-column>
        <el-table-column align="center" label="终端编号" prop="terminalNo" min-width="100"></el-table-column>
        <el-table-column align="center" label="终端密钥索引" prop="mainKeyId" min-width="130"></el-table-column>
        <el-table-column align="center" label="PSAM卡号" prop="pSimNo" min-width="120"></el-table-column>
        <el-table-column align="center" label="安装地址" prop="address" min-width="100"
                         show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="收单机构" prop="acquirerName" min-width="100"></el-table-column>
        <el-table-column align="center" label="详情" min-width="100">
          <template slot-scope="props">
            <span class="button" @click="show(props.$index)">{{props.$index == expands[0] ? '收起' : '展开'}}</span>
          </template>
        </el-table-column>
        <el-table-column type="expand" max-width="0%">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="维护公司" label-width="100px">
                <span>{{props.row.maintainCompany}}</span>
              </el-form-item>
              <el-form-item label="终端经纬度" label-width="100px">
                <span>{{props.row.position}}</span>
              </el-form-item>
              <el-form-item label="代理申请主体" label-width="100px">
                <span>{{props.row.agency}}</span>
              </el-form-item>
              <el-form-item label="开通日期" label-width="100px">
                <span>{{props.row.sfsCreate}}</span>
              </el-form-item>
              <el-form-item label="终端型号" label-width="100px">
                <span>{{props.row.model}}</span>
              </el-form-item>
              <el-form-item label="终端厂家" label-width="100px">
                <span>{{props.row.terminalCompany}}</span>
              </el-form-item>
              <el-form-item label="终端状态" label-width="100px">
                <span>{{props.row.enableFlag}}</span>
              </el-form-item>
              <el-form-item label="详细安装地址" label-width="100px" style="width:100%">
                <span>{{props.row.address}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
  import unit from '@/unit/unit.js';
  import GetCompany from '@/common/GetCompany';
  export default{
    components: {
      GetCompany
    },
    data(){
      return {
        form: {},
        company: {},
        currentPage: 1,
        tableData: [],
        session: sessionStorage.getItem('session'),
        getRowKeys(row) {
          return row.index
        },
        expands: [],
        total: 0,//总条数
        pageNum: 1,//单前页码
      }
    },
    methods: {
      handleCurrentChange(val){
        this.pageNum = val;
        this.getTerminal()
      },
      show(data){

        if (this.expands[0] !== data) {
          this.expands = [];
          this.expands.push(data);
        } else {
          this.expands = [];
        }
      },
      goRoute(){
        this.$router.push('/terminaladd')
      },
      getTerminal(){ //获取终端信息
        var vm = this;
        vm.tableData = [];
        var getterminal = new RemoteCall();
        getterminal.init({
          router: '/base/terminal/get',
          session: vm.session,
          data: {
            pageInfo: {
              pageSize: 10,
              pageNum: vm.pageNum
            }
          },
          callback: function (data) {
            if (data.ret.errorCode === 0) {
              if (data.pageInfo.total) {
                if (data.pageInfo.total > 0) {
                  vm.total = data.pageInfo.total
                }
              } else if (data.pageInfo.total === 0) {
                vm.total = 0
              }
              ;
              vm.tableData = [];
              data.rows.forEach(function (item, i) {
                item.index = i
                item.enableFlag = unit.enableFlag(item.enableFlag);
                vm.$set(vm.tableData, i, item)
              })
            }
          }
        })
      },//获取终端信息
      sreach(){//根据条件查询终端信息 缺少地址查询的功能
//        this.form.companyId=this.company.id;
        var vm = this;
        this.form.pageInfo = {
          pageSize: 10,
          pageNum: vm.pageNum
        };
        unit.removeEmptyString(this.form);

        var searchCompany = new RemoteCall();
        searchCompany.init({
          router: '/base/terminal/get',
          session: vm.session,
          data: vm.form,
          callback: function (data) {
            if (data.pageInfo.total) {
              if (data.pageInfo.total > 0) {
                vm.total = data.pageInfo.total
              }
            } else if (data.pageInfo.total === 0) {
              vm.total = 0
            }
            vm.tableData = [];
            data.rows.forEach(function (item, i) {
              item.index = i;
              item.enableFlag = unit.enableFlag(item.enableFlag);
              vm.$set(vm.tableData, i, item)
            })
          }
        })
      },//根据条件查询
    },
    mounted: function () {
      this.getTerminal();
    }
  }
</script>
<style scoped>
  #TerminalMessage {
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

  .el-button {
    width: 100px;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
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

  .button {
    color: #1890ff;
    padding: 0 10px;
    cursor: pointer;
    text-decoration: underline;
  }
</style>
<style>
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
</style>
