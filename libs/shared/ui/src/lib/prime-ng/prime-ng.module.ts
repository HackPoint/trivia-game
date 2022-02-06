import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { BlockUIModule } from 'primeng/blockui';

const MODULE = [ButtonModule, CardModule, CarouselModule, RippleModule, BlockUIModule];


@NgModule({
  exports: [...MODULE],
  imports: [...MODULE]
})
export class PrimeNgModule {
}
