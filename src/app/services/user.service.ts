import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { DataGridModel, ListResponse, SortingModel } from '../interfaces/grid.interface';
import { ErrorService } from './error.service';
import { LoginService } from './login.service';
import { environment } from '../../environments/environment';

export interface User {
    user_id: number;
    name: string;
    lastname: string;
    username: string;
    email: string;
    active: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private url: string = `${environment.apiUrl}user`;
    private httpHeader = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'access-token': this.loginService.getToken()
        })
    }

    constructor(
        private httpClient: HttpClient,
        private errorService: ErrorService,
        private loginService: LoginService
    ) { }
    
    getList(gridModel: DataGridModel, sortingModel: SortingModel, filters: Object): any {
        return this.httpClient.put<ListResponse<User>>(this.url, { gridModel, sortingModel, filters }, this.httpHeader)
            .pipe(
                catchError(this.errorService.errorHandler)
            )
    }

    getById(id: number): any {
        return this.httpClient.get<User>(`${this.url}/${id}`, this.httpHeader)
            .pipe(
                catchError(this.errorService.errorHandler)
            )
    }

    delete(id: number): any {
        return this.httpClient.delete<void>(`${this.url}/${id}`, this.httpHeader)
            .pipe(
                catchError(this.errorService.errorHandler)
            )
    }

    update(id: number, user: User): any {
        return this.httpClient.put<void>(`${this.url}/${id}`, user, this.httpHeader)
            .pipe(
                catchError(this.errorService.errorHandler)
            )
    }

    create(user: User): any {
        return this.httpClient.post<void>(`${this.url}`, user, this.httpHeader)
            .pipe(
                catchError(this.errorService.errorHandler)
            )
    }

    changePassword(password: string, confirmPassword: string): any {
        return this.httpClient.put<void>(`${this.url}/changePassword`, { password, confirmPassword }, this.httpHeader)
            .pipe(
                catchError(this.errorService.errorHandler)
            )
    }
}
