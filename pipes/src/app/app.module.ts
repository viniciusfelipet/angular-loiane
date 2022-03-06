import { FormsModule } from '@angular/forms';
import '@angular/common/locales/global/pt';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ExemplosPipesComponent } from './exemplos-pipes/exemplos-pipes.component';
import { CamelCasePipe } from './pipes/camel-case.pipe';
import { SettingsService } from './settings/settings.service';
import { FiltroArrayPuroPipe } from './pipes/filtro-array-puro.pipe';
import { FiltroArrayImpuroPipe } from './pipes/filtro-array-impuro.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ExemplosPipesComponent,
    CamelCasePipe,
    FiltroArrayPuroPipe,
    FiltroArrayImpuroPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ 
    /*{ 
      provide: LOCALE_ID,
      useValue: 'pt' 
    }*/
    // faz a mesma coisa que acima, porém obtem o valor de 'pt' de um "servidor"/serviço
    SettingsService,
    {
      provide: LOCALE_ID,
      deps: [SettingsService],
      useFactory: (settingsService: SettingsService) => settingsService.getLocale()
    }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
