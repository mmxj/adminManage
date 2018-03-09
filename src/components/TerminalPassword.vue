<template>
  <div id="TerminalPassword">
    <div class="form-wrap">
      <el-form :inline="true">
        <el-form-item label="终端密匙索引" label-width="100px">
          <el-input id="searchInput" class="searchInput" v-model="form.index" placeholder="输入终端密匙索引"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button>查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-wrap">
      <el-table
        :data="tableData"
        stripe
        row-class-name="table-column"
        align="center"
        style="width: 100%;">
        <el-table-column
          align="center"
          prop="index"
          label="终端密匙索引"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="password"
          label="明文主密匙"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="status"
          label="状态"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="创建时间"
        >
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
  export default {
    data(){
      return {
        form: {
          index: null
        },
        currentPage: 1,
        tableData: [
          {
            index: 1,
            password: 123456,
            status: 0,
            createTime: "2018.3.5"
          }, {
            index: 1,
            password: 123456,
            status: 0,
            createTime: "2018.3.5"
          }, {
            index: 1,
            password: 123456,
            status: 0,
            createTime: "2018.3.5"
          }, {
            index: 1,
            password: 123456,
            status: 0,
            createTime: "2018.3.5"
          }, {
            index: 1,
            password: 123456,
            status: 0,
            createTime: "2018.3.5"
          }, {
            index: 1,
            password: 123456,
            status: 0,
            createTime: "2018.3.5"
          }, {
            index: 1,
            password: 123456,
            status: 0,
            createTime: "2018.3.5"
          }, {
            index: 1,
            password: 123456,
            status: 0,
            createTime: "2018.3.5"
          }, {
            index: 1,
            password: 123456,
            status: 0,
            createTime: "2018.3.5"
          },
        ]
      }
    },
    methods: {
      handleCurrentChange(val){
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>
<style lang="scss" scoped>
  #TerminalPassword {
    background: #fff;
    padding: 20px 0;
    margin: 20px 24px;
  }

  .el-pagination {
    float: right;
    margin-right: 30px;
    font-weight: normal;
  }
  .el-form {
    font-size: 14px;
    color: #262626;

  }

  .searchInput {
    height: 30px;
    width: 280px;
  }

  .el-button {
    background: #32BC6F;
    color: #fff;
    height: 30px;
    line-height: 0px;
    marign-top: 3px;
  }

  .el-input input {
    height: 30px !important;
    padding: 0;
  }

  .form-wrap {
    border-bottom: 1px solid #e8e8e8;
    padding: 0 32px;
  }

  .table-wrap {
    margin: 20px 0;
    padding: 0 32px;
  }

  .el-table {
    text-align: center;
  }

  .pagination {

  }

  .el-pagination {
    float: right;
    margin-right: 30px;
    font-weight: normal;
  }
</style>

