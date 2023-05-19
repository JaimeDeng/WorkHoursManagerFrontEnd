<script>
import { RouterLink, RouterView } from 'vue-router'
import popup from './popup.vue'
export default (await import('vue')).defineComponent({
components: {
    RouterLink,
    popup
},
data() {
  return{
        //props傳來的變數 , 直接宣告一樣的名稱在data()內
        showPopup: false,
        popupData: {
            title: "Popup Title",
            content: "Popup Content",
            backBtn: 'back',
        },
        //帳號相關
        employeeName:"",
        employeeId:"",
        accountId:"",
        //文本
        addTitle:"新增工作時數表",
        model:"機型",
        caseNo:"製造號碼",
        status:"出勤狀態",
        statusValue:'default',
        selectStatus:"請選擇出勤狀態",
        date:"日期",
        dateValue:'',
        satrtTime:"開始時間",
        startTimeValue:'default',
        selectStartTime:"請選擇開始時間",
        endTime:"結束時間",
        endTimeValue:'default',
        selectEndTime:"請選擇結束時間",
        detail:"",
        back:"返回",
        commit:"新增",
        detailPlaceHolder:"工作內容(限制500字以內)",
        langValue:'ch',
        caseNoInput:'',
        modelInput:'',
        modelIsInvalid:false,
        caseNoIsInvalid:false,
        message:"",
        statusOptions:[
        {label : "出勤" , value : "出勤"},
        {label : "公假" , value : "公假"},
        {label : "病假" , value : "病假"},
        {label : "事假" , value : "事假"},
        {label : "特休" , value : "特休"},
        {label : "工傷" , value : "工傷"},
        {label : "天災" , value : "天災"}],
        timeOptions:[],

        //resp
        resp:''
    }
},
methods: {
    changeLanguage(){
        if(this.langValue === 'en'){
            this.addTitle = "New Timesheet";
            this.model = "Type";
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
            this.popupData.backBtn = "Back";
        }else if(this.langValue === 'jp'){
            this.addTitle = "勤務表追加";
            this.model = "型番";
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
            this.popupData.backBtn = "戻る";
        }else if(this.langValue === 'ch'){
            this.addTitle = "新增工作時數表";
            this.model = "機型";
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
            this.popupData.backBtn = "返回";
        }
    },
    checkLength(input){
        if(input === 'caseNo'){
            if(this.caseNoInput.length <= 1){
                this.caseNoIsInvalid = true;
            }else{
                this.caseNoIsInvalid = false;
            }
        }
        if(input === 'model'){
            if(this.modelInput.length <= 1){
                this.modelIsInvalid = true;
            }else{
                this.modelIsInvalid = false;
            }
        }
    },
    commitReq(){
        //如果是default轉成null給後端才能正確做判斷
        let status = this.statusValue;
        if(status === "default"){
            status = null;
        }
        let satrtTime = this.startTimeValue;
        if(satrtTime === "default"){
            satrtTime = null;
        }
        let endTime = this.endTimeValue;
        if(endTime === "default"){
            endTime = null;
        }
        let reqbody = {
            date : this.dateValue,
            employeeId : this.employeeId,
            model : this.modelInput,
            caseNo : this.caseNoInput,
            startTime : satrtTime,
            endTime : endTime,
            detail : this.detail,
            status : status
        };
        console.log(reqbody);
        fetch("http://localhost:3000/setWorkHoursInfo" ,{
            method:"post",
            body: JSON.stringify(reqbody),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(res => res.json())
        .then((data)=>{
            this.resp = data;
            console.log(this.resp);
            if(data.success === true){
                this.message = this.resp.message;
                this.successPopup();
            }else{
                this.message = this.resp.message;
                this.errorPopup();
            }
        })
        .catch(err => console.log(err))
    },
    closePopup() {
        this.showPopup = false;
        this.popupData.title = "";
        this.popupData.content = "";
        if (this.resp.success) {
            this.dateValue = "";
            this.modelInput = "";
            this.caseNoInput = "";
            this.startTimeValue = "default";
            this.endTimeValue = "default";
            this.statusValue = "default";
            this.detail = "";

        }
    },
    successPopup() {
        if (this.langValue === 'ch') {
            this.popupData.title = "成功";
        } else if (this.langValue === 'en') {
            this.popupData.title = "Success";
        } else if (this.langValue === 'jp') {
            this.popupData.title = "追加完了";
        }
        this.popupData.content = this.message;
        this.showPopup = true;
        setTimeout(() => {
            let popup = this.$refs.popup;
            let popupEl = popup.$el;
            let popupIcon = popupEl.querySelector("i");
            console.log(popupIcon);
            let iconStr1 = "fa-solid";
            let iconStr2 = "fa-check";
            popupIcon.classList.add(iconStr1);
            popupIcon.classList.add(iconStr2);
            popupIcon.style.color = "#3771ae";
            console.log(popupIcon);
            popup.$el.style.opacity = "1";
            popup.$el.style.bottom = "0%";
        }, 100);
        this.$emit('addWorkInfoSuccess');
    },
    errorPopup() {
        if (this.langValue === 'ch') {
            this.popupData.title = "錯誤";
        } else if (this.langValue === 'en') {
            this.popupData.title = "Failure";
        } else if (this.langValue === 'jp') {
            this.popupData.title = "エラー";
        }
        this.popupData.content = this.message;
        this.showPopup = true;
        setTimeout(() => {
            let popup = this.$refs.popup;
            console.log(popup);
            let popupEl = popup.$el;
            let popupIcon = popupEl.querySelector("i");
            console.log(popupIcon);
            let iconStr1 = "fa-solid";
            let iconStr2 = "fa-circle-xmark";
            popupIcon.classList.add(iconStr1);
            popupIcon.classList.add(iconStr2);
            popupIcon.style.color = "#ae3737";
            console.log(popupIcon);
            popup.$el.style.opacity = "1";
            popup.$el.style.bottom = "0%";
        }, 100);
    }
},
mounted() {
    //獲取帳號資訊
    this.employeeId = sessionStorage.getItem("employeeId")
    if(this.employeeId === null){
        this.employeeId = localStorage.getItem("employeeId");
    }
    this.employeeName = sessionStorage.getItem("employeeName")
    if(this.employeeName === null){
        this.employeeName = localStorage.getItem("employeeName");
    }
    this.accountId = sessionStorage.getItem("accountId")
    if(this.accountId === null){
        this.accountId = localStorage.getItem("accountId");
    }
    //檢查及修改介面語言
    this.langValue = sessionStorage.getItem('langValue');
    if(this.langValue === null){
        this.langValue = 'ch';
    }
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

        <!--子元件要使用v-model綁定props變數 , 綁定命名的部分使用橫槓命名規則-->
        <popup ref="popup" class="popup" :popup-data="popupData" :show-popup="showPopup" @close="closePopup"></popup>
        <div v-if="showPopup" ref="mask" class="mask"></div>

        <div class="add">
            <h4>{{ addTitle }}</h4>
            <!-- 填寫區 -->
            <div class="area1">
                <!-- 左側填寫區 -->
                <div class="info">
                    <label for="model">{{ model }}</label>
                    <input
                     :style="{ backgroundColor: modelIsInvalid === true ? 'rgb(255, 205, 205)' : '' }" 
                    @input="checkLength('model')" v-model="modelInput" type="text" id="model"
                    >
                    <label for="caseNo">{{ caseNo }}</label>
                    <input 
                    :style="{ backgroundColor: caseNoIsInvalid === true ? 'rgb(255, 205, 205)' : '' }"
                    @input="checkLength('caseNo')" v-model="caseNoInput" type="text" id="caseNo">
                    <label for="">{{ status }}</label>
                    <select v-model="statusValue">
                        <option value="default" selected>{{ selectStatus }}</option>
                        <option v-for="(option , index) in statusOptions" :value="option.value" :key="index">{{option.label}}</option>
                    </select>
                </div>
                <!-- 右側填寫區 -->
                <div class="timeFrame">
                    <label for="date">{{ date }}</label>
                    <input v-model="dateValue" type="date" id="date">
                    <label for="startTime">{{ satrtTime }}</label>
                    <select v-model="startTimeValue" id="startTime">
                        <option value="default" selected>{{ selectStartTime }}</option>
                        <option v-for="(option , index) in timeOptions" :value="option.value" :key="index">{{option.label}}</option>
                    </select>
                    <label for="endTime">{{ endTime }}</label>
                    <select v-model="endTimeValue" id="endTime">
                        <option value="default" selected>{{ selectEndTime }}</option>
                        <option v-for="(option , index) in timeOptions" :value="option.value" :key="index">{{option.label}}</option>
                    </select>
                </div>
            </div>

            <div class="detailFrame">
                <textarea v-model="detail" maxlength="500" class="detail" name="detail" id="detail" :placeholder="detailPlaceHolder"></textarea>
            </div>

            <!-- 底部按鈕 -->
            <div class="area2">
                <RouterLink tag="button" to="/employeeHome" class="back">{{ back }}</RouterLink>
                
                <button @click="commitReq" type="button">{{ commit }}</button>
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
    overflow: hidden;

    .popup{
        position: absolute;
        bottom: -20%;
        opacity: 0;
        transition-property: bottom;
        transition-duration: 0.3s;
        transition-timing-function: cubic-bezier(0.2,1,0.3,1);
        z-index: 2;
    }
    .mask{
        position: absolute;
        background-color: rgba(255, 255, 255, 0.3);
        filter: blur(100px);
        height: 99.8vh;
        width: 100%;
        z-index: 1;
    }

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
                    transition: 0.4s;

                    &:focus{
                        background-color: rgb(227, 244, 255);
                    }
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

            //修改瀏覽器的scrollbar樣式
            ::-webkit-scrollbar {
                width: 0.5vw;
            }

            ::-webkit-scrollbar-button {
                background: transparent;
                height: 3%; //上下buffer的高度
                border-radius: 4px;
            }

            ::-webkit-scrollbar-track-piece {
                background: transparent;
            }

            ::-webkit-scrollbar-thumb {
                border-radius: 4px;
                background-color: rgba(78, 78, 78, 0.4);
                border: none;
            }

            ::-webkit-scrollbar-track {
                box-shadow: transparent;
            }
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