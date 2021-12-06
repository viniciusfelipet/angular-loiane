import { LogService } from './../shared/log.service';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  emitirCursoCriado = new EventEmitter<string>();

  // Ao colocar como estatico um atributo ou metodo, dizemos que 
  // não precisamos da instancia da classe para acessar o atributo/metodo
  static criouNovoCurso = new EventEmitter<string>();

  private cursos: string[] = ['Angular', 'Java', 'React'];
 
  constructor(private logService: LogService) { 
    console.log('Instanciou CursosService');
  }

  getCursos() {
    this.logService.consoleLog('Obtendo lista de cursos');
    return this.cursos;
  }

  addCurso(curso: string) {
    this.logService.consoleLog('Adicionando/Criando um novo curso: ' + curso);
    //this.logService.consoleLog(`Criando um novo curso ${curso}`);

    this.cursos.push(curso);
    this.emitirCursoCriado.emit(curso);
    CursosService.criouNovoCurso.emit(curso);
  }

}
