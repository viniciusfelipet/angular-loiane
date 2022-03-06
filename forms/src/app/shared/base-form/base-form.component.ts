import { FormGroup, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-form',
  template: '<div></div>',
})
export abstract class BaseFormComponent implements OnInit {
  formulario: FormGroup;

  ngOnInit(): void {}

  abstract submit();

  onSubmit() {
    if (this.formulario.valid) {
      this.submit();
    } else {
      console.log('formulário é invalido');
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    // Object.keys: realiza a extração de cada chave do objeto do formulário (nome, email, endereco)
    Object.keys(formGroup.controls).forEach((campo) => {
      const controle = formGroup.get(campo);
      controle.markAsTouched();

      // Verifica se o 'controle' é uma instância do tipo 'FormGroup'
      // OBS: Utilizado quando há objetos aninhados no formulario (ex: endereco)
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar() {
    this.formulario.reset();
  }

  aplicaCssErro(campo: string) {
    return {
      'was-validated': this.verificarValidTouched(campo),
      // caso tive mais coisa - ex: 'has-feedback': campo.invalid && campo.touched
    };
  }

  verificarValidTouched(campo) {
    //return campo.invalid && campo.touched

    // realizar o acesso ao formulario, associa o 'campo' ao respectivo campo das
    // instancias de FormControl (na PRIMEIRA ou SEGUNDA forma de criar formulario)
    return (
      this.formulario.get(campo).invalid &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
  }

  verificaRequired(campo) {
    return (
      this.formulario.get(campo).hasError('required') &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
  }

  verificaEmailInvalido() {
    let campoEmail = this.formulario.get('email');

    if (campoEmail.errors) {
      return campoEmail.errors.required && campoEmail.touched;
    }
  }

  getCampo(campo: string) {
    return this.formulario.get(campo);
  }
}
