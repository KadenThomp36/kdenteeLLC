import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [SharedModule, CommonModule, AboutRoutingModule],
})
export class AboutModule {}
