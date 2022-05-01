import { Component, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs';
import { PageLoaderService } from 'src/app/services/page-loader.service';

@Component({
    selector: 'app-page-loader',
    templateUrl: './page-loader.component.html',
    styleUrls: ['./page-loader.component.scss']
})
export class PageLoaderComponent implements OnInit {
    loading: boolean;
    message: string;
    progressValue: number;
    progressValueStyle: string;
    private _subscribed: boolean = true;

    constructor(
        private pageLoaderService: PageLoaderService
    ) { }
    
    ngOnInit(): void {
        this.subscribe();
    }
    
    ngOnDestroy() {
        this._subscribed = false;
    }
        
    private subscribe() {
        this.pageLoaderService.state
            .pipe(takeWhile(() => this._subscribed))
            .subscribe(loading => {
                this.loading = loading;
            });
        this.pageLoaderService.message
            .pipe(takeWhile(() => this._subscribed))
            .subscribe(message => {
                if (!!message) {
                    this.message = message;
                }
            });
        this.pageLoaderService.progressValue
            .pipe(takeWhile(() => this._subscribed))
            .subscribe(progressValue => {
                if (!!progressValue) {
                    this.progressValue = progressValue;
                    this.progressValueStyle = `${progressValue}%`;
                }
            });
    }
}
