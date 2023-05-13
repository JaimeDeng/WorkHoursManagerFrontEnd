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
            },
            "employeeId": null,
            "password": null,
            "keepLogin": false,
            message: ""
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
                    "employeeId": this.employeeId,
                    "password": this.password
                }),
            })
                .then(res => res.json())
                .then(data => {
                    if (this.password === null && this.employeeId === null) {
                        this.message="請輸入員工ID及密碼"
                        this.errorPopup()
                    } else if (this.password === null) {
                        this.message="密碼不得為空"
                        this.errorPopup()
                    } else if (this.employeeId === null) {
                        this.message="請輸入員工ID,不得為空白"
                    } else if (data.success === false) {
                        this.message=data.message
                        this.errorPopup()
                    } else if (this.password !== data.password) {
                        this.message="密碼錯誤"
                        this.errorPopup()
                    } else if (this.password === data.password && data.success === true) {
                        if (this.keepLogin === true) {
                            //有勾選keepLogin長存
                            localStorage.setItem("employeeId", this.employeeId)
                            localStorage.setItem("accountId", data.accountId)
                            this.$router.push('/employeeHome')
                        } else {
                            //沒有勾選keepLogin短存
                            sessionStorage.setItem("employeeId", this.employeeId)
                            sessionStorage.setItem("accountId", data.accountId)
                            this.$router.push('/employeeHome')
                        }


                    }

                })

        },
        closePopup() {
            this.showPopup = false;
            this.popupData.title = "";
            this.popupData.content = "";
            if (this.employeeInfo.success) {
                this.id = "";
                this.account = "";
                this.password = "";
                this.rePassword = "";
            }
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
    }
}
</script>
<template>
    <div class="main">
        <!--子元件要使用v-model綁定props變數 , 綁定命名的部分使用橫槓命名規則-->
        <popup ref="popup" class="popup" :popup-data="popupData" :show-popup="showPopup" @close="closePopup"></popup>
        <div v-if="showPopup" ref="mask" class="mask"></div>

        <div class="login">
            <h2>登入系統</h2>

            <div class="area1">
                <!-- id輸入 -->
                <div class="emploIdInput">
                    <i class="fa-solid fa-user"></i>
                    <input id="emid" placeholder="請輸入員工ID" type="text" v-model="employeeId">

                </div>

                <!-- password輸入 -->
                <div class="idInput">
                    <i class="fa-sharp fa-solid fa-key"></i>
                    <input id="password" placeholder="請輸入密碼" type="password" v-model="password">
                </div>

            </div>

            <div class="area2">
                <div class="checkbox_help">
                    <!-- 保持登入 -->
                    <div class="keepInput">
                        <input id="keep" type="checkbox" v-model="keepLogin">
                        <label for="keep">保持登入</label>
                    </div>
                    <!-- 忘記密碼 -->
                    <div class="forgetpassword">
                        <i class="fa-regular fa-circle-question"></i>
                        忘記密碼
                    </div>
                </div>
                <!-- 登入按鈕 -->
                <RouterLink to="/signup" tag="button" class="btn">註冊</RouterLink>

                <button type="button" @click="login">登入</button>

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

    .popup {
        position: absolute;
        bottom: -20%;
        opacity: 0;
        transition: 0.2s;
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
        width: 25%;
        height: 70%;
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
            height: 40%;
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
                    padding-left: 28px;
                    height: 40px;
                    border-radius: 5px;
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
            width: 100%;
            justify-content: space-evenly;

            .checkbox_help {
                display: flex;
                flex-direction: column;

                .keepInput {
                    display: flex;

                    label {
                        cursor: pointer;
                    }

                    input {
                        margin-right: 8px;
                        width: 18px;
                    }
                }

                .forgetpassword {
                    cursor: pointer;

                    i {
                        margin-right: 5px;
                    }
                }

            }

            button,.btn {
                background: rgb(26, 55, 77);
                border: 1px solid #000;
                color: white;
                border-radius: 5px;
                width: 80px;
                height: 40px;
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