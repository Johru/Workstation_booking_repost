// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { Observable } from "rxjs";

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//     intercept(req: HttpRequest<any>,
//               next: HttpHandler): Observable<HttpEvent<any>> {

//         const idToken = localStorage.getItem("token");
//         console.log(idToken)
//         if (idToken) {
//             const cloned = req.clone({
//                 headers: req.headers.set("Authorization",
//                     "Bearer " + idToken)
//             });

//             return next.handle(cloned);
//         }
//         else {
//             return next.handle(req);
//         }
//     }
// }

// import { AuthService } from "./auth.service";
// import { Injectable } from "@angular/core";
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { Observable } from "rxjs";
// import { environment } from "src/environments/environment";

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//   constructor(
//     private authService: AuthService
//   ) { }

//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//      // This is my helper method to fetch the data from localStorage.
//       const token: string | null = localStorage.getItem("token");

//           const params = request.params;
//           console.log(params)
//           let headers = request.headers;

//           if (token) {
//             // set the accessToken to your header
//             headers = headers.set('accessToken', token);
//           }

//           request = request.clone({
//             params,
//             headers
//           });

//       return next.handle(request);
//     }
// }

// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { Injectable, Injector } from "@angular/core";
// import { Observable } from "rxjs";
// import { AuthService } from "./auth.service";

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//     constructor ( private injector:Injector){}

//     intercept(req: HttpRequest<any>,
//               next: HttpHandler): Observable<HttpEvent<any>> {
//         let authService = this.injector.get(AuthService)
//         let tokenizedReq = req.clone({
//             setHeaders:{
//                 Authorization:`Bearer ${authService.isAuthenticated()}`
//             }
//         })

//             return next.handle(tokenizedReq);

//     }
// }

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem('token');

    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    return next.handle(cloned);
  }
}
