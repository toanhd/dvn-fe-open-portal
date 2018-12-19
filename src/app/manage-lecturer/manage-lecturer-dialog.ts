import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
    dialogTitle: String,
    islecID: boolean,
    lecID: string,
    name: string,
    intakeYear: string,
    isMoE: boolean
}

@Component({
    selector: 'app-manage-lecturer-dialog',
    templateUrl: 'manage-lecturer-dialog.html',
})
export class ManageLecturerDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<ManageLecturerDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}