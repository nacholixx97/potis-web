import { Component, OnInit } from '@angular/core';
import { faMoneyBillWave, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ChartService } from 'src/app/services/chart.service';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
    // Gráfico de ventas del día
    todayCategory: string = 'Producto';
    todayYTitle: string = 'Total de ventas ';
    mostSelledTodayData: any[] = [];
    moneyIcon: IconDefinition = faMoneyBillWave;
    totalGenerated: number = 0;

    // Gráfico de más ventas
    category: string = 'Producto';
    yTitle: string = 'Total de ventas';
    mostSelledData: any[] = [];

    // Gráfico de más ventas por talles
    mostSelledByWaistData: any[] = [];

    constructor(
        private chartService: ChartService
    ) { }

    ngOnInit(): void {
        this.getMostSelledProducts();
        this.getMostSelledByWaist();
        this.getMostSelledToday();
        this.getTotalGenerated();
    }

    getMostSelledToday() {
        this.chartService.getMostSelledToday().subscribe((res: any) => {
            this.mostSelledTodayData = res.body;
        });
    }

    getTotalGenerated() {
        this.chartService.getTotalGenerated().subscribe((res: any) => {
            this.totalGenerated = res.body.total;
        });
    }

    getMostSelledProducts() {
        this.chartService.getMostSelledProducts().subscribe((res: any) => {
            this.mostSelledData = res.body;
        });
    }

    getMostSelledByWaist() {
        this.chartService.getMostSelledByWaist().subscribe((res: any) => {
            this.mostSelledByWaistData = res.body;
        });
    }

}
