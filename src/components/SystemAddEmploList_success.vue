<script></script>
<template>
    <div class="main">
        <div class="add">
            <h4>新增人員名單</h4>
            <!-- 填寫區 -->
           <h3>新增成功</h3>
            <!-- 底部按鈕 -->
            <div class="area2">
                <button type="button">返回首頁</button>
                <button type="button">繼續新增</button>
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

    .add {
        background-color: rgba(255, 255, 255, 0.724);
        border: 2px solid rgb(177, 208, 224);
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 40%;
        height: 80%;
        h4{
            font-size: 32px;
            font-weight: bold;
        }

        

        .area2 {
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding: 0 8px;

            button {
                background: rgb(26, 55, 77);
                border: 1.5px solid #000;
                color: white;
                border-radius: 5px;
                width: 100px;
                height: 30px;
                font-size: 15px;

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