<script>
import { RouterLink } from 'vue-router'
</script>
<template>
    <div class="main">
        <div class="all">
            <h4>南主管,Good Morning !</h4>
            <div class="funtionArea">
                <!-- 上排 -->
                <div class="area1">
                    <RouterLink to="/manaCheckDaily" class="buttonlink">日工時表查詢審核</RouterLink>

                </div>
                <!-- 下排 -->
                <!-- <div class="area2">
                    <button type="button">查詢日工時表</button>
                </div> -->

            </div>
        </div>

        <RouterLink to="/employeeHome" class="btnback">返回</RouterLink>
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
                height: 40%;
                display: flex;
                justify-content: space-between;

                .buttonlink {
                    color: #000;
                    width: 40%;
                    background-color: white;
                    border-radius: 5px;
                    border: 2px solid #000;
                    font-size: 22px;
                    text-decoration: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: 12px;


                    &:active {
                        transform: scale(0.97);
                    }

                    &:hover {
                        color: white;
                        background-color: rgb(64, 104, 130);
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
        font-size: 18px;
        margin-top: 50px;
        text-decoration: none;
        padding: 4px;

        &:hover {
            background-color: rgb(64, 104, 130);
        }

        &:active {
            transform: scale(0.95);
        }
    }



}</style>
