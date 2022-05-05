import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ValidationService } from 'src/app/services/validation.service';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    brand_name: string = environment.brandName;
    username: string = null;

    constructor(
        private loginService: LoginService,
        private validationService: ValidationService
    ) { }

    ngOnInit(): void {
        this.username = this.loginService.getUser();
    }

    logout() {
        this.loginService.logout();
    }

    validatePermission() {
        return this.validationService.hasPermission();
    }

}
