import { EstadoBr } from './../shared/models/estado-br';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DropdownService } from './../shared/services/dropdown.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  // 1º - definir o FormGroup (representa todo o formulário)
  formulario: FormGroup;

  estados: EstadoBr[];

  // SEGUNDA FORMA DE CRIAR FORMULÁRIO:
  // FormBuilder - construtor de formulários
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropdownService
  ) { }

  ngOnInit(): void {

    this.dropDownService.getEstadosBr().subscribe((dados: EstadoBr[]) => {
      this.estados = dados;
      console.log(this.estados);
      
    });

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

      // Agrupando os seguintes dados dentro de um "objeto" 'endereco'
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      })
    });
  }

  onSubmit() {
    //Objeto fomulário (FormGroup):
    console.log(this.formulario);

    if (this.formulario.valid) {
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
    } else {
      console.log("formulário é invalido");
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup) {
    // Object.keys: realiza a extração de cada chave do objeto do formulário (nome, email, endereco)
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle.markAsTouched();

      // Verifica se o 'controle' é uma instância do tipo 'FormGroup'
      // OBS: Utilizado quando há objetos aninhados no formulario (ex: endereco)
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar() {
    this.formulario.reset();
  }

  consultaCep() {

    let cep = this.formulario.get('endereco.cep').value;

    // Nova variável "cep somente com dígitos"
    // var cep = $(this).val().replace(/\D/g, '');
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {

        this.resetaDadosForm();

        // Realiza a requisição
        this.http.get("https://viacep.com.br/ws/" + cep + "/json/")
          .subscribe(dados => this.populaDadosForm(dados));
        //.subscribe(dados => console.log(dados));
      }
    }
  }

  populaDadosForm(dados) {

    /*setValue: Não é muito utilizado quando se tem muitos campos, pois é obrigatório informar todos os campos: 
    formulario.setValue({
      nome: formulario.value.nome,
      email: formulario.value.email,
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        numero: '',
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });*/

    // OBS setValue: Pode ser utilizado para setar um unico campo
    this.formulario.get('nome').setValue('Vinicius');

    // patchValue: informa apenas uma parte do formulário a ser alterada
    //formulario.form.
    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

    //console.log(formulario);

  }

  resetaDadosForm() {
    //formulario.form.patchValue({
    this.formulario.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null,
      }
    });
  }

  aplicaCssErro(campo: string) {
    return {
      'was-validated': this.verificarValidTouched(campo)
      // caso tive mais coisa - ex: 'has-feedback': campo.invalid && campo.touched
    }
  }

  verificarValidTouched(campo) {
    //return campo.invalid && campo.touched

    // realizar o acesso ao formulario, associa o 'campo' ao respectivo campo das 
    // instancias de FormControl (na PRIMEIRA ou SEGUNDA forma de criar formulario)
    return this.formulario.get(campo).invalid && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty);
  }

  verificaEmailInvalido() {
    let campoEmail = this.formulario.get('email');

    if (campoEmail.errors) {
      return campoEmail.errors.required && campoEmail.touched;
    }
  }

}
