<template>
  <div id="RightPage">
    <div class="menu" @click="menuToggl">
      <i :class="[menu?'el-icon-arrow-left':'el-icon-arrow-right']" id="iconLeft"></i>
    </div>
    <NavBar></NavBar>
    <router-view></router-view>
  </div>
</template>
<script type="text/javascript">
  import NavBar from './NavBar.vue'
  import {mapState, mapActions} from 'vuex'
  export default{
    data(){
      return {
        bodyWidth: document.body.clientWidth
      }
    },
    components: {
      NavBar,

    },
    computed: {
      ...mapState([
        'menu',
      ]),

    },
    methods: {
      ...mapActions(['changeMenu']),
      menuToggl(){
        this.changeMenu(!this.menu)
      },
      getWindowWidth(){
        var _this = this;
        window.onresize = () => {
          _this.bodyWidth = document.body.clientWidth;
          if (_this.bodyWidth <= 1200) {
            this.changeMenu(false)
          } else {
            this.changeMenu(true)
          }
        }
      }
    },
    mounted(){
      this.getWindowWidth()
      var clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
      }
      else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
      }
      document.getElementById('RightPage').style.minHeight = (clientHeight - 10) + 'px';
    }
  }
</script>
<style type="text/scss" scopted>
  #RightPage {
    position: relative;
    background: #F0F2F5;
  }

  #iconLeft {
    color: #b0b0b0;
    line-height: 26px;
    cursor: pointer;
    text-align: center;
  }

  .menu {
    position: absolute;
    width: 26px;
    height: 26px;
    left: 6px;
    border: 1px solid #e0e0e0;
    top: 0px;
    background: #fff;
    border-radius: 50px;
    z-index: 2000;
    text-align: center;
  }

  .menu .el-icon-arrow-right {
    background: #49df8b;
    width: 100%;
    color: #fff !important;
    border-radius: 50px;
  }
</style>
<style lang="scss">
  #RightPage {
    .el-table__empty-text {
      color: #fb695b;
    }
  }

</style>

