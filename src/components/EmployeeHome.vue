<script>
import { RouterLink } from 'vue-router'
export default {
    data(){
        return{
            //工時表相關
            subordinatesWorkDayInfo:[],
            workDayInfo:[],
            //帳號相關
            name:'NONE',
            employeeId:'',
            accountId:'',
            langValue:'',
            addTimeSheet:'',
            changePwd:'',
            checkTimesheet:'',
            approve:'',
            administrator:'',
            //職等檢查
            isSupervisor:false,
            isAdministrator:false,
            hasRendered:false
        }
    },
    methods:{
        levelCheck(){
            fetch("http://localhost:3000/getEmployeeInfoById" ,{
                method:"put",
                body: JSON.stringify({employeeId : this.employeeId}),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(res => res.json())
            .then((data)=>{
                console.log(data);
                if(data.level === "系統管理員"){
                    this.isSupervisor = true;
                    this.isAdministrator = true;
                    this.hasRendered = true;
                }
                if(data.level === "課長" || data.level === "副理" || data.level === "經理"|| data.level === "總經理"){
                    this.isSupervisor = true;
                }
                this.hasRendered = true;
            })
            .catch(err => console.log(err))
        },
        changeLanguage(){
            if(this.langValue === 'en'){
                this.addTimeSheet = 'Add new timesheet';
                this.changePwd = 'Change password';
                this.checkTimesheet = 'Check/Edit my timesheets';
                this.approve = 'Review timesheets';
                this.administrator = 'Administrator page';
            }else if(this.langValue === 'ch'){
                this.addTimeSheet = '新增工作時數表';
                this.changePwd = '變更密碼';
                this.checkTimesheet = '查詢/編輯工時表';
                this.approve = '審核工時表';
                this.administrator = '系統管理員功能';
            }else if(this.langValue === 'jp'){
                this.addTimeSheet = '勤務表追加';
                this.changePwd = 'パスワード変更';
                this.checkTimesheet = '勤務表一覧/編集';
                this.approve = '勤務表承認';
                this.administrator = 'システム管理者ページ';
            }
        },
        getAllworkDayInfo(){
            fetch("http://localhost:3000/getAllWorkDayInfo" ,{
                method:"get",
                body: JSON.stringify(),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(res => res.json())
            .then((data)=>{
                console.log(data);
                //將日工時表以日期最新日期開始排序 (原本順序是先輸入的越前面)
                let container = null;
                for(let i = data.workDayInfoList.length - 1 ; i > 0 ; i --){
                    for(let i = 0 ; i < data.workDayInfoList.length - 1 ; i++){
                        const nextDateStr = data.workDayInfoList[i+1].date;
                        const [nextDateYear, nextDateMonth, nextDateDay] = nextDateStr.split('-');
                        const nextDate = new Date(nextDateYear, nextDateMonth - 1, nextDateDay);
                        const thisDateStr = data.workDayInfoList[i].date;
                        const [thisDateStrYear, thisDateStrMonth, thisDateStrDay] = thisDateStr.split('-');
                        const thisDate = new Date(thisDateStrYear, thisDateStrMonth - 1, thisDateStrDay);
                        if(nextDate > thisDate){
                            container = data.workDayInfoList[i+1];
                            data.workDayInfoList[i+1] = data.workDayInfoList[i];
                            data.workDayInfoList[i] = container;
                        }       
                    }
                }
                data.workDayInfoList.forEach((workDayInfo)=>{
                    if(workDayInfo.employeeId.supervisor === this.employeeId){
                        this.subordinatesWorkDayInfo.push(workDayInfo);
                    }
                })
                console.log(this.subordinatesWorkDayInfo);
            })
            .catch(err => console.log(err))
        }
    },
    created(){
        this.getAllworkDayInfo();
    },
    mounted(){
        //檢查及切換語言
        this.name = sessionStorage.getItem('employeeName');
        if(this.name === null){
            this.name = localStorage.getItem('employeeName');
            if(this.name === null){
                this.name = 'NONE';
            }
        }
        //檢查帳號資訊
        this.employeeId = sessionStorage.getItem('employeeId');
        if(this.employeeId === null){
            this.employeeId = localStorage.getItem('employeeId');
        }
        this.accountId = sessionStorage.getItem('accountId');
        if(this.accountId === null){
            this.accountId = localStorage.getItem('accountId');
        }
        this.langValue = sessionStorage.getItem('langValue');
        if(this.langValue === null){
            this.langValue = 'ch';
        }
        console.log(this.langValue);
        this.changeLanguage();
        this.levelCheck();
    }
}
</script>
<template>
    <div class="main">
        <div v-if="hasRendered" class="all">
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
        <!--spinner在list還沒渲染好時顯示-->
        <div v-else class="spinner-border text-light" role="status"></div>

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

    .text-light{
        font-size: 4rem;
        width: 5rem;
        height: 5rem;
    }
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
                    font-weight: 500;
                    letter-spacing: 0.03vw;
                    box-shadow: inset 0 -3vh 60px 0.1vh rgba(27, 46, 57, 0.3);
                    margin-top: 2%;
                    color: #3d3d3d;
                    width: 48%;
                    height: 10vh;
                    position: relative;
                    background-color: rgb(255, 255, 255);
                    border-radius: 10px;
                    border: 1px solid #000;
                    font-size: 2.3vh;
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
                        box-shadow: inset 0 -3vh 50px 0.1vh rgba(27, 37, 57, 0.7);
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
