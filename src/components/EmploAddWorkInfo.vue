<script></script>
<template>
    <div class="main">
        <div class="add">
            <h4>新增工作時數表</h4>
            <!-- 填寫區 -->
            <div class="area1">
                <!-- 左側填寫區 -->
                <div class="info">
                    <label for="formNum">工時表單號</label>
                    <input type="text" id="formNum">
                    <label for="date">日期</label>
                    <input type="date" id="date">
                    <label for="type">機型</label>
                    <input type="text" id="type">
                    <label for="productNum">製造號碼</label>
                    <input type="text" id="productNum">
                    <label for="">狀態</label>
                    <select>
                        <option value="1">出勤</option>
                        <option value="2">公假</option>
                        <option value="3">病假</option>
                        <option value="4">事假</option>
                        <option value="5">特休</option>
                        <option value="6">工傷</option>
                        <option value="7">天災</option>
                    </select>
                </div>
                <!-- 右側填寫區 -->
                <div class="detail">
                    <label for="">開始時間</label>
                    <input type="time">
                    <label for="">結束時間</label>
                    <input type="time">
                    <div class="mes form-floating">
                        <textarea class="mesarea form-control" placeholder="Leave a comment here" id="floatingTextarea2"
                            style="height: 155px"></textarea>
                        <label for="floatingTextarea2">回報</label>
                    </div>
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

                .mes {
                    margin-top: 20px;
                    .mesarea {
                        box-shadow: none;
                        border-color:#000;
                    }

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