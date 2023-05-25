<script></script>
<template>
    <div class="main">
        <div class="check">
            <!-- 左側範圍 -->
            <div class="left">
                <div class="title_search">
                    <p>員工日工時表</p>
                    <div>
                        <label for="serch"><i class="fa-solid fa-magnifying-glass"></i></label>
                        <input id="serch" type="text" placeholder="請輸入員工ID,姓名">
                    </div>

                </div>
                <!-- 手風琴 -->
                <div class="sheet" style="overflow-y: scroll; max-height: 320px;">
                    <div class="accordion accordion-flush" id="accordionFlushExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseOne" aria-expanded="false"
                                    aria-controls="flush-collapseOne">
                                    時間:2023/05/07 工時表單號:001
                                </button>
                            </h2>
                            <div id="flush-collapseOne" class="accordion-collapse collapse"
                                aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <!-- 手風琴內容區 -->
                                    <p>日期:</p>
                                    <p>機型:</p>
                                    <p>製造號碼:</p>
                                    <p>開始時間:</p>
                                    <p>結束時間:</p>
                                    <p>出勤狀態:</p>
                                    <p>回報: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus cumque
                                        voluptatem obcaecati accusamus rem, quaerat nobis pariatur eligendi quis
                                        reprehenderit.</p>
                                    <div class="btnArea">
                                        <button class="deleBtn" type="button">刪除</button>
                                        <button type="button">編輯</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseTwo" aria-expanded="false"
                                    aria-controls="flush-collapseTwo">
                                    時間:2023/05/07 工時表單號:002
                                </button>
                            </h2>
                            <div id="flush-collapseTwo" class="accordion-collapse collapse"
                                aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <!-- 手風琴內容區 -->
                                    <p>日期:</p>
                                    <p>機型:</p>
                                    <p>製造號碼:</p>
                                    <p>開始時間:</p>
                                    <p>結束時間:</p>
                                    <p>出勤狀態:</p>
                                    <p>回報: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus cumque
                                        voluptatem obcaecati accusamus rem, quaerat nobis pariatur eligendi quis
                                        reprehenderit.</p>

                                    <div class="btnArea">
                                        <button class="deleBtn" type="button">刪除</button>
                                        <button type="button">編輯</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingThree">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseThree" aria-expanded="false"
                                    aria-controls="flush-collapseThree">
                                    時間:2023/05/07 工時表單號:004
                                </button>
                            </h2>
                            <div id="flush-collapseThree" class="accordion-collapse collapse"
                                aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <!-- 手風琴內容區 -->
                                    <p>日期:</p>
                                    <p>機型:</p>
                                    <p>製造號碼:</p>
                                    <p>開始時間:</p>
                                    <p>結束時間:</p>
                                    <p>出勤狀態:</p>
                                    <p>回報: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus cumque
                                        voluptatem obcaecati accusamus rem, quaerat nobis pariatur eligendi quis
                                        reprehenderit.</p>
                                    <div class="btnArea">
                                        <button class="deleBtn" type="button">刪除</button>
                                        <button type="button">編輯</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 右側範圍 -->
            <div class="right">
                <div class="title">編輯資訊</div>
                <div class="area1">
                    <button type="button" class="who">工時表單號: 12345</button>
                    <!-- 修改區 -->
                    <div class="edit">
                        <div>
                            <label for="">日期:</label>
                            <input type="text">
                        </div>
                        <div>
                            <label for="">機型:</label>
                            <input type="text">
                        </div>
                        <div>
                            <label for="">製造號碼:</label>
                            <input type="text">
                        </div>
                        <div>
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
                        </div>
                        <div>
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
                        </div>

                        <div>
                            <label for="">出勤狀態:</label>
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

                        <div>
                            <div class="mes form-floating">
                                <textarea class="mesarea form-control" placeholder="Leave a comment here"
                                    id="floatingTextarea2" style="height: 50px"></textarea>
                                <label for="floatingTextarea2">回報</label>
                            </div>
                        </div>


                    </div>

                </div>
                <div class="btnArea">
                    <button type="button">返回首頁</button>
                    <button type="button">送出修改</button>
                </div>
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

    .check {

        width: 70%;
        height: 90%;
        display: flex;
        justify-content: space-evenly;

        //左側
        .left {
            padding: 12px;
            background-color: rgba(255, 255, 255, 0.724);
            border: 2px solid rgb(177, 208, 224);
            border-radius: 1vh;
            width: 50%;

            .title_search {
                display: flex;
                width: 100%;
                justify-content: space-between;
                align-items: baseline;

                p {
                    font-size: 23px;
                    font-weight: bold;
                }

                div {
                    label {
                        position: relative;

                        i {
                            position: absolute;
                            top: -14px;
                            left: 5px;
                        }
                    }

                    input {
                        border-radius: 50px;
                        padding-left: 26px;
                        border: 1px solid #000;

                    }
                }

            }

            .sheet {
                border-radius: 1vh;

                .accordion-button {
                    word-spacing: 2em;

                    i {
                        font-size: 8px;
                        margin-bottom: 6px;
                        margin-right: 8px;
                    }
                    &:hover{
                        background-color: rgb(105, 152, 171);
                        color:white;
                    }
                }

                .accordion-body {
                    .btnArea {
                        display: flex;
                        justify-content: space-between;

                        button {
                            background-color: rgb(39, 46, 67);
                            border: 1px solid #000;
                            color: white;
                            border-radius: 1vh;
                            width: 80px;
                            font-size: 16px;

                            &:hover {
                                background-color: rgb(75, 75, 101);
                            }

                            &:active {
                                transform: scale(0.95);
                            }
                        }

                        .deleBtn {
                            background: rgb(141, 51, 21);
                            border: 1px solid #000;
                            color: white;
                            border-radius: 5px;
                            font-size: 16px;

                            &:hover {
                                background-color: rgb(184, 68, 29);
                            }

                            &:active {
                                transform: scale(0.95);
                            }
                        }
                    }

                }
            }

        }

        //右側
        .right {
            background-color: rgba(255, 255, 255, 0.724);
            border: 2px solid rgb(177, 208, 224);
            border-radius: 5px;
            width: 35%;
            padding: 12px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            justify-content: flex-start;

            .title {
                font-size: 23px;
                font-weight: bold;

            }

            .area1 {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 18px;

                .who {
                    color: #000;
                    margin-bottom: 8px;
                    border-radius: 5px;
                    border: 1px solid #000;
                    background-color: rgb(105, 152, 171);
                }

                .edit {
                    display: flex;
                    flex-direction: column;

                    div {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }

                    label {
                        font-size: 15px;
                    }

                    select,
                    input {
                        height: 30px;
                        width: 60%;
                        margin-bottom: 4px;
                        border-radius: 5px;
                        border: 1px solid #000;
                    }
                    .mes {
                        width: 100%;
                    .mesarea {
                        box-shadow: none;
                        border-color:#000;
                    }

                }
                }


            }


            .btnArea {
                display: flex;
                justify-content: space-between;
                align-items: end;
                width: 100%;
                height: 100%;

                button {
                    background-color: rgb(39, 46, 67);
                    border: 1.5px solid #000;
                    color: white;
                    border-radius: 5px;
                    width: 100px;
                    height: 30px;
                    font-size: 15px;

                    &:hover {
                        background-color: rgb(75, 75, 101);
                    }

                    &:active {
                        transform: scale(0.95);
                    }
                }
            }
        }
    }


}
</style>