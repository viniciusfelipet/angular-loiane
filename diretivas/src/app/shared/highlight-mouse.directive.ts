import { Directive, HostListener, ElementRef, Renderer2, HostBinding } from '@angular/core';

@Directive({
  selector: '[highlightMouse]'
})
export class HighlightMouseDirective {

  constructor(private elementRef: ElementRef, private render: Renderer2) { }

  // HostListener - escuta um evento feito pela tag que está utilizado essa diretiva no html e dispara o metodo:
  // com o mouse em cima do texto
  @HostListener('mouseenter') onMouseOver() {
    //this.render.setStyle(this.elementRef.nativeElement, 'background-color', 'red')
    this.backgroundColor = 'red';
  }

  // com o mouse fora do texto
  @HostListener('mouseleave') onMouseLeave() {
    //this.render.setStyle(this.elementRef.nativeElement, 'background-color', 'white')
    this.backgroundColor = 'white';
  }

  // HostBinding - Permite fazer o binding (associação) de um atributo ou classe para uma variavel
  //@HostBinding('style.backgroundColor') backgroundColor: string;

  // HostBinding - usar esse quando quiser fazer alguma manipulação antes de alterar a cor
  private backgroundColor: string;
  @HostBinding('style.backgroundColor') get setColor() {
    // código extra
    return this.backgroundColor;
  }
}
