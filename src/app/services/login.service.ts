import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ErrorService } from './error.service';

export interface LoginRequest {
    username: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private url: string = 'http://localhost:3000/api/auth';
    private httpHeader = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    constructor(
        private httpClient: HttpClient,
        private errorService: ErrorService,
        private router: Router
    ) { }

    getToken(): string {
        return localStorage.getItem('token');
    }

    getUser(): string {
        return localStorage.getItem('username');
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.router.navigate(['/login']);
    }

    login(data: LoginRequest): any {
        return this.httpClient.post<void>(`${this.url}`, data, this.httpHeader)
            .pipe(
                catchError(this.errorService.errorHandler)
            )
    }
}
