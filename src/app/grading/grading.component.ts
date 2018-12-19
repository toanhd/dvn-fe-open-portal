import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {StudentService} from '../student-services/student.service';
import {DatePipe} from '@angular/common';
import {TranscriptService} from '../transcript-services/transcript-service.service';
import {TranscriptDialogComponent} from '../transcript/transcript-dialog';
import {MatDialog} from '@angular/material';

export interface Course {
    id: string,
    name: string,
    credit: number
}

declare var $: any;

@Component({
    selector: 'app-grading',
    templateUrl: './grading.component.html',
    styleUrls: ['./grading.component.scss']
})
export class GradingComponent implements OnInit {
    displayedColumns: string[] = ['courseID', 'courseName', 'credit', 'gradeVal', 'semester', 'action-update', 'action-delete'];

    semesters: number[] = [
        20181, 20182,
        20191, 20192,
        20211, 20122,
        20221, 22822,
        20231, 20232
    ];

    courses: Course[] = [
        {id: 'SSH1110', name: 'Những NLCB của CN Mác-Lênin I', credit: 2},
        {id: 'SSH1120', name: 'Những NLCB của CN Mác-Lênin II', credit: 3},
        {id: 'SSH1050', name: 'Tư tưởng Hồ Chí Minh', credit: 2},
        {id: 'SSH1130', name: 'Đường lối CM của Đảng CSVN', credit: 3},
        {id: 'SSH1170', name: 'Pháp luật đại cương', credit: 2},
        {id: 'PE1010', name: 'Giáo dục thể chất A', credit: 1},
        {id: 'PE1020', name: 'Giáo dục thể chất B', credit: 1},
        {id: 'PE1030', name: 'Giáo dục thể chất C', credit: 1},
        {id: 'PE2010', name: 'Giáo dục thể chất D', credit: 1},
        {id: 'PE2020', name: 'Giáo dục thể chất E', credit: 1},
        {id: 'MIL1110', name: 'Đường lối quân sự của Đảng', credit: 3},
        {id: 'MIL1120', name: 'Công tác quốc phòng-an ninh', credit: 3},
        {id: 'MIL1130', name: 'QS chung và KCT bắn súng AK', credit: 4},
        {id: 'MI1110', name: 'Giải tích 1', credit: 4},
        {id: 'MI1120', name: 'Giải tích 2', credit: 3},
        {id: 'MI1130', name: 'Giải tích 3', credit: 3},
        {id: 'MI1140', name: 'Đại số', credit: 4},
        {id: 'MI2020', name: 'Xác suất thống kê', credit: 3},
        {id: 'PH1110', name: 'Vật lý đại cương 1', credit: 3},
        {id: 'PH1120', name: 'Vật lý đại cương 2', credit: 3},
        {id: 'EM1010', name: 'Quản trị học đại cương', credit: 2},
        {id: 'IT1110', name: 'Tin học đại cương', credit: 4},
        {id: 'PH1130', name: 'Vật lý đại cương III (Quang học)', credit: 3},
        {id: 'IT2000', name: 'Nhập môn Công nghệ Thông tin', credit: 3},
        {id: 'IT3010', name: 'Cấu trúc dữ liệu và giải thuật', credit: 3},
        {id: 'IT3020', name: 'Toán rời rạc', credit: 3},
        {id: 'IT3030', name: 'Kiến trúc máy tính', credit: 3},
        {id: 'IT3040', name: 'Kỹ thuật lập trình', credit: 2},
        {id: 'IT3070', name: 'Hệ điều hành', credit: 3},
        {id: 'IT3080', name: 'Mạng máy tính', credit: 3},
        {id: 'IT3090', name: 'Cơ sở dữ liệu', credit: 3},
        {id: 'IT3100', name: 'Lập trình hướng đối tượng', credit: 2},
        {id: 'IT3110', name: 'Linux và phần mềm nguồn mở', credit: 2},
        {id: 'IT4380', name: 'Phân tích thiết kế hệ thống hướng đối tượng', credit: 3},
        {id: 'IT3910', name: 'Project I', credit: 3},
        {id: 'IT3920', name: 'Project II', credit: 3},
        {id: 'IT4010', name: 'An toàn và bảo mật thông tin', credit: 3},
        {id: 'IT4040', name: 'Trí tuệ nhân tạo', credit: 3},
        {id: 'IT4080', name: 'Nhập môn công nghệ phần mềm', credit: 2},
        {id: 'IT4460', name: 'Phân tích yêu cầu phần mềm', credit: 2},
        {id: 'IT4440', name: 'Tương tác người máy', credit: 3},
        {id: 'IT4490', name: 'Thiết kế và xây dựng phần mềm', credit: 3},
        {id: 'IT4481', name: 'Kỹ năng mềm trong CNTT&TT', credit: 3},
        {id: 'IT4541', name: 'Quản lý dự án phần mềm', credit: 2},
        {id: 'IT4551', name: 'Đồ án môn học: Phát triển phần mềm chuyên nghiệp', credit: 3},
        {id: 'IT4520', name: 'Kinh tế công nghệ phần mềm', credit: 2},
        {id: 'IT4501', name: 'Đảm bảo chất lượng phần mềm', credit: 2},
        {id: 'IT4470', name: 'Đồ hoạ và hiện thực ảo', credit: 3},
        {id: 'IT4892', name: 'Phương pháp và công cụ đánh giá phần mềm', credit: 3},
        {id: 'IT4883', name: 'Phát triển phần mềm phân tán', credit: 3},
        {id: 'IT4310', name: 'Cơ sở dữ liệu nâng cao', credit: 3},
        {id: 'IT4852', name: 'Thiết kế và quản trị cơ sở dữ liệu', credit: 3},
        {id: 'QT4215', name: 'Kỹ thuật công nghệ', credit: 2},
        {id: 'IT4555', name: 'Các mô hình phần mềm', credit: 2},
        {id: 'IT4556', name: 'Các phương pháp phát triển phần mềm nhanh', credit: 2},
        {id: 'IT4557', name: 'Phát triển phần mềm hướng mô hình', credit: 2},
        {id: 'IT4876', name: 'Nhập môn chương trình dịch', credit: 3},
        {id: 'IT3042', name: 'Lập trình cấu trúc', credit: 2},
        {id: 'IT4762', name: 'Ngữ nghĩa của các ngôn ngữ lập trình', credit: 2},
        {id: 'IT4030', name: 'Nhập môn hệ quản trị cơ sở dữ liệu', credit: 2},
        {id: 'IT4442', name: 'Giao diện người dùng', credit: 2},
        {id: 'IT4895', name: 'Công nghệ Web tiên tiến', credit: 2},
        {id: 'IT4885', name: 'Mô hình và thuật toán Internet phổ biến', credit: 3},
        {id: 'IT4875', name: 'Xử lý ngôn ngữ tự nhiên', credit: 2},
        {id: 'IT4898', name: 'Multimedia, trò chơi và các hệ thống giải trí', credit: 2},
        {id: 'IT4899', name: 'Hệ thống hướng tác tử', credit: 2},
        {id: 'IT4884', name: 'Các hệ thống nhúng và thời gian thực', credit: 3},
        {id: 'IT4886', name: 'Kỹ nghệ Phần mềm hướng dịch vụ', credit: 3},
        {id: 'IT4887', name: 'Mạng không dây và phát triển ứng dụng di động', credit: 3},
        {id: 'IT4888', name: 'Văn phong Kỹ thuật (Technical Writing)', credit: 3},
        {id: 'IT4882', name: 'Mật mã và Ứng dụng', credit: 3}
    ];

