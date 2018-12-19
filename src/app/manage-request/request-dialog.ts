import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {TranscriptService} from '../transcript-services/transcript-service.service';
import {StudentService} from '../student-services/student.service';
import {RequestService} from '../request.service';

declare var $: any;

export interface DialogData {
    dialogTitle: string,
    tranID: string,
    stdID: string,
    recipient: string,
    reqID: string,
}

@Component({
    selector: 'app-request-dialog',
    templateUrl: 'request-dialog.html',
})
export class RequestDialogComponent implements OnInit {
    displayedColumns: string[] = ['courseID', 'courseName', 'credit', 'gradeVal', 'semester'];
    dataSource;
    spinnerLoad = false;
    queryMess: String;
    transcript;
    studentInfo;
    mailSpinnerLoad = false;

    constructor(
        public dialogRef: MatDialogRef<RequestDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private transcriptService: TranscriptService,
        private studentService: StudentService,
        private requestService: RequestService) {
    }

    ngOnInit(): void {
        this.loadTranscript();
        this.loadStudent();
    }

    loadTranscript() {
        this.spinnerLoad = true;
        this.transcriptService.getByID(this.data.tranID)
            .subscribe(
                result => {
                    this.spinnerLoad = false;
                    this.transcript = result;
                    this.dataSource = this.transcript.gradesList;
                },
                error => {
                    if (error.error.status === 404) {
                        this.spinnerLoad = false;
                        this.transcript = undefined;
                        this.dataSource = undefined;
                        this.queryMess = 'Không tồn tại bảng điểm cho sinh viên này';
                    }
                }
            );
    }

    loadStudent() {
        this.studentService.getbyID(this.data.stdID)
            .subscribe(
                result => {
                    this.studentInfo = result;
                },
                error => {
                }
            );
    }

