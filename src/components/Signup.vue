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
    },
    id : "",
    account : "",
    password : "",
    rePassword : "",
    message : "none",
    isInputInvalid : 0
}
},
methods: {
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
            this.message = "請輸入員工ID欄位";
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }
        if(this.account.length === 0){
            this.message = "請輸入帳號欄位";
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }
        if(!accountPattern.test(account)){
            this.message = "帳號格式錯誤:請輸入4~10位英數字";
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }
        if(this.password.length === 0){
            this.message = "請輸入密碼欄位";
                     error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }
        if(this.rePassword.length === 0){
            this.message = "請再次輸入密碼";
                     error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }

        if(!pwdPattern.test(pwd)){
            this.message = "密碼格式錯誤:請輸入8~20字符的英數字";
                     error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }

        if(pwd !== rePassword){
            this.message = "重複輸入的密碼與設定的密碼不符!";
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
        this.popupData.title = "成功";
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
        this.popupData.title = "錯誤";
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

}
})
</script>
<template>

    <div class="main">

        <!--子元件要使用v-model綁定props變數 , 綁定命名的部分使用橫槓命名規則-->
        <popup ref="popup" class="popup" :popup-data="popupData" :show-popup="showPopup" @close="closePopup"></popup>
        <div v-if="showPopup" ref="mask" class="mask"></div>

        <div class="login">

            <h2>註冊</h2>

            <div class="area1">
                <!-- 員工ID輸入 -->
                <label for="employeeId">員工ID</label>
                <div class="employeeIdInputFrame">
                    <i class="fa-solid fa-user"></i>
                    <input 
                    :style="{ backgroundColor: isInputInvalid === 1 ? 'rgb(255, 205, 205)' : '' }"
                    maxlength="20" @input="checkInputLegth('employeeId')" ref="employeeId" v-model="id" 
                    id="employeeId" placeholder="請輸入您的員工ID" type="text"
                    >
                </div>
                <!-- 帳號輸入 -->
                <label for="account">設置帳號</label>
                <div class="accountInputFrame">
                    <i class="fa-solid fa-user"></i>
                    <input 
                    :style="{ backgroundColor: isInputInvalid === 2 ? 'rgb(255, 205, 205)' : '' }"
                    maxlength="10" @input="checkInputLegth('account')" ref="account" v-model="account" 
                    id="setAccount" placeholder="請設定帳號" type="text">
                </div>
                <!-- password輸入 -->
                <label for="password">設置密碼</label>
                <div class="pwdInputFrame">         
                    <i class="fa-sharp fa-solid fa-key"></i>
                    <input 
                    :style="{ backgroundColor: isInputInvalid === 3 ? 'rgb(255, 205, 205)' : '' }"
                    maxlength="20" @input="checkInputLegth('password')" ref="password" v-model="password" 
                    id="setPassword" placeholder="請設定密碼" type="password"
                    >
                </div>
                <!-- password再次輸入 -->
                <label for="rePassword">再次輸入密碼</label>
                <div class="rePwdInputFrame">         
                    <i class="fa-sharp fa-solid fa-key"></i>
                    <input 
                    :style="{ backgroundColor: isInputInvalid === 4 ? 'rgb(255, 205, 205)' : '' }"
                    maxlength="20" @input="checkInputLegth('rePassword')" ref="rePassword" v-model="rePassword" 
                    id="repeatPassword" placeholder="請再次輸入密碼" type="password">
                </div>
            </div>
            
            <div class="area2">
                <!-- 登入按鈕 -->
                <button @click="commitSignup" type="button">註冊</button>              
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

    .popup{
        position: absolute;
        bottom: -20%;
        opacity: 0;
        transition: 0.2s;
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
            margin-top: 10%;
            font-size: 4vh;
            font-weight: bold;
        }

        .area1 {
            margin-top: 2%;
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
                    height: 5vh;
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
            margin-top: 5%;
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
                font-size: 18px;

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