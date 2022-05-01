import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PageLoaderService {

    constructor() { }

    private loading$: Subject<boolean> = new BehaviorSubject<boolean>(false);
    private message$: Subject<string> = new BehaviorSubject<string>(null);
    private progressValue$: Subject<number> = new BehaviorSubject<number>(null);

    show(message: string = null, progressValue: number = null) {
        this.loading$.next(true);
        this.message$.next(message);
        this.progressValue$.next(progressValue);
    }

    hide() {
        this.loading$.next(false);
        this.message$.next(null);
        this.progressValue$.next(null);
    }

    get state() {
        return this.loading$.asObservable();
    }

    get message() {
        return this.message$.asObservable();
    }

    setMesage(message: string) {
        this.message$.next(message);
    }

    get progressValue() {
        return this.progressValue$.asObservable();
    }

    setProgressValue(velue: number) {
        this.progressValue$.next(velue);
    }
}
