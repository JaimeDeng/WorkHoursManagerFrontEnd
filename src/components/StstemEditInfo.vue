<script>
import { RouterLink, RouterView } from 'vue-router'
import popup from './popup.vue'
import checkPopup from './checkPopup.vue'
export default (await import('vue')).defineComponent({
    components: {
        RouterLink,
        popup,
        checkPopup
    },
    data() {
        return {
            //props傳來的變數 , 直接宣告一樣的名稱在data()內
            showPopup: false,
            popupData: {
                title: "Popup Title",
                content: "Popup Content",
                backBtn: 'back'
            },
            showCheckPopup: false,
            checkPopupData: {
                title: "Popup Title",
                content: "Popup Content",
                backBtn: 'back',
                confirmBtn: 'confirm'
            },
            //Parmas傳來的參數值
            sysEditEmployeeInfo: "",
            //帳號相關
            employeeName: "",
            employeeId: "",
            accountId: "",
            //文本
            addTitle: "",
            name: "姓名",
            gender: "性別",
            genderValue: 'default',
            genderselect: "請選擇性別",
            genderOptions: [
                { label: "男", value: "男" },
                { label: "女", value: "女" }],
            email: "信箱",
            department: "部門",
            departmentSelect: "請選擇部門",
            departmentValue: 'default',
            departmentOptions: [
                { label: "管理部", value: "管理部" },
                { label: "IT部", value: "IT部" },
                { label: "營業部", value: "營業部" },
                { label: "製造部", value: "製造部" }],

            position: "職稱",
            level: "職等",
            levelValue: 'default',
            levelSelect: "請選擇職等",
            levelOptions: [
                { label: "一般", value: "一般" },
                { label: "高級", value: "高級" },
                { label: "課長", value: "課長" },
                { label: "副理", value: "副理" },
                { label: "經理", value: "經理" },
                { label: "總經理", value: "總經理" },
                { label: "系統管理員", value: "系統管理員" }],
            supervisor: "主管ID",
            phone: "電話",
            back: "返回",
            remove: "刪除工時表",
            commit: "新增",
            langValue: 'ch',
            nameInput: '',
            emailInput: '',
            positionInput: '',
            supervisorInput: '',
            phoneInput: "",
            modelIsInvalid: false,
            caseNoIsInvalid: false,
            getMessage: "",
            editMessage: "",
            deleteMessage: "",
            timeOptions: [],
            hasRendered: false,

            //resp
            getResp: [],
            editResp: [],
            deleteResp: []
        }
    },
    methods: {
        changeLanguage() {
            if (this.langValue === 'en') {
                this.addTitle = "Edit Employee Info";
                this.name = "Name";
                this.gender = "Gender";
                this.genderselect = "Choose your gender"
                this.email = "Email";
                this.department = "Department";
                this.departmentSelect = "Choose your department"
                this.position = "Position";
                this.level = "Level";
                this.levelSelect = "Choose your level"
                this.supervisor = "Supervisor ID";
                this.phone = "Phone";

                this.back = "Back";
                this.commit = "Commit";
                this.popupData.backBtn = "Back";
                this.checkPopupData.backBtn = "Back";
                this.checkPopupData.confirmBtn = "confirm";
                this.remove = "Delete Employee Info";
            } else if (this.langValue === 'jp') {
                this.addTitle = "人員情報編集";
                this.name = "名前";
                this.gender = "性別";
                this.genderselect = "性別を選択してください"
                this.email = "メール";
                this.department = "部署";
                this.departmentSelect = "部署を選択してください"
                this.position = "職名";
                this.level = "職級";
                this.levelSelect = "職級を選択してください"
                this.supervisor = "主管ID";
                this.phone = "電話番号";

                this.back = "戻る";
                this.commit = "編集";
                this.popupData.backBtn = "戻る";
                this.checkPopupData.backBtn = "戻る";
                this.checkPopupData.confirmBtn = "確認";
                this.remove = "人員情報を削除";
            } else if (this.langValue === 'ch') {
                this.addTitle = "編輯人員資訊";
                this.name = "姓名";
                this.gender = "性別";
                this.genderselect = "請選擇性別"
                this.email = "信箱";
                this.department = "部門";
                this.departmentSelect = "請選擇部門"
                this.position = "職稱";
                this.level = "職等";
                this.levelSelect = "請選擇職等"
                this.supervisor = "主管ID";
                this.phone = "電話";

                this.back = "返回";
                this.commit = "確認";
                this.popupData.backBtn = "返回";
                this.checkPopupData.backBtn = "返回";
                this.checkPopupData.confirmBtn = "確認";
                this.remove = "刪除此員工資訊";
            }
        },
        checkLength(input) {
            if (input === 'caseNo') {
                if (this.caseNoInput.length <= 1) {
                    this.caseNoIsInvalid = true;
                } else {
                    this.caseNoIsInvalid = false;
                }
            }
            if (input === 'model') {
                if (this.modelInput.length <= 1) {
                    this.modelIsInvalid = true;
                } else {
                    this.modelIsInvalid = false;
                }
            }
        },
        fetchWorkHoursInfoById() {
            let reqbody = {
                employeeId: this.sysEditEmployeeInfo
            };
            console.log(reqbody);
            fetch("http://localhost:3000/getEmployeeInfoById", {
                method: "put",
                body: JSON.stringify(reqbody),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(res => res.json())
                .then((data) => {
                    this.getResp = data;
                    console.log(this.getResp);
                    this.nameInput = this.getResp.name;
                    this.genderValue = this.getResp.gender;
                    this.emailInput = this.getResp.email;
                    this.departmentValue = this.getResp.department;
                    this.positionInput = this.getResp.position;
                    this.levelValue = this.getResp.level;
                    this.supervisorInput = this.getResp.supervisor;
                    this.phoneInput = this.getResp.phone;
                    this.hasRendered = true;
                })
                .catch(err => console.log(err))
        },
        commitReq() {

            if (this.nameInput.toString() === this.getResp.name && this.genderValue.toString() === this.getResp.gender
                && this.emailInput.toString() === this.getResp.email && this.departmentValue.toString() === this.getResp.department
                && this.positionInput.toString() === this.getResp.position && this.levelValue.toString() === this.getResp.level &&
                this.supervisorInput === this.getResp.supervisor && this.phoneInput.toString() === this.getResp.phone) {
                if (this.langValue === 'ch') {
                    this.editMessage = "資料尚未進行任何修改";
                } else if (this.langValue === 'en') {
                    this.editMessage = "No modifications have been made to the data yet.";
                } else if (this.langValue === 'jp') {
                    this.editMessage = "データはまだ変更されていません。";
                }

                this.errorPopup(this.editMessage);
                return;
            }
            //如果是default轉成null給後端才能正確做判斷
            let genderV = this.genderValue;
            if (genderV === "default") {
                genderV = null;
            }
            let dPM = this.departmentValue;
            if (dPM === "default") {
                dPM = null;
            }
            let levelV = this.levelValue;
            if (levelV === "default") {
                levelV = null;
            }
            let reqbody = {
                employeeId: this.sysEditEmployeeInfo,
                name: this.nameInput,
                gender: this.genderValue,
                department: this.departmentValue,
                position: this.positionInput,
                level: this.levelValue,
                email: this.emailInput,
                phone: this.phoneInput,
                supervisor: this.supervisorInput
            };
            console.log(reqbody);
            fetch("http://localhost:3000/editEmployeeInfo", {
                method: "put",
                body: JSON.stringify(reqbody),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(res => res.json())
                .then((data) => {
                    this.editResp = data;
                    console.log(this.editResp);
                    if (data.success === true) {
                        this.editMessage = this.editResp.message;
                        this.successPopup(this.editMessage);
                    } else {
                        this.editMessage = this.editResp.message;
                        this.errorPopup(this.editMessage);
                    }
                })
                .catch(err => console.log(err))
        },
        confirmRemove() {
            if (this.langValue === 'ch') {
                this.checkPopupData.title = "警告";
                this.checkPopupData.content = "您即將刪除此人員資訊 , 刪除後無法復原";
            } else if (this.langValue === 'en') {
                this.checkPopupData.title = "Warning";
                this.checkPopupData.content = "You are about to delete this personnel information, and it cannot be recovered once deleted.";
            } else if (this.langValue === 'jp') {
                this.checkPopupData.title = "注意";
                this.checkPopupData.content = "削除後は元に戻すことはできません。"
            }

            this.showCheckPopup = true;
            setTimeout(() => {
                let checkPopup = this.$refs.checkPopup;
                console.log(checkPopup);
                let checkPopupEl = checkPopup.$el;
                let checkPopupIcon = checkPopupEl.querySelector("i");
                console.log(checkPopupIcon);
                let iconStr1 = "fa-solid";
                let iconStr2 = "fa-triangle-exclamation";
                checkPopupIcon.classList.add(iconStr1);
                checkPopupIcon.classList.add(iconStr2);
                checkPopupIcon.style.color = "#ae3737";
                console.log(checkPopupIcon);
                checkPopup.$el.style.opacity = "1";
                checkPopup.$el.style.bottom = "0%";
            }, 100);
        },
        removeReq() {
            this.showCheckPopup = false;
            let reqbody = {
                employeeId: this.sysEditEmployeeInfo,

            };
            console.log(reqbody);
            fetch("http://localhost:3000/deleteEmployeeInfo", {
                method: "POST",
                body: JSON.stringify(reqbody),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(res => res.json())
                .then((data) => {
                    console.log(this.sysEditEmployeeInfo);
                    this.deleteResp = data;
                    console.log(this.deleteResp);
                    if (data.success === true) {
                        if (this.langValue === 'ch') {
                            this.successPopup("刪除成功");
                        } else if (this.langValue === 'en') {
                            this.successPopup("Deletion completed.");
                        } else if (this.langValue === 'jp') {
                            this.successPopup("削除成功");
                        }

                    } else {
                        this.deleteMessage = this.deleteResp.message;
                        if (this.langValue === 'ch') {
                            this.errorPopup("刪除失敗");
                        } else if (this.langValue === 'en') {
                            this.errorPopup("Delete failed.");
                        } else if (this.langValue === 'jp') {
                            this.errorPopup("削除が失敗しました。");
                        }

                    }
                })
                .catch(err => console.log(err))
        },
        closePopup() {
            this.showPopup = false;
            this.popupData.title = "";
            this.popupData.content = "";
            if (this.editResp.success || this.deleteResp.success) {
                this.$router.push('/sysCheckAllEmploInfo');
            }
        },
        closeCheckPopup() {
            this.showCheckPopup = false;
        },
        successPopup(message) {
            if (this.langValue === 'ch') {
                this.popupData.title = "成功";
            } else if (this.langValue === 'en') {
                this.popupData.title = "Success";
            } else if (this.langValue === 'jp') {
                this.popupData.title = "追加完了";
            }
            this.popupData.content = message;
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
            this.$emit('editWorkInfoSuccess');
        },
        errorPopup(message) {
            if (this.langValue === 'ch') {
                this.popupData.title = "錯誤";
            } else if (this.langValue === 'en') {
                this.popupData.title = "Failure";
            } else if (this.langValue === 'jp') {
                this.popupData.title = "エラー";
            }
            this.popupData.content = message;
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
        console.log(this.$route.params.sysEditEmployeeInfo);
        //將傳來的參數值賦值給自己的變數
        this.sysEditEmployeeInfo = this.$route.params.sysEditEmployeeInfo;
        this.fetchWorkHoursInfoById();
        //獲取帳號資訊
        this.employeeId = sessionStorage.getItem("employeeId")
        if (this.employeeId === null) {
            this.employeeId = localStorage.getItem("employeeId");
        }
        this.employeeName = sessionStorage.getItem("employeeName")
        if (this.employeeName === null) {
            this.employeeName = localStorage.getItem("employeeName");
        }
        this.accountId = sessionStorage.getItem("accountId")
        if (this.accountId === null) {
            this.accountId = localStorage.getItem("accountId");
        }
        //檢查及修改介面語言
        this.langValue = sessionStorage.getItem('langValue');
        if (this.langValue === null) {
            this.langValue = 'ch';
        }
        console.log(this.langValue);
        this.changeLanguage();
        //建構時間option
        let time = "";
        let hours = 0;
        let minutes = "00";
        let count = 1;
        while (count < 50) {
            if (hours < 10) {
                time = "0" + hours.toString() + ":" + minutes;
            } else {
                time = hours.toString() + ":" + minutes;
            }
            if (minutes === "00") {
                minutes = "30";
            } else {
                minutes = "00";
            }
            this.timeOptions.push({ label: time, value: time });
            if (count % 2 === 0) {
                hours++;
            }
            count++;
        };
    }
})
</script>
<template>
    <div class="main">

        <!--子元件要使用v-model綁定props變數 , 綁定命名的部分使用橫槓命名規則-->
        <popup ref="popup" class="popup" :popup-data="popupData" :show-popup="showPopup" @close="closePopup"></popup>
        <checkPopup ref="checkPopup" class="checkPopup" :checkPopup-data="checkPopupData" :show-checkPopup="showCheckPopup"
            @close="closeCheckPopup" @confirm="removeReq"></checkPopup>
        <div v-if="showPopup || showCheckPopup" ref="mask" class="mask"></div>

        <div v-if="hasRendered" class="add">
            <button class="removeBtn" @click="confirmRemove" type="button">{{ remove }} <i
                    class="fa-solid fa-delete-left"></i></button>
            <h4>{{ addTitle }}</h4>
            <h5>{{ date }}</h5>
            <!-- 填寫區 -->
            <div class="area1">
                <!-- 左側填寫區 -->
                <div class="info">
                    <!-- 姓名 -->
                    <label for="caseNo">{{ name }}</label>
                    <input :style="{ backgroundColor: caseNoIsInvalid === true ? 'rgb(255, 205, 205)' : '' }"
                        @input="checkLength('caseNo')" v-model="nameInput" type="text" id="caseNo">
                    <!-- 性別 -->
                    <label for="">{{ gender }}</label>
                    <select v-model="genderValue">
                        <option value="default" selected>{{ genderselect }}</option>
                        <option v-for="(option, index) in genderOptions" :value="option.value" :key="index">
                            {{ option.label }}</option>
                    </select>
                    <!-- 信箱 -->
                    <label for="model">{{ email }}</label>
                    <input :style="{ backgroundColor: modelIsInvalid === true ? 'rgb(255, 205, 205)' : '' }"
                        @input="checkLength('model')" v-model="emailInput" type="text" id="model">
                    <!-- 部門 -->
                    <label for="">{{ department }}</label>
                    <select v-model="departmentValue">
                        <option value="default" selected>{{ departmentSelect }}</option>
                        <option v-for="(option, index) in departmentOptions" :value="option.value" :key="index">
                            {{ option.label }}</option>
                    </select>


                </div>
                <!-- 右側填寫區 -->
                <div class="timeFrame">
                    <!-- 職稱 -->
                    <label for="caseNo">{{ position }}</label>
                    <input :style="{ backgroundColor: caseNoIsInvalid === true ? 'rgb(255, 205, 205)' : '' }"
                        @input="checkLength('caseNo')" v-model="positionInput" type="text" id="caseNo">
                    <!-- 職等 -->
                    <label for="">{{ level }}</label>
                    <select v-model="levelValue">
                        <option value="default" selected>{{ levelSelect }}</option>
                        <option v-for="(option, index) in levelOptions" :value="option.value" :key="index">{{ option.label
                        }}
                        </option>
                    </select>
                    <!-- 主管ID -->
                    <label for="model">{{ supervisor }}</label>
                    <input :style="{ backgroundColor: modelIsInvalid === true ? 'rgb(255, 205, 205)' : '' }"
                        @input="checkLength('model')" v-model="supervisorInput" type="text" id="model">
                    <!-- 電話 -->
                    <label for="model">{{ phone }}</label>
                    <input :style="{ backgroundColor: modelIsInvalid === true ? 'rgb(255, 205, 205)' : '' }"
                        @input="checkLength('model')" v-model="phoneInput" type="text" id="model">
                </div>
            </div>


            <!-- 底部按鈕 -->
            <div class="area2">
                <RouterLink tag="button" to="/sysCheckAllEmploInfo" class="back">{{ back }}</RouterLink>

                <button @click="commitReq" type="button">{{ commit }}</button>
            </div>
        </div>
        <div v-else class="spinner-border text-light" role="status"></div>

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

    .checkPopup {
        position: absolute;
        bottom: -20%;
        opacity: 0;
        transition-property: bottom;
        transition-duration: 0.3s;
        transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
        z-index: 2;
    }

    .popup {
        position: absolute;
        bottom: -20%;
        opacity: 0;
        transition-property: bottom;
        transition-duration: 0.3s;
        transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
        z-index: 2;
    }

    .mask {
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

        .removeBtn {
            position: absolute;
            top: 0;
            left: 0;
            background: rgb(109, 35, 35);
            border: none;
            color: white;
            border-radius: 10px 0px 20px 0px;
            width: max-content;
            height: 4vh;
            padding-left: 1%;
            padding-right: 2%;
            font-size: 1.5vh;
            transition: 0.4s;
            overflow: hidden;

            &:hover {
                background-color: rgb(62, 16, 16);
            }

            &:active {
                transform: scale(0.97);
            }
        }

        h4 {
            margin-top: 2%;
            margin-bottom: 3vh;
            font-size: 4vh;
            font-weight: bold;
        }

        h5 {
            font-size: 2.7vh;
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

                label {
                    font-size: 2vh;
                }

                input,
                select {
                    font-size: 1.5vh;
                    height: 3.5vh;
                    width: 10vw;
                    margin-bottom: 8px;
                    border-radius: 5px;
                    border: 1px solid #000;
                    transition: 0.4s;

                    &:focus {
                        background-color: rgb(227, 244, 255);
                    }
                }

            }

            .timeFrame {
                display: flex;
                flex-direction: column;

                label {
                    font-size: 2vh;
                }

                input,
                select {
                    font-size: 1.5vh;
                    margin-bottom: 8px;
                    height: 3.5vh;
                    width: 10vw;
                    border-radius: 5px;
                    border: 1px solid #000;

                }
            }
        }

        .detailFrame {
            position: relative;
            height: 20%;
            width: 50%;

            label {
                font-size: 2vh;
            }

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

            .detail {
                padding: 0.5vh 0.3vw;
                font-size: 1.5vh;
                height: 100%;
                width: 100%;
                border-radius: 10px;
                resize: none;
                margin: auto;
                overflow: auto;
                border: 1px solid #000;
            }
        }

        .area2 {
            display: flex;
            justify-content: space-between;
            width: 40%;
            padding: 0 1vw;
            margin-top: 6%;

            .back {
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
                border: 1px solid #000;
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

    .text-light {
        font-size: 4rem;
        width: 5rem;
        height: 5rem;
    }


}
</style>