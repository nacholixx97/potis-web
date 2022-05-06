import { Component, OnInit } from '@angular/core';
import { faPlus, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SortingModel } from 'src/app/interfaces/grid.interface';
import { ConfigService } from 'src/app/services/config.service';
import { ModalService } from 'src/app/services/modal.service';
import { PageLoaderService } from 'src/app/services/page-loader.service';
import { Product, ProductService } from 'src/app/services/product.service';
import { SellService } from 'src/app/services/sell.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'app-new-sell',
    templateUrl: './new-sell.component.html',
    styleUrls: ['./new-sell.component.scss']
})
export class NewSellComponent implements OnInit {
    // Variables de tabla productos.
    selectIcon: IconDefinition = faPlus;
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
    
    // Variables de tabla productos a vender.
    trashIcon: IconDefinition = faTrash;
    productsToSell: any[] = [];
    headersToSell: string[] = [
        '#',
        'Nombre',
        'Precio',
        'Cantidad',
        'Subtotal',
        'Descuento',
        'Total'
    ];
    keysToSell: Object[] = [
        { name: 'product_id', type: ''}, 
        { name: 'name', type: ''}, 
        { name: 'price', type: 'currency'},
        { name: 'amount', type: ''},
        { name: 'subtotal', type: 'currency'},
        { name: 'discount', type: 'percent'},
        { name: 'total', type: 'currency'}
    ];
    actionsToSell: any = [];
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
    title: string = 'Nueva venta';
    stock: number = null;
    selectedProduct: any = null;
    selectedToDelete: any = null;
    discount: number = null;
    amountToSell: number = null;
    amountTotal: number = null;
    amountTotalWithDiscount: number = null;
    total: number = null;

    constructor(
        private productService: ProductService,
        private pageLoaderService: PageLoaderService,
        private modalService: ModalService,
        private sellService: SellService,
        private toastService: ToastService,
        private configService: ConfigService
    ) { 
        this.getList = this.getList.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.openModal = this.openModal.bind(this);
        this.cancel = this.cancel.bind(this);
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

    resetSell() {
        this.discount = 0;
        this.amountToSell = 0;
        this.amountTotal = 0;
        this.stock = 0;
    }

    addToSell() {
        this.selectedProduct.amount = this.amountToSell;
        this.selectedProduct.discount = this.discount || 0;
        this.selectedProduct.subtotal = this.amountTotal;
        this.selectedProduct.total = this.amountTotalWithDiscount;
        this.productsToSell.push({
            product_id: this.selectedProduct.product_id,
            name: this.selectedProduct.name,
            price: this.selectedProduct.price,
            amount: this.amountToSell,
            discount: this.discount || 0,
            subtotal: this.amountTotal,
            total: this.amountTotalWithDiscount,
        });
        this.total += this.amountTotalWithDiscount;
        this.selectedProduct.stock = this.stock;
        this.resetSell();
        this.modalService.close('modal-new-sell');
    }

    confirmSell() {
        this.sellService.add(this.productsToSell).subscribe((res: any) => {});
        this.toastService.successToast('Factura creada con éxito.');

        this.productsToSell = [];
        this.total = 0;
    }

    cancel() {
        this.dataSource.find((p: any) => p.product_id == 18).stock += this.selectedToDelete.amount;
        this.productsToSell.splice(this.productsToSell.indexOf(this.selectedToDelete), 1);
        this.total -= this.selectedToDelete.total;
    }

    refreshAmountTotal() {
        this.stock = this.selectedProduct.stock - this.amountToSell;
        this.amountTotal = (this.selectedProduct.price * this.amountToSell);
        this.amountTotalWithDiscount = (this.amountTotal - (this.amountTotal * (this.discount / 100)));
    }

    showError() {
        return this.stock <= 0 && this.amountToSell > 0 && this.amountTotal > 0;
    }

    validationForm() {
        return this.amountTotalWithDiscount < 0 || this.amountToSell <= 0;
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
        this.modalService.open('modal-new-sell');
    }

}
