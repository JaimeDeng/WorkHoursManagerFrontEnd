<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
    components: {
        RouterLink
    },
    data() {
        return {
            "employeeId": null,
            "password": null,
            "keepLogin": false
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
                    console.log(data)
                    if (this.password === null && this.employeeId === null) {
                        alert("不得為空")
                    } else if (this.password === null) {
                        alert("密碼不得為空")
                    } else if (this.employeeId === null) {
                        alert("請輸入員工ID,不得為空白")
                    } else if (data.success === false) {
                        alert(data.message)
                    } else if (this.password !== data.password) {
                        alert("密碼錯誤")
                    } else if (this.password === data.password && data.success === true) {
                        alert(data.message)
                        if (this.keepLogin === true) {
                            //長存
                            localStorage.setItem("employeeId", this.employeeId)
                            localStorage.setItem("accountId", data.accountId)
                            this.$router.push('/employeeHome')
                        } else {
                            //短存
                            sessionStorage.setItem("employeeId", this.employeeId)
                            sessionStorage.setItem("accountId", data.accountId)
                            this.$router.push('/employeeHome')
                        }
                       

                    }

                })

        }
    }
}
</script>
<template>
    <div class="main">
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
                <RouterLink to="/signup"><button type="button">註冊</button></RouterLink>

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

            button {
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