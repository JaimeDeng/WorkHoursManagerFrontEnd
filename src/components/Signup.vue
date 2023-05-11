<script>
import { RouterLink, RouterView } from 'vue-router'
export default (await import('vue')).defineComponent({
components: {
    RouterLink
},
data() {
return{

}
},
methods: {

},
mounted() {

}
})
</script>
<template>

    <div class="main">
        <div class="login">
            <h2>註冊</h2>

            <div class="area1">
                <!-- 員工ID輸入 -->
                <div class="employeeIdInputFrame">
                    <i class="fa-solid fa-user"></i>
                    <input maxlength="20" id="setAccount" placeholder="請輸入您的員工ID" type="text">
                </div>
                <!-- 帳號輸入 -->
                <div class="accountInputFrame">
                    <i class="fa-solid fa-user"></i>
                    <input maxlength="20" id="setAccount" placeholder="請設定帳號" type="text">
                </div>
                <!-- password輸入 -->
                <div class="pwdInputFrame">         
                    <i class="fa-sharp fa-solid fa-key"></i>
                    <input maxlength="20" id="setPassword" placeholder="請設定密碼" type="password">
                </div>
                <!-- password再次輸入 -->
                <div class="rePwdInputFrame">         
                    <i class="fa-sharp fa-solid fa-key"></i>
                    <input maxlength="20" id="repeatPassword" placeholder="請再次輸入密碼" type="password">
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
            justify-content: space-between;

            %inputFrameSetting{
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