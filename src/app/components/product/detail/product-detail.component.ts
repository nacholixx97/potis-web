import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from 'src/app/services/modal.service';
import { PageLoaderService } from 'src/app/services/page-loader.service';
import { Product, ProductService } from 'src/app/services/product.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
    edit: boolean = false;
    menuIcon: IconDefinition = faBars;
    product: Product = null;
    title: string = 'Detalle articulo #';
    titleEdition: string = 'Editando articulo #';
    productForm: FormGroup = new FormGroup({
        name: new FormControl(),
        description: new FormControl(),
        waist: new FormControl(),
        price: new FormControl(),
        min_stock: new FormControl(),
        active: new FormControl(),
        image: new FormControl()
    }); 

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private productService: ProductService,
        private toastService: ToastService,
        private pageLoaderService: PageLoaderService,
        private modalService: ModalService,
    ) { }

    ngOnInit(): void {
        const id: number = this.activatedRoute.snapshot.paramMap.get('id') as unknown as number;
        this.getProduct(id);
        this.productForm.disable();
    }

    getProduct(id: number): Product {
        return this.productService.getProduct(id).subscribe((res: any) => {
            this.product = res.body as Product;
            this.title += `${this.product.product_id}`;
            this.titleEdition += `${this.product.product_id}`;
            this.productForm.setValue(
                {
                    name: this.product.name,
                    description: this.product.description,
                    waist: this.product.waist,
                    price: this.product.price,
                    min_stock: this.product.min_stock,
                    active: this.product.active,
                    image: this.product.image
                });
        })
    }

    onSubmit() {
        this.pageLoaderService.show('Actualizando Producto...');

        const product = this.productForm.value;
        this.productService.updateProduct(this.product.product_id, product).subscribe((res: any) => {
            this.pageLoaderService.hide();
            this.toggleEdit();
            this.toastService.successToast('Producto actualizado con éxito.');
        });
    }

    onChangeFile(event: any) {
        const reader = new FileReader();
    
        if(event.target.files && event.target.files.length) {
            const image = event.target.files[0];
            reader.readAsDataURL(image);
            
            reader.onload = () => {
                this.product.image = reader.result as string;
                this.productForm.patchValue({
                    image: reader.result
                });
            };
        }
    }

    clearImage() {
        this.product.image = null;
        this.productForm.patchValue({
            image: null
        });
    }

    toggleEdit() {
        if (this.edit)
            this.productForm.disable();
        else
            this.productForm.enable();
        
        this.edit = !this.edit;
    }

    openDeletionModal() {
        this.modalService.open('modalDelete');
    }

    closeDeletionModal() {
        this.modalService.close('modalDelete');
    }

    isEditing(): boolean {
        return this.edit;
    }

    delete() {
        this.pageLoaderService.show('Eliminando Producto...');
        this.productService.deleteProduct(this.product.product_id).subscribe(() => {
            this.closeDeletionModal();
            this.pageLoaderService.hide();
            this.router.navigate(['/products/list'])
            this.toastService.successToast('Producto eliminado con éxito.');
        })
    }

}
