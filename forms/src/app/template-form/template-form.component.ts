import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null
  }

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(formulario) {
    console.log(formulario);
    //console.log(this.usuario);  
  }

}
