import { Component } from '@angular/core';
import { InfoSectionComponent } from '@app/shared/components/info-section/info-section.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [InfoSectionComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {}
