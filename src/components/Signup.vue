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
        backBtn: 'Back',
    },
    id : "",
    account : "",
    password : "",
    rePassword : "",
    message : "none",
    isInputInvalid : 0,
    //切換語言相關
    langValue : 'ch',
    signupStr : '',
    employeeIdStr : '',
    employeeIdPHStr : '',
    accountStr : '',
    accountPHStr : '',
    pwdStr : '',
    pwdPHStr : '',
    rePwdStr : '',
    rePwdPHStr : '',
    commitBtnStr : ''

}
},
methods: {
    changeLanguage(){
        if(this.langValue === 'en'){
            this.signupStr = 'Sign up';
            this.employeeIdStr = 'Employee ID';
            this.employeeIdPHStr = 'Please input your employee ID';
            this.accountStr = 'Set account';
            this.accountPHStr = 'Please set your account';
            this.pwdStr = 'Set password';
            this.pwdPHStr = 'Please set your password';
            this.rePwdStr = 'Repeat password';
            this.rePwdPHStr = 'Please input your password again';
            this.commitBtnStr = 'Sign up';
            this.popupData.backBtn = 'Back'
        }else if(this.langValue === 'ch'){
            this.signupStr = '註冊';
            this.employeeIdStr = '員工ID';
            this.employeeIdPHStr = '請輸入您的員工ID';
            this.accountStr = '設置帳號';
            this.accountPHStr = '請設定帳號';
            this.pwdStr = '設置密碼';
            this.pwdPHStr = '請設定密碼';
            this.rePwdStr = '再次輸入密碼';
            this.rePwdPHStr = '請再次輸入密碼';
            this.commitBtnStr = '註冊';
            this.popupData.backBtn = '返回';
        }else if(this.langValue === 'jp'){
            this.signupStr = 'アカウント登録';
            this.employeeIdStr = '社員番号';
            this.employeeIdPHStr = '社員番号を入力してください';
            this.accountStr = 'アカウント設定';
            this.accountPHStr = 'アカウントを設定してください';
            this.pwdStr = 'パスワード設定';
            this.pwdPHStr = 'パスワードを設定してください';
            this.rePwdStr = 'パスワード（確認）';
            this.rePwdPHStr = 'パスワードを再入力してください';
            this.commitBtnStr = '登録';
            this.popupData.backBtn = '戻る';
        }
    },
    commitSignup(){
        let employeeId = this.$refs.employeeId.value;
        let account = this.$refs.account.value;
        let pwd = this.$refs.password.value;
        let rePassword = this.$refs.rePassword.value;
        let error = false;

        //先檢查密碼格式
        let pwdPattern = /^[a-zA-Z0-9]{8,20}$/;
        let accountPattern = /^[a-zA-Z0-9]{4,10}$/;
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
        if(this.account.length === 0){
            if(this.langValue === 'ch'){
                this.message = "請輸入帳號欄位";
            }else if(this.langValue === 'en'){
                this.message = "You haven't filled in account field yet";
            }else if(this.langValue === 'jp'){
                this.message = "アカウント欄を入力してください";
            }
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }
        if(!accountPattern.test(account)){
            if(this.langValue === 'ch'){
                this.message = "帳號格式錯誤:請輸入4~10位英數字";
            }else if(this.langValue === 'en'){
                this.message = "Account format is not correct: Please enter 4~10 alphanumeric characters";
            }else if(this.langValue === 'jp'){
                this.message = "アカウント形式が正しくありません: 4~10文字の英数字を入力してください";
            }
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }
        if(this.password.length === 0){
            if(this.langValue === 'ch'){
                this.message = "請輸入密碼欄位";
            }else if(this.langValue === 'en'){
                this.message = "You haven't filled in password field yet";
            }else if(this.langValue === 'jp'){
                this.message = "パスワード欄を入力してください";
            }
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }
        if(this.rePassword.length === 0){
            if(this.langValue === 'ch'){
                this.message = "請輸入再次輸入密碼欄位";
            }else if(this.langValue === 'en'){
                this.message = "You haven't filled in repeat password field yet";
            }else if(this.langValue === 'jp'){
                this.message = "パスワード（確認）欄を入力してください";
            }
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }

        if(!pwdPattern.test(pwd)){
            if(this.langValue === 'ch'){
                this.message = "密碼格式錯誤:請輸入8~20位英數字";
            }else if(this.langValue === 'en'){
                this.message = "Password format is not correct: Please enter 8~20 alphanumeric characters";
            }else if(this.langValue === 'jp'){
                this.message = "パスワード形式が正しくありません: 8~20文字の英数字を入力してください";
            }
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }

        if(pwd !== rePassword){
            if(this.langValue === 'ch'){
                this.message = "重複輸入的密碼與設定的密碼不符!";
            }else if(this.langValue === 'en'){
                this.message = "The repaet password does not match the password";
            }else if(this.langValue === 'jp'){
                this.message = "パスワード（確認）はパスワードと一致していません";
            }
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }else{

             //密碼加密為Base64再存入資料庫
            let securePwd = btoa(pwd);
            let a = atob(securePwd);
            console.log(securePwd);
            console.log(a);

            let reqbody = {
                employeeId : employeeId,
                accountId : account,
                password : securePwd
            };
            fetch("http://localhost:3000/setAccount" ,{
                method:"post",
                body: JSON.stringify(reqbody),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(res => res.json())
            .then((data)=>{
                this.employeeInfo = data;
                console.log(this.employeeInfo);
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
    closePopup(){
        this.showPopup = false;
        this.popupData.title = "";
        this.popupData.content = "";
        if(this.employeeInfo.success){
            this.id = "";
            this.account = "";
            this.password = "";
            this.rePassword = "";
        }
    },
    successPopup(){
        if (this.langValue === 'ch') {
            this.popupData.title = "成功";
        } else if (this.langValue === 'en') {
            this.popupData.title = "Success";
        } else if (this.langValue === 'jp') {
            this.popupData.title = "登録完了";
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
    checkInputLegth(input){
        switch(input){
            case 'password':
                if(this.password.length < 8){
                    this.isInputInvalid = 3;
                }else{
                    this.isInputInvalid = 0;
                }
                break;
            case 'account':
                if(this.account.length < 4){
                    this.isInputInvalid = 2;
                }else{
                    this.isInputInvalid = 0;
                }
                break;
            case 'employeeId':
                if(this.id.length < 1){
                    this.isInputInvalid = 1;
                }else{
                    this.isInputInvalid = 0;
                }
                break;
            case 'rePassword':
                if(this.password.length < 8 || this.password.length !== this.rePassword.length){
                    this.isInputInvalid = 4;
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

        <!--子元件要使用v-model綁定props變數 , 綁定命名的部分使用橫槓命名規則-->
        <popup ref="popup" class="popup" :popup-data="popupData" :show-popup="showPopup" @close="closePopup"></popup>
        <div v-if="showPopup" ref="mask" class="mask"></div>

        <div class="login">

            <h2>{{ signupStr }}</h2>

            <div class="area1">
                <!-- 員工ID輸入 -->
                <label for="employeeId">{{ employeeIdStr }}</label>
                <div class="employeeIdInputFrame">
                    <i class="fa-solid fa-user"></i>
                    <input 
                    :style="{ backgroundColor: isInputInvalid === 1 ? 'rgb(255, 205, 205)' : '' }"
                    maxlength="20" @input="checkInputLegth('employeeId')" ref="employeeId" v-model="id" 
                    id="employeeId" :placeholder="employeeIdPHStr" type="text"
                    >
                </div>
                <!-- 帳號輸入 -->
                <label for="account">{{ accountStr }}</label>
                <div class="accountInputFrame">
                    <i class="fa-solid fa-user"></i>
                    <input 
                    :style="{ backgroundColor: isInputInvalid === 2 ? 'rgb(255, 205, 205)' : '' }"
                    maxlength="10" @input="checkInputLegth('account')" ref="account" v-model="account" 
                    id="setAccount" :placeholder="accountPHStr" type="text">
                </div>
                <!-- password輸入 -->
                <label for="password">{{ pwdStr }}</label>
                <div class="pwdInputFrame">         
                    <i class="fa-sharp fa-solid fa-key"></i>
                    <input 
                    :style="{ backgroundColor: isInputInvalid === 3 ? 'rgb(255, 205, 205)' : '' }"
                    maxlength="20" @input="checkInputLegth('password')" ref="password" v-model="password" 
                    id="setPassword" :placeholder="pwdPHStr" type="password"
                    >
                </div>
                <!-- password再次輸入 -->
                <label for="rePassword">{{ rePwdStr }}</label>
                <div class="rePwdInputFrame">         
                    <i class="fa-sharp fa-solid fa-key"></i>
                    <input 
                    :style="{ backgroundColor: isInputInvalid === 4 ? 'rgb(255, 205, 205)' : '' }"
                    maxlength="20" @input="checkInputLegth('rePassword')" ref="rePassword" v-model="rePassword" 
                    id="repeatPassword" :placeholder="rePwdPHStr" type="password">
                </div>
            </div>
            
            <div class="area2">
                <!-- 登入按鈕 -->
                <button @click="commitSignup" type="button">{{ commitBtnStr }}</button>              
            </div>
        </div>
    </div>
 
</template>


<style lang="scss" scoped>
.main {
    flex-grow: 1;
    display: flex;
    position: relative;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

    .login {
        background-color: rgba(255, 255, 255, 0.724);
        border: 2px solid rgb(177, 208, 224);
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        width: 25%;
        height: 70%;
        border-radius: 5px;
        overflow: auto;

        label{
            font-size: 1.5vh;
        }

        h2 {
            margin: 4vh auto;
            font-size: 4vh;
            font-weight: bold;
        }

        .area1 {
            position: relative;
            display: flex;
            flex-direction: column;
            height: max-content;
            width: 70%;
            justify-content: space-between;

            %inputFrameSetting{
                width: 100%;
                position: relative;
                height: max-content;
                margin-bottom: 2vh;

                input {
                    cursor: pointer;
                    width: 100%;
                    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
                    padding-left: 28px;
                    height: 4vh;
                    font-size: 1.5vh;
                    border-radius: 5px;
                    border: 1.5px solid #000;
                    transition: 0.5s;
                    &:focus{
                        background-color: rgb(227, 244, 255);
                    }
                }
            }

            .employeeIdInputFrame{
                @extend %inputFrameSetting;
                .fa-user{
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 2%;
                }
            }
            .accountInputFrame{        

                @extend %inputFrameSetting;
                .fa-user{
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 2%;
                }
            }

            .pwdInputFrame{

                @extend %inputFrameSetting;          

                .fa-key{
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 2%;
                }
            }

            .rePwdInputFrame{

                @extend %inputFrameSetting;            

                .fa-key{
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 2%;
                }
            }
        }

        .area2 {
            position: relative;
            margin: 2.5vh auto;
            display: flex;
            width: 100%;
            justify-content: space-evenly;

            button {
                background: rgb(26, 55, 77);
                border: 1px solid #000;
                color: white;
                border-radius: 5px;
                width: 8vw;
                height: 5vh;
                // font-weight: bold;
                font-size: 2vh;

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