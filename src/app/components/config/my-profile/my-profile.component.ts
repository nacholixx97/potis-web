import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PageLoaderService } from 'src/app/services/page-loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
    title: string = 'Mi Perfil';
    changePassForm: FormGroup = new FormGroup({
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
        showPass: new FormControl(false)
    })

    constructor(
        private userService: UserService,
        private pageLoaderService: PageLoaderService,
        private toastService: ToastService
    ) { }

    ngOnInit(): void {
    }

    validatePassword(): boolean {
        return this.changePassForm.get('password').value === this.changePassForm.get('confirmPassword').value;
    }

    togglePass(): void {
        const password: any = document.getElementById('password');
        const confirmPassword: any = document.getElementById('confirmPassword');
        if (this.changePassForm.get('showPass').value) {
            password.type = 'text';
            confirmPassword.type = 'text';
        } else {
            password.type = 'password';
            confirmPassword.type = 'password';
        }
    }

    onSubmit() {
        const data = this.changePassForm.value;
        this.userService.changePassword(data.password, data.confirmPassword).subscribe(() => {
            this.pageLoaderService.hide();
            this.toastService.successToast('Contraseña actualizada con éxito.');
            this.changePassForm.reset();
        });
    }

}
