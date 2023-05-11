<script>
import { RouterLink, RouterView } from 'vue-router'
export default (await import('vue')).defineComponent({
data() {
  return{
        addTitle:"新增工作時數表",
        type:"機型",
        caseNo:"製造號碼",
        status:"出勤狀態",
        selectStatus:"請選擇出勤狀態",
        date:"日期",
        satrtTime:"開始時間",
        selectStartTime:"請選擇開始時間",
        endTime:"結束時間",
        selectEndTime:"請選擇結束時間",
        back:"返回",
        commit:"新增",
        detailPlaceHolder:"工作內容(限制500字以內)",
        changeLangBtn:"切換英文",
        changeLang:false,

        statusOptions:[
        {label : "出勤" , value : "1"},
        {label : "公假" , value : "2"},
        {label : "病假" , value : "3"},
        {label : "事假" , value : "4"},
        {label : "特休" , value : "5"},
        {label : "工傷" , value : "6"},
        {label : "天災" , value : "7"}],
        timeOptions:[]
    }
},
methods: {
    changeLanguage(){
        if(this.changeLang === false){
            this.addTitle = "New Timesheet";
            this.type = "Type";
            this.caseNo = "Case no";
            this.status = "Attendance";
            this.selectStatus = "Select attendence status";
            this.date = "Date";
            this.satrtTime = "Start time";
            this.selectStartTime = "Select start time";
            this.endTime = "End time";
            this.selectEndTime = "Select end time";
            this.back = "Back";
            this.commit = "Commit";
            this.changeLangBtn = "Chinese";
            this.detailPlaceHolder = "Detail (Your space is limited to 500 characters)";
            this.changeLang = true;
        }else{
            this.addTitle = "新增工作時數表";
            this.type = "機型";
            this.caseNo = "製造號碼";
            this.status = "出勤狀態";
            this.selectStatus = "請選擇出勤狀態";
            this.date = "日期";
            this.satrtTime = "開始時間";
            this.selectStartTime = "請選擇開始時間";
            this.endTime = "結束時間";
            this.selectEndTime = "請選擇結束時間";
            this.back = "返回";
            this.commit = "新增";
            this.changeLangBtn = "切換英文";
            this.detailPlaceHolder = "工作內容(限制500字以內)";
            this.changeLang = false;
        }
    }
},
mounted() {
    //建構時間option
    let time = "";
    let hours = 0;
    let minutes = "00";
    let count = 1;
    while(count < 50){
        if(hours < 10){
            time = "0" + hours.toString() + ":" + minutes;
        }else{
            time = hours.toString() + ":" + minutes;
        }
        if(minutes === "00"){
            minutes = "30";
        }else{
            minutes = "00";
        }
        this.timeOptions.push({label : time , value : time});
        if(count%2 === 0){
            hours++;
        }
        count++;
    }
}
})
</script>
<template>
    <div class="main">
        <div class="add">
            <h4>{{ addTitle }}</h4>
            <!-- 填寫區 -->
            <div class="area1">
                <!-- 左側填寫區 -->
                <div class="info">
                    <label for="type">{{ type }}</label>
                    <input type="text" id="type">
                    <label for="caseNo">{{ caseNo }}</label>
                    <input type="text" id="caseNo">
                    <label for="">{{ status }}</label>
                    <select>
                        <option selected>{{ selectStatus }}</option>
                        <option v-for="(option , index) in statusOptions" :value="option.value" :key="index">{{option.label}}</option>
                    </select>
                </div>
                <!-- 右側填寫區 -->
                <div class="timeFrame">
                    <label for="date">{{ date }}</label>
                    <input type="date" id="date">
                    <label for="startTime">{{ satrtTime }}</label>
                    <select id="startTime">
                        <option selected>{{ selectStartTime }}</option>
                        <option v-for="(option , index) in timeOptions" :value="option.value" :key="index">{{option.label}}</option>
                    </select>
                    <label for="endTime">{{ endTime }}</label>
                    <select id="endTime">
                        <option selected>{{ selectEndTime }}</option>
                        <option v-for="(option , index) in timeOptions" :value="option.value" :key="index">{{option.label}}</option>
                    </select>
                </div>
            </div>

            <div class="detailFrame">
                <div class="mes form-floating">
                    <textarea maxlength="500" class="detail" name="detail" id="detail" :placeholder="detailPlaceHolder"></textarea>
                </div>
            </div>

            <!-- 底部按鈕 -->
            <div class="area2">
                <RouterLink to="/employeeHome"><button type="button">{{ back }}</button></RouterLink>
                
                <button type="button">{{ commit }}</button>

                <button @click="changeLanguage" type="button">{{ changeLangBtn }}</button>
            </div>
        </div>

    </div>
</template>


<style lang="scss" scoped>
.main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .add {
        background-color: rgba(255, 255, 255, 0.724);
        border: 2px solid rgb(177, 208, 224);
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50%;
        height: 80%;
        h4{
            margin-top: 3vh;
            font-size: 32px;
            font-weight: bold;
        }

        .area1 {
            position: relative;
            display: flex;
            justify-content: center;
            justify-content: space-between;
            width: 50%;
            margin: 7vh auto;

            .info {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                label{
                    font-size: 15px;
                }
                input,
                select {
                    height: 4vh;
                    width: 10vw;
                    margin-bottom: 8px;
                    border-radius: 5px;
                    border:1px solid #000;

                }

            }

            .timeFrame {
                display: flex;
                flex-direction: column;
                label{
                    font-size: 15px;
                }

                input,select {
                    margin-bottom: 8px;
                    height: 4vh;
                    width: 10vw;
                    border-radius: 5px;
                    border:1px solid #000;

                }
            }
        }

        .detailFrame{
            position: relative;
            width: 50%;
            .detail{
                height: 13vh;
                width: 100%;
                border-radius: 10px;
                resize: none;
                margin: auto;
                overflow: auto;

            }
        }

        .area2 {
            display: flex;
            justify-content: space-between;
            width: 40%;
            padding: 0 8px;
            margin-top: 7vh;

            button {
                background: rgb(26, 55, 77);
                border: 1.5px solid #000;
                color: white;
                border-radius: 5px;
                width: 100px;
                height: 30px;
                font-size: 15px;

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