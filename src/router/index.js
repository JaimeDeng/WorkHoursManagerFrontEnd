import { createRouter, createWebHistory } from 'vue-router'
import test from '../views/test.vue'
import EmployeeHome from "../components/EmployeeHome.vue"
import EmploAddWorkInfo from "../components/EmploAddWorkInfo.vue"
import Login from "../components/Login.vue"
import EmploChangePsd from "../components/EmploChangePsd.vue"
import EmploCheckDailyTime from "../components/EmploCheckDailyTime.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/test',
      name: 'test',  //盡量跟檔案名稱相同
      component: test
    },
    { //一般員工首頁
      path: '/employeeHome',
      name: 'EmployeeHome',  //盡量跟檔案名稱相同
      component: EmployeeHome

    },
    { //新增日工時表
      path: '/emploAddWorkInfo',
      name: 'EmploAddWorkInfo',  //盡量跟檔案名稱相同
      component: EmploAddWorkInfo

    },
    { //登入頁面
      path: '/login',
      name: 'Login',  //盡量跟檔案名稱相同
      component: Login

    },
    { //變更密碼
      path: '/emploChangePsd',
      name: 'EmploChangePsd',  //盡量跟檔案名稱相同
      component: EmploChangePsd
    },
    { //一班員工查看工時表
      path: '/emploCheckDailyTime',
      name: 'EmploCheckDailyTime',  //盡量跟檔案名稱相同
      component: EmploCheckDailyTime
    }
  ]
})

export default router
