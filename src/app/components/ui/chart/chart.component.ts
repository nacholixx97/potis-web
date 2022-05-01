import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartService } from 'src/app/services/chart.service';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
    @Input() type: string = null;
    @Input() chartTitle: string = null;
    @Input() chartSubtitle: string = null;
    @Input() data: any = null;
    @Input() categoryName: string = null;
    @Input() yTitle: string = null;
    @Input() legend: boolean = false;

    chartData: ChartOptions = null;

    constructor(
        private chartService: ChartService
    ) { }

    ngOnInit(): void {
        if (this.type == 'bar') {
            this.chartData = this.chartService.getBarChartOptions(
                this.chartTitle,
                this.chartSubtitle,
                this.data,
                this.categoryName,
                this.yTitle,
                this.legend
            );
        }

        if (this.type == 'pie') {
            this.chartData = this.chartService.getPieChartOptions(
                this.chartTitle,
                this.data,
                this.categoryName
            );
        }
    }

}
