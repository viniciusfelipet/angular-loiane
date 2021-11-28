import { 
  Component, 
  OnInit,
  OnChanges, 
  DoCheck, 
  AfterContentInit,
  AfterContentChecked, 
  AfterViewInit, 
  AfterViewChecked, 
  OnDestroy, 
  Input} from '@angular/core';

@Component({
  selector: 'app-ciclo',
  templateUrl: './ciclo.component.html',
  styleUrls: ['./ciclo.component.css']
})
export class CicloComponent implements OnInit,
OnChanges, 
DoCheck, 
AfterContentInit,
AfterContentChecked, 
AfterViewInit, 
AfterViewChecked, 
OnDestroy {

  @Input() valorInicial: number = 10;
  
  constructor() {
    this.logger('constructor');
  }

  ngOnChanges() {
    this.logger('ngOnChanges');
  }

  ngOnInit() {
    this.logger('ngOnInit');
  }

  ngDoCheck() {
    this.logger('ngDoCheck');
  }

  ngAfterContentInit() {
    this.logger('ngAfterContentInit');
  }

  ngAfterContentChecked() {
    this.logger('ngAfterContentChecked');
  }

  ngAfterViewInit() {
    this.logger('ngAfterViewInit');
  }

  ngAfterViewChecked() {
    this.logger('ngAfterViewChecked');
  }

  ngOnDestroy() {
    this.logger('ngOnDestroy');
  }

  private logger(hook: string) {
    console.log(hook);
  }
}
