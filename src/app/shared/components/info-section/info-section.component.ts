import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-section',
  standalone: true,
  imports: [],
  templateUrl: './info-section.component.html',
  styleUrl: './info-section.component.scss',
})
export class InfoSectionComponent {
  @Input() headline: string = '';
  @Input() copy: string = '';
  @Input() imageSrc: string = '';
  @Input() imageAlt: string = '';
}
