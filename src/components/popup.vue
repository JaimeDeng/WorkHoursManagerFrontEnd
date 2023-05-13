<script>
export default {

    //props是設定此元件的變數值導出給其它元件 , 在命名上不可與data()內的變數相同!
    props: {
        popupData: {
            type: Object,
            required: true
        },
        showPopup: {
            type: Boolean,
            required: true
        }
    },

    data() {
        return {
            // showPopup: false,
            // popupData:{
            //     title: "",
            //     content: ""
            // }
        };
    },

    methods: {
        closePopup(){
            //emit可以雙向綁定父子元件 , 這邊綁定了close方法 , 當點擊了popup元件內的button執行了closePopup
            //popup的closePopup指定這個方法綁定v-on:close , 所以我們點擊popup這顆按鈕的動作就等於close
            //在父元素中引入的popup元件標籤宣告:close = "方法" , 即可在點擊按鈕時執行父元件中自定義的方法
            this.$emit('close');
        }
    },

    mounted() {

    },
    updated() {
        console.log("hello")
    },
};
</script>

<template>

    <div v-if="showPopup" class="frame">
        <div class="contentFrame">
            <i></i>
            <h3 class="title">{{ popupData.title }}</h3>
            <h5 class="content">{{ popupData.content }}</h5>
        </div>
        <div class="btnFrame">
            <button @click="closePopup" class="back">返回</button>
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
        height: 50vh;
        width: 40vw;
        background-color: rgba(255, 255, 255, 1);
        border-radius: 10px;
        border: 2px solid rgb(177, 208, 224);
        overflow: auto;
        z-index: 1;
        transition: 0.5s;

        

        .contentFrame{
            .fa-circle-xmark , .fa-check{
                font-size: 6vh;
                margin-bottom: 10%;
            }
            h3{
                font-size: 4vh;
            }
            h5{
                font-size: 2.5vh;
            }
            margin: auto 0;
        }

        .btnFrame{
            margin-top: 10%;
            width: 80%;
            height: auto;
            margin-bottom: 2vh;
            .back{
                background: rgb(26, 55, 77);
                border: 1px solid #000;
                color: white;
                border-radius: 5px;
                width: 8vw;
                height: 5vh;
                // font-weight: bold;
                font-size: 18px;

                &:hover {
                    background-color: rgb(64, 104, 130);
                }

                &:active {
                    transform: scale(0.95);
                }
            }
        }
    }
</style>