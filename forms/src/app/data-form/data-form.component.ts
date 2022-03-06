import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { FormValidations } from '../shared/form-validations/form-validations';
import { EstadoBr } from './../shared/models/estado-br';
import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { DropdownService } from './../shared/services/dropdown.service';
import { VerificaEmailsService } from './services/verifica-emails.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css'],
})
export class DataFormComponent extends BaseFormComponent implements OnInit {
  // 1º - definir o FormGroup (representa todo o formulário)
  //formulario: FormGroup;

  estados: EstadoBr[];
  cargos: any[];
  tecnologias: any[];
  newsletterOpcs: any[];

  frameworks = ['Angular', 'React', 'Vue', 'Sencha'];

  // SEGUNDA FORMA DE CRIAR FORMULÁRIO:
  // FormBuilder - construtor de formulários
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropdownService,
    private consultaCepService: ConsultaCepService,
    private verificarEmailService: VerificaEmailsService
  ) {
    super();
  }

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
      nome: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
        [this.validarEmail.bind(this)],
      ],
      confirmarEmail: [null, FormValidations.equalsTo('email')],

      // Agrupando os seguintes dados dentro de um "objeto" 'endereco'
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),
      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [null, Validators.requiredTrue],
      frameworks: this.buildFrameworks(),
    });

    //Validações reativas
    /* valueChanges: evento disparado quando os valores mudam
    this.formulario
      .get('endereco.cep')
      .valueChanges.subscribe((value) => console.log('valor CEP:', value));*/

    /* statusChanges: evento disparado quando o status muda*/
    /*this.formulario
      .get('endereco.cep')
      .statusChanges.pipe(
        distinctUntilChanged(),
        tap((value) => console.log('status:', value)),
        switchMap((status) =>
          status === 'VALID'
            ? this.consultaCepService
                .consultaCep(this.formulario.get('endereco.cep').value)
            : EMPTY
        )
      )
      .subscribe(dados => dados ? this.populaDadosForm(dados) : {});*/
    //----

    this.dropDownService.getCidades(8).subscribe(console.log);
    
  }

  submit() {
    //Objeto fomulário (FormGroup):
    console.log(this.formulario);

    // Copiar objeto para outro: Object.assign(<destino>, <origem>);
    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((valor, indice) => (valor ? this.frameworks[indice] : null))
        .filter((v) => v !== null),
    });

    console.log(valueSubmit);

    // https://httpbin.org/post -> site gratuito para teste de requisição sem servidor backend
    this.http
      .post('https://httpbin.org/post', JSON.stringify(valueSubmit))
      .subscribe(
        (dados) => {
          // response:
          console.log(dados);

          // reseta o formulario:
          //this.formulario.reset();
          this.resetar();
        },
        // em caso de erro:
        (error: any) => alert('deu erro')
      );
  }



  consultaCep() {
    let cep = this.formulario.get('endereco.cep').value;

    if (cep != null && cep !== '') {
      this.consultaCepService
        .consultaCep(cep)
        .subscribe((dados) => this.populaDadosForm(dados));
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
        estado: dados.uf,
      },
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
      },
    });
  }

  setarCargo() {
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev PL' };

    this.formulario.get('cargo').setValue(cargo);
  }

  compararCargos(obj1: any, obj2: any) {
    return obj1 && obj2
      ? obj1.nome === obj2.nome && obj1.nivel === obj2.nivel
      : obj1 === obj2;
  }

  setarTecnologias() {
    this.formulario.get('tecnologias').setValue(['java', 'angular']);
  }

  buildFrameworks() {
    const values = this.frameworks.map((v) => new FormControl(false));

    return this.formBuilder.array(
      values,
      FormValidations.requiredMinCheckbox(1)
    );
  }

  validarEmail(formControl: FormControl) {
    return this.verificarEmailService
      .verificarEmail(formControl.value)
      .pipe(
        map((emailExiste) => (emailExiste ? { emailInvalido: true } : null))
      );
  }
}
