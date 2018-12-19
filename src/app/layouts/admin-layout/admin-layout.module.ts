import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {TableListComponent} from '../../table-list/table-list.component';
import {TypographyComponent} from '../../typography/typography.component';
import {IconsComponent} from '../../icons/icons.component';
import {MapsComponent} from '../../maps/maps.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {UpgradeComponent} from '../../upgrade/upgrade.component';
import {ManageStudentComponent} from '../../manage-student/manage-student.component';
import {ManageStudentDialogComponent} from '../../manage-student/manage-student-dialog'
import {ManageLecturerComponent} from '../../manage-lecturer/manage-lecturer.component';
import {ManageLecturerDialogComponent} from '../../manage-lecturer/manage-lecturer-dialog'
import {GradingComponent} from '../../grading/grading.component';
import {TranscriptComponent} from '../../transcript/transcript.component';
import {TranscriptDialogComponent} from '../../transcript/transcript-dialog'
import {ManageRequestComponent} from '../../manage-request/manage-request.component'
import {RequestDialogComponent} from '../../manage-request/request-dialog';
import {StudentService} from '../../student-services/student.service';
import {LecturerService} from '../../lecturer-services/lecturer-service.service';
import {GradingService} from '../../grading-services/grading-service.service';
import {TranscriptService} from '../../transcript-services/transcript-service.service';
import {HttpModule} from '@angular/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DatePipe} from '@angular/common';


import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatNativeDateModule,
    MatAutocompleteModule
} from '@angular/material';
import {RequestService} from '../../request.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatDialogModule,
        ReactiveFormsModule,
        HttpModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule,
    ],
    declarations: [
        DashboardComponent,
        UserProfileComponent,
        TableListComponent,
        TypographyComponent,
        IconsComponent,
        MapsComponent,
        NotificationsComponent,
        UpgradeComponent,
        ManageStudentComponent,
        ManageStudentDialogComponent,
        ManageLecturerComponent,
        ManageLecturerDialogComponent,
        GradingComponent,
        TranscriptComponent,
        TranscriptDialogComponent,
        ManageRequestComponent,
        RequestDialogComponent
    ],
    entryComponents: [
        ManageStudentDialogComponent,
        ManageLecturerDialogComponent,
        TranscriptDialogComponent,
        RequestDialogComponent
    ],
    providers: [
        StudentService,
        LecturerService,
        GradingService,
        TranscriptService,
        DatePipe,
        RequestService
    ]
})

export class AdminLayoutModule {
}
