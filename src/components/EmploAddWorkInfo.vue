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
                    <label for="">出勤</label>
                    <select>
                        <option selected>請選擇出勤狀態</option>
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
                    <select>
                        <option selected>請選擇開始時間</option>
                        <option value="1">00:00</option>
                        <option value="2">00:30</option>
                        <option value="3">01:00</option>
                        <option value="4">01:30</option>
                        <option value="5">02:00</option>
                        <option value="6">02:30</option>
                        <option value="7">03:00</option>
                        <option value="8">03:30</option>
                        <option value="9">04:00</option>
                        <option value="10">04:30</option>
                        <option value="11">05:00</option>
                        <option value="12">05:30</option>
                        <option value="13">06:00</option>
                        <option value="14">06:30</option>
                        <option value="15">07:00</option>
                        <option value="16">07:30</option>
                        <option value="17">08:00</option>
                        <option value="18">08:30</option>
                        <option value="19">09:00</option>
                        <option value="20">09:30</option>
                        <option value="21">10:00</option>
                        <option value="22">10:30</option>
                        <option value="23">11:00</option>
                        <option value="24">11:30</option>
                        <option value="25">12:00</option>
                        <option value="26">12:30</option>
                        <option value="27">13:00</option>
                        <option value="28">13:30</option>
                        <option value="29">14:00</option>
                        <option value="1">14:30</option>
                        <option value="2">15:00</option>
                        <option value="3">15:30</option>
                        <option value="4">16:00</option>
                        <option value="5">16:30</option>
                        <option value="6">17:00</option>
                        <option value="7">17:30</option>
                        <option value="8">18:00</option>
                        <option value="9">18:30</option>
                        <option value="10">19:00</option>
                        <option value="11">19:30</option>
                        <option value="12">20:00</option>
                        <option value="13">20:30</option>
                        <option value="14">21:00</option>
                        <option value="15">21:30</option>
                        <option value="16">22:00</option>
                        <option value="17">22:30</option>
                        <option value="18">23:00</option>
                        <option value="19">23:30</option>
                        <option value="20">24:00</option>
                    </select>
                    <label for="">結束時間</label>
                    <select>
                        <option selected>請選擇結束時間</option>
                        <option value="1">00:00</option>
                        <option value="2">00:30</option>
                        <option value="3">01:00</option>
                        <option value="4">01:30</option>
                        <option value="5">02:00</option>
                        <option value="6">02:30</option>
                        <option value="7">03:00</option>
                        <option value="8">03:30</option>
                        <option value="9">04:00</option>
                        <option value="10">04:30</option>
                        <option value="11">05:00</option>
                        <option value="12">05:30</option>
                        <option value="13">06:00</option>
                        <option value="14">06:30</option>
                        <option value="15">07:00</option>
                        <option value="16">07:30</option>
                        <option value="17">08:00</option>
                        <option value="18">08:30</option>
                        <option value="19">09:00</option>
                        <option value="20">09:30</option>
                        <option value="21">10:00</option>
                        <option value="22">10:30</option>
                        <option value="23">11:00</option>
                        <option value="24">11:30</option>
                        <option value="25">12:00</option>
                        <option value="26">12:30</option>
                        <option value="27">13:00</option>
                        <option value="28">13:30</option>
                        <option value="29">14:00</option>
                        <option value="1">14:30</option>
                        <option value="2">15:00</option>
                        <option value="3">15:30</option>
                        <option value="4">16:00</option>
                        <option value="5">16:30</option>
                        <option value="6">17:00</option>
                        <option value="7">17:30</option>
                        <option value="8">18:00</option>
                        <option value="9">18:30</option>
                        <option value="10">19:00</option>
                        <option value="11">19:30</option>
                        <option value="12">20:00</option>
                        <option value="13">20:30</option>
                        <option value="14">21:00</option>
                        <option value="15">21:30</option>
                        <option value="16">22:00</option>
                        <option value="17">22:30</option>
                        <option value="18">23:00</option>
                        <option value="19">23:30</option>
                        <option value="20">24:00</option>
                    </select>
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

                input,select {
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