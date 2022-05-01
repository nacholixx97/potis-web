import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageLoaderService } from 'src/app/services/page-loader.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'app-product-new',
    templateUrl: './product-new.component.html',
    styleUrls: ['./product-new.component.scss']
})
export class ProductNewComponent implements OnInit {
    title: string = 'Nuevo producto';
    imageContent: string;

    productForm: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        description: new FormControl(),
        waist: new FormControl('', [Validators.required]),
        cost_price: new FormControl(),
        price: new FormControl('', [Validators.required]),
        min_stock: new FormControl('', [Validators.required]),
        image: new FormControl(),
        has_stock: new FormControl(),
        start_stock: new FormControl(1)
    }); 

    constructor(
        private pageLoaderService: PageLoaderService,
        private productService: ProductService,
        private toastService: ToastService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.productForm.valueChanges.subscribe(p => {
            if (p.price <= 0) {
                this.productForm.get('price').setErrors({
                    invalidPrice: true
                });
            }

            if (p.min_stock <= 0) {
                this.productForm.get('min_stock').setErrors({
                    invalidStock: true
                });
            }

            if (p.has_stock && p.start_stock <= 0) {
                this.productForm.get('start_stock').setErrors({
                    invalidStock: true
                });
            }
        })
    }

    showStock() {
        return this.productForm.get('has_stock').value;
    }

    onSubmit() {
        this.pageLoaderService.show('Creando Producto...');

        const product = this.productForm.value;
        this.productService.createProduct(product).subscribe(() => {
            this.pageLoaderService.hide();
            this.router.navigate(['/products/list'])
            this.toastService.successToast('Producto creado con éxito.');
        });
    }

    onChangeFile(event: any) {
        const reader = new FileReader();
    
        if(event.target.files && event.target.files.length) {
            const image = event.target.files[0];
            reader.readAsDataURL(image);
            
            reader.onload = async () => {
                this.imageContent = reader.result as string;
                this.productForm.patchValue({
                    image: reader.result
                });
            };
        }
    }

    createAndAddAnotherWaist() {
        this.pageLoaderService.show('Creando Producto...');

        const product = this.productForm.value;
        this.productService.createProduct(product).subscribe((res: any) => {
            this.productForm.get('waist').reset();
            $('#waist').focus();

            this.pageLoaderService.hide();
            this.toastService.successToast('Producto creado con éxito.');
        });
    }

}
