import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyPipe'
})
export class MoneyPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let money = parseFloat(value).toFixed(2);
    return 'R$ ' + money.replace('.', ',');

  }

}
