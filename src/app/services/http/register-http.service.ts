import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client-service';
import { RegisterUserRequestDto } from '../../models/register/register-user-dto';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RegisterHttpService {

  constructor(private httpService: HttpClientService) { }

  public registerUser(dto: RegisterUserRequestDto): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = environment.apiUrl + 'register';
      this.httpService.post(url, dto).subscribe(() => {
        resolve();
      }, (error) => {
        reject(error);
      })
    });
  }
}
