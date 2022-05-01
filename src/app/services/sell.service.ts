import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { DataGridModel, ListResponse, SortingModel } from '../interfaces/grid.interface';
import { ErrorService } from './error.service';
import { LoginService } from './login.service';

@Injectable({
    providedIn: 'root'
})
export class SellService {

    private url: string = 'http://localhost:3000/api/sell';
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

    add(products: any[]) {
        return this.httpClient.post<void>(`${this.url}`, { products }, this.httpHeader)
            .pipe(
                catchError(this.errorService.errorHandler)
            )
    }

    getList(gridModel: DataGridModel, sortingModel: SortingModel, filters: Object): any {
        return this.httpClient.put<ListResponse<any>>(this.url, { gridModel, sortingModel, filters }, this.httpHeader)
            .pipe(
                catchError(this.errorService.errorHandler)
            )
    }

    getSell(id: number) {
        return this.httpClient.get<ListResponse<any>>(`${this.url}/${id}`, this.httpHeader)
            .pipe(
                catchError(this.errorService.errorHandler)
            )
    }

    return(id: number) {
        return this.httpClient.get<void>(`${this.url}/${id}/return`, this.httpHeader)
            .pipe(
                catchError(this.errorService.errorHandler)
            )
    }
}
