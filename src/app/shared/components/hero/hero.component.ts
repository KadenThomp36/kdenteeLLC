import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CoreUtilitiesService } from '@app/data/services/utilities/core-utilities.service';
import { NgxGradientTextComponent } from '@omnedia/ngx-gradient-text';
import { NgxTypewriterComponent } from '@omnedia/ngx-typewriter';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [MatButtonModule, NgxGradientTextComponent, NgxTypewriterComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  constructor(private coreUtilities: CoreUtilitiesService) {}

  onContactClick() {
    this.coreUtilities.trackNavigation('Contact');
    this.coreUtilities.routeTo('/contact');
  }
}
