<script>
import { RouterLink } from 'vue-router'
import popup from './popup.vue'
import checkPopup from './checkPopup.vue'
export default {
components: {
    RouterLink,
    popup,
    checkPopup
},
data(){
    return{
        //props傳來的變數 , 直接宣告一樣的名稱在data()內
        showPopup: false,
        popupData: {
            title: "Popup Title",
            content: "Popup Content",
            backBtn: 'back',
        },
        showCheckPopup: false,
        checkPopupData: {
            title: "Popup Title",
            content: "Popup Content",
            backBtn: 'back',
            confirmBtn: 'confirm'
        },
        message: '',
        //帳戶資訊
        name:'',
        employeeId:'',
        accountId:'',
        //語言
        langValue:'ch',
        //未分類CaseInfo
        caseInfo:[],
        //已分類CaseInfo
        sortCaseInfoByModel:[],
        //modelList
        modelList:[],
        //PRList
        prList:[],
        prModelList:[],
        //渲染完成
        hasRendered:false,
        //綁定變數
        goalNum:0,
        modelSelect:'default',
        selectedModel:'尚未選擇',
        selectedModelsGoal:'尚無目標',
        newModel:'',
        //存取狀態
        success:false
    }
},
methods:{
    closePopup() {
        this.showPopup = false;
        if(this.success === true){
            this.$emit('addSuccess');
        }
    },
    closeCheckPopup() {
        this.showCheckPopup = false;
    },
    checkPopup(){
        if (this.langValue === 'ch') {
            this.checkPopupData.title = "警告";
        } else if (this.langValue === 'en') {
            this.checkPopupData.title = "注意";
        } else if (this.langValue === 'jp') {
            this.checkPopupData.title = "Warning";
        }
        this.checkPopupData.content = "您即將刪除此機型目標資訊 , 確定刪除?";
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
        this.success = true;
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
        this.success = false;
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
    fetchPRInfo() {

        fetch("http://localhost:3000/getAllPerformanceReferences", {
        method: "get",
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        }).then(res => res.json())
        .then((data) => {
            console.log(data);
            this.prList = data.performanceReferenceList;
            this.prList.forEach((pr) => {
                if(!this.prModelList.includes(pr.model)){
                    this.prModelList.push(pr.model);
                }
            })
            this.hasRendered = true;
        })
        .catch(err => console.log(err))
    },
    checkModelsGoalNum(selectedModel){
        this.prList.forEach((prInfo) => {
            if(prInfo.model === selectedModel){
                if(prInfo.rating === null){
                    this.selectedModelsGoal = '尚無目標';
                }else{
                    this.selectedModelsGoal = prInfo.rating;
                }
                return;
            }
        })
    },
    commitReq(){
        let goalNum = this.goalNum.toString() + "H";
        console.log(this.modelSelect);
        if(this.goalNum < 1){
            this.message = "目標不可設定小於1小時";
            this.errorPopup();
        }else{
            fetch("http://localhost:3000/editPerformanceReference", {
            method: "put",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({model : this.modelSelect , rating : goalNum}),
            }).then(res => res.json())
            .then((data) => {
                if(data.success === true){
                    this.message = data.message;
                    this.successPopup();
                }else{
                    this.message = data.message;
                    this.errorPopup();
                }
            })
            .catch(err => console.log(err))
        }
    },
    addNewModel(){
        if(this.newModel === ''){
            this.message = "請輸入機型";
            this.errorPopup();
        }else{
            fetch("http://localhost:3000/setPerformanceReference", {
            method: "post",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({model : this.newModel}),
            }).then(res => res.json())
            .then((data) => {
                if(data.success === true){
                    this.message = data.message;
                    this.successPopup();
                }else{
                    this.message = data.message;
                    this.errorPopup();
                }
            })
            .catch(err => console.log(err))
        }      
    },
    deleteModelCheck(){
        this.checkPopup();
    },
    deleteModel(){
        fetch("http://localhost:3000/deletePerformanceReference", {
            method: "post",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({model : this.modelSelect}),
            }).then(res => res.json())
            .then((data) => {
                if(data.success === true){
                    this.message = data.message;
                    this.closeCheckPopup();
                    this.successPopup();
                }else{
                    this.message = data.message;
                    this.closeCheckPopup();
                    this.errorPopup();
                }
            })
            .catch(err => console.log(err))
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
    this.fetchPRInfo();
    this.getCaseInfoByEmployeeId();
},
mounted(){

},
watch: {
    modelSelect(selected){
        this.goalNum = 0;
        if(selected === 'default'){
            this.selectedModel = '尚未選擇';
        }else{
            this.selectedModel = selected;
        }

        this.checkModelsGoalNum(selected);
    }
}
}
</script>
<template>
    <div class="main">
        <!--子元件要使用v-model綁定props變數 , 綁定命名的部分使用橫槓命名規則-->
        <popup ref="popup" class="popup" :popup-data="popupData" :show-popup="showPopup" @close="closePopup"></popup>
        <checkPopup ref="checkPopup" class="checkPopup" :checkPopup-data="checkPopupData" :show-checkPopup="showCheckPopup" 
        @close="closeCheckPopup" @confirm="deleteModel"></checkPopup>
        <div v-if="showPopup || showCheckPopup" ref="mask" class="mask"></div>

        <div v-if="hasRendered" class="outerFrame">
            <div class="selectFrame">
                <h4 class="selectTitle">選擇您要設定目標的機型</h4>
                <select v-model="modelSelect" class="form-select" size="3" aria-label="size 3 select example">
                    <option value="default" selected>選擇設定目標機型</option>
                    <option v-for="(model , index) in prModelList" :value="model" :key="index">{{model}}</option>
                </select>
                <h4 class="addTitle">手動新增機型</h4>
                <div class="addNewModelFrame">
                    <input v-model="newModel" class="newModel" id="newModel" type="text">
                    <button @click="addNewModel" class="addNewModel" id="addNewModel"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>

            <div class="inputFrame">
                <h3 :style="{color : this.modelSelect === 'default' ? 'rgb(20, 12, 12)' : ''}" class="modelTitle">{{ selectedModel }}</h3>
                <h4 v-if="this.modelSelect !== 'default'" class="modelsGoal">此機型目標: {{ selectedModelsGoal }}</h4>
                <label v-if="this.modelSelect !== 'default'" for="goalNum"><i class="fa-solid fa-flag-checkered"></i> 設定目標時數</label>
                <div v-if="this.modelSelect !== 'default'" class="goalNumFrame">
                    <input v-model="goalNum" :disabled="this.modelSelect === 'default'" class="goalNum" id="goalNum" type="number"><p class="H">H</p>
                </div>

                <button v-if="this.modelSelect !== 'default'" @click="deleteModelCheck" class="deleteModel" id="deleteModel">刪除此機型</button>

                <button v-if="this.modelSelect !== 'default'" @click="commitReq" class="commit" id="commit">設定</button>
            </div>

            <router-link scoped-slot="button" class="btnback" to="/WorkNeuro">返回WorkNeuro主頁</router-link>
        </div>
        <!--spinner在list還沒渲染好時顯示-->
        <div v-else class="spinner-border text-light" role="status"></div>

        <!-- <RouterLink to="/login"><button class="btnback" type="button">返回登入頁</button></RouterLink> -->
    </div>
</template>


<style lang="scss" scoped>
.main {
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    z-index: -1;

    .checkPopup{
        position: absolute;
        bottom: -20%;
        opacity: 0;
        transition-property: bottom;
        transition-duration: 0.3s;
        transition-timing-function: cubic-bezier(0.2,1,0.3,1);
        z-index: 2;
    }
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

    .text-light{
        font-size: 4rem;
        width: 5rem;
        height: 5rem;
    }
    .outerFrame {
        display: flex;
        position: relative;
        width: 50%;
        height: 90%;
        border-radius: 2vh;
        border: 0.2vh solid rgb(54, 50, 73);
        background-color: rgba(83, 83, 83, 0.3);

        .selectFrame{
            height: 100%;
            width: 40%;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;

            .selectTitle{
                width: 100%;
                margin-top: 30%;
                font-size: 2.5vh;
                white-space: nowrap;
                color: white;
            }
            .form-select{
                overflow: auto;
                height: 50%;
                width: 70%;
                background-color: rgba(233, 233, 233, 0.7);

                option{
                    transition: 0.3s;
                }
            }
            .addTitle{
                width: 100%;
                margin-top: 10%;
                font-size: 2.5vh;
                white-space: nowrap;
                color: white;
            }
            .addNewModelFrame{
                .newModel{
                    height: 4vh;
                    width: 10vw;
                    padding: 0.5vh 0.5vw;
                    outline: none;
                    border-radius: 1vh;
                    color: rgb(2, 2, 2);
                    transition: 0.5s;
                    background-color: rgba(255, 255, 255, 0.8);
                }
                .addNewModel{
                    background-color: rgba(131, 121, 143, 0.6);
                    width: max-content;
                    padding: 0 0.7vw;
                    height: 3.5vh;
                    border: none;
                    color: white;
                    font-weight: 600;
                    border-radius: 1vh;
                    font-size: 1.5vh;
                    text-decoration: none;
                    margin-top: 3%;
                    transition: 0.4s;

                    &:hover {
                        background-color: rgba(196, 193, 200, 0.6);
                        color:rgb(59, 52, 44);
                    }

                    &:active {
                        scale: 0.95;
                    }
                }         
            }
        }

        .inputFrame{
            position: relative;
            height: 100%;
            width: 70%;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;

            .modelTitle{
                color: white;
                background-color: rgba(179, 221, 255, 0.2);
                border-radius: 1vh;
                box-shadow: 0px 0px 10px 10px rgba(82, 82, 82, 0.5);
                padding: 0 1vw;
                font-size: 4vh;
                margin-top: 20%;
            }

            .modelsGoal{
                color: white;
                background: linear-gradient(to right, rgba(133, 151, 164, 0.7), rgba(164, 147, 198, 0.7));
                border-radius: 1vh;
                padding: 0 1vw;
                margin-top: 10%;
                font-size: 3vh;
            }
            
            label{
                margin-top: 5%;
                color: white;
                font-size: 2vh;
            }

            .goalNumFrame{
                position: relative;
                .goalNum{
                    height: 4vh;
                    width: 7vw;
                    padding: 0.5vh 0.5vw;
                    outline: none;
                    border-radius: 1vh;
                    color: white;
                    transition: 0.5s;
                    background-color: rgba(192, 192, 192, 0.5);

                    &:disabled{
                        background-color: rgba(33, 33, 33, 0.5);
                    }
                }
                .H{
                    position: absolute;
                    right: -20%;
                    top: 50%;
                    transform: translateY(-50%);
                    color: white;
                    font-size: 2vh;
                }
                
            }

            .deleteModel{
                background-color: rgba(188, 78, 78, 0.6);
                width: max-content;
                padding: 0 0.7vw;
                height: 3.5vh;
                border: none;
                color: white;
                font-weight: 600;
                border-radius: 1vh;
                font-size: 1.5vh;
                text-decoration: none;
                margin-top: 15%;
                transition: 0.4s;

                &:hover {
                    background-color: rgba(175, 39, 39, 0.6);
                }

                &:active {
                    scale: 0.95;
                }
            }

            .commit{
                margin-top: 10%;
                background-color: rgba(131, 121, 143, 0.6);
                width: max-content;
                padding: 0 1vw;
                height: 3.5vh;
                border: none;
                color: white;
                font-weight: 600;
                border-radius: 1vh;
                font-size: 1.8vh;
                text-decoration: none;
                transition: 0.4s;

                &:hover {
                    background-color: rgba(196, 193, 200, 0.6);
                    color:rgb(59, 52, 44);
                }

                &:active {
                    scale: 0.95;
                }
            }
        }
        

        .btnback {
            position: absolute;
            bottom: 5%;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(to right, rgba(133, 151, 164, 0.7), rgba(164, 147, 198, 0.7));
            width: max-content;
            padding: 0 1vw;
            height: 4vh;
            border: 1px solid rgba(91, 80, 112, 0.8);
            color: white;
            font-weight: 600;
            border-radius: 1vh;
            font-size: 1.8vh;
            text-decoration: none;
            transition: 0.4s;

            &:hover {
                background-color: rgb(218, 218, 218);
            }

            &:active {
                scale: 0.95;
            }
        }

    }

}
</style>
