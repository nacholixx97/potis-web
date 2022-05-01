import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCheckCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from 'src/app/services/modal.service';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    @Input() tableSource: any = null;
    @Input() headers: string[] = null;
    @Input() keys: any = null;
    @Input() actions: any = null;
    @Input() rowConditions: any = null;
    @Input() showSelectRow: boolean = false;
    @Input() selectedRow: any = null;
    @Input() onSelectedRow: any = null;
    @Output() selectedRowChange: any = new EventEmitter<any>();
    @Input() selectedRowOptions: any = null;

    constructor() { }

    ngOnInit(): void {
    }

    showActions() {
        return this.actions.length > 0 || this.showSelectRow;
    }

    selectRow(row: any) {
        this.selectedRow = row;
        this.emitChanges();
        this.onSelectedRow();
    }

    emitChanges() {
        this.selectedRowChange.emit(this.selectedRow);
    }

}
