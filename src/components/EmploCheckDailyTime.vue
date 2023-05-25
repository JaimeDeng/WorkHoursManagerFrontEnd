<script>
import { RouterLink, RouterView } from 'vue-router'
import EditEmployeeWorkHoursInfo from './EditEmployeeWorkHoursInfo.vue' //紅蚯蚓不用理他
export default {
components: {
    RouterLink,
    EditEmployeeWorkHoursInfo,
},
data(){
    return{
        //帳戶資料
        employeeId:'',
        accountId:'',
        employeeName:'',
        //工時表資料
        today:'',
        workDayInfo:[],
        workHoursInfoData:[],
        selectedDateInfoList:[],
        queryDate:"",
        showWorkHoursInfo:false,
        workDayInfoList:[],
        hasAnyWorkDayInfo:false,
        hasntThisDateInfo:false,
        hasntThisReviewStatusInfo: false,
        hasntThisTimeFrameInfo:false,
        listRenderOver:false,
        hasntBeenApproved: true,
        message:'',
        //介面文字
        employeeIdStr:'',
        searchDate:'',
        langValue:'ch',
        title:'',
        search:'',
        reviewStatus:'',
        reviewStatusPH:'',
        reviewStatusOpt1:'',
        reviewStatusOpt2:'',
        attendanceStatus:'',
        logtime:'',
        timeFrame:'',
        timeFramePH:'',
        timeFrameOpt1:'',
        timeFrameOpt2:'',
        timeFrameOpt3:'',
        checkStr:'',
        backBtn:'',
        reviewStr:'',
        notReviewStr:'',
        listStr:'',
        startTimeStr:'',
        endTimeStr:'',
        modelStr:'',
        caseNoStr:'',
        detailStr:'',
        btnStr:'',
        dateStr:'',
        edit:'',
        //輸入綁定
        reviewStatusSelect:'default',
        timeFrameSelect:'default',
        //元件動畫
        isAnimating:false,
        //傳遞變數
        editWorkHoursInfoId:''
    }
},
methods:{
    changeLanguage(){
        if(this.langValue === 'ch'){
            this.title = '工時表一覽';
            this.search = '以日期搜尋';
            this.employeeIdStr = '員工ID';
            this.reviewStatus = '審核狀態';
            this.reviewStatusPH = '選擇審核狀態';
            this.reviewStatusOpt1 = '已審核';
            this.reviewStatusOpt2 = '未審核';
            this.reviewStr = '已審核';
            this.notReviewStr = '未審核';
            this.attendanceStatus = '出勤狀態';
            this.logtime = '登錄時數';
            this.timeFrame = '時間範圍';
            this.timeFramePH = '請選擇時間範圍';
            this.timeFrameOpt1 = '7日';
            this.timeFrameOpt2 = '14日';
            this.timeFrameOpt3 = '30日';
            this.checkStr = '查看';
            this.backBtn = '返回首頁';
            this.listStr = '表單共';
            this.startTimeStr = '開始時間';
            this.endTimeStr = '結束時間';
            this.modelStr = '機型';
            this.caseNoStr = '案件號';
            this.detailStr = '工作內容';
            this.btnStr = '返回日工時表';
            this.dateStr = '日期';
            this.edit = '編輯';
        }else if(this.langValue === 'en'){
            this.title = 'Timesheet List';
            this.search = 'Search by date';
            this.employeeIdStr = 'Employee ID';
            this.reviewStatus = 'Approval status';
            this.attendanceStatus = 'Attendance status';
            this.reviewStatusPH = 'Select approval status';
            this.reviewStatusOpt1 = 'Approved';
            this.reviewStatusOpt2 = 'Pending approval';
            this.reviewStr = 'Approved';
            this.notReviewStr = 'Pending approval';
            this.logtime = 'Log time';
            this.timeFrame = 'Time frame';
            this.timeFramePH = 'Select time frame';
            this.timeFrameOpt1 = '7days';
            this.timeFrameOpt2 = '14days';
            this.timeFrameOpt3 = '30days';
            this.checkStr = 'Check';
            this.backBtn = 'Back to homepage';
            this.listStr = 'Total';
            this.startTimeStr = 'Start time';
            this.endTimeStr = 'End time';
            this.modelStr = 'Model';
            this.caseNoStr = 'Case number';
            this.detailStr = 'Job description';
            this.btnStr ='Return to Timesheet';
            this.dateStr = 'Date';
            this.edit = 'Edit';
        }else if(this.langValue === 'jp'){
            this.title = '勤務表一覽';
            this.search = '日付で検索する';
            this.employeeIdStr = '社員番号';
            this.reviewStatus = '審査状態';
            this.reviewStatusPH = '審査状態選択';
            this.reviewStatusOpt1 = '審査済み';
            this.reviewStatusOpt2 = '未審査';
            this.reviewStr = '承認済み';
            this.notReviewStr = '承認待ち';
            this.attendanceStatus = '勤務状態';
            this.logtime = '登録時間';
            this.timeFrame = '時間範囲';
            this.timeFramePH = '時間範囲選択';
            this.timeFrameOpt1 = '7日';
            this.timeFrameOpt2 = '14日';
            this.timeFrameOpt3 = '30日';
            this.checkStr = '詳細';
            this.backBtn = 'ホームページへ戻る';
            this.listStr = '合計';
            this.startTimeStr = '開始時間';
            this.endTimeStr = '終了時間';
            this.modelStr = '型番';
            this.caseNoStr = '案件番号';
            this.detailStr = '仕事內容';
            this.btnStr = '勤務表に戻る';
            this.dateStr = '日付';
            this.edit = '編集';
        }
    },
    fetchWorkDayInfo(){

        let reqBody = {
            employeeId : this.employeeId
        }

        fetch("http://localhost:3000/getWorkDayInfoByEmployeeId" ,{
            method:"put",
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(res => res.json())
        .then((data)=>{
            //將日工時表以日期最新日期開始排序 (原本順序是先輸入的越前面)
            let container = null;
            for(let i = data.workDayInfoList.length - 1 ; i > 0 ; i --){
                for(let i = 0 ; i < data.workDayInfoList.length - 1 ; i++){
                    const nextDateStr = data.workDayInfoList[i+1].date;
                    const [nextDateYear, nextDateMonth, nextDateDay] = nextDateStr.split('-');
                    const nextDate = new Date(nextDateYear, nextDateMonth - 1, nextDateDay);
                    const thisDateStr = data.workDayInfoList[i].date;
                    const [thisDateStrYear, thisDateStrMonth, thisDateStrDay] = thisDateStr.split('-');
                    const thisDate = new Date(thisDateStrYear, thisDateStrMonth - 1, thisDateStrDay);
                    if(nextDate > thisDate){
                        container = data.workDayInfoList[i+1];
                        data.workDayInfoList[i+1] = data.workDayInfoList[i];
                        data.workDayInfoList[i] = container;
                    }       
                }
            }
            this.workDayInfo = data;
            console.log(this.workDayInfo);
            if(this.workDayInfo.workDayInfoList.length !== 0){
                this.hasAnyWorkDayInfo = true;
            }
            //完全沒資料就不跑spinner
            if(this.hasAnyWorkDayInfo === false){
                this.listRenderOver = true;
            }
            this.renderList();
            if(data.success === true){
                this.message = data.message;
            }else{
                this.message = data.message;
            }
        })
        .catch(err => console.log(err))
    },
    renderList(){
        this.workDayInfoList = [];
        this.hasntThisTimeFrameInfo = false;
        this.hasntThisReviewStatusInfo = false;
        this.workDayInfo.workDayInfoList.forEach((workDayInfo)=>{
            let approvedStr = "";
            if(workDayInfo.approved === true){
                approvedStr = this.reviewStr;
            }else{
                approvedStr = this.notReviewStr;
            }
            let workingHoursIsNotEnough = false;
            if(workDayInfo.workingHours < 8){
                workingHoursIsNotEnough = true;
            }
            this.workDayInfoList.push({
                workInfoId : workDayInfo.workInfoId,
                date : workDayInfo.date,
                employeeId : workDayInfo.employeeId.employeeId,
                workingHours : workDayInfo.workingHours,
                status : workDayInfo.status,
                approved : workDayInfo.approved,
                approvedStr : approvedStr,
                workingHoursIsNotEnough : workingHoursIsNotEnough
            })
            console.log(workDayInfo.date)
        })
        this.listRenderOver = true;
    },
    renderListLimitedApproved(){
        this.workDayInfoList = [];
        let hasThisReviewStatusInfo = false;
        //混合天數範圍查詢
        if(this.timeFrameSelect === "default"){
            this.workDayInfo.workDayInfoList.forEach((workDayInfo)=>{
                if(workDayInfo.approved === true){
                    let approvedStr = this.reviewStr;
                    let workingHoursIsNotEnough = false;
                    if(workDayInfo.workingHours < 8){
                        workingHoursIsNotEnough = true;
                    }
                    this.workDayInfoList.push({
                        workInfoId : workDayInfo.workInfoId,
                        date : workDayInfo.date,
                        employeeId : workDayInfo.employeeId.employeeId,
                        workingHours : workDayInfo.workingHours,
                        status : workDayInfo.status,
                        approved : workDayInfo.approved,
                        approvedStr : approvedStr,
                        workingHoursIsNotEnough : workingHoursIsNotEnough
                    })
                    hasThisReviewStatusInfo = true;
                }
            })
            if(hasThisReviewStatusInfo === false){
                this.hasntThisReviewStatusInfo = true;
            }else{
                this.hasntThisReviewStatusInfo = false;
            }
        }
        if(this.timeFrameSelect === "7days"){
            this.workDayInfo.workDayInfoList.forEach((workDayInfo)=>{
                let workDay = new Date(workDayInfo.date);
                let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                if(dayDiff <= 7 && workDayInfo.approved === true){
                    let approvedStr = this.reviewStr;
                    let workingHoursIsNotEnough = false;
                    if(workDayInfo.workingHours < 8){
                        workingHoursIsNotEnough = true;
                    }
                    this.workDayInfoList.push({
                        workInfoId : workDayInfo.workInfoId,
                        date : workDayInfo.date,
                        employeeId : workDayInfo.employeeId.employeeId,
                        workingHours : workDayInfo.workingHours,
                        status : workDayInfo.status,
                        approved : workDayInfo.approved,
                        approvedStr : approvedStr,
                        workingHoursIsNotEnough : workingHoursIsNotEnough
                    })
                    hasThisReviewStatusInfo = true;
                }
            })
            if(hasThisReviewStatusInfo === false){
                this.hasntThisReviewStatusInfo = true;
            }else{
                this.hasntThisReviewStatusInfo = false;
            }
        }
        if(this.timeFrameSelect === "14days"){
            this.workDayInfo.workDayInfoList.forEach((workDayInfo)=>{
                let workDay = new Date(workDayInfo.date);
                let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                if(dayDiff <= 14 && workDayInfo.approved === true){
                    let approvedStr = this.reviewStr;              
                    let workingHoursIsNotEnough = false;
                    if(workDayInfo.workingHours < 8){
                        workingHoursIsNotEnough = true;
                    }
                    this.workDayInfoList.push({
                        workInfoId : workDayInfo.workInfoId,
                        date : workDayInfo.date,
                        employeeId : workDayInfo.employeeId.employeeId,
                        workingHours : workDayInfo.workingHours,
                        status : workDayInfo.status,
                        approved : workDayInfo.approved,
                        approvedStr : approvedStr,
                        workingHoursIsNotEnough : workingHoursIsNotEnough
                    })
                    hasThisReviewStatusInfo = true;
                }
            })
            if(hasThisReviewStatusInfo === false){
                this.hasntThisReviewStatusInfo = true;
            }else{
                this.hasntThisReviewStatusInfo = false;
            }
        }
        if(this.timeFrameSelect === "30days"){
            this.workDayInfo.workDayInfoList.forEach((workDayInfo)=>{
                let workDay = new Date(workDayInfo.date);
                let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                if(dayDiff <= 30 && workDayInfo.approved === true){
                    let approvedStr = this.reviewStr;
                    let workingHoursIsNotEnough = false;
                    if(workDayInfo.workingHours < 8){
                        workingHoursIsNotEnough = true;
                    }
                    this.workDayInfoList.push({
                        workInfoId : workDayInfo.workInfoId,
                        date : workDayInfo.date,
                        employeeId : workDayInfo.employeeId.employeeId,
                        workingHours : workDayInfo.workingHours,
                        status : workDayInfo.status,
                        approved : workDayInfo.approved,
                        approvedStr : approvedStr,
                        workingHoursIsNotEnough : workingHoursIsNotEnough
                    })
                    hasThisReviewStatusInfo = true;
                }
            })
            if(hasThisReviewStatusInfo === false){
                this.hasntThisReviewStatusInfo = true;
            }else{
                this.hasntThisReviewStatusInfo = false;
            }
        }
    },
    renderListLimitedNotApproved(){
        this.workDayInfoList = [];
        let hasThisReviewStatusInfo = false;
        //混合天數範圍查詢
        if(this.timeFrameSelect === "default"){
            this.workDayInfo.workDayInfoList.forEach((workDayInfo)=>{
                if(workDayInfo.approved === false){
                    let approvedStr = this.notReviewStr;
                    let workingHoursIsNotEnough = false;
                    if(workDayInfo.workingHours < 8){
                        workingHoursIsNotEnough = true;
                    }
                    this.workDayInfoList.push({
                        workInfoId : workDayInfo.workInfoId,
                        date : workDayInfo.date,
                        employeeId : workDayInfo.employeeId.employeeId,
                        workingHours : workDayInfo.workingHours,
                        status : workDayInfo.status,
                        approved : workDayInfo.approved,
                        approvedStr : approvedStr,
                        workingHoursIsNotEnough : workingHoursIsNotEnough
                    })
                    hasThisReviewStatusInfo = true;
                }
            })
            if(hasThisReviewStatusInfo === false){
                this.hasntThisReviewStatusInfo = true;
            }else{
                this.hasntThisReviewStatusInfo = false;
            }
        }
        if(this.timeFrameSelect === "7days"){
            this.workDayInfo.workDayInfoList.forEach((workDayInfo)=>{
                let workDay = new Date(workDayInfo.date);
                let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                if(dayDiff <= 7 && workDayInfo.approved === false){
                    let approvedStr = this.notReviewStr;
                    let workingHoursIsNotEnough = false;
                    if(workDayInfo.workingHours < 8){
                        workingHoursIsNotEnough = true;
                    }
                    this.workDayInfoList.push({
                        workInfoId : workDayInfo.workInfoId,
                        date : workDayInfo.date,
                        employeeId : workDayInfo.employeeId.employeeId,
                        workingHours : workDayInfo.workingHours,
                        status : workDayInfo.status,
                        approved : workDayInfo.approved,
                        approvedStr : approvedStr,
                        workingHoursIsNotEnough : workingHoursIsNotEnough
                    })
                    hasThisReviewStatusInfo = true;
                }
            })
            if(hasThisReviewStatusInfo === false){
                this.hasntThisReviewStatusInfo = true;
            }else{
                this.hasntThisReviewStatusInfo = false;
            }
        }
        if(this.timeFrameSelect === "14days"){
            this.workDayInfo.workDayInfoList.forEach((workDayInfo)=>{
                let workDay = new Date(workDayInfo.date);
                let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                if(dayDiff <= 14 && workDayInfo.approved === false){
                    let approvedStr = this.notReviewStr;
                    let workingHoursIsNotEnough = false;
                    if(workDayInfo.workingHours < 8){
                        workingHoursIsNotEnough = true;
                    }
                    this.workDayInfoList.push({
                        workInfoId : workDayInfo.workInfoId,
                        date : workDayInfo.date,
                        employeeId : workDayInfo.employeeId.employeeId,
                        workingHours : workDayInfo.workingHours,
                        status : workDayInfo.status,
                        approved : workDayInfo.approved,
                        approvedStr : approvedStr,
                        workingHoursIsNotEnough : workingHoursIsNotEnough
                    })
                    hasThisReviewStatusInfo = true;
                }
            })
            if(hasThisReviewStatusInfo === false){
                this.hasntThisReviewStatusInfo = true;
            }else{
                this.hasntThisReviewStatusInfo = false;
            }
        }
        if(this.timeFrameSelect === "30days"){
            this.workDayInfo.workDayInfoList.forEach((workDayInfo)=>{
                let workDay = new Date(workDayInfo.date);
                let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                if(dayDiff <= 30 && workDayInfo.approved === false){
                    let approvedStr = this.notReviewStr;
                    let workingHoursIsNotEnough = false;
                    if(workDayInfo.workingHours < 8){
                        workingHoursIsNotEnough = true;
                    }
                    this.workDayInfoList.push({
                        workInfoId : workDayInfo.workInfoId,
                        date : workDayInfo.date,
                        employeeId : workDayInfo.employeeId.employeeId,
                        workingHours : workDayInfo.workingHours,
                        status : workDayInfo.status,
                        approved : workDayInfo.approved,
                        approvedStr : approvedStr,
                        workingHoursIsNotEnough : workingHoursIsNotEnough
                    })
                    hasThisReviewStatusInfo = true;
                }
            })
            if(hasThisReviewStatusInfo === false){
                this.hasntThisReviewStatusInfo = true;
            }else{
                this.hasntThisReviewStatusInfo = false;
            }
        }
    },
    renderListByDate(date){
        this.workDayInfoList = [];
        let hasThisDateInfo = false;
        this.workDayInfo.workDayInfoList.forEach((workDayInfo)=>{
            if(workDayInfo.date === date){
                let approvedStr = "";
                if(workDayInfo.approved === true){
                    approvedStr = this.reviewStr;
                }else{
                    approvedStr = this.notReviewStr;
                }
                let workingHoursIsNotEnough = false;
                if(workDayInfo.workingHours < 8){
                    workingHoursIsNotEnough = true;
                }
                this.workDayInfoList.push({
                    workInfoId : workDayInfo.workInfoId,
                    date : workDayInfo.date,
                    employeeId : workDayInfo.employeeId.employeeId,
                    workingHours : workDayInfo.workingHours,
                    status : workDayInfo.status,
                    approved : workDayInfo.approved,
                    approvedStr : approvedStr,
                    workingHoursIsNotEnough : workingHoursIsNotEnough
                })
                hasThisDateInfo = true;
            }
        })
        if(hasThisDateInfo === false){
            this.hasntThisDateInfo = true;
        }else{
            this.hasntThisDateInfo = false;
        }
    },
    renderListWhitin7Days(){
        this.workDayInfoList = [];
        let hasThisTimeFrameInfo = false;
        //混合審核狀態判斷
        if(this.reviewStatusSelect === 'default'){
            this.workDayInfo.workDayInfoList.forEach((workDayInfo)=>{
                let workDay = new Date(workDayInfo.date);
                let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                if(dayDiff <= 7){
                    let approvedStr = "";
                    if(workDayInfo.approved === true){
                        approvedStr = this.reviewStr;
                    }else{
                        approvedStr = this.notReviewStr;
                    }
                    let workingHoursIsNotEnough = false;
                    if(workDayInfo.workingHours < 8){
                        workingHoursIsNotEnough = true;
                    }
                    this.workDayInfoList.push({
                        workInfoId : workDayInfo.workInfoId,
                        date : workDayInfo.date,
                        employeeId : workDayInfo.employeeId.employeeId,
                        workingHours : workDayInfo.workingHours,
                        status : workDayInfo.status,
                        approved : workDayInfo.approved,
                        approvedStr : approvedStr,
                        workingHoursIsNotEnough : workingHoursIsNotEnough
                    })
                    hasThisTimeFrameInfo = true;
                }
            })
        }
        if(this.reviewStatusSelect === 'true'){
            this.workDayInfo.workDayInfoList.forEach((workDayInfo)=>{
                let workDay = new Date(workDayInfo.date);
                let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                //7天內且已審核
                if(dayDiff <= 7 && workDayInfo.approved === true){
                    let approvedStr = this.reviewStr;

                    let workingHoursIsNotEnough = false;
                    if(workDayInfo.workingHours < 8){
                        workingHoursIsNotEnough = true;
                    }
                    this.workDayInfoList.push({
                        workInfoId : workDayInfo.workInfoId,
                        date : workDayInfo.date,
                        employeeId : workDayInfo.employeeId.employeeId,
                        workingHours : workDayInfo.workingHours,
                        status : workDayInfo.status,
                        approved : workDayInfo.approved,
                        approvedStr : approvedStr,
                        workingHoursIsNotEnough : workingHoursIsNotEnough
                    })
                    hasThisTimeFrameInfo = true;
                }
            })
        }
        if(this.reviewStatusSelect === 'false'){
            this.workDayInfo.workDayInfoList.forEach((workDayInfo)=>{
                let workDay = new Date(workDayInfo.date);
                let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                //7天內且未審核
                if(dayDiff <= 7 && workDayInfo.approved === false){
                    let approvedStr = this.notReviewStr;
                    let workingHoursIsNotEnough = false;
                    if(workDayInfo.workingHours < 8){
                        workingHoursIsNotEnough = true;
                    }
                    this.workDayInfoList.push({
                        workInfoId : workDayInfo.workInfoId,
                        date : workDayInfo.date,
                        employeeId : workDayInfo.employeeId.employeeId,
                        workingHours : workDayInfo.workingHours,
                        status : workDayInfo.status,
                        approved : workDayInfo.approved,
                        approvedStr : approvedStr,
                        workingHoursIsNotEnough : workingHoursIsNotEnough
                    })
                    hasThisTimeFrameInfo = true;
                }
            })
        }
        if(hasThisTimeFrameInfo === false){
            this.hasntThisTimeFrameInfo = true;
        }else{
            this.hasntThisTimeFrameInfo = false;
        }
    },
    renderListWhitin14Days(){
        this.workDayInfoList = [];
        let hasThisTimeFrameInfo = false;
        //混合審核狀態判斷
        if(this.reviewStatusSelect === 'default'){
            this.workDayInfo.workDayInfoList.forEach((workDayInfo)=>{
                let workDay = new Date(workDayInfo.date);
                let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                if(dayDiff <= 14){
                    let approvedStr = "";
                    if(workDayInfo.approved === true){
                        approvedStr = this.reviewStr;
                    }else{
                        approvedStr = this.notReviewStr;
                    }
                    let workingHoursIsNotEnough = false;
                    if(workDayInfo.workingHours < 8){
                        workingHoursIsNotEnough = true;
                    }
                    this.workDayInfoList.push({
                        workInfoId : workDayInfo.workInfoId,
                        date : workDayInfo.date,
                        employeeId : workDayInfo.employeeId.employeeId,
                        workingHours : workDayInfo.workingHours,
                        status : workDayInfo.status,
                        approved : workDayInfo.approved,
                        approvedStr : approvedStr,
                        workingHoursIsNotEnough : workingHoursIsNotEnough
                    })
                    hasThisTimeFrameInfo = true;
                }
            })
        }
        if(this.reviewStatusSelect === 'true'){
            this.workDayInfo.workDayInfoList.forEach((workDayInfo)=>{
                let workDay = new Date(workDayInfo.date);
                let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                //7天內且已審核
                if(dayDiff <= 14 && workDayInfo.approved === true){
                    let approvedStr = this.reviewStr;

                    let workingHoursIsNotEnough = false;
                    if(workDayInfo.workingHours < 8){
                        workingHoursIsNotEnough = true;
                    }
                    this.workDayInfoList.push({
                        workInfoId : workDayInfo.workInfoId,
                        date : workDayInfo.date,
                        employeeId : workDayInfo.employeeId.employeeId,
                        workingHours : workDayInfo.workingHours,
                        status : workDayInfo.status,
                        approved : workDayInfo.approved,
                        approvedStr : approvedStr,
                        workingHoursIsNotEnough : workingHoursIsNotEnough
                    })
                    hasThisTimeFrameInfo = true;
                }
            })
        }
        if(this.reviewStatusSelect === 'false'){
            this.workDayInfo.workDayInfoList.forEach((workDayInfo)=>{
                let workDay = new Date(workDayInfo.date);
                let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                //7天內且未審核
                if(dayDiff <= 14 && workDayInfo.approved === false){
                    let approvedStr = this.notReviewStr;
                    let workingHoursIsNotEnough = false;
                    if(workDayInfo.workingHours < 8){
                        workingHoursIsNotEnough = true;
                    }
                    this.workDayInfoList.push({
                        workInfoId : workDayInfo.workInfoId,
                        date : workDayInfo.date,
                        employeeId : workDayInfo.employeeId.employeeId,
                        workingHours : workDayInfo.workingHours,
                        status : workDayInfo.status,
                        approved : workDayInfo.approved,
                        approvedStr : approvedStr,
                        workingHoursIsNotEnough : workingHoursIsNotEnough
                    })
                    hasThisTimeFrameInfo = true;
                }
            })
        }
        if(hasThisTimeFrameInfo === false){
            this.hasntThisTimeFrameInfo = true;
        }else{
            this.hasntThisTimeFrameInfo = false;
        }
    },
    renderListWhitin30Days(){
        this.workDayInfoList = [];
        let hasThisTimeFrameInfo = false;
        //混合審核狀態判斷
        if(this.reviewStatusSelect === 'default'){
            this.workDayInfo.workDayInfoList.forEach((workDayInfo)=>{
                let workDay = new Date(workDayInfo.date);
                let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                if(dayDiff <= 30){
                    let approvedStr = "";
                    if(workDayInfo.approved === true){
                        approvedStr = this.reviewStr;
                    }else{
                        approvedStr = this.notReviewStr;
                    }
                    let workingHoursIsNotEnough = false;
                    if(workDayInfo.workingHours < 8){
                        workingHoursIsNotEnough = true;
                    }
                    this.workDayInfoList.push({
                        workInfoId : workDayInfo.workInfoId,
                        date : workDayInfo.date,
                        employeeId : workDayInfo.employeeId.employeeId,
                        workingHours : workDayInfo.workingHours,
                        status : workDayInfo.status,
                        approved : workDayInfo.approved,
                        approvedStr : approvedStr,
                        workingHoursIsNotEnough : workingHoursIsNotEnough
                    })
                    hasThisTimeFrameInfo = true;
                }
            })
        }
        if(this.reviewStatusSelect === 'true'){
            this.workDayInfo.workDayInfoList.forEach((workDayInfo)=>{
                let workDay = new Date(workDayInfo.date);
                let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                //7天內且已審核
                if(dayDiff <= 30 && workDayInfo.approved === true){
                    let approvedStr = this.reviewStr;

                    let workingHoursIsNotEnough = false;
                    if(workDayInfo.workingHours < 8){
                        workingHoursIsNotEnough = true;
                    }
                    this.workDayInfoList.push({
                        workInfoId : workDayInfo.workInfoId,
                        date : workDayInfo.date,
                        employeeId : workDayInfo.employeeId.employeeId,
                        workingHours : workDayInfo.workingHours,
                        status : workDayInfo.status,
                        approved : workDayInfo.approved,
                        approvedStr : approvedStr,
                        workingHoursIsNotEnough : workingHoursIsNotEnough
                    })
                    hasThisTimeFrameInfo = true;
                }
            })
        }
        if(this.reviewStatusSelect === 'false'){
            this.workDayInfo.workDayInfoList.forEach((workDayInfo)=>{
                let workDay = new Date(workDayInfo.date);
                let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                //7天內且未審核
                if(dayDiff <= 30 && workDayInfo.approved === false){
                    let approvedStr = this.notReviewStr;
                    let workingHoursIsNotEnough = false;
                    if(workDayInfo.workingHours < 8){
                        workingHoursIsNotEnough = true;
                    }
                    this.workDayInfoList.push({
                        workInfoId : workDayInfo.workInfoId,
                        date : workDayInfo.date,
                        employeeId : workDayInfo.employeeId.employeeId,
                        workingHours : workDayInfo.workingHours,
                        status : workDayInfo.status,
                        approved : workDayInfo.approved,
                        approvedStr : approvedStr,
                        workingHoursIsNotEnough : workingHoursIsNotEnough
                    })
                    hasThisTimeFrameInfo = true;
                }
            })
        }
        if(hasThisTimeFrameInfo === false){
            this.hasntThisTimeFrameInfo = true;
        }else{
            this.hasntThisTimeFrameInfo = false;
        }
    },
    //查看此日期的workHoursInfo 同時檢查是否被審核
    workHoursInfo(event){
        let reqBody = {
            employeeId : this.employeeId
        }

        //先看此日期此張工時表是否已審核 , 決定可否編輯
        fetch("http://localhost:3000/getWorkDayInfoByEmployeeId" ,{
        method:"put",
        body: JSON.stringify(reqBody),
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
        }).then(res => res.json())
        .then((data)=>{
            data.workDayInfoList.forEach((workDayInfo) =>{
                if(workDayInfo.date === event.target.value){
                    if(workDayInfo.approved === true){
                        this.hasntBeenApproved = false;
                    }else{
                        this.hasntBeenApproved = true;
                    }
                }
            })
        })
        .catch(err => console.log(err))

        fetch("http://localhost:3000/getWorkHoursInfoByEmployeeId" ,{
            method:"put",
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(res => res.json())
        .then((data)=>{
            //將工時表以時間最早的開始排序 (原本順序是先輸入的越前面)
            let container = null;
            for(let i = data.workHoursInfoList.length - 1 ; i > 0 ; i --){
                for(let i = 0 ; i < data.workHoursInfoList.length - 1 ; i++){
                    const nextTimeString = data.workHoursInfoList[i+1].startTime;
                    const nextTimeArr = nextTimeString.split(":");
                    const nextTime = new Date();
                    const nextTimeHours = parseInt(nextTimeArr[0]);
                    const nextTimeMinutes = parseInt(nextTimeArr[1]);
                    nextTime.setHours()
                    const thisTimeString = data.workHoursInfoList[i].startTime;
                    const thisTimeArr = thisTimeString.split(":");
                    const thisTime = new Date();
                    const thisTimeHours = parseInt(thisTimeArr[0]);
                    const thisTimeMinutes = parseInt(thisTimeArr[1]);
                    if(nextTimeHours === thisTimeHours){
                        if(nextTimeMinutes < thisTimeMinutes){
                            container = data.workHoursInfoList[i+1];
                            data.workHoursInfoList[i+1] = data.workHoursInfoList[i];
                            data.workHoursInfoList[i] = container;
                        }
                    }else if(nextTimeHours < thisTimeHours){
                        container = data.workHoursInfoList[i+1];
                        data.workHoursInfoList[i+1] = data.workHoursInfoList[i];
                        data.workHoursInfoList[i] = container;
                    }
                }
            }
            this.workHoursInfoData = data;
            console.log(this.workHoursInfoData);
            this.showWorkHoursInfo = true;
            setTimeout(()=>{
                this.queryDate = event.target.value;
                let workHoursInfoFrame = document.getElementById("workHoursInfoFrame");
                let deco1 = document.getElementById("deco1");
                let deco2 = document.getElementById("deco2");
                workHoursInfoFrame.style.left = "50%";
                workHoursInfoFrame.style.transform = "translateX(-50%)";
                deco1.style.left = "110%";
                deco2.style.left = "150%";
            },100);
            this.workHoursInfoByDate(event.target.value);
            if(data.success === true){
                this.message = data.message;
            }else{
                this.message = data.message;
            }
        })
        .catch(err => console.log(err))

        console.log(event.target.value);
        let sheet = document.getElementById("sheet");
        sheet.style.overflow = "hidden";
        sheet.style.marginLeft = "200%";
    },
    //以點擊的日期查詢工時表
    workHoursInfoByDate(targetValue){
        this.selectedDateInfoList = [];
        this.workHoursInfoData.workHoursInfoList.forEach((workHoursInfo)=>{
            if(workHoursInfo.date === targetValue){
                workHoursInfo.workInfoId = workHoursInfo.workInfoId.toString();
                this.selectedDateInfoList.push(workHoursInfo);
            }
        })
        console.log(this.selectedDateInfoList);
    },
    //返回日工時表
    backToWorkDayInfo(){
        let workHoursInfoFrame = document.getElementById("workHoursInfoFrame");
        workHoursInfoFrame.style.left = "-150%";
        let deco1 = document.getElementById("deco1");
        let deco2 = document.getElementById("deco2");
        deco1.style.transform = "skew(20deg)"
        deco2.style.transform = "skew(20deg)"
        deco1.style.left = "-150%";
        deco2.style.left = "-130%";
        let sheet = document.getElementById("sheet");
        sheet.style.marginLeft = "0";
        deco1.style.left = "-150";
        deco2.style.left = "-130";
        setTimeout(()=>{
            this.showWorkHoursInfo = false;
        },300)
    },
    //icon動畫
    startAnimation(){
        setInterval(() => {
            this.isAnimating = !this.isAnimating;
        }, 500); //每隔0.5秒執行一次
    },
    editWorkHoursInfo(input){
        this.editWorkHoursInfoId = input.target.value;
        const editWorkHoursInfoId = this.editWorkHoursInfoId; // 保存 editWorkHoursInfoId
        setTimeout(()=>{
            this.$router.push({ name: 'EditEmployeeWorkHoursInfo', params: { editWorkHoursInfoId } });
        },0)
    }
},
watch:{
    //監看searchDate的值變化 , date則是回遞該變數值
    searchDate(date){
        console.log(date);
        if(date === ''){
            this.hasntThisDateInfo = false;
            this.renderList();
        }else{
            this.renderListByDate(date);
        }
    },
    reviewStatusSelect(newValue){
        console.log(newValue);
        if(newValue === 'default'){
            this.renderList();
        }
        if(newValue === 'true'){
            this.renderListLimitedApproved();
        }
        if(newValue === 'false'){
            this.renderListLimitedNotApproved();
        }
    },
    timeFrameSelect(newValue){
        console.log(newValue);
        if(newValue === 'default'){
            this.renderList();
        }
        if(newValue === '7days'){
            this.renderListWhitin7Days();
        }
        if(newValue === '14days'){
            this.renderListWhitin14Days();
        }
        if(newValue === '30days'){
            this.renderListWhitin30Days();
        }
    },
},
created() {
    //獲取帳號資訊
    this.employeeId = sessionStorage.getItem('employeeId');
    if(this.employeeId === null){
        this.employeeId = localStorage.getItem('employeeId');
    }
    this.accountId = sessionStorage.getItem('accountId');
    if(this.accountId === null){
        this.accountId = localStorage.getItem('accountId');
    }
    this.employeeName = sessionStorage.getItem('employeeName');
    if(this.employeeName === null){
        this.employeeName = localStorage.getItem('employeeName');
    }

    //獲取工時表資訊
    this.fetchWorkDayInfo();
    console.log(this.workDayInfoList);
},
mounted(){

    //檢查及切換語言
    this.langValue = sessionStorage.getItem('langValue');
    if(this.langValue === null){
        this.langValue = 'ch';
    }
    console.log(this.langValue);
    this.changeLanguage();
    //獲取今天日期
    const today = new Date();
    this.today = today;
    
    //開始產生元件動畫
    this.startAnimation();
}
}
</script>
<template>
    <div class="main">

        <div class="check">

            <!-- 左側範圍 -->
            <div v-if="listRenderOver" class="left">
                <div class="title_search">
                    <h4 class="fw-bold title">{{ title }}</h4>
                    <div class="searchFrame">
                        <label for="serch">{{ search }}</label>
                        <div class="dateFrame">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <input :disabled="this.timeFrameSelect !== 'default'" @input="searchByDate" v-model="searchDate" id="serch" type="date">
                        </div>
                    </div>
                    
                    <div class="sel">
                        <div class="ap">
                            <!-- 審核狀態 -->
                            <label for="approvedStatusSelect">{{ reviewStatus }}</label>
                            <select :disabled="this.searchDate !== ''" v-model="reviewStatusSelect" id="approvedStatusSelect">
                                <option value="default" selected>{{ reviewStatusPH }}</option>
                                <option value="true">{{ reviewStatusOpt1 }}</option>
                                <option value="false">{{ reviewStatusOpt2 }}</option>
                            </select>
                        </div>
                        <div class="tim">
                            <!-- 時間範圍 -->
                            <label for="timeFrameSelect">{{ timeFrame }}</label>
                            <select :disabled="this.searchDate !== ''" v-model="timeFrameSelect" for="timeFrameSelect">
                                <option value="default" selected>{{ timeFramePH }}</option>
                                <option value="7days">{{ timeFrameOpt1 }}</option>
                                <option value="14days">{{ timeFrameOpt2 }}</option>
                                <option value="30days">{{ timeFrameOpt3 }}</option>
                            </select>
                        </div>
                    </div>

                </div>
                <div v-if="showWorkHoursInfo" id="workHoursInfoFrame" class="workHoursInfoFrame">
                    <div class="infoFrame" id="infoFrame">
                        <h4 class="fw-bold dateTitle">{{ queryDate }} {{ title }}</h4>           
                        <div class="cardFrame" id="cardFrame" v-dragscroll.x>
                            
                            <div :style="{backgroundColor : hasntBeenApproved ? '' : 'rgba(220, 220, 220, 0.4)'}" class="workHoursInfoCard" v-for="(workHoursInfo , index) in selectedDateInfoList">
                                <h4 class="infoNum">{{ listStr }}:{{ selectedDateInfoList.length }} </h4>
                                <h4 class="fw-bold" :style="{color : workHoursInfo.status === '出勤' ? 'rgb(40, 147, 56)' : 'rgb(59, 115, 168)'}">{{ workHoursInfo.status }}</h4>
                                <p style="color: #1a4e78" >{{ startTimeStr }}: {{ workHoursInfo.startTime }}</p>

                                <i class="fa-solid fa-arrow-down" style="color: #245c54;"></i>

                                <p style="color: #1a4e78" >{{ endTimeStr }}: {{ workHoursInfo.endTime }}</p>
                                <p>{{ modelStr }}: {{ workHoursInfo.model }}</p>
                                <p>{{ caseNoStr }}: {{ workHoursInfo.caseNo }}</p>

                                <div class="detailTextFrame">
                                    <h5>{{ detailStr }}</h5>
                                    <p>{{ workHoursInfo.detail }}</p>
                                </div>
                                <button v-if="hasntBeenApproved" :value="workHoursInfo.workInfoId" @click="editWorkHoursInfo" class="editWorkHoursInfo" id="editWorkHoursInfo">{{ edit }}</button>
                                <div v-if="!hasntBeenApproved && this.langValue=='ch'" class="hasBeenApproved"><i class="fa-solid fa-check"></i>{{ reviewStr }}</div>
                            </div>
                            <div v-if="selectedDateInfoList.length > 1" class="tips"><i :style="{ transform : isAnimating ? 'rotate(-15deg)' : 'rotate(30deg)' }" class="fa-solid fa-hand"></i>可拖曳觀看</div>
                        </div>
                    </div>
                    <button @click="backToWorkDayInfo" class="backToDayList" id="backToDayList" v-if="this.langValue='ch'">{{ btnStr }}</button>
                </div>
                <div class="deco1" id="deco1" v-if="showWorkHoursInfo"></div>
                <div class="deco2" id="deco2" v-if="showWorkHoursInfo"></div>
                <div class="sheet" id="sheet" style="overflow: auto;">
                    <!--手風琴-->
                    <div v-if="hasAnyWorkDayInfo" class="accordion accordion-flush" id="accordionFlushExample" style="overflow: auto;">
                        <!--手風琴格位-->
                        <div v-for="(workDayInfo , index) in workDayInfoList" :value="workDayInfo.worInfoId" :key="index" class="accordion-item">
                            <!--手風琴標題-->
                            <h2 class="accordion-header" id="flush-headingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    :data-bs-target="'#flush-collapse' + index" aria-expanded="false"
                                    aria-controls="flush-collapseOne">
                                    {{ dateStr }}:{{ workDayInfo.date }}
                                    <p :class="{'hasntApproved' : !workDayInfo.approved , 'hasApproved' : workDayInfo.approved }">{{ workDayInfo.approvedStr }}</p>
                                    <div class="approvedStrFrame" :style="{ backgroundColor: workDayInfo.approved ? 'rgb(95, 130, 154)' : 'rgb(181, 60, 60)' }"></div>
                                </button>
                            </h2>
                             <!--手風琴內容-->
                            <div :id="'flush-collapse' + index" class="accordion-collapse collapse"
                                aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <!-- 手風琴內容區 -->

                                    <!-- 員工ID -->
                                    <p v-if="this.langValue='ch'">{{ employeeIdStr }}: {{ workDayInfo.employeeId }}</p>

                                    <!-- 登錄時數 -->
                                    <p :class="{'notEnough' : workDayInfo.workingHoursIsNotEnough}">{{ logtime }}: {{ workDayInfo.workingHours }} hr(s)</p>

                                    <!-- 出勤狀態 -->
                                    <p >{{ attendanceStatus }}: {{ workDayInfo.status }}</p>

                                    <!-- 審核狀態 -->
                                    <p :class="{'hasntApproved' : !workDayInfo.approved }">{{reviewStatus}}: {{ workDayInfo.approvedStr }}</p>

                                    <button @click="workHoursInfo($event)" :value="workDayInfo.date" class="viewBtn" type="button" >{{ checkStr }}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3 v-if="!hasAnyWorkDayInfo 
                    && !hasntThisDateInfo && !hasntThisTimeFrameInfo
                    && !hasntThisReviewStatusInfo && this.langValue=='ch'" class="emptyTitle">
                    沒有任何日工時表
                    </h3>
                    <h4 v-if="!hasAnyWorkDayInfo 
                    && !hasntThisDateInfo && !hasntThisTimeFrameInfo
                    && !hasntThisReviewStatusInfo && this.langValue=='jp'" class="emptyTitle">
                    いかなる日の勤務表もありません
                    </h4>
                    <h3 v-if="!hasAnyWorkDayInfo 
                    && !hasntThisDateInfo && !hasntThisTimeFrameInfo
                    && !hasntThisReviewStatusInfo && this.langValue=='en'" class="emptyTitle">
                    There is no Timesheet
                    </h3>

                    <h3 v-if="hasntThisDateInfo && this.langValue=='ch'" class="emptyTitle">沒有該日期的日工時表</h3>
                    <h4 v-if="hasntThisDateInfo && this.langValue=='jp'" class="emptyTitle">その日の勤務表がありません</h4>
                    <h5 v-if="hasntThisDateInfo && this.langValue=='en'" class="emptyTitle">There is no daily work schedule for that date</h5>

                    <h3 v-if="hasntThisTimeFrameInfo && this.langValue=='ch'" class="emptyTitle">沒有該時間範圍內的工時表</h3>
                    <h5 v-if="hasntThisTimeFrameInfo && this.langValue=='jp'" class="emptyTitle">その時間範囲内には勤務表がありません</h5>
                    <h4 v-if="hasntThisTimeFrameInfo && this.langValue=='en'" class="emptyTitle">There is no work schedule <br> within that time range</h4>

                    <h3 v-if="hasntThisReviewStatusInfo && this.langValue=='ch'" class="emptyTitle">沒有該審核狀態的工時表</h3>
                    <h4 v-if="hasntThisReviewStatusInfo && this.langValue=='jp'" class="emptyTitle">その審査状態の勤務表はありません</h4>
                    <h4 v-if="hasntThisReviewStatusInfo && this.langValue=='en'" class="emptyTitle">There is no work schedule with that approved status</h4>
                </div>
                <RouterLink to="/employeeHome"><button type="button" class="back">{{ backBtn }}</button></RouterLink>
            </div>
            <!--spinner在list還沒渲染好時顯示-->
            <div v-else class="spinner-border text-light" role="status"></div>


        </div>

    </div>
</template>


<style lang="scss" scoped>
.main {
    flex-grow: 1;
    z-index: -1;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    select:disabled , input:disabled{
        background-color: rgb(179, 177, 171);
    }

    .check {
        position: relative;
        width: 80%;
        height: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        .text-light{
            font-size: 4rem;
            width: 5rem;
            height: 5rem;
        }

        .left {
            position: relative;
            padding: 1vw;
            background: linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(188, 186, 193, 0.8));
            border: 2px solid rgb(177, 201, 224);
            border-radius: 1vh;
            width: 90%;
            height: 75vh;
            overflow: hidden;

            .title_search {
                display: flex;
                width: 100%;
                height: 5vh;
                align-items: baseline;

                .title{
                    font-size: 3vh;
                }
                .searchFrame{
                    position: absolute;
                    right: 50%;
                    width: max-content;
                    display: inline-block;
                    label {
                        font-size: 1.5vh;
                        display: inline-block;
                        margin-right: 0.5vw;
                    }
                    .dateFrame{
                        display: inline-block;
                        position: relative;
                        i {
                            font-size: 1vh;
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);
                            left: 3%;
                        }

                        input {
                            width: 6vw;
                            height: 3vh;
                            font-size: 1vh;
                            border-radius: 30px;
                            padding-left: 20%;
                            border: 1px solid #000;

                        }
                    }
                }

                .sel {
                    display: flex;
                    position: absolute;
                    right: 5%;
                    .ap{
                        label {
                            font-size: 1.5vh;
                            display: inline-block;
                            margin-right: 0.5vw;
                        }
                        select {
                            font-size: 0.5vh;
                            border-radius: 5px;
                            width: 7vw;
                            margin-right: 12px;
                            height: 3vh;
                        }
                    }
                    .tim{
                        label {
                            font-size: 1.5vh;
                            display: inline-block;
                            margin-right: 0.5vw;
                        }
                        select {
                            font-size: 0.5vh;
                            border-radius: 5px;
                            width: 7vw;
                            margin-right: 12px;
                            height: 3vh;
                        }
                    }
                }
            }

            .workHoursInfoFrame{
                border: 1px solid rgb(130, 136, 144);
                background-color: rgba(152, 154, 157, 0.5);
                padding: 1vh 1vw;
                backdrop-filter: blur(10px);
                display: flex;
                flex-direction: column;
                position: absolute;
                left: -150%;
                border-radius: 10px;
                width: 95%;
                height: 83%;
                transition-property: left;
                transition-duration: 0.4s;
                transition-timing-function: cubic-bezier(0.9,0.7,0.2,1);

                .infoFrame{
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    height: 90%;
                    width: 100%;
                    border-radius: 10px 10px 0 0;
                    overflow: auto;

                    .dateTitle{
                        font-size: 2.5vh;
                        height: max-content;
                    }
                    .cardFrame{
                        border-radius: 10px;
                        height: 100%;
                        width: 100%;
                        overflow: hidden;
                        white-space: nowrap;
                        cursor: grab;

                        //修改瀏覽器的scrollbar樣式
                        ::-webkit-scrollbar {
                            width: 0.5vw;
                        }

                        ::-webkit-scrollbar-button {
                            background: transparent;
                            height: 3%; //上下buffer的高度
                            border-radius: 4px;
                        }

                        ::-webkit-scrollbar-track-piece {
                            background: transparent;
                        }

                        ::-webkit-scrollbar-thumb {
                            border-radius: 4px;
                            background-color: rgba(129, 91, 21, 0.4);
                            border: none;
                        }

                        ::-webkit-scrollbar-track {
                            box-shadow: transparent;
                        }

                        .tips{
                            position: fixed;
                            top: 2%;
                            left: 50%;
                            transform: translateX(-50%);
                            width: max-content;
                            padding: 0 0.5vw;
                            height: 3vh;
                            border-radius: 10px;
                            background-color: rgba(38, 38, 38, 0.5);
                            color: white;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 2vh;
                            transition: 0.5s;
                            visibility: hidden;
                            opacity : 0;
                            z-index: 1;
                            .fa-hand{
                                transition: 0.3s;
                            }
                        }
                        &:hover > .tips {
                            visibility: visible;
                            opacity: 1;
                        }
                        .workHoursInfoCard{
                            position: relative;
                            display: inline-block;
                            text-align: center;
                            border: none;
                            border-radius: 10px;
                            padding: 1% 1%;
                            margin: 0 1%;
                            height: 100%;
                            width: 40vw;
                            background-color: rgba(250, 250, 250, 0.7);
                            overflow: auto;
                            overflow-wrap: break-word;
                            white-space: break-spaces;
                            h4{
                                font-size: 3vh;
                            }
                            p{
                                margin: auto;
                                font-size: 2vh;
                            }
                            .infoNum{
                                font-size: 2.5vh;
                                position: fixed;
                                top: 2%;
                                right: 2%;
                            }
                            .detailTextFrame{
                                h5{
                                    margin-top: 1%;
                                    font-size: 2.5vh;
                                    border-bottom: 1px solid rgb(83, 78, 50);
                                }
                                position: absolute;
                                bottom: 1%;
                                left: 50%;
                                transform: translateX(-50%);
                                width: 98%;
                                height: 57%;
                                border-radius: 10px;
                                border: 1.5px solid rgb(83, 78, 50);
                                background-color: rgba(240, 235, 219, 0.4);
                                overflow: auto;
                            }
                            .editWorkHoursInfo{
                                position: absolute;
                                top: 0%;
                                left: 0%;
                                background: rgb(237, 203, 89);
                                border: none;
                                color: rgb(32, 36, 44);
                                border-radius: 10px 0px 15px 0px;
                                width: max-content;
                                padding: 0 1vw;
                                height: 3.5vh;
                                font-size: 2vh;
                                transition: 0.4s;
                                z-index: 1;

                                &:hover {
                                    background-color: rgb(216, 179, 57);
                                }

                                &:active {
                                    transform: scale(0.97);
                                }
                            }

                            .hasBeenApproved{
                                position: absolute;
                                top: 0%;
                                left: 0%;
                                background: linear-gradient(to left, rgba(97, 137, 168, 0.5), rgba(116, 69, 211, 0.5));
                                border: none;
                                color: rgb(31, 27, 50);
                                border-radius: 10px 0px 15px 0px;
                                width: max-content;
                                padding: 0 1vw;
                                height: 3.5vh;
                                font-size: 2vh;
                                transition: 0.4s;
                                z-index: 1;
                            }
                        }
                    }
                }
                .backToDayList{
                    margin-top: 1%;
                    margin-left: auto;
                    margin-right: auto;
                    padding-left: 1vw;
                    padding-right: 1vw;
                    background-color: rgb(39, 46, 67);
                    border: 1px solid #000;
                    color: white;
                    border-radius: 1vh;
                    width: max-content;
                    height: 3.5vh;
                    bottom: 5%;
                    font-size: 1.5vh;
                    transition: 0.4s;

                    &:hover {
                        background-color: rgb(75, 75, 101);
                    }

                    &:active{
                        scale: 0.95;
                    }
                }
            }

            .deco1{
                position: absolute;
                left: -150%;
                transform: skew(-20deg);
                height: 140%;
                width: 30vw;
                background-color: rgba(67, 74, 79, 0.5);
                transition-property: left;
                transition-duration: 0.2s;
                transition-timing-function: cubic-bezier(0.5,0.2,0.2,0.5);
                z-index: 1;
            }
            .deco2{
                position: absolute;
                left: -130%;
                transform: skew(-20deg);
                height: 100%;
                width: 30vw;
                background-color: rgba(75, 61, 102, 0.6);
                transition-property: left;
                transition-duration: 0.6s;
                transition-timing-function: cubic-bezier(0.5,0.2,0.2,0.5);
                z-index: 1;
            }
            .sheet {
                position: relative;
                border-radius: 5px;
                height: 85%;
                transition-property: margin;
                transition-duration: 0.4s;
                transition-timing-function: cubic-bezier(0.9,0.7,0.2,1);

                //修改瀏覽器的scrollbar樣式
                ::-webkit-scrollbar {
                    width: 0.6vw;
                }

                ::-webkit-scrollbar-button {
                    background: transparent;
                    height: 0; //上下buffer的高度
                    border-radius: 4px;
                }

                ::-webkit-scrollbar-track-piece {
                    background: transparent;
                }

                ::-webkit-scrollbar-thumb {
                    border-radius: 4px;
                    background-color: rgba(71, 71, 71, 0.6);
                    border: 1px solid rgb(140, 140, 150);
                }

                ::-webkit-scrollbar-track {
                    box-shadow: transparent;
                }

                .emptyTitle{
                    position: absolute;
                    top: 40%;
                    transform: translateY(-50%);
                    left: 50%;
                    transform: translateX(-50%);
                }

                .accordion-flush{
                    height: 100%;
                    transition: 0.5s;
                    white-space: nowrap;
                    z-index: 0;
                    .accordion-button {
                    word-spacing: 2em;
                    position: relative;
                    z-index: 0;

                    i {
                        font-size: 8px;
                        margin-bottom: 6px;
                        margin-right: 8px;
                    }

                    &:hover {
                        background-color: rgb(105, 152, 171);
                        color: white;
                    }

                    .hasntApproved{
                        word-spacing: 0.1vw;
                        position: absolute;
                        right: 10%;
                        top: 50%;
                        transform: translateY(-50%);
                        font-weight: 600;
                        color: rgb(199, 32, 32);
                    }
                    .hasApproved{
                        position: absolute;
                        right: 10%;
                        top: 50%;
                        transform: translateY(-50%);
                        font-weight: 600;
                        color: rgb(71, 106, 167);
                    }
                    .approvedStrFrame{
                        position: absolute;
                        right: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 0.5vw;
                        height: 100%;
                        z-index: -1;
                    }

                }

                .accordion-body {
                    position: relative;

                    .notEnough{
                        font-weight: 600;
                        color: rgb(199, 32, 32);
                    }
                    .hasntApproved{
                        font-weight: 600;
                        color: rgb(199, 32, 32);
                    }
                    .viewBtn {
                        position: absolute;
                        background-color: rgb(39, 46, 67);
                        border: 1px solid #000;
                        color: white;
                        border-radius: 1vh;
                        width: 5vw;
                        height: 3.5vh;
                        bottom: 5%;
                        right: 1%;
                        font-size: 2vh;
                        transition: 0.4s;

                        &:hover {
                            background-color: rgb(75, 75, 101);
                        }

                        &:active {
                            transform: scale(0.95);
                        }
                    }
                }
                    
                }
            }

            .back {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                bottom: 2%;
                left: 1%;
                background-color: rgb(39, 46, 67);
                border: 1px solid #000;
                color: white;
                border-radius: 0.5vh;
                width: max-content;
                height: 3vh;
                font-size: 2vh;
                padding: 1vh 1vw;
                transition: 0.4s;

                &:hover {
                    background-color: rgb(75, 75, 101);
                }

                &:active {
                    transform: scale(0.95);
                }
            }
        }


    }


}
</style>