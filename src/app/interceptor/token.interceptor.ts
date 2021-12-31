import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../service/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  private userService: UserService | null = null;

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.userService = this.injector.get(UserService);
    const token: string | null = this.userService.getToken();
    req = req.clone({
      setHeaders: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    return next.handle(req);
  }
}