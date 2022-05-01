import { Component, Input, OnInit } from '@angular/core';
import { SortingModel } from 'src/app/interfaces/grid.interface';
import { ConfigService } from 'src/app/services/config.service';
import { PageLoaderService } from 'src/app/services/page-loader.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
    selector: 'app-stock-table',
    templateUrl: './stock-table.component.html',
    styleUrls: ['./stock-table.component.scss']
})
export class StockTableComponent implements OnInit {
    // Bindings
    @Input() dataProvider: any = null;

    // Variables de tabla.
    dataSource: any = [];
    headers: string[] = [
        '#',
        'Nombre',
        'Precio',
        'Stock',
        'Stock Mínimo'
    ];
    keys: Object[] = [
        { name: 'product_id', type: ''}, 
        { name: 'name', type: ''}, 
        { name: 'price', type: 'currency'}, 
        { name: 'total_stock', type: ''}, 
        { name: 'min_stock', type: ''}, 
    ];
    actions: any = [];
    rowConditions: any = {
        function: (firstValue: number, secondValue: number, condition: string) => {
            if (condition == '<=')
                return firstValue <= secondValue;
            else
                return firstValue == secondValue;
        },
        firstCondition: 'total_stock',
        condition: '<=',
        secondCondition: 'min_stock',
        class: 'table-danger'
    }
    
    // Variables de filtración
    filters: Object[] = [
        { name: 'Nombre', key: 'name', type: 'text', value: '' },
        { name: 'Activo', key: 'active', type: 'check', value: true },
    ];
    sortingModel: SortingModel = {
        sortBy: 'product_id',
        sortDirection: 'desc'
    };
    
    // Variables de paginación
    selectedPage: number = 1;
    pageSize: number = this.configService.getPageSize();
    totalRows: number = 0;
    totalPages: number = 1;
    
    // Variables
    selectedProduct: number = null;

    constructor(
        private stockService: StockService,
        private pageLoaderService: PageLoaderService,
        private configService: ConfigService
    ) { 
        this.getList = this.getList.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }

    ngOnInit(): void {
        this.getList();
    }

    getList() {
        this.pageLoaderService.show('Buscando...');

        this.stockService.getList({ selectedPage: this.selectedPage, pageSize: this.pageSize}, this.sortingModel, this.filters).subscribe((res: any) => {
            this.dataSource = res.body.data;
            this.totalRows = res.body.totalRows;
            this.totalPages = res.body.totalPages;

            this.pageLoaderService.hide();
        })
    }

    previousPage() {
        this.selectedPage--;
        this.getList();
    }

    nextPage() {
        this.selectedPage++;
        this.getList();
    }

}
