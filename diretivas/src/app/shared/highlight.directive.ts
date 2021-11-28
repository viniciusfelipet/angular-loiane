import { Directive, HostListener, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {


  constructor() { }

  // HostListener - escuta um evento feito pela tag que está utilizado essa diretiva no html e dispara o metodo:
  @HostListener('mouseenter') onMouseOver() {
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.backgroundColor = this.defaultColor;
  }

  // HostBinding - Permite fazer o binding (associação) de um atributo ou classe para uma variavel
  @HostBinding('style.backgroundColor') backgroundColor: string;

  @Input() defaultColor: string = 'white';
  @Input() highlightColor: string = 'red';

  ngOnInit(){
    this.backgroundColor = this.defaultColor;
  }
}
