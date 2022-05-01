import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sell-list',
    templateUrl: './sell-list.component.html',
    styleUrls: ['./sell-list.component.scss']
})
export class SellListComponent implements OnInit {
    title: string = 'Listado de Ventas';

    constructor() { }

    ngOnInit(): void {
    }

}
