import {Component, OnInit} from '@angular/core';
import {RequestService} from '../request.service';
import {TranscriptService} from '../transcript-services/transcript-service.service';
import {RequestDialogComponent} from './request-dialog';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-manage-request',
    templateUrl: './manage-request.component.html',
    styleUrls: ['./manage-request.component.scss']
})
export class ManageRequestComponent implements OnInit {
    displayedColumns: string[] = ['requester', 'company', 'email', 'reason', 'student', 'status', 'action-update', 'action-delete'];
    dataSource;
    spinnerLoad = false;

    constructor(private requestService: RequestService,
                private transcriptService: TranscriptService,
                private dialog: MatDialog
    ) {

    }

    ngOnInit() {
        this.loadRequests()
    }

    loadRequests() {
        this.spinnerLoad = true;
        this.requestService.getAllRequest().subscribe(
            data => {
                this.dataSource = data.response.requests;
                this.spinnerLoad = false;

            },
            err => {
                this.spinnerLoad = false;
            }
        )
    }

    rejectReq(id) {
        this.spinnerLoad = true;
        const req = {
            request_id: id,
            status: 'rejected'
        };
        this.requestService.rejectRequest(req).subscribe(
            data => {
                this.loadRequests()
            },
            err => {
                this.loadRequests()
            }
        )
    }

    mailing(request) {
        // open dialog
        const transcriptDialog = this.dialog.open(RequestDialogComponent, {
            width: '800px',
            data: {
                stdID: request.stdID,
                tranID: 'transcript_' + request.stdID,
                dialogTitle: 'Bảng điểm sinh viên ' + request.stdID,
                recipient: request.email,
                reqID: request._id
            }
        });

        transcriptDialog.afterClosed().subscribe(result => {
            this.loadRequests()
        });
    }

}
