import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    constructor() { }

    open(modal: string) {
        $(`#${modal}`).modal('show');
    }
    
    close(modal: string) {
        $(`#${modal}`).modal('hide');
    }
}
