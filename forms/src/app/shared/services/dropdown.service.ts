import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr() {
    return this.http.get('assets/dados/estadosbr.json')
  }

  getCargos() {
    return [
      { nome: 'Dev', nivel: 'Junior', desc: 'Dev JR' },
      { nome: 'Dev', nivel: 'Pleno', desc: 'Dev PL' },
      { nome: 'Dev', nivel: 'Senior', desc: 'Dev SR' },
    ];
  }

  getTecnologias() {
    return [
      { nome: 'java', desc: 'Java' },
      { nome: 'angular', desc: 'Angular' },
      { nome: 'php', desc: 'PHP' },
      { nome: 'assembly', desc: 'Assembly' },
    ];
  }

  getNewsletter() {
    return [
      { valor: 's', desc: 'Sim' },
      { valor: 'n', desc: 'Não' }
    ]
  }

}
