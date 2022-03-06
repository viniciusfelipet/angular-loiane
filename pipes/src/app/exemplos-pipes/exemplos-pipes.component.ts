import { map } from 'rxjs/operators';
import { Observable, interval } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.scss'],
})
export class ExemplosPipesComponent implements OnInit {
  livro: any = {
    titulo: 'Learning JAVASCRIPT Data Structures and Algorithms 2nd ed',
    rating: 4.54321,
    numeroPaginas: 314,
    preco: 44.99,
    dataLancamento: new Date(2016, 5, 23),
    url: 'http://a.co/glqjpRP',
  };

  livros: string[] = ['Java', 'Angular 2'];

  filtro: string = '';

  valorPromiseAsync = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Valor Promise Assíncrono'), 2000); // atribui o valor ('Valor Promise Assíncrono') à variavel valorAsync, depois de 2 segundos (2000)
  });

  valorObservableAsync = interval(2000).pipe(
    map((valor) => 'Valor Observable Assíncrono')
  );

  ngOnInit(): void {}

  addCurso(valor: string) {
    this.livros.push(valor);
    console.log('Valor adicionado:', this.livros);
  }

  obterCurso() {
    if (
      this.livros.length === 0 ||
      this.filtro === undefined ||
      this.filtro.trim() === ''
    ) {
      return this.livros;
    }

    return this.livros.filter((v) => {
      if (v.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0) {
        return true;
      }
      return false;
    });
  }
}
