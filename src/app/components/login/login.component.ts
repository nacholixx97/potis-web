import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faAngular } from '@fortawesome/free-brands-svg-icons';
import { faLock, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/services/login.service';
import { MailService } from 'src/app/services/mail.service';
import { ModalService } from 'src/app/services/modal.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    angularIcon: IconDefinition = faAngular;
    userIcon: IconDefinition = faUser;
    passwordIcon: IconDefinition = faLock;

    recoverEmail: string = '';

    loginForm: FormGroup = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    constructor(
        private loginService: LoginService,
        private router: Router,
        private toastService: ToastService,
        private modalService: ModalService,
        private mailService: MailService
    ) { }

    ngOnInit(): void {
        if (this.loginService.getToken())
            this.router.navigate(['/']);
    }

    public onSubmit(): void {
        const credentials = this.loginForm.value;
        this.loginService.login(credentials).subscribe((res: any) => {
            if (res.body.token) {
                localStorage.setItem('token', res.body.token);
                localStorage.setItem('username', res.body.user.username);
                this.router.navigate(['/']);
                this.toastService.successToast('Bienvenido de nuevo.');
            }
        });
    }

    public openRecoverModal(): void {
        this.modalService.open('modalRecoverPassword');
    }

    public recoverPassword(): void {
        this.mailService.recoverPassword(this.recoverEmail).subscribe((res: any) => {
            if (res.body.message) {
                this.toastService.dangerToast(res.body.message);
            }else{
                this.toastService.successToast('Email enviado.');
                this.toastService.successToast('Por favor, revise su bandeja de entrada.');
            }
        });
        this.recoverEmail = '';
        this.modalService.close('modalRecoverPassword');
    }

}
