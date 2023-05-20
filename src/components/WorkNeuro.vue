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
        deco(){
            let deco = document.getElementById("deco");
            deco.style.left = "200%";
        },
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
        getCaseInfoByCaseId(Id){
            fetch("http://localhost:3000/getCaseInfoById" ,{
                method:"put",
                body: JSON.stringify({caseInfoId : Id}),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(res => res.json())
            .then((data)=>{
                console.log(data);
            })
            .catch(err => console.log(err))
        },
        getCaseInfoByEmployeeId(){
            fetch("http://localhost:3000/getCaseInfoByEmployeeId" ,{
                method:"put",
                body: JSON.stringify({employeeId : this.employeeId}),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(res => res.json())
            .then((data)=>{
                console.log(data);
            })
            .catch(err => console.log(err))
        }
    },
    created(){

    },
    mounted(){
        //進入頁面deco特效
        setTimeout(()=>{
            this.deco();
        },10)
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
        this.getCaseInfoByEmployeeId();
    }
}
</script>
<template>
    <div class="deco" id="deco"></div>
    <div class="main">
        <div v-if="hasRendered" class="all">
            <div class="titleFrame">
                <h3 class="title">WorkNeuro</h3>
                <p> 您的效率分析工具 </p>
            </div>
        </div>
        <!--spinner在list還沒渲染好時顯示-->
        <div v-else class="spinner-border text-light" role="status"></div>

        <!-- <RouterLink to="/login"><button class="btnback" type="button">返回登入頁</button></RouterLink> -->
    </div>
</template>


<style lang="scss" scoped>
.deco{
    position: absolute;
    transition: 1s;
    left: -200%;
    height: 100%;
    width: 70vw;
    transform: skew(45deg);
    background: linear-gradient(45deg, rgba(97, 137, 168, 0.5), rgba(116, 69, 211, 0.5));
}
.main {
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    .text-light{
        font-size: 4rem;
        width: 5rem;
        height: 5rem;
    }
    .all {
        display: flex;
        flex-direction: column;
        width: 55%;
        height: 90%;

        .titleFrame{
            height: 10%;
            .title {
                font-size: 5vh;
                font-family: "OCR A";
                background-clip: text;
                -webkit-background-clip: text;
                color: transparent;
                background-image: linear-gradient(45deg, rgb(97, 137, 168), rgb(116, 69, 211));
            }
            P{
                color: white;
            }
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
                        height: 100vh;
                        width: 0vw;
                        background-color: rgba(211, 211, 211, 0.3);
                        z-index: -1;
                        transform: rotate(260deg);
                        opacity: 0;
                        transition: 0.7s;
                    }

                    &:hover::after{
                        opacity: 1;
                        width: 4.5vw;
                        background-color: rgba(211, 211, 211, 0.3);
                        transform: rotate(295deg);
                    }

                    &:hover{
                        border: none;
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
