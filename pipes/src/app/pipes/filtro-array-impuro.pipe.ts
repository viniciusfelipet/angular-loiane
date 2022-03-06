import { Pipe } from '@angular/core';

import { FiltroArrayPuroPipe } from './filtro-array-puro.pipe';

@Pipe({
  name: 'filtroArrayImpuro',
  pure: false
})
export class FiltroArrayImpuroPipe extends FiltroArrayPuroPipe {
  
}
