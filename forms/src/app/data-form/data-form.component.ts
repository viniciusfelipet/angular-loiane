import { VerificaEmailsService } from './services/verifica-emails.service';
import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { EstadoBr } from './../shared/models/estado-br';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { DropdownService } from './../shared/services/dropdown.service';
import { FormValidations } from '../shared/form-validations/form-validations';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  // 1º - definir o FormGroup (representa todo o formulário)
  formulario: FormGroup;

  estados: EstadoBr[];
  cargos: any[];
  tecnologias: any[];
  newsletterOpcs: any[];

  frameworks = ['Angular', 'React', 'Vue', 'Sencha']

  // SEGUNDA FORMA DE CRIAR FORMULÁRIO:
  // FormBuilder - construtor de formulários
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropdownService,
    private consultaCepService: ConsultaCepService,
    private verificarEmailService: VerificaEmailsService
  ) { }

  ngOnInit(): void {
    //this.verificarEmailService.verificarEmail('email@email.com').subscribe();

    this.dropDownService.getEstadosBr().subscribe((dados: EstadoBr[]) => {
      this.estados = dados;
      console.log(this.estados);

    });

    this.cargos = this.dropDownService.getCargos();
    this.tecnologias = this.dropDownService.getTecnologias();
    this.newsletterOpcs = this.dropDownService.getNewsletter();

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
      email: [null, Validators.compose([Validators.required, Validators.email]), [this.validarEmail.bind(this)]],
      confirmarEmail: [null, FormValidations.equalsTo('email')],

      // Agrupando os seguintes dados dentro de um "objeto" 'endereco'
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [null, Validators.requiredTrue],
      frameworks: this.buildFrameworks()
    });
  }

  onSubmit() {
    //Objeto fomulário (FormGroup):
    console.log(this.formulario);

    // Copiar objeto para outro: Object.assign(<destino>, <origem>);
    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((valor, indice) => valor ? this.frameworks[indice] : null)
        .filter(v => v !== null)
    });

    console.log(valueSubmit);


    if (this.formulario.valid) {
      // https://httpbin.org/post -> site gratuito para teste de requisição sem servidor backend
      this.http.post("https://httpbin.org/post", JSON.stringify(valueSubmit))
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

    if (cep != null && cep !== '') {
      this.consultaCepService.consultaCep(cep).subscribe(dados => this.populaDadosForm(dados));
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
    return this.formulario.get(campo).invalid 
          && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty);
  }

  verificaRequired(campo) {
    return (
      this.formulario.get(campo).hasError('required') 
      && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty));
  }

  verificaEmailInvalido() {
    let campoEmail = this.formulario.get('email');

    if (campoEmail.errors) {
      return campoEmail.errors.required && campoEmail.touched;
    }
  }

  setarCargo() {
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev PL' };

    this.formulario.get('cargo').setValue(cargo);
  }

  compararCargos(obj1: any, obj2: any) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

  setarTecnologias() {
    this.formulario.get('tecnologias').setValue(['java', 'angular']);
  }

  buildFrameworks() {

    const values = this.frameworks.map(v => new FormControl(false));

    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1));
  }

  validarEmail(formControl: FormControl) {
    return this.verificarEmailService.verificarEmail(formControl.value)
      .pipe(map(emailExiste => emailExiste ? { emailInvalido: true } : null));
  }
}
