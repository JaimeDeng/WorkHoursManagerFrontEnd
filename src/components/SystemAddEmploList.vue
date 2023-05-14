<script>
import { RouterLink, RouterView } from 'vue-router'
import popup from './popup.vue'
export default (await import('vue')).defineComponent({
components: {
    RouterLink,
    popup
},
    data() {
        return{
            employeeInfo:[],

            //props傳來的變數 , 直接宣告一樣的名稱在data()內
            showPopup: false,
            popupData: {
                title: "Popup Title",
                content: "Popup Content",
            },
            id : "",
            name : "",
            gender : "",
            email : "",
            department : "",
            position : "",
            level : "",
            supervisor : "",
            phone : "",
            message : "none",
            isInputInvalid : 0
        }
    },
    methods:{
        addInfo(){
        let employeeId=this.$refs.employeeId.value;
        // console.log(this.$refs.employeeId.value);
        // alert(employeeId);
        let name = this.$refs.name.value;
        let gender=this.$refs.gender.value;
        let email = this.$refs.email.value;
        let department = this.$refs.department.value;
        let position = this.$refs.position.value;
        let level = this.$refs.level.value;
        let supervisor = this.$refs.supervisor.value;
        let phone =this.$refs.phone.value;
        let error = false;

        let emailPattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let phonePattern =/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
        if(this.id.length === 0){
            this.message = "請輸入員工ID欄位";
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }
        if(this.name.length === 0){
            this.message = "請輸入姓名";
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }
        if(this.gender==="請選擇性別"||this.gender===""){
            this.message = "請選擇性別";
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }
        if(this.email.length === 0){
            this.message = "請輸入信箱";
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }
        if(!emailPattern.test(email)){
            this.message = "信箱格式錯誤";
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }
        if(this.department==="請選擇部門"||this.department===""){
            this.message = "請選擇部門";
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }
        if(this.position.length === 0){
            this.message = "請輸入職稱";
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }
        if(this.level.length === 0){
            this.message = "請輸入職等";
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }
        if(this.phone.length === 0){
            this.message = "請輸入電話";
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }
        if(!phonePattern.test(phone)){
            this.message = "電話格式錯誤";
            alert(phonePattern.test(phone))
            error = true;
            if(error){
                this.errorPopup();
                return;
            }
        }
        else{
            let reqbody = {
                employeeId : employeeId,
                name:name,
                gender:gender,
                email:email,
                department:department,
                position:position,
                level:level,
                supervisor:supervisor,
                phone:phone
            };
            fetch("http://localhost:3000/setEmployeeInfo" ,{
                method:"post",
                body: JSON.stringify(reqbody),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(res => res.json())
            .then((data)=>{
                this.employeeInfo = data;
                console.log(this.employeeInfo);
                // console.log(this.gender)
                if(data.success === true){
                    this.message = data.message;
                }else{
                    this.message = data.message;
                }
            })
            .catch(err => console.log(err))
        }
    },
    closePopup(){
        this.showPopup = false;
        this.popupData.title = "";
        this.popupData.content = "";
        if(this.employeeInfo.success){
            this.id="";
            this.name="";
            this.gender="";
            this.email="";
            this.department="";
            this.position="";
            this.level="";
            this.supervisor="";
            this.phone="";
        }
    },
    successPopup(){
        this.popupData.title = "成功";
        this.popupData.content = this.message;
        this.showPopup = true;
        setTimeout(() => {
            let popup = this.$refs.popup;
            let popupEl = popup.$el;
            let popupIcon = popupEl.querySelector("i");
            console.log(popupIcon);
            let iconStr1 = "fa-solid";
            let iconStr2 = "fa-check";
            popupIcon.classList.add(iconStr1);
            popupIcon.classList.add(iconStr2);
            popupIcon.style.color = "#3771ae";
            console.log(popupIcon);
            popup.$el.style.opacity = "1";
            popup.$el.style.bottom = "0%";
        }, 100);
    },
    errorPopup(){
    this.popupData.title = "錯誤";
    this.popupData.content = this.message;
    this.showPopup = true;
    this.$nextTick(() => {
        let popup = this.$refs.popup;
        console.log(popup);
        let popupEl = popup.$el;
        let popupIcon = popupEl.querySelector("i");
        console.log(popupIcon);
        let iconStr1 = "fa-solid";
        let iconStr2 = "fa-circle-xmark";
        popupIcon.classList.add(iconStr1);
        popupIcon.classList.add(iconStr2);
        popupIcon.style.color = "#ae3737";
        console.log(popupIcon);
        popup.$el.style.opacity = "1";
        popup.$el.style.bottom = "0%";
    });
},

    checkInputLegth(input){
        switch(input){
            case 'employeeId':
                if(this.id.length < 1){
                    this.isInputInvalid = 1;
                }else{
                    this.isInputInvalid = 0;
                }
                break;
            case 'name':
                if(this.name.length < 4){
                    this.isInputInvalid = 2;
                }else{
                    this.isInputInvalid = 0;
                }
                break;
            case 'email':
                if(this.email.length < 4){
                    this.isInputInvalid = 2;
                }else{
                    this.isInputInvalid = 0;
                }
                break;
            case 'position':
                if(this.position.length < 4){
                    this.isInputInvalid = 2;
                }else{
                    this.isInputInvalid = 0;
                }
                break;
            case 'level':
                if(this.level.length < 4){
                    this.isInputInvalid = 2;
                }else{
                    this.isInputInvalid = 0;
                }
                break;
        }
     }      
},
    mounted() {

    }
})
</script>

<template>
    <div class="main">

        <popup ref="popup" class="popup" :popup-data="popupData" :show-popup="showPopup" @close="closePopup"></popup>
        <div v-if="showPopup" ref="mask" class="mask"></div>

        <div class="add">
            <h4>新增人員名單</h4>
            <!-- 填寫區 -->
            <div class="area1">
                <!-- 左側填寫區 -->
                <div class="info">

                    <!-- 員工ID輸入 -->
                    <label for="employeeId">員工ID</label>
                    <input 
                    :style="{ backgroundColor: isInputInvalid === 2 ? 'rgb(255, 205, 205)' : '' }"
                    maxlength="20" @input="checkInputLegth('employeeId')" ref="employeeId" v-model="id" 
                    id="employeeId" placeholder="請輸入您的員工ID" type="text"
                    >
                    <!-- 姓名輸入 -->
                    <label for="name">姓名</label>
                    <input 
                    :style="{ backgroundColor: isInputInvalid === 2 ? 'rgb(255, 205, 205)' : '' }"
                    maxlength="20" @input="checkInputLegth('name')" ref="name" v-model="name" 
                    id="setName" placeholder="請輸入您的姓名" type="text"
                    >

                    <!-- 性別輸入 -->
                    <label for="">性別</label>
                    <select ref="gender" v-model="gender" id="setGender">
                        <option selected >請選擇性別</option>
                        <option value="1">男</option>
                        <option value="2">女</option>                     
                    </select>

                    <!-- Email輸入 -->
                    <label for="">信箱</label>
                    <input 
                    :style="{ backgroundColor: isInputInvalid === 4 ? 'rgb(255, 205, 205)' : '' }"
                    @input="checkInputLegth('email')" ref="email" v-model="email" 
                    id="setEmail" placeholder="請輸入您的信箱" type="text"
                    >                  
                </div>
                <!-- 右側填寫區 -->
                <div class="detail">

                    <!-- 部門輸入 -->
                    <label for="">部門</label>
                    <select ref="department" v-model="department" id="setDepartment">
                        <option selected>請選擇部門</option>
                        <option value="1">管理部</option>
                        <option value="2">IT部</option>
                        <option value="3">營業部</option>
                        <option value="4">製造部</option>
                    </select>

                    <!-- 職稱輸入 -->
                    <label for="">職稱</label>
                    <input 
                    :style="{ backgroundColor: isInputInvalid === 2 ? 'rgb(255, 205, 205)' : '' }"
                    maxlength="20" @input="checkInputLegth('position')" ref="position" v-model="position" 
                    id="setPosition" placeholder="請輸入您職稱" type="text"
                    >

                    <!-- 職等輸入 -->
                    <label for="">職等</label>
                    <input 
                    :style="{ backgroundColor: isInputInvalid === 2 ? 'rgb(255, 205, 205)' : '' }"
                    maxlength="20" @input="checkInputLegth('level')" ref="level" v-model="level" 
                    id="setLevel" placeholder="請輸入您職等" type="text"
                    >

                    <!-- 主管ID輸入 -->
                    <label for="">主管ID</label>
                    <input maxlength="20" @input="checkInputLegth('supervisor')" ref="supervisor" 
                    v-model="supervisor" id="supervisorId" placeholder="請輸入您的主管ID" type="text"
                    >

                    <!-- 電話輸入 -->
                    <label for="">電話</label>
                    <input 
                    :style="{ backgroundColor: isInputInvalid === 2 ? 'rgb(255, 205, 205)' : '' }"
                    maxlength="20" @input="checkInputLegth('phone')" ref="phone" v-model="phone" 
                    id="setPhone" placeholder="請輸入您的電話(ex:1234567890)" type="text" 
                    >
                </div>
            </div>
            <!-- 底部按鈕 -->
            <div class="area2">
                <RouterLink to="/systemHome" class="btn1">返回</RouterLink>
                <!-- <button type="button" class="btn1" @click="addInfo">新增</button>  -->
                <RouterLink :to="
                this.id.length===0||this.name.length === 0
                ||this.gender==='請選擇性別'||this.gender==='' 
                ||this.email.length === 0 ||this.message === '信箱格式錯誤'
                ||this.message === '請選擇部門'
                ||this.position.length === 0||this.level.length === 0
                ||this.phone.length===0||this.message ==='電話格式錯誤'
                ? '/systemAddEmploList' : '/systemAddEmploList_success'">
                <button type="button" class="btn2" @click="addInfo" >新增</button>
                </RouterLink>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.main {
    flex-grow: 1;
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: -1;

    .add {
        background-color: rgba(255, 255, 255, 0.724);
        border: 2px solid rgb(177, 208, 224);
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 90vw;
        height: 80vh;
        h4{
            font-size: 32px;
            font-weight: bold;
        }

        .area1 {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            width: 80vw;
            margin-top: 8px;

            .info {
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-right: 48px;
                label{
                    font-size: 15px;
                }
                input,
                select {
                    height: 30px;
                    margin-bottom: 8px;
                    border-radius: 5px;
                    border:1px solid #000;
                }
            }

            .detail {
                display: flex;
                flex-direction: column;
                label{
                    font-size: 15px;
                }

                input,select {
                    margin-bottom: 8px;
                    height: 30px;
                    border-radius: 5px;
                    border:1px solid #000;

                }

            }
        }

        .area2 {
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding: 0 8px;
            
            .btn1 {
                background: rgb(26, 55, 77);
                border: 1.5px solid #000;
                color: white;
                border-radius: 5px;
                padding: 4px;
                font-size: 15px;
                text-decoration: none;
                text-align: center;
                margin-left: 25vw;
                width: 10%;
                &:hover {
                    background-color: rgb(64, 104, 130);
                }

                &:active {
                    transform: scale(0.95);
                }
            }

            .btn2 {
                background: rgb(26, 55, 77);
                border: 1.5px solid #000;
                color: white;
                border-radius: 5px;
                padding: 4px;
                font-size: 15px;
                text-decoration: none;
                text-align: center;
                margin-right: 25vw;
                width: 10vw;
                &:hover {
                    background-color: rgb(64, 104, 130);
                }

                &:active {
                    transform: scale(0.95);
                }
            }
        }
    }

    .popup{
        position: absolute;
        bottom: -20%;
        opacity: 0;
        transition: 0.2s;
        z-index: 2;
    }
    .mask{
        position: absolute;
        background-color: rgba(255, 255, 255, 0.3);
        filter: blur(100px);
        height: 99.8vh;
        width: 100%;
        z-index: 1;
    }
}
</style>