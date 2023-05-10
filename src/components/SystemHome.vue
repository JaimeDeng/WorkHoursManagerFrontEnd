<script></script>
<template>
    <div class="main">
        <div class="all">
            <h4>管理員,Good Morning !</h4>
            <div class="funtionArea">
                <!-- 上排 -->
                <div class="area1">
                    <button type="button">新增人員名單</button>
                    <button type="button">修改人員資訊</button>
                </div>
                <!-- 下排 -->
                <!-- <div class="area2">
                    <button type="button">查詢日工時表</button>
                </div> -->

            </div>
        </div>

        <button class="btnback" type="button">回上一頁</button>
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

            .area1,
            .area2 {
                width: 100%;
                height: 40%;
                display: flex;
                justify-content: space-between;

                button {
                    width: 48%;
                    background-color: white;
                    border-radius: 5px;
                    border: 2px solid #000;
                    font-size: 22px;
                    position: relative;
                    overflow: hidden;

                    &:active{
                        transform: scale(0.97);
                    }
                    &:hover {
                        color: white;
                        background-color:rgb(64, 104, 130) ;
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
        width: 100px;
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



}</style>
