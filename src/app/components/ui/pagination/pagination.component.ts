import { Component, Input, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    @Input() nextPage: any;
    @Input() previousPage: any;
    @Input() selectedPage: number = 1;
    @Input() pageSize: number = this.configService.getPageSize();
    @Input() totalRows: number = 0;
    @Input() totalPages: number = 1;

    constructor(
        private configService: ConfigService
    ) { }

    ngOnInit(): void {
    }
}
