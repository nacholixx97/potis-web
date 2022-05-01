import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faBars, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from 'src/app/services/modal.service';
import { PageLoaderService } from 'src/app/services/page-loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { User, UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
    edit: boolean = false;
    menuIcon: IconDefinition = faBars;
    user: User = null;
    title: string = 'Detalle usuario #';
    titleEdition: string = 'Editando usuario #';
    userForm: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        active: new FormControl('', [Validators.required])
    }); 

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private toastService: ToastService,
        private pageLoaderService: PageLoaderService,
        private modalService: ModalService,
    ) { }

    ngOnInit(): void {
        const id: number = this.activatedRoute.snapshot.paramMap.get('id') as unknown as number;
        this.getUser(id);
        this.userForm.disable();
    }

    getUser(id: number): User {
        return this.userService.getById(id).subscribe((res: any) => {
            this.user = res.body as User;
            this.title += `${this.user.user_id}`;
            this.titleEdition += `${this.user.user_id}`;
            this.userForm.setValue(
                {
                    name: this.user.name,
                    lastname: this.user.lastname,
                    username: this.user.username,
                    email: this.user.email,
                    active: this.user.active
                });
        })
    }

    getUsername(): string {
        return this.userForm.get('username').value;
    }

    onSubmit() {
        this.pageLoaderService.show('Actualizando Usuario...');

        const user = this.userForm.value;
        this.userService.update(this.user.user_id, user).subscribe((res: any) => {
            this.pageLoaderService.hide();
            this.toggleEdit();
            this.toastService.successToast('Usuario actualizado con éxito.');
        });
    }

    toggleEdit() {
        if (this.edit)
            this.userForm.disable();
        else
            this.userForm.enable();
        
        this.edit = !this.edit;
    }

    openDeletionModal() {
        this.modalService.open('modalDelete');
    }

    closeDeletionModal() {
        this.modalService.close('modalDelete');
    }

    isEditing(): boolean {
        return this.edit;
    }

    delete() {
        this.pageLoaderService.show('Eliminando Usuario...');
        this.userService.delete(this.user.user_id).subscribe(() => {
            this.closeDeletionModal();
            this.pageLoaderService.hide();
            this.router.navigate(['/config/user/list'])
            this.toastService.successToast('Usuario eliminado con éxito.');
        })
    }

}
