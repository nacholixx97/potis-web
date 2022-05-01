import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SortingModel } from 'src/app/interfaces/grid.interface';
import { ConfigService } from 'src/app/services/config.service';
import { ModalService } from 'src/app/services/modal.service';
import { PageLoaderService } from 'src/app/services/page-loader.service';
import { SellService } from 'src/app/services/sell.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'app-sell-detail',
    templateUrl: './sell-detail.component.html',
    styleUrls: ['./sell-detail.component.scss']
})
export class SellDetailComponent implements OnInit {
    id: number = this.activatedRoute.snapshot.paramMap.get('id') as unknown as number;
    title: string = 'Detalle factura #';
    has_been_returned: boolean = null;

    // Variables de tabla.
    dataSource: any = [];
    headers: string[] = [
        '# Producto',
        'Producto',
        'Talle',
        'Cantidad',
        'Subtotal',
        'Descuento (%)',
        'Total'
    ];
    keys: Object[] = [
        { name: 'product_id', type: ''}, 
        { name: 'name', type: ''}, 
        { name: 'waist', type: ''}, 
        { name: 'amount', type: ''},
        { name: 'subtotal', type: 'currency'},
        { name: 'discount', type: ''},
        { name: 'total', type: 'currency'}
    ];
    actions: any = [];
    
    sortingModel: SortingModel = {
        sortBy: 'name',
        sortDirection: 'desc'
    };
    
    // Variables de paginación
    selectedPage: number = 1;
    pageSize: number = this.configService.getPageSize();
    totalRows: number = 0;
    totalPages: number = 1;

    constructor(
        private sellService: SellService,
        private activatedRoute: ActivatedRoute,
        private configService: ConfigService,
        private modalService: ModalService,
        private pageLoaderService: PageLoaderService,
        private router: Router,
        private toastService: ToastService
    ) { }

    ngOnInit(): void {
        this.getProduct(this.id);
    }

    getProduct(id: number): any {
        return this.sellService.getSell(id).subscribe((res: any) => {
            this.dataSource = res.body.data;
            this.has_been_returned = res.body.has_been_returned;
            this.title += id;
        })
    }

    openReturningModal() {
        this.modalService.open('modalReturning');
    }

    returning() {
        this.pageLoaderService.show('Actualizando Producto...');

        this.sellService.return(this.id).subscribe((res: any) => {
            this.modalService.close('modalReturning');
            this.pageLoaderService.hide();
            this.router.navigate(['/sells/list']);
            this.toastService.successToast('Factura reintegrada con éxito.');
        })
    }

}
