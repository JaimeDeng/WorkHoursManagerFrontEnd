<script>
import { RouterLink, RouterView } from 'vue-router'
import popup from './popup.vue'
import checkPopup from './checkPopup.vue'
export default {
components: {
    RouterLink,
    popup,
    checkPopup
},
    data() {
        return {
            //checkPopup的props變數
            showPopup: false,
            popupData: {
                title: "Popup Title",
                content: "Popup Content",
                backBtn: 'back'
            },
            showCheckPopup: false,
            checkPopupData: {
                title: "Popup Title",
                content: "Popup Content",
                backBtn: 'back',
                confirmBtn: 'confirm'
            },
            //帳戶資料
            employeeId: "",
            accountId: "",
            employeeName: "",
            //工時表資料
            today: "",
            subordinatesWorkDayInfo: [],
            workDayInfo: [],
            workHoursInfoData: [],
            selectedDateInfoList: [],
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
            reviewingWorkDayInfoId: "",
            reviewingWorkDayInfoApproval: false,
            hasntBeenApproved: true,
            message: "",
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
                this.popupData.backBtn = '返回';
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
                this.popupData.backBtn = 'Back';
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
                this.popupData.backBtn = '返回';
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
        async getSubordinateWorkDayInfo() {
            let subordinateArr = this.subordinateSelect.split(" ");
            let subordinateId = subordinateArr[0];
            const response = await fetch("http://localhost:3000/getWorkDayInfoByEmployeeId", {
                method: "put",
                headers: {
                'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({ employeeId: subordinateId })
            });
        
            const data = await response.json();
            return data.workDayInfoList;
        },
        renderListBySubordinate(selectedSubornidate){
            this.workDayInfoList = [];
            this.getSubordinateWorkDayInfo().then((res)=>{
                if(selectedSubornidate === "default"){
                    this.renderList();
                }else{
                    this.subordinatesWorkDayInfo = []
                    this.subordinatesWorkDayInfo = res;
                    console.log(this.subordinatesWorkDayInfo)
                    this.subordinatesWorkDayInfo.forEach((workDayInfo) => {
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
                            employeeId : workDayInfo.employeeId.employeeId,
                            approved : workDayInfo.approved
                        });
                        this.workDayInfoList.push({
                            workInfoId: workDayInfo.workInfoId,
                            date: workDayInfo.date,
                            employeeId: workDayInfo.employeeId.employeeId,
                            workingHours: workDayInfo.workingHours,
                            status: workDayInfo.status,
                            approved: workDayInfo.approved,
                            approvedStr: approvedStr,
                            workingHoursIsNotEnough: workingHoursIsNotEnough,
                            dateAndEmployeeIdAndApprove: dateAndEmployeeIdAndApprove
                        })
                    })
                }
            })
        },
        renderListLimitedApproved() {
            this.workDayInfoList = [];
            let hasThisReviewStatusInfo = false;
            //混合天數範圍查詢
            if(this.subordinateSelect === "default"){
                //沒有指定員工
                if (this.timeFrameSelect === "default") {
                    this.workDayInfo.forEach((workDayInfo) => {
                        if (workDayInfo.approved === true) {
                            let approvedStr = "已審核";
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
                            hasThisReviewStatusInfo = true;
                        }
                    })
                    if(hasThisReviewStatusInfo === false){
                        this.hasntThisReviewStatusInfo = true;
                    }else{
                        this.hasntThisReviewStatusInfo = false;
                    }
                }
                
            }else{
                //有指定員工
                this.getSubordinateWorkDayInfo().then((res)=>{
                    this.subordinatesWorkDayInfo = []
                    this.subordinatesWorkDayInfo = res;
                    if (this.timeFrameSelect === "default") {
                        this.subordinatesWorkDayInfo.forEach((workDayInfo) => {
                            if (workDayInfo.approved === true) {
                                let approvedStr = "已審核";
                                let workingHoursIsNotEnough = false;
                                if (workDayInfo.workingHours < 8) {
                                    workingHoursIsNotEnough = true;
                                }
                                let dateAndEmployeeIdAndApprove = JSON.stringify({
                                    date : workDayInfo.date,
                                    employeeId : workDayInfo.employeeId.employeeId,
                                    approved : workDayInfo.approved
                                });
                                this.workDayInfoList.push({
                                    workInfoId: workDayInfo.workInfoId,
                                    date: workDayInfo.date,
                                    employeeId: workDayInfo.employeeId.employeeId,
                                    workingHours: workDayInfo.workingHours,
                                    status: workDayInfo.status,
                                    approved: workDayInfo.approved,
                                    approvedStr: approvedStr,
                                    workingHoursIsNotEnough: workingHoursIsNotEnough,
                                    dateAndEmployeeIdAndApprove: dateAndEmployeeIdAndApprove
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
                        this.subordinatesWorkDayInfo.forEach((workDayInfo) => {
                            let workDay = new Date(workDayInfo.date);
                            let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                            let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                            if (dayDiff <= 7 && workDayInfo.approved === true) {
                                let approvedStr = "已審核";
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
                                    employeeId: workDayInfo.employeeId.employeeId,
                                    workingHours: workDayInfo.workingHours,
                                    status: workDayInfo.status,
                                    approved: workDayInfo.approved,
                                    approvedStr: approvedStr,
                                    workingHoursIsNotEnough: workingHoursIsNotEnough,
                                    dateAndEmployeeIdAndApprove: dateAndEmployeeIdAndApprove
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
                        this.subordinatesWorkDayInfo.forEach((workDayInfo) => {
                            let workDay = new Date(workDayInfo.date);
                            let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                            let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                            if (dayDiff <= 14 && workDayInfo.approved === true) {
                                let approvedStr = "已審核";
                                let workingHoursIsNotEnough = false;
                                if (workDayInfo.workingHours < 8) {
                                    workingHoursIsNotEnough = true;
                                }
                                let dateAndEmployeeIdAndApprove = JSON.stringify({
                                    date : workDayInfo.date,
                                    employeeId : workDayInfo.employeeId.employeeId,
                                    approved : workDayInfo.approved
                                });
                                this.workDayInfoList.push({
                                    workInfoId: workDayInfo.workInfoId,
                                    date: workDayInfo.date,
                                    employeeId: workDayInfo.employeeId.employeeId,
                                    workingHours: workDayInfo.workingHours,
                                    status: workDayInfo.status,
                                    approved: workDayInfo.approved,
                                    approvedStr: approvedStr,
                                    workingHoursIsNotEnough: workingHoursIsNotEnough,
                                    dateAndEmployeeIdAndApprove: dateAndEmployeeIdAndApprove
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
                        this.subordinatesWorkDayInfo.forEach((workDayInfo) => {
                            let workDay = new Date(workDayInfo.date);
                            let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                            let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                            if (dayDiff <= 30 && workDayInfo.approved === true) {
                                let approvedStr = "已審核";
                                let workingHoursIsNotEnough = false;
                                if (workDayInfo.workingHours < 8) {
                                    workingHoursIsNotEnough = true;
                                }
                                let dateAndEmployeeIdAndApprove = JSON.stringify({
                                    date : workDayInfo.date,
                                    employeeId : workDayInfo.employeeId.employeeId,
                                    approved : workDayInfo.approved
                                });
                                this.workDayInfoList.push({
                                    workInfoId: workDayInfo.workInfoId,
                                    date: workDayInfo.date,
                                    employeeId: workDayInfo.employeeId.employeeId,
                                    workingHours: workDayInfo.workingHours,
                                    status: workDayInfo.status,
                                    approved: workDayInfo.approved,
                                    approvedStr: approvedStr,
                                    workingHoursIsNotEnough: workingHoursIsNotEnough,
                                    dateAndEmployeeIdAndApprove: dateAndEmployeeIdAndApprove
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
                })
            }
        },
        renderListLimitedNotApproved() {
            this.workDayInfoList = [];
            let hasThisReviewStatusInfo = false;
            //混合天數範圍查詢
            if( this.subordinateSelect === "default"){
                //沒有指定員工
                if (this.timeFrameSelect === "default") {
                    this.workDayInfo.forEach((workDayInfo) => {
                        if (workDayInfo.approved === false) {
                            let approvedStr = "未審核";
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
                            hasThisReviewStatusInfo = true;
                        }
                    })
                    if(hasThisReviewStatusInfo === false){
                        this.hasntThisReviewStatusInfo = true;
                    }else{
                        this.hasntThisReviewStatusInfo = false;
                    }
                }
            }else{
                //有指定員工
                this.getSubordinateWorkDayInfo().then((res)=>{
                    this.subordinatesWorkDayInfo = []
                    this.subordinatesWorkDayInfo = res;
                    if (this.timeFrameSelect === "default") {
                        this.subordinatesWorkDayInfo.forEach((workDayInfo) => {
                            if (workDayInfo.approved === false) {
                                let approvedStr = "未審核";
                                let workingHoursIsNotEnough = false;
                                if (workDayInfo.workingHours < 8) {
                                    workingHoursIsNotEnough = true;
                                }
                                let dateAndEmployeeIdAndApprove = JSON.stringify({
                                    date : workDayInfo.date,
                                    employeeId : workDayInfo.employeeId.employeeId,
                                    approved : workDayInfo.approved
                                });
                                this.workDayInfoList.push({
                                    workInfoId: workDayInfo.workInfoId,
                                    date: workDayInfo.date,
                                    employeeId: workDayInfo.employeeId.employeeId,
                                    workingHours: workDayInfo.workingHours,
                                    status: workDayInfo.status,
                                    approved: workDayInfo.approved,
                                    approvedStr: approvedStr,
                                    workingHoursIsNotEnough: workingHoursIsNotEnough,
                                    dateAndEmployeeIdAndApprove: dateAndEmployeeIdAndApprove
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
                        this.subordinatesWorkDayInfo.forEach((workDayInfo) => {
                            let workDay = new Date(workDayInfo.date);
                            let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                            let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                            if (dayDiff <= 7 && workDayInfo.approved === false) {
                                let approvedStr = "未審核";
                                let workingHoursIsNotEnough = false;
                                if (workDayInfo.workingHours < 8) {
                                    workingHoursIsNotEnough = true;
                                }
                                let dateAndEmployeeIdAndApprove = JSON.stringify({
                                    date : workDayInfo.date,
                                    employeeId : workDayInfo.employeeId.employeeId,
                                    approved : workDayInfo.approved
                                });
                                this.workDayInfoList.push({
                                    workInfoId: workDayInfo.workInfoId,
                                    date: workDayInfo.date,
                                    employeeId: workDayInfo.employeeId.employeeId,
                                    workingHours: workDayInfo.workingHours,
                                    status: workDayInfo.status,
                                    approved: workDayInfo.approved,
                                    approvedStr: approvedStr,
                                    workingHoursIsNotEnough: workingHoursIsNotEnough,
                                    dateAndEmployeeIdAndApprove: dateAndEmployeeIdAndApprove
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
                        this.subordinatesWorkDayInfo.forEach((workDayInfo) => {
                            let workDay = new Date(workDayInfo.date);
                            let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                            let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                            if (dayDiff <= 14 && workDayInfo.approved === false) {
                                let approvedStr = "未審核";
                                let workingHoursIsNotEnough = false;
                                if (workDayInfo.workingHours < 8) {
                                    workingHoursIsNotEnough = true;
                                }
                                let dateAndEmployeeIdAndApprove = JSON.stringify({
                                    date : workDayInfo.date,
                                    employeeId : workDayInfo.employeeId.employeeId,
                                    approved : workDayInfo.approved
                                });
                                this.workDayInfoList.push({
                                    workInfoId: workDayInfo.workInfoId,
                                    date: workDayInfo.date,
                                    employeeId: workDayInfo.employeeId.employeeId,
                                    workingHours: workDayInfo.workingHours,
                                    status: workDayInfo.status,
                                    approved: workDayInfo.approved,
                                    approvedStr: approvedStr,
                                    workingHoursIsNotEnough: workingHoursIsNotEnough,
                                    dateAndEmployeeIdAndApprove: dateAndEmployeeIdAndApprove
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
                        this.subordinatesWorkDayInfo.forEach((workDayInfo) => {
                            let workDay = new Date(workDayInfo.date);
                            let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                            let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                            if (dayDiff <= 30 && workDayInfo.approved === false) {
                                let approvedStr = "未審核";
                                let workingHoursIsNotEnough = false;
                                if (workDayInfo.workingHours < 8) {
                                    workingHoursIsNotEnough = true;
                                }
                                let dateAndEmployeeIdAndApprove = JSON.stringify({
                                    date : workDayInfo.date,
                                    employeeId : workDayInfo.employeeId.employeeId,
                                    approved : workDayInfo.approved
                                });
                                this.workDayInfoList.push({
                                    workInfoId: workDayInfo.workInfoId,
                                    date: workDayInfo.date,
                                    employeeId: workDayInfo.employeeId.employeeId,
                                    workingHours: workDayInfo.workingHours,
                                    status: workDayInfo.status,
                                    approved: workDayInfo.approved,
                                    approvedStr: approvedStr,
                                    workingHoursIsNotEnough: workingHoursIsNotEnough,
                                    dateAndEmployeeIdAndApprove: dateAndEmployeeIdAndApprove
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
                })
            }
        },
        renderListByDate(date) {
            this.workDayInfoList = [];
            let hasThisDateInfo = false;
            //混合天數範圍查詢
            if(this.subordinateSelect === "default"){
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
                        hasThisDateInfo = true;
                    }
                })
                if (hasThisDateInfo === false) {
                    this.hasntThisDateInfo = true;
                } else {
                    this.hasntThisDateInfo = false;
                }
            }else{
                //有指定員工
                this.getSubordinateWorkDayInfo().then((res)=>{
                    this.subordinatesWorkDayInfo = []
                    this.subordinatesWorkDayInfo = res;
                    this.subordinatesWorkDayInfo.forEach((workDayInfo) => {
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
                            let dateAndEmployeeIdAndApprove = JSON.stringify({
                                        date : workDayInfo.date,
                                        employeeId : workDayInfo.employeeId.employeeId,
                                        approved : workDayInfo.approved
                                    });
                                this.workDayInfoList.push({
                                    workInfoId: workDayInfo.workInfoId,
                                    date: workDayInfo.date,
                                    employeeId: workDayInfo.employeeId.employeeId,
                                    workingHours: workDayInfo.workingHours,
                                    status: workDayInfo.status,
                                    approved: workDayInfo.approved,
                                    approvedStr: approvedStr,
                                    workingHoursIsNotEnough: workingHoursIsNotEnough,
                                    dateAndEmployeeIdAndApprove: dateAndEmployeeIdAndApprove
                            })
                            hasThisDateInfo = true;
                        }
                    })
                    if (hasThisDateInfo === false) {
                        this.hasntThisDateInfo = true;
                    } else {
                        this.hasntThisDateInfo = false;
                    }
                })
            }
        },
        renderListWhitin7Days() {
            this.workDayInfoList = [];
            let hasThisTimeFrameInfo = false;
            //混合審核狀態判斷
            if(this.subordinateSelect === "default"){
                //沒有指定員工
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
                            hasThisTimeFrameInfo = true;
                        }
                    })
                }
                if (hasThisTimeFrameInfo === false) {
                    this.hasntThisTimeFrameInfo = true;
                } else {
                    this.hasntThisTimeFrameInfo = false;
                }
            }else{
                //有指定員工
                this.getSubordinateWorkDayInfo().then((res)=>{
                    this.subordinatesWorkDayInfo = []
                    this.subordinatesWorkDayInfo = res;
                    if (this.reviewStatusSelect === 'default') {
                        this.subordinatesWorkDayInfo.forEach((workDayInfo) => {
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
                                let dateAndEmployeeIdAndApprove = JSON.stringify({
                                        date : workDayInfo.date,
                                        employeeId : workDayInfo.employeeId.employeeId,
                                        approved : workDayInfo.approved
                                    });
                                this.workDayInfoList.push({
                                    workInfoId: workDayInfo.workInfoId,
                                    date: workDayInfo.date,
                                    employeeId: workDayInfo.employeeId.employeeId,
                                    workingHours: workDayInfo.workingHours,
                                    status: workDayInfo.status,
                                    approved: workDayInfo.approved,
                                    approvedStr: approvedStr,
                                    workingHoursIsNotEnough: workingHoursIsNotEnough,
                                    dateAndEmployeeIdAndApprove: dateAndEmployeeIdAndApprove
                                })
                                hasThisTimeFrameInfo = true;
                            }
                        })
                    }
                    if (this.reviewStatusSelect === 'true') {
                        this.subordinatesWorkDayInfo.forEach((workDayInfo) => {
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
                                let dateAndEmployeeIdAndApprove = JSON.stringify({
                                        date : workDayInfo.date,
                                        employeeId : workDayInfo.employeeId.employeeId,
                                        approved : workDayInfo.approved
                                    });
                                this.workDayInfoList.push({
                                    workInfoId: workDayInfo.workInfoId,
                                    date: workDayInfo.date,
                                    employeeId: workDayInfo.employeeId.employeeId,
                                    workingHours: workDayInfo.workingHours,
                                    status: workDayInfo.status,
                                    approved: workDayInfo.approved,
                                    approvedStr: approvedStr,
                                    workingHoursIsNotEnough: workingHoursIsNotEnough,
                                    dateAndEmployeeIdAndApprove: dateAndEmployeeIdAndApprove
                                })
                                hasThisTimeFrameInfo = true;
                            }
                        })
                    }
                    if (this.reviewStatusSelect === 'false') {
                        this.subordinatesWorkDayInfo.forEach((workDayInfo) => {
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
                                let dateAndEmployeeIdAndApprove = JSON.stringify({
                                        date : workDayInfo.date,
                                        employeeId : workDayInfo.employeeId.employeeId,
                                        approved : workDayInfo.approved
                                    });
                                this.workDayInfoList.push({
                                    workInfoId: workDayInfo.workInfoId,
                                    date: workDayInfo.date,
                                    employeeId: workDayInfo.employeeId.employeeId,
                                    workingHours: workDayInfo.workingHours,
                                    status: workDayInfo.status,
                                    approved: workDayInfo.approved,
                                    approvedStr: approvedStr,
                                    workingHoursIsNotEnough: workingHoursIsNotEnough,
                                    dateAndEmployeeIdAndApprove: dateAndEmployeeIdAndApprove
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
                })
            }
        },
        renderListWhitin14Days() {
            this.workDayInfoList = [];
            let hasThisTimeFrameInfo = false;
            //混合審核狀態判斷
            if(this.subordinateSelect === "default"){
                //沒有指定員工
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
                            hasThisTimeFrameInfo = true;
                        }
                    })
                }
                if (hasThisTimeFrameInfo === false) {
                    this.hasntThisTimeFrameInfo = true;
                } else {
                    this.hasntThisTimeFrameInfo = false;
                }
            }else{
                //有指定員工
                this.getSubordinateWorkDayInfo().then((res)=>{
                    this.subordinatesWorkDayInfo = []
                    this.subordinatesWorkDayInfo = res;
                    if (this.reviewStatusSelect === 'default') {
                        this.subordinatesWorkDayInfo.forEach((workDayInfo) => {
                            let workDay = new Date(workDayInfo.date);
                            let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                            let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                            if (dayDiff <= 14 ){
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
                                        employeeId : workDayInfo.employeeId.employeeId,
                                        approved : workDayInfo.approved
                                    });
                                this.workDayInfoList.push({
                                    workInfoId: workDayInfo.workInfoId,
                                    date: workDayInfo.date,
                                    employeeId: workDayInfo.employeeId.employeeId,
                                    workingHours: workDayInfo.workingHours,
                                    status: workDayInfo.status,
                                    approved: workDayInfo.approved,
                                    approvedStr: approvedStr,
                                    workingHoursIsNotEnough: workingHoursIsNotEnough,
                                    dateAndEmployeeIdAndApprove: dateAndEmployeeIdAndApprove
                                })
                                hasThisTimeFrameInfo = true;
                            }
                        })
                    }
                    if (this.reviewStatusSelect === 'true') {
                        this.subordinatesWorkDayInfo.forEach((workDayInfo) => {
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
                                let dateAndEmployeeIdAndApprove = JSON.stringify({
                                        date : workDayInfo.date,
                                        employeeId : workDayInfo.employeeId.employeeId,
                                        approved : workDayInfo.approved
                                    });
                                this.workDayInfoList.push({
                                    workInfoId: workDayInfo.workInfoId,
                                    date: workDayInfo.date,
                                    employeeId: workDayInfo.employeeId.employeeId,
                                    workingHours: workDayInfo.workingHours,
                                    status: workDayInfo.status,
                                    approved: workDayInfo.approved,
                                    approvedStr: approvedStr,
                                    workingHoursIsNotEnough: workingHoursIsNotEnough,
                                    dateAndEmployeeIdAndApprove: dateAndEmployeeIdAndApprove
                                })
                                hasThisTimeFrameInfo = true;
                            }
                        })
                    }
                    if (this.reviewStatusSelect === 'false') {
                        this.subordinatesWorkDayInfo.forEach((workDayInfo) => {
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
                                let dateAndEmployeeIdAndApprove = JSON.stringify({
                                        date : workDayInfo.date,
                                        employeeId : workDayInfo.employeeId.employeeId,
                                        approved : workDayInfo.approved
                                    });
                                this.workDayInfoList.push({
                                    workInfoId: workDayInfo.workInfoId,
                                    date: workDayInfo.date,
                                    employeeId: workDayInfo.employeeId.employeeId,
                                    workingHours: workDayInfo.workingHours,
                                    status: workDayInfo.status,
                                    approved: workDayInfo.approved,
                                    approvedStr: approvedStr,
                                    workingHoursIsNotEnough: workingHoursIsNotEnough,
                                    dateAndEmployeeIdAndApprove: dateAndEmployeeIdAndApprove
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
                })
            }
        },
        renderListWhitin30Days() {
            this.workDayInfoList = [];
            let hasThisTimeFrameInfo = false;
            //混合審核狀態判斷
            if(this.subordinateSelect === "default"){
                //沒有指定員工
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
                        if (dayDiff <= 30 && workDayInfo.approved === true) {
                            let approvedStr = "已審核";

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
                        if (dayDiff <= 30 && workDayInfo.approved === false) {
                            let approvedStr = "未審核";
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
                            hasThisTimeFrameInfo = true;
                        }
                    })
                }
                if (hasThisTimeFrameInfo === false) {
                    this.hasntThisTimeFrameInfo = true;
                } else {
                    this.hasntThisTimeFrameInfo = false;
                }
            }else{
                //有指定員工
                this.getSubordinateWorkDayInfo().then((res)=>{
                    this.subordinatesWorkDayInfo = []
                    this.subordinatesWorkDayInfo = res;
                    if (this.reviewStatusSelect === 'default') {
                        this.subordinatesWorkDayInfo.forEach((workDayInfo) => {
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
                                let dateAndEmployeeIdAndApprove = JSON.stringify({
                                        date : workDayInfo.date,
                                        employeeId : workDayInfo.employeeId.employeeId,
                                        approved : workDayInfo.approved
                                    });
                                this.workDayInfoList.push({
                                    workInfoId: workDayInfo.workInfoId,
                                    date: workDayInfo.date,
                                    employeeId: workDayInfo.employeeId.employeeId,
                                    workingHours: workDayInfo.workingHours,
                                    status: workDayInfo.status,
                                    approved: workDayInfo.approved,
                                    approvedStr: approvedStr,
                                    workingHoursIsNotEnough: workingHoursIsNotEnough,
                                    dateAndEmployeeIdAndApprove: dateAndEmployeeIdAndApprove
                                })
                                hasThisTimeFrameInfo = true;
                            }
                        })
                    }
                    if (this.reviewStatusSelect === 'true') {
                        this.subordinatesWorkDayInfo.forEach((workDayInfo) => {
                            let workDay = new Date(workDayInfo.date);
                            let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                            let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                            //7天內且已審核
                            if (dayDiff <= 30 && workDayInfo.approved === true) {
                                let approvedStr = "已審核";

                                let workingHoursIsNotEnough = false;
                                if (workDayInfo.workingHours < 8) {
                                    workingHoursIsNotEnough = true;
                                }
                                let dateAndEmployeeIdAndApprove = JSON.stringify({
                                        date : workDayInfo.date,
                                        employeeId : workDayInfo.employeeId.employeeId,
                                        approved : workDayInfo.approved
                                    });
                                this.workDayInfoList.push({
                                    workInfoId: workDayInfo.workInfoId,
                                    date: workDayInfo.date,
                                    employeeId: workDayInfo.employeeId.employeeId,
                                    workingHours: workDayInfo.workingHours,
                                    status: workDayInfo.status,
                                    approved: workDayInfo.approved,
                                    approvedStr: approvedStr,
                                    workingHoursIsNotEnough: workingHoursIsNotEnough,
                                    dateAndEmployeeIdAndApprove: dateAndEmployeeIdAndApprove
                                })
                                hasThisTimeFrameInfo = true;
                            }
                        })
                    }
                    if (this.reviewStatusSelect === 'false') {
                        this.subordinatesWorkDayInfo.forEach((workDayInfo) => {
                            let workDay = new Date(workDayInfo.date);
                            let timeDiff = Math.abs(this.today.getTime() - workDay.getTime());
                            let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                            //7天內且未審核
                            if (dayDiff <= 30 && workDayInfo.approved === false) {
                                let approvedStr = "未審核";
                                let workingHoursIsNotEnough = false;
                                if (workDayInfo.workingHours < 8) {
                                    workingHoursIsNotEnough = true;
                                }
                                let dateAndEmployeeIdAndApprove = JSON.stringify({
                                        date : workDayInfo.date,
                                        employeeId : workDayInfo.employeeId.employeeId,
                                        approved : workDayInfo.approved
                                    });
                                this.workDayInfoList.push({
                                    workInfoId: workDayInfo.workInfoId,
                                    date: workDayInfo.date,
                                    employeeId: workDayInfo.employeeId.employeeId,
                                    workingHours: workDayInfo.workingHours,
                                    status: workDayInfo.status,
                                    approved: workDayInfo.approved,
                                    approvedStr: approvedStr,
                                    workingHoursIsNotEnough: workingHoursIsNotEnough,
                                    dateAndEmployeeIdAndApprove: dateAndEmployeeIdAndApprove
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
                })
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

            //先獲取這張日工時表的ID以便審核使用
            let reqBody = {
                employeeId: dateAndEmployeeIdAndApprove.employeeId
            }

            fetch("http://localhost:3000/getWorkDayInfoByEmployeeId", {
                method: "put",
                body: JSON.stringify(reqBody),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(res => res.json())
            .then((data) => {
                data.workDayInfoList.forEach((workDayInfo) => {
                    if(workDayInfo.date === dateAndEmployeeIdAndApprove.date){
                        this.reviewingWorkDayInfoId = workDayInfo.workInfoId;
                        if(workDayInfo.approved === true){
                            this.hasntBeenApproved = false;
                        }else{
                            this.hasntBeenApproved = true;
                        }
                    }
                })
            })
            .catch(err => console.log(err))

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

            console.log("目前審核的表單號: " + this.reviewingWorkDayInfoId);
            this.reviewingWorkDayInfoApproval = false;
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
        closePopup() {
            this.showPopup = false;
            this.$router.go(0);
        },
        closeCheckPopup() {
            this.showCheckPopup = false;
        },
        confirmApprove(reviewingWorkDayInfoApproval) {

            this.showCheckPopup = false;

            //要審核
            if(reviewingWorkDayInfoApproval === false){
                let reqBody = {
                    workInfoId : this.reviewingWorkDayInfoId,
                    approved : true
                }
                fetch("http://localhost:3000/editWorkDayInfoApproved", {
                    method: "post",
                    body: JSON.stringify(reqBody),
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(res => res.json())
                .then((data) => {
                    if(data.success === true){
                        this.successPopup("已審核該日工時表");
                    }else{
                        this.errorPopup(data.message);
                    }
                })
                .catch(err => console.log(err))
            }else{
                //要收回審核
                let reqBody = {
                    workInfoId : this.reviewingWorkDayInfoId,
                    approved : false
                }
                fetch("http://localhost:3000/editWorkDayInfoApproved", {
                    method: "post",
                    body: JSON.stringify(reqBody),
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(res => res.json())
                .then((data) => {
                    if(data.success === true){
                        this.successPopup("已收回該日工時表審核");
                    }else{
                        this.errorPopup(data.message);
                    }
                })
                .catch(err => console.log(err))
            }
            

        },
        revokeApprove() {

            console.log("目前審核的表單號: " + this.reviewingWorkDayInfoId);
            this.reviewingWorkDayInfoApproval = true;
            this.showCheckPopup = true;
            if (this.langValue === 'ch') {
            this.checkPopupData.title = "確認";
            } else if (this.langValue === 'en') {
                this.checkPopupData.title = "確認";
            } else if (this.langValue === 'jp') {
                this.checkPopupData.title = "Confirm";
            }
            this.checkPopupData.content = "確定收回該日工時表審核狀態嗎?";
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
        startAnimation() {
            setInterval(() => {
                this.isAnimating = !this.isAnimating;
            }, 500); //每隔0.5秒執行一次
        },
        successPopup(message) {
            if (this.langValue === 'ch') {
                this.popupData.title = "成功";
            } else if (this.langValue === 'en') {
                this.popupData.title = "Success";
            } else if (this.langValue === 'jp') {
                this.popupData.title = "追加完了";
            }
            this.popupData.content = message;
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
        errorPopup(message) {
            if (this.langValue === 'ch') {
                this.popupData.title = "錯誤";
            } else if (this.langValue === 'en') {
                this.popupData.title = "Failure";
            } else if (this.langValue === 'jp') {
                this.popupData.title = "エラー";
            }
            this.popupData.content = message;
            this.showPopup = true;
            setTimeout(() => {
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
            }, 100);
        },
    },
    watch: {
        //監看searchDate的值變化 , date則是回遞該變數值
        searchDate(date) {
            console.log(date);
            if (date === '') {
                this.subordinateSelect = 'default';
                this.renderList();
                this.hasntThisDateInfo = false;
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
            this.hasntThisDateInfo = false;
        },
        subordinateSelect(newValue) {
            this.searchDate = '';
            this.reviewStatusSelect = 'default';
            this.timeFrameSelect = 'default';
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
        @close="closeCheckPopup" @confirm="confirmApprove(this.reviewingWorkDayInfoApproval)"></checkPopup>
        <popup ref="popup" class="popup" :popup-data="popupData" :show-popup="showPopup" @close="closePopup"></popup>
        <div v-if="showPopup || showCheckPopup" ref="mask" class="mask"></div>

        <div class="check">
            <!-- 左側範圍 -->
            <div class="left">
                <div class="title_search">
                    <h4 class="fw-bold title">{{ title }}</h4>

                    <!-- 篩選:日期 -->
                    <div class="searchFrame">
                        <label for="serch">{{ search }}</label>
                        <div class="dateFrame">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <input :disabled="this.timeFrameSelect!=='default'" @input="searchByDate" v-model="searchDate" id="serch" type="date">
                        </div>
                    </div>

                    <div class="sel">
                        <div class="ap">
                            <!-- 審核狀態 -->
                            <label for="approvedStatusSelect">{{ reviewStatus }}</label>
                            <select :disabled="this.searchDate!==''" v-model="reviewStatusSelect" id="approvedStatusSelect">
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
                            <select :disabled="this.searchDate!==''" v-model="timeFrameSelect" for="timeFrameSelect">
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
                            <div :style="{backgroundColor : hasntBeenApproved ? '' : 'rgba(220, 220, 220, 0.4)'}" class="workHoursInfoCard" v-for="(workHoursInfo, index) in selectedDateInfoList">
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
                                <div v-if="!hasntBeenApproved" class="hasBeenApproved"><i class="fa-solid fa-check"></i>已審核</div>
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
                                    data-bs-target="#flush-collapseThree" aria-expanded="false"
                                    aria-controls="flush-collapseThree">
                                    員工ID:000929 時間:2023/05/07 待審核
                                </button>
                            </h2>
                            <div id="flush-collapseThree" class="accordion-collapse collapse"
                                aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <!-- 手風琴內容區 -->
                                    <p>工作詳情: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto magnam
                                        explicabo doloremque. Qui soluta ipsa, corrupti consectetur magni doloremque
                                        obcaecati! </p>
                                    <p>姓名:</p>
                                    <p>人員當日狀態:</p>
                                    <p>審核進度:待審核</p>
                                    <p>審核人員ID:</p>
                                    <button type="button">進行審核</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 右側範圍 -->
            <div class="right">
                <div class="title">篩選範圍</div>
                <div class="area1">
                    <!-- 審核狀態 -->
                    <label for="">審核狀態</label>
                    <select>
                        <option selected>請選擇審核狀態</option>
                        <option value="1">已審核</option>
                        <option value="2">待審核</option>
                    </select>
                    <!-- 人員部門 -->
                    <label for="">人員部門</label>
                    <select>
                        <option selected>請選擇部門</option>
                        <option value="1">管理部</option>
                        <option value="2">IT部</option>
                        <option value="3">營業部</option>
                        <option value="4">製造部</option>
                    </select>
                    <!-- 人員ID -->
                    <label for="personId">人員ID</label>
                    <input id="personId" type="text" placeholder="請輸入員工ID">
                    <!-- 時間範圍 -->
                    <label for="">時間範圍</label>
                    <select>
                        <option selected>請選擇時間範圍</option>
                        <option value="1">7日</option>
                        <option value="2">14日</option>
                        <option value="3">30日</option>
                    </select>

                </div>
                <RouterLink to="/managerHome" class="buttonlink">返回</RouterLink>
            </div>
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

    .popup , .checkPopup{
        position: absolute;
        bottom: -20%;
        opacity: 0;
        transition-property: bottom , opacity;
        transition-duration: 0.3s;
        transition-timing-function: cubic-bezier(0.2,1,0.3,1);
        z-index: 2;
    }

    .check {

        width: 70%;
        height: 90%;
        display: flex;
        justify-content: space-evenly;

        //左側
        .left {
            padding: 12px;
            background-color: rgba(255, 255, 255, 0.724);
            border: 2px solid rgb(177, 208, 224);
            border-radius: 5px;
            width: 50%;

            .title_search {
                display: flex;
                width: 100%;
                justify-content: space-between;
                align-items: baseline;

                p {
                    font-size: 23px;
                    font-weight: bold;
                }

                div {
                    label {
                        position: relative;

                        i {
                            position: absolute;
                            top: -14px;
                            left: 5px;
                        }
                    }

                    input {
                        border-radius: 50px;
                        padding-left: 26px;
                        border: 1px solid #000;

                    }
                }

            }

            .sheet {
                border-radius: 5px;

                .accordion-button {
                    word-spacing: 1em;
                    i {
                        font-size: 8px;
                        margin-bottom: 6px;
                        margin-right: 8px;
                    }
                    &:hover{
                        background-color: rgb(105, 152, 171);
                        color:white;
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
                        width: 80px;
                        margin-left: 280px;
                        font-size: 16px;

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
                transition-timing-function: cubic-bezier(0.9, 0.7, 0.2, 1);

            .title {
                font-size: 23px;
                font-weight: bold;

            }

            .area1 {
                display: flex;
                flex-direction: column;
                padding: 18px;

                label {
                    font-size: 15px;
                }

                select,
                input {
                    height: 35px;
                    margin-bottom: 8px;
                    border-radius: 5px;
                    border: none;

                }

            }

            .buttonlink {
                background: rgb(26, 55, 77);
                border: 1px solid #000;
                color: white;
                border-radius: 5px;
                padding: 4px;
                margin: auto;
                font-size: 16px;
                text-decoration: none;
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