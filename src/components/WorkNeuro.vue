<script>
import { RouterLink } from 'vue-router'
export default {
data(){
    return{
        //案件資訊
        modelList:[],
        caseInfo:[],
        modelSelect:'default',
        caseInfoNotEnough: false,
        ratingStr:'',
        rating:null,
        ratingStatus : {
            GENERAL : 0,
            GOOD : 1,
            BAD : 2
        },
        avarage:0,
        averageWithTeam:0,
        latest:0,
        goal:0,
        //效率參考資訊
        prList:[],
        //日工時表
        workDayInfoList:[],
        latestDate:'',
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
        hasRendered:false,
        //案件資訊分類
        caseInfoByModel:{}
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
            this.caseInfo = data;
            this.sortCaseInfoByModel();
            console.log(data);
        })
        .catch(err => console.log(err))
    },
    sortCaseInfoByModel(){
        let modelList = [];
        this.caseInfo.caseInfoList.forEach((thisCase) => {
            if(!modelList.includes(thisCase.model)){
                modelList.push(thisCase.model);
            }
        })

        this.modelList = modelList;

        modelList.forEach((thisModel) => {
            this.caseInfoByModel[thisModel] = [];
        })
        
        modelList.forEach((thisModel) => {
            this.caseInfo.caseInfoList.forEach((thisCase) => {
                if(thisCase.model === thisModel){
                    this.caseInfoByModel[thisModel].push(thisCase);
                }
            })
        })

        console.log(this.caseInfoByModel);
    },
    fetchWorkDayInfo() {

        fetch("http://localhost:3000/getWorkDayInfoByEmployeeId", {
        method: "put",
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({employeeId : this.employeeId})
        }).then(res => res.json())
        .then((data) => {
            console.log(data);
            let workDayInfoList = data.workDayInfoList;
            let container = null;
            for (let i = workDayInfoList.length - 1; i > 0; i--) {
                for (let i = 0; i < workDayInfoList.length - 1; i++) {
                    const nextDateStr = workDayInfoList[i + 1].date;
                    const [nextDateYear, nextDateMonth, nextDateDay] = nextDateStr.split('-');
                    const nextDate = new Date(nextDateYear, nextDateMonth - 1, nextDateDay);
                    const thisDateStr = workDayInfoList[i].date;
                    const [thisDateStrYear, thisDateStrMonth, thisDateStrDay] = thisDateStr.split('-');
                    const thisDate = new Date(thisDateStrYear, thisDateStrMonth - 1, thisDateStrDay);
                    if (nextDate > thisDate) {
                        container = workDayInfoList[i + 1];
                        workDayInfoList[i + 1] = workDayInfoList[i];
                        workDayInfoList[i] = container;
                    }
                }
            }
            this.workDayInfoList = workDayInfoList;
            this.latestDate = workDayInfoList[0].date;
        })
        .catch(err => console.log(err))
    },
    fetchPRInfo() {

        fetch("http://localhost:3000/getAllPerformanceReferences", {
        method: "get",
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        }).then(res => res.json())
        .then((data) => {
            console.log(data);
            this.prList = data;
        })
        .catch(err => console.log(err))
    },
    renderAvarageDurarionDiv(avarage) {
        this.avarage = avarage;
        setTimeout(()=>{
            let avarageDurarionDiv = document.getElementById("avarageDuration");
            console.log(avarage)
            avarageDurarionDiv.style.width = `${avarage * 2}%`;
        }, 100)
    },
    renderLatestDurarionDiv(latest) {
        this.latest = latest;
        setTimeout(()=>{
            let latestDurarionDiv = document.getElementById("latestDuration");
            console.log(latest)
            if(latest <= 50){
                latestDurarionDiv.style.width = `${latest * 2}%`;
            }
            if(latest > 50 && latest <= 60){
                latestDurarionDiv.style.width = `${latest * 1.5}%`;
            }
            if(latest > 60 && latest <= 80){
                latestDurarionDiv.style.width = `${latest * 1}%`;
            }
            if(latest > 80){
                latestDurarionDiv.style.width = `${latest * 0.5}%`;
            }
        }, 100)
    },
    renderAvarageDurarionWithTeamDiv(avarage) {
        this.avarageWithTeam = avarage;
        setTimeout(()=>{
            let avarageDurationWithTeamDiv = document.getElementById("avarageDurationWithTeam");
            console.log(avarage)
            avarageDurationWithTeamDiv.style.width = `${avarage * 2}%`;
        }, 100)
    },
    renderGoalDurarionDiv(selectedModel) {
        // this.latest = latest;
        // setTimeout(()=>{
        //     let latestDurarionDiv = document.getElementById("latestDuration");
        //     console.log(latest)
        //     if(latest <= 50){
        //         latestDurarionDiv.style.width = `${latest * 2}%`;
        //     }
        //     if(latest > 50 && latest <= 60){
        //         latestDurarionDiv.style.width = `${latest * 1.5}%`;
        //     }
        //     if(latest > 60 && latest <= 80){
        //         latestDurarionDiv.style.width = `${latest * 1}%`;
        //     }
        //     if(latest > 80){
        //         latestDurarionDiv.style.width = `${latest * 0.5}%`;
        //     }
        // }, 100)
    },
    renderRate() {
        console.log(this.latest)
        console.log(this.avarage)
        if(this.latest <= this.avarage + this.avarage * 0.05 
        && this.latest >= this.avarage - this.avarage * 0.05){
            this.rating = this.ratingStatus.GENERAL;
            this.ratingStr = '您的個人效率維持一致'
        }
        if(this.latest < this.avarage - this.avarage * 0.05){
            this.rating = this.ratingStatus.GOOD;
            this.ratingStr = '您的個人效率有提升趨勢'
        }
        if(this.latest > this.avarage + this.avarage * 0.05){
            this.rating = this.ratingStatus.BAD;
            this.ratingStr = '您的個人效率有下降趨勢'
        }
    }
},
created(){
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
    this.changeLanguage();
    this.levelCheck();
    this.fetchPRInfo();
    this.fetchWorkDayInfo();
    this.getCaseInfoByEmployeeId();
},
mounted(){
    //進入頁面deco特效
    setTimeout(()=>{
        this.deco();
    },10)
},
watch: {
    modelSelect(selectedModel){
        if(this.caseInfoNotEnough === true){
            this.ratingStr = '';
        }

        //將此機型的caseInfo照日期順序排好
        let container = null;
        if(this.caseInfoByModel !== null){
            for (let i = this.caseInfoByModel[selectedModel].length - 1; i > 0; i--) {
                for (let i = 0; i < this.caseInfoByModel[selectedModel].length - 1; i++) {
                    const nextDateStr = this.caseInfoByModel[selectedModel][i + 1].date;
                    const [nextDateYear, nextDateMonth, nextDateDay] = nextDateStr.split('-');
                    const nextDate = new Date(nextDateYear, nextDateMonth - 1, nextDateDay);
                    const thisDateStr = this.caseInfoByModel[selectedModel][i].date;
                    const [thisDateStrYear, thisDateStrMonth, thisDateStrDay] = thisDateStr.split('-');
                    const thisDate = new Date(thisDateStrYear, thisDateStrMonth - 1, thisDateStrDay);
                    if (nextDate > thisDate) {
                        container = this.caseInfoByModel[selectedModel][i + 1];
                        this.caseInfoByModel[selectedModel][i + 1] = this.caseInfoByModel[selectedModel][i];
                        this.caseInfoByModel[selectedModel][i] = container;
                    }
                }
            }

            console.log(this.caseInfoByModel[selectedModel])

            if(this.caseInfoByModel[selectedModel].length < 3){
                this.caseInfoNotEnough = true;
            }else{
                this.caseInfoNotEnough = false;
                //計算過往的平均時間
                let totalDuration = 0;
                let totalDurationWithTeam = 0;
                this.caseInfoByModel[selectedModel].forEach((modelInfo , index) => {
                    if(index > 1){
                        totalDuration += modelInfo.duration;
                    }
                    if(index > 0){
                        totalDurationWithTeam += modelInfo.duration;
                    }
                })
                let thisModelAvarageDuration = totalDuration / (this.caseInfoByModel[selectedModel].length - 2);
                let thisModelAvarageDurationWithTeam = totalDurationWithTeam / (this.caseInfoByModel[selectedModel].length - 1);
                this.renderAvarageDurarionDiv(thisModelAvarageDuration);
                this.renderLatestDurarionDiv(this.caseInfoByModel[selectedModel][1].duration);
                this.renderAvarageDurarionWithTeamDiv(thisModelAvarageDurationWithTeam);
                this.renderGoalDurarionDiv(selectedModel);
                this.renderRate();
                console.log(thisModelAvarageDuration)
            }
            
        }
    }
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
            <div class="contentFrame">
                <div class="selectFrame">
                    <label for="orm-select">觀看效率趨勢</label>
                    <select v-model="modelSelect" class="form-select" id="orm-select" size="3" aria-label="size 3 select example">
                        <option value="default" selected>選擇機型</option>
                        <option v-for="(model , index) in this.modelList" :key="index" :value="model">{{ model }}</option>
                    </select>
                </div>
                <div class="displayFrame">
                    <h4 v-if="caseInfoNotEnough && this.modelSelect !== 'default'">目前尚無趨勢</h4>
                    <h5 class="selfEvaluate" v-if="!caseInfoNotEnough && this.modelSelect !== 'default'"><i class="fa-solid fa-person"></i> 您的效率與過往相比</h5>

                    <div class="latestFrame">
                        <div v-if="!caseInfoNotEnough && this.modelSelect !== 'default'" class="latestDuration" id="latestDuration"></div>
                    </div>

                    <div class="avarageFrame">
                        <div v-if="!caseInfoNotEnough && this.modelSelect !== 'default'" class="avarageDuration" id="avarageDuration"></div>
                    </div>

                    <p v-if="!caseInfoNotEnough && this.modelSelect !== 'default'" class="latestDetail">最新完工耗時: {{ latest }}H 
                        <p class="avarageDetail">平均完工耗時: {{ avarage }}H</p></p>
                    <p v-if="!caseInfoNotEnough && this.modelSelect !== 'default'" 
                    :style="{color : this.rating === this.ratingStatus.BAD? 'rgb(162, 40, 40)' : ''
                     || this.rating === this.ratingStatus.GOOD? 'rgb(207, 200, 150)' : ''}" 
                    class="rating">{{ ratingStr }}</p>

                    <h5 class="teamEvaluate" v-if="!caseInfoNotEnough && this.modelSelect !== 'default'"><i class="fa-solid fa-people-group"></i> 您的效率與團隊目標相比</h5>

                    <div class="avarageDurationWithTeamFrame">
                        <div v-if="!caseInfoNotEnough && this.modelSelect !== 'default'" class="avarageDurationWithTeam" id="avarageDurationWithTeam"></div>
                    </div>

                    <div class="goalDurationFrame">
                        <div v-if="!caseInfoNotEnough && this.modelSelect !== 'default'" class="goalDuration" id="goalDuration"></div>
                    </div>

                    <p v-if="!caseInfoNotEnough && this.modelSelect !== 'default'" class="avarageDetailSelf">平均完工耗時(含最新): {{ avarageWithTeam }}H 
                        <p class="avarageDetailWithTeam">目標完工耗時: {{ goal }}H</p></p>
                    <p v-if="!caseInfoNotEnough && this.modelSelect !== 'default'" 
                    :style="{color : this.teamRating === this.ratingStatus.BAD? 'rgb(45, 6, 6)' : ''
                     || this.teamRating === this.ratingStatus.GOOD? 'rgb(7, 30, 49)' : ''}" 
                    class="rating">{{ teamRatingStr }}</p>
                </div>
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
    background: linear-gradient(45deg, rgba(97, 137, 168, 0.5), rgba(211, 69, 69, 0.5));
}
.main {
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    z-index: -1;

    .text-light{
        font-size: 4rem;
        width: 5rem;
        height: 5rem;
    }
    .all {
        display: flex;
        position: relative;
        flex-direction: column;
        width: 80%;
        height: 90%;

        .titleFrame{
            height: 15%;
            .title {
                font-size: 5vh;
                font-family: "OCR A";
                background-clip: text;
                -webkit-background-clip: text;
                color: transparent;
                background-image: linear-gradient(45deg, rgb(97, 137, 168), rgb(116, 69, 211));
                margin-bottom: 0;
            }
            P{
                margin-bottom: 0;
                color: white;
            }
        }

        .contentFrame{
            height: 85%;
            position: relative;
            display: flex;

            .selectFrame{
                position: relative;
                height: 70%;
                width: 15%;

                label{
                height: 10%;
                font-size: 3vh;
                color: white;
                }
                .form-select{
                    overflow: auto;
                    height: 100%;
                    background-color: rgba(233, 233, 233, 0.7);

                    option{
                        transition: 0.3s;
                    }
                }
            }

            .displayFrame{
                position: absolute;
                right: 0;
                bottom: 5%;
                display: flex;
                width: 80%;
                height: 105%;
                border-radius: 2vh;
                border: 0.1vh solid rgb(54, 50, 73);
                background-color: rgba(83, 83, 83, 0.3);

                h4{
                    margin: auto;
                    color: white;
                    font-size: 3.5vh;
                }
                .selfEvaluate{
                    position: absolute;
                    top:3%;
                    left: 10%;
                    color: white;
                    font-size: 3.5vh;
                }
                .teamEvaluate{
                    position: absolute;
                    top:45%;
                    left: 10%;
                    color: white;
                    font-size: 3.5vh;
                }

                h5{
                    margin-left: auto;
                    margin-right: auto;
                    margin-top: 3%;
                    color: white;
                    font-size: 3.5vh;
                }

                .rating{
                    position: absolute;
                    top:17%;
                    left: 10%;
                    transform: translateY(-50%);
                    font-weight: 600;
                    font-size: 2.4vh;
                    color: rgb(239, 239, 239);
                }

                //上部個人圖表
                .latestFrame{
                    position: absolute;
                    top:30%;
                    transform: translateY(-50%);
                    left:10%;
                    height: 5vh;
                    width: 80%;
                    .latestDuration{
                        position: absolute;
                        height: 5vh;
                        width: 0;
                        border-radius: 0px 0.7vh 0.7vh 0px;
                        background: linear-gradient(to left, rgba(97, 137, 168, 1), rgb(115, 86, 213));
                        transition: 1s ease-in-out;

                        &::after{
                            content: '最新完工耗時';
                            margin-left: 3%;
                            color: white;
                            font-weight: 600;
                            font-size: 1.5vh;
                            white-space: nowrap;
                        }
                    }
                }

                .avarageFrame{
                    position: absolute;
                    top:30%;
                    transform: translateY(-50%);
                    left:10%;
                    height: 7vh;
                    width: 80%;
                    .avarageDuration{
                        position: absolute;
                        height: 7vh;
                        border-right: 0.18vw solid rgba(18, 18, 18, 0.9);
                        width: 0;
                        background-color: transparent;
                        transition: 0.4s;

                        &::after{
                            content: '平均完工耗時';
                            white-space: nowrap;
                            color: #d6d6d6;
                            position: absolute;
                            font-weight: 600;
                            font-size: 1.8vh;
                            top: -40%;
                            right: -3.2rem;
                        }

                        &::before{
                            content: '';
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);
                            height: 1%;
                            width: 100%;
                            background-color: rgba(167, 165, 148, 0.5);
                        }
                    }              
                }
                
                .latestDetail{
                    background: linear-gradient(to right, rgba(133, 151, 164, 0.7), rgba(164, 147, 198, 0.7));
                    border: 1px solid white;
                    border-radius: 1vh;
                    padding: 0 1vw;
                    position: absolute;
                    top:40%;
                    left: 30%;
                    transform: translateY(-50%);
                    font-weight: 600;
                    color: rgb(30, 27, 27);
                    font-size: 2vh;
                    .avarageDetail{
                        margin-left: 4vw;
                        display: inline;
                        font-weight: 600;
                        color: rgb(255, 191, 62);
                        font-size: 2vh;
                    }
                }

                //下部團隊圖表
                .avarageDurationWithTeamFrame{
                    position: absolute;
                    top:75%;
                    transform: translateY(-50%);
                    left:10%;
                    height: 5vh;
                    width: 80%;
                    .avarageDurationWithTeam{
                        position: absolute;
                        height: 5vh;
                        width: 0;
                        border-radius: 0px 0.7vh 0.7vh 0px;
                        background: linear-gradient(to left, rgb(177, 152, 101), rgb(231, 116, 116));
                        transition: 1s ease-in-out;

                        &::after{
                            content: '平均完工耗時';
                            margin-left: 3%;
                            color: white;
                            font-weight: 600;
                            font-size: 1.5vh;
                            white-space: nowrap;
                        }
                    }
                }

                .goalDurationFrame{
                    position: absolute;
                    top:75%;
                    transform: translateY(-50%);
                    left:10%;
                    height: 7vh;
                    width: 80%;
                    .goalDuration{
                        position: absolute;
                        height: 7vh;
                        border-right: 0.18vw solid rgba(82, 2, 2, 0.9);
                        width: 0;
                        background-color: transparent;
                        transition: 0.4s;

                        &::after{
                            content: '團隊目標';
                            white-space: nowrap;
                            color: #d6d6d6;
                            position: absolute;
                            font-weight: 600;
                            font-size: 1.8vh;
                            top: -40%;
                            right: -3.2rem;
                        }

                        &::before{
                            content: '';
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);
                            height: 1%;
                            width: 100%;
                            background-color: rgba(167, 165, 148, 0.5);
                        }
                    }              
                }

                .avarageDetailSelf{
                    background: linear-gradient(to right, rgba(133, 151, 164, 0.7), rgba(164, 156, 189, 0.7));
                    border: 1px solid white;
                    border-radius: 1vh;
                    padding: 0 1vw;
                    position: absolute;
                    bottom:5%;
                    left: 30%;
                    transform: translateY(-50%);
                    font-weight: 600;
                    color: rgb(255, 191, 62);
                    font-size: 2vh;
                    .avarageDetailWithTeam{
                        margin-left: 3vw;
                        display: inline;
                        font-weight: 600;
                        color: rgb(20, 50, 78);
                        font-size: 2vh;
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

}
</style>
