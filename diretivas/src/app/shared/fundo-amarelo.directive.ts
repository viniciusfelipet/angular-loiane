import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  // aplica a diretiva somente na tag que foi colocada antes do nome do selector
  selector: 'p[fundoAmarelo]'
})
export class FundoAmareloDirective {

  constructor(private elementRef: ElementRef, private render: Renderer2) {
    //console.log(this.elementRef);
    // não é uma boa pratica: this.elementRef.nativeElement.style.backgroundColor = 'yellow'; 

    // boa pratica - (referencia_do_elemento + estilo a ser alterado + valor do estilo): 
    this.render.setStyle(this.elementRef.nativeElement, 'background-color', 'yellow');
   }

}
