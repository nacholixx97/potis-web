import { Component, OnInit } from '@angular/core';
import { faSearch, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SortingModel } from 'src/app/interfaces/grid.interface';
import { ConfigService } from 'src/app/services/config.service';
import { PageLoaderService } from 'src/app/services/page-loader.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-user-table',
    templateUrl: './user-table.component.html',
    styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
    // Variables de tabla.
    searchIcon: IconDefinition = faSearch;
    deleteIcon: IconDefinition = faTrash;
    dataSource: any = [];
    headers: string[] = [
        '#',
        'Apellido',
        'Nombre',
        'Usuario',
        'Email',
        'Activo'
    ];
    keys: Object[] = [
        { name: 'user_id', type: ''}, 
        { name: 'name', type: ''}, 
        { name: 'lastname', type: ''}, 
        { name: 'username', type: ''}, 
        { name: 'email', type: ''}, 
        { name: 'active', type: 'status'}
    ];
    actions: any = [
        { 
            icon: this.searchIcon, 
            redirect: (user_id: number) => `/config/user/${user_id}`, 
            redirectKey: 'user_id',
            color: '#0d6efd'
        }
    ];

    // Variables de filtración
    filters: Object[] = [
        { name: 'Apellido', key: 'lastname', type: 'text', value: '' },
        { name: 'Nombre', key: 'name', type: 'text', value: '' },
        { name: 'Usuario', key: 'username', type: 'text', value: '' },
        { name: 'Email', key: 'email', type: 'text', value: '' },
        { name: 'Activo', key: 'active', type: 'check', value: true },
    ];
    sortingModel: SortingModel = {
        sortBy: 'username',
        sortDirection: 'asc'
    };

    // Variables de paginación
    selectedPage: number = 1;
    pageSize: number = this.configService.getPageSize();
    totalRows: number = 0;
    totalPages: number = 1;

    // Variables
    selectedProduct: number = null;

    constructor(
        private userService: UserService,
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

        this.userService.getList({ selectedPage: this.selectedPage, pageSize: this.pageSize}, this.sortingModel, this.filters).subscribe((res: any) => {
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
