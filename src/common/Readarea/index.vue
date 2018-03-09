<template>
  <div id="Readarea">{{province}} {{city}} {{area}}</div>
</template>
<script>
  export default{
    props: ['areaId'],
    data(){
      return {
        session: sessionStorage.getItem('session'),
        province: null,
        city: null,
        area: null
      }
    },
    methods: {
      getarea(id, fn){
        if (id) {
          let vm = this;
          let getcity = new RemoteCall();
          getcity.init({
            router: '/base/area/idname/get',
            async: false,
            session: this.session,
            data: {
              id: id,
              pageInfo: {
                pageSize: 100,
                pageNum: 1
              }
            },
            callback: fn
          })
        }
      },
    },
    mounted: function () {
      var vm = this;
      if (this.areaId) {
        this.getarea(this.areaId, function (data) {
          if (data.ret.errorCode === 0) {
            vm.$set(vm, 'area', data.rows[0].name);
            vm.getarea(data.rows[0].parentAreaId, function (datas) {
              if (datas.ret.errorCode === 0) {
                vm.$set(vm, 'city', datas.rows[0].name);
                vm.getarea(datas.rows[0].parentAreaId, function (str) {
                  vm.$set(vm, 'province', str.rows[0].name);
                })
              }
            })
          }
        })
      } else {
        vm.province = null;
        vm.city = null;
        vm.area = null;
      }
    },
    watch: {
      areaId(){
        var vm = this;
        if (this.areaId) {
          this.getarea(this.areaId, function (data) {
            if (data.ret.errorCode === 0) {
              vm.$set(vm, 'area', data.rows[0].name);
              vm.getarea(data.rows[0].parentAreaId, function (datas) {
                if (datas.ret.errorCode === 0) {
                  vm.$set(vm, 'city', datas.rows[0].name);
                  vm.getarea(datas.rows[0].parentAreaId, function (str) {
                    vm.$set(vm, 'province', str.rows[0].name);
                  })
                }
              })
            }
          })
        } else {
          vm.province = null;
          vm.city = null;
          vm.area = null;
        }

      }
    }
  }
</script>
<style>

</style>
