<script></script>
<template>
    <div class="main">
        <div class="check">
            <!-- 左側範圍 -->
            <div class="left">
                <div class="title_search">
                    <p>員工日工時表</p>
                    <!-- 篩選:員工ID,姓名 -->
                    <div class="selectFrame">
                        <label for="">員工ID,姓名</label>
                        <input id="serch" type="text" placeholder="請輸入員工ID,姓名">
                    </div>
                    <!-- 篩選:審核狀態 -->
                    <div class="selectFrame">
                        <label for="">審核狀態</label>
                        <select>
                            <option selected>請選擇審核狀態</option>
                            <option value="1">已審核</option>
                            <option value="2">待審核</option>
                        </select>
                    </div>

                    <!-- 篩選:人員部門 -->
                    <div class="selectFrame">
                        <label for="">人員部門</label>
                        <select>
                            <option selected>請選擇部門</option>
                            <option value="1">管理部</option>
                            <option value="2">IT部</option>
                            <option value="3">營業部</option>
                            <option value="4">製造部</option>
                        </select>
                    </div>

                    <!-- 篩選:時間範圍 -->
                    <div class="selectFrame">
                        <label for="">時間範圍</label>
                        <select>
                            <option selected>請選擇時間範圍</option>
                            <option value="1">7日</option>
                            <option value="2">14日</option>
                            <option value="3">30日</option>
                        </select>
                    </div>


                </div>
                <!-- 手風琴 -->
                <div class="sheet" style="overflow: auto;">
                    <div class="accordion accordion-flush" id="accordionFlushExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseOne" aria-expanded="false"
                                    aria-controls="flush-collapseOne">
                                    員工ID:000929 時間:2023/05/07 已審核
                                </button>
                            </h2>
                            <div id="flush-collapseOne" class="accordion-collapse collapse"
                                aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <!-- 手風琴內容區 -->
                                    <p>工作詳情:</p>
                                    <p>姓名:</p>
                                    <p>人員當日狀態:</p>
                                    <p>審核進度:已審核</p>
                                    <p>審核人員ID:</p>
                                    <RouterLink to="/manaApprove">查看</RouterLink>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseOne" aria-expanded="false"
                                    aria-controls="flush-collapseOne">
                                    員工ID:000929 時間:2023/05/07 已審核
                                </button>
                            </h2>
                            <div id="flush-collapseOne" class="accordion-collapse collapse"
                                aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <!-- 手風琴內容區 -->
                                    <p>工作詳情:</p>
                                    <p>姓名:</p>
                                    <p>人員當日狀態:</p>
                                    <p>審核進度:已審核</p>
                                    <p>審核人員ID:</p>
                                    <button type="button">查看</button>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseTwo" aria-expanded="false"
                                    aria-controls="flush-collapseTwo">
                                    員工ID:000929 時間:2023/05/07 已審核
                                </button>
                            </h2>
                            <div id="flush-collapseTwo" class="accordion-collapse collapse"
                                aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <!-- 手風琴內容區 -->
                                    <p>工作詳情:</p>
                                    <p>姓名:</p>
                                    <p>人員當日狀態:</p>
                                    <p>審核進度:已審核</p>
                                    <p>審核人員ID:</p>
                                    <button type="button">查看</button>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingThree">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseThree" aria-expanded="false"
                                    aria-controls="flush-collapseThree">
                                    員工ID:000929 時間:2023/05/07 待審核
                                </button>
                            </h2>
                            <div id="flush-collapseThree" class="accordion-collapse collapse"
                                aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <!-- 手風琴內容區 -->
                                    <p>工作詳情: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto magnam
                                        explicabo doloremque. Qui soluta ipsa, corrupti consectetur magni doloremque
                                        obcaecati! </p>
                                    <p>姓名:</p>
                                    <p>人員當日狀態:</p>
                                    <p>審核進度:待審核</p>
                                    <p>審核人員ID:</p>
                                    <button type="button">進行審核</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <RouterLink to="/managerHome" class="buttonlink">返回</RouterLink>
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
        height: 95%;
        display: flex;
        justify-content: space-evenly;

        //左側
        .left {
            padding: 2vw;
            background-color: rgba(255, 255, 255, 0.724);
            border: 2px solid rgb(177, 208, 224);
            border-radius: 5px;
            width: 100%;

            .title_search {
                display: flex;
                width: 100%;
                height: 15%;
                justify-content: space-between;
                align-items: baseline;

                p {
                    font-size: 23px;
                    font-weight: bold;
                }


                .selectFrame {
                    width: 12vw;

                    select,
                    input {
                        cursor: pointer;
                        width: 100%;
                        box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
                        padding-left: 2%;
                        height: 4vh;
                        font-size: 2vh;
                        border-radius: 5px;
                        border: 1.5px solid #000;
                        transition: 0.5s;

                        &:focus {
                            background-color: rgb(227, 244, 255);
                        }
                    }
                }

            }

            .sheet {
                border-radius: 5px;
                height: 58vh;
                margin-bottom: 2vh;
                .accordion-button {
                    word-spacing: 1em;

                    i {
                        font-size: 8px;
                        margin-bottom: 6px;
                        margin-right: 8px;
                    }

                    &:hover {
                        background-color: rgb(105, 152, 171);
                        color: white;
                    }
                }

                .accordion-body {
                    button {
                        background: rgb(26, 55, 77);
                        border: 1px solid #000;
                        color: white;
                        border-radius: 5px;
                        width: 80px;
                        margin-left: 280px;
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

        .buttonlink {
            background: rgb(26, 55, 77);
            border: 1px solid #000;
            color: white;
            border-radius: 5px;
            padding: 4px;
            margin: auto;
            font-size: 16px;
            text-decoration: none;
        
            &:hover {
                background-color: rgb(64, 104, 130);
            }

            &:active {
                transform: scale(0.95);
            }
        }
    }


}</style>