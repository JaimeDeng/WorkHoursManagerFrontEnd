<script></script>
<template>
    <div class="main">
        <div class="add">
            <h4>新增人員名單</h4>
            <!-- 填寫區 -->
            <div class="area1">
                <!-- 左側填寫區 -->
                <div class="info">
                    
                    <label for="emploId">員工ID</label>
                    <input type="text" id="emploId">
                    <label for="emploName">姓名</label>
                    <input type="text" id="emploName">
                    <label for="">性別</label>
                    <select>
                        <option selected>請選擇性別</option>
                        <option value="1">男</option>
                        <option value="2">女</option>
                        
                    </select>
                    <label for="">信箱</label>
                    <input type="email" id="">
                    
                    
                </div>
                <!-- 右側填寫區 -->
                <div class="detail">
                    <label for="">部課</label>
                    <input type="text" id="">
                    <label for="">職稱</label>
                    <input type="text" id="">
                    <label for="">職等</label>
                    <input type="text" id="">
                    <label for="">主管ID</label>
                    <input type="text" id="">
                    <label for="">下屬ID</label>
                    <input type="text" id="">

                </div>
            </div>
            <!-- 底部按鈕 -->
            <div class="area2">
                <button type="button">返回首頁</button>
                <button type="button">新增</button>
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
        justify-content: space-evenly;
        align-items: center;
        width: 50%;
        height: 90%;
        h4{
            font-size: 32px;
            font-weight: bold;
        }

        .area1 {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            width: 100%;
            margin-top: 8px;

            .info {
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-right: 48px;
                label{
                    font-size: 15px;
                }
                input,
                select {
                    height: 30px;
                    margin-bottom: 8px;
                    border-radius: 5px;
                    border:1px solid #000;

                }

            }

            .detail {
                display: flex;
                flex-direction: column;
                label{
                    font-size: 15px;
                }

                input {
                    margin-bottom: 8px;
                    height: 30px;
                    border-radius: 5px;
                    border:1px solid #000;

                }

            }
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