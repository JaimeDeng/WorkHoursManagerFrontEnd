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
            employeeInfo:[],

            //props傳來的變數 , 直接宣告一樣的名稱在data()內
            showPopup: false,
            popupData: {
                title: "Popup Title",
                content: "Popup Content",
                backBtn: "返回"
            },
            id : "",
            name : "",
            gender : "default",
            email : "",
            department : "default",
            position : "",
            level : "default",
            supervisor : "",
            phone : "",
            message : "none",
            isInputInvalid : 0,
            //切換語言相關
            langValue : 'ch',
            employeeIdStr : '',
            employeeIdPHStr : '',
            nameStr:'',
            namePHStr : '',
            genderStr : '',
            emailStr:'',
            emailPHStr :'',
            departmentStr:'',
            positionStr:'',
            positionPHStr:'',
            levelStr:'',
            levelPHStr:'',
            supervisorStr:'',
            supervisorPHStr:'',
            phoneStr:'',
            phonePHStr:'',
            addBtnStr : '',
            returnBtnStr : '',
            //職等選項
            levelOptions:[
                {label : "一般" , value : "一般"},
                {label : "高級" , value : "高級"},
                {label : "課長" , value : "課長"},
                {label : "副理" , value : "副理"},
                {label : "經理" , value : "經理"},
                {label : "總經理" , value : "總經理"},
                {label : "系統管理員" , value : "系統管理員"}],
        }
    },
    methods:{
        changeLanguage(){
        if(this.langValue === 'en'){
            this.employeeIdStr = 'Employee ID';
            this.employeeIdPHStr = 'Please input employee ID';
            this.nameStr='Name';
            this.namePHStr='Please input the name';
            this.genderStr='Gender';
            this.emailStr='Email';
            this.emailPHStr='Please input the email';
            this.departmentStr='Department';
            this.positionStr='Position';
            this.positionPHStr='Please input the position';
            this.levelStr='Level';
            this.levelPHStr='Please select level';
            this.supervisorStr='SupervisorID'
            this.supervisorPHStr='Please input supervisorID';
            this.phoneStr='Phone';
            this.phonePHStr='Please input phone number(7~10)';
            this.addBtnStr='Create'
            this.returnBtnStr='Back'
            this.popupData.backBtn = 'Back'
        }else if(this.langValue === 'ch'){
            this.employeeIdStr = '員工ID';
            this.employeeIdPHStr = '請輸入員工ID';
            this.nameStr='姓名';
            this.namePHStr='請輸入員工姓名';
            this.genderStr='性別';
            this.emailStr='信箱';
            this.emailPHStr='請輸入信箱';
            this.departmentStr='部門';
            this.positionStr='職稱';
            this.positionPHStr='請輸入職稱';
            this.levelStr='職等';
            this.levelPHStr='請選擇職等';
            this.supervisorStr='主管ID'
            this.supervisorPHStr='請輸入主管ID';
            this.phoneStr='電話';
            this.phonePHStr='請輸入電話(7-10碼)';
            this.addBtnStr='新增'
            this.returnBtnStr='返回'
            this.popupData.backBtn = '返回';
        }else if(this.langValue === 'jp'){
            this.employeeIdStr = '社員番号';
            this.employeeIdPHStr = '社員番号を入力してください';
            this.nameStr='名前';
            this.namePHStr='お名前を入力してください';
            this.genderStr='性別';
            this.emailStr='メール';
            this.emailPHStr='メールを入力してください';
            this.departmentStr='部署';
            this.positionStr='職名';
            this.positionPHStr='職名を入力してください';
            this.levelStr='職級';
            this.levelPHStr='職級を選択してください';
            this.supervisorStr='主管ID'
            this.supervisorPHStr='主管IDを入力してください';
            this.phoneStr='電話番号';
            this.phonePHStr='電話番号を入力してください(7~10)';
            this.addBtnStr='追加';
            this.returnBtnStr='戻る';
            this.popupData.backBtn = '戻る';
        }
    },
        addInfo(){
        let error = false;

        let emailPattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let phonePattern =/^[0-9]{7,10}$/;
        if(this.id.length === 0){
            if(this.langValue === 'ch'){
                this.message = "請輸入員工ID欄位";
            }else if(this.langValue === 'en'){
                this.message = "You haven't filled in employee ID field yet";
            }else if(this.langValue === 'jp'){
                this.message = "社員番号欄を入力してください";
            }
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }
        if(this.name.length === 0){
            if(this.langValue === 'ch'){
                this.message = "請輸入姓名";
            }        
            else if(this.langValue === 'en'){
                this.message = "You haven't filled in name field yet";
            }else if(this.langValue === 'jp'){
                this.message = "お名前欄を入力してください";
            }
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }
        if(this.gender==="default"){
            if(this.langValue === 'ch'){
                this.message = "請選擇性別";
            }
            else if(this.langValue === 'en'){
                this.message = "You haven't filled in gender field yet";
            }else if(this.langValue === 'jp'){
                this.message = "性別欄を入力してください";
            }
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }
        if(this.email.length === 0){
            if(this.langValue === 'ch'){
                this.message = "請輸入信箱";
            }
            else if(this.langValue === 'en'){
                this.message = "You haven't filled in email field yet";
            }else if(this.langValue === 'jp'){
                this.message = "メール欄を入力してください";
            }
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }
        if(!emailPattern.test(this.email)){
            if(this.langValue === 'ch'){
                this.message = "信箱格式錯誤";
            }
            else if(this.langValue === 'en'){
                this.message = "Email format is not correct";
            }else if(this.langValue === 'jp'){
                this.message = "メールの形式が正しくありません";
            }
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }

        if(this.department==="請選擇部門"||this.department==="default"){
            this.message = "請選擇部門";
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }
        if(this.department==="Please choose the positon"||this.department==="default"){
            this.message = "Please choose the positon";
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }
        if(this.department==="部署名を選択してください"||this.department==="default"){
            this.message = "部署名を選択してください";
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }
        
        if(this.position.length === 0){
            if(this.langValue === 'ch'){
                this.message = "請輸入職稱";
            }
            else if(this.langValue === 'en'){
                this.message = "You haven't filled in position field yet";
            }else if(this.langValue === 'jp'){
                this.message = "職名欄を入力してください";
            }
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }
        if(this.level==="default"){
            this.message = "請選擇職等";
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }
        if(this.level==="default"){
            this.message = "Please select the level";
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }
        if(this.level==="default"){
            this.message = "職級を選択してください";
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }
        if(this.phone.length === 0){
            if(this.langValue === 'ch'){
                this.message = "請輸入電話";
            }
            else if(this.langValue === 'en'){
                this.message = "You haven't filled in phone field yet";
            }else if(this.langValue === 'jp'){
                this.message = "電話番号欄を入力してください";
            }       
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }
        if(!phonePattern.test(this.phone)){
            if(this.langValue === 'ch'){
                this.message = "電話格式錯誤";
            }
            else if(this.langValue === 'en'){
                this.message = "Phone format is not correct";
            }else if(this.langValue === 'jp'){
                this.message = "電話番号の形式が正しくありません";
            }     
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }

        let reqbody = {
            employeeId : this.id,
            name: this.name,
            gender: this.gender,
            email: this.email,
            department: this.department,
            position: this.position,
            level: this.level,
            supervisor: this.supervisor,
            phone: this.phone
        };
        console.log(reqbody);
        fetch("http://localhost:3000/setEmployeeInfo" ,{
            method:"post",
            body: JSON.stringify(reqbody),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(res => res.json())
        .then((data)=>{
            this.employeeInfo = data;
            console.log(this.employeeInfo);
            // console.log(this.gender)
            if(data.success === true){
                this.message = data.message;
                this.successPopup();
            }else{
                this.message = data.message;
                this.errorPopup();
            }
        })
        .catch(err => console.log(err))
    },
    closePopup(){
        this.showPopup = false;
        this.popupData.title = "";
        this.popupData.content = "";
        if(this.employeeInfo.success){
            this.id="";
            this.name="";
            this.gender="default";
            this.email="";
            this.department="default";
            this.position="";
            this.level="default";
            this.supervisor="";
            this.phone="";
        }
    },
    successPopup(){
        if(this.langValue === 'ch'||this.langValue === 'jp'){
            this.popupData.title = "成功"
        }else if(this.langValue === 'en'){
            this.popupData.title = "Success";
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
    },
    errorPopup(){
        if(this.langValue === 'ch'){
            this.popupData.title = "錯誤";
        }else if(this.langValue === 'en'){
            this.popupData.title = "Failure";
        }else if(this.langValue === 'jp'){
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
},

    checkInputLength(input){
        let emailPattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let phonePattern =/^[0-9]{7,10}$/;
        switch(input){
            case 'employeeId':
                if(this.id.length < 3){
                    this.isInputInvalid = 1;
                }else{
                    this.isInputInvalid = 0;
                }
                break;
            case 'name':
                if(this.name.length < 1){
                    this.isInputInvalid = 2;
                }else{
                    this.isInputInvalid = 0;
                }
                break;
            case 'email':
                if(!emailPattern.test(this.email)){
                    this.isInputInvalid = 3;
                }else{
                    this.isInputInvalid = 0;
                }
                break;
            case 'position':
                if(this.position.length < 1){
                    this.isInputInvalid = 4;
                }else{
                    this.isInputInvalid = 0;
                }
                break;
            case 'level':
                if(this.level.length < 1){
                    this.isInputInvalid = 5;
                }else{
                    this.isInputInvalid = 0;
                }
                break;
            case 'phone':
                if(!phonePattern.test(this.phone)){
                    this.isInputInvalid = 6;
                }else{
                    this.isInputInvalid = 0;
                }
                break;
        }
     }      
},
    mounted() {
         //檢查及切換語言
        this.langValue = sessionStorage.getItem('langValue');
        if(this.langValue === null){
            this.langValue = 'ch';
        }
        console.log(this.langValue);
        this.changeLanguage();
    }
})
</script>

<template>
    <div class="main">

        <popup ref="popup" class="popup" :popup-data="popupData" :show-popup="showPopup" @close="closePopup"></popup>
        <div v-if="showPopup" ref="mask" class="mask"></div>

        <div class="add">
            <h4 v-if="langValue==='ch'">新增人員資訊</h4>
            <h4 v-if="langValue==='jp'">人員情報追加</h4>
            <h4 v-if="langValue==='en'">Create an employee information</h4>
            <!-- 填寫區 -->
            <div class="area1">
                <!-- 左側填寫區 -->
                <div class="info">

                    <!-- 員工ID輸入 -->
                    <label for="employeeId">{{employeeIdStr}}*</label>
                    <input 
                    :style="{ backgroundColor: isInputInvalid === 1 ? 'rgb(238, 198, 198)' : '' }"
                    maxlength="20" @input="checkInputLegth('employeeId')" ref="employeeId" v-model="id" 
                    id="employeeId" :placeholder="employeeIdPHStr" type="text"
                    >
                    <!-- 姓名輸入 -->
                    <label for="name">{{ nameStr }}*</label>
                    <input 
                    :style="{ backgroundColor: isInputInvalid === 2 ? 'rgb(238, 198, 198)' : '' }"
                    maxlength="20" @input="checkInputLegth('name')" ref="name" v-model="name" 
                    id="setName" :placeholder="namePHStr" type="text"
                    >

                    <!-- 性別輸入 -->
                    <label for="">{{ genderStr }}*</label>
                    <select ref="gender" v-model="gender" id="setGender">
                        <option v-if="langValue === 'ch'" value="default" selected >請選擇性別</option>
                        <option v-else-if="langValue === 'en'" value="default" selected >Please choose your gender</option>
                        <option v-else-if="langValue === 'jp'" value="default" selected >性別を選択してください</option>
                        <option value="男">Male</option>
                        <option value="女">Female</option>
                    </select>

                    <!-- Email輸入 -->
                    <label for="">{{ emailStr }}*</label>
                    <input 
                    :style="{ backgroundColor: isInputInvalid === 3 ? 'rgb(238, 198, 198)' : '' }"
                    @input="checkInputLegth('email')" ref="email" v-model="email" 
                    id="setEmail" :placeholder="emailPHStr" type="text"
                    >                  
                </div>
                <!-- 右側填寫區 -->
                <div class="detail">

                    <!-- 部門輸入 -->
                    <label for="">{{ departmentStr }}*</label>
                    <select ref="department" v-model="department" id="setDepartment">
                        <option v-if="langValue === 'ch'" value="default" selected >請選擇部門</option>
                        <option v-else-if="langValue === 'en'" value="default" selected >Please choose your department</option>
                        <option v-else-if="langValue === 'jp'" value="default" selected >部署名を選択してください</option>
                        <option v-if="langValue === 'ch' || langValue === 'jp'" value="管理部">管理部</option>
                        <option v-else-if="langValue === 'en'" value="管理部">Management Department</option>
                        <option v-if="langValue === 'ch'|| langValue === 'jp'" value="IT部">IT部</option>
                        <option v-else-if="langValue === 'en'" value="IT部">IT Department</option>
                        <option v-if="langValue === 'ch'" value="營業部">營業部</option>
                        <option v-if="langValue === 'jp'" value="營業部">営業部</option>
                        <option v-else-if="langValue === 'en'" value="營業部">Sales Department</option>
                        <option v-if="langValue === 'ch' || langValue === 'jp'" value="製造部">製造部</option>
                        <option v-else-if="langValue === 'en'" value="製造部">Production Department</option>
                    </select>

                    <!-- 職稱輸入 -->
                    <label for="">{{ positionStr }}*</label>
                    <input 
                    :style="{ backgroundColor: isInputInvalid === 4 ? 'rgb(238, 198, 198)' : '' }"
                    maxlength="20" @input="checkInputLegth('position')" ref="position" v-model="position" 
                    id="setPosition" :placeholder="positionPHStr" type="text"
                    >

                    <!-- 職等輸入 -->
                    <label for="">{{ levelStr }}*</label>
                    <select  ref="level" v-model="level" id="setLevel">
                        <option value="default" selected>{{ levelPHStr }}</option>
                        <option v-for="(option , index) in levelOptions" :value="option.value" :key="index">{{ option.label }}</option>
                    </select>

                    <!-- 主管ID輸入 -->
                    <label for="">{{ supervisorStr }}</label>
                    <input maxlength="20" @input="checkInputLegth('supervisor')" ref="supervisor" 
                    v-model="supervisor" id="supervisorId" :placeholder="supervisorPHStr" type="text"
                    >

                    <!-- 電話輸入 -->
                    <label for="">{{ phoneStr }}*</label>
                    <input 
                    :style="{ backgroundColor: isInputInvalid === 6 ? 'rgb(238, 198, 198)' : '' }"
                    maxlength="10" @input="checkInputLegth('phone')" ref="phone" v-model="phone" 
                    id="setPhone" :placeholder="phonePHStr" type="text"
                    >
                </div>
            </div>
            <!-- 底部按鈕 -->
            <div class="area2">
                <RouterLink to="/systemHome" class="btn1">{{ returnBtnStr }}</RouterLink>
                <button type="button" class="btn2" @click="addInfo" >{{ addBtnStr }}</button>
                
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.main {
    flex-grow: 1;
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: -1;
    overflow: hidden;

    .add {
        background-color: rgba(255, 255, 255, 0.724);
        border: 2px solid rgb(177, 208, 224);
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 90vw;
        height: 80vh;
        h4{
            font-size: 32px;
            font-weight: bold;
        }

        .area1 {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            width: 80vw;
            margin-top: 8px;

            .info {
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-right: 48px;
                label{
                    font-size: 15px;
                }
                input,
                select {
                    height: 30px;
                    margin-bottom: 8px;
                    border-radius: 5px;
                    border:1px solid #000;
                    transition: 0.4s;

                    &:focus{
                        background-color: rgb(227, 244, 255);
                    }
                }
            }

            .detail {
                display: flex;
                flex-direction: column;
                label{
                    font-size: 15px;
                }

                input,select {
                    margin-bottom: 8px;
                    height: 30px;
                    border-radius: 5px;
                    border:1px solid #000;

                    transition: 0.4s;

                    &:focus{
                        background-color: rgb(228, 241, 255);
                    }
                }
            }
        }

        .area2 {
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding: 0 8px;
            
            .btn1 {
                background-color: rgb(39, 46, 67);
                border: 1px solid #000;
                color: white;
                border-radius: 1vh;
                padding: 0.5vh 0.5vw;
                font-size: 2vh;
                text-decoration: none;
                text-align: center;
                margin-left: 25vw;
                width: 8%;
                transition: 0.4s;
                &:hover {
                    background-color: rgb(75, 75, 101);
                }

                &:active {
                    scale: 0.95;
                }
            }

            .btn2 {
                background-color: rgb(39, 46, 67);
                border: 1px solid #000;
                color: white;
                border-radius: 1vh;
                padding: 0.5vh 0.5vw;
                font-size: 2vh;
                text-decoration: none;
                text-align: center;
                margin-right: 25vw;
                width: 8%;
                transition: 0.4s;
                &:hover {
                    background-color: rgb(75, 75, 101);
                }

                &:active {
                    scale: 0.95;
                }
            }
        }
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
}
</style>