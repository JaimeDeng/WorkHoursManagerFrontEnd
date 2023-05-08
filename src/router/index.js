import { createRouter, createWebHistory } from 'vue-router'
import EmployeeHomeView from "../views/EmployeeHomeView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/employee-home',
      name:'EmployeeHomeView',  //盡量跟檔案名稱相同
      component:  EmployeeHomeView
    },
    {
      
    }
  ]
})

export default router
