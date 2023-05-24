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
            account:"",
            email : "",
            phone : "",
            message : "none",
            isInputInvalid : 0,
            //切換語言相關
            langValue : 'ch',
            accountStr:'',
            accountPHStr :'',
            emailStr:'',
            emailPHStr :'',
            phoneStr:'',
            phonePHStr:'',
            addBtnStr : '',
            commitBtnStr: '',
            //驗證成功狀態
            verifySuccess:false
        }
    },
    methods:{
        changeLanguage(){
        if(this.langValue === 'en'){
            this.emailStr='Email';
            this.emailPHStr='Please input your email';
            this.accountStr='Account';
            this.accountPHStr='Please input your account';
            this.phoneStr='Phone';
            this.phonePHStr='Please input your phone(7~10)';
            this.commitBtnStr='Commit'
            this.popupData.backBtn = 'Back'
        }else if(this.langValue === 'ch'){
            this.emailStr='信箱';
            this.emailPHStr='請輸入您的信箱';
            this.accountStr='帳號';
            this.accountPHStr='請輸入您的帳號';
            this.phoneStr='電話';
            this.phonePHStr='請輸入您的電話(7-10碼)';
            this.commitBtnStr='確認'
            this.popupData.backBtn = '返回';
        }else if(this.langValue === 'jp'){
            this.emailStr='メール';
            this.emailPHStr='メールを入力してください';
            this.accountStr='アカウント';
            this.accountPHStr='アカウントを入力してください';
            this.phoneStr='電話番号';
            this.phonePHStr='電話番号を入力してください(7~10)';
            this.commitBtnStr='確認';
            this.popupData.backBtn = '戻る';
        }
    },
    commitInfo(){
        let error = false;

        let emailPattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let phonePattern =/^[0-9]{7,10}$/;
        
        if(this.account.length === 0){
            if(this.langValue === 'ch'){
                this.message = "請輸入帳號";
            }
            else if(this.langValue === 'en'){
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

        fetch("http://localhost:3000/getAllAccountInfoForVerify" ,{
            method:"GET",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(res => res.json())
        .then((data)=>{
            for (let i = 0; i < data.accountsForVerify.length; i++) {
                if (data.accountsForVerify[i].account === this.account
                    && data.accountsForVerify[i].email === this.email
                    && data.accountsForVerify[i].phone === this.phone) {
                    if(this.langValue === 'ch'){
                        this.message = "驗證成功";
                    }else if(this.langValue === 'en'){
                        this.message = "Verify successful";
                    }else if(this.langValue === 'jp'){
                        this.message = "認証成功";
                    } 
                    this.verifySuccess = true;
                    sessionStorage.setItem("changePwdAccount", data.accountsForVerify[i].account);
                    this.successPopup();
                    return;
                }         
            }
            if(this.langValue === 'ch'){
                this.message = "資料不存在";
            }else if(this.langValue === 'en'){
                this.message = "This data is not exist";
            }else if(this.langValue === 'jp'){
                this.message = "資料が存在していません";
            }
            this.errorPopup();  
        })
        .catch(err => console.log(err))
    },
    closePopup(){
        this.showPopup = false;
        this.popupData.title = "";
        this.popupData.content = "";
        if(this.verifySuccess === true){
            this.verifySuccess = false;
            this.$router.push('/resetpwd');
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
            case 'email':
                if(!emailPattern.test(this.email)){
                    this.isInputInvalid = 3;
                }else{
                    this.isInputInvalid = 0;
                }
                break;
            
            case 'account':
                if(!emailPattern.test(this.account)){
                    this.isInputInvalid = 3;
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
            <div class="title">
                <h4 v-if="langValue==='ch'" class="">身分驗證</h4>
                <h4 v-if="langValue==='jp'" class="">身分認証</h4>
                <h4 v-if="langValue==='en'" class="">Identity verification</h4>
            </div>
            <!-- 填寫區 -->
            <div class="inputFrame">
                <div class="info">

                    <!-- Account輸入 -->
                    <label for="setAccount">{{ accountStr }}</label>
                    <input 
                    @input="checkInputLegth('account')" ref="account" v-model="account" 
                    id="setAccount" :placeholder="accountPHStr" type="text"
                    > 

                    <!-- Email輸入 -->
                    <label for="setEmail">{{ emailStr }}</label>
                    <input 
                    @input="checkInputLegth('email')" ref="email" v-model="email" 
                    id="setEmail" :placeholder="emailPHStr" type="email"
                    > 
                    <!-- 電話輸入 -->
                    <label for="setPhone">{{ phoneStr }}</label>
                    <input 
                    maxlength="10" @input="checkInputLegth('phone')" ref="phone" v-model="phone" 
                    id="setPhone" :placeholder="phonePHStr" type="text"
                    >                 
                </div>
            </div>
            <!-- 底部按鈕 -->
            <div class="btnFrame">
                <button type="button" class="btn" @click="commitInfo" >{{ commitBtnStr }}</button>             
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.main {
    height: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: -1;
    overflow: hidden;

    .add {
        position: relative;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0.6), rgba(188, 186, 193, 0.6));
        border: 2px solid rgb(177, 208, 224);
        border-radius: 1vh;
        display: flex;
        flex-direction: column;
        width: 30vw;
        height: 60vh;

        .title{
            white-space: nowrap;
            width: 100%;
            height: 20%;
            text-align: center;
            margin-top: 10%;
            h4{
                font-size: 3.5vh;
                font-weight: bold;
            }
        }

        .inputFrame {
            position: relative;
            display: flex;
            flex-direction: column;
            text-align: center;
            justify-content: center;
            align-items: center;
            width: 100%;
            margin-top: 1%;

            .info {
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 50%;
                label{
                    font-size: 2vh;
                }
                input{
                    height: 3.5vh;
                    margin-bottom: 1vh;
                    padding: 0.5vh 0.5vw;
                    border-radius: 5px;
                    border-top: none;
                    border-left: none;
                    border-right: none;
                    border-bottom: 2px solid #514d4d;
                    transition: 0.4s;

                    &::placeholder{
                        font-size: 2vh;
                    }

                    &:focus{
                        outline: none;
                        background-color: rgb(228, 241, 255);
                    }
                }
            }
        }

        .btnFrame {
            display: flex;
            justify-content: center;
            align-content: center;
            width: 100%;
            padding: 0 1vw;
            margin-top: 15%;

            .btn {
                background-color: rgb(39, 46, 67);
                border: 1px solid #000;
                color: white;
                border-radius: 1vh;
                padding: 4px;
                font-size: 15px;
                text-decoration: none;
                text-align: center;
                transition: 0.4s;
                width: 6vw;
                &:hover {
                    background-color: rgb(75, 75, 101);
                }

                &:active {
                    transform: scale(0.95);
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