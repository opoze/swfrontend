import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyPipe'
})
export class MoneyPipePipe implements PipeTransform {

  transform(value: number, args?: any): any {
    let money = parseFloat(value).toFixed(2);
    return 'R$ ' + money.replace('.', ',');
  }

}
