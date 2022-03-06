import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroArrayPuro'
})
export class FiltroArrayPuroPipe implements PipeTransform {

  transform(value: any, filtro?: any): any {
    if (value.length === 0 || filtro === undefined) {
      return value;
    }

    let filter = filtro.toLocaleLowerCase();

    return value.filter(
      (v: string) => v.toLocaleLowerCase().indexOf(filter) != -1
    );
  }

}
