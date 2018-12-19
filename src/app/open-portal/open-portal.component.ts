import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../app-services.service';
declare var $: any;

@Component({
    selector: 'app-open-portal',
    templateUrl: './open-portal.component.html',
    styleUrls: ['./open-portal.component.scss']
})
export class OpenPortalComponent implements OnInit {

    requestForm = new FormGroup({
        requester: new FormControl('', Validators.required),
        company: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        stdID: new FormControl('', Validators.required),
        stdName: new FormControl('', Validators.required),
        intakeYear: new FormControl('', Validators.required),
        reason: new FormControl('', Validators.required),
        reasonDetail: new FormControl(''),
        status: new FormControl(''),
    });

    reasons: String[] = [
        'Xác thực hồ sơ xin việc',
        'Xác thực hồ sơ xin học bổng',
        'Xét khen thưởng',
        'Khác'
    ];
    submitted = false;
    spinnerLoad = false;

    constructor(
        private appService: AppService
    ) {
    }

    ngOnInit() {
    }

    onSubmit() {
        this.submitted = true;

        if (this.requestForm.valid) {
            this.spinnerLoad = true;
            const request = this.requestForm.value;
            request.status = 'requested';
            this.appService.createRequest(request).subscribe(
                data => {
                    console.log(data);
                    this.submitted = false;
                    this.requestForm.reset()
                    this.spinnerLoad = false;
                    this.showNotification(
                        'bottom',
                        'center',
                        'Thành công! Yêu cầu xác thực đã được gửi.')
                },
                err => {
                    this.requestForm.reset();
                    this.submitted = false;
                    this.spinnerLoad = false;
                    this.showNotification(
                        'bottom',
                        'center',
                        'Thất bại! Xảy ra lỗi trong quá trình gửi yêu cầu xác thực.')
                }
            );
        }

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
