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
            },
            newPsd: "",
            againNewPsd: "",
            message: "",
            isInputInvalid : 0
        }
    },
    methods: {
        changePsd() {
            //先檢查密碼格式
            let pwdPattern = /^[a-zA-Z0-9]{8,20}$/;
            let pwd = this.$refs.password.value;
            let rePassword = this.$refs.rePassword.value;
            let error = false;

            if (this.newPsd.length === 0) {
                this.message = "請輸入密碼欄位";
                error = true;
                if (error) {
                    this.errorPopup();
                    return;
                }
            }
            if (this.againNewPsd.length === 0) {
                this.message = "請再次輸入密碼";
                error = true;
                if (error) {
                    this.errorPopup();
                    return;
                }
            }

            if (!pwdPattern.test(pwd)) {
                this.message = "密碼格式錯誤:請輸入8~20字符的英數字";
                error = true;
                if (error) {
                    this.errorPopup();
                    return;
                }
            }
            if (pwd !== rePassword) {
                this.message = "重複輸入的密碼與設定的密碼不符!";
                error = true;
                if (error) {
                    this.errorPopup();
                    return;
                }
            } else {

                //密碼加密為Base64再存入資料庫
                let securePwd = btoa(pwd);
                let a = atob(securePwd);
                console.log(securePwd);
                console.log(a);

                fetch("http://localhost:3000/changPassword", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "accountId": sessionStorage.getItem("accountId") || localStorage.getItem("accountId"),
                        "password": this.newPsd,
                        "employeeId": sessionStorage.getItem("employeeId") || localStorage.getItem("employeeId"),
                        "newPassword": this.againNewPsd
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.success) {
                            this.message = data.message
                            this.successPopup()
                        } else {
                            this.message = data.message
                            this.errorPopup()
                        }
                        this.newPsd = ""
                        this.againNewPsd = ""
                    })

            }
        },
        closePopup() {
            this.showPopup = false;
            this.popupData.title = "";
            this.popupData.content = "";
            
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
            }
        }
    },
    beforeCreate() {
        //如果localStroage/sessionStorage都沒有accountId，則跳到登入頁面，要求重新登入
        if (!localStorage.getItem('accountId')&&!sessionStorage.getItem('accountId')) {
            this.$router.push('/login')

        }

    }
}
</script>
<template>
    <div class="main">

        <!--子元件要使用v-model綁定props變數 , 綁定命名的部分使用橫槓命名規則-->
        <popup ref="popup" class="popup" :popup-data="popupData" :show-popup="showPopup" @close="closePopup"></popup>
        <div v-if="showPopup" ref="mask" class="mask"></div>

        <div class="login">
            <h2>變更密碼</h2>

            <div class="area1">
                <!-- 新密碼輸入 -->
                <div class="newPsdInput">
                    <i class="fa-sharp fa-solid fa-key"></i>
                    <input id="emid" placeholder="請輸入新密碼" type="text" v-model="newPsd" ref="password"
                        :style="{ backgroundColor: isInputInvalid === 3 ? 'rgb(255, 205, 205)' : '' }" maxlength="20"
                        @input="checkInputLegth('password')">
                </div>

                <!-- 再次輸入新密碼 -->
                <div class="againNewPsd">
                    <i class="fa-sharp fa-solid fa-key"></i>
                    <input id="password" placeholder="請再次輸入新密碼" type="password" v-model="againNewPsd" ref="rePassword"
                        :style="{ backgroundColor: isInputInvalid === 4 ? 'rgb(255, 205, 205)' : '' }" maxlength="20"
                        @input="checkInputLegth('rePassword')">
                </div>

            </div>

            <!-- 按鈕 -->
            <div class="area2">
                <RouterLink to="/employeeHome" tag="button" class="btnChangPsd">返回首頁</RouterLink>

                <button type="button" class="btnChangPsd" @click="changePsd">確定變更</button>


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

            .newPsdInput,
            .againNewPsd {
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