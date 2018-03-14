import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Message from '../components/Message'
import User from '../components/User' //用户信息
import Merchant from '../components/Merchant' //商户信息
import MerchantAdd from '../components/MerchantAdd' //添加新商户
import MerchantCheck from '../components/MerchantCheck' //查阅商户证件
import Collaborate from '../components/Collaborate' //合作行业
import CollaborateAdd from '../components/CollaborateAdd' //新增合作行业
import CollaborateCheck from '../components/CollaborateCheck' //查看行业客户证件
import Order from '../components/Order' //订单管理
import Channel from '../components/Channel' //产品渠道管理
import UploadDir from '../components/UploadDir' //三大目录上传
import DirList from '../components/DirList' //三大目录列表
import DirManage from '../components/DirManage' //三大目录管理
import HealthStation from '../components/HealthStation' //卫生站管理
import HealthStationAdd from '../components/HealthStationAdd' //添加卫生站卫生站
import HealthStationUpdata from '../components/HealthStationUpdata' //添加卫生站卫生站
import DoctorAdd from '../components/DoctorAdd'//添加村医
import DoctorManage from '../components/DoctorManage'//添加村医
import DoctorUpData from '../components/DoctorUpData' //村医编辑
import MerchantChannel from '../components/MerchantChannel' //导入商户信息
import BusinessIssue from '../components/BusinessIssue' //业务专区发布
import InformationUp from '../components/InformationUp'//信息专区发布
import PayData from '../components/PayData'//支付流水数据
import DataAdministration from '../components/DataAdministration'//绑卡数据管理
import Terminal from '../components/Terminal'//社保受理终端管理平台
import DataReport from '../components/DataReport' //数据报表
import UserDetails from '../components/UserDetails' //用户详情
import UserInformation from '../components/UserInformation' //基本信息
import Social from '../components/Social'//社保卡信息
import UserBank from '../components/UserBank' //银行卡信息
import UserFamily from '../components/UserFamily' //家人关系
import UserRecord from '../components/UserRecord' //使用记录
import UserTownship from '../components/UserTownship'//用户乡银宝
import Staffadd from '../components/Staffadd' //员工新增
import Department from '../components/Department' //部门新建
import RoleAdd from '../components/RoleAdd' //角色新增
import SystemMange from '../components/SystemManage' //系统用户管理页
import SystemThrones from '../components/SystemThrones' //系统权限管理页
import SystemMaintenance from '../components/SystemMaintenance' //系统维护界面
import DepartmentManage from '../components/DepartmentManage' //部门管理
import RoleManage from '../components/RoleManage' //部门管理
import StaffManage from '../components/StaffManage' //员工管理
import StaffUpData from '../components/StaffUpData' //员工编辑
import MerchantUpData from '../components/MerchantUpData' //商户编辑
import CollaborateUpData from '../components/CollaborateUpData' //合作行业编辑
import HomePage from '../components/HomePage' //主页
import ResourceAdd from '../components/ResourceAdd' //新建资源
import ResourceAlert from '../components/ResourceAlert' //新建资源弹窗
import TerminalManage from '../components/TerminalManage' //终端管理
import TerminalUpData from '../components/TerminalUpData' //修改终端
import ResourceUpData from '../components/ResourceUpData' //资源更新
import RoleAccredit from '../components/RoleAccredit' //资源更新
import UserChannel from '../components/UserChannel' //用户导入
import ImportBankPFX from '../components/ImportBankPFX' //用户导入
import TerminalPassword from '../components/TerminalPassword' //终端管理
import TerminalAudit from '../components/TerminalAudit' //终端审核管理
import TerminalError from '../components/TerminalError' //终端异常管理
import TerminalAdd from '../components/TerminalAdd' //终端申请

