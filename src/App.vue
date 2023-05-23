<script>
import { RouterLink, RouterView } from 'vue-router'
import LoginView from "./views/LoginView.vue"
import EmployeeHomeView from "./views/EmployeeHomeView.vue"
import EmploAddWorkInfoView from "./views/EmploAddWorkInfoView.vue"
import EmploAddWorkInfoView_success from "./views/EmploAddWorkInfoView_success.vue"
import EmploCheckDailyTimeView from "./views/EmploCheckDailyTimeView.vue"
import EmploChangePsdView from "./views/EmploChangePsdView.vue"
import EmploChangePsdView_success from "./views/EmploChangePsdView_success.vue"
import EmploEditDailyTimeView from "./views/EmploEditDailyTimeView.vue"
import ManagerHomeView from "./views/ManagerHomeView.vue"
import ManaCheckDailyView from "./views/ManaCheckDailyView.vue"
import ManaApproveView from "./views/ManaApproveView.vue"
import SystemAddEmploListView from "./views/SystemAddEmploListView.vue"
import SystemAddEmploListView_success from "./views/SystemAddEmploListView_success.vue"
import StstemEditInfoView from "./views/StstemEditInfoView.vue"
import SystemHomeView from "./views/SystemHomeView.vue"
import StstemEditInfoView_success from "./views/StstemEditInfoView_success.vue"
import EmploAddWorkInfo from "./components/EmploAddWorkInfo.vue"
import EmployeeHome from "./components/EmployeeHome.vue"
import navFooter from './views/navFooter.vue'
export default{
    components:{
        LoginView,
        EmployeeHomeView,
        EmploAddWorkInfoView,
        EmploAddWorkInfoView_success,
        EmploCheckDailyTimeView,
        EmploEditDailyTimeView,
        EmploChangePsdView,
        EmploChangePsdView_success,
        ManagerHomeView,
        ManaCheckDailyView,
        ManaApproveView,
        SystemAddEmploListView,
        SystemAddEmploListView_success,
        StstemEditInfoView,
        SystemHomeView,
        StstemEditInfoView_success,
        EmploAddWorkInfo,
        EmployeeHome,
        navFooter
    },
    mounted(){
    }
}
</script>

<template>
    <navFooter />
    <!-- <EmployeeHome /> -->
        <!-- 一般員工 -->
        <!-- <LoginView /> -->
        <!-- <EmployeeHomeView /> -->
    
        <!-- <RouterLink to="/test">測試 </RouterLink> -->
        
        <!-- <EmploAddWorkInfoView /> -->
        <!-- <EmploAddWorkInfoView_success /> -->
        <!-- <EmploCheckDailyTimeView /> -->
        <!-- <EmploEditDailyTimeView /> -->
        <!-- <EmploChangePsdView /> -->
        <!-- <EmploChangePsdView_success /> -->
       

        <!-- 主管 -->
        <!-- <ManagerHomeView /> -->
        <!-- <ManaCheckDailyView /> -->
        <!-- <ManaApproveView /> -->

        <!-- 系統管理 -->
        <!-- <SystemHomeView /> -->
        <!-- <SystemAddEmploListView /> -->
        <!-- <SystemAddEmploListView_success /> -->
        <!-- <StstemEditInfoView /> -->
        <!-- <StstemEditInfoView_success /> -->
        
   
</template>

<style lang="scss" scoped>

</style>
