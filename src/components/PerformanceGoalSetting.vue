<script>
import { RouterLink } from 'vue-router'
export default {
data(){
    return{
        //帳戶資訊
        name:'',
        employeeId:'',
        accountId:'',
        //語言
        langValue:'ch',
        //未分類CaseInfo
        caseInfo:[],
        //已分類CaseInfo
        sortCaseInfoByModel:[],
        //modelList
        modelList:[]
    }
},
methods:{
    deco(){
        let deco = document.getElementById("deco");
        deco.style.left = "200%";
    },
    getCaseInfoByCaseId(Id){
        fetch("http://localhost:3000/getCaseInfoById" ,{
            method:"put",
            body: JSON.stringify({caseInfoId : Id}),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(res => res.json())
        .then((data)=>{
            console.log(data);
        })
        .catch(err => console.log(err))
    },
    getCaseInfoByEmployeeId(){
        fetch("http://localhost:3000/getCaseInfoByEmployeeId" ,{
            method:"put",
            body: JSON.stringify({employeeId : this.employeeId}),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(res => res.json())
        .then((data)=>{
            this.caseInfo = data;
            this.sortCaseInfoByModel();
            console.log(data);
        })
        .catch(err => console.log(err))
    },
    sortCaseInfoByModel(){
        let modelList = [];
        this.caseInfo.caseInfoList.forEach((thisCase) => {
            if(!modelList.includes(thisCase.model)){
                modelList.push(thisCase.model);
            }
        })

        this.modelList = modelList;

        modelList.forEach((thisModel) => {
            this.caseInfoByModel[thisModel] = [];
        })
        
        modelList.forEach((thisModel) => {
            this.caseInfo.caseInfoList.forEach((thisCase) => {
                if(thisCase.model === thisModel){
                    this.caseInfoByModel[thisModel].push(thisCase);
                }
            })
        })

        console.log(this.caseInfoByModel);
    },
    fetchPRInfo() {

        fetch("http://localhost:3000/getAllPerformanceReferences", {
        method: "get",
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        }).then(res => res.json())
        .then((data) => {
            console.log(data);
            this.prList = data;
        })
        .catch(err => console.log(err))
    },
},
created(){
    //檢查及切換語言
    this.name = sessionStorage.getItem('employeeName');
    if(this.name === null){
        this.name = localStorage.getItem('employeeName');
        if(this.name === null){
            this.name = 'NONE';
        }
    }
    //檢查帳號資訊
    this.employeeId = sessionStorage.getItem('employeeId');
    if(this.employeeId === null){
        this.employeeId = localStorage.getItem('employeeId');
    }
    this.accountId = sessionStorage.getItem('accountId');
    if(this.accountId === null){
        this.accountId = localStorage.getItem('accountId');
    }
    this.langValue = sessionStorage.getItem('langValue');
    if(this.langValue === null){
        this.langValue = 'ch';
    }
    this.fetchPRInfo();
    this.getCaseInfoByEmployeeId();
},
mounted(){
    //進入頁面deco特效
    setTimeout(()=>{
        this.deco();
    },10)
},
watch: {

}
}
</script>
<template>
    <div class="deco" id="deco"></div>
    <div class="main">
        <div v-if="hasRendered" class="all">
        </div>
        <!--spinner在list還沒渲染好時顯示-->
        <div v-else class="spinner-border text-light" role="status"></div>

        <!-- <RouterLink to="/login"><button class="btnback" type="button">返回登入頁</button></RouterLink> -->
    </div>
</template>


<style lang="scss" scoped>
.deco{
    position: absolute;
    transition: 1s;
    left: -200%;
    height: 100%;
    width: 70vw;
    transform: skew(45deg);
    background: linear-gradient(45deg, rgba(97, 137, 168, 0.5), rgba(211, 69, 69, 0.5));
}
.main {
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    z-index: -1;

    .text-light{
        font-size: 4rem;
        width: 5rem;
        height: 5rem;
    }
    .all {
        display: flex;
        position: relative;
        flex-direction: column;
        width: 80%;
        height: 90%;
        

        .btnback {
            background: rgb(26, 55, 77);
            border: 1.5px solid #000;
            color: white;
            border-radius: 5px;
            width: 120px;
            height: 40px;
            // font-weight: bold;
            font-size: 18px;
            margin-top: 50px;

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
