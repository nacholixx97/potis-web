import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
import { catchError, retry } from 'rxjs';
import { ErrorService } from './error.service';
import { LoginService } from './login.service';

export interface ChartOptions {
    highcharts: typeof Highcharts;
    options: Highcharts.Options;
}

@Injectable({
    providedIn: 'root'
})
export class ChartService {
    Highcharts: typeof Highcharts = Highcharts;
    chartOptions: Highcharts.Options = { };
    colors: string[] = ['#0d6efd', '#6610f2', '#d63384', '#dc3545', '#0d6efd', '#198754', '#0dcaf0', '#ffc107', '#dc3545', '#fd7e14', '#ffc107', '#198754', '#20c997', '#0dcaf0', '#6c757d', '#6f42c1'];

    private url: string = 'http://localhost:3000/api/chart';
    private httpHeader = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'access-token': this.loginService.getToken()
        })
    }

    constructor(
        private httpClient: HttpClient,
        private errorService: ErrorService,
        private loginService: LoginService
    ) { }

    getMostSelledToday(): any {
        return this.httpClient.get<any>(`${this.url}/mostSelledToday`, this.httpHeader)
            .pipe(
                catchError(this.errorService.errorHandler)
            )
    }

    getTotalGenerated(): any {
        return this.httpClient.get<any>(`${this.url}/totalGenerated`, this.httpHeader)
            .pipe(
                catchError(this.errorService.errorHandler)
            )
    }

    getMostSelledProducts(): any {
        return this.httpClient.get<any>(`${this.url}/mostSelledProducts`, this.httpHeader)
            .pipe(
                catchError(this.errorService.errorHandler)
            )
    }

    getMostSelledByWaist(): any {
        return this.httpClient.get<any>(`${this.url}/mostSelledByWaist`, this.httpHeader)
            .pipe(
                catchError(this.errorService.errorHandler)
            )
    }

    getBarChartOptions(chartTitle: string, chartSubtitle: string, data: any, categoryName: string, yTitle: string, legend: boolean): ChartOptions {
        let total: number = 0;

        // Se parsean los valores de Y a number y se genera el total.
        data.map((item: any, index: number) => {
            let parsedInt = parseInt(item.y);
            data[index].y = parsedInt
            total += parsedInt;
        }); 
        
        // Se generan los porcentajes.
        data.map((item: any, index: number) => {
            data[index].percent = (item.y * 100) / total;
        });       

        this.chartOptions = {
            title: {
                text: chartTitle
            },
            subtitle: {
                text: chartSubtitle
            },
            colors: this.colors,
            series: [{
                name: categoryName,
                colorByPoint: true,
                type: 'column',
                data: data
            }],
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: yTitle
                }
            },
            legend: {
                enabled: legend
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y}'
                    }
                }
            },  
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.percent:.2f}%</b><br/>'
            }
        }

        return {
            highcharts: this.Highcharts,
            options: this.chartOptions
        } as ChartOptions;
    }

    getPieChartOptions(chartTitle: string, data: any, categoryName: string): ChartOptions {
        // Se parsean los valores de Y a number.
        data.map((i: any, index: number) => {
            data[index].y = parseInt(i.y);
        });

        this.chartOptions = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: chartTitle
            },
            colors: this.colors,
            tooltip: {
                pointFormat: '<span>{point.name}</span>: <b>{point.percentage:.2f}%</b><br/>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: categoryName,
                colorByPoint: true,
                type: 'pie',
                data: data
            }]
        }

        return {
            highcharts: this.Highcharts,
            options: this.chartOptions
        } as ChartOptions;
    }
}
