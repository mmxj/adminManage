<template>
  <div id="Carousel">
    <div class="search">
      <el-form
        :inline="true"
        :model="formSearch"
        class="form-search"
      >
        <el-form-item>
          <el-input size="small" v-model="formSearch.title" placeholder="请输入标题信息"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--新增按钮-->
    <div class="addNews">
      <el-button type="primary"><i class="el-icon-plus"></i>新增</el-button>
    </div>
    <!--表格-->
    <div class="table-warp">
      <el-table
        :data="tableData"
        size="mini"
        style="width:100%"
      >
        <el-table-column align="center" label="标题" prop="title" min-width="100"></el-table-column>
        <el-table-column align="center" label="图片" prop="pictrue" min-width="100"></el-table-column>
        <el-table-column align="center" label="排序" prop="index" min-width="100"></el-table-column>
        <el-table-column align="center" label="链接" prop="src" min-width="100"></el-table-column>
        <el-table-column align="center" label="状态" prop="status" min-width="100"></el-table-column>
        <el-table-column align="center" label="发布区域" prop="" min-width="100"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        formSearch: {},
        tableData: {}
      }
    }
  }
</script>
<style lang="scss">
  #Carousel {
    background: #fff;
    margin: 20px;
    padding: 24px 0;
    .form-search {
      text-align: center;
      border-bottom: 1px solid #e8e8e8;
      .el-input {
        width: 280px;
      }
      .el-button {
        width: 100px;
      }
    }
    .addNews {
      padding: 20px 32px;
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
  }
</style>
