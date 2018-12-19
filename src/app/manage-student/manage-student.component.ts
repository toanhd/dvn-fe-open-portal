import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ManageStudentDialogComponent} from './manage-student-dialog'
import {StudentService} from '../student-services/student.service';
import {DatePipe} from '@angular/common';
import {TranscriptService} from '../transcript-services/transcript-service.service';

declare var $: any;

@Component({
    selector: 'app-manage-student',
    templateUrl: './manage-student.component.html',
    styleUrls: ['./manage-student.component.scss']
})
export class ManageStudentComponent implements OnInit {

    displayedColumns: string[] = ['stdID', 'name', 'school', 'intakeYear', 'dob', 'action-transcript', 'action-update', 'action-delete'];
    dataSource;
    spinnerLoad = false;

    constructor(
        public dialog: MatDialog,
        private studentService: StudentService,
        private datePipe: DatePipe,
        private transcriptService: TranscriptService
    ) {
    }

    ngOnInit() {
        this.loadStudents();
    }

    loadStudents() {
        this.studentService.getAll()
            .subscribe(
                data => {
                    this.dataSource = data;
                    this.spinnerLoad = false;
                },
                err => {
                }
            );

    }

    deleteStudent(stdID) {
        this.spinnerLoad = true;
        this.studentService.delete(stdID)
            .subscribe(
                err => {
                    this.loadStudents()
                }
            );
        const tranID = 'transcript_' + stdID;
        this.transcriptService.deleteTranscript(tranID)
            .subscribe(
                data => {

                },
                err => {
                }
            );
    }

    viewTranscript(stdID) {
        console.log(stdID)
    }

    createStudent(studentInfo) {
        const student = {
            $class: 'org.dvn.com.Student',
            stdID: '',
            intakeYear: '',
            info: {
                $class: 'org.dvn.com.BasicInfo',
                name: '',
                school: '',
                dob: ''
            }
        };

        student.stdID = studentInfo.stdID;
        student.intakeYear = studentInfo.intakeYear;
        student.info.name = studentInfo.name;
        student.info.school = studentInfo.school;
        student.info.dob = studentInfo.dob;

        this.studentService.create(student).subscribe(
            data => {
                this.loadStudents();
            },
            err => {
                this.loadStudents();
                if (err.error.statusCode === 500) {
                    this.showNotification(
                        'bottom',
                        'right',
                        'Đã tồn tại sinh viên với mã số này!')
                }
            }
        )
    }

    updateStudent(currentStudent) {

        const student = {
            $class: 'org.dvn.com.Student',
            stdID: '',
            intakeYear: '',
            info: {
                $class: 'org.dvn.com.BasicInfo',
                name: '',
                school: '',
                dob: ''
            }
        };

        const updateStudentDialog = this.dialog.open(ManageStudentDialogComponent, {
            width: '600px',
            data: {
                dialogTitle: 'Update Student Information',
                isStdID: true,
                stdID: currentStudent.stdID,
                name: currentStudent.info.name,
                school: currentStudent.info.school,
                intakeYear: currentStudent.intakeYear,
                dob: currentStudent.info.dob
            }
        });

        updateStudentDialog.afterClosed().subscribe(result => {
            if (result) {
                this.spinnerLoad = true;
                result.dob = this.datePipe.transform(result.dob, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
                student.stdID = result.stdID;
                student.intakeYear = result.intakeYear;
                student.info.name = result.name;
                student.info.school = result.school;
                student.info.dob = result.dob;
                this.studentService.update(student).subscribe(
                    data => {
                        this.loadStudents();
                    },
                    err => {
                        this.loadStudents();
                    }
                )
            }
        });
    }

    openDialog(): void {
        const newStudentDialog = this.dialog.open(ManageStudentDialogComponent, {
            width: '600px',
            data: {
                dialogTitle: 'New Student',
                isStdID: false,
                stdID: '',
                name: '',
                school: '',
                intakeYear: '',
                dob: ''
            }
        });

        newStudentDialog.afterClosed().subscribe(result => {
            if (result) {
                this.spinnerLoad = true;
                result.dob = this.datePipe.transform(result.dob, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
                this.createStudent(result)
            }
        });
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
