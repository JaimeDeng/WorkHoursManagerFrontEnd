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
    beforeCreate() {
        fetch("http://localhost/getAllEmployeeInfo")
            .then(function (response) {
                //從json轉回JS物件
                return response.json()
            })
            .then(function (data) {
                
                this.infoList = data;

                this.back = "返回";
                this.commit = "確認";
                this.popupData.backBtn = "返回";
                this.checkPopupData.backBtn = "返回";
                this.checkPopupData.confirmBtn = "確認";
                this.remove = "刪除此員工資訊";
            })
        },
    methods:{
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
    mounted(){
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
        <div class="check">
            <!-- 左側範圍 -->
            <div class="left">
                <div class="title_search">
                    <p>員工名單</p>
                    <div>
                        <label for="serch"><i class="fa-solid fa-magnifying-glass"></i></label>
                        <input id="serch" type="text" placeholder="請輸入員工ID,姓名">
                    </div>

                </div>
                <!-- 手風琴 -->
                <div class="sheet" style="overflow-y: scroll; max-height: 320px;">
                    <div class="accordion accordion-flush" id="accordionFlushExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseOne" aria-expanded="false"
                                    aria-controls="flush-collapseOne">
                                    員工ID:000929 姓名:莊員工
                                </button>
                            </h2>
                            <div id="flush-collapseOne" class="accordion-collapse collapse"
                                aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <!-- 手風琴內容區 -->
                                    <p>員工ID:<span>000929</span></p>
                                    <p>姓名:<span>莊員工</span></p>
                                    <p>主管:<span>false</span></p>
                                    <p>信箱:<span>aaa8080@gmail.com</span></p>
                                    <p>審核人員ID:</p>
                                    <button type="button">編輯</button>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseTwo" aria-expanded="false"
                                    aria-controls="flush-collapseTwo">
                                    員工ID:043929 姓名:林員工
                                </button>
                            </h2>
                            <div id="flush-collapseTwo" class="accordion-collapse collapse"
                                aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <!-- 手風琴內容區 -->
                                    <p>員工ID:<span>043929</span></p>
                                    <p>姓名:<span>林員工</span></p>
                                    <p>主管:<span>false</span></p>
                                    <p>信箱:<span>bbb7733@gmail.com</span></p>
                                    <p>審核人員ID:</p>
                                    <button type="button">編輯</button>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingThree">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseThree" aria-expanded="false"
                                    aria-controls="flush-collapseThree">
                                    員工ID:000379 姓名:王經理
                                </button>
                            </h2>
                            <div id="flush-collapseThree" class="accordion-collapse collapse"
                                aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <!-- 手風琴內容區 -->
                                    <p>員工ID:<span>000379</span></p>
                                    <p>姓名:<span>王經理</span></p>
                                    <p>主管:<span>true</span></p>
                                    <p>信箱:<span>sss333@gmail.com</span></p>
                                    <p>審核人員ID:</p>
                                    <button type="button">編輯</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 右側範圍 -->
            <div class="right">
                <div class="title">修改人員資訊</div>
                <div class="area1">
                    <button type="button" class="who">000929 莊員工</button>
                    <!-- 修改區 -->
                    <div class="edit">
                        <div>
                            <label for="">員工ID:</label>
                            <input type="text">
                        </div>
                        <div>
                            <label for="">姓名:</label>
                            <input type="text">
                        </div>
                        <div>
                            <label for="">信箱:</label>
                            <input type="email">
                        </div>
                        <!-- 主管權限 -->
                        <div>
                            <label for="">主管權限:</label>
                            <select>
                                <option selected>請選擇權限</option>
                                <option value="1">是</option>
                                <option value="2">否</option>
                            </select>
                        </div>
                    </div>
                    <button class="delete" type="button">刪除該人員資訊</button>
                </div>
                <div class="btnArea">
                    <RouterLink to="/systemHome" class="btnback">返回</RouterLink>
                    <button type="button">送出修改</button>
                </div>
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

    .check {

        width: 70%;
        height: 90%;
        display: flex;
        justify-content: space-evenly;

        //左側
        .left {
            padding: 12px;
            background-color: rgba(255, 255, 255, 0.724);
            border: 2px solid rgb(177, 208, 224);
            border-radius: 5px;
            width: 50%;

            .title_search {
                display: flex;
                width: 100%;
                justify-content: space-between;
                align-items: baseline;

                p {
                    font-size: 23px;
                    font-weight: bold;
                }

                div {
                    label {
                        position: relative;

                        i {
                            position: absolute;
                            top: -14px;
                            left: 5px;
                        }
                    }

                    input {
                        border-radius: 50px;
                        padding-left: 26px;
                        border: 1px solid #000;

                    }
                }

            }

            .sheet {
                border-radius: 5px;

                .accordion-button {
                    word-spacing: 1rem;

                    i {
                        font-size: 8px;
                        margin-bottom: 6px;
                        margin-right: 8px;
                    }

                    &:hover {
                        background-color: rgb(105, 152, 171);
                        color: white;
                    }
                }

                .accordion-body {
                    button {
                        background: rgb(26, 55, 77);
                        border: 1px solid #000;
                        color: white;
                        border-radius: 5px;
                        width: 80px;
                        margin-left: 280px;
                        font-size: 16px;

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

        //右側
        .right {
            background-color: rgba(255, 255, 255, 0.724);
            border: 2px solid rgb(177, 208, 224);
            border-radius: 5px;
            width: 35%;
            padding: 12px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            justify-content: flex-start;

            .title {
                font-size: 23px;
                font-weight: bold;

            }

            .area1 {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 18px;

                .who {
                    color: #000;
                    margin-bottom: 8px;
                    border-radius: 5px;
                    border: 1px solid #000;
                    background-color: rgb(105, 152, 171);
                }

                .edit {
                    display: flex;
                    flex-direction: column;

                    div {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }

                    label {
                        font-size: 15px;
                    }

                    select,
                    input {
                        height: 30px;
                        width: 60%;
                        margin-bottom: 8px;
                        border-radius: 5px;
                        border: 1px solid #000;
                    }
                }


            }

            .delete {
                background: rgb(141, 51, 21);
                border: 1px solid #000;
                color: white;
                border-radius: 5px;
                height: 30px;
                margin: auto;
                font-size: 16px;

                &:hover {
                    background-color: rgb(184, 68, 29);
                }

                &:active {
                    transform: scale(0.95);
                }
            }

            .btnArea {
                display: flex;
                justify-content: space-between;
                align-items: end;
                width: 100%;
                height: 100%;

                .btnback {
                    background: rgb(26, 55, 77);
                    border: 1.5px solid #000;
                    color: white;
                    border-radius: 5px;
                    padding: 4px;
                    font-size: 18px;
                    margin-top: 50px;
                    text-decoration: none;

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


}
</style>