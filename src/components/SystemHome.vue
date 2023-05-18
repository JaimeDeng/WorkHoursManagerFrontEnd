<script></script>
<template>
    <div class="main">
        <div class="all">
            <h4>管理員,Good Morning !</h4>
            <div class="funtionArea">
                <!-- 上排 -->
                <div class="area1">
                    <RouterLink to="/systemAddEmploList" class="buttonlink">新增人員名單</RouterLink>
                    <RouterLink to="/ststemEditInfo" class="buttonlink">修改人員資訊</RouterLink>
                    <RouterLink to="" class="buttonlink">查看所有人員工時表</RouterLink>
                </div>
                

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
                        background-color: rgb(64, 104, 130);
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
                        background-color: rgba(130, 204, 223, 0.5);
                        transition: 0.5s;
                    }

                    &:hover::after{
                        transform: translateY(53%);
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
        border: 1.5px solid #000;
        color: white;
        border-radius: 5px;
        padding: 4px;
        font-size: 18px;
        margin-top: 50px;
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
