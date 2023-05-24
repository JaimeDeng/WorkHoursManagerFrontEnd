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
            this.addBtnStr='Create'
            this.popupData.backBtn = 'Back'
        }else if(this.langValue === 'ch'){
            this.emailStr='信箱';
            this.emailPHStr='請輸入您的信箱';
            this.accountStr='帳號';
            this.accountPHStr='請輸入您的帳號';
            this.phoneStr='電話';
            this.phonePHStr='請輸入您的電話(7-10碼)';
            this.addBtnStr='新增'
            this.popupData.backBtn = '返回';
        }else if(this.langValue === 'jp'){
            this.emailStr='メール';
            this.emailPHStr='メールを入力してください';
            this.accountStr='アカウント';
            this.accountPHStr='アカウントを入力してください';
            this.phoneStr='電話番号';
            this.phonePHStr='電話番号を入力してください(7~10)';
            this.addBtnStr='クリエイト';
            this.popupData.backBtn = '戻る';
        }
    },
        addInfo(){
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
            // console.log(data.accountsForVerify)
            for (let i = 0; i < data.accountsForVerify.length; i++) {
                if (data.accountsForVerify[i].account=== this.account
                    && data.accountsForVerify[i].email===this.email
                    && data.accountsForVerify[i].phone===this.phone) {
                    // alert(data.accountsForVerify[0].phone)
                    localStorage.setItem("changePwdAccount", data.accountsForVerify[i].account)
                    this.$router.push('/resetpwd')
                }
                else{
                    if(this.langValue === 'ch'){
                    this.message = "資料不存在";
                    }
                    else if(this.langValue === 'en'){
                        this.message = "This data is not exist";
                    }else if(this.langValue === 'jp'){
                        this.message = "資料が存在していません";
                    } 
                    this.errorPopup();
                }                
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
            <h4 v-if="langValue==='ch'" class="me-5">身分驗證</h4>
            <h4 v-if="langValue==='jp'" class="me-5">身分認証</h4>
            <h4 v-if="langValue==='en'" class="me-5">Identity verification</h4>
            <!-- 填寫區 -->
            <div class="area1">
                <div class="info">

                    <!-- Account輸入 -->
                    <label for="">{{ accountStr }}</label>
                    <input 
                    :style="{ backgroundColor: isInputInvalid === 3 ? 'rgb(238, 198, 198)' : '' }"
                    @input="checkInputLegth('account')" ref="account" v-model="account" 
                    id="setAccount" :placeholder="accountPHStr" type="text"
                    > 

                    <!-- Email輸入 -->
                    <label for="">{{ emailStr }}</label>
                    <input 
                    :style="{ backgroundColor: isInputInvalid === 3 ? 'rgb(238, 198, 198)' : '' }"
                    @input="checkInputLegth('email')" ref="email" v-model="email" 
                    id="setEmail" :placeholder="emailPHStr" type="text"
                    > 
                    <!-- 電話輸入 -->
                    <label for="">{{ phoneStr }}</label>
                    <input 
                    :style="{ backgroundColor: isInputInvalid === 6 ? 'rgb(238, 198, 198)' : '' }"
                    maxlength="10" @input="checkInputLegth('phone')" ref="phone" v-model="phone" 
                    id="setPhone" :placeholder="phonePHStr" type="text"
                    >                 
                </div>
            </div>
            <!-- 底部按鈕 -->
            <div class="area2">
                <button type="button" class="btn2 me-5" @click="addInfo" >{{ addBtnStr }}</button>             
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
        }

        .area2 {
            display: flex;
            justify-content: center;
            align-content: center;
            width: 100%;
            padding: 0 8px;

            .btn2 {
                background: rgb(26, 55, 77);
                border: 1.5px solid #000;
                color: white;
                border-radius: 5px;
                padding: 4px;
                font-size: 15px;
                text-decoration: none;
                text-align: center;
                width: 10vw;
                &:hover {
                    background-color: rgb(64, 104, 130);
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