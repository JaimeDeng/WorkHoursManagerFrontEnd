<script>
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
                backBtn: "back"
            },
            employeeId: '',
            password: '',
            keepLogin: false,
            message: "",

            //切換語言相關
            langValue: 'ch',
            titleStr: '',
            employeeIdPHStr: '',
            pwdPHStr: '',
            commitBtnStr: '',
            loginBtnStr: '',
            keepLog: '',
            forgetPsdStr: '',
            pwdStr: '',
            employeeIdStr: ''

        }
    },
    methods: {
        login() {
            fetch("http://localhost:3000/getAccountByEmployeeId", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "employeeId": this.employeeId
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (this.password.length === 0 && this.employeeId.length === 0) {
                        if (this.langValue === 'ch') {
                            this.message = "請輸入員工ID或帳號及密碼";
                        } else if (this.langValue === 'en') {
                            this.message = "You haven't filled in Employee ID or account and password field yet";
                        } else if (this.langValue === 'jp') {
                            this.message = "社員番号またはアカウントとパスワードを入力してください";
                        }
                        this.errorPopup()
                    } else if (this.password.length === 0) {
                        if (this.langValue === 'ch') {
                            this.message = "請輸入密碼欄位";
                        } else if (this.langValue === 'en') {
                            this.message = "You haven't filled in password field yet";
                        } else if (this.langValue === 'jp') {
                            this.message = "パスワード欄を入力してください";
                        }
                        this.errorPopup()
                    } else if (this.employeeId.length === 0) {
                        if (this.langValue === 'ch') {
                            this.message = "請輸入員工ID或帳號";
                        } else if (this.langValue === 'en') {
                            this.message = "You haven't filled in employee ID or account yet";
                        } else if (this.langValue === 'jp') {
                            this.message = "社員番号またはアカウントを入力してください";
                        }
                        this.errorPopup()
                    } else if (data.success === false) {
                        if (this.langValue === 'ch') {
                            this.message = "此員工ID或帳號不存在";
                        } else if (this.langValue === 'en') {
                            this.message = "This Employee ID or account does not exist.";
                        } else if (this.langValue === 'jp') {
                            this.message = "社員番号またはアカウントは存在しません";
                        }
                        this.errorPopup()
                    } else if (this.password !== atob(data.password)) {
                        if (this.langValue === 'ch') {
                            this.message = "密碼錯誤";
                        } else if (this.langValue === 'en') {
                            this.message = "Wrong password";
                        } else if (this.langValue === 'jp') {
                            this.message = "パスワードが違います";
                        }
                        this.errorPopup()
                    } else if (this.password === atob(data.password) && data.success === true) {
                        if (this.keepLogin === true) {
                            //有勾選keepLogin長存
                            localStorage.setItem("employeeId", this.employeeId)
                            localStorage.setItem("accountId", data.accountId)
                            localStorage.setItem("employeeName", data.employeeId.name)
                            this.$router.push('/employeeHome')
                        } else {
                            //沒有勾選keepLogin短存
                            sessionStorage.setItem("employeeId", this.employeeId)
                            sessionStorage.setItem("accountId", data.accountId)
                            sessionStorage.setItem("employeeName", data.employeeId.name)
                            this.$router.push('/employeeHome');
                        }
                        this.$emit('login');
                        console.log('login event emitted');
                    }
                })

        },
        login2() {


            fetch("http://localhost:3000/getAllAccount", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data.accounts)

                    for (let i = 0; i < data.accounts.length; i++) {

                        if (data.accounts[i].accountId === this.employeeId ||
                            data.accounts[i].employeeId.employeeId === this.employeeId) {

                            //帳密正確
                            if (atob(data.accounts[i].password) === this.password) {

                                if (this.keepLogin === true) {
                                    //有勾選keepLogin長存
                                    localStorage.setItem("employeeId", this.employeeId)
                                    localStorage.setItem("accountId", data.accountId)
                                    localStorage.setItem("employeeName", data.employeeId.name)
                                    this.$router.push('/employeeHome')
                                } else {
                                    //沒有勾選keepLogin短存
                                    sessionStorage.setItem("employeeId", data.accounts[i].accountId)
                                    sessionStorage.setItem("accountId", data.accounts[i].employeeId.employeeId)
                                    sessionStorage.setItem("employeeName", data.accounts[i].employeeId.name)
                                    this.$router.push('/employeeHome');
                                }
                                this.$emit('login');
                                console.log('login event emitted');
                            } else if( atob(data.accounts[i].password) !== this.password){
                                //帳號對，密碼錯
                                if (this.langValue === 'ch') {
                                    this.message = "密碼錯誤";
                                } else if (this.langValue === 'en') {
                                    this.message = "Wrong password";
                                } else if (this.langValue === 'jp') {
                                    this.message = "パスワードが違います";
                                }
                                this.errorPopup()
                                return;
                            }
                        }
                        if (data.accounts[i].accountId !== this.employeeId &&
                            data.accounts[i].employeeId.employeeId !== this.employeeId
                            && this.employeeId.length !== 0) {
                            if (this.langValue === 'ch') {
                                this.message = "此員工ID或帳號不存在";
                            } else if (this.langValue === 'en') {
                                this.message = "This Employee ID or account does not exist.";
                            } else if (this.langValue === 'jp') {
                                this.message = "社員番号またはアカウントは存在しません";
                            }
                            this.errorPopup()
                        }
                    }

                    if (this.password.length === 0 && this.employeeId.length === 0) {
                        if (this.langValue === 'ch') {
                            this.message = "請輸入員工ID或帳號及密碼";
                        } else if (this.langValue === 'en') {
                            this.message = "You haven't filled in Employee ID or account and password field yet";
                        } else if (this.langValue === 'jp') {
                            this.message = "社員番号またはアカウントとパスワードを入力してください";
                        }
                        this.errorPopup()
                    } else if (this.password.length === 0) {
                        if (this.langValue === 'ch') {
                            this.message = "請輸入密碼欄位";
                        } else if (this.langValue === 'en') {
                            this.message = "You haven't filled in password field yet";
                        } else if (this.langValue === 'jp') {
                            this.message = "パスワード欄を入力してください";
                        }
                        this.errorPopup()
                    } else if (this.employeeId.length === 0) {
                        if (this.langValue === 'ch') {
                            this.message = "請輸入員工ID或帳號";
                        } else if (this.langValue === 'en') {
                            this.message = "You haven't filled in employee ID or account yet";
                        } else if (this.langValue === 'jp') {
                            this.message = "社員番号またはアカウントを入力してください";
                        }
                        this.errorPopup()
                    }

                })
        },
        closePopup() {
            this.showPopup = false;
            this.popupData.title = "";
            this.popupData.content = "";
            // if (this.employeeInfo.success) {
            //     this.id = "";
            //     this.account = "";
            //     this.password = "";
            //     this.rePassword = "";
            // }
        },
        successPopup() {
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
        changeLanguage() {
            if (this.langValue === 'en') {
                this.titleStr = 'Login';
                this.employeeIdPHStr = 'Please input your employee ID or account';
                this.pwdPHStr = 'Please input your password';
                this.commitBtnStr = 'Sign up';
                this.loginBtnStr = 'Login'
                this.keepLog = 'Keep Login';
                this.forgetPsdStr = 'Forgot Password'
                this.popupData.backBtn = 'Back';
                this.pwdStr = 'Password',
                    this.employeeIdStr = 'Employee ID / Account'
            } else if (this.langValue === 'ch') {
                this.titleStr = '登入';
                this.employeeIdPHStr = '請輸入您的員工ID或帳號';
                this.pwdPHStr = '請輸入密碼';
                this.commitBtnStr = '註冊';
                this.loginBtnStr = '登入'
                this.keepLog = '保持登入';
                this.forgetPsdStr = '忘記密碼'
                this.popupData.backBtn = '返回';
                this.pwdStr = '密碼',
                    this.employeeIdStr = '員工ID / 帳號'
            } else if (this.langValue === 'jp') {
                this.titleStr = 'ログイン';
                this.employeeIdPHStr = '社員番号またはアカウントを入力してください';
                this.pwdPHStr = 'パスワードを入力してください';
                this.commitBtnStr = 'アカウント登録';
                this.loginBtnStr = 'ログイン'
                this.keepLog = 'ログイン状態を保持する';
                this.forgetPsdStr = 'パスワードを忘れた場合'
                this.popupData.backBtn = '戻る';
                this.pwdStr = 'パスワード',
                    this.employeeIdStr = '社員番号/アカウント'
            }
        }
    },
    beforeCreate() {
        //如果存在localStroage/sessionStorage，則跳過登入頁，直接進到首頁
        if (localStorage.getItem('accountId') || sessionStorage.getItem('accountId')) {
            this.$router.push('/employeeHome')
        }

    },
    mounted() {
        //檢查及修改介面語言
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
            <h2>{{ titleStr }}</h2>

            <div class="area1">
                <!-- id輸入 -->
                <div>
                    <label for="emid">{{ employeeIdStr }}</label>
                    <div class="emploIdInput">
                        <i class="fa-solid fa-user"></i>
                        <input id="emid" :placeholder="employeeIdPHStr" type="text" v-model="employeeId">
                    </div>
                </div>


                <!-- password輸入 -->
                <div>
                    <label for="password">{{ pwdStr }}</label>
                    <div class="idInput">
                        <i class="fa-sharp fa-solid fa-key"></i>
                        <input id="password" :placeholder="pwdPHStr" type="password" v-model="password">
                    </div>
                </div>


            </div>

            <div class="area2">
                <div class="checkbox_help">
                    <!-- 保持登入 -->
                    <div class="keepInput">
                        <input id="keep" type="checkbox" v-model="keepLogin">
                        <label for="keep">{{ keepLog }}</label>
                    </div>
                    <!-- 忘記密碼 -->
                    <div class="forgetpassword">
                        <i class="fa-regular fa-circle-question"></i>
                        {{ forgetPsdStr }}
                    </div>
                </div>
                <!-- 登入按鈕 -->
                <div class="btnGroup">
                    <RouterLink to="/signup" tag="button" class="signUpBtn">{{ commitBtnStr }}</RouterLink>
                    <button type="button" class="loginBtn" to="/employeeHome" tag="button" @click="login2">{{ loginBtnStr
                    }}</button>

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
    overflow: hidden;

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

    .login {
        background-color: rgba(255, 255, 255, 0.724);
        border: 2px solid rgb(177, 208, 224);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        width: 28%;
        height: 74%;
        border-radius: 5px;

        label {
            font-size: 2vh;
        }

        h2 {
            margin-top: 40px;
            font-size: 38px;
            font-weight: bold;

        }

        .area1 {
            position: relative;
            display: flex;
            flex-direction: column;
            height: 40%;
            width: 80%;
            justify-content: space-around;

            %inputFrameSetting {
                width: 100%;
                position: relative;
                height: max-content;

                input {
                    cursor: pointer;
                    width: 100%;
                    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
                    padding-left: 28px;
                    height: 5vh;
                    border-radius: 5px;
                    font-size: 2.1vh;
                    border: 1.5px solid #000;
                    transition: 0.5s;

                    &:focus {
                        background-color: rgb(227, 244, 255);
                    }
                }
            }

            .emploIdInput {
                @extend %inputFrameSetting;

                .fa-user {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 2%;
                }
            }

            .idInput {
                @extend %inputFrameSetting;

                .fa-sharp {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 2%;
                }

            }




        }

        .area2 {
            display: flex;
            flex-direction: column;
            width: 100%;
            justify-content: space-evenly;

            .checkbox_help {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-bottom: 5%;

                .keepInput {
                    display: flex;

                    label {
                        cursor: pointer;
                        font-size: 2.1vh;
                    }

                    input {
                        margin-right: 8px;
                        width: 18px;
                    }
                }

                .forgetpassword {
                    cursor: pointer;
                    font-size: 2vh;

                    i {
                        margin-right: 5px;
                    }
                }

            }

            .btnGroup {
                display: flex;
                justify-content: space-around;
                margin-bottom: 3%;
            }

            .signUpBtn,
            .loginBtn {
                background: rgb(26, 55, 77);
                display: flex;
                justify-content: center;
                align-items: center;
                text-decoration: none;
                border: 1px solid #000;
                color: white;
                border-radius: 5px;
                width: 8vw;
                height: 5vh;
                transition: 0.4s;
                font-size: 2.1vh;


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