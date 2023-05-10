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
            <p class="timeText">時間: 2023/05/07</p>

            <div class="area1" style="overflow-y: scroll; max-height: 250px;">
                <p>人員ID: <span>00967</span></p>
                <p>人員姓名: <span>莊員工</span></p>
                <p>工作詳情: <span>機台故障Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, tenetur consectetur. Accusantium quod iste, perspiciatis ad similique officia fuga in. </span></p>
                <p>當日狀態: <span>出勤</span></p>
                <p>審核人員ID: <span>TCE0077</span></p>
                <p>審核進度:<span>待審核</span></p>
                 
            </div>

            <!-- 按鈕 -->
            <div class="area2">
                <button type="button">返回</button>
                <button type="button">確定審核</button>


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
        justify-content: space-between;
        width: 40%;
        height: 90%;
        border-radius: 5px;
        padding: 20px;
        .timeText{
            font-size: 18px;
            text-align: end;
        }
    
        .area1 {
            background-color: white;
            padding: 12px;
            border-radius: 5px;
            p{
                font-size: 16px;

            }
           
        }

        .area2 {
            display: flex;
            width: 100%;
            justify-content: space-between;


            button {
                background: rgb(26, 55, 77);
                border: 1px solid #000;
                color: white;
                border-radius: 5px;
                width: 100px;
                height: 30px;
                // font-weight: bold;
                font-size: 16px;

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