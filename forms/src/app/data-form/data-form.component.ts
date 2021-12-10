import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  // 1º - definir o FormGroup (representa todo o formulário)
  formulario: FormGroup;

  // SEGUNDA FORMA DE CRIAR FORMULÁRIO:
  // FormBuilder - construtor de formulários
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {

    // 2º - Inicializar o formulario

    /*
      // PRIMEIRA FORMA DE CRIAR FORMULÁRIO: 
      this.formulario = new FormGroup({
      
        // Definindo os campos do fomulário, informando que são do tipo FormControl e definindo
        // valor inicial para cada campo
        nome: new FormControl(null),
        email: new FormControl(null),

      });
    */

    // SEGUNDA FORMA DE CRIAR FORMULÁRIO - sintaxe simplificada, utilizando formBuilder:
    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
    });


  }

  onSubmit() {
    //Objeto fomulário (FormGroup):
    console.log(this.formulario);

    // https://httpbin.org/post -> site gratuito para teste de requisição sem servidor backend
    this.http.post("https://httpbin.org/post", JSON.stringify(this.formulario.value))
      .subscribe(dados => {

        // response:
        console.log(dados);

        // reseta o formulario:
        //this.formulario.reset();
        this.resetar();
      },
        // em caso de erro:
        (error: any) => alert('deu erro'));
  }

  resetar() {
    this.formulario.reset();
  }

  validaCssErro(campo) {
    return {
      'was-validated': this.verificarValidTouched(campo)
      // caso tive mais coisa - ex: 'has-feedback': campo.invalid && campo.touched
    }
  }

  verificarValidTouched(campo) {
    //return campo.invalid && campo.touched

    // realizar o acesso ao formulario, associa o 'campo' ao respectivo campo das 
    // instancias de FormControl (na PRIMEIRA ou SEGUNDA forma de criar formulario)
    return this.formulario.get(campo).invalid && this.formulario.get(campo).touched;
  }

  verificaEmailInvalido(){
    let campoEmail = this.formulario.get('email');

    if (campoEmail.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

}
