<script>
export default {
    props:{
        changeLangValue:{
            type:String,
            default:''
        },
        accountName:''
    },
    data() {
        return {
            name: "NONE",   //員工名
            employeeId:'',
            accountId:'',
            date:'',
            nowHours:'',
            day:'',
            isSupervisor:false,
            isAdministrator:false,
            pendingApproveNum: 1,   //待審表單數量
            notificationBtnIsClick: false,  //是否按下通知按鈕
            hasAnyPendingApprove: false,    //是否有任何待審表單
            hasntAccount: true, //是否已登入
            hasTodaysWorkInfo: false,
            notificationNum:0,   //通知數量
            changeLangValue:"",
            langSelectValue:'',
            chOption:'',
            enOption:'',
            jpOption:'',
            loginLogout:'',
            loginOrLogout:false,
            lang:'',

            //工時資料
            subordinatesWorkDayInfo:[]
        };
    },

    methods: {
        //職等檢查
        levelCheck(){
            fetch("http://localhost:3000/getEmployeeInfoById" ,{
                method:"put",
                body: JSON.stringify({employeeId : this.employeeId}),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(res => res.json())
            .then((data)=>{
                console.log(data);
                if(data.level === "系統管理員"){
                    this.isSupervisor = true;
                    this.isAdministrator = true;
                    this.hasRendered = true;
                }
                if(data.level === "課長" || data.level === "副理" || data.level === "經理"|| data.level === "總經理"){
                    this.isSupervisor = true;
                }
            })
            .catch(err => console.log(err))
        },
        //工時表尚未建立檢察
        todaysWorkDayInfoCheck(){
            fetch("http://localhost:3000/getWorkDayInfoByDate" ,{
                method:"put",
                body: JSON.stringify({date : this.date}),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(res => res.json())
            .then((data)=>{
                //下午五點時才會檢查是否有無今日工時表
                this.hasTodaysWorkInfo = true;
                //只有在星期一到星期五下午五點過後才會檢查
                if(this.nowHours >= 16 && this.day > 0 && this.day < 6){
                    this.hasTodaysWorkInfo = false;
                    console.log(data);
                    if(data.success === false){
                        this.hasTodaysWorkInfo = false;
                    }else{
                        data.workDayInfoList.forEach((workDayInfo) => {
                            if(workDayInfo.employeeId.employeeId === this.employeeId){
                                this.hasTodaysWorkInfo = true;
                            }
                        })
                    }
                }
            })
            .catch(err => console.log(err))
        },
        //監看通知鈴鐺按鈕是否被點擊
        clickNotificationBtn(){
            this.notificationBtnIsClick = !this.notificationBtnIsClick;
        },
        //添加點擊其他地方關閉通知列表的動作
        addCloseNotifyList(){
            let notificationIcon = document.getElementById("bell fa-regular fa-bell")
            let notificationBtn = document.getElementById("notification")
            let notificationList = document.getElementById("list-group")
            window.addEventListener("click" , (event) => {
                console.log(event.target)
                if(event.target != notificationList && !notificationList.contains(event.target) && event.target != notificationIcon
                && event.target != notificationBtn){
                    if(this.notificationBtnIsClick === true){
                        this.notificationBtnIsClick = false;
                    }
                }
            })
        },
        //計算有多少通知
        calculateNotificationNum(){
            setTimeout(()=>{
                if(this.hasAnyPendingApprove === true){
                    this.notificationNum += 1;
                }
                if(this.hasTodaysWorkInfo === false){
                    this.notificationNum += 1;
                }
                console.log(this.hasTodaysWorkInfo);
                console.log(this.notificationNum);
            },100)
        },
        //監聽切換語言
        changeLang(){
            console.log("切換語言")
            let langValue = document.getElementById("lang").value;
            sessionStorage.setItem('langValue' , langValue);
            this.$emit("change");
        },
        accountLoginLogout(){
            if(this.loginOrLogout === true){
                localStorage.removeItem('accountId');
                localStorage.removeItem('employeeId');
                localStorage.removeItem('employeeName');
                sessionStorage.removeItem('accountId');
                sessionStorage.removeItem('employeeId');
                sessionStorage.removeItem('employeeName');
                this.$router.push('/login');
                this.$emit("logout");
            }else{
                this.$router.push('/login');
            }
        },
        updateNavbar(){
            this.name = sessionStorage.getItem('employeeName');
            if(this.name === null){
                this.name = localStorage.getItem('employeeName');
                if(this.name === null){
                    this.name = 'NONE';
                }
            }
        },
        getPendingApprovalWorkDayInfo(){
            fetch("http://localhost:3000/getPendingApprovalWorkDayInfoBySupervisorId" ,{
                method:"put",
                body: JSON.stringify({ supervisorId : this.employeeId}),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(res => res.json())
            .then((data)=>{
                console.log(data);
                //將日工時表以日期最新日期開始排序 (原本順序是先輸入的越前面)
                let container = null;
                for(let i = data.pendingApprovalWorkDayInfoList.length - 1 ; i > 0 ; i --){
                    for(let i = 0 ; i < data.pendingApprovalWorkDayInfoList.length - 1 ; i++){
                        const nextDateStr = data.pendingApprovalWorkDayInfoList[i+1].date;
                        const [nextDateYear, nextDateMonth, nextDateDay] = nextDateStr.split('-');
                        const nextDate = new Date(nextDateYear, nextDateMonth - 1, nextDateDay);
                        const thisDateStr = data.pendingApprovalWorkDayInfoList[i].date;
                        const [thisDateStrYear, thisDateStrMonth, thisDateStrDay] = thisDateStr.split('-');
                        const thisDate = new Date(thisDateStrYear, thisDateStrMonth - 1, thisDateStrDay);
                        if(nextDate > thisDate){
                            container = data.pendingApprovalWorkDayInfoList[i+1];
                            data.pendingApprovalWorkDayInfoList[i+1] = data.pendingApprovalWorkDayInfoList[i];
                            data.pendingApprovalWorkDayInfoList[i] = container;
                        }       
                    }
                }
                data.pendingApprovalWorkDayInfoList.forEach((workDayInfo)=>{
                    if(workDayInfo.supervisorId === this.employeeId){
                        this.subordinatesWorkDayInfo.push(workDayInfo);
                    }
                })
                console.log(this.subordinatesWorkDayInfo);
                this.checkSubordinatesWorkDayInfo();
            })
            .catch(err => console.log(err))
        },
        checkSubordinatesWorkDayInfo(){
            if(this.subordinatesWorkDayInfo.length > 0){
                this.hasAnyPendingApprove = true;
            }
        },
        checkLoginOrNot(){
            if(sessionStorage.getItem('accountId') !== null || localStorage.getItem('accountId') !== null){
                this.hasntAccount = false;
            }
        }
    },

    created() {
        //獲取目前時間及日期
        const now = new Date();
        console.log(now.getHours());
        let dateString = now.toLocaleDateString();  //抓現在日期的字串 格式為: yyyy/M or MM/dd
        //修改日期字串格式
        dateString = dateString.replace(/\//g , "-");
        if((now.getMonth()+1) < 10){    //如果月份小於10要自己補0進去字串
            dateString = dateString.substring(0 , 5) + "0" + dateString.substring(5);
        }
        this.nowHours = now.getHours();     //抓現在小時數
        this.date = dateString;
        this.day = now.getDay();    //抓今天星期幾

        //獲取帳號資訊
        this.employeeId = sessionStorage.getItem('employeeId');
        if(this.employeeId === null){
            this.employeeId = localStorage.getItem('employeeId');
        }
        this.name = sessionStorage.getItem("employeeName");
        if(this.name === null){
            this.name = localStorage.getItem("employeeName");
        }
        this.accountId = sessionStorage.getItem("accountId");
        if(this.accountId === null){
            this.accountId = localStorage.getItem("accountId");
        }
        
        this.checkLoginOrNot();
        this.levelCheck();
        this.getPendingApprovalWorkDayInfo();
        //檢查今天工時表填了沒
        this.todaysWorkDayInfoCheck();
    },
    mounted() {
        this.addCloseNotifyList();
        this.calculateNotificationNum();
        this.langSelectValue = sessionStorage.getItem('langValue');
        if(this.langSelectValue === null){
            this.langSelectValue = 'ch';
        }
        if(this.langSelectValue === 'ch'){
            this.lang = '介面語言';
            this.chOption = '中文';
            this.enOption = '英文';
            this.jpOption = '日文';
            if(sessionStorage.getItem('accountId') !== null || localStorage.getItem('accountId') !== null){
                this.loginLogout = '登出';
                this.loginOrLogout = true;
            }else{
                this.loginLogout = '登入';
                this.loginOrLogout = false;
            }
        }else if(this.langSelectValue === 'en'){
            this.lang = 'Language'
            this.chOption = 'Chinese';
            this.enOption = 'English';
            this.jpOption = 'Japanese';
            if(sessionStorage.getItem('accountId') !== null || localStorage.getItem('accountId') !== null){
                this.loginLogout = 'Log out';
                this.loginOrLogout = true;
            }else{
                this.loginLogout = 'Log in';
                this.loginOrLogout = false;
            }
        }else if(this.langSelectValue === 'jp'){
            this.lang = '言語選択'
            this.chOption = '中国語';
            this.enOption = '英語';
            this.jpOption = '日本語';
            if(sessionStorage.getItem('accountId') !== null || localStorage.getItem('accountId') !== null){
                this.loginLogout = 'ログアウト';
                this.loginOrLogout = true;
            }else{
                this.loginLogout = 'ログイン';
                this.loginOrLogout = false;
            }
        }      
    },
};
</script>

<template>
    <div class="navbar">
        <div class="logo">
            <div class="left">
                <i class="fa-solid fa-clock-rotate-left"></i>
                <RouterLink to="/login" class="link">
                    <h3 class="logoTitle">WorkHoursManager<SUP>TM</SUP></h3>
                </RouterLink>


            </div>
            <div class="right">
                <div class="rightTopFrame">
                    <label class="langLabel" for="lang">{{ lang }}</label>
                    <select v-model="langSelectValue" @change="changeLang" class="lang" name="lang" id="lang">
                        <option value="ch">{{ chOption }}</option>
                        <option value="en">{{ enOption }}</option>
                        <option value="jp">{{ jpOption }}</option>
                    </select>
                    <h3>{{ name }} |<button @click="accountLoginLogout" class="btnback" type="button">{{ loginLogout }}</button></h3>
                    <button v-if="!hasntAccount" @click="clickNotificationBtn" type="button" class="notification" id="notification">
                        <i id="bell fa-regular fa-bell" class="bell fa-regular fa-bell"></i>
                        <div v-show="this.notificationNum !== 0" :style="{ visibility: hasAnyPendingApprove || !hasTodaysWorkInfo ? 'visible' : 'hidden' }" class="notifyIcon">{{ notificationNum }}</div>
                    </button>
                    <div :style="{ visibility: notificationBtnIsClick ? 'visible' : 'hidden' , opacity: notificationBtnIsClick ? '1' : '0' }" id="list-group" class="list-group">
                        <RouterLink v-if="hasAnyPendingApprove" to="/ManaCheckDaily" id="list-group-item list-group-item-action" class="list-group-item list-group-item-action">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">通知</h5>
                            </div>
                            <p class="mb-1">您有 {{ this.subordinatesWorkDayInfo.length }} 筆工時表待審核</p>
                        </RouterLink>
                        <div v-if="!hasAnyPendingApprove && hasTodaysWorkInfo" id="list-group-item list-group-item-action" class="list-group-item list-group-item-action">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">沒有任何通知</h5>
                            </div>
                        </div>
                        <RouterLink v-if="!hasTodaysWorkInfo" to="/EmploAddWorkInfo" id="list-group-item list-group-item-action" class="list-group-item list-group-item-action">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">通知</h5>
                            </div>
                            <p class="mb-1">您尚未登錄今日的工時表</p>
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

                .logoTitle{
                    font-family: "book antiqua";
                    font-size: 2.5vh;
                }
                SUP{
                    font-family: "book antiqua";
                    font-size: 1.2vh;
                }
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

                .langLabel{
                    color: white;
                    margin-right: 0.5vw;
                }
                .lang{
                    border-radius: 10px;
                    padding: 0.2vh 0.5vw;
                    margin-right: 2vw;
                    background-color: rgb(255, 255, 255, 0.5);
                }
                h3{
                    display: inline-block;
                    margin-right: 2vw;
                }
                .notification{
                    position: relative;
                    text-align: center;
                    line-height: 1rem;
                    padding: 0;
                    z-index: 0;

                    .fa-bell{
                        font-size: 3vh;
                    }

                    .notifyIcon{
                        height: 2vh;
                        width: 2vh;
                        background-color: rgb(165, 20, 20);
                        border-radius: 3px;
                        font-family: "Cascadia Mono";
                        position: absolute;
                        left: 1%;
                        bottom: -10%;
                        z-index: 1;
                        visibility: hidden;
                        pointer-events: none;
                        line-height: 2vh;
                        font-size: 1.5vh;
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