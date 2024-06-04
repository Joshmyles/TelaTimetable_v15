import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgmaterialModule } from 'src/shared/ngmaterial.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LogInComponent } from './log-in/log-in.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { OtpComponent } from './otp/otp.component';

@NgModule({
  declarations: [LogInComponent, OtpComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    NgOtpInputModule,
    ReactiveFormsModule,
    NgmaterialModule,
  ],
})
export class AuthenticationModule {}