    gradingForm = new FormGroup({
        course: new FormControl(''),
        gradeVal: new FormControl(''),
        semester: new FormControl(''),
    });

    studentForm = new FormGroup({
        stdID: new FormControl(''),
    });

    studentInfo;
    studentQueryMess;
    spinnerLoad = false;
    tranSpinnerLoad = false;
    transcript;
    dataSource;
    queryTranMessage: string;

    constructor(
        private studentService: StudentService,
        private datePipe: DatePipe,
        private transcriptService: TranscriptService,
        public dialog: MatDialog,
    ) {
    }

    ngOnInit() {
    }

    onSearching(stdID) {
        this.loadTranscripts(stdID)
        this.studentQueryMess = undefined;
        this.studentInfo = undefined;
        this.gradingForm.reset();
        this.dataSource = undefined;
        this.studentService.getbyID(stdID)
            .subscribe(
                data => {
                    const studentResponse = {
                        stdID: '',
                        intakeYear: '',
                        name: '',
                        school: '',
                        dob: ''
                    };
                    studentResponse.stdID = data.stdID;
                    studentResponse.intakeYear = data.intakeYear;
                    studentResponse.name = data.info.name;
                    studentResponse.school = data.info.school;
                    studentResponse.dob = data.info.dob;
                    this.studentInfo = studentResponse;
                },
                err => {
                    if (err.error.status === 404) {
                        this.studentQueryMess = 'Không tìm thấy sinh viên với mã số tương ứng';
                    }
                }
            );
    }

