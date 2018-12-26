import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {OpenPortalComponent} from './open-portal/open-portal.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'open-portal',
        pathMatch: 'full',
    },
    {path: 'open-portal', component: OpenPortalComponent},
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [],
})
export class AppRoutingModule {
}
