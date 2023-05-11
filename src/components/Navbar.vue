<script>
export default {
    data() {
        return {
            name: "阿強",   //員工名
            pendingApproveNum: 1,   //待審表單數量
            notificationBtnIsClick: false,  //是否按下通知按鈕
            hasAnyPendingApprove: false,    //是否有任何待審表單
            notificationNum:0   //通知數量
        };
    },

    methods: {
        //監看通知鈴鐺按鈕是否被點擊
        clickNotificationBtn(){
            this.notificationBtnIsClick = !this.notificationBtnIsClick;
        },
        //檢查待審工時表
        checkPendingApprove(){
            if(this.pendingApproveNum > 0){
                this.hasAnyPendingApprove = true;
            }
        },
        //添加點擊其他地方關閉通知列表的動作
        addCloseNotifyList(){
            let notification = document.getElementById("bell fa-regular fa-bell")
            let notificationList = document.getElementById("list-group")
            window.addEventListener("click" , (event) => {
                console.log(event.target)
                if(event.target != notificationList && !notificationList.contains(event.target) && event.target != notification){
                    if(this.notificationBtnIsClick === true){
                        this.notificationBtnIsClick = false;
                    }
                }
            })
        },
        //計算有多少通知
        calculateNotificationNum(){
            let listGroup = document.getElementById("list-group");
            let notifications = listGroup.querySelectorAll(".list-group-item");
            this.notificationNum = notifications.length;
            console.log(notifications)
        }
    },

    mounted() {
        this.checkPendingApprove();
        this.addCloseNotifyList();
        this.calculateNotificationNum();
    },
};
</script>

<template>
    <div class="navbar">
        <div class="logo">
            <div class="left">
                <i class="fa-solid fa-clock-rotate-left"></i>
                <RouterLink to="/employeeHome" class="link">
                    <h3>WHM.</h3>
                </RouterLink>


            </div>
            <div class="right">
                <div class="rightTopFrame">
                    <h3>{{ name }} |<RouterLink to="/login"><button class="btnback" type="button">登出</button></RouterLink></h3>
                    <button @click="clickNotificationBtn" type="button" class="notification" id="notification">
                        <i id="bell fa-regular fa-bell" class="bell fa-regular fa-bell"></i>
                        <div :style="{ visibility: hasAnyPendingApprove ? 'visible' : 'hidden' }" class="notifyIcon">{{ notificationNum }}</div>
                    </button>
                    <div :style="{ opacity: notificationBtnIsClick ? '1' : '0' }" id="list-group" class="list-group">
                        <RouterLink to="/ManaCheckDaily" id="list-group-item list-group-item-action" class="list-group-item list-group-item-action">
                            <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">待審核通知</h5>
                            </div>
                            <p class="mb-1">您有 {{ pendingApproveNum }} 筆工時表待審核</p>
                        </RouterLink>
                        <RouterLink to="/ManaCheckDaily" id="list-group-item list-group-item-action" class="list-group-item list-group-item-action">
                            <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">待審核通知</h5>
                            </div>
                            <p class="mb-1">您有 {{ pendingApproveNum }} 筆工時表待審核</p>
                        </RouterLink>
                    </div>
                </div>
            </div>


        </div>

    </div>
</template>

<style lang="scss" scoped>
.navbar {
    width: 100%;

    .logo {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .left {
            display: flex;
            align-items: center;
            margin-left: 15px;


            .link {
                text-decoration: none;
            }

            i {
                margin-right: 10px;
                font-size: 23px;
                color: white;
            }
        }

        .right {
            display: flex;
            align-items: center;
            margin-right: 15px;
            position: relative;

            i {
                display: inline-block;
                margin-left: 10px;
                font-size: 23px;
                color: white;
            }

            button {
                background: none;
                border: none;
                color: white;

                &:active {
                    transform: scale(0.95);
                }
            }

            .rightTopFrame{
                width: max-content;
                h3{
                    display: inline-block;
                }
                .notification{
                    position: relative;
                    text-align: center;
                    line-height: 1rem;
                    padding: 0;
                    z-index: 0;

                    .notifyIcon{
                        height: 1rem;
                        width: 1rem;
                        background-color: rgb(211, 47, 47);
                        border-radius: 3px;
                        position: absolute;
                        left: 1%;
                        bottom: -10%;
                        z-index: 1;
                        visibility: hidden;
                        pointer-events: none;
                    }
                }
            }

            .list-group{
                position: absolute;
                right: 5%;
                width: 15vw;
                transition: 0.3s;
            }

            .badge {
                position: relative;
                width: 19px;
                height: 19px;
                border-radius: 50%;
                background-color: red;
                color: white;
                text-align: center;
                top: -8px;
                right: 6px;
            }

        }



        h3 {
            font-size: 20px;
            margin-top: 8px;
            color: white;
        }


    }

}
</style>