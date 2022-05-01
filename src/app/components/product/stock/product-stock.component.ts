import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-product-stock',
    templateUrl: './product-stock.component.html',
    styleUrls: ['./product-stock.component.scss']
})
export class ProductStockComponent implements OnInit {
    title: string = 'Stock de Productos';

    constructor() { }

    ngOnInit(): void {
    }

}