    onMailing() {
        let transcriptTable = '';
        for (let i = 0; i < this.transcript.gradesList.length; i++) {
            if (i % 2 === 0) {
                transcriptTable += this.createTranScriptHTML_noBg(this.transcript.gradesList[i])
            } else {
                transcriptTable += this.createTranScriptHTML(this.transcript.gradesList[i])
            }
        }
        const mailContent = this.createMailHTML(transcriptTable, this.studentInfo);
        const mail = {
            to: this.data.recipient,
            html: mailContent,
        };
        this.mailSpinnerLoad = true;
        this.requestService.sendMail(mail).subscribe(
            result => {
                this.dialogRef.close();
                this.showNotification(
                    'bottom',
                    'right',
                    'Thành công! Yêu cầu đã được xử lý.',
                    'success');
                const req = {
                    request_id: this.data.reqID,
                    status: 'mailsent'
                };
                this.requestService.rejectRequest(req).subscribe(
                    data => {
                    },
                    err => {
                    }
                )
            },
            error => {
                this.showNotification(
                    'bottom',
                    'right',
                    'Thất bại! Gửi email không thành công!',
                    'danger');
                this.dialogRef.close();
            }
        );
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    showNotification(from, align, mess, type) {
        $.notify({
            icon: 'notifications',
            message: mess

        }, {
            type: type,
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

    createTranScriptHTML(grade) {
        return `
         <tr style="background:#faebd7">
            <td style="padding-top:5px; padding-bottom:5px; padding-right:20px; padding-left:20px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">${grade.courseID}</td>
            <td style="padding-top:5px; padding-bottom:5px; padding-right:20px; padding-left:20px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">${grade.courseName}</td>
            <td style="padding-top:5px; padding-bottom:5px; padding-right:20px; padding-left:20px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">${grade.credit}</td>
            <td style="padding-top:5px; padding-bottom:5px; padding-right:20px; padding-left:20px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">${grade.gradeVal}</td>
            <td style="padding-top:5px; padding-bottom:5px; padding-right:20px; padding-left:20px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">${grade.semester}</td>
        </tr>
        `
    }

    createTranScriptHTML_noBg(grade) {
        return `
         <tr>
            <td style="padding-top:5px; padding-bottom:5px; padding-right:20px; padding-left:20px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">${grade.courseID}</td>
            <td style="padding-top:5px; padding-bottom:5px; padding-right:20px; padding-left:20px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">${grade.courseName}</td>
            <td style="padding-top:5px; padding-bottom:5px; padding-right:20px; padding-left:20px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">${grade.credit}</td>
            <td style="padding-top:5px; padding-bottom:5px; padding-right:20px; padding-left:20px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">${grade.gradeVal}</td>
            <td style="padding-top:5px; padding-bottom:5px; padding-right:20px; padding-left:20px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">${grade.semester}</td>
        </tr>
        `
    }


    createMailHTML(transcriptTable, studentInfo) {
        return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <meta charset="utf-8"> <!-- utf-8 works for most cases -->
    <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
    <meta name="x-apple-disable-message-reformatting"> <!-- Disable auto-scale in iOS 10 Mail entirely -->
    <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->

    <!-- Web Font / @font-face : BEGIN -->
    <!-- NOTE: If web fonts are not required, lines 10 - 27 can be safely removed. -->

    <!-- Desktop Outlook chokes on web font references and defaults to Times New Roman, so we force a safe fallback font. -->
    <!--[if mso]>
            <style>
                * {
                    font-family: sans-serif !important;
                }
            </style>
        <![endif]-->

    <!-- All other clients get the webfont reference; some will render the font and others will silently fail to the fallbacks. More on that here: http://stylecampaign.com/blog/2015/02/webfont-support-in-email/ -->
    <!--[if !mso]><!-->
    <!-- insert web font reference, eg: <link href='https://fonts.googleapis.com/css?family=Roboto:400,700' rel='stylesheet' type='text/css'> -->
    <!--<![endif]-->

    <!-- Web Font / @font-face : END -->

    <!-- CSS Reset : BEGIN -->
    <style>
        /* What it does: Remove spaces around the email design added by some email clients. */
        /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
        html,
        body {
            margin: 0 auto !important;
            padding: 0 !important;
            height: 100% !important;
            width: 100% !important;
        }

        /* What it does: Stops email clients resizing small text. */
        * {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }

        /* What it does: Centers email on Android 4.4 */
        div[style*="margin: 16px 0"] {
            margin: 0 !important;
        }

        /* What it does: Stops Outlook from adding extra spacing to tables. */
        table,
        td {
            mso-table-lspace: 0pt !important;
            mso-table-rspace: 0pt !important;
        }

        /* What it does: Fixes webkit padding issue. Fix for Yahoo mail table alignment bug. Applies table-layout to the first 2 tables then removes for anything nested deeper. */
        table {
            border-spacing: 0 !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            margin: 0 auto !important;
        }

        table table table {
            table-layout: auto;
        }

        /* What it does: Uses a better rendering method when resizing images in IE. */
        img {
            -ms-interpolation-mode: bicubic;
        }

        /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
        a {
            text-decoration: none;
        }

        /* What it does: A work-around for email clients meddling in triggered links. */
        *[x-apple-data-detectors],
        /* iOS */
        .unstyle-auto-detected-links *,
        .aBn {
            border-bottom: 0 !important;
            cursor: default !important;
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
        .a6S {
            display: none !important;
            opacity: 0.01 !important;
        }

        /* If the above doesn't work, add a .g-img class to any image in question. */
        img.g-img+div {
            display: none !important;
        }

        /* Create one of these media queries for each additional viewport size you'd like to fix */

        /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
        @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
            u~div .email-container {
                min-width: 320px !important;
            }
        }

        /* iPhone 6, 6S, 7, 8, and X */
        @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
            u~div .email-container {
                min-width: 375px !important;
            }
        }

        /* iPhone 6+, 7+, and 8+ */
        @media only screen and (min-device-width: 414px) {
            u~div .email-container {
                min-width: 414px !important;
            }
        }
    </style>
    <!-- CSS Reset : END -->
    <!-- Reset list spacing because Outlook ignores much of our inline CSS. -->
    <!--[if mso]>
        <style type="text/css">
            ul,
            ol {
                margin: 0 !important;
            }
            li {
                margin-left: 30px !important;
            }
            li.list-item-first {
                margin-top: 0 !important;
            }
            li.list-item-last {
                margin-bottom: 10px !important;
            }
        </style>
        <![endif]-->

    <!-- Progressive Enhancements : BEGIN -->
    <style>
        /* What it does: Hover styles for buttons */
        .button-td,
        .button-a {
            transition: all 100ms ease-in;
        }

        .button-td-primary:hover,
        .button-a-primary:hover {
            background: #555555 !important;
            border-color: #555555 !important;
        }

        /* Media Queries */
        @media screen and (max-width: 600px) {

            /* What it does: Adjust typography on small screens to improve readability */
            .email-container p {
                font-size: 17px !important;
            }

        }
    </style>
    <!-- Progressive Enhancements : END -->

    <!-- What it does: Makes background images in 72ppi Outlook render at correct size. -->
    <!--[if gte mso 9]>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->

</head>
<!--
        The email background color (#222222) is defined in three places:
        1. body tag: for most email clients
        2. center tag: for Gmail and Inbox mobile apps and web versions of Gmail, GSuite, Inbox, Yahoo, AOL, Libero, Comcast, freenet, Mail.ru, Orange.fr
        3. mso conditional: For Windows 10 Mail
    -->

<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; ">
    <center style="width: 100%; ">
        <!--[if mso | IE]>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="">
        <tr>
        <td>
        <![endif]-->

        <!-- Visually Hidden Preheader Text : BEGIN -->
        <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
            [Cổng thông tin xác thực bảng điểm] - Kết quả xác thực!
        </div>
        <!-- Visually Hidden Preheader Text : END -->

        <!-- Create white space after the desired preview text so email clients don’t pull other distracting text into the inbox preview. Extend as necessary. -->
        <!-- Preview Text Spacing Hack : BEGIN -->
        <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
            &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        </div>
        <!-- Preview Text Spacing Hack : END -->

        <!--
                Set the email width. Defined in two places:
                1. max-width for all clients except Desktop Windows Outlook, allowing the email to squish on narrow but never go wider than 600px.
                2. MSO tags for Desktop Windows Outlook enforce a 600px width.
            -->
        <div style="max-width: 800px; margin: 0 auto;" class="email-container">
            <!--[if mso]>
                <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600">
                <tr>
                <td>
                <![endif]-->

            <!-- Email Body : BEGIN -->
            <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 auto;">
                <!-- Email Header : BEGIN -->
                <tr>
                    <td style="padding: 20px 0; text-align: center">
                    </td>
                </tr>
                <!-- Email Header : END -->



                <!-- 1 Column Text + Button : BEGIN -->
                <tr>
                    <td style="background-color: #ffffff;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                                <td style="padding: 20px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
                                   
                                    <p style="margin-top: 1;margin-bottom: 0; text-align: left">
                                        <strong>Cổng thông xin xác thực bảng điểm sinh viên
                                        </strong>
                                    </p>
                                    <p style="margin: 0; text-align: left; padding: 0">
                                        <strong>gửi quý Doanh nghiệp/Tổ chức</strong>
                                    </p>
                                    <p style="margin-top: 1; margin-bottom: 0;text-align: left ">
                                        <strong> Thông tin bảng điểm</strong>
                                        <br>
                                        Sinh viên <strong>${studentInfo.info.name}</strong>
                                        <br>
                                        MSSV: ${studentInfo.stdID} - Khóa: ${studentInfo.intakeYear}
                                        <br>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <!-- 1 Column Text + Button : END -->

                <tr>
                    <td style="background-color: #ffffff;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                                <td style="padding-top:10px;padding-bottom:5px;padding-right:15px;padding-left:20px; font-family: sans-serif; font-size: 15px; line-height: 30px; color: #555555;"><b>Mã Môn Học</b></td>
                                <td style="padding-top:10px;padding-bottom:5px;padding-right:20px;padding-left:20px; font-family: sans-serif; font-size: 15px; line-height: 30px; color: #555555;">
                                <b>Tên Môn Học</b>
                                </td>
                                <td style="padding-top:10px;padding-bottom:5px;padding-right:20px;padding-left:20px; font-family: sans-serif; font-size: 15px; line-height: 30px; color: #555555;">
                                <b>Số Tín chỉ</b>
                                </td><td style="padding-top:10px;padding-bottom:5px;padding-right:20px;padding-left:20px; font-family: sans-serif; font-size: 15px; line-height: 30px; color: #555555;">
                                <b>Điểm</b>
                                </td><td style="padding-top:10px;padding-bottom:5px;padding-right:20px;padding-left:20px; font-family: sans-serif; font-size: 15px; line-height: 30px; color: #555555;">
                                <b>Học kỳ</b>
                                </td>
                            </tr>
                             ${transcriptTable}
                        </table>
                    </td>
                </tr>

            </table>
            <!-- Email Body : END -->

            <!-- Email Footer : BEGIN -->
            <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 auto;">
                <tr>
                    <td style="padding: 20px; font-family: sans-serif; font-size: 12px; line-height: 15px; text-align: center; color: #888888;">
                        <span style="color: #cccccc; text-decoration: underline; font-weight: bold;"></span>
                        <br><span class="unstyle-auto-detected-links">Document Verification Network<br></span>
                        Powered by <span style="color: #888888; text-decoration: underline;">ToanHD</span>
                    </td>
                </tr>
            </table>
            <!-- Email Footer : END -->

            <!--[if mso]>
                </td>
                </tr>
                </table>
                <![endif]-->
        </div>

        <!-- Full Bleed Background Section : BEGIN -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #709f2b;">
            <tr>
                <td valign="top">
                    <div align="center" style="max-width: 600px; margin: auto;" class="email-container">
                        <!--[if mso]>
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" align="center">
                            <tr>
                            <td>
                            <![endif]-->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                                <td style="padding: 20px; text-align: left; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #ffffff;">
                                    <p style="text-align: center; margin: 0;">CỔNG THÔNG TIN XÁC THỰC BẢNG ĐIỂM SINH VIÊN</p>
                                </td>
                            </tr>
                        </table>
                        <!--[if mso]>
                            </td>
                            </tr>
                            </table>
                            <![endif]-->
                    </div>
                </td>
            </tr>
        </table>
        <!-- Full Bleed Background Section : END -->

        <!--[if mso | IE]>
        </td>
        </tr>
        </table>
        <![endif]-->
    </center>
</body>

</html>
`
    }
}
