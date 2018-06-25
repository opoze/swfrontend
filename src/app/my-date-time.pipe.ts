import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'myDateTimePipe'
})
export class MyDateTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    console.log(value);

    let myMoment: moment.Moment = moment(value);
    return myMoment.format('DD/MM/YYYY HH:mm:ss');
  }

}
