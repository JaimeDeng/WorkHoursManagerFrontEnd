<script>
export default {

    //props是設定此元件的變數值導出給其它元件 , 在命名上不可與data()內的變數相同!
    props: {
        alertPopupData: {
            type: Object,
            required: true
        },
        showAlertPopup: {
            type: Boolean,
            required: true
        }
    },

    data() {
        return {
            langValue : 'ch',
            back : ''
        };
    },

    methods: {
        closePopup(){
            //emit可以雙向綁定父子元件 , 這邊綁定了close方法 , 當點擊了popup元件內的button執行了closePopup
            //popup的closePopup指定這個方法綁定v-on:close , 所以我們點擊popup這顆按鈕的動作就等於close
            //在父元素中引入的popup元件標籤宣告:close = "方法" , 即可在點擊按鈕時執行父元件中自定義的方法
            this.$emit('close');
        },
    },
    mounted() {

    },
    updated() {
        console.log("this component has been updated")
    },
};
</script>

<template>

    <div v-if="showAlertPopup" class="frame">
        <div class="contentFrame">
            <h4 class="title">{{ alertPopupData.title }}</h4>
            <h6 class="content">{{ alertPopupData.content }}</h6>
        </div>
    </div>
    
</template>

<style lang="scss" scoped>
    .frame{
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 0 1vw;
        height: 20vh;
        width: 20vw;
        color: rgb(86, 86, 92);
        background-color: rgba(225, 225, 225, 0.3);
        border-radius: 10px;
        border: none;
        overflow: auto;
        z-index: 1;
        transition: 0.5s;

        

        .contentFrame{
            .fa-circle-xmark , .fa-check{
                font-size: 6vh;
                margin-bottom: 10%;
            }
            h4{
                font-size: 4vh;
            }
            h6{
                font-size: 2.5vh;
            }
            margin: auto 0;
        }
    }
</style>