<template>
  <div id="Faq">
    <!--新增按钮-->
    <div class="addNews">
      <el-button type="primary" @click="$router.push('/faqadd')"><i class="el-icon-plus"></i>新增</el-button>
    </div>
    <!--表格-->
    <div class="table-warp">
      <el-table
        :data="tableData"
        size="mini"
        style="width:100%"
      >
        <el-table-column header-align="center" align="left" label="标题" prop="title" min-width="100"></el-table-column>
        <el-table-column header-align="center" align="left" label="内容" prop="content" min-width="100"></el-table-column>
        <el-table-column header-align="center" align="center" label="排序" prop="index" min-width="100"></el-table-column>
        <el-table-column header-align="center" align="center" label="操作" prop="" min-width="160">
          <template slot-scope="scope">
            <span class="button" @click="$router.push({name:'AppFaqUpdate',params:{data:scope.row}})">修改</span>
            <span class="button" @click="deleteFaq(scope.row.id)">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="pagination clearfix">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        tableData: [],
        currentPage: 1,//初始化分页
        total: 20,
        pageNum: 1,
        session: sessionStorage.getItem('session'),
      }
    },
    methods: {
      handleCurrentChange(val){//页面跳转事件
        this.pageNum = val;
        this.getFaq();
      },
      getFaq(){//查询获取faq数据
        var vm = this;
        var getFAQ = new RemoteCall();
        getFAQ.init({
          router: '/ips/faq/get',
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
                vm.$set(vm.tableData, i, item)
              })
            }
          }
        })
      },
      deleteFaq(itemId){
        var vm = this;
        this.$confirm('此操作将永久删除该文件，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          var deleteFAQ = new RemoteCall();
          deleteFAQ.init({
            router: '/ips/faq/delete',
            session: vm.session,
            data: {
              id: itemId
            },
            callback: function () {

            }
          })
        })
      }
    },
    mounted: function () {
      this.getFaq();
    }
  }
</script>
<style lang="scss">
  #Faq {
    background: #fff;
    margin: 20px;
    padding: 24px 0;
    .addNews {
      padding: 0 32px;
      .el-icon-plus {
        font-size: 12px;
        margin-right: 23px;
        line-height: 14px;
        vertical-align: center;
      }
      .el-button {
        vertical-align: center;
        padding-right: 35px;
        padding-left: 15px;
        background: #1890ff;
      }
    }
    .table-warp {
      padding: 0 32px;
      margin-top: 20px;
      .button {
        color: #1890ff;
        padding: 0 5px;
        cursor: pointer;
        text-decoration: underline;
      }
    }
    .el-pagination {
      float: right;
      margin-right: 30px;
      font-weight: normal;
      margin-top: 10px;
    }
  }
</style>
