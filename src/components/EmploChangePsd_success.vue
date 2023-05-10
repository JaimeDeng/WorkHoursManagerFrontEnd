<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
    components: {
        RouterLink
    }
}
</script>
<template>
    <div class="main">
        <div class="login">
            <h2>變更密碼</h2>

            <div class="area1">
               <h3>密碼變更完成</h3>
            </div>

            <!-- 按鈕 -->
            <div class="area2">
                <button type="button">返回</button>
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
           justify-content: center;
           align-items: center;
           

        }

        .area2 {
            display: flex;
            width: 100%;
            justify-content: space-evenly;


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