    onGrading(gradingInfo) {
        this.spinnerLoad = true;
        this.tranSpinnerLoad = true;
        const grade = {
            $class: 'org.dvn.com.Grading',
            date: '',
            courseID: '',
            courseName: '',
            credit: 0,
            gradeVal: 0,
            semester: 0,
            stdID: '',
            lecID: ''
        };

        grade.date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
        grade.courseID = gradingInfo.course.id;
        grade.courseName = gradingInfo.course.name;
        grade.credit = gradingInfo.course.credit;
        grade.gradeVal = gradingInfo.gradeVal;
        grade.semester = gradingInfo.semester;
        grade.stdID = this.studentInfo.stdID;
        grade.lecID = '442';

        this.transcriptService.grading(grade).subscribe(
            data => {
                this.showNotification(
                    'bottom',
                    'right',
                    'Hoàn thành nhập điểm môn học ' + grade.courseName);
                this.spinnerLoad = false;
                this.gradingForm.reset();
                this.loadTranscripts(grade.stdID)
            },
            err => {
                if (err.error.statusCode === 500) {
                    this.spinnerLoad = false;
                    this.tranSpinnerLoad = false;
                    this.showNotification(
                        'bottom',
                        'right',
                        'Môn học ' + grade.courseName + ' đã tồn tại trong bảng điểm.');
                }
            }
        );
    }

    loadTranscripts(stdID) {
        this.studentService.getbyID(stdID).subscribe(
            data => {
                if (data) {
                    this.tranSpinnerLoad = false;
                    this.studentInfo = data;
                    const tranID = 'transcript_' + stdID;
                    this.transcriptService.getByID(tranID)
                        .subscribe(
                            result => {
                                this.transcript = result;
                                this.dataSource = result.gradesList;
                                this.queryTranMessage = undefined;
                            },
                            error => {
                                if (error.error.status === 404) {
                                    this.dataSource = undefined;
                                    this.tranSpinnerLoad = false;
                                    this.queryTranMessage = 'Chưa có bảng điểm cho sinh viên này'
                                }
                            }
                        );
                }
            },
            err => {
                this.tranSpinnerLoad = false;
                if (err.error.status === 404) {
                    this.studentQueryMess = 'Không tìm thấy sinh viên với mã số tương ứng!'
                }
            }
        );
    }

    updateGrade(grade, index) {
        const updateGradeDialog = this.dialog.open(TranscriptDialogComponent, {
            width: '600px',
            data: {
                dialogTitle: 'Cập nhật điểm môn học',
                courseName: grade.courseName,
                credit: grade.credit,
                gradeVal: grade.gradeVal,
                semester: grade.semester
            }
        });

        updateGradeDialog.afterClosed().subscribe(result => {
            if (result) {
                this.tranSpinnerLoad = true;
                this.transcript.gradesList[index].credit = result.credit;
                this.transcript.gradesList[index].gradeVal = result.gradeVal;
                this.transcript.gradesList[index].semester = result.semester;

                this.transcriptService.updateTranscript(this.transcript).subscribe(
                    data => {
                        if (data) {
                            const id = data.response.transcriptID.replace('transcript_', '');
                            this.loadTranscripts(id);
                            this.showNotification(
                                'bottom',
                                'right',
                                'Cập nhập điểm môn học ' + grade.courseName + ' thành công!');
                        }
                    },
                    err => {
                    }
                );
            }
        });
    }

    deleteGrade(index) {
        this.tranSpinnerLoad = true;
        this.transcript.gradesList.splice(index, 1);
        this.transcriptService.updateTranscript(this.transcript).subscribe(
            data => {
                if (data) {
                    const id = data.response.transcriptID.replace('transcript_', '');
                    this.loadTranscripts(id);
                    this.showNotification(
                        'bottom',
                        'right',
                        'Xóa điểm môn học thành công');
                }
            },
            err => {
            }
        );
    }


    showNotification(from, align, mess) {
        const type = ['', 'info', 'success', 'warning', 'danger'];
        const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
            icon: 'notifications',
            message: mess

        }, {
            type: type[color],
            timer: 3000,
            placement: {
                from: from,
                align: align
            },
            template:
                '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
                '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                '<i class="material-icons" data-notify="icon">notifications</i> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
        });
    }
}
