import { Component, OnInit } from '@angular/core';
import { faCheck, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SortingModel } from 'src/app/interfaces/grid.interface';
import { ConfigService } from 'src/app/services/config.service';
import { ModalService } from 'src/app/services/modal.service';
import { PageLoaderService } from 'src/app/services/page-loader.service';
import { ProductService } from 'src/app/services/product.service';
import { StockService } from 'src/app/services/stock.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'app-new-reposition',
    templateUrl: './new-reposition.component.html',
    styleUrls: ['./new-reposition.component.scss']
})
export class NewRepositionComponent implements OnInit {
    // Variables de tabla productos.
    selectIcon: IconDefinition = faCheck;
    dataSource: any = [];
    headers: string[] = [
        '#',
        'Nombre',
        'Precio',
        'Stock Actual',
        'Stock Mínimo'
    ];
    keys: Object[] = [
        { name: 'product_id', type: ''}, 
        { name: 'name', type: ''}, 
        { name: 'price', type: 'currency'},
        { name: 'stock', type: ''},
        { name: 'min_stock', type: ''}
    ];
    actions: any = [];
    selectedOptions: any = {
        icon: this.selectIcon,
        color: '#0d6efd',
    };
    rowConditions: any = {
        function: (firstValue: number, secondValue: number, condition: string) => {
            if (condition == '<=')
                return firstValue <= secondValue;
            else
                return firstValue == secondValue;
        },
        firstCondition: 'stock',
        condition: '<=',
        secondCondition: 'min_stock',
        class: 'table-danger'
    }

    // Variables de tabla reposición.
    trashIcon: IconDefinition = faTrash;
    productsToAdd: any[] = [];
    headersToAdd: string[] = [
        '#',
        'Nombre',
        'Cantidad'
    ];
    keysToAdd: Object[] = [
        { name: 'product_id', type: ''}, 
        { name: 'name', type: ''}, 
        { name: 'amount', type: ''}
    ];
    actionsToAdd: any = [];
    selectedToDeleteOptions: any = {
        icon: this.trashIcon,
        color: '#dc3545',
    };

    // Variables de filtración
    filters: Object[] = [
        { name: 'Nombre', key: 'name', type: 'text', value: '' },
        { name: 'Precio', key: 'price', type: 'number', value: '' },
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
    title: string = 'Nueva reposición';
    selectedProduct: any = null;
    selectedToDelete: any = null;
    amount: number = null;

    constructor(
        private productService: ProductService,
        private pageLoaderService: PageLoaderService,
        private modalService: ModalService,
        private stockService: StockService,
        private toastService: ToastService,
        private configService: ConfigService
    ) { 
        this.getList = this.getList.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.cancel = this.cancel.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    ngOnInit(): void {
        this.getList();
    }

    getList() {
        this.pageLoaderService.show('Buscando...');

        this.productService.getProductsToSell({ selectedPage: this.selectedPage, pageSize: this.pageSize}, this.sortingModel, this.filters).subscribe((res: any) => {
            this.dataSource = res.body.data;
            this.totalRows = res.body.totalRows;
            this.totalPages = res.body.totalPages;

            this.pageLoaderService.hide();
        })
    }

    resetReposition() {
        this.amount = 0;
    }

    addToAdd() {
        this.selectedProduct.amount = this.amount;
        this.productsToAdd.push({
            product_id: this.selectedProduct.product_id,
            name: this.selectedProduct.name,
            price: this.selectedProduct.price,
            amount: this.amount
        });
        this.resetReposition();
        this.modalService.close('modal-new-reposition');
    }

    confirmReposition() {
        this.stockService.reposition(this.productsToAdd).subscribe((res: any) => {});
        this.toastService.successToast('Reposición creada con éxito.');

        this.productsToAdd = [];
        this.getList();
    }

    cancel() {
        this.productsToAdd.splice(this.productsToAdd.indexOf(this.selectedToDelete), 1);
    }

    validationForm() {
        return this.amount <= 0;
    }

    previousPage() {
        this.selectedPage--;
        this.getList();
    }

    nextPage() {
        this.selectedPage++;
        this.getList();
    }

    openModal() {
        this.modalService.open('modal-new-reposition');
    }

}
