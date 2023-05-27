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
        teamRatingStr:'',
        rating:null,
        teamRating:null,
        ratingStatus : {
            GENERAL : 0,
            GOOD : 1,
            BAD : 2
        },
        avarage:0,
        averageWithTeam:0,
        latest:0,
        goal:0.0,
        //效率參考資訊
        PR:[],
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
    fetchPRInfoByModel() {
        this.goal = 0;
        fetch("http://localhost:3000/getPerformanceReferenceByModel", {
        method: "put",
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({model : this.modelSelect})
        }).then(res => res.json())
        .then((data) => {
            console.log(data);
            this.PR = data;
            let ratingStr = data.rating.substring(0 , data.rating.length-1);
            let goalNum = parseFloat(ratingStr);
            this.goal = parseFloat(goalNum.toFixed(1));
            console.log(this.goal)
            this.renderTeamRate();
        })
        .catch(err => console.log(err))
    },
    renderAvarageDurarionDiv(avarage) {
        this.avarage = avarage;
        setTimeout(()=>{
            let avarageDurarionDiv = document.getElementById("avarageDuration");
            console.log(avarage)
            if(avarage <= 50){
                avarageDurarionDiv.style.width = `${avarage * 2}%`;
            }
            if(avarage > 50 && avarage <= 60){
                avarageDurarionDiv.style.width = `${avarage * 1.5}%`;
            }
            if(avarage > 60 && avarage <= 80){
                avarageDurarionDiv.style.width = `${avarage * 1}%`;
            }
            if(avarage > 80){
                avarageDurarionDiv.style.width = `${avarage * 0.5}%`;
            }
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
            if(avarage <= 50){
                avarageDurationWithTeamDiv.style.width = `${avarage * 2}%`;
            }
            if(avarage > 50 && avarage <= 60){
                avarageDurationWithTeamDiv.style.width = `${avarage * 1.5}%`;
            }
            if(avarage > 60 && avarage <= 80){
                avarageDurationWithTeamDiv.style.width = `${avarage * 1}%`;
            }
            if(avarage > 80){
                avarageDurationWithTeamDiv.style.width = `${avarage * 0.5}%`;
            }
        }, 100)
    },
    renderGoalDurarionDiv() {
        setTimeout(()=>{
            if(this.goal !== 0){
                let goalDurarionDiv = document.getElementById("goalDuration");
                if(this.goal <= 50){
                    goalDurarionDiv.style.width = `${this.goal * 2}%`;
                }
                if(this.goal > 50 && this.goal <= 60){
                    goalDurarionDiv.style.width = `${this.goal * 1.5}%`;
                }
                if(this.goal > 60 && this.goal <= 80){
                    goalDurarionDiv.style.width = `${this.goal * 1}%`;
                }
                if(this.goal > 80){
                    goalDurarionDiv.style.width = `${this.goal * 0.5}%`;
                }
            }
        }, 100)
    },
    renderRate() {
        console.log(this.latest)
        console.log(this.avarage)
        if(this.latest <= this.avarage + this.avarage * 0.1 
        && this.latest >= this.avarage - this.avarage * 0.1){
            this.rating = this.ratingStatus.GENERAL;
            this.ratingStr = '您的個人效率維持一致'
        }
        if(this.latest < this.avarage - this.avarage * 0.1){
            this.rating = this.ratingStatus.GOOD;
            this.ratingStr = '您的個人效率有提升趨勢↗'
        }
        if(this.latest > this.avarage + this.avarage * 0.1){
            this.rating = this.ratingStatus.BAD;
            this.ratingStr = '您的個人效率有下降趨勢↘'
        }
    },
    renderTeamRate() {
        console.log(this.avarageWithTeam)
        console.log(this.goal)
        if(this.avarageWithTeam <= this.goal + this.goal * 0.1 
        && this.avarageWithTeam >= this.goal - this.goal * 0.1){
            this.teamRating = this.ratingStatus.GENERAL;
            this.teamRatingStr = '您的效率良好,維持在團隊目標範圍內';
        }
        if(this.avarageWithTeam < this.goal - this.goal * 0.1){
            this.teamRating = this.ratingStatus.GOOD;
            this.teamRatingStr = '您的效率極佳,超越團隊目標!';
        }
        if(this.avarageWithTeam > this.goal + this.goal * 0.1){
            this.teamRating = this.ratingStatus.BAD;
            this.teamRatingStr = '您的效率尚未達團隊目標,繼續加油!';
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
    this.levelCheck();
    this.fetchWorkDayInfo();
    this.getCaseInfoByEmployeeId();
},
mounted(){
    //檢查及切換語言
    this.langValue = sessionStorage.getItem('langValue');
    if(this.langValue === null){
        this.langValue = 'ch';
    }
    console.log(this.langValue);
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

        if(this.modelSelect !== 'default'){
            this.fetchPRInfoByModel();
        }
        //將此機型的caseInfo照日期順序排好
        if(this.modelSelect !== 'default'){
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
                    this.renderAvarageDurarionDiv(parseFloat(thisModelAvarageDuration.toFixed(1)));
                    this.renderLatestDurarionDiv(this.caseInfoByModel[selectedModel][1].duration);
                    this.renderAvarageDurarionWithTeamDiv(parseFloat(thisModelAvarageDurationWithTeam.toFixed(1)));
                    this.renderGoalDurarionDiv();
                    this.renderRate();
                }
                
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
                <!-- <router-link class="personalData" id="personalData" to="">查看您的個人數據</router-link> -->
            </div>
            <div class="contentFrame">
                <div class="selectFrame">
                    <label for="form-select">觀看效率趨勢</label>
                    <select v-model="modelSelect" class="form-select" id="form-select" size="3" aria-label="size 3 select example">
                        <option value="default" selected>選擇機型</option>
                        <option v-for="(model , index) in this.modelList" :key="index" :value="model">{{ model }}</option>
                    </select>
                </div>
                <router-link v-if="isAdministrator" tag="button" class="setGoal" to="/PerformanceGoalSetting">設定目標</router-link>
                <div v-if="modelSelect !== 'default'" class="displayFrame">
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
                    :style="{color : this.rating === this.ratingStatus.BAD? 'rgb(182, 70, 70)' : ''
                     || this.rating === this.ratingStatus.GOOD? 'rgb(207, 200, 150)' : ''}" 
                    class="rating">{{ ratingStr }}</p>

                    <h5 class="teamEvaluate" v-if="!caseInfoNotEnough && this.modelSelect !== 'default'"><i class="fa-solid fa-people-group"></i> 您的效率與團隊目標相比</h5>

                    <div class="avarageDurationWithTeamFrame">
                        <div v-if="!caseInfoNotEnough && this.modelSelect !== 'default'" class="avarageDurationWithTeam" id="avarageDurationWithTeam"></div>
                    </div>

                    <div class="goalDurationFrame">
                        <div v-if="!caseInfoNotEnough && this.modelSelect !== 'default' && this.goal !== 0" class="goalDuration" id="goalDuration"></div>
                    </div>

                    <p v-if="!caseInfoNotEnough && this.modelSelect !== 'default'" class="avarageDetailSelf">平均完工耗時(含最新): {{ avarageWithTeam }}H 
                        <p v-if="this.goal !== 0" class="avarageDetailWithTeam">目標完工耗時: {{ goal }}H</p>
                        <p v-else class="avarageDetailWithTeam">此機型尚無設定目標</p></p>
                    <p v-if="!caseInfoNotEnough && this.modelSelect !== 'default' && this.goal !== 0" 
                    :style="{color : this.teamRating === this.ratingStatus.BAD? 'rgb(182, 70, 70)' : ''
                     || this.teamRating === this.ratingStatus.GOOD? 'rgb(207, 200, 150)' : ''}" 
                    class="teamRating">{{ teamRatingStr }}</p>
                    <p v-if="!caseInfoNotEnough && this.modelSelect !== 'default' && this.goal === 0" class="teamRating">此機型尚無設定目標</p>
                </div>
                <div v-else class="displayFrame"><h4>請選擇您要觀看的機型</h4></div>
            </div>
        </div>
        <!--spinner在list還沒渲染好時顯示-->
        <div v-else class="spinner-border text-light" role="status"></div>

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
            .personalData{
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                background: linear-gradient(45deg, rgb(97, 137, 168), rgb(116, 69, 211));
                color: white;
                text-decoration: none;
                border-radius: 5vh 0 5vh 0;
                font-size: 1.5vh;
                top: 4%;
                right: 1%;
                height: 3.5vh;
                width: 10vw;
                transition: 0.4s;

                &:hover{
                    scale: 0.98;
                    font-size: 1.6vh;
                }
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
            .setGoal{
                position: absolute;
                bottom: 10%;
                display: flex;
                justify-content: center;
                align-items: center;
                background: linear-gradient(to right, rgba(133, 151, 164, 0.7), rgba(164, 147, 198, 0.7));
                width: 15%;
                height: 4.5vh;
                border: none;
                color: white;
                font-weight: 600;
                border-radius: 5px;
                padding: 4px;
                font-size: 1.8vh;
                text-decoration: none;
                transition: 0.4s;

                &:hover {
                    background-color: rgb(218, 218, 218);
                }

                &:active {
                    transform: scale(0.95);
                }
            }

            .displayFrame{
                position: absolute;
                right: 0;
                bottom: 5%;
                display: flex;
                width: 80%;
                height: 100%;
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

                .teamRating{
                    position: absolute;
                    top:59%;
                    left: 10%;
                    transform: translateY(-50%);
                    font-weight: 600;
                    font-size: 2.4vh;
                    color: rgb(239, 239, 239);
                }
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
                    left: 28%;
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
