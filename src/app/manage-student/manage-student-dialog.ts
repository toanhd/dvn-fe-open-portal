import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
    dialogTitle: string,
    isStdID: boolean,
    stdID: string,
    name: string,
    school: string,
    intakeYear: string,
    dob: string
}

@Component({
    selector: 'app-manage-student-dialog',
    templateUrl: 'manage-student-dialog.html',
})
export class ManageStudentDialogComponent {


    constructor(
        public dialogRef: MatDialogRef<ManageStudentDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}