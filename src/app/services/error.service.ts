import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { ModalService } from './modal.service';
import { PageLoaderService } from './page-loader.service';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    private error$: Subject<string> = new BehaviorSubject<string>('');

    constructor(
        private modalService: ModalService,
        private pageLoaderService: PageLoaderService,
        private router: Router
    ) { 
        this.errorHandler = this.errorHandler.bind(this);
    }

    emitError(error: string) {
        this.error$.next(error);
        this.modalService.open('modalError');
    }

    get error() {
        return this.error$.asObservable();
    }

    setError(error: string) {
        this.error$.next(error);
    }

    errorHandler(error: any) {
        if (error.error instanceof ErrorEvent) {
            this.pageLoaderService.hide();
            this.emitError(error.error.message);
        } else {
            if (error.status == 500) {
                this.pageLoaderService.hide();
                this.emitError('Ha ocurrido un error');
            } else if (error.status == 404 && error.error.message === 'Token inválida.' && this.router.url !== '/login') {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                this.pageLoaderService.hide();
                this.emitError('Su sesión ha caducado. Por favor ingrese nuevamente.');
            }else {
                this.pageLoaderService.hide();
                this.emitError(error.error.message);
            }
        }
        return of([]);
    }
}
