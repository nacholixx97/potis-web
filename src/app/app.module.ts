import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/ui/navbar/navbar.component';
import { SummaryComponent } from './components/summary/summary.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastComponent } from './components/ui/toast/toast.component';
import { DateEsPipe } from './pipes/date-es.pipe';
import { StatusPipe } from './pipes/status.pipe';
import { PercentPipe } from './pipes/percent.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductDetailComponent } from './components/product/detail/product-detail.component';
import { PageLoaderComponent } from './components/page-loader/page-loader.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartComponent } from './components/ui/chart/chart.component';
import { FilterComponent } from './components/ui/filter/filter.component';
import { TableComponent } from './components/ui/table/table.component';
import { PaginationComponent } from './components/ui/pagination/pagination.component';
import * as bootstrap from "bootstrap";
import * as $ from "jquery";
import { StockTableComponent } from './components/stock/table/stock-table.component';
import { NewSellComponent } from './components/new/sell/new-sell.component';
import { NewRepositionComponent } from './components/new/reposition/new-reposition.component';
import { SellDetailComponent } from './components/sell/detail/sell-detail.component';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/config/users/list/user-list.component';
import { UserTableComponent } from './components/config/users/table/user-table.component';
import { UserDetailComponent } from './components/config/users/detail/user-detail.component';
import { UserNewComponent } from './components/config/users/new/user-new.component';
import { ProductStockComponent } from './components/stock/list/product-stock.component';
import { ProductTableComponent } from './components/product/table/product-table.component';
import { ProductNewComponent } from './components/product/new/product-new.component';
import { SellListComponent } from './components/sell/list/sell-list.component';
import { SellTableComponent } from './components/sell/table/sell-table.component';
import { ProductListComponent } from './components/product/list/product-list.component';
import { MyProfileComponent } from './components/config/my-profile/my-profile.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        ProductStockComponent,
        SummaryComponent,
        ToastComponent,
        ProductStockComponent,
        DateEsPipe,
        StatusPipe,
        PercentPipe,
        ProductDetailComponent,
        PageLoaderComponent,
        ChartComponent,
        ProductTableComponent,
        FilterComponent,
        TableComponent,
        PaginationComponent,
        StockTableComponent,
        NewSellComponent,
        NewRepositionComponent,
        ProductNewComponent,
        SellListComponent,
        SellTableComponent,
        SellDetailComponent,
        LoginComponent,
        UserListComponent,
        UserTableComponent,
        UserDetailComponent,
        UserNewComponent,
        ProductListComponent,
        MyProfileComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        NgbModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        HighchartsChartModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
