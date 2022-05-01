import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { ErrorService } from './services/error.service';
import { LoginService } from './services/login.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    errorMessage: string = 'Ha ocurrido un error';

    private _subscribed: boolean = true;

    constructor (
        private errorService: ErrorService,
        private router: Router,
        private loginService: LoginService
    ) {}

    ngOnInit(): void {
        this.subscribe();
    }

    public isLogin(): boolean {
        this.validateLogin();
        return this.router.url === '/login';
    }

    private validateLogin(): void {
        const token: string = this.loginService.getToken();
        if (!token && this.router.url !== '/login') {
            this.router.navigate(['/login']);
        }
    }

    private subscribe() {
        this.errorService.error
            .pipe(takeWhile(() => this._subscribed))
            .subscribe(message => {
                if (!!message) {
                    this.errorMessage = message;
                }
            });
    }
    
}
