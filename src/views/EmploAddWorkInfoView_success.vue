<script>
import Navbar from "../components/Navbar.vue"
import FooterView from "../components/FooterView.vue"
import EmploAddWorkInfo_success from "../components/EmploAddWorkInfo_success.vue"
export default {
    components: {
        Navbar, FooterView, EmploAddWorkInfo_success
    }
}
</script>


<template>
    <div class="main">

        <div class="background"></div>
        <div class="content">
            <Navbar />
            <EmploAddWorkInfo_success />
            <FooterView />
        </div>
    </div>
</template>




<style lang="scss" scoped>
.main {


    .background {
        position: fixed;
        z-index: -1;
        background-image: url(../assets/pic//light-bulb-4514505__480.webp);
        background-size: cover;
        filter: blur(3px);
        width: 100%;
        height: 100%;
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100vh;
        position: relative;
        z-index: 1;

       
    }
}
</style>
