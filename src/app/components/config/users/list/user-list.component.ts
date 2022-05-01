import { Component, OnInit } from '@angular/core';
import { faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-users',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    title: string = 'Usuarios';
    addIcon: IconDefinition = faPlus;

    constructor() { }

    ngOnInit(): void {
    }

}
