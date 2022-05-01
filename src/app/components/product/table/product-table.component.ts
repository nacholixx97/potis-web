import { Component, Input, OnInit } from '@angular/core';
import { faSearch, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SortingModel } from 'src/app/interfaces/grid.interface';
import { ConfigService } from 'src/app/services/config.service';
import { PageLoaderService } from 'src/app/services/page-loader.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-product-table',
    templateUrl: './product-table.component.html',
    styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {
    // Variables de tabla.
    searchIcon: IconDefinition = faSearch;
    deleteIcon: IconDefinition = faTrash;
    dataSource: any = [];
    headers: string[] = [
        '#',
        'Nombre',
        'Precio',
        'Talle',
        'Stock Mínimo',
        'Activo',
        'Última Actualización',
    ];
    keys: Object[] = [
        { name: 'product_id', type: ''}, 
        { name: 'name', type: ''}, 
        { name: 'price', type: 'currency'}, 
        { name: 'waist', type: ''}, 
        { name: 'min_stock', type: ''}, 
        { name: 'active', type: 'status'}, 
        { name: 'updated_at', type: 'date'}, 
    ];
    actions: any = [
        { 
            icon: this.searchIcon, 
            redirect: (product_id: number) => `/products/${product_id}/detail`, 
            redirectKey: 'product_id',
            color: '#0d6efd'
        }
    ];
    
    // Variables de filtración
    filters: Object[] = [
        { name: 'Nombre', key: 'name', type: 'text', value: '' },
        { name: 'Talle', key: 'waist', type: 'text', value: '' },
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
        private productService: ProductService,
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

        this.productService.getList({ selectedPage: this.selectedPage, pageSize: this.pageSize}, this.sortingModel, this.filters).subscribe((res: any) => {
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
