import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {

    constructor(
        private loginService: LoginService,
        private router: Router
    ) { }

    hasPermission(): boolean {
        return this.loginService.getUser() === 'admin';
    }

    validatePermissionAndRedirect(): void {
        if (!this.hasPermission()) {
            this.router.navigate(['/']);
        }
    }
}
