import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {

  url: string = "http://loiane.com"
  cursoAngular: boolean = true;
  urlImagem = 'http://lorempixel.com/400/200/nature/'

  valorAtual: string = '';
  valorSalvo: string = '';

  isMouseOver: boolean = false;

  nomeDoCurso: string = "Angular";

  valorInicial: number = 15;

  getValor() {
    return 2;
  }

  getCurtirCurso() {
    return true;
  }

  botaoCliclado() {
    alert('Botão cliclado!');
  }

  onKeyUp(evento: KeyboardEvent) {
    //console.log( (<HTMLInputElement>evento.target).value );
    this.valorAtual = (<HTMLInputElement>evento.target).value;
  }

  salvarValor(valor: string){
    this.valorSalvo = valor;
  }

  onMouseOverOut() {
    this.isMouseOver = !this.isMouseOver;
  }

  onMudouValor(evento){
    console.log(evento.novoValor);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
