<script>
import { RouterLink } from 'vue-router'
export default {
    data(){
        return{
            name:'老鄧',
            langValue:'ch',
            addTimeSheet:'',
            changePwd:'',
            checkTimesheet:'',
            approve:'',
            administrator:'',
            isSupervisor:true,
            isAdministrator:true
        }
    },
    methods:{
        changeLanguage(){
            if(this.langValue === 'en'){
                this.addTimeSheet = 'Add new timesheet';
                this.changePwd = 'Change password';
                this.checkTimesheet = 'Check my timesheets';
                this.approve = 'Review timesheets';
                this.administrator = 'Administrator page';
            }else if(this.langValue === 'ch'){
                this.addTimeSheet = '新增工作時數表';
                this.changePwd = '變更密碼';
                this.checkTimesheet = '查詢日工時表';
                this.approve = '審核工時表';
                this.administrator = '系統管理員功能';
            }else if(this.langValue === 'jp'){
                this.addTimeSheet = '勤務表追加';
                this.changePwd = 'パスワード変更';
                this.checkTimesheet = '勤務表一覧';
                this.approve = '勤務表承認';
                this.administrator = 'システム管理者ページ';
            }
        }
    },
    mounted(){
        //檢查及切換語言
        this.langValue = sessionStorage.getItem('langValue');
        console.log(this.langValue);
        this.changeLanguage();
    }
}
</script>
<template>
    <div class="main">
        <div class="all">
            <h4>{{ name }} , Fighting !</h4>
            <div class="funtionArea">
                <!-- 選單 -->
                <div class="linkFrame">
                    <RouterLink class="buttonlink" to="/emploAddWorkInfo">{{ addTimeSheet }}</RouterLink>
                    <RouterLink class="buttonlink" to="/emploCheckDailyTime">{{ checkTimesheet }}</RouterLink>
                    <RouterLink class="buttonlink" to="/emploChangePsd">{{ changePwd }}</RouterLink>
                    <RouterLink v-if="isSupervisor" class="buttonlink" to="/managerHome">{{ approve }}</RouterLink>
                    <RouterLink v-if="isAdministrator" class="buttonlink" to="/systemHome">{{ administrator }}</RouterLink>       
                </div>
            </div>
        </div>

        <!-- <RouterLink to="/login"><button class="btnback" type="button">返回登入頁</button></RouterLink> -->
    </div>
</template>


<style lang="scss" scoped>
.main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .all {
        display: flex;
        flex-direction: column;
        width: 55%;
        height: 85%;

        h4 {
            font-size: 4vh;
            color: white;
            margin-bottom: 5vh;
        }

        .funtionArea {
            height: 80%;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;

            .linkFrame {
                width: 100%;
                height: auto;
                display: flex;
                flex-direction: column;
                align-items: center;

                .buttonlink {
                    margin-top: 2%;
                    color: #000;
                    width: 48%;
                    height: 10vh;
                    position: relative;
                    background-color: white;
                    border-radius: 10px;
                    border: 2px solid #000;
                    font-size: 2vh;
                    text-decoration: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: 0.5s;
                    z-index: 1;
                    overflow: hidden;

                    &:active {
                        transform: scale(0.9);
                    }

                    &:hover {
                        color: white;
                        background-color: rgb(64, 104, 130);
                    }

                    &::after{
                        content: "";
                        z-index: -1;
                        position: absolute;
                        transform: translateY(100%);
                        border-radius: 100%;
                        height: 70vh;
                        width: 60vw;
                        background-color: rgba(61, 62, 63, 0.5);
                        transition: 0.5s;
                    }

                    &::before{
                        content: "";
                        z-index: -1;
                        position: absolute;
                        transform: translateY(-100%);
                        border-radius: 100%;
                        height: 70vh;
                        width: 60vw;
                        background-color: rgba(130, 204, 223, 0.5);
                        transition: 0.5s;
                    }

                    &:hover::after{
                        transform: translateY(53%);
                    }

                    &:hover::before{
                        transform: translateY(-44%);
                    }


                }



            }




        }
    }

    .btnback {
        background: rgb(26, 55, 77);
        border: 1.5px solid #000;
        color: white;
        border-radius: 5px;
        width: 120px;
        height: 40px;
        // font-weight: bold;
        font-size: 18px;
        margin-top: 50px;

        &:hover {
            background-color: rgb(64, 104, 130);
        }

        &:active {
            transform: scale(0.95);
        }
    }



}
</style>
