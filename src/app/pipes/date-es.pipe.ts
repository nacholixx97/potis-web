import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'dateEs'
})
export class DateEsPipe implements PipeTransform {

    transform(value: any, ...args: any[]): any {
        moment.locale('es');
        return this.capitalizeFirstLetter(moment(value).calendar());
    }

    capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

}
