import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
    toasts: any[] = [];
    delay: number = 3000; // 3 segundos para que se desvanezca el toast.

    show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
        this.toasts.push({ textOrTpl, ...options });
    }

    remove(toast: any) {
        this.toasts = this.toasts.filter(t => t !== toast);
    }

    successToast(message: string) {
        this.show(message, { classname: 'bg-success text-light', delay: this.delay });
    }

    infoToast(message: string) {
        this.show(message, { classname: 'bg-info text-light', delay: this.delay });
    }

    dangerToast(message: string) {
        this.show(message, { classname: 'bg-danger text-light', delay: this.delay });
    }
}