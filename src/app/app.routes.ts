import { Routes } from '@angular/router';
import { BookListComponent } from '../Book/book-list/book-list.component';
import { BookOpsComponent } from '../Book/book-ops/book-ops.component';
import { NotFound404Component } from './shared/not-found404/not-found404.component';
import { DashboardComponent } from './dashboard/dashboard.component';


export const routes: Routes = [
    {
        path: 'book-list',
        component: BookListComponent
    },
    {
        path: 'book-create',
        component: BookOpsComponent
    },
    {
        path: 'book-edit/:guid',
        component: BookOpsComponent
    },
    {
        path: '',
        component: DashboardComponent,
        // redirectTo: 'error/404',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: NotFound404Component,
        // redirectTo: 'error/404',
        pathMatch: 'full'
    }
];
