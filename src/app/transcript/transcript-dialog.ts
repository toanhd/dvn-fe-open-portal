import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
    dialogTitle: String,
    courseName: string,
    credit: number,
    gradeVal: number,
    semester: number
}

@Component({
    selector: 'app-transcript-dialog',
    templateUrl: 'transcript-dialog.html',
})
export class TranscriptDialogComponent {
    semesters: number[] = [
        20181, 20182,
        20191, 20192,
        20211, 20122,
        20221, 22822,
        20231, 20232
    ];

    constructor(
        public dialogRef: MatDialogRef<TranscriptDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}