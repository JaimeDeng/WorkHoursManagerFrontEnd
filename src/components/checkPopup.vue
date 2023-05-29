<script>
export default {

    //props是設定此元件的變數值導出給其它元件 , 在命名上不可與data()內的變數相同!
    props: {
        checkPopupData: {
            type: Object,
            required: true
        },
        showCheckPopup: {
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
        closeCheckPopup(){
            //emit可以雙向綁定父子元件 , 這邊綁定了close方法 , 當點擊了popup元件內的button執行了closePopup
            //popup的closePopup指定這個方法綁定v-on:close , 所以我們點擊popup這顆按鈕的動作就等於close
            //在父元素中引入的popup元件標籤宣告:close = "方法" , 即可在點擊按鈕時執行父元件中自定義的方法
            this.$emit('close');
        },
        confirm(){
            this.$emit('confirm');
        }

    },
    mounted() {

    },
    updated() {
        console.log("this component has been updated")
    },
};
</script>

<template>

    <div v-if="showCheckPopup" class="frame">
        <div class="contentFrame">
            <i></i>
            <h3 class="title">{{ checkPopupData.title }}</h3>
            <h5 class="content">{{ checkPopupData.content }}</h5>
        </div>
        <div class="btnFrame">
            <button @click="closeCheckPopup" class="back">{{ checkPopupData.backBtn }}</button>
            <button @click="confirm" class="confirm">{{ checkPopupData.confirmBtn }}</button>
        </div>
    </div>
    
</template>

<style lang="scss" scoped>
    .frame{
        position: relative;
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
        overflow: hidden;
        z-index: 1;
        transition: 0.5s;

        

        .contentFrame{
            position: relative;
            height: 80%;
            margin: 0;
            .fa-circle-xmark , .fa-check , .fa-triangle-exclamation{
                font-size: 6vh;
                margin-top: 20%;
            }
            h3{
                margin-top: 5%;
                font-size: 4vh;
            }
            h5{
                font-size: 2.5vh;
            }
            margin: auto 0;
        }

        .btnFrame{
            display: flex;
            justify-content: space-between;
            margin-top: 10%;
            width: 60%;
            height: 20%;
            margin-bottom: 2vh;
            .back{
                background-color: rgb(39, 46, 67);
                border: 1px solid #000;
                color: white;
                border-radius: 5px;
                width: 8vw;
                height: 5vh;
                font-size: 2vh;
                transition: 0.4s;

                &:hover {
                    background-color: rgb(75, 75, 101);
                }

                &:active {
                    transform: scale(0.95);
                }
            }

            .confirm{
                background: rgb(106, 25, 25);
                border: 1px solid #000;
                color: white;
                border-radius: 5px;
                width: 8vw;
                height: 5vh;
                font-size: 2vh;
                transition: 0.4s;

                &:hover {
                    background-color: rgb(143, 71, 71);
                }

                &:active {
                    transform: scale(0.95);
                }
            }
        }
    }
</style>