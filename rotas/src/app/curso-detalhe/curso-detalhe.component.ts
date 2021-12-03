import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CursosService } from '../cursos/cursos.service';


@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent implements OnInit {

  id: number;
  inscricao: Subscription;
  curso: any;

  constructor(
    private routeActive: ActivatedRoute, 
    private cursosService: CursosService,
    private router: Router
    ) {
    //console.log(this.routeActive)
   }

  ngOnInit(): void {
    this.inscricao = this.routeActive.params.subscribe((params: any) => {
      this.id = params['id'];

      this.curso = this.cursosService.getCurso(this.id);

      if (this.curso == null) {
        this.router.navigateByUrl('/naoEncontrado');
      }
    });
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
