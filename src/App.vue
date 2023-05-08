<script>
import { RouterLink, RouterView } from 'vue-router'
import LoginView from "./views/LoginView.vue"
import EmployeeHomeView from "./views/EmployeeHomeView.vue"
import EmploAddWorkInfoView from "./views/EmploAddWorkInfoView.vue"
import EmploCheckDailyTimeView from "./views/EmploCheckDailyTimeView.vue"
import EmploChangePsdView from "./views/EmploChangePsdView.vue"
import ManagerHomeView from "./views/ManagerHomeView.vue"
import ManaCheckDailyView from "./views/ManaCheckDailyView.vue"
import ManaApproveView from "./views/ManaApproveView.vue"
import SystemAddEmploListView from "./views/SystemAddEmploListView.vue"
import StstemEditInfoView from "./views/StstemEditInfoView.vue"
export default{
    components:{
        LoginView,
        EmployeeHomeView,
        EmploAddWorkInfoView,
        EmploCheckDailyTimeView,
        EmploChangePsdView,
        ManagerHomeView,
        ManaCheckDailyView,
        ManaApproveView,
        SystemAddEmploListView,
        StstemEditInfoView
    }
}
</script>

<template>
        <!-- 一般員工 -->
        <!-- <LoginView /> -->
        <!-- <EmployeeHomeView /> -->
        <!-- <EmploAddWorkInfoView /> -->
        <!-- <EmploCheckDailyTimeView /> -->
        <!-- <EmploChangePsdView /> -->

        <!-- 主管 -->
        <!-- <ManagerHomeView /> -->
        <!-- <ManaCheckDailyView /> -->
        <!-- <ManaApproveView /> -->

        <!-- 系統管理 -->
        <!-- <SystemAddEmploListView /> -->
        <StstemEditInfoView />
   
</template>

<style lang="scss" scoped>

</style>
