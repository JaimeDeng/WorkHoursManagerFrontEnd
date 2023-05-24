<script>
import { computeStyles } from '@popperjs/core'
import { RouterLink, RouterView } from 'vue-router'
import popup from './popup.vue'
export default {
    components: {
        RouterLink,
        popup
    },
    data() {
        return {
            //props傳來的變數 , 直接宣告一樣的名稱在data()內
            showPopup: false,
            popupData: {
                title: "Popup Title",
                content: "Popup Content",
                backBtn: "返回"

            },
            newPsd: "",
            againNewPsd: "",
            oldPassword: '',
            message: "",
            isInputInvalid: 0,
            origiPwdInput: '',
            //接舊密碼
            getOldPsd: '',
            //切換語言相關
            langValue: 'ch',
            pwdStr: '',
            pwdPHStr: '',
            rePwdStr: '',
            rePwdPHStr: '',
            backToHome: '',
            change: '',
            oldPsdStr: '',
            oldPsdPHStr: '',
            title: '',
            //判斷相關
            showPwd: false,
            showOldPwd: false
        }
    },
    methods: {
        changePsd() {
             //先檢查密碼格式
             let pwdPattern = /^[a-zA-Z0-9]{8,20}$/;
            let pwd = this.$refs.password.value;
            let rePassword = this.$refs.rePassword.value;
            let error = false;

            //舊密碼輸入錯誤
            if (this.origiPwdInput !== this.getOldPsd) {
                if (this.langValue === 'ch') {
                    this.message = "舊密碼不正確";
                } else if (this.langValue === 'en') {
                    this.message = "The passwords you typed don't match. Please retype the password.";
                } else if (this.langValue === 'jp') {
                    this.message = "現在のパスワードが一致しません。現在のパスワードを再入力してください。";
                }
                error = true;
                if (error) {
                    this.errorPopup();
                    return;
                }
            }


            if (this.newPsd.length === 0) {
                if (this.langValue === 'ch') {
                    this.message = "請輸入新密碼欄位";
                } else if (this.langValue === 'en') {
                    this.message = "You haven't filled in new password field yet";
                } else if (this.langValue === 'jp') {
                    this.message = "新しいパスワード欄を入力してください";
                }
                error = true;
                if (error) {
                    this.errorPopup();
                    return;
                }
            }
            if (this.againNewPsd.length === 0) {
                if (this.langValue === 'ch') {
                    this.message = "請輸入再次輸入密碼欄位";
                } else if (this.langValue === 'en') {
                    this.message = "You haven't filled in repeat password field yet";
                } else if (this.langValue === 'jp') {
                    this.message = "パスワード（確認）欄を入力してください";
                }
                error = true;
                if (error) {
                    this.errorPopup();
                    return;
                }
            }

            if (!pwdPattern.test(pwd)) {
                if (this.langValue === 'ch') {
                    this.message = "密碼格式錯誤:請輸入8~20位英數字";
                } else if (this.langValue === 'en') {
                    this.message = "Password format is not correct: Please enter 8~20 alphanumeric characters";
                } else if (this.langValue === 'jp') {
                    this.message = "パスワード形式が正しくありません: 8~20文字の英数字を入力してください";
                }
                error = true;
                if (error) {
                    this.errorPopup();
                    return;
                }
            }
            if (pwd !== rePassword) {
                if (this.langValue === 'ch') {
                    this.message = "重複輸入的密碼與設定的密碼不符!";
                } else if (this.langValue === 'en') {
                    this.message = "The repaet password does not match the password";
                } else if (this.langValue === 'jp') {
                    this.message = "パスワード（確認）はパスワードと一致していません";
                }
                error = true;
                if (error) {
                    this.errorPopup();
                    return;
                }
            } else {

                //密碼加密為Base64再存入資料庫
                let securePwd = btoa(this.newPsd);
                let a = atob(securePwd);
                console.log(securePwd);
                console.log(a);

                fetch("http://localhost:3000/changePassword", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "accountId": sessionStorage.getItem("accountId") || localStorage.getItem("accountId"),
                        "newPassword": securePwd
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.success) {
                            this.message = data.message;
                            this.successPopup();
                            this.$emit('changePwdSuccess');
                        } else {
                            this.message = data.message;
                            this.errorPopup();
                        }
                        this.newPsd = "";
                        this.againNewPsd = "";
                    })
            }
        },
        closePopup() {
            if (sessionStorage.getItem("accountId") === null && localStorage.getItem("accountId") === null) {
                this.$router.push('/login');
            } else {
                this.showPopup = false;
            }
        },
        successPopup() {
            if (this.langValue === 'ch') {
                this.popupData.title = "成功";
            } else if (this.langValue === 'en') {
                this.popupData.title = "Success";
            } else if (this.langValue === 'jp') {
                this.popupData.title = "完成";
            }
            // 訊息內容
            if (this.langValue === 'ch') {
                this.popupData.content = "變更成功!請重新登入";
            } else if (this.langValue === 'en') {
                this.popupData.content = "Your password has been changed. Please login again";
            } else if (this.langValue === 'jp') {
                this.popupData.content = "パスワードの変更が成功しました。再度ログインしてください。";
            }
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
            // 删除localStorage，sessionStorage，要求重新登入
            localStorage.removeItem('accountId');
            localStorage.removeItem('employeeId');
            localStorage.removeItem('employeeName');
            sessionStorage.removeItem('accountId');
            sessionStorage.removeItem('employeeId');
            sessionStorage.removeItem('employeeName');
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
        },
        checkInputLegth(input) {
            switch (input) {
                case 'password':
                    if (this.newPsd.length < 8) {
                        this.isInputInvalid = 3;
                    } else {
                        this.isInputInvalid = 0;
                    }
                    break;
                case 'rePassword':
                    if (this.newPsd.length < 8 || this.newPsd.length !== this.againNewPsd.length) {
                        this.isInputInvalid = 4;
                    } else {
                        this.isInputInvalid = 0;
                    }
                    break;
                case 'oldPassword':
                    if (this.origiPwdInput.length < 8) {
                        this.isInputInvalid = 2;
                    } else {
                        this.isInputInvalid = 0;
                    }
                    break;
            }
        },
        changeLanguage() {
            if (this.langValue === 'en') {
                this.title = 'Change Password';
                this.pwdStr = 'Set new password';
                this.pwdPHStr = 'Please set your new password';
                this.rePwdStr = 'Repeat password';
                this.rePwdPHStr = 'Please input your password again';
                this.backToHome = 'Home';
                this.change = 'Change';
                this.popupData.backBtn = 'Back'
                this.oldPsdStr = 'Password'
                this.oldPsdPHStr = 'Please set your old password'
            } else if (this.langValue === 'ch') {
                this.title = '變更密碼';
                this.pwdStr = '設置新密碼';
                this.pwdPHStr = '請設定密碼';
                this.rePwdStr = '再次輸入密碼';
                this.rePwdPHStr = '請再次輸入密碼';
                this.backToHome = '返回首頁';
                this.change = '變更';
                this.popupData.backBtn = '返回';
                this.oldPsdStr = '輸入密碼';
                this.oldPsdPHStr = '請輸入目前密碼'
            } else if (this.langValue === 'jp') {
                this.title = 'パスワード変更';
                this.pwdStr = '新しいパスワード設定';
                this.pwdPHStr = 'パスワードを設定してください';
                this.rePwdStr = '新しいパスワード（確認）';
                this.rePwdPHStr = 'パスワードを再入力してください';
                this.backToHome = 'ホームへ';
                this.change = '変更';
                this.popupData.backBtn = '戻る';
                this.oldPsdStr = 'パスワード'
                this.oldPsdPHStr = 'パスワードを入力してください'
            }
        },
        showPwdOrNot() {
            this.showPwd = !this.showPwd;
        },
        showOldPwdOrNot() {
            this.showOldPwd = !this.showOldPwd;
        }
    },
    beforeCreate() {
        //如果localStroage/sessionStorage都沒有accountId，則跳到登入頁面，要求重新登入
        if (!localStorage.getItem('accountId') && !sessionStorage.getItem('accountId')) {
            this.$router.push('/login')

        }
        //fetch舊密碼
        fetch("http://localhost:3000/getAccountByEmployeeId", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "employeeId": sessionStorage.getItem('employeeId') || localStorage.getItem('employeeId')
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data.password)
                    //解密
                    let origiPwd = atob(data.password);
                    console.log(origiPwd);
                    this.getOldPsd = origiPwd;

                })
    },
    mounted() {
        //檢查及切換語言
        this.langValue = sessionStorage.getItem('langValue');
        if (this.langValue === null) {
            this.langValue = 'ch';
        }
        console.log(this.langValue);
        this.changeLanguage();
    }
}
</script>
<template>
    <div class="main">

        <!--子元件要使用v-model綁定props變數 , 綁定命名的部分使用橫槓命名規則-->
        <popup ref="popup" class="popup" :popup-data="popupData" :show-popup="showPopup" @close="closePopup"></popup>
        <div v-if="showPopup" ref="mask" class="mask"></div>

        <div class="login">
            <h2>{{ title }}</h2>

            <div class="area1">

                <!-- 舊密碼 -->
                <div>
                    <label for="oldPsd">{{ oldPsdStr }}</label>
                    <div class="oldPsdInput">
                        <i class="fa-sharp fa-solid fa-key"></i>
                        <input id="oldPsd" :placeholder="oldPsdPHStr" :type="showOldPwd ? 'text' : 'password'"
                            v-model="origiPwdInput" ref="oldPassword"
                            :style="{ backgroundColor: isInputInvalid === 2 ? 'rgb(238, 198, 198)' : '' }" maxlength="20"
                            @input="checkInputLegth('oldPassword')">
                        <i @click="showOldPwdOrNot"
                            :class="showOldPwd ? 'fa-sharp fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                    </div>
                </div>

                <!-- 新密碼輸入 -->
                <div>
                    <label for="emid">{{ pwdStr }}</label>
                    <div class="newPsdInput">
                        <i class="fa-sharp fa-solid fa-key"></i>
                        <input id="emid" :placeholder="pwdPHStr" :type="showPwd ? 'text' : 'password'" v-model="newPsd"
                            ref="password" :style="{ backgroundColor: isInputInvalid === 3 ? 'rgb(238, 198, 198)' : '' }"
                            maxlength="20" @input="checkInputLegth('password')">
                        <i @click="showPwdOrNot"
                            :class="showPwd ? 'fa-sharp fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                    </div>
                </div>


                <!-- 再次輸入新密碼 -->
                <div>
                    <label for="password">{{ rePwdStr }}</label>
                    <div class="againNewPsd">
                        <i class="fa-sharp fa-solid fa-key"></i>
                        <input id="password" :placeholder="rePwdPHStr" type="password" v-model="againNewPsd"
                            ref="rePassword" :style="{ backgroundColor: isInputInvalid === 4 ? 'rgb(238, 198, 198)' : '' }"
                            maxlength="20" @input="checkInputLegth('rePassword')">
                    </div>
                </div>


            </div>

            <!-- 按鈕 -->
            <div class="area2">
                <RouterLink to="/employeeHome" tag="button" class="btnChangPsd">{{ backToHome }}</RouterLink>

                <button type="button" class="btnChangPsd" @click="changePsd">{{ change }}</button>


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
    overflow: hidden;

    .popup {
        position: absolute;
        bottom: -20%;
        opacity: 0;
        transition-property: bottom;
        transition-duration: 0.3s;
        transition-timing-function: cubic-bezier(0.2,1,0.3,1);
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

    .login {
        background-color: rgba(255, 255, 255, 0.724);
        border: 2px solid rgb(177, 208, 224);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        width: 28%;
        height: 80%;
        border-radius: 5px;

        h2 {
            margin-top: 40px;
            font-size: 38px;
            font-weight: bold;

        }

        .area1 {
            position: relative;
            display: flex;
            flex-direction: column;
            height: 45%;
            width: 70%;
            justify-content: space-around;

            %inputFrameSetting {
                width: 100%;
                position: relative;
                height: max-content;

                input {
                    cursor: pointer;
                    width: 100%;
                    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
                    background-color: rgba(255, 255, 255, 0.9);
                    padding-left: 28px;
                    height: 4.5vh;
                    border-radius: 5px;
                    font-size: 1.5vh;
                    border-top: none;
                    border-left: none;
                    border-right: none;
                    border-bottom: 2px solid #514d4d;
                    transition: 0.5s;

                    &:focus {
                        outline: none;
                        background-color: rgb(228, 241, 255);
                    }
                }

            }

            .oldPsdInput,
            .newPsdInput,
            .againNewPsd {
                @extend %inputFrameSetting;

                .fa-key {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 2%;
                }

                .fa-eye,
                .fa-eye-slash {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 2%;

                    &:active {
                        scale: 0.95;
                    }
                }
            }
        }

        .area2 {
            display: flex;
            width: 100%;
            justify-content: space-evenly;


            button,
            .btnChangPsd {
                background: rgb(26, 55, 77);
                border: 1px solid #000;
                color: white;
                border-radius: 5px;
                width: 100px;
                height: 40px;
                text-decoration: none;
                text-align: center;
                font-size: 18px;
                display: flex;
                justify-content: center;
                align-items: center;

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