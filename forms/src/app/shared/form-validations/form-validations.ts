import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormValidations {
  static requiredMinCheckbox(min = 1) {
    const validator = (formArray: FormArray) => {
      /*const values = formArray.controls;
          let totalChecked = 0;
    
          for (let i = 0; i < values.length; i++) {
            if (values[i].value) {
              totalChecked += 1;
            }
          }*/

      // Mesma coisa que está acima, porém em linguagem funcional
      const totalChecked = formArray.controls
        .map((v) => v.value)
        .reduce((total, current) => (current ? total + 1 : total), 0);

      return totalChecked >= min ? null : { required: true };
    };
    return validator;
  }

  static cepValidator(control: FormControl) {
    const cep = control.value;

    if (cep && cep !== '') {
      //Expressão regular para validar o CEP.
      var validaCep = /^[0-9]{8}$/;
      return validaCep.test(cep) ? null : { cepInvalido: true };
    }
    return null;
  }

  // Metodo generico para comparar dois campos
  static equalsTo(otherField: string) {
    
    // campo que será utilizado para validação (ex: 'confirmarEmail')
    const validator = (formControl: FormControl) => {
      if (otherField == null) {
          throw new Error('É necessário informar um campo.');
      }

      // validação para certificar primeiro a inicialização do formulário
      // Pois é possível que o FORMULARIO ou CAMPO ainda não estejam pronto para uso
      if(!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      // campo a ser "comparado" (ex: 'email')
      const field = (<FormGroup>formControl.root).get(otherField);

      if(!field) {
        throw new Error('É necessário informar um campo válido.');
      }

      // comparação:
      if (field.value !== formControl.value) {
        return { equalsTo: otherField }  
        //return { equalsTo: true } - é possível retornar qualquer coisa
      }

      // campo valido
      return null;
    };

    return validator;
  }

}
