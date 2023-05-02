import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { TestErrorComponent } from './test-error/test-error.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NavBarComponent,
    TestErrorComponent,
    ServerErrorComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    NgxSpinnerModule,
    SharedModule,
    ToastrModule.forRoot({
      positionClass: 'toast-center-center',
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'decreasing',
      timeOut: 3000,
    }),
  ],
  exports: [NavBarComponent, NgxSpinnerModule],
})
export class CoreModule {}
