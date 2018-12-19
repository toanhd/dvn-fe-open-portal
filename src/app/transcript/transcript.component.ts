import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TranscriptService} from '../transcript-services/transcript-service.service';
import {StudentService} from '../student-services/student.service';
import {TranscriptDialogComponent} from './transcript-dialog';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-transcript',
    templateUrl: './transcript.component.html',
    styleUrls: ['./transcript.component.scss']
})
export class TranscriptComponent implements OnInit {
    studentForm = new FormGroup({
        stdID: new FormControl(''),
    });


    displayedColumns: string[] = ['courseID', 'courseName', 'credit', 'gradeVal', 'semester', 'action-update', 'action-delete'];
    dataSource;
    studentInfo;
    spinnerLoad = false;
    queryMessage;
    queryTranMessage;
    transcript;

    constructor(
        private transcriptService: TranscriptService,
        private studentService: StudentService,
        public dialog: MatDialog,
    ) {
    }

    ngOnInit() {
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
                this.spinnerLoad = true;
                this.transcript.gradesList[index].credit = result.credit;
                this.transcript.gradesList[index].gradeVal = result.gradeVal;
                this.transcript.gradesList[index].semester = result.semester;

                this.transcriptService.updateTranscript(this.transcript).subscribe(
                    data => {
                        if (data) {
                            const id = data.response.transcriptID.replace('transcript_', '');
                            this.loadTranscripts(id);
                        }
                    },
                    err => {
                    }
                );
            }
        });
    }

    deleteGrade(index) {
        this.transcript.gradesList.splice(index, 1);
        this.transcriptService.updateTranscript(this.transcript).subscribe(
            data => {
                if (data) {
                    const id = data.response.transcriptID.replace('transcript_', '');
                    this.loadTranscripts(id)
                }
            },
            err => {
            }
        );
    }

    loadTranscripts(stdID) {
        if (stdID === '') {
            this.queryMessage = 'Vui lòng nhập Mã số sinh viên';
        } else {
            this.transcript = undefined;
            this.spinnerLoad = true;
            this.studentInfo = undefined;
            this.queryMessage = undefined;
            this.queryTranMessage = undefined;
            this.dataSource = undefined;
            this.studentService.getbyID(stdID).subscribe(
                data => {
                    if (data) {

                        this.spinnerLoad = false;
                        this.studentInfo = data;
                        const tranID = 'transcript_' + stdID;
                        this.transcriptService.getByID(tranID)
                            .subscribe(
                                result => {
                                    this.transcript = result;
                                    this.dataSource = result.gradesList;
                                },
                                error => {
                                    if (error.error.status === 404) {
                                        this.dataSource = undefined;
                                        this.spinnerLoad = false;
                                        this.queryTranMessage = 'Chưa có bảng điểm cho sinh viên này'
                                    }
                                }
                            );
                    }
                },
                err => {
                    this.spinnerLoad = false;
                    if (err.error.status === 404) {
                        this.queryMessage = 'Không tìm thấy sinh viên với mã số tương ứng!'
                    }
                }
            );
        }
    }
}
