import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, retry, tap, exhaustMap, map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserManagementService } from '../usermanagement/user-management.service';
import { LoggedUserProfileDto } from '../usermanagement/user-managment-dto';
import { LoginRequestDto, LoginResponse } from './authentication.dto';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from 'src/shared/school-filter/school-filter.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private router: Router = inject(Router);
  private http: HttpClient = inject(HttpClient);
  private userManagementService: UserManagementService = inject(
    UserManagementService
  );

  constructor() {}

  get Token(): string | null {
    return localStorage.getItem(environment.Auth_TOKEN_KEY);
  }

  private setLoggedUserProfile(profile: LoggedUserProfileDto) {
    localStorage.setItem(
      environment.LOGGED_USER_PROFILE,
      JSON.stringify(profile)
    );
  }

  private setToken(token: string) {
    localStorage.setItem(environment.Auth_TOKEN_KEY, token);
  }

  /**
   *
   * @deprecated
   */
  login(dto: LoginRequestDto): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.BASE_URL}/auth/login`, dto)
      .pipe(
        retry(3),
        tap((response) => {
          console.log('Login response ', response);
          this.setToken(response.token);
        }),
        exhaustMap((_) =>
          this.userManagementService.loggedUserProfile().pipe(
            tap((response) => console.log('response ', response)),
            retry(3)
          )
        ),
        map((response) => {
          console.log('Logined In ', response.data);
          this.setLoggedUserProfile(response.data);
          return {
            token: 'string',
            message: 'success fully logged in',
            response: true,
          };
        }),
        catchError((error) => {
          localStorage.clear();
          throw error;
        })
      );
  }

  login2(
    dto: LoginRequestDto
  ): Observable<ResponseDto<{ passwordExpired: boolean; message: string }>> {
    return this.http
      .post<ResponseDto<{ passwordExpired: boolean; message: string }>>(
        `${environment.BASE_URL}/auth/login2`,
        dto
      )
      .pipe(
        retry(3),
        catchError((error) => {
          localStorage.clear();
          throw error;
        })
      );
  }

  verifyLoginOtp(otp: { username: string; code: number }) {
    return this.http
      .post<LoginResponse>(`${environment.BASE_URL}/auth/verifyLoginOtp`, otp)
      .pipe(
        retry(3),
        tap((response) => {
          this.setToken(response.token);
        }),
        exhaustMap((_) =>
          this.userManagementService.loggedUserProfile().pipe(retry(3))
        ),
        map((response) => {
          // console.log("profile " , response)
          this.setLoggedUserProfile(response.data);
          return {
            token: 'string',
            message: 'success fully logged in',
            response: true,
          };
        }),
        catchError((error) => {
          localStorage.clear();
          throw error;
        })
      );
  }

  resetOtp(email: string): Observable<ResponseDto<string>> {
    return this.http
      .post<ResponseDto<string>>(
        `${environment.BASE_URL}/auth/resetOtp/${email}`,
        {}
      )
      .pipe(
        retry(3),
        catchError((error) => {
          localStorage.clear();
          throw error;
        })
      );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/Auth']);
  }
}
