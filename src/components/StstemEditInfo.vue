<script>
export default {
    data(){
        return{
            infoList:[]
        }
    },
    beforeCreate() {
        fetch("http://localhost/getAllEmployeeInfo")
            .then(function (response) {
                //從json轉回JS物件
                return response.json()
            })
            .then(function (data) {
                
                this.infoList = data;

            })
            .catch(function (error) {
                //沒有抓成功的話 就會進catch
                console.log(error)
            })

    }
}
</script>
<template>
    <div class="main">
        <div class="check">
            <!-- 左側範圍 -->
            <div class="left">
                <div class="title_search">
                    <p>編輯人員資訊</p>
                    <div>
                        <label for="serch"><i class="fa-solid fa-magnifying-glass"></i></label>
                        <input id="serch" type="text" placeholder="請輸入員工ID,姓名">
                    </div>

                </div>
                <!-- 手風琴 -->
                <div class="sheet" style="overflow-y: auto; ">
                    <div class="accordion accordion-flush" id="accordionFlushExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseOne" aria-expanded="false"
                                    aria-controls="flush-collapseOne">
                                    員工ID:000929 姓名:莊員工
                                </button>
                            </h2>
                            <div id="flush-collapseOne" class="accordion-collapse collapse"
                                aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <!-- 手風琴內容區 -->
                                    <p>員工ID:<span>000929</span></p>
                                    <p>姓名:<span>莊員工</span></p>
                                    <p>主管:<span>false</span></p>
                                    <p>信箱:<span>aaa8080@gmail.com</span></p>
                                    <p>審核人員ID:</p>
                                    <button type="button">編輯</button>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseTwo" aria-expanded="false"
                                    aria-controls="flush-collapseTwo">
                                    員工ID:043929 姓名:林員工
                                </button>
                            </h2>
                            <div id="flush-collapseTwo" class="accordion-collapse collapse"
                                aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <!-- 手風琴內容區 -->
                                    <p>員工ID:<span>043929</span></p>
                                    <p>姓名:<span>林員工</span></p>
                                    <p>主管:<span>false</span></p>
                                    <p>信箱:<span>bbb7733@gmail.com</span></p>
                                    <p>審核人員ID:</p>
                                    <button type="button">編輯</button>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingThree">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseThree" aria-expanded="false"
                                    aria-controls="flush-collapseThree">
                                    員工ID:000379 姓名:王經理
                                </button>
                            </h2>
                            <div id="flush-collapseThree" class="accordion-collapse collapse"
                                aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <!-- 手風琴內容區 -->
                                    <p>員工ID:<span>000379</span></p>
                                    <p>姓名:<span>王經理</span></p>
                                    <p>主管:<span>true</span></p>
                                    <p>信箱:<span>sss333@gmail.com</span></p>
                                    <p>審核人員ID:</p>
                                    <button type="button">編輯</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                 <RouterLink to="/employeeHome"><button type="button" class="back">返回首頁</button></RouterLink>
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
    height: 100vh;
    width: 100%;
    .check {

        position: relative;
        width: 80%;
        height: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        //左側
        .left {
            position: relative;
            padding: 1vw;
            background-color: rgba(255, 255, 255, 0.724);
            border: 2px solid rgb(177, 201, 224);
            border-radius: 5px;
            width: 90%;
            height: 75vh;
            overflow: hidden;


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
                border-radius: 5px;

                .accordion-button {
                    word-spacing: 1rem;

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

        .back {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                bottom: 2%;
                left: 1%;
                background: rgb(26, 55, 77);
                border: 1px solid #000;
                color: white;
                border-radius: 5px;
                width: max-content;
                height: 3vh;
                font-size: 2vh;
                padding: 1vh 1vw;
                transition: 0.4s;

                &:hover {
                    background-color: rgb(64, 104, 130);
                }

                &:active {
                    transform: scale(0.95);
                }
            }
        
    }


}
</style>