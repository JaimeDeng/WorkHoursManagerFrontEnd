<script>
import Navbar from "../components/Navbar.vue"
import FooterView from "../components/FooterView.vue"
import SystemAddEmploList_success from "../components/SystemAddEmploList_success.vue"
export default {
    components: {
        Navbar, FooterView, SystemAddEmploList_success
    }
}
</script>


<template>
    <div class="main">

        <div class="background"></div>
        <div class="content">
            <Navbar />
            <SystemAddEmploList_success />
            <FooterView />
        </div>
    </div>
</template>




<style lang="scss" scoped>
.main {


    .background {
        position: fixed;
        z-index: -1;
        background-image: url(../assets/pic/technology-785742_1280.jpg);
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
