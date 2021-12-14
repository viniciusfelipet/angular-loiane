import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(formulario) {
    console.log(formulario);
    //console.log(this.usuario);  

    // https://httpbin.org/post -> site gratuito para teste de requisição sem servidor backend
    this.http.post("https://httpbin.org/post", JSON.stringify(formulario.value))
      .subscribe(dados => {
        console.log(dados);
        formulario.form.reset();
      });
  }

  validaCssErro(campo) {
    return {
      'was-validated': this.verificarValidTouched(campo)
      // caso tive mais coisa - ex: 'has-feedback': campo.invalid && campo.touched
    }
  }

  verificarValidTouched(campo) {
    return campo.invalid && campo.touched
  }

  consultaCep(cep, form) {

    // Nova variável "cep somente com dígitos"
    // var cep = $(this).val().replace(/\D/g, '');
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {

        this.resetaDadosForm(form);

        // Realiza a requisição
        this.http.get("https://viacep.com.br/ws/" + cep + "/json/")
          .subscribe(dados => this.populaDadosForm(dados, form));
        //.subscribe(dados => console.log(dados));
      }
    }
  }

  populaDadosForm(dados, formulario) {

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
    formulario.form.patchValue({
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

  resetaDadosForm(formulario) {
    formulario.form.patchValue({
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
