<template>
  <div id="Provice">
    <el-select :disabled="disabled" size="small" v-model="propdata.provinceId" @change="provinceChange"
               @clear="clearData('province')"
               clearable placeholder="请选择">
      <el-option v-for="item in data.provinceData" :key="item.value" :label="item.label"
                 :value="item.value"></el-option>
    </el-select>
    <el-select :disabled="disabled" size="small" v-model="propdata.cityId" @change="cityChange"
               @clear="clearData('city')" clearable
               placeholder="请选择">
      <el-option v-for="item in data.cityData" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-select :disabled="disabled" size="small" v-model="propdata.areaId" @clear="clearData('area')" clearable
               placeholder="请选择">
      <el-option v-for="item in data.areaData" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        session: sessionStorage.getItem('session'),
        data: {
          provinceData: [],
          cityData: [],
          areaData: [],
          start: null,
        },
      }
    },
    props: ['propdata', 'startArea', 'disabled'],//propdata数据对象 startarea 初始地区id disabled是否禁用
    methods: {
      getProvince(){
        var vm = this;
        var getProvince = new RemoteCall();
        getProvince.init({
          router: '/base/area/get',
          session: this.session,
          data: {
            parentAreaId: 0
          },
          callback: function (data) {
            if (data.ret.errorCode === 0) {
              data.rows.forEach(function (item, i) {
                var option = {}
                option.key = item.id;
                option.label = item.name;
                option.value = item.id;
                //                vm.data.provinceData[i]=option;
                vm.$set(vm.data.provinceData, i, option);
              })
            }
          }
        })
      },
      getStartId(id, fn){
        var getStartProvince = new RemoteCall();
        getStartProvince.init({
          router: '/base/area/get',
          session: this.session,
          data: {
            id: id
          },
          callback: fn,
        })
      },
      clearData(data){
        this.propdata[data] = null;
      },
      provinceChange(){//省选项发生改变时
        var vm = this;
        vm.data.cityData = [];
        vm.$set(this.propdata, 'cityId', null);
        vm.$set(this.propdata, 'areaId', null);
        if (this.propdata.provinceId != '' && this.propdata.provinceId != null && this.propdata.provinceId != 'undefined') {
          var getProvince = new RemoteCall();
          getProvince.init({
            router: '/base/area/get',
            session: this.session,
            data: {
              parentAreaId: this.propdata.provinceId
            },
            callback: function (data) {
              if (data.ret.errorCode === 0) {
                data.rows.forEach(function (item, i) {
                  var option = {}
                  option.key = item.id;
                  option.label = item.name;
                  option.value = item.id;
//                vm.data.provinceData[i]=option;
                  vm.$set(vm.data.cityData, i, option)
                })
              }
            }
          })
        }
      },
      cityChange(){//城市选项发生改变时
        var vm = this;
        vm.data.areaData = [];
        vm.$set(this.propdata, 'areaId', null);
        if (this.propdata.cityId != '' && this.propdata.cityId != null && this.propdata.cityId != 'undefined') {
          var getProvince = new RemoteCall();
          getProvince.init({
            router: '/base/area/get',
            session: this.session,
            data: {
              parentAreaId: this.propdata.cityId
            },
            callback: function (data) {
              if (data.ret.errorCode === 0) {
                data.rows.forEach(function (item, i) {
                  var option = {}
                  option.key = item.id;
                  option.label = item.name;
                  option.value = item.id;
//                vm.data.provinceData[i]=option;
                  vm.$set(vm.data.areaData, i, option)
                })
              }
            }
          })
        }
      },

    },
    computed: {
      start: function () {
        return this.startArea
      }
    },
    mounted: function () {
      var vm = this;
      this.$nextTick(() => {
        this.getProvince();
        this.$nextTick(() => {
          if (vm.startArea) {
            var s = vm.startArea;
            vm.getStartId(vm.startArea, function (data) {
              if (data.ret.errorCode === 0) {
                vm.getStartId(data.rows[0].parentAreaId, function (datas) {
                  if (datas.ret.errorCode === 0) {
                    vm.$set(vm.propdata, 'provinceId', datas.rows[0].parentAreaId);
                    vm.$nextTick(function () {
                      vm.$set(vm.propdata, 'cityId', data.rows[0].parentAreaId);
                      vm.$nextTick(function () {
                        vm.$set(vm.propdata, 'areaId', s);
                      })
                    })
                  }
                })
              }
            })
          }
        })
      })
    },
    watch: {
      startArea: {
        handler: function (val, oldVal) {
          var vm = this;
          //处理有初始值areaid的情况
          if (this.startArea) {
            this.$nextTick(function () {
              vm.getStartId(vm.startArea, function (data) {
                if (data.ret.errorCode === 0) {
                  vm.getStartId(data.rows[0].parentAreaId, function (datas) {
                    if (datas.ret.errorCode === 0) {
                      vm.$set(vm.propdata, 'provinceId', datas.rows[0].parentAreaId);
                      vm.$nextTick(function () {
                        vm.$set(vm.propdata, 'cityId', data.rows[0].parentAreaId);
                        vm.$nextTick(function () {
                          vm.$set(vm.propdata, 'areaId', vm.startArea);
                        })
                      })
                    }
                  })
                }
              })
            })
          } else {
            vm.$set(vm.propdata, 'provinceId', null);
          }
        },
        deep: true

      }
    }

  }
</script>
<style lang="scss">
  #Provice {
    width: 100%;
    .el-select {
      width: 32%;
      .el-input {
        width: 100%;
      }
    }
  }
</style>
