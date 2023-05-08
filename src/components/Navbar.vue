<script>
export default {
    data() {
        return {
            notificationCount: 11
        };
    }
};
</script>

<template>
    <div class="navbar">
        <div class="logo">
            <div class="left">
                <i class="fa-solid fa-clock-rotate-left"></i>
                <h3>WHM.</h3>

            </div>
            <div class="right">
                <h3>某某某 |<button>登出</button></h3>
                <i class="bell fa-regular fa-bell"></i>
                <div class="badge" :style="{ display: notificationCount > 0 ? 'block' : 'none' }">
                    <span v-if="notificationCount > 0" class="notification-badge">{{ notificationCount }}</span>
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

            i {
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