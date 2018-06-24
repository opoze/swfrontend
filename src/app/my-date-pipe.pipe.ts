import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'myDatePipe'
})
export class MyDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let myMoment: moment.Moment = moment(value);
    return myMoment.format('DD/MM/YYYY');
  }

}
