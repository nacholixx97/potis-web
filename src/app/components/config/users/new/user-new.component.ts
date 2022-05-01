import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageLoaderService } from 'src/app/services/page-loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-user-new',
    templateUrl: './user-new.component.html',
    styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {
    title: string = 'Nuevo Usuario';
    userForm: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
    }); 

    constructor(
        private userService: UserService,
        private toastService: ToastService,
        private pageLoaderService: PageLoaderService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    onSubmit() {
        this.pageLoaderService.show('Creando Usuario...');

        const user = this.userForm.value;
        this.userService.create(user).subscribe(() => {
            this.pageLoaderService.hide();
            this.router.navigate(['/config/user/list']);
            this.toastService.successToast('Usuario creado con éxito.');
        });
    }

}
