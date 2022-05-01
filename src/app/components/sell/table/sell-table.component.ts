import { Component, OnInit } from '@angular/core';
import { faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SortingModel } from 'src/app/interfaces/grid.interface';
import { ConfigService } from 'src/app/services/config.service';
import { PageLoaderService } from 'src/app/services/page-loader.service';
import { SellService } from 'src/app/services/sell.service';

@Component({
    selector: 'app-sell-table',
    templateUrl: './sell-table.component.html',
    styleUrls: ['./sell-table.component.scss']
})
export class SellTableComponent implements OnInit {
    // Variables de tabla.
    searchIcon: IconDefinition = faSearch;
    dataSource: any = [];
    headers: string[] = [
        '# Factura',
        'Fecha',
        'Total'
    ];
    keys: Object[] = [
        { name: 'bill_id', type: ''}, 
        { name: 'created_at', type: 'date'}, 
        { name: 'total', type: 'currency'}
    ];
    actions: any = [
        { 
            icon: this.searchIcon, 
            redirect: (bill_id: number) => `/sells/${bill_id}/detail`, 
            redirectKey: 'bill_id',
            color: '#0d6efd'
        }
    ];
    
    // Variables de filtración
    filters: Object[] = [
        { name: 'Fecha', key: 'created_at', type: 'date', value: '' },
        { name: 'Reintegradas', key: 'has_been_returned', type: 'check', value: false }
    ];
    sortingModel: SortingModel = {
        sortBy: 'bill_id',
        sortDirection: 'desc'
    };
    
    // Variables de paginación
    selectedPage: number = 1;
    pageSize: number = this.configService.getPageSize();
    totalRows: number = 0;
    totalPages: number = 1;

    constructor(
        private sellService: SellService,
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

        this.sellService.getList({ selectedPage: this.selectedPage, pageSize: this.pageSize}, this.sortingModel, this.filters).subscribe((res: any) => {
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
