import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SortingModel } from 'src/app/interfaces/grid.interface';
import { ConfigService } from 'src/app/services/config.service';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
    @Input() searchFunction: any = null;
    @Input() filters: any = null;
    @Input() headers: any = null;
    @Input() keys: any = null;
    @Input() pageSize: any = null;
    @Output() pageSizeChange: any = new EventEmitter<number>();
    @Input() sortingModel: SortingModel = null;
    @Output() sortingModelChange: any = new EventEmitter<SortingModel>();
    sortingOptions: Array<any> = [];
    commonFilters: any = null;
    checkFilters: any = null;

    constructor(
        private configService: ConfigService
    ) { }

    ngOnInit(): void {
        this.processFilters();
        this.headers.map((value: string, index: number) => {
            this.sortingOptions.push({
                name: value,
                value: this.keys[index].name
            });
        })
    }

    clear() {
        this.filters.forEach((filter: any) => {
            if (filter.key === 'active') {
                filter.value = true;
            }else{
                filter.value = '';
            }
        });
        this.pageSize = this.configService.getPageSize();
        this.sortingModel = {
            sortBy: this.sortingOptions[0].value,
            sortDirection: 'desc'
        }
        this.emitChanges();
        this.searchFunction();
    }

    processFilters() {
        this.commonFilters = this.filters.filter((f: any) => f.type != 'check');
        this.checkFilters = this.filters.filter((f: any) => f.type == 'check');
    }

    emitChanges() {
        this.pageSizeChange.emit(this.pageSize);
        this.sortingModelChange.emit(this.sortingModel);
    }
}
