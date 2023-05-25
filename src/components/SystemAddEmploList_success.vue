<script>
import { RouterLink, RouterView } from 'vue-router'
import GetAllEmployeeInfo from '../service/SystemAddEmploList_API'
// import GetNewInfo from './SystemAddEmploList.vue'
export default {
    name:'Employees',
    components: {
        RouterLink
    },
    data(){
        return{
            employees:[],
        }
    },
    methods:{
        getAllEmployeeInfo(){
            GetAllEmployeeInfo.getAllEmployeeInfo().then((res)=>{
                this.employees=res.data;
                console.log(this.employees.employeeInfoList);
            })
        }
    },
    created(){
        this.getAllEmployeeInfo()
    }
}

</script>
<template>
    <div class="main">
        <div class="add">
            <h4>新增人員名單</h4>
            <table class="table table-striped ms-4">
               <thead>
                <th>員工ID</th>
                <th>姓名</th>
                <th>性別</th>
                <th>信箱</th>
                <th>部門</th>
                <th>職稱</th>
                <th>職等</th>
                <th>主管ID</th>
                <th>電話</th>
               </thead> 
               <tbody>
                <tr v-for="employee in employees.employeeInfoList" v-bind:key="employee.employeeId">
                    <td>{{ employee.employeeId }} </td>
                    <td>{{ employee.name }}</td>
                    <td>{{ employee.gender }}</td>
                    <td>{{ employee.email }}</td>
                    <td>{{ employee.department }}</td>
                    <td>{{ employee.position }}</td>
                    <td>{{ employee.level }}</td>
                    <td>{{ employee.supervisor }}</td>
                    <td>{{ employee.phone }}</td>
                </tr>
               </tbody>
            </table>
            <!-- 填寫區 -->
           <h3>新增成功</h3>
            <!-- 底部按鈕 -->
            <div class="area2">
                <RouterLink to="/login" >
                 <button type="button" class="ms-4 mb-4">返回首頁</button>
                </RouterLink>
                
                <RouterLink to="/systemAddEmploList" >
                 <button type="button" class="me-4 mb-4">繼續新增</button>
                </RouterLink>
            </div>
        </div>

    </div>
</template>


<style lang="scss" scoped>
.main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .add {
        background-color: rgba(255, 255, 255, 0.724);
        border: 2px solid rgb(177, 208, 224);
        border-radius: 1vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 100vw;
        height: 100vh;
        h4{
            font-size: 3.5vh;
            font-weight: bold;
        }

        

        .area2 {
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding: 0 8px;

            button {
                background: rgb(26, 55, 77);
                border: 1.5px solid #000;
                color: white;
                border-radius: 5px;
                width: 100px;
                height: 30px;
                font-size: 15px;

                &:hover {
                    background-color: rgb(64, 104, 130);
                }

                &:active {
                    transform: scale(0.95);
                }
            }
        }
    }


}
</style>