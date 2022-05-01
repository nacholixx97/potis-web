import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    pageSize: number = 10;

    constructor() { }

    getPageSize(): number { return this.pageSize; }
}
