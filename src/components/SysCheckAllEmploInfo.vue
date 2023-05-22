<script>
import { RouterLink, RouterView } from 'vue-router'
import EditEmployeeWorkHoursInfo from './EditEmployeeWorkHoursInfo.vue' //紅蚯蚓不用理他
export default {
    components: {
        RouterLink,
        EditEmployeeWorkHoursInfo,
    },
    data() {
        return {
            //帳戶資料
            employeeId: '',
            accountId: '',
            employeeName: '',
            //工時表資料
            today: '',
            workDayInfo: [],
            workHoursInfoData: [],
            selectedDateInfoList: [],
            queryDate: "",
            showWorkHoursInfo: false,
            workDayInfoList: [],
            hasAnyWorkDayInfo: false,
            hasntThisDateInfo: false,
            hasntThisReviewStatusInfo: false,
            hasntThisTimeFrameInfo: false,
            listRenderOver: true,
            hasntBeenApproved: true,
            message: '',
            //介面文字
            searchDate: '',
            langValue: 'ch',
            title: '',
            infoText: '',
            commitBtn: '',
            bacKToEmploInfo: '',
            checkBtn: '',
            backBtn: '',
            nameText: '',
            genderText: '',
            emailText: '',
            departmentText: '',
            positionText: '',
            levelText: '',
            supervisorIdText: '',
            emploIdText: '',
            phone: '',
            nameIdPHStr: '',
            //輸入綁定
            reviewStatusSelect: 'default',
            timeFrameSelect: 'default',
            //元件動畫
            isAnimating: false,
            //傳遞變數
            sysEditEmployeeInfo: '',
            //搜尋
            searchNameId: '',
            filteredEmploInfo: [],
        }
    },
    methods: {
        changeLanguage() {
            if (this.langValue === 'ch') {
                this.title = '員工資訊一覽';
                this.infoText = '的資訊';
                this.commitBtn = '編輯';
                this.bacKToEmploInfo = '返回員工資訊表';
                this.checkBtn = '查看';
                this.nameText = '姓名',
                    this.genderText = '性別',
                    this.emailText = '信箱',
                    this.departmentText = '部門',
                    this.positionText = '職稱',
                    this.levelText = '職等',
                    this.supervisorIdText = '主管ID',
                    this.phone = '電話',
                    this.emploIdText = '員工ID',
                    this.backBtn = '返回';
                this.nameIdPHStr = '請輸入姓名或是員工ID進行搜尋';
            } else if (this.langValue === 'en') {
                this.title = 'Employee Infomation List';
                this.infoText = '‘s information';
                this.commitBtn = 'commit';
                this.bacKToEmploInfo = 'Back to Employee Infomation List';
                this.checkBtn = 'Check';
                this.nameText = 'Name',
                    this.genderText = 'Gender',
                    this.emailText = 'Email',
                    this.departmentText = 'Department',
                    this.positionText = 'Position',
                    this.levelText = 'Level',
                    this.supervisorIdText = 'SupervisorID',
                    this.phone = 'Phone',
                    this.emploIdText = 'EmployeeID',
                    this.backBtn = 'Back';
                this.nameIdPHStr = 'Search by name or employeeId';
            } else if (this.langValue === 'jp') {
                this.title = '人員情報一覽';
                this.infoText = 'の情報';
                this.commitBtn = '編集';
                this.bacKToEmploInfo = '人員情報へ戻る';
                this.checkBtn = '詳細を見る';
                this.nameText = '名前',
                    this.genderText = '性別',
                    this.emailText = 'メール',
                    this.departmentText = '部署',
                    this.positionText = '職名',
                    this.levelText = '職級',
                    this.supervisorIdText = '主管ID',
                    this.phone = '電話番号',
                    this.emploIdText = '社員番号',
                    this.backBtn = '戻る';
                this.nameIdPHStr = '名前または社員番号で検索';
            }
        },
        fetchWorkDayInfo() {

            fetch("http://localhost:3000/getAllEmployeeInfo", {
                method: "get",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(res => res.json())
                .then((data) => {

                    this.workDayInfo = data.employeeInfoList;
                    //搜尋
                     this.byNameId();
                    console.log(this.workDayInfo);
                    if (this.workDayInfo.length !== 0) {
                        this.hasAnyWorkDayInfo = true;
                    }
                    //完全沒資料就不跑spinner
                    if (this.hasAnyWorkDayInfo === false) {
                        this.listRenderOver = true;
                    }
                    this.renderList();
                    if (data.success === true) {
                        this.message = data.message;
                    } else {
                        this.message = data.message;
                    }
                   
                })
                .catch(err => console.log(err))
        },
        renderList() {
            this.workDayInfoList = [];
            this.hasntThisTimeFrameInfo = false;
            this.hasntThisReviewStatusInfo = false;
            this.workDayInfo.workDayInfoList.forEach((workDayInfo) => {
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
                    employeeId: workDayInfo.employeeId.employeeId,
                    workingHours: workDayInfo.workingHours,
                    status: workDayInfo.status,
                    approved: workDayInfo.approved,
                    approvedStr: approvedStr,
                    workingHoursIsNotEnough: workingHoursIsNotEnough
                })
                console.log(workDayInfo.date)
            })
            this.listRenderOver = true;
        },
        renderListLimitedApproved() {
            this.workDayInfoList = [];
            let hasThisReviewStatusInfo = false;
            //混合天數範圍查詢
            if (this.timeFrameSelect === "default") {
                this.workDayInfo.workDayInfoList.forEach((workDayInfo) => {
                    if (workDayInfo.approved === true) {
                        let approvedStr = "已審核";
                        let workingHoursIsNotEnough = false;
                        if (workDayInfo.workingHours < 8) {
                            workingHoursIsNotEnough = true;
                        }
                        this.workDayInfoList.push({
                            workInfoId: workDayInfo.workInfoId,
                            date: workDayInfo.date,
                            employeeId: workDayInfo.employeeId.employeeId,
                            workingHours: workDayInfo.workingHours,
                            status: workDayInfo.status,
                            approved: workDayInfo.approved,
                            approvedStr: approvedStr,
                            workingHoursIsNotEnough: workingHoursIsNotEnough
                        })
                        hasThisReviewStatusInfo = true;
                    }
                })
                if (hasThisReviewStatusInfo === false) {
                    this.hasntThisReviewStatusInfo = true;
                } else {
                    this.hasntThisReviewStatusInfo = false;
                }
            }
            if (this.timeFrameSelect === "7days") {
                this.workDayInfo.workDayInfoList.forEach((workDayInfo) => {
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
                            employeeId: workDayInfo.employeeId.employeeId,
                            workingHours: workDayInfo.workingHours,
                            status: workDayInfo.status,
                            approved: workDayInfo.approved,
                            approvedStr: approvedStr,
                            workingHoursIsNotEnough: workingHoursIsNotEnough
                        })
                        hasThisReviewStatusInfo = true;
                    }
                })
                if (hasThisReviewStatusInfo === false) {
                    this.hasntThisReviewStatusInfo = true;
                } else {
                    this.hasntThisReviewStatusInfo = false;
                }
            }
            if (this.timeFrameSelect === "14days") {
                this.workDayInfo.workDayInfoList.forEach((workDayInfo) => {
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
                            employeeId: workDayInfo.employeeId.employeeId,
                            workingHours: workDayInfo.workingHours,
                            status: workDayInfo.status,
                            approved: workDayInfo.approved,
                            approvedStr: approvedStr,
                            workingHoursIsNotEnough: workingHoursIsNotEnough
                        })
                        hasThisReviewStatusInfo = true;
                    }
                })
                if (hasThisReviewStatusInfo === false) {
                    this.hasntThisReviewStatusInfo = true;
                } else {
                    this.hasntThisReviewStatusInfo = false;
                }
            }
            if (this.timeFrameSelect === "30days") {
                this.workDayInfo.workDayInfoList.forEach((workDayInfo) => {
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
                            employeeId: workDayInfo.employeeId.employeeId,
                            workingHours: workDayInfo.workingHours,
                            status: workDayInfo.status,
                            approved: workDayInfo.approved,
                            approvedStr: approvedStr,
                            workingHoursIsNotEnough: workingHoursIsNotEnough
                        })
                        hasThisReviewStatusInfo = true;
                    }
                })
                if (hasThisReviewStatusInfo === false) {
                    this.hasntThisReviewStatusInfo = true;
                } else {
                    this.hasntThisReviewStatusInfo = false;
                }
            }
        },
        renderListLimitedNotApproved() {
            this.workDayInfoList = [];
            let hasThisReviewStatusInfo = false;
            //混合天數範圍查詢
            if (this.timeFrameSelect === "default") {
                this.workDayInfo.workDayInfoList.forEach((workDayInfo) => {
                    if (workDayInfo.approved === false) {
                        let approvedStr = "未審核";
                        let workingHoursIsNotEnough = false;
                        if (workDayInfo.workingHours < 8) {
                            workingHoursIsNotEnough = true;
                        }
                        this.workDayInfoList.push({
                            workInfoId: workDayInfo.workInfoId,
                            date: workDayInfo.date,
                            employeeId: workDayInfo.employeeId.employeeId,
                            workingHours: workDayInfo.workingHours,
                            status: workDayInfo.status,
                            approved: workDayInfo.approved,
                            approvedStr: approvedStr,
                            workingHoursIsNotEnough: workingHoursIsNotEnough
                        })
                        hasThisReviewStatusInfo = true;
                    }
                })
                if (hasThisReviewStatusInfo === false) {
                    this.hasntThisReviewStatusInfo = true;
                } else {
                    this.hasntThisReviewStatusInfo = false;
                }
            }
            if (this.timeFrameSelect === "7days") {
                this.workDayInfo.workDayInfoList.forEach((workDayInfo) => {
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
                            employeeId: workDayInfo.employeeId.employeeId,
                            workingHours: workDayInfo.workingHours,
                            status: workDayInfo.status,
                            approved: workDayInfo.approved,
                            approvedStr: approvedStr,
                            workingHoursIsNotEnough: workingHoursIsNotEnough
                        })
                        hasThisReviewStatusInfo = true;
                    }
                })
                if (hasThisReviewStatusInfo === false) {
                    this.hasntThisReviewStatusInfo = true;
                } else {
                    this.hasntThisReviewStatusInfo = false;
                }
            }
            if (this.timeFrameSelect === "14days") {
                this.workDayInfo.workDayInfoList.forEach((workDayInfo) => {
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
                            employeeId: workDayInfo.employeeId.employeeId,
                            workingHours: workDayInfo.workingHours,
                            status: workDayInfo.status,
                            approved: workDayInfo.approved,
                            approvedStr: approvedStr,
                            workingHoursIsNotEnough: workingHoursIsNotEnough
                        })
                        hasThisReviewStatusInfo = true;
                    }
                })
                if (hasThisReviewStatusInfo === false) {
                    this.hasntThisReviewStatusInfo = true;
                } else {
                    this.hasntThisReviewStatusInfo = false;
                }
            }
            if (this.timeFrameSelect === "30days") {
                this.workDayInfo.workDayInfoList.forEach((workDayInfo) => {
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
                            employeeId: workDayInfo.employeeId.employeeId,
                            workingHours: workDayInfo.workingHours,
                            status: workDayInfo.status,
                            approved: workDayInfo.approved,
                            approvedStr: approvedStr,
                            workingHoursIsNotEnough: workingHoursIsNotEnough
                        })
                        hasThisReviewStatusInfo = true;
                    }
                })
                if (hasThisReviewStatusInfo === false) {
                    this.hasntThisReviewStatusInfo = true;
                } else {
                    this.hasntThisReviewStatusInfo = false;
                }
            }
        },
        renderListByDate(date) {
            this.workDayInfoList = [];
            let hasThisDateInfo = false;
            this.workDayInfo.workDayInfoList.forEach((workDayInfo) => {
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
                        employeeId: workDayInfo.employeeId.employeeId,
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
                this.workDayInfo.workDayInfoList.forEach((workDayInfo) => {
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
                            employeeId: workDayInfo.employeeId.employeeId,
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
                this.workDayInfo.workDayInfoList.forEach((workDayInfo) => {
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
                            employeeId: workDayInfo.employeeId.employeeId,
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
                this.workDayInfo.workDayInfoList.forEach((workDayInfo) => {
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
                            employeeId: workDayInfo.employeeId.employeeId,
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
                this.workDayInfo.workDayInfoList.forEach((workDayInfo) => {
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
                            employeeId: workDayInfo.employeeId.employeeId,
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
                this.workDayInfo.workDayInfoList.forEach((workDayInfo) => {
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
                            employeeId: workDayInfo.employeeId.employeeId,
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
                this.workDayInfo.workDayInfoList.forEach((workDayInfo) => {
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
                            employeeId: workDayInfo.employeeId.employeeId,
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
                this.workDayInfo.workDayInfoList.forEach((workDayInfo) => {
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
                            employeeId: workDayInfo.employeeId.employeeId,
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
                this.workDayInfo.workDayInfoList.forEach((workDayInfo) => {
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
                        this.workDayInfoList.push({
                            workInfoId: workDayInfo.workInfoId,
                            date: workDayInfo.date,
                            employeeId: workDayInfo.employeeId.employeeId,
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
                this.workDayInfo.workDayInfoList.forEach((workDayInfo) => {
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
                        this.workDayInfoList.push({
                            workInfoId: workDayInfo.workInfoId,
                            date: workDayInfo.date,
                            employeeId: workDayInfo.employeeId.employeeId,
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
        //查看此日期的workHoursInfo 同時檢查是否被審核
        workHoursInfo(event) {
            let reqBody = {
                employeeId: event.target.value
            }
            console.log(event.target.value);
            // 先看此日期此張工時表是否已審核 , 決定可否編輯
            // fetch("http://localhost:3000/getEmployeeInfoById" ,{
            // method:"put",
            // body: JSON.stringify(reqBody),
            // headers: {
            //     'Content-Type': 'application/json; charset=utf-8'
            // }
            // }).then(res => res.json())
            // .then((data)=>{
            //     data.workDayInfoList.forEach((workDayInfo) =>{
            //         if(workDayInfo.date === event.target.value){
            //             if(workDayInfo.approved === true){
            //                 this.hasntBeenApproved = false;
            //             }else{
            //                 this.hasntBeenApproved = true;
            //             }
            //         }
            //     })
            // })
            // .catch(err => console.log(err))

            fetch("http://localhost:3000/getEmployeeInfoById", {
                method: "put",
                body: JSON.stringify(reqBody),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(res => res.json())
                .then((data) => {
                    console.log(data);
                    //將工時表以時間最早的開始排序 (原本順序是先輸入的越前面)
                    let container = null;
                    // for (let i = data.workHoursInfoList.length - 1; i > 0; i--) {
                    //     for (let i = 0; i < data.workHoursInfoList.length - 1; i++) {
                    //         const nextTimeString = data.workHoursInfoList[i + 1].startTime;
                    //         const nextTimeArr = nextTimeString.split(":");
                    //         const nextTime = new Date();
                    //         const nextTimeHours = parseInt(nextTimeArr[0]);
                    //         const nextTimeMinutes = parseInt(nextTimeArr[1]);
                    //         nextTime.setHours()
                    //         const thisTimeString = data.workHoursInfoList[i].startTime;
                    //         const thisTimeArr = thisTimeString.split(":");
                    //         const thisTime = new Date();
                    //         const thisTimeHours = parseInt(thisTimeArr[0]);
                    //         const thisTimeMinutes = parseInt(thisTimeArr[1]);
                    //         if (nextTimeHours === thisTimeHours) {
                    //             if (nextTimeMinutes < thisTimeMinutes) {
                    //                 container = data.workHoursInfoList[i + 1];
                    //                 data.workHoursInfoList[i + 1] = data.workHoursInfoList[i];
                    //                 data.workHoursInfoList[i] = container;
                    //             }
                    //         } else if (nextTimeHours < thisTimeHours) {
                    //             container = data.workHoursInfoList[i + 1];
                    //             data.workHoursInfoList[i + 1] = data.workHoursInfoList[i];
                    //             data.workHoursInfoList[i] = container;
                    //         }
                    //     }
                    // }
                    this.workHoursInfoData = data;
                    console.log(this.workHoursInfoData);
                    console.log(this.workHoursInfoData === null);
                    this.showWorkHoursInfo = true;
                    setTimeout(() => {
                        this.queryDate = event.target.value;
                        let workHoursInfoFrame = document.getElementById("workHoursInfoFrame");
                        let deco1 = document.getElementById("deco1");
                        let deco2 = document.getElementById("deco2");
                        workHoursInfoFrame.style.left = "50%";
                        workHoursInfoFrame.style.transform = "translateX(-50%)";
                        deco1.style.left = "110%";
                        deco2.style.left = "150%";
                    }, 100);
                    this.workHoursInfoByDate(event.target.value);
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
        //以點擊的日期查詢工時表
        workHoursInfoByDate(targetValue) {
            this.selectedDateInfoList = [];
            this.workHoursInfoData.workHoursInfoList.forEach((workHoursInfo) => {
                if (workHoursInfo.date === targetValue) {
                    workHoursInfo.workInfoId = workHoursInfo.workInfoId.toString();
                    this.selectedDateInfoList.push(workHoursInfo);
                }
            })
            console.log(this.selectedDateInfoList);
        },
        //返回日工時表
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
        //icon動畫
        startAnimation() {
            setInterval(() => {
                this.isAnimating = !this.isAnimating;
            }, 500); //每隔0.5秒執行一次
        },
        editWorkHoursInfo(input) {
            this.sysEditEmployeeInfo = input.target.value;
            const sysEditEmployeeInfo = this.sysEditEmployeeInfo; // 保存 sysEditEmployeeInfo
            setTimeout(() => {
                this.$router.push({ name: 'StstemEditInfo', params: { sysEditEmployeeInfo } });
            }, 0)
        },
        byNameId() {
            this.filteredEmploInfo = []
            if (this.searchNameId === "") {
                this.workDayInfo.forEach(item => {
                    this.filteredEmploInfo.push(item)
                })
            };
            this.workDayInfo.forEach(item => {

                if (this.searchNameId === item.name || this.searchNameId === item.employeeId) {
                    console.log(item);
                    this.filteredEmploInfo.push(item)
                    console.log(this.filteredEmploInfo);
                }
            });

        }
    },
    watch: {
        //監看searchDate的值變化 , date則是回遞該變數值
        searchDate(date) {
            console.log(date);
            if (date === '') {
                this.hasntThisDateInfo = false;
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
        console.log(this.workDayInfo);

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

        <div class="check">

            <!-- 左側範圍 -->
            <div v-if="listRenderOver" class="left">
                <div class="title_search">
                    <h4 class="fw-bold title">{{ title }}</h4>
                    <!-- 搜尋 姓名 員工ID -->
                    <div class="searchFrame">
                        <label for="serch">{{ search }}</label>
                        <div class="dateFrame">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <input :disabled="this.timeFrameSelect !== 'default'" @input="byNameId" v-model="searchNameId"
                                id="serch" type="text" :placeholder="nameIdPHStr">
                        </div>
                    </div>
                </div>
                <div v-if="showWorkHoursInfo" id="workHoursInfoFrame" class="workHoursInfoFrame">
                    <div class="infoFrame" id="infoFrame">
                        <h4 class="fw-bold dateTitle">{{ queryDate }}{{ infoText }}</h4>
                        <div class="cardFrame" id="cardFrame" v-dragscroll.x>
                            <div :style="{ backgroundColor: 'rgba(220, 220, 220, 0.4)' }" class="workHoursInfoCard"
                                v-if="workHoursInfoData !== null">
                                <h4> {{ workHoursInfoData.employeeId }}</h4>
                                <div class="infoArea">
                                    <div>
                                        <p>{{ nameText }}: {{ workHoursInfoData.name }}</p>
                                        <p>{{ genderText }}: {{ workHoursInfoData.gender }}</p>
                                        <p>{{ emailText }}: {{ workHoursInfoData.email }}</p>
                                        <p>{{ departmentText }}: {{ workHoursInfoData.department }}</p>
                                    </div>
                                    <div>
                                        <p>{{ positionText }}: {{ workHoursInfoData.position }}</p>
                                        <p>{{ levelText }}: {{ workHoursInfoData.level }}</p>
                                        <p>{{ supervisorIdText }}: {{ workHoursInfoData.supervisor }}</p>
                                        <p>{{ phone }}: {{ workHoursInfoData.phone }}</p>
                                    </div>


                                </div>

                                <button v-if="hasntBeenApproved" :value="workHoursInfoData.employeeId"
                                    @click="editWorkHoursInfo" class="editWorkHoursInfo" id="editWorkHoursInfo">{{
                                        commitBtn }}</button>
                            </div>

                        </div>
                    </div>
                    <button @click="backToWorkDayInfo" class="backToDayList" id="backToDayList">{{ bacKToEmploInfo
                    }}</button>
                </div>
                <div class="deco1" id="deco1" v-if="showWorkHoursInfo"></div>
                <div class="deco2" id="deco2" v-if="showWorkHoursInfo"></div>
                <div class="sheet" id="sheet" style="overflow: auto;">
                    <!--手風琴-->
                    <div v-if="hasAnyWorkDayInfo" class="accordion accordion-flush" id="accordionFlushExample"
                        style="overflow: auto;">
                        <!--手風琴格位-->
                        <div v-for="(empInfo, index) in filteredEmploInfo" :value="workDayInfo.worInfoId" :key="index"
                            class="accordion-item">
                            <!--手風琴標題-->
                            <h2 class="accordion-header" id="flush-headingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    :data-bs-target="'#flush-collapse' + index" aria-expanded="false"
                                    aria-controls="flush-collapseOne">
                                    <p class="pId">{{ emploIdText }}:{{ empInfo.employeeId }}</p>
                                    <p class="pName">{{ nameText }}:{{ empInfo.name }}</p>
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
                                    <p>{{ nameText }}: {{ empInfo.name }}</p>
                                    <p>{{ genderText }}: {{ empInfo.gender }}</p>
                                    <p>{{ emailText }}: {{ empInfo.email }}</p>
                                    <p>{{ departmentText }}: {{ empInfo.department }}</p>
                                    <p>{{ positionText }}: {{ empInfo.position }}</p>
                                    <p>{{ levelText }}: {{ empInfo.level }}</p>
                                    <p>{{ supervisorIdText }}: {{ empInfo.supervisor }}</p>
                                    <p>{{ phone }}: {{ empInfo.phone }}</p>
                                    <button @click="workHoursInfo($event)" :value="empInfo.employeeId" class="viewBtn"
                                        type="button">{{ checkBtn }}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3 v-if="!hasAnyWorkDayInfo" class="emptyTitle">沒有任何日工時表</h3>
                    <h3 v-if="hasntThisDateInfo" class="emptyTitle">沒有該日期的日工時表</h3>
                    <h3 v-if="hasntThisTimeFrameInfo" class="emptyTitle">沒有該天數範圍內的工時表</h3>
                    <h3 v-if="hasntThisReviewStatusInfo" class="emptyTitle">沒有該審核狀態的工時表</h3>
                </div>
                <RouterLink to="/systemHome"><button type="button" class="back">{{ backBtn }}</button></RouterLink>
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
    overflow: hidden;

    select:disabled,
    input:disabled {
        background-color: rgb(179, 177, 171);
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
                width: 100%;
                height: 5vh;
                align-items: baseline;

                .title {
                    font-size: 3vh;
                }

                .searchFrame {
                    position: absolute;
                    right: 5%;
                    width: max-content;
                    display: inline-block;

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
                            width: 14vw;
                            height: 4vh;
                            font-size: 1vh;
                            border-radius: 30px;
                            padding-left: 15%;
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
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
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

                            h4 {
                                font-size: 3vh;
                            }

                            .infoArea {
                                height: 80%;
                                width: 90%;
                                background-color: rgba(240, 235, 219, 0.4);
                                border-radius: 10px;
                                display: flex;

                                div {
                                    width: 50%;
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: center;
                                    align-items: center;

                                }

                                p {
                                    // margin: auto;
                                    font-size: 2vh;
                                }
                            }


                            .editWorkHoursInfo {
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

                            .hasBeenApproved {
                                position: absolute;
                                top: 0%;
                                left: 0%;
                                background: rgb(132, 184, 216);
                                border: none;
                                color: rgb(47, 47, 47);
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

                .backToDayList {
                    margin-top: 1%;
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

                        .pId {
                            position: absolute;
                            top: 50%;
                        }

                        .pName {
                            position: absolute;
                            left: 30%;
                            top: 50%;
                        }

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


}
</style>