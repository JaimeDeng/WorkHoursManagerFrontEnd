<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
    data(){
        return{
            searchDate:'',
            langValue:'ch',
            title:'',
            search:'',
            reviewStatus:'',
            reviewStatusPH:'',
            reviewStatusOpt1:'',
            reviewStatusOpt2:'',
            timeScope:'',
            timeScopePH:'',
            timeScopeOpt1:'',
            timeScopeOpt2:'',
            timeScopeOpt3:'',
            backBtn:''

        }
    },
    methods:{
        changeLanguage(){
            if(this.langValue === 'ch'){
                this.title = '員工日工時表';
                this.search = '以日期搜尋';
                this.reviewStatus = '審核狀態';
                this.reviewStatusPH = '選擇審核狀態';
                this.reviewStatusOpt1 = '已審核';
                this.reviewStatusOpt2 = '未審核';
                this.timeScope = '時間範圍';
                this.timeScopePH = '請選擇時間範圍';
                this.timeScopeOpt1 = '7日';
                this.timeScopeOpt2 = '14日';
                this.timeScopeOpt3 = '30日';
                this.backBtn = '返回首頁'
            }else if(this.langValue === 'en'){
                this.title = '員工日工時表';
                this.search = '以日期搜尋';
                this.reviewStatus = '審核狀態';
                this.reviewStatusPH = '選擇審核狀態';
                this.reviewStatusOpt1 = '已審核';
                this.reviewStatusOpt2 = '未審核';
                this.timeScope = '時間範圍';
                this.timeScopePH = '請選擇時間範圍';
                this.timeScopeOpt1 = '7日';
                this.timeScopeOpt2 = '14日';
                this.timeScopeOpt3 = '30日';
                this.backBtn = '返回首頁'
            }else if(this.langValue === 'jp'){
                this.title = '員工日工時表';
                this.search = '以日期搜尋';
                this.reviewStatus = '審核狀態';
                this.reviewStatusPH = '選擇審核狀態';
                this.reviewStatusOpt1 = '已審核';
                this.reviewStatusOpt2 = '未審核';
                this.timeScope = '時間範圍';
                this.timeScopePH = '請選擇時間範圍';
                this.timeScopeOpt1 = '7日';
                this.timeScopeOpt2 = '14日';
                this.timeScopeOpt3 = '30日';
                this.backBtn = '返回首頁'
            }
        },
    },
    watch:{
        //監看searchDate的值變化 , date則是回遞該變數值
        searchDate(date){
            console.log(date);
        }
    },
    mounted(){
        //檢查及切換語言
        this.langValue = sessionStorage.getItem('langValue');
        console.log(this.langValue);
        this.changeLanguage();
    }
}
</script>
<template>
    <div class="main">
        <div class="check">
            <!-- 左側範圍 -->
            <div class="left">
                <div class="title_search">
                    <h4 class="fw-bold">{{ title }}</h4>
                    <div class="searchFrame">
                        <label for="serch">{{ search }}</label>
                        <div class="dateFrame">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <input @input="searchByDate" v-model="searchDate" id="serch" type="date">
                        </div>
                    </div>
                    <!-- 審核狀態 -->
                    <div class="sel">
                        <div class="ap">
                            <label for="">{{ reviewStatus }}</label>
                            <select>
                                <option selected>{{ reviewStatusPH }}</option>
                                <option value="1">{{ reviewStatusOpt1 }}</option>
                                <option value="2">{{ reviewStatusOpt2 }}</option>
                            </select>
                        </div>
                        <div class="tim">
                            <!-- 時間範圍 -->
                            <label for="">{{ timeScope }}</label>
                            <select>
                                <option selected>{{ timeScopePH }}</option>
                                <option value="1">{{ timeScopeOpt1 }}</option>
                                <option value="2">{{ timeScopeOpt2 }}</option>
                                <option value="3">{{ timeScopeOpt3 }}</option>
                            </select>
                        </div>

                    </div>

                </div>
                <!-- 手風琴 -->
                <div class="sheet" style="overflow: auto;">
                    <div class="accordion accordion-flush" id="accordionFlushExample" style="overflow: auto;">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseOne" aria-expanded="false"
                                    aria-controls="flush-collapseOne">
                                    時間:2023/05/07 已審核
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
                                    時間:2023/05/07 已審核
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
                                    時間:2023/05/07 待審核
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
                                    <button type="button">查看</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <RouterLink to="/employeeHome"><button type="button" class="back">{{ backBtn }}</button></RouterLink>
            </div>



        </div>

    </div>
</template>


<style lang="scss" scoped>
.main {
    flex-grow: 1;
    z-index: -1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .check {
        position: relative;
        width: 80%;
        height: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        .left {
            position: relative;
            padding: 1vw;
            background-color: rgba(255, 255, 255, 0.724);
            border: 2px solid rgb(177, 208, 224);
            border-radius: 5px;
            width: 90%;
            height: 95%;

            .title_search {
                display: flex;
                width: 100%;
                align-items: baseline;

                .searchFrame{
                    position: absolute;
                    right: 40%;
                    width: max-content;
                    display: inline-block;
                    label {
                        font-size: 1.5vh;
                        display: inline-block;
                        margin-right: 0.5vw;
                    }
                    .dateFrame{
                        display: inline-block;
                        position: relative;
                        i {
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);
                            left: 3%;
                        }

                        input {
                            width: 6vw;
                            border-radius: 50px;
                            padding-left: 15%;
                            border: 1px solid #000;

                        }
                    }
                }

                .sel {
                    display: flex;
                    position: absolute;
                    right: 5%;
                    select {
                        font-size: 1vh;
                        border-radius: 5px;
                        width: 4vw;
                        margin-right: 12px;
                        height: 30px;
                    }
                }

            }

            .sheet {
                border-radius: 5px;
                height: 90%;

                .accordion-button {
                    word-spacing: 2em;

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

            .back {
                position: absolute;
                bottom: 2%;
                left: 1%;
                background: rgb(26, 55, 77);
                border: 1px solid #000;
                color: white;
                border-radius: 5px;
                width: 5vw;
                height: 3vh;
                font-size: 1.5vh;
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


}
</style>