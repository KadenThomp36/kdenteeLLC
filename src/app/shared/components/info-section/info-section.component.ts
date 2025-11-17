import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CoreUtilitiesService } from '@app/data/services/utilities/core-utilities.service';

@Component({
  selector: 'app-info-section',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './info-section.component.html',
  styleUrl: './info-section.component.scss',
})
export class InfoSectionComponent {
  @Input() headline: string = '';
  @Input() copy: string = '';
  @Input() imageSrc: string = '';
  @Input() imageAlt: string = '';
  @Input() buttonLink: string = '';

  constructor(private coreUtilities: CoreUtilitiesService) {}

  onProjectClick(projectName: string) {
    this.coreUtilities.trackEvent('project_click', 'Engagement', projectName);
  }
}
