import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataGridModel, ListResponse, SortingModel } from '../interfaces/grid.interface';
import { ErrorService } from './error.service';
import { LoginService } from './login.service';
import { environment } from '../../environments/environment';

export interface Product {
    product_id: number;
    name: string;
    description: string;
    waist: string;
    price: number;
    min_stock: number;
    total_stock: number;
    active: boolean;
    image: string;
    created_at: string;
    updated_at: string;
}

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    private url: string = `${environment.apiUrl}product`;
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

    getProduct(id: number): any {
        return this.httpClient.get<Product[]>(`${this.url}/${id}`, this.httpHeader)
            .pipe(
                catchError(this.errorService.errorHandler)
            )
    }

    getList(gridModel: DataGridModel, sortingModel: SortingModel, filters: Object): any {
        return this.httpClient.put<ListResponse<Product>>(this.url, { gridModel, sortingModel, filters }, this.httpHeader)
            .pipe(
                catchError(this.errorService.errorHandler)
            )
    }

    getProductsToSell(gridModel: DataGridModel, sortingModel: SortingModel, filters: Object): any {
        return this.httpClient.put<ListResponse<any>>(`${this.url}/toSell`, { gridModel, sortingModel, filters }, this.httpHeader)
            .pipe(
                catchError(this.errorService.errorHandler)
            )
    }

    getProductStock(): any {
        return this.httpClient.get<Product[]>(`${this.url}/stock`, this.httpHeader)
            .pipe(
                catchError(this.errorService.errorHandler)
            )
    }

    deleteProduct(id: number): any {
        return this.httpClient.delete<void>(`${this.url}/${id}`, this.httpHeader)
            .pipe(
                catchError(this.errorService.errorHandler)
            )
    }

    updateProduct(id: number, product: Product): any {
        return this.httpClient.put<void>(`${this.url}/${id}`, product, this.httpHeader)
            .pipe(
                catchError(this.errorService.errorHandler)
            )
    }

    createProduct(product: Product): any {
        return this.httpClient.post<void>(`${this.url}`, product, this.httpHeader)
            .pipe(
                catchError(this.errorService.errorHandler)
            )
    }
}
