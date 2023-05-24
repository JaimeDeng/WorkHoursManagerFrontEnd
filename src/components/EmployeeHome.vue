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
                this.encourage = 'Keep up the good work!';
            }else if(this.langValue === 'ch'){
                this.addTimeSheet = '新增工作時數表';
                this.changePwd = '變更密碼';
                this.checkTimesheet = '查詢/編輯工時表';
                this.approve = '審核工時表';
                this.administrator = '系統管理員功能';
                this.encourage = 'Fighting!';
            }else if(this.langValue === 'jp'){
                this.addTimeSheet = '勤務表追加';
                this.changePwd = 'パスワード変更';
                this.checkTimesheet = '勤務表一覧/編集';
                this.approve = '勤務表承認';
                this.administrator = 'システム管理者ページ';
                this.encourage = 'お疲れ様です';
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
            <h4>{{ name }}<h4 v-if="this.langValue==='jp'">さん</h4> , {{ encourage }}</h4>
            <div class="funtionArea">
                <!-- 選單 -->
                <div class="linkFrame">
                    <RouterLink class="buttonlink" to="/emploAddWorkInfo">{{ addTimeSheet }}</RouterLink>
                    <RouterLink class="buttonlink" to="/emploCheckDailyTime">{{ checkTimesheet }}</RouterLink>
                    <RouterLink class="buttonlink" to="/emploChangePsd">{{ changePwd }}</RouterLink>
                    <RouterLink v-if="isSupervisor" class="buttonlink" to="/ManaCheckDaily">{{ approve }}</RouterLink>
                    <RouterLink v-if="isAdministrator" class="buttonlink" to="/systemHome">{{ administrator }}</RouterLink>
                    <RouterLink class="workNeuro" to="/WorkNeuro">WorkNeuro</RouterLink>  
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
            display: inline;
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
                        background-color: rgb(64, 84, 130);
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
                        box-shadow: 0px 0px 50px 10px rgba(148, 149, 214, 0.5) inset;
                        background-color: rgba(67, 105, 146, 0.7);
                        transition: 0.5s;
                    }

                    &:hover::after{
                        transform: translateY(52%);
                    }

                    &:hover::before{
                        transform: translateY(-44%);
                    }


                }

                .workNeuro{
                    position: fixed;
                    letter-spacing: 0.03vw;
                    box-shadow: inset 0 -3vh 60px 0.1vh rgba(27, 46, 57, 0.3);
                    border-radius: 3vh 1vh 3vh 1vh;
                    text-decoration: none;
                    border: 1px solid rgba(141, 144, 152, 0.5);
                    box-shadow: 0px 0px 10px 5px rgb(218, 218, 218);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1;
                    overflow: hidden;
                    background-color: rgba(27, 37, 57, 0.6);
                    font-family: "OCR A";
                    font-size: 2vh;
                    color: white;
                    height: 8vh;
                    width: 9vw;
                    right: 5%;
                    bottom: 15%;
                    transition: 1s;
                    z-index: 1;

                    &::before{
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(to bottom, #886d93, #70989e);
                        opacity: 0;
                        transition: 1s;
                        z-index: -2;
                    }

                    &::after{
                        content: '';
                        position: absolute;
                        right: -100%;
                        height: 100vh;
                        width: 4.5vw;
                        background-color: rgba(121, 121, 121, 0.4);
                        z-index: -1;
                        transform: rotate(45deg);
                        transition: 0.7s;
                    }

                    &:hover::after{
                        width: 4.5vw;
                        right: 200%;
                        background-color: rgba(194, 194, 194, 0.4);
                    }

                    &:hover{
                        border: none;
                        text-shadow: -1px 0 rgb(96, 90, 108), 0 1px rgb(96, 90, 108), 1px 0 rgb(96, 90, 108), 0 -1px rgb(96, 90, 108);
                        font-size: 2.2vh;
                        box-shadow: 0px 0px 30px 20px white;
                        border-radius: 1vh 3vh 1vh 3vh;
                    }

                    &:hover::before{
                        opacity: 1;
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
