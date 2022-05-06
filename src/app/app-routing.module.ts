import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummaryComponent } from './components/summary/summary.component';
import { ProductDetailComponent } from './components/product/detail/product-detail.component';
import { NewSellComponent } from './components/new/sell/new-sell.component';
import { NewRepositionComponent } from './components/new/reposition/new-reposition.component';
import { SellDetailComponent } from './components/sell/detail/sell-detail.component';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/config/users/list/user-list.component';
import { UserDetailComponent } from './components/config/users/detail/user-detail.component';
import { UserNewComponent } from './components/config/users/new/user-new.component';
import { ProductStockComponent } from './components/stock/list/product-stock.component';
import { ProductListComponent } from './components/product/list/product-list.component';
import { ProductNewComponent } from './components/product/new/product-new.component';
import { SellListComponent } from './components/sell/list/sell-list.component';
import { MyProfileComponent } from './components/config/my-profile/my-profile.component';

const routes: Routes = [
    // Login
    { path: 'login', component: LoginComponent },

    // Pagina Principal
    { path: '', component: SummaryComponent },

    // Productos
    { 
        path: 'products', 
        children: [
            { path: 'stock', component: ProductStockComponent },
            { path: 'list', component: ProductListComponent },
            { path: ':id/detail', component: ProductDetailComponent },
            { path: 'new', component: ProductNewComponent }
        ] 
    },

    // Nuevas acciones
    { 
        path: 'new', 
        children: [
            { path: 'sell', component: NewSellComponent },
            { path: 'reposition', component: NewRepositionComponent },
        ] 
    },

    // Ventas
    { 
        path: 'sells', 
        children: [
            { path: 'list', component: SellListComponent },
            { path: ':id/detail', component: SellDetailComponent },
        ] 
    },

    // Configuraciones
    { 
        path: 'config', 
        children: [
            {
                path: 'user',
                children: [
                    { path: 'list', component: UserListComponent },
                    { path: 'new', component: UserNewComponent },
                    { path: ':id', component: UserDetailComponent },
                ]
            },
            { path: 'my-profile', component: MyProfileComponent },
        ] 
    },

    // Por default se redirecciona a /
    { path: '*', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
