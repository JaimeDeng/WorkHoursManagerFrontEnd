<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
    data(){
        return{
            //工時表資料
            today:'',
            workDayInfo:[],
            workDayInfoList:[],
            hasAnyWorkDayInfo:false,
            hasntThisDateInfo:false,
            hasntThisTimeScopeInfo:false,
            message:'',
            //介面文字
            searchDate:'',
            langValue:'ch',
            title:'',
            search:'',
            reviewStatus:'',
            reviewStatusPH:'',
            reviewStatusOpt1:'',
            reviewStatusOpt2:'',
            timeScope:'',
            timeScopePH:'',
            timeScopeOpt1:'',
            timeScopeOpt2:'',
            timeScopeOpt3:'',
            backBtn:'',
            //輸入綁定
            reviewStatusSelect:'default',
            timeScopeSelect:'default'
        }
    },
    methods:{
        changeLanguage(){
            if(this.langValue === 'ch'){
                this.title = '員工日工時表';
                this.search = '以日期搜尋';
                this.reviewStatus = '審核狀態';
                this.reviewStatusPH = '選擇審核狀態';
                this.reviewStatusOpt1 = '已審核';
                this.reviewStatusOpt2 = '未審核';
                this.timeScope = '時間範圍';
                this.timeScopePH = '請選擇時間範圍';
                this.timeScopeOpt1 = '7日';
                this.timeScopeOpt2 = '14日';
                this.timeScopeOpt3 = '30日';
                this.backBtn = '返回首頁'
            }else if(this.langValue === 'en'){
                this.title = '員工日工時表';
                this.search = '以日期搜尋';
                this.reviewStatus = '審核狀態';
                this.reviewStatusPH = '選擇審核狀態';
                this.reviewStatusOpt1 = '已審核';
                this.reviewStatusOpt2 = '未審核';
                this.timeScope = '時間範圍';
                this.timeScopePH = '請選擇時間範圍';
                this.timeScopeOpt1 = '7日';
                this.timeScopeOpt2 = '14日';
                this.timeScopeOpt3 = '30日';
                this.backBtn = '返回首頁'
            }else if(this.langValue === 'jp'){
                this.title = '員工日工時表';
                this.search = '以日期搜尋';
                this.reviewStatus = '審核狀態';
                this.reviewStatusPH = '選擇審核狀態';
                this.reviewStatusOpt1 = '已審核';
                this.reviewStatusOpt2 = '未審核';
                this.timeScope = '時間範圍';
                this.timeScopePH = '請選擇時間範圍';
                this.timeScopeOpt1 = '7日';
                this.timeScopeOpt2 = '14日';
                this.timeScopeOpt3 = '30日';
                this.backBtn = '返回首頁'
            }
        },
        fetchWorkHoursInfo(){

            let reqBody = {
                employeeId : 'E00001'
            }

            fetch("http://localhost:3000/getWorkDayInfoByEmployeeId" ,{
                method:"put",
                body: JSON.stringify(reqBody),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(res => res.json())
            .then((data)=>{
                this.workDayInfo = data;
                console.log(this.workDayInfo);
                if(this.workDayInfo.workDayInfoList.length !== 0){
                    this.hasAnyWorkDayInfo = true;
                    this.renderList();
                }
                if(data.success === true){
                    this.message = data.message;
                }else{
                    this.message = data.message;
                }
            })
            .catch(err => console.log(err))
        },
        renderList(){
            this.workDayInfoList = [];
            this.hasntThisTimeScopeInfo = false;
            this.workDayInfo.workDayInfoList.forEach((workDayInfo)=>{
                let approvedStr = "";
                if(workDayInfo.approved === true){
                    approvedStr = "已審核";
                }else{
                    approvedStr = "未審核";
                }
                let workingHoursIsNotEnough = false;
                if(workDayInfo.workingHours < 8){
                    workingHoursIsNotEnough = true;
                }
                this.workDayInfoList.push({
                    workInfoId : workDayInfo.workInfoId,
                    date : workDayInfo.date,
                    employeeId : workDayInfo.employeeId.employeeId,
                    workingHours : workDayInfo.workingHours,
                    status : workDayInfo.status,
                    approved : workDayInfo.approved,
                    approvedStr : approvedStr,
                    workingHoursIsNotEnough : workingHoursIsNotEnough
                })
            })
        },
        renderListLimitedApproved(){
            this.workDayInfoList = [];
            this.workDayInfo.workDayInfoList.forEach((workDayInfo)=>{
                if(workDayInfo.approved === true){
                    let approvedStr = "";
                    if(workDayInfo.approved === true){
                        approvedStr = "已審核";
                    }else{
                        approvedStr = "未審核";
                    }
                    let workingHoursIsNotEnough = false;
                    if(workDayInfo.workingHours < 8){
                        workingHoursIsNotEnough = true;
                    }
                    this.workDayInfoList.push({
                        workInfoId : workDayInfo.workInfoId,
                        date : workDayInfo.date,
                        employeeId : workDayInfo.employeeId.employeeId,
                        workingHours : workDayInfo.workingHours,
                        status : workDayInfo.status,
                        approved : workDayInfo.approved,
                        approvedStr : approvedStr,
                        workingHoursIsNotEnough : workingHoursIsNotEnough
                    })
                }
            })
        },
        renderListLimitedNotApproved(){
            this.workDayInfoList = [];
            this.workDayInfo.workDayInfoList.forEach((workDayInfo)=>{
                if(workDayInfo.approved === false){
                    let approvedStr = "";
                    if(workDayInfo.approved === true){
                        approvedStr = "已審核";
                    }else{
                        approvedStr = "未審核";
                    }
                    let workingHoursIsNotEnough = false;
                    if(workDayInfo.workingHours < 8){
                        workingHoursIsNotEnough = true;
                    }
                    this.workDayInfoList.push({
                        workInfoId : workDayInfo.workInfoId,
                        date : workDayInfo.date,
                        employeeId : workDayInfo.employeeId.employeeId,
                        workingHours : workDayInfo.workingHours,
                        status : workDayInfo.status,
                        approved : workDayInfo.approved,
                        approvedStr : approvedStr,
                        workingHoursIsNotEnough : workingHoursIsNotEnough
                    })
                }
            })
        },
        renderListByDate(date){
            this.workDayInfoList = [];
            let hasThisDateInfo = false;
            this.workDayInfo.workDayInfoList.forEach((workDayInfo)=>{
                if(workDayInfo.date === date){
                    let approvedStr = "";
                    if(workDayInfo.approved === true){
                        approvedStr = "已審核";
                    }else{
                        approvedStr = "未審核";
                    }
                    let workingHoursIsNotEnough = false;
                    if(workDayInfo.workingHours < 8){
                        workingHoursIsNotEnough = true;
                    }
                    this.workDayInfoList.push({
                        workInfoId : workDayInfo.workInfoId,
                        date : workDayInfo.date,
                        employeeId : workDayInfo.employeeId.employeeId,
                        workingHours : workDayInfo.workingHours,
                        status : workDayInfo.status,
                        approved : workDayInfo.approved,
                        approvedStr : approvedStr,
                        workingHoursIsNotEnough : workingHoursIsNotEnough
                    })
                    hasThisDateInfo = true;
                }
            })
            if(hasThisDateInfo === false){
                this.hasntThisDateInfo = true;
            }else{
                this.hasntThisDateInfo = false;
            }
        },
        renderListWhitin7Days(){
            this.workDayInfoList = [];
            let hasThisTimeScopeInfo = false;
            this.workDayInfo.workDayInfoList.forEach((workDayInfo)=>{
                let workDay = new Date(workDayInfo.date);
                let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                if(dayDiff <= 7){
                    let approvedStr = "";
                    if(workDayInfo.approved === true){
                        approvedStr = "已審核";
                    }else{
                        approvedStr = "未審核";
                    }
                    let workingHoursIsNotEnough = false;
                    if(workDayInfo.workingHours < 8){
                        workingHoursIsNotEnough = true;
                    }
                    this.workDayInfoList.push({
                        workInfoId : workDayInfo.workInfoId,
                        date : workDayInfo.date,
                        employeeId : workDayInfo.employeeId.employeeId,
                        workingHours : workDayInfo.workingHours,
                        status : workDayInfo.status,
                        approved : workDayInfo.approved,
                        approvedStr : approvedStr,
                        workingHoursIsNotEnough : workingHoursIsNotEnough
                    })
                    hasThisTimeScopeInfo = true;
                }
            })
            if(hasThisTimeScopeInfo === false){
                this.hasntThisTimeScopeInfo = true;
            }else{
                this.hasntThisTimeScopeInfo = false;
            }
        },
        renderListWhitin14Days(){
            this.workDayInfoList = [];
            let hasThisTimeScopeInfo = false;
            this.workDayInfo.workDayInfoList.forEach((workDayInfo)=>{
                let workDay = new Date(workDayInfo.date);
                let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                if(dayDiff <= 14){
                    let approvedStr = "";
                    if(workDayInfo.approved === true){
                        approvedStr = "已審核";
                    }else{
                        approvedStr = "未審核";
                    }
                    let workingHoursIsNotEnough = false;
                    if(workDayInfo.workingHours < 8){
                        workingHoursIsNotEnough = true;
                    }
                    this.workDayInfoList.push({
                        workInfoId : workDayInfo.workInfoId,
                        date : workDayInfo.date,
                        employeeId : workDayInfo.employeeId.employeeId,
                        workingHours : workDayInfo.workingHours,
                        status : workDayInfo.status,
                        approved : workDayInfo.approved,
                        approvedStr : approvedStr,
                        workingHoursIsNotEnough : workingHoursIsNotEnough
                    })
                    hasThisTimeScopeInfo = true;
                }
            })
            if(hasThisTimeScopeInfo === false){
                this.hasntThisTimeScopeInfo = true;
            }else{
                this.hasntThisTimeScopeInfo = false;
            }
        },
        renderListWhitin30Days(){
            this.workDayInfoList = [];
            let hasThisTimeScopeInfo = false;
            this.workDayInfo.workDayInfoList.forEach((workDayInfo)=>{
                let workDay = new Date(workDayInfo.date);
                let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                if(dayDiff <= 30){
                    let approvedStr = "";
                    if(workDayInfo.approved === true){
                        approvedStr = "已審核";
                    }else{
                        approvedStr = "未審核";
                    }
                    let workingHoursIsNotEnough = false;
                    if(workDayInfo.workingHours < 8){
                        workingHoursIsNotEnough = true;
                    }
                    this.workDayInfoList.push({
                        workInfoId : workDayInfo.workInfoId,
                        date : workDayInfo.date,
                        employeeId : workDayInfo.employeeId.employeeId,
                        workingHours : workDayInfo.workingHours,
                        status : workDayInfo.status,
                        approved : workDayInfo.approved,
                        approvedStr : approvedStr,
                        workingHoursIsNotEnough : workingHoursIsNotEnough
                    })
                    hasThisTimeScopeInfo = true;
                }
            })
            if(hasThisTimeScopeInfo === false){
                this.hasntThisTimeScopeInfo = true;
            }else{
                this.hasntThisTimeScopeInfo = false;
            }
        }
    },
    watch:{
        //監看searchDate的值變化 , date則是回遞該變數值
        searchDate(date){
            console.log(date);
            if(date === ''){
                this.renderList();
            }else{
                this.renderListByDate(date);
            }
        },
        reviewStatusSelect(newValue){
            console.log(newValue);
            if(newValue === 'default'){
                this.renderList();
            }
            if(newValue === 'true'){
                this.renderListLimitedApproved();
            }
            if(newValue === 'false'){
                this.renderListLimitedNotApproved();
            }
        },
        timeScopeSelect(newValue){
            console.log(newValue);
            if(newValue === 'default'){
                this.renderList();
            }
            if(newValue === '7days'){
                this.renderListWhitin7Days();
            }
            if(newValue === '14days'){
                this.renderListWhitin14Days();
            }
            if(newValue === '30days'){
                this.renderListWhitin30Days();
            }
        }
    },
    created() {
        this.fetchWorkHoursInfo();
        console.log(this.workDayInfoList);
    },
    mounted(){
        //檢查及切換語言
        this.langValue = sessionStorage.getItem('langValue');
        if(this.langValue === null){
            this.langValue = 'ch';
        }
        console.log(this.langValue);
        this.changeLanguage();
        //獲取今天日期
        const today = new Date();
        this.today = today;
    }
}
</script>
<template>
    <div class="main">
        <div class="check">
            <!-- 左側範圍 -->
            <div class="left">
                <div class="title_search">
                    <h4 class="fw-bold">{{ title }}</h4>
                    <div class="searchFrame">
                        <label for="serch">{{ search }}</label>
                        <div class="dateFrame">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <input @input="searchByDate" v-model="searchDate" id="serch" type="date">
                        </div>
                    </div>
                    
                    <div class="sel">
                        <div class="ap">
                            <!-- 審核狀態 -->
                            <label for="approvedStatusSelect">{{ reviewStatus }}</label>
                            <select v-model="reviewStatusSelect" id="approvedStatusSelect">
                                <option value="default" selected>{{ reviewStatusPH }}</option>
                                <option value="true">{{ reviewStatusOpt1 }}</option>
                                <option value="false">{{ reviewStatusOpt2 }}</option>
                            </select>
                        </div>
                        <div class="tim">
                            <!-- 時間範圍 -->
                            <label for="timeScopeSelect">{{ timeScope }}</label>
                            <select v-model="timeScopeSelect" for="timeScopeSelect">
                                <option value="default" selected>{{ timeScopePH }}</option>
                                <option value="7days">{{ timeScopeOpt1 }}</option>
                                <option value="14days">{{ timeScopeOpt2 }}</option>
                                <option value="30days">{{ timeScopeOpt3 }}</option>
                            </select>
                        </div>
                    </div>

                </div>
                <div class="sheet" style="overflow: auto;">
                    <!--手風琴-->
                    <div v-if="hasAnyWorkDayInfo" class="accordion accordion-flush" id="accordionFlushExample" style="overflow: auto;">
                        <!--手風琴格位-->
                        <div v-for="(workDayInfo , index) in workDayInfoList" :value="workDayInfo.worInfoId" :key="index" class="accordion-item">
                            <!--手風琴標題-->
                            <h2 class="accordion-header" id="flush-headingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    :data-bs-target="'#flush-collapse' + index" aria-expanded="false"
                                    aria-controls="flush-collapseOne">
                                    日期:{{ workDayInfo.date }}
                                    <p :class="{'hasntApproved' : !workDayInfo.approved , 'hasApproved' : workDayInfo.approved }">{{ workDayInfo.approvedStr }}</p>
                                </button>
                            </h2>
                             <!--手風琴內容-->
                            <div :id="'flush-collapse' + index" class="accordion-collapse collapse"
                                aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <!-- 手風琴內容區 -->
                                    <p>員工ID: {{ workDayInfo.employeeId }}</p>
                                    <p :class="{'notEnough' : workDayInfo.workingHoursIsNotEnough}">登錄時數: {{ workDayInfo.workingHours }}</p>
                                    <p>出勤狀態: {{ workDayInfo.status }}</p>
                                    <p :class="{'hasntApproved' : !workDayInfo.approved}">審核狀態: {{ workDayInfo.approvedStr }}</p>
                                    <button class="viewBtn" type="button">查看</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3 v-if="!hasAnyWorkDayInfo" class="emptyTitle">沒有任何日工時表</h3>
                    <h3 v-if="hasntThisDateInfo" class="emptyTitle">沒有該日期的日工時表</h3>
                    <h3 v-if="hasntThisTimeScopeInfo" class="emptyTitle">沒有該天數範圍內的工時表</h3>
                </div>
                <RouterLink to="/employeeHome"><button type="button" class="back">{{ backBtn }}</button></RouterLink>
            </div>



        </div>

    </div>
</template>


<style lang="scss" scoped>
.main {
    flex-grow: 1;
    z-index: -1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .check {
        position: relative;
        width: 80%;
        height: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        .left {
            position: relative;
            padding: 1vw;
            background-color: rgba(255, 255, 255, 0.724);
            border: 2px solid rgb(177, 208, 224);
            border-radius: 5px;
            width: 90%;
            height: 95%;

            .title_search {
                display: flex;
                width: 100%;
                align-items: baseline;

                .searchFrame{
                    position: absolute;
                    right: 50%;
                    width: max-content;
                    display: inline-block;
                    label {
                        font-size: 1.5vh;
                        display: inline-block;
                        margin-right: 0.5vw;
                    }
                    .dateFrame{
                        display: inline-block;
                        position: relative;
                        i {
                            font-size: 1vh;
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);
                            left: 3%;
                        }

                        input {
                            width: 6vw;
                            height: 3vh;
                            font-size: 1vh;
                            border-radius: 50px;
                            padding-left: 20%;
                            border: 1px solid #000;

                        }
                    }
                }

                .sel {
                    display: flex;
                    position: absolute;
                    right: 5%;
                    .ap{
                        label {
                            font-size: 1.5vh;
                            display: inline-block;
                            margin-right: 0.5vw;
                        }
                        select {
                            font-size: 0.5vh;
                            border-radius: 5px;
                            width: 7vw;
                            margin-right: 12px;
                            height: 3vh;
                        }
                    }
                    .tim{
                        label {
                            font-size: 1.5vh;
                            display: inline-block;
                            margin-right: 0.5vw;
                        }
                        select {
                            font-size: 0.5vh;
                            border-radius: 5px;
                            width: 7vw;
                            margin-right: 12px;
                            height: 3vh;
                        }
                    }
                }
            }

            .sheet {
                border-radius: 5px;
                height: 90%;

                .emptyTitle{
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 50%;
                    transform: translateX(-50%);
                }

                .accordion-button {
                    word-spacing: 2em;
                    position: relative;

                    i {
                        font-size: 8px;
                        margin-bottom: 6px;
                        margin-right: 8px;
                    }

                    &:hover {
                        background-color: rgb(105, 152, 171);
                        color: white;
                    }

                    .hasntApproved{
                        position: absolute;
                        right: 8vw;
                        top: 50%;
                        transform: translateY(-50%);
                        font-weight: 600;
                        color: rgb(199, 32, 32);
                    }
                    .hasApproved{
                        position: absolute;
                        right: 8vw;
                        top: 50%;
                        transform: translateY(-50%);
                        font-weight: 600;
                        color: rgb(71, 106, 167);
                    }

                }

                .accordion-body {
                    position: relative;

                    .notEnough{
                        font-weight: 600;
                        color: rgb(199, 32, 32);
                    }
                    .hasntApproved{
                        font-weight: 600;
                        color: rgb(199, 32, 32);
                    }
                    .viewBtn {
                        position: absolute;
                        background: rgb(26, 55, 77);
                        border: 1px solid #000;
                        color: white;
                        border-radius: 5px;
                        width: 5vw;
                        height: 3.5vh;
                        bottom: 5%;
                        right: 1%;
                        font-size: 2vh;
                        transition: 0.4s;

                        &:hover {
                            background-color: rgb(64, 104, 130);
                        }

                        &:active {
                            transform: scale(0.95);
                        }
                    }
                }
            }

            .back {
                position: absolute;
                bottom: 2%;
                left: 1%;
                background: rgb(26, 55, 77);
                border: 1px solid #000;
                color: white;
                border-radius: 5px;
                width: 5vw;
                height: 3vh;
                font-size: 1.5vh;
                transition: 0.4s;

                &:hover {
                    background-color: rgb(64, 104, 130);
                }

                &:active {
                    transform: scale(0.95);
                }
            }
        }


    }


}
</style>