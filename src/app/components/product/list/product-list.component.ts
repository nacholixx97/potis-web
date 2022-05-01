import { Component, OnInit } from '@angular/core';
import { faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {
    title: string = 'Listado de Productos';
    addIcon: IconDefinition = faPlus;
    
    constructor(
    ) { }

    ngOnInit(): void {
    }

    refreshData() {
    }
}
