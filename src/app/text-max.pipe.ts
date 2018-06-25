import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textMax'
})
export class TextMaxPipe implements PipeTransform {

  transform(value: string, length?: number): any {


    if(value.length > length){
      return value.slice(0, length) + '...';
    }
    return value;

  }

}
