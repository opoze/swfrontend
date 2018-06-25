import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusPipe'
})
export class StatusPipePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if(value == 'A'){
      return 'Aprovado';
    }
    else if(value == 'R'){
      return 'Reprovado';
    }
    else if(value == 'PD'){
      return 'Pendente Diretoria';
    }
    else{
      return null;
    }
  }

}
