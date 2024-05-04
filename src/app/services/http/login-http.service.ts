import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client-service';
import { LoginResponseDto } from '../../models/login/login-response-dto';
import { LoginDto } from '../../models/login/login-dto';
import { environment } from '../../../environments/environment.development';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginHttpService  {

  constructor(private httpClientService: HttpClientService) {
    
  }

  public login(body: LoginDto): Promise<LoginResponseDto> {
    return new Promise((resolve, reject) => {
      const url: string = environment.apiUrl + 'login';
      this.httpClientService.post(url, body).subscribe((response: LoginResponseDto) => {
        resolve(response);
      }, (error: HttpErrorResponse) => {
        reject(error);
      });
    })
  }
}
