import { Injectable } from '@angular/core';

import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataGridModel, ListResponse, SortingModel } from '../interfaces/grid.interface';
import { ErrorService } from './error.service';
import { LoginService } from './login.service';
import { environment } from '../../environments/environment';

export interface Stock {
    name: string,
    price: number,
    stock: number
}

@Injectable({
    providedIn: 'root'
})

export class StockService {

    private url: string = `${environment.apiUrl}stock`;
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
        return this.httpClient.put<ListResponse<Stock>>(this.url, { gridModel, sortingModel, filters }, this.httpHeader)
            .pipe(
                catchError(this.errorService.errorHandler)
            )
    }

    reposition(products: any): any {
        return this.httpClient.put<void>(`${this.url}/reposition`, { products }, this.httpHeader)
            .pipe(
                catchError(this.errorService.errorHandler)
            )
    }

    sell(id: number, amount: number): any {
        return this.httpClient.put<void>(`${this.url}/${id}/out`, { amount }, this.httpHeader)
            .pipe(
                catchError(this.errorService.errorHandler)
            )
    }
}
