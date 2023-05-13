<!-- 登入系統頁面 -->
<script>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from "../components/Navbar.vue"
import FooterView from "../components/FooterView.vue"
import Login from "../components/Login.vue"
export default {
    components: {
        Navbar, FooterView, Login
    },
    data() {
        return {
            langValue : ''
        };
    },
    methods: {
        changeLanguage(){
            if(this.langValue === 'en'){
               
            }else if(this.langValue === 'jp'){
                
            }else if(this.langValue === 'ch'){

            }
        },
        langChange(){
            console.log('更新');
            //vue-router的重新渲染方法 , 只會重載頁面重新渲染vue元件 , 不會刷新所有數據跟JS
            this.$router.go(0);
        }
    },
    mounted(){
        //檢查及修改介面語言
        this.langValue = sessionStorage.getItem('langValue');
        if(this.langValue = null){
            this.langValue = 'ch';
        }
        console.log(this.langValue);
        this.changeLanguage();
    }
}
</script>


<template>
    <div class="main">

        <div class="background"></div>
        <div class="content">
            <Navbar @change="langChange" />
            
            <RouterView />
            <FooterView />
        </div>
    </div>
</template>


<style lang="scss" scoped>
.main {


    .background {
        position: fixed;
        z-index: -1;
        background-image: url(../assets/pic/office-865091__480.jpg);
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