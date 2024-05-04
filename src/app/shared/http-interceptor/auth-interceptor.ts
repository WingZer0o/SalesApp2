import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { AuthGuardService } from '../../services/http/auth-guard.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authGuardService: AuthGuardService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.authGuardService.getToken();
    if (authToken) {
        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        const authReq = req.clone({
          headers: req.headers.set('Authorization', authToken)
        });
        // send cloned request with header to the next handler.
        return next.handle(authReq).pipe(catchError((error) => {
          if (error.status === 401) {
            this.authGuardService.unauthorizedLogout();
          }
          throw error;
        }));
    } else {
        return next.handle(req);
    }
  }
}