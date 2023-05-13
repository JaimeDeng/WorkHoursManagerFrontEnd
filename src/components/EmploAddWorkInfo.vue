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
        langValue:'ch',

        statusOptions:[
        {label : "出勤" , value : "出勤"},
        {label : "公假" , value : "公假"},
        {label : "病假" , value : "病假"},
        {label : "事假" , value : "事假"},
        {label : "特休" , value : "特休"},
        {label : "工傷" , value : "工傷"},
        {label : "天災" , value : "天災"}],
        timeOptions:[]
    }
},
methods: {
    changeLanguage(){
        if(this.langValue === 'en'){
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
            this.detailPlaceHolder = "Detail (Your space is limited to 500 characters)";
        }else if(this.langValue === 'jp'){
            this.addTitle = "勤務表追加";
            this.type = "型番";
            this.caseNo = "案件番号";
            this.status = "出勤状況";
            this.selectStatus = "出勤状況を選択してください";
            this.date = "日付";
            this.satrtTime = "開始時刻";
            this.selectStartTime = "開始時刻を選択してください";
            this.endTime = "終了時刻";
            this.selectEndTime = "終了時刻を選択してください";
            this.back = "戻る";
            this.commit = "追加";
            this.detailPlaceHolder = "仕事内容(500文字以内入力してください)";
        }else if(this.langValue === 'ch'){
            this.addTitle = "新增工作時數表";
            this.type = "機型";
            this.caseNo = "案件號碼";
            this.status = "出勤狀態";
            this.selectStatus = "請選擇出勤狀態";
            this.date = "日期";
            this.satrtTime = "開始時間";
            this.selectStartTime = "請選擇開始時間";
            this.endTime = "結束時間";
            this.selectEndTime = "請選擇結束時間";
            this.back = "返回";
            this.commit = "新增";
            this.detailPlaceHolder = "工作內容(限制500字以內)";
        }
    }
},
mounted() {
    //檢查及修改介面語言
    this.langValue = sessionStorage.getItem('langValue');
    console.log(this.langValue);
    this.changeLanguage();
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
                <textarea maxlength="500" class="detail" name="detail" id="detail" :placeholder="detailPlaceHolder"></textarea>
            </div>

            <!-- 底部按鈕 -->
            <div class="area2">
                <RouterLink tag="button" to="/employeeHome" class="back">{{ back }}</RouterLink>
                
                <button type="button">{{ commit }}</button>
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
    position: relative;
    z-index: -1;

    .add {
        background-color: rgba(255, 255, 255, 0.724);
        border: 2px solid rgb(177, 208, 224);
        border-radius: 10px;
        display: flex;
        position: relative;
        flex-direction: column;
        align-items: center;
        width: 50%;
        height: 80%;
        overflow: auto;
        h4{
            margin-top: 3%;
            margin-bottom: 3vh;
            font-size: 4vh;
            font-weight: bold;
        }

        .area1 {
            position: relative;
            display: flex;
            justify-content: center;
            justify-content: space-between;
            width: 50%;
            margin: 2vh auto;

            .info {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                label{
                    font-size: 2vh;
                }
                input,
                select {
                    font-size: 1.5vh;
                    height: 3.5vh;
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
                    font-size: 2vh;
                }

                input,select {
                    font-size: 1.5vh;
                    margin-bottom: 8px;
                    height: 3.5vh;
                    width: 10vw;
                    border-radius: 5px;
                    border:1px solid #000;

                }
            }
        }

        .detailFrame{
            position: relative;
            margin: 2vh 0;
            height: 20%;
            width: 50%;
            .detail{
                padding: 0.5vh 0.3vw;
                font-size: 1.5vh;
                height: 100%;
                width: 100%;
                border-radius: 10px;
                resize: none;
                margin: auto;
                overflow: auto;
                border:1px solid #000;
            }
        }

        .area2 {
            display: flex;
            justify-content: space-between;
            width: 40%;
            padding: 0 1vw;
            margin-top: 3.3%;

            .back{
                background: rgb(26, 55, 77);
                display: flex;
                justify-content: center;
                align-items: center;
                text-decoration: none;
                border: 1.5px solid #000;
                color: white;
                border-radius: 5px;
                width: 5vw;
                height: 3.5vh;
                font-size: 0.7vw;
                transition: 0.4s;
                overflow: hidden;

                &:hover {
                    background-color: rgb(64, 104, 130);
                }

                &:active {
                    transform: scale(0.95);
                }
            }

            button {
                background: rgb(26, 55, 77);
                border: 1.5px solid #000;
                color: white;
                border-radius: 5px;
                width: 5vw;
                height: 3.5vh;
                font-size: 0.7vw;
                transition: 0.4s;
                overflow: hidden;

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