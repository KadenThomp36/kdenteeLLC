import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [SharedModule, CommonModule, ServicesRoutingModule],
})
export class ServicesModule {}
