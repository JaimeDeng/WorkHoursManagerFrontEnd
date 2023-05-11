<script>
import { RouterLink } from 'vue-router'
</script>
<template>
    <div class="main">
        <div class="all">
            <h4>莊員工,Fighting !</h4>
            <div class="funtionArea">
                <!-- 上排 -->
                <div class="area1">
                    <RouterLink class="buttonlink" to="/emploAddWorkInfo">新增工作時數表</RouterLink>

                    <RouterLink class="buttonlink" to="/emploChangePsd">變更密碼</RouterLink>
                </div>
                <!-- 下排 -->
                <div class="area2">
                    <RouterLink class="buttonlink" to="/emploCheckDailyTime">查詢日工時表</RouterLink>
                </div>

            </div>
        </div>

        <!-- <RouterLink to="/login"><button class="btnback" type="button">返回登入頁</button></RouterLink> -->
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
            font-size: 40px;
            color: white;
            margin-bottom: 50px;
        }

        .funtionArea {
            height: 80%;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;

            .area1,
            .area2 {
                width: 100%;
                height: 40%;
                display: flex;
                justify-content: space-between;

                .buttonlink {
                    color: #000;
                    width: 48%;
                    position: relative;
                    background-color: white;
                    border-radius: 10px;
                    border: 2px solid #000;
                    font-size: 22px;
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
                        background-color: rgb(64, 104, 130);
                    }

                    &::after{
                        content: "";
                        z-index: -1;
                        position: absolute;
                        bottom: -500%;
                        border-radius: 100%;
                        height: 70vh;
                        width: 50vw;
                        background-color: rgba(40, 40, 40 ,0.5);
                        transition: 0.5s;
                    }

                    &::before{
                        content: "";
                        z-index: -1;
                        position: absolute;
                        top: -500%;
                        border-radius: 100%;
                        height: 70vh;
                        width: 50vw;
                        background-color: rgba(189, 243, 255, 0.5);
                        transition: 0.5s;
                    }

                    &:hover::after{
                        bottom: -320%;
                    }

                    &:hover::before{
                        top: -260%;
                    }


                }



            }




        }
    }

    .btnback {
        background: rgb(26, 55, 77);
        border: 1.5px solid #000;
        color: white;
        border-radius: 5px;
        width: 120px;
        height: 40px;
        // font-weight: bold;
        font-size: 18px;
        margin-top: 50px;

        &:hover {
            background-color: rgb(64, 104, 130);
        }

        &:active {
            transform: scale(0.95);
        }
    }



}
</style>
