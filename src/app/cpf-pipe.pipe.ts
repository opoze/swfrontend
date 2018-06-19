import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfPipe'
})
export class CpfPipePipe implements PipeTransform {

  transform(value: any, args?: any): string {
    if(value){
        value = value.toString();
        if(value.length === 11){
            return value.substring(0,3).concat(".")
            .concat(value.substring(3,6))
            .concat(".")
            .concat(value.substring(6,9))
            .concat("-")
            .concat(value.substring(9,11))
        } 
    }
    return value;
  }

}
