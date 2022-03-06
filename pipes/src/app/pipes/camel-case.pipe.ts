import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCase',
})
export class CamelCasePipe implements PipeTransform {

  transform(frase: any, args?: any): any {
    let result: string = '';
    result += frase
      //split: separando o valor por espaço (ex: 'Learning' -> 'JavaScript' -> 'Data'...)
      .split(' ')
      .map((el: string) => 
        el.slice(0, 1).toUpperCase() + // pegando a PRIMEIRA LETRA (0), e APENAS A PRIMEIRA LETRA (1), e transformando em maiúsculo
        el.slice(1).toLowerCase()) // e transformando o restante da palavra - a partir do 1º caracter (1) - em minúsculo)
      .join(' ');

    console.log(result);
    
    return result;
  }

}
