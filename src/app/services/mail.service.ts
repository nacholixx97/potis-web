import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable({
    providedIn: 'root'
})
export class MailService {

    private url: string = 'http://localhost:3000/api/mail';
    private httpHeader = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    constructor(
        private httpClient: HttpClient,
        private errorService: ErrorService
    ) { }

    recoverPassword(mail: string) {
        return this.httpClient.post<void>(`${this.url}/recoverPassword`, { sendTo: mail }, this.httpHeader)
            .pipe(
                catchError(this.errorService.errorHandler)
            )
    }
}
