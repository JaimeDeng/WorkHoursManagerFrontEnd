<script>
import { RouterLink, RouterView } from 'vue-router'
export default{
    components: {
    RouterLink
  }
}
</script>
<template>

    <div class="main">
        <div class="login">
            <h2>登入系統</h2>

            <div class="area1">
                 <!-- id輸入 -->
                <label for="emid">
                    <i class="fa-solid fa-user"></i>
                </label>
                <input id="emid" placeholder="請輸入員工ID" type="text">
                <!-- password輸入 -->
                <label for="password">
                    <i class="fa-sharp fa-solid fa-key"></i>
                </label>
                <input id="password" placeholder="請輸入密碼" type="password">
            </div>
            
            <div class="area2">
                <div class="checkbox_help">
                    <!-- 保持登入 -->
                    <div class="keepInput">
                        <input id="keep" type="checkbox">
                        <label for="keep">保持登入</label>
                    </div>
                    <!-- 忘記密碼 -->
                    <div class="forgetpassword">
                        <i class="fa-regular fa-circle-question"></i>
                        忘記密碼
                    </div>
                </div>
                <!-- 登入按鈕 -->
                
                    <button type="button">登入</button>
                
                
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
            display: flex;
            flex-direction: column;
            height: 30%;
            width: 70%;
            justify-content: space-between;

            input {
                cursor: pointer;
                box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);

            }

            label {
                position: relative;

                i {
                    position: absolute;
                    top: 18px;
                    left: 8px;
                }
            }

            input {
                padding-left: 28px;
                height: 40px;
                border-radius: 5px;
                border: 1.5px solid #000;
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
                width: 100px;
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