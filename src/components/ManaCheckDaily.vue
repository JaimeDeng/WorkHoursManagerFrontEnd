<script>
import { RouterLink, RouterView } from 'vue-router'
import checkPopup from './checkPopup.vue'
export default {
components: {
    RouterLink,
    checkPopup
},
    data() {
        return {
            //checkPopup的props變數
            showCheckPopup: false,
            checkPopupData: {
                title: "Popup Title",
                content: "Popup Content",
                backBtn: 'back',
                confirmBtn: 'confirm'
            },
            //帳戶資料
            employeeId: '',
            accountId: '',
            employeeName: '',
            //工時表資料
            today: '',
            workDayInfo: [],
            workHoursInfoData: [],
            selectedDateInfoList: [],
            subordinateSelected: "",
            subordinates: [],
            subordinateName: "",
            queryDate: "",
            showWorkHoursInfo: false,
            showApproveBtn: false,
            workDayInfoList: [],
            hasAnyWorkDayInfo: false,
            hasntThisDateInfo: false,
            hasntThisTimeFrameInfo: false,
            hasntThisReviewStatusInfo: false,
            listRenderOver: false,
            message: '',
            //介面文字
            searchDate: '',
            langValue: 'ch',
            title: '',
            search: '',
            reviewStatus: '',
            reviewStatusPH: '',
            reviewStatusOpt1: '',
            reviewStatusOpt2: '',
            timeFrame: '',
            timeFramePH: '',
            timeFrameOpt1: '',
            timeFrameOpt2: '',
            timeFrameOpt3: '',
            backBtn: '',
            //輸入綁定
            reviewStatusSelect: 'default',
            timeFrameSelect: 'default',
            subordinateSelect: 'default',
            //元件動畫
            isAnimating: false
        }
    },
    methods: {
        changeLanguage() {
            if (this.langValue === 'ch') {
                this.title = '日工時表審核一覽';
                this.search = '以日期搜尋';
                this.reviewStatus = '審核狀態';
                this.reviewStatusPH = '選擇審核狀態';
                this.reviewStatusOpt1 = '已審核';
                this.reviewStatusOpt2 = '未審核';
                this.timeFrame = '時間範圍';
                this.timeFramePH = '請選擇時間範圍';
                this.timeFrameOpt1 = '7日';
                this.timeFrameOpt2 = '14日';
                this.timeFrameOpt3 = '30日';
                this.backBtn = '返回首頁';
                this.checkPopupData.backBtn = '返回';
                this.checkPopupData.confirmBtn = '確認';
            } else if (this.langValue === 'en') {
                this.title = 'Timesheet List';
                this.search = 'Search by date';
                this.reviewStatus = 'Approval status';
                this.reviewStatusPH = 'Select approval status';
                this.reviewStatusOpt1 = 'Approved';
                this.reviewStatusOpt2 = 'Pending approval';
                this.timeFrame = 'Time frame';
                this.timeFramePH = 'Select time frame';
                this.timeFrameOpt1 = '7days';
                this.timeFrameOpt2 = '14days';
                this.timeFrameOpt3 = '30days';
                this.backBtn = 'Back to homepage';
                this.checkPopupData.backBtn = 'Back';
                this.checkPopupData.confirmBtn = 'Confirm';
            } else if (this.langValue === 'jp') {
                this.title = '工時表一覽';
                this.search = '以日期搜尋';
                this.reviewStatus = '審核狀態';
                this.reviewStatusPH = '選擇審核狀態';
                this.reviewStatusOpt1 = '已審核';
                this.reviewStatusOpt2 = '未審核';
                this.timeFrame = '時間範圍';
                this.timeFramePH = '請選擇時間範圍';
                this.timeFrameOpt1 = '7日';
                this.timeFrameOpt2 = '14日';
                this.timeFrameOpt3 = '30日';
                this.backBtn = '返回首頁';
                this.checkPopupData.backBtn = '返回';
                this.checkPopupData.confirmBtn  = '確認';
            }
        },
        fetchWorkDayInfo() {

            fetch("http://localhost:3000/getWorkDayInfoBySupervisorId", {
            method: "put",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({supervisorId : this.employeeId})
            }).then(res => res.json())
            .then((data) => {
                console.log(data);
                let subordinatesWorkDayInfoList = data.subordinatesWorkDayInfoList;
                let container = null;
                    for (let i = subordinatesWorkDayInfoList.length - 1; i > 0; i--) {
                        for (let i = 0; i < subordinatesWorkDayInfoList.length - 1; i++) {
                            const nextDateStr = subordinatesWorkDayInfoList[i + 1].date;
                            const [nextDateYear, nextDateMonth, nextDateDay] = nextDateStr.split('-');
                            const nextDate = new Date(nextDateYear, nextDateMonth - 1, nextDateDay);
                            const thisDateStr = subordinatesWorkDayInfoList[i].date;
                            const [thisDateStrYear, thisDateStrMonth, thisDateStrDay] = thisDateStr.split('-');
                            const thisDate = new Date(thisDateStrYear, thisDateStrMonth - 1, thisDateStrDay);
                            if (nextDate > thisDate) {
                                container = subordinatesWorkDayInfoList[i + 1];
                                subordinatesWorkDayInfoList[i + 1] = subordinatesWorkDayInfoList[i];
                                subordinatesWorkDayInfoList[i] = container;
                            }
                        }
                    }
                    this.workDayInfo = subordinatesWorkDayInfoList;

                    //建構下屬名單
                    this.workDayInfo.forEach((workDayInfo)=>{
                        let subordinateId = workDayInfo.employeeId;
                        let subordinateName;
                        this.getSubordinateInfo(subordinateId).then((res)=>{
                            subordinateName = res;
                            let subordinateInfo = subordinateId + " " + subordinateName;
                            if(!this.subordinates.includes(subordinateInfo)){
                                this.subordinates.push(subordinateInfo);
                            }
                            console.log(this.subordinates);
                        });
                    })

                    console.log(this.workDayInfo);
                    if (this.workDayInfo.length !== 0) {
                        this.hasAnyWorkDayInfo = true;
                        this.renderList();
                    }
                    if(this.hasAnyWorkDayInfo === false){
                        this.listRenderOver = true;
                    }
                    if (data.success === true) {
                        this.message = data.message;
                    } else {
                        this.message = data.message;
                    }

                    this.listRenderOver = true;
            })
        },
        renderList() {
            this.workDayInfoList = [];
            this.hasntThisTimeFrameInfo = false;
            this.hasntThisReviewStatusInfo = false;
            this.workDayInfo.forEach((workDayInfo) => {
                let approvedStr = "";
                if (workDayInfo.approved === true) {
                    approvedStr = "已審核";
                } else {
                    approvedStr = "未審核";
                }
                let workingHoursIsNotEnough = false;
                if (workDayInfo.workingHours < 8) {
                    workingHoursIsNotEnough = true;
                }
                let dateAndEmployeeIdAndApprove = JSON.stringify({
                        date : workDayInfo.date,
                        employeeId :　workDayInfo.employeeId,
                        approved : workDayInfo.approved
                    });
                this.workDayInfoList.push({
                    workInfoId: workDayInfo.workInfoId,
                    date: workDayInfo.date,
                    employeeId: workDayInfo.employeeId,
                    workingHours: workDayInfo.workingHours,
                    status: workDayInfo.status,
                    approved: workDayInfo.approved,
                    approvedStr: approvedStr,
                    workingHoursIsNotEnough: workingHoursIsNotEnough,
                    dateAndEmployeeIdAndApprove: dateAndEmployeeIdAndApprove
                })
                console.log(workDayInfo.date)
            })
            this.listRenderOver = true;
        },
        async getSubordinateInfo(subordinateId) {
        const response = await fetch("http://localhost:3000/getEmployeeInfoById", {
            method: "put",
            headers: {
            'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({ employeeId: subordinateId })
        });
        
            const data = await response.json();
            return data.name;
        },
        renderListBySubordinate(selectedSubornidate){
            this.workDayInfoList = [];
            if(selectedSubornidate === "default"){
                this.renderList();
            }else{
                let subordinateInfoArr = selectedSubornidate.split(" ");
                let subordinateId = subordinateInfoArr[0];
                this.workDayInfo.forEach((workDayInfo) => {
                    if(workDayInfo.employeeId === subordinateId){
                        let approvedStr = "";
                        if (workDayInfo.approved === true) {
                            approvedStr = "已審核";
                        } else {
                            approvedStr = "未審核";
                        }
                        let workingHoursIsNotEnough = false;
                        if (workDayInfo.workingHours < 8) {
                            workingHoursIsNotEnough = true;
                        }
                        let dateAndEmployeeIdAndApprove = JSON.stringify({
                                date : workDayInfo.date,
                                employeeId : workDayInfo.employeeId,
                                approved : workDayInfo.approved
                            });
                        this.workDayInfoList.push({
                            workInfoId: workDayInfo.workInfoId,
                            date: workDayInfo.date,
                            employeeId: workDayInfo.employeeId,
                            workingHours: workDayInfo.workingHours,
                            status: workDayInfo.status,
                            approved: workDayInfo.approved,
                            approvedStr: approvedStr,
                            workingHoursIsNotEnough: workingHoursIsNotEnough,
                            dateAndEmployeeIdAndApprove: dateAndEmployeeIdAndApprove
                        })
                    }
                })
            }
        },
        renderListLimitedApproved() {
            this.workDayInfoList = [];
            let hasThisReviewStatusInfo = false;
            //混合天數範圍查詢
            if (this.timeFrameSelect === "default") {
                this.workDayInfo.forEach((workDayInfo) => {
                    if (workDayInfo.approved === true) {
                        let approvedStr = "已審核";
                        let workingHoursIsNotEnough = false;
                        if (workDayInfo.workingHours < 8) {
                            workingHoursIsNotEnough = true;
                        }
                        this.workDayInfoList.push({
                            workInfoId: workDayInfo.workInfoId,
                            date: workDayInfo.date,
                            employeeId: workDayInfo.employeeId,
                            workingHours: workDayInfo.workingHours,
                            status: workDayInfo.status,
                            approved: workDayInfo.approved,
                            approvedStr: approvedStr,
                            workingHoursIsNotEnough: workingHoursIsNotEnough
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
            if (this.timeFrameSelect === "7days") {
                this.workDayInfo.forEach((workDayInfo) => {
                    let workDay = new Date(workDayInfo.date);
                    let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                    let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    if (dayDiff <= 7 && workDayInfo.approved === true) {
                        let approvedStr = "已審核";
                        let workingHoursIsNotEnough = false;
                        if (workDayInfo.workingHours < 8) {
                            workingHoursIsNotEnough = true;
                        }
                        this.workDayInfoList.push({
                            workInfoId: workDayInfo.workInfoId,
                            date: workDayInfo.date,
                            employeeId: workDayInfo.employeeId,
                            workingHours: workDayInfo.workingHours,
                            status: workDayInfo.status,
                            approved: workDayInfo.approved,
                            approvedStr: approvedStr,
                            workingHoursIsNotEnough: workingHoursIsNotEnough
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
            if (this.timeFrameSelect === "14days") {
                this.workDayInfo.forEach((workDayInfo) => {
                    let workDay = new Date(workDayInfo.date);
                    let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                    let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    if (dayDiff <= 14 && workDayInfo.approved === true) {
                        let approvedStr = "已審核";
                        let workingHoursIsNotEnough = false;
                        if (workDayInfo.workingHours < 8) {
                            workingHoursIsNotEnough = true;
                        }
                        this.workDayInfoList.push({
                            workInfoId: workDayInfo.workInfoId,
                            date: workDayInfo.date,
                            employeeId: workDayInfo.employeeId,
                            workingHours: workDayInfo.workingHours,
                            status: workDayInfo.status,
                            approved: workDayInfo.approved,
                            approvedStr: approvedStr,
                            workingHoursIsNotEnough: workingHoursIsNotEnough
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
            if (this.timeFrameSelect === "30days") {
                this.workDayInfo.forEach((workDayInfo) => {
                    let workDay = new Date(workDayInfo.date);
                    let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                    let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    if (dayDiff <= 30 && workDayInfo.approved === true) {
                        let approvedStr = "已審核";
                        let workingHoursIsNotEnough = false;
                        if (workDayInfo.workingHours < 8) {
                            workingHoursIsNotEnough = true;
                        }
                        this.workDayInfoList.push({
                            workInfoId: workDayInfo.workInfoId,
                            date: workDayInfo.date,
                            employeeId: workDayInfo.employeeId,
                            workingHours: workDayInfo.workingHours,
                            status: workDayInfo.status,
                            approved: workDayInfo.approved,
                            approvedStr: approvedStr,
                            workingHoursIsNotEnough: workingHoursIsNotEnough
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
        renderListLimitedNotApproved() {
            this.workDayInfoList = [];
            let hasThisReviewStatusInfo = false;
            //混合天數範圍查詢
            if (this.timeFrameSelect === "default") {
                this.workDayInfo.forEach((workDayInfo) => {
                    if (workDayInfo.approved === false) {
                        let approvedStr = "未審核";
                        let workingHoursIsNotEnough = false;
                        if (workDayInfo.workingHours < 8) {
                            workingHoursIsNotEnough = true;
                        }
                        this.workDayInfoList.push({
                            workInfoId: workDayInfo.workInfoId,
                            date: workDayInfo.date,
                            employeeId: workDayInfo.employeeId,
                            workingHours: workDayInfo.workingHours,
                            status: workDayInfo.status,
                            approved: workDayInfo.approved,
                            approvedStr: approvedStr,
                            workingHoursIsNotEnough: workingHoursIsNotEnough
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
            if (this.timeFrameSelect === "7days") {
                this.workDayInfo.forEach((workDayInfo) => {
                    let workDay = new Date(workDayInfo.date);
                    let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                    let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    if (dayDiff <= 7 && workDayInfo.approved === false) {
                        let approvedStr = "未審核";
                        let workingHoursIsNotEnough = false;
                        if (workDayInfo.workingHours < 8) {
                            workingHoursIsNotEnough = true;
                        }
                        this.workDayInfoList.push({
                            workInfoId: workDayInfo.workInfoId,
                            date: workDayInfo.date,
                            employeeId: workDayInfo.employeeId,
                            workingHours: workDayInfo.workingHours,
                            status: workDayInfo.status,
                            approved: workDayInfo.approved,
                            approvedStr: approvedStr,
                            workingHoursIsNotEnough: workingHoursIsNotEnough
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
            if (this.timeFrameSelect === "14days") {
                this.workDayInfo.forEach((workDayInfo) => {
                    let workDay = new Date(workDayInfo.date);
                    let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                    let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    if (dayDiff <= 14 && workDayInfo.approved === false) {
                        let approvedStr = "未審核";
                        let workingHoursIsNotEnough = false;
                        if (workDayInfo.workingHours < 8) {
                            workingHoursIsNotEnough = true;
                        }
                        this.workDayInfoList.push({
                            workInfoId: workDayInfo.workInfoId,
                            date: workDayInfo.date,
                            employeeId: workDayInfo.employeeId,
                            workingHours: workDayInfo.workingHours,
                            status: workDayInfo.status,
                            approved: workDayInfo.approved,
                            approvedStr: approvedStr,
                            workingHoursIsNotEnough: workingHoursIsNotEnough
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
            if (this.timeFrameSelect === "30days") {
                this.workDayInfo.forEach((workDayInfo) => {
                    let workDay = new Date(workDayInfo.date);
                    let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                    let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    if (dayDiff <= 30 && workDayInfo.approved === false) {
                        let approvedStr = "未審核";
                        let workingHoursIsNotEnough = false;
                        if (workDayInfo.workingHours < 8) {
                            workingHoursIsNotEnough = true;
                        }
                        this.workDayInfoList.push({
                            workInfoId: workDayInfo.workInfoId,
                            date: workDayInfo.date,
                            employeeId: workDayInfo.employeeId,
                            workingHours: workDayInfo.workingHours,
                            status: workDayInfo.status,
                            approved: workDayInfo.approved,
                            approvedStr: approvedStr,
                            workingHoursIsNotEnough: workingHoursIsNotEnough
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
        renderListByDate(date) {
            this.workDayInfoList = [];
            let hasThisDateInfo = false;
            this.workDayInfo.forEach((workDayInfo) => {
                if (workDayInfo.date === date) {
                    let approvedStr = "";
                    if (workDayInfo.approved === true) {
                        approvedStr = "已審核";
                    } else {
                        approvedStr = "未審核";
                    }
                    let workingHoursIsNotEnough = false;
                    if (workDayInfo.workingHours < 8) {
                        workingHoursIsNotEnough = true;
                    }
                    this.workDayInfoList.push({
                        workInfoId: workDayInfo.workInfoId,
                        date: workDayInfo.date,
                        employeeId: workDayInfo.employeeId,
                        workingHours: workDayInfo.workingHours,
                        status: workDayInfo.status,
                        approved: workDayInfo.approved,
                        approvedStr: approvedStr,
                        workingHoursIsNotEnough: workingHoursIsNotEnough
                    })
                    hasThisDateInfo = true;
                }
            })
            if (hasThisDateInfo === false) {
                this.hasntThisDateInfo = true;
            } else {
                this.hasntThisDateInfo = false;
            }
        },
        renderListWhitin7Days() {
            this.workDayInfoList = [];
            let hasThisTimeFrameInfo = false;
            //混合審核狀態判斷
            if (this.reviewStatusSelect === 'default') {
                this.workDayInfo.forEach((workDayInfo) => {
                    let workDay = new Date(workDayInfo.date);
                    let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                    let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    if (dayDiff <= 7) {
                        let approvedStr = "";
                        if (workDayInfo.approved === true) {
                            approvedStr = "已審核";
                        } else {
                            approvedStr = "未審核";
                        }
                        let workingHoursIsNotEnough = false;
                        if (workDayInfo.workingHours < 8) {
                            workingHoursIsNotEnough = true;
                        }
                        this.workDayInfoList.push({
                            workInfoId: workDayInfo.workInfoId,
                            date: workDayInfo.date,
                            employeeId: workDayInfo.employeeId,
                            workingHours: workDayInfo.workingHours,
                            status: workDayInfo.status,
                            approved: workDayInfo.approved,
                            approvedStr: approvedStr,
                            workingHoursIsNotEnough: workingHoursIsNotEnough
                        })
                        hasThisTimeFrameInfo = true;
                    }
                })
            }
            if (this.reviewStatusSelect === 'true') {
                this.workDayInfo.forEach((workDayInfo) => {
                    let workDay = new Date(workDayInfo.date);
                    let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                    let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    //7天內且已審核
                    if (dayDiff <= 7 && workDayInfo.approved === true) {
                        let approvedStr = "已審核";

                        let workingHoursIsNotEnough = false;
                        if (workDayInfo.workingHours < 8) {
                            workingHoursIsNotEnough = true;
                        }
                        this.workDayInfoList.push({
                            workInfoId: workDayInfo.workInfoId,
                            date: workDayInfo.date,
                            employeeId: workDayInfo.employeeId,
                            workingHours: workDayInfo.workingHours,
                            status: workDayInfo.status,
                            approved: workDayInfo.approved,
                            approvedStr: approvedStr,
                            workingHoursIsNotEnough: workingHoursIsNotEnough
                        })
                        hasThisTimeFrameInfo = true;
                    }
                })
            }
            if (this.reviewStatusSelect === 'false') {
                this.workDayInfo.forEach((workDayInfo) => {
                    let workDay = new Date(workDayInfo.date);
                    let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                    let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    //7天內且未審核
                    if (dayDiff <= 7 && workDayInfo.approved === false) {
                        let approvedStr = "未審核";
                        let workingHoursIsNotEnough = false;
                        if (workDayInfo.workingHours < 8) {
                            workingHoursIsNotEnough = true;
                        }
                        this.workDayInfoList.push({
                            workInfoId: workDayInfo.workInfoId,
                            date: workDayInfo.date,
                            employeeId: workDayInfo.employeeId,
                            workingHours: workDayInfo.workingHours,
                            status: workDayInfo.status,
                            approved: workDayInfo.approved,
                            approvedStr: approvedStr,
                            workingHoursIsNotEnough: workingHoursIsNotEnough
                        })
                        hasThisTimeFrameInfo = true;
                    }
                })
            }
            if (hasThisTimeFrameInfo === false) {
                this.hasntThisTimeFrameInfo = true;
            } else {
                this.hasntThisTimeFrameInfo = false;
            }
        },
        renderListWhitin14Days() {
            this.workDayInfoList = [];
            let hasThisTimeFrameInfo = false;
            //混合審核狀態判斷
            if (this.reviewStatusSelect === 'default') {
                this.workDayInfo.forEach((workDayInfo) => {
                    let workDay = new Date(workDayInfo.date);
                    let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                    let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    if (dayDiff <= 14) {
                        let approvedStr = "";
                        if (workDayInfo.approved === true) {
                            approvedStr = "已審核";
                        } else {
                            approvedStr = "未審核";
                        }
                        let workingHoursIsNotEnough = false;
                        if (workDayInfo.workingHours < 8) {
                            workingHoursIsNotEnough = true;
                        }
                        this.workDayInfoList.push({
                            workInfoId: workDayInfo.workInfoId,
                            date: workDayInfo.date,
                            employeeId: workDayInfo.employeeId,
                            workingHours: workDayInfo.workingHours,
                            status: workDayInfo.status,
                            approved: workDayInfo.approved,
                            approvedStr: approvedStr,
                            workingHoursIsNotEnough: workingHoursIsNotEnough
                        })
                        hasThisTimeFrameInfo = true;
                    }
                })
            }
            if (this.reviewStatusSelect === 'true') {
                this.workDayInfo.forEach((workDayInfo) => {
                    let workDay = new Date(workDayInfo.date);
                    let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                    let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    //7天內且已審核
                    if (dayDiff <= 14 && workDayInfo.approved === true) {
                        let approvedStr = "已審核";

                        let workingHoursIsNotEnough = false;
                        if (workDayInfo.workingHours < 8) {
                            workingHoursIsNotEnough = true;
                        }
                        this.workDayInfoList.push({
                            workInfoId: workDayInfo.workInfoId,
                            date: workDayInfo.date,
                            employeeId: workDayInfo.employeeId,
                            workingHours: workDayInfo.workingHours,
                            status: workDayInfo.status,
                            approved: workDayInfo.approved,
                            approvedStr: approvedStr,
                            workingHoursIsNotEnough: workingHoursIsNotEnough
                        })
                        hasThisTimeFrameInfo = true;
                    }
                })
            }
            if (this.reviewStatusSelect === 'false') {
                this.workDayInfo.forEach((workDayInfo) => {
                    let workDay = new Date(workDayInfo.date);
                    let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                    let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    //7天內且未審核
                    if (dayDiff <= 14 && workDayInfo.approved === false) {
                        let approvedStr = "未審核";
                        let workingHoursIsNotEnough = false;
                        if (workDayInfo.workingHours < 8) {
                            workingHoursIsNotEnough = true;
                        }
                        this.workDayInfoList.push({
                            workInfoId: workDayInfo.workInfoId,
                            date: workDayInfo.date,
                            employeeId: workDayInfo.employeeId,
                            workingHours: workDayInfo.workingHours,
                            status: workDayInfo.status,
                            approved: workDayInfo.approved,
                            approvedStr: approvedStr,
                            workingHoursIsNotEnough: workingHoursIsNotEnough
                        })
                        hasThisTimeFrameInfo = true;
                    }
                })
            }
            if (hasThisTimeFrameInfo === false) {
                this.hasntThisTimeFrameInfo = true;
            } else {
                this.hasntThisTimeFrameInfo = false;
            }
        },
        renderListWhitin30Days() {
            this.workDayInfoList = [];
            let hasThisTimeFrameInfo = false;
            //混合審核狀態判斷
            if (this.reviewStatusSelect === 'default') {
                this.workDayInfo.forEach((workDayInfo) => {
                    let workDay = new Date(workDayInfo.date);
                    let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                    let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    if (dayDiff <= 30) {
                        let approvedStr = "";
                        if (workDayInfo.approved === true) {
                            approvedStr = "已審核";
                        } else {
                            approvedStr = "未審核";
                        }
                        let workingHoursIsNotEnough = false;
                        if (workDayInfo.workingHours < 8) {
                            workingHoursIsNotEnough = true;
                        }
                        this.workDayInfoList.push({
                            workInfoId: workDayInfo.workInfoId,
                            date: workDayInfo.date,
                            employeeId: workDayInfo.employeeId,
                            workingHours: workDayInfo.workingHours,
                            status: workDayInfo.status,
                            approved: workDayInfo.approved,
                            approvedStr: approvedStr,
                            workingHoursIsNotEnough: workingHoursIsNotEnough
                        })
                        hasThisTimeFrameInfo = true;
                    }
                })
            }
            if (this.reviewStatusSelect === 'true') {
                this.workDayInfo.forEach((workDayInfo) => {
                    let workDay = new Date(workDayInfo.date);
                    let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                    let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    //30天內且已審核
                    if (dayDiff <= 30 && workDayInfo.approved === true) {
                        let approvedStr = "已審核";

                        let workingHoursIsNotEnough = false;
                        if (workDayInfo.workingHours < 8) {
                            workingHoursIsNotEnough = true;
                        }
                        this.workDayInfoList.push({
                            workInfoId: workDayInfo.workInfoId,
                            date: workDayInfo.date,
                            employeeId: workDayInfo.employeeId,
                            workingHours: workDayInfo.workingHours,
                            status: workDayInfo.status,
                            approved: workDayInfo.approved,
                            approvedStr: approvedStr,
                            workingHoursIsNotEnough: workingHoursIsNotEnough
                        })
                        hasThisTimeFrameInfo = true;
                    }
                })
            }
            if (this.reviewStatusSelect === 'false') {
                this.workDayInfo.forEach((workDayInfo) => {
                    let workDay = new Date(workDayInfo.date);
                    let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                    let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    //30天內且未審核
                    if (dayDiff <= 30 && workDayInfo.approved === false) {
                        let approvedStr = "未審核";
                        let workingHoursIsNotEnough = false;
                        if (workDayInfo.workingHours < 8) {
                            workingHoursIsNotEnough = true;
                        }
                        this.workDayInfoList.push({
                            workInfoId: workDayInfo.workInfoId,
                            date: workDayInfo.date,
                            employeeId: workDayInfo.employeeId,
                            workingHours: workDayInfo.workingHours,
                            status: workDayInfo.status,
                            approved: workDayInfo.approved,
                            approvedStr: approvedStr,
                            workingHoursIsNotEnough: workingHoursIsNotEnough
                        })
                        hasThisTimeFrameInfo = true;
                    }
                })
            }
            if (hasThisTimeFrameInfo === false) {
                this.hasntThisTimeFrameInfo = true;
            } else {
                this.hasntThisTimeFrameInfo = false;
            }
        },
        workHoursInfo(event) {
            let dateAndEmployeeIdAndApprove = JSON.parse(event.target.value);
            if(dateAndEmployeeIdAndApprove.approved === false){
                this.showApproveBtn = true;
            }else{
                this.showApproveBtn = false;
            }
            console.log(dateAndEmployeeIdAndApprove);
            let reqBody = {
                employeeId: dateAndEmployeeIdAndApprove.employeeId
            }

            fetch("http://localhost:3000/getWorkHoursInfoByEmployeeId", {
                method: "put",
                body: JSON.stringify(reqBody),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(res => res.json())
                .then((data) => {
                    //將工時表以時間最早的開始排序 (原本順序是先輸入的越前面)
                    let container = null;
                    for (let i = data.workHoursInfoList.length - 1; i > 0; i--) {
                        for (let i = 0; i < data.workHoursInfoList.length - 1; i++) {
                            const nextTimeString = data.workHoursInfoList[i + 1].startTime;
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
                            if (nextTimeHours === thisTimeHours) {
                                if (nextTimeMinutes < thisTimeMinutes) {
                                    container = data.workHoursInfoList[i + 1];
                                    data.workHoursInfoList[i + 1] = data.workHoursInfoList[i];
                                    data.workHoursInfoList[i] = container;
                                }
                            } else if (nextTimeHours < thisTimeHours) {
                                container = data.workHoursInfoList[i + 1];
                                data.workHoursInfoList[i + 1] = data.workHoursInfoList[i];
                                data.workHoursInfoList[i] = container;
                            }
                        }
                    }
                    this.workHoursInfoData = data;
                    console.log(this.workHoursInfoData);
                    this.showWorkHoursInfo = true;
                    setTimeout(() => {
                        this.queryDate = dateAndEmployeeIdAndApprove.date;
                        let workHoursInfoFrame = document.getElementById("workHoursInfoFrame");
                        let deco1 = document.getElementById("deco1");
                        let deco2 = document.getElementById("deco2");
                        workHoursInfoFrame.style.left = "50%";
                        workHoursInfoFrame.style.transform = "translateX(-50%)";
                        deco1.style.left = "110%";
                        deco2.style.left = "150%";
                    }, 100);
                    this.workHoursInfoByDate(dateAndEmployeeIdAndApprove.date);
                    if (data.success === true) {
                        this.message = data.message;
                    } else {
                        this.message = data.message;
                    }
                })
                .catch(err => console.log(err))

            console.log(event.target.value);
            let sheet = document.getElementById("sheet");
            sheet.style.overflow = "hidden";
            sheet.style.marginLeft = "200%";
        },
        workHoursInfoByDate(targetValue) {
            this.selectedDateInfoList = [];
            this.workHoursInfoData.workHoursInfoList.forEach((workHoursInfo) => {
                if (workHoursInfo.date === targetValue) {
                    this.selectedDateInfoList.push(workHoursInfo);
                }
            })
            console.log(this.selectedDateInfoList);
        },
        backToWorkDayInfo() {
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
            setTimeout(() => {
                this.showWorkHoursInfo = false;
            }, 300)
        },
        approve() {
            this.showCheckPopup = true;
            if (this.langValue === 'ch') {
            this.checkPopupData.title = "確認";
            } else if (this.langValue === 'en') {
                this.checkPopupData.title = "確認";
            } else if (this.langValue === 'jp') {
                this.checkPopupData.title = "Confirm";
            }
            this.checkPopupData.content = "確定審核該日工時表嗎?";
            this.showCheckPopup = true;
            setTimeout(() => {
                let checkPopup = this.$refs.checkPopup;
                console.log(checkPopup);
                let checkPopupEl = checkPopup.$el;
                let checkPopupIcon = checkPopupEl.querySelector("i");
                console.log(checkPopupIcon);
                let iconStr1 = "fa-solid";
                let iconStr2 = "fa-triangle-exclamation";
                checkPopupIcon.classList.add(iconStr1);
                checkPopupIcon.classList.add(iconStr2);
                checkPopupIcon.style.color = "#eedd20";
                console.log(checkPopupIcon);
                checkPopup.$el.style.opacity = "1";
                checkPopup.$el.style.bottom = "0%";
            }, 100);
        },
        closeCheckPopup() {
            this.showCheckPopup = false;
        },
        confirmApprove() {
            
        },
        startAnimation() {
            setInterval(() => {
                this.isAnimating = !this.isAnimating;
            }, 500); //每隔0.5秒執行一次
        }
    },
    watch: {
        //監看searchDate的值變化 , date則是回遞該變數值
        searchDate(date) {
            console.log(date);
            if (date === '') {
                this.renderList();
            } else {
                this.renderListByDate(date);
            }
        },
        reviewStatusSelect(newValue) {
            console.log(newValue);
            if (newValue === 'default') {
                this.renderList();
            }
            if (newValue === 'true') {
                this.renderListLimitedApproved();
            }
            if (newValue === 'false') {
                this.renderListLimitedNotApproved();
            }
        },
        timeFrameSelect(newValue) {
            console.log(newValue);
            if (newValue === 'default') {
                this.renderList();
            }
            if (newValue === '7days') {
                this.renderListWhitin7Days();
            }
            if (newValue === '14days') {
                this.renderListWhitin14Days();
            }
            if (newValue === '30days') {
                this.renderListWhitin30Days();
            }
        },
        subordinateSelect(newValue) {
            console.log(newValue);
            this.renderListBySubordinate(newValue);
        }
    },
    created() {
        //獲取帳號資訊
        this.employeeId = sessionStorage.getItem('employeeId');
        if (this.employeeId === null) {
            this.employeeId = localStorage.getItem('employeeId');
        }
        this.accountId = sessionStorage.getItem('accountId');
        if (this.accountId === null) {
            this.accountId = localStorage.getItem('accountId');
        }
        this.employeeName = sessionStorage.getItem('employeeName');
        if (this.employeeName === null) {
            this.employeeName = localStorage.getItem('employeeName');
        }

        //獲取工時表資訊
        this.fetchWorkDayInfo();
        console.log(this.workDayInfoList);
    },
    mounted() {

        //檢查及切換語言
        this.langValue = sessionStorage.getItem('langValue');
        if (this.langValue === null) {
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

        <!--子元件要使用v-model綁定props變數 , 綁定命名的部分使用橫槓命名規則-->
        <checkPopup ref="checkPopup" class="checkPopup" :checkPopup-data="checkPopupData" :show-checkPopup="showCheckPopup" 
        @close="closeCheckPopup" @confirm="confirmApprove"></checkPopup>
        <div v-if="showCheckPopup" ref="mask" class="mask"></div>

        <div class="check">

            <!-- 左側範圍 -->
            <div v-if="listRenderOver" class="left">
                <div class="title_search">
                    <h4 class="fw-bold title">{{ title }}</h4>

                    <div class="searchFrame">
                        <label for="serch">{{ search }}</label>
                        <div class="dateFrame">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <input @input="searchByDate" v-model="searchDate" id="serch" type="date">
                        </div>
                    </div>

                    <div class="sel">
                        <div class="ap">
                            <!-- 審核狀態 -->
                            <label for="approvedStatusSelect">{{ reviewStatus }}</label>
                            <select v-model="reviewStatusSelect" id="approvedStatusSelect">
                                <option value="default" selected>{{ reviewStatusPH }}</option>
                                <option value="true">{{ reviewStatusOpt1 }}</option>
                                <option value="false">{{ reviewStatusOpt2 }}</option>
                            </select>
                        </div>
                        <!-- 篩選:下屬名單 -->
                        <div class="dpm">
                            <label for="subordinateSelect">人員</label>
                            <select v-model="subordinateSelect" id="subordinateSelect">
                                <option value="default" selected>請選擇人員</option>
                                <option v-for="(subordinate , index) in subordinates" :value="subordinate" :key="index">{{ subordinate }}</option>
                            </select>
                        </div>
                        <div class="tim">
                            <!-- 時間範圍 -->
                            <label for="timeFrameSelect">{{ timeFrame }}</label>
                            <select v-model="timeFrameSelect" for="timeFrameSelect">
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
                        <h4 class="fw-bold dateTitle">{{ queryDate }}工時表一覽</h4>
                        <div class="cardFrame" id="cardFrame" v-dragscroll.x>
                            <div class="workHoursInfoCard" v-for="(workHoursInfo, index) in selectedDateInfoList">
                                <h4 class="infoNum">表單共有 {{ selectedDateInfoList.length }} 張</h4>
                                <h4 class="fw-bold"
                                    :style="{ color: workHoursInfo.status === '出勤' ? 'rgb(40, 147, 56)' : 'rgb(59, 115, 168)' }">
                                    {{ workHoursInfo.status }}</h4>
                                <p style="color: #1a4e78">開始時間: {{ workHoursInfo.startTime }}</p>
                                <i class="fa-solid fa-arrow-down" style="color: #24445c;"></i>
                                <p style="color: #1a4e78">結束時間: {{ workHoursInfo.endTime }}</p>
                                <p>機型: {{ workHoursInfo.model }}</p>
                                <p>案件號碼: {{ workHoursInfo.caseNo }}</p>
                                <div class="detailTextFrame">
                                    <h5>工作內容</h5>
                                    <p>{{ workHoursInfo.detail }}</p>
                                </div>
                            </div>
                            <div v-if="selectedDateInfoList.length > 1" class="tips"><i
                                    :style="{ transform: isAnimating ? 'rotate(-15deg)' : 'rotate(30deg)' }"
                                    class="fa-solid fa-hand"></i>可拖曳觀看</div>
                        </div>
                    </div>
                    <div class="btnFrame">
                        <button @click="backToWorkDayInfo" class="backToDayList" id="backToDayList">返回日工時表</button>
                        <button v-if="showApproveBtn" @click="approve" class="approve" id="approve">確認審核</button>
                        <button v-if="!showApproveBtn" @click="revokeApprove" class="approve" id="revokeApprove">收回審核</button>
                    </div>
                </div>
                <div class="deco1" id="deco1" v-if="showWorkHoursInfo"></div>
                <div class="deco2" id="deco2" v-if="showWorkHoursInfo"></div>
                <div class="sheet" id="sheet" style="overflow: auto;">
                    <!--手風琴-->
                    <div v-if="hasAnyWorkDayInfo" class="accordion accordion-flush" id="accordionFlushExample"
                        style="overflow: auto;">
                        <!--手風琴格位-->
                        <div v-for="(workDayInfo, index) in workDayInfoList" :value="workDayInfo.workInfoId" :key="index"
                            class="accordion-item">
                            <!--手風琴標題-->
                            <h2 class="accordion-header" id="flush-headingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    :data-bs-target="'#flush-collapse' + index" aria-expanded="false"
                                    aria-controls="flush-collapseOne">
                                    日期:{{ workDayInfo.date }} 員工:{{ workDayInfo.employeeId }}
                                    <p
                                        :class="{ 'hasntApproved': !workDayInfo.approved, 'hasApproved': workDayInfo.approved }">
                                        {{ workDayInfo.approvedStr }}</p>
                                    <div class="approvedStrFrame"
                                        :style="{ backgroundColor: workDayInfo.approved ? 'rgb(95, 130, 154)' : 'rgb(181, 60, 60)' }">
                                    </div>
                                </button>
                            </h2>
                            <!--手風琴內容-->
                            <div :id="'flush-collapse' + index" class="accordion-collapse collapse"
                                aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <!-- 手風琴內容區 -->
                                    <p>員工ID: {{ workDayInfo.employeeId }}</p>
                                    <p :class="{ 'notEnough': workDayInfo.workingHoursIsNotEnough }">登錄時數: {{
                                        workDayInfo.workingHours }}</p>
                                    <p>出勤狀態: {{ workDayInfo.status }}</p>
                                    <p :class="{ 'hasntApproved': !workDayInfo.approved }">審核狀態: {{ workDayInfo.approvedStr
                                    }}</p>
                                    <button @click="workHoursInfo($event)" :value="workDayInfo.dateAndEmployeeIdAndApprove" class="viewBtn"
                                        type="button">查看</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3 v-if="!hasAnyWorkDayInfo" class="emptyTitle">沒有任何日工時表</h3>
                    <h3 v-if="hasntThisDateInfo" class="emptyTitle">沒有該日期的日工時表</h3>
                    <h3 v-if="hasntThisTimeFrameInfo" class="emptyTitle">沒有該天數範圍內的工時表</h3>
                    <h3 v-if="hasntThisReviewStatusInfo" class="emptyTitle">沒有該審核狀態的工時表</h3>
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
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .checkPopup{
        position: absolute;
        bottom: -20%;
        opacity: 0;
        transition-property: bottom;
        transition-duration: 0.3s;
        transition-timing-function: cubic-bezier(0.2,1,0.3,1);
        z-index: 2;
    }

    .check {
        position: relative;
        width: 80%;
        height: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        .text-light {
            font-size: 4rem;
            width: 5rem;
            height: 5rem;
        }

        .left {
            position: relative;
            padding: 1vw;
            background-color: rgba(255, 255, 255, 0.724);
            border: 2px solid rgb(177, 201, 224);
            border-radius: 5px;
            width: 90%;
            height: 75vh;
            overflow: hidden;

            .title_search {
                display: flex;
                justify-content: space-between;
                width: 100%;
                height: 5vh;
                align-items: baseline;

                .title {
                    font-size: 3vh;
                }

                .searchFrame {
                    position: absolute;
                    right: 50%;
                    width: max-content;
                    display: inline-block;
                    margin-right: 8%;

                    label {
                        font-size: 1.5vh;
                        display: inline-block;
                        margin-right: 0.5vw;
                    }

                    .dateFrame {
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

                    .ap {
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

                    .tim {
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

                    .dpm {
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

            .workHoursInfoFrame {
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
                transition-timing-function: cubic-bezier(0.9, 0.7, 0.2, 1);

                .infoFrame {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    height: 90%;
                    width: 100%;
                    border-radius: 10px 10px 0 0;
                    overflow: auto;

                    .dateTitle {
                        font-size: 2.5vh;
                        height: max-content;
                    }

                    .cardFrame {
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

                        .tips {
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
                            opacity: 0;
                            z-index: 1;

                            .fa-hand {
                                transition: 0.3s;
                            }
                        }

                        &:hover>.tips {
                            visibility: visible;
                            opacity: 1;
                        }

                        .workHoursInfoCard {
                            position: relative;
                            display: inline-block;
                            text-align: center;
                            border-radius: 10px;
                            padding: 1% 1%;
                            margin: 0 1%;
                            height: 100%;
                            width: 40vw;
                            background-color: rgba(250, 250, 250, 0.7);
                            overflow: auto;
                            overflow-wrap: break-word;
                            white-space: break-spaces;

                            h4 {
                                font-size: 3vh;
                            }

                            p {
                                margin: auto;
                                font-size: 2vh;
                            }

                            .infoNum {
                                font-size: 2.5vh;
                                position: fixed;
                                top: 2%;
                                right: 2%;
                            }

                            .detailTextFrame {
                                h5 {
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
                        }
                    }
                }

                .btnFrame{
                    margin: 0 auto;
                    margin-top: 1%;
                    height: auto;
                    width: 80%;
                    display: flex;
                    justify-content: space-between;

                    .backToDayList {
                        margin-left: auto;
                        margin-right: auto;
                        padding-left: 1vw;
                        padding-right: 1vw;
                        background: rgb(26, 55, 77);
                        border: 1px solid #000;
                        color: white;
                        border-radius: 5px;
                        width: max-content;
                        height: 3.5vh;
                        bottom: 5%;
                        font-size: 1.5vh;
                        transition: 0.4s;

                        &:hover {
                            background-color: rgb(64, 104, 130);
                        }

                        &:active {
                            scale: 0.95;
                        }
                    }

                    .approve{
                        margin-left: auto;
                        margin-right: auto;
                        padding-left: 1vw;
                        padding-right: 1vw;
                        background: rgb(26, 55, 77);
                        border: 1px solid #000;
                        color: white;
                        border-radius: 5px;
                        width: max-content;
                        height: 3.5vh;
                        bottom: 5%;
                        font-size: 1.5vh;
                        transition: 0.4s;

                        &:hover {
                            background-color: rgb(64, 104, 130);
                        }

                        &:active {
                            scale: 0.95;
                        }
                    }
                    
                }
            }

            .deco1 {
                position: absolute;
                left: -150%;
                transform: skew(-20deg);
                height: 140%;
                width: 30vw;
                background-color: rgb(67, 74, 79);
                transition-property: left;
                transition-duration: 0.2s;
                transition-timing-function: cubic-bezier(0.5, 0.2, 0.2, 0.5);
                z-index: 1;
            }

            .deco2 {
                position: absolute;
                left: -130%;
                transform: skew(-20deg);
                height: 100%;
                width: 30vw;
                background-color: rgb(67, 74, 79);
                transition-property: left;
                transition-duration: 0.6s;
                transition-timing-function: cubic-bezier(0.5, 0.2, 0.2, 0.5);
                z-index: 1;
            }

            .sheet {
                position: relative;
                border-radius: 5px;
                height: 85%;
                transition-property: margin;
                transition-duration: 0.4s;
                transition-timing-function: cubic-bezier(0.9, 0.7, 0.2, 1);

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

                .emptyTitle {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 50%;
                    transform: translateX(-50%);
                }

                .accordion-flush {
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

                        .hasntApproved {
                            position: absolute;
                            right: 10%;
                            top: 50%;
                            transform: translateY(-50%);
                            font-weight: 600;
                            color: rgb(199, 32, 32);
                        }

                        .hasApproved {
                            position: absolute;
                            right: 10%;
                            top: 50%;
                            transform: translateY(-50%);
                            font-weight: 600;
                            color: rgb(71, 106, 167);
                        }

                        .approvedStrFrame {
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

                        .notEnough {
                            font-weight: 600;
                            color: rgb(199, 32, 32);
                        }

                        .hasntApproved {
                            font-weight: 600;
                            color: rgb(199, 32, 32);
                        }

                        .viewBtn {
                            position: absolute;
                            background: rgb(26, 55, 77);
                            border: 1px solid #000;
                            color: white;
                            border-radius: 5px;
                            width: 5vw;
                            height: 3.5vh;
                            bottom: 5%;
                            right: 1%;
                            font-size: 2vh;
                            transition: 0.4s;

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

            .back {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                bottom: 2%;
                left: 1%;
                background: rgb(26, 55, 77);
                border: 1px solid #000;
                color: white;
                border-radius: 5px;
                width: max-content;
                height: 3vh;
                font-size: 2vh;
                padding: 1vh 1vw;
                transition: 0.4s;

                &:hover {
                    background-color: rgb(64, 104, 130);
                }

                &:active {
                    transform: scale(0.95);
                }
            }
        }


    }


}</style>