import AppCarousel from '../components/appmanage/Carousel.vue'//轮播广告管理
import AppCarouselAdd from '../components/appmanage/CarouselAdd.vue' //新增轮播广告
import AppCarouselUpdate from '../components/appmanage/CarouselUpdate.vue' //新增轮播广告
import AppNews from '../components/appmanage/News.vue' //新闻资讯管理
import AppNewsAdd from '../components/appmanage/NewsAdd.vue' //新增新闻资讯
import AppNewsUpdate from '../components/appmanage/NewsUpdate.vue' //新增新闻资讯
import AppFaq from '../components/appmanage/Faq.vue' //常见问题管理
import AppFaqAdd from '../components/appmanage/FaqAdd.vue' //常见问题管理
import AppFaqUpdate from '../components/appmanage/FaqUpdate.vue' //常见问题管理


Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/homepage',
      component: HomePage,
      children: [
        {
          path: '',
          name: 'Message',
          component: Message
        },
        {
          path: '/user',
          name: 'User',
          component: User
        },
        {
          path: '/merchant',
          name: 'Merchant',
          component: Merchant
        },
        {
          path: '/merchantadd',
          name: 'MerchantAdd',
          component: MerchantAdd
        },
        {
          path: '/merchantcheck',
          name: 'MerchantCheck',
          component: MerchantCheck
        },
        {
          path: '/collaborate',
          name: 'Collaborate',
          component: Collaborate
        },
        {
          path: '/collaborateadd',
          name: 'CollaborateAdd',
          component: CollaborateAdd
        },
        {
          path: '/collaboratecheck',
          name: 'CollaborateCheck',
          component: CollaborateCheck
        },
        {
          path: '/order',
          name: 'Order',
          component: Order
        },
        {
          path: '/channel',
          name: 'Channel',
          component: Channel
        },
        {
          path: '/uploaddir',
          name: 'UploadDir',
          component: UploadDir
        },
        {
          path: '/dirlist',
          name: 'DirList',
          component: DirList
        },
        {
          path: '/dirmanage',
          name: 'DirManage',
          component: DirManage
        },
        {
          path: '/healthstation',
          name: 'HealthStation',
          component: HealthStation
        },
        {
          path: '/healthstationadd',
          name: 'HealthStationAdd',
          component: HealthStationAdd
        },
        {
          path: '/healthstationupdata',
          name: 'HealthStationUpdata',
          component: HealthStationUpdata
        },
        {
          path: '/doctoradd',
          name: 'DoctorAdd',
          component: DoctorAdd
        },
        {
          path: '/doctormanage',
          name: 'DoctorManage',
          component: DoctorManage
        },
        {
          path: '/merchantchannel',
          name: 'MerchantChannel',
          component: MerchantChannel
        },
        {
          path: '/businessissue',
          name: 'BusinessIssue',
          component: BusinessIssue
        },
        {
          path: '/informationup',
          name: 'InformationUp',
          component: InformationUp
        },
        {
          path: '/paydata',
          name: 'PayData',
          component: PayData
        },
        {
          path: '/dataadministration',
          name: 'DataAdministration',
          component: DataAdministration
        },
        {
          path: '/terminal',
          name: 'Terminal',
          component: Terminal
        },
        {
          path: '/terminalpassword',
          name: 'TerminalPassword',
          component: TerminalPassword
        },
        {
          path: '/datareport',
          name: 'DataReport',
          component: DataReport
        },
        {
          path: '/userdetails',
          component: UserDetails,
          children: [
            {
              path: '',
              name: 'UserInformation',
              component: UserInformation
            },
            {
              path: '/userdetailssocial',
              name: 'Social',
              component: Social
            },
            {
              path: '/userdetailsbank',
              name: 'UserBank',
              component: UserBank
            },
            {
              path: '/userdetailsfamily',
              name: 'UserFamily',
              component: UserFamily
            },
            {
              path: '/userdetailsuserrecord',
              name: 'UserRecord',
              component: UserRecord
            },
            {
              path: '/userdetailsusertownship',
              name: 'UserTownship',
              component: UserTownship
            }
          ]
        },
        {
          path: '/doctorupdata',
          name: 'DoctorUpData',
          component: DoctorUpData
        },
        {
          path: '/staffadd',
          name: 'Staffadd',
          component: Staffadd
        },
        {
          path: '/department',
          name: 'Department',
          component: Department
        },
        {
          path: '/roleadd',
          name: 'RoleAdd',
          component: RoleAdd
        },
        {
          path: '/systemmange',
          name: 'SystemMange',
          component: SystemMange
        },
        {
          path: '/systemthrones',
          name: 'SystemThrones',
          component: SystemThrones
        },
        {
          path: '/systemmaintenance',
          name: 'SystemMaintenance',
          component: SystemMaintenance
        },
        {
          path: '/departmentmanage',
          name: 'DepartmentManage',
          component: DepartmentManage
        },
        {
          path: '/rolemanage',
          component: RoleManage,
          children: [
            {
              path: '/rolemanage/accredit',
              name: 'RoleAccredit',
              component: RoleAccredit
            }
          ]
        },
        {
          path: '/staffmanage',
          name: 'StaffManage',
          component: StaffManage
        },
        {
          path: '/staffupdata',
          name: 'StaffUpData',
          component: StaffUpData
        },
        {
          path: '/merchantupdata',
          name: 'MerchantUpData',
          component: MerchantUpData
        },
        {
          path: '/collaborateupdata',
          name: "CollaborateUpData",
          component: CollaborateUpData
        },
        {
          path: '/resourceadd',
          // name: 'ResourceAdd',
          component: ResourceAdd,
          children: [
            {
              path: '/resourceadd/add',
              name: 'ResourceAlert',
              component: ResourceAlert
            },
            {
              path: '/resourceadd/updata',
              name: 'ResourceUpData',
              component: ResourceUpData
            }
          ]
        }, {
          path: '/terminalmanage',
          name: 'TerminalManage',
          component: TerminalManage
        }, {
          path: '/terminalupdata',
          name: 'TerminalUpData',
          component: TerminalUpData
        }, {
          path: '/terminalaudit',
          name: 'TerminalAudit',
          component: TerminalAudit
        }, {
          path: '/terminalerror',
          name: 'TerminalError',
          component: TerminalError
        },
        {
          path: '/userchannel',
          name: 'UserChannel',
          component: UserChannel
        },
        {
          path: '/importbankpfx',
          name: 'ImportBankPFX',
          component: ImportBankPFX
        },
        {
          path: '/terminaladd',
          name: 'TerminalAdd',
          component: TerminalAdd
        }, {
          path: '/carousel',
          name: 'AppCarousel',
          component: AppCarousel
        }, {
          path: '/carouseladd',
          name: 'AppCarouselAdd',
          component: AppCarouselAdd
        }, {
          path: '/carouselupdate',
          name: 'AppCarouselUpdate',
          component: AppCarouselUpdate
        }, {
          path: '/news',
          name: 'AppNews',
          component: AppNews
        }, {
          path: '/newsadd',
          name: 'AppNewsAdd',
          component: AppNewsAdd
        }, {
          path: '/newsupdate',
          name: 'AppNewsUpdate',
          component: AppNewsUpdate
        }, {
          path: '/faq',
          name: 'AppFaq',
          component: AppFaq
        }, {
          path: '/faqadd',
          name: 'AppFaqAdd',
          component: AppFaqAdd
        }, {
          path: '/faqupdate',
          name: 'AppFaqUpdate',
          component: AppFaqUpdate
        }
      ]
    }
  ]
})
