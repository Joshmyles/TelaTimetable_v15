import { Injectable, inject } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoggedUserProfileDto } from './user-managment-dto';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from 'src/shared/school-filter/school-filter.service';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private httpClient: HttpClient = inject(HttpClient);
  private USER_BASE_URL = `${environment.BASE_URL}/SystemUserProfiles`;

  loggedUserProfile(): Observable<ResponseDto<LoggedUserProfileDto>> {
    return this.httpClient
      .get<ResponseDto<LoggedUserProfileDto>>(
        `${this.USER_BASE_URL}/loggedUserProfile`
      )
      .pipe(retry(3));
  }

  get LoggedUserProfile(): LoggedUserProfileDto {
    const profileStr = <string>(
      localStorage.getItem(environment.LOGGED_USER_PROFILE)
    );
    return JSON.parse(profileStr);
  }
}
