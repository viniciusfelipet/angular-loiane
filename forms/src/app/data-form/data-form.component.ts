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
    return this.formulario.get(campo).invalid && this.formulario.get(campo).touched;
  }

  verificaEmailInvalido() {
    let campoEmail = this.formulario.get('email');

    if (campoEmail.errors) {
      return campoEmail.errors.required && campoEmail.touched;
    }
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

    /*Não é muito utilizado quando se tem muitos campos, pois é obrigatório informar todos os campos: formulario.setValue({
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

}
