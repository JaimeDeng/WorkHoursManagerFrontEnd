import { createRouter, createWebHistory } from 'vue-router'
import test from '../views/test.vue'
import EmployeeHome from "../components/EmployeeHome.vue"
import EmploAddWorkInfo from "../components/EmploAddWorkInfo.vue"
import Login from "../components/Login.vue"
import EmploChangePsd from "../components/EmploChangePsd.vue"
import EmploCheckDailyTime from "../components/EmploCheckDailyTime.vue"
import Signup from "../components/Signup.vue"
import ManagerHome from "../components/ManagerHome.vue"
import ManaCheckDaily from "../components/ManaCheckDaily.vue"
import SystemHome from "../components/SystemHome.vue"
import SystemAddEmploList from "../components/SystemAddEmploList.vue"
import StstemEditInfo from "../components/StstemEditInfo.vue"
import SystemAddEmploList_success from "../components/SystemAddEmploList_success.vue"
import EditEmployeeWorkHoursInfo from "../components/EditEmployeeWorkHoursInfo.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/test',
      name: 'test',  
      component: test
    },
    { //一般員工首頁
      path: '/employeeHome',
      name: 'EmployeeHome',  
      component: EmployeeHome

    },
    { //新增日工時表
      path: '/emploAddWorkInfo',
      name: 'EmploAddWorkInfo',  
      component: EmploAddWorkInfo

    },
    { //登入頁面
      path: '/login',
      name: 'Login',  
      component: Login

    },
    { //變更密碼
      path: '/emploChangePsd',
      name: 'EmploChangePsd',  
      component: EmploChangePsd
    },
    { //一班員工查看工時表
      path: '/emploCheckDailyTime',
      name: 'EmploCheckDailyTime',  
      component: EmploCheckDailyTime
    },
    { //註冊帳密
      path: '/signup',
      name: 'Signup',  
      component: Signup
    },
    { //主管權限首頁
      path: '/managerHome',
      name: 'ManagerHome',  
      component: ManagerHome
    },
    { //主管查閱工時表
      path:'/manaCheckDaily',
      name: 'ManaCheckDaily',
      component:ManaCheckDaily
    },
    { //管理權限首頁
      path:'/systemHome',
      name: 'SystemHome',
      component:SystemHome
    },
    { //新增員工名單
      path:'/systemAddEmploList',
      name: 'SystemAddEmploList',
      component:SystemAddEmploList
    },
    { //修改人員資訊
      path:'/ststemEditInfo',
      name: 'StstemEditInfo',
      component:StstemEditInfo
    },
    { //修改人員資訊成功
      path:'/systemAddEmploList_success',
      name: 'SystemAddEmploList_success',
      component:SystemAddEmploList_success
    },
    { //修改工時表
      path:'/EditEmployeeWorkHoursInfo/:editWorkHoursInfoId', //後面必須加上 :變數名 才能在此路徑讀取參數
      name: 'EditEmployeeWorkHoursInfo',
      component:EditEmployeeWorkHoursInfo
    }
  ]
})

export default router
