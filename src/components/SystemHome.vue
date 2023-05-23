<script>
export default {
    data() {
        return {
            //切換語言相關
            langValue: 'ch',
            addEmploList: '',
            editemploInfo: '',
            checkAllTimeSheet: '',
            backBtn: '',
            langValue:''
        }
    },
    methods: {
        changeLanguage() {
            if (this.langValue === 'ch') {
                this.addEmploList = '新增人員名單',
                    this.editemploInfo = '修改人員資料',
                    this.checkAllTimeSheet = '查看所有人員工時表',
                    this.backBtn = '返回首頁';
            } else if (this.langValue === 'en') {
                this.addEmploList = 'Create an employee information',
                    this.editemploInfo = 'Edit employee information',
                    this.checkAllTimeSheet = 'Check all timesheets',
                    this.backBtn = 'Back to homepage';
            } else if (this.langValue === 'jp') {
                this.addEmploList = '人員情報追加',
                    this.editemploInfo = '人員情報編集',
                    this.checkAllTimeSheet = '勤務表一覧',
                    this.backBtn = '戻る';
            }
        }
    },
    mounted(){
         //切換語言
         this.langValue = sessionStorage.getItem('langValue');
        if(this.langValue === null){
            this.langValue = 'ch';
        }
        console.log(this.langValue);
        this.changeLanguage();
    }
}
</script>
<template>
    <div class="main">
        <div class="all">
            <h4>管理員,Welcome !</h4>
            <div class="funtionArea">
                <!-- 上排 -->
                <div class="area1">
                    <RouterLink to="/systemAddEmploList" class="buttonlink">{{addEmploList}}</RouterLink>
                    <RouterLink to="/sysCheckAllEmploInfo" class="buttonlink">{{editemploInfo}}</RouterLink>
                    <RouterLink to="" class="buttonlink">{{checkAllTimeSheet}}</RouterLink>
                </div>


            </div>
        </div>

        <RouterLink to="/employeeHome" class="btnback">{{backBtn}}</RouterLink>
    </div>
</template>


<style lang="scss" scoped>
.main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .all {
        display: flex;
        flex-direction: column;
        width: 55%;
        height: 70%;

        h4 {
            color: white;
            margin-bottom: 50px;
        }

        .funtionArea {
            height: 80%;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;

            .area1 {
                width: 100%;
                height: auto;
                display: flex;
                flex-direction: column;
                align-items: center;


                .buttonlink {
                    font-weight: 500;
                    letter-spacing: 0.03vw;
                    box-shadow: inset 0 -3vh 60px 0.1vh rgba(27, 46, 57, 0.3);
                    margin-top: 2%;
                    color: #3d3d3d;
                    width: 48%;
                    height: 10vh;
                    position: relative;
                    background-color: rgb(255, 255, 255);
                    border-radius: 10px;
                    border: 1px solid #000;
                    font-size: 2.3vh;
                    text-decoration: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: 0.5s;
                    z-index: 1;
                    overflow: hidden;

                    &:active {
                        transform: scale(0.9);
                    }

                    &:hover {
                        color: white;
                        box-shadow: inset 0 -3vh 50px 0.1vh rgba(27, 37, 57, 0.7);
                        background-color: rgb(64, 84, 130);
                    }

                    &::after{
                        content: "";
                        z-index: -1;
                        position: absolute;
                        transform: translateY(100%);
                        border-radius: 100%;
                        height: 70vh;
                        width: 60vw;
                        background-color: rgba(61, 62, 63, 0.5);
                        transition: 0.5s;
                    }

                    &::before{
                        content: "";
                        z-index: -1;
                        position: absolute;
                        transform: translateY(-100%);
                        border-radius: 100%;
                        height: 70vh;
                        width: 60vw;
                        box-shadow: 0px 0px 50px 10px rgba(148, 149, 214, 0.5) inset;
                        background-color: rgba(67, 105, 146, 0.7);
                        transition: 0.5s;
                    }

                    &:hover::after{
                        transform: translateY(52%);
                    }

                    &:hover::before{
                        transform: translateY(-44%);
                    }


                }



            }




        }
    }

    .btnback {
        background: rgb(26, 55, 77);
        border: 1px solid #000;
        color: white;
        border-radius: 5px;
        padding: 0.5vh 1vw;
        font-size: 2vh;
        margin-top: 50px;
        transition: 0.4s;
        text-decoration: none;

        &:hover {
            background-color: rgb(64, 104, 130);
        }

        &:active {
            transform: scale(0.95);
        }
    }



}
</style>
