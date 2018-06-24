import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'perfilPipe'
})
export class PerfilPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let perfils = [
      { id: '1', name: 'Analista De Compras'},
      { id: '2', name: 'Analista Financeiro'},
      { id: '3', name: 'Diretor Financeiro'}
    ]

    let perfil = perfils.find((perfil) => {
      return perfil.id == value;
    });

    if(typeof perfil != 'undefined') {
      return perfil.name;
    }

    return null;
  }

}
