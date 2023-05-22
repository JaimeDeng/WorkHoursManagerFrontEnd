<script></script>

<template>
    <div class="footer">
     
        <p class="fs-6"> &copy; 2023 WorkHoursManager <SUB>TM</SUB></p>
    </div>

</template>

<style lang="scss" scoped>
.footer{
    
    height: 7vh;
    text-align: center;
    box-shadow: 0px 10px 20px 10px rgba(33, 33, 34, 0.5);
    background: linear-gradient(to left, rgba(26, 55, 77,0.7) 10%, rgba(75, 61, 102, 0.8));
    // border-top: 2px solid rgb(177, 208, 224);
    color: white;
    padding: 8px;
    p{  
        font-size: 1.5vh;
        position: relative;
        margin-top: 0.8vh;
        SUB{
            font-size: 1vh;
            position: absolute;
            top:30%;
        }
    }
}
</style>