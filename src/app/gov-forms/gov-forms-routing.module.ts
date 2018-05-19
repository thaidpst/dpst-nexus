import { NgModule, Injectable } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminRouteGuard } from '../services/auth-guard.service';

import { GovFormsComponent } from './gov-forms.component';
import { GovForm1Component } from './gov-form1/gov-form1.component';


const routes: Routes = [
  {
    path: 'form', component: GovFormsComponent,
    children: [
      {
        path: 'gov-form1', component: GovForm1Component,
      },
      { path: '', redirectTo: '/forms', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GovFormsRoutingModule { }
