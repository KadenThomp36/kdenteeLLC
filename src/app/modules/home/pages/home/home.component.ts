import { Component } from '@angular/core';
import { HeroComponent } from '@app/shared/components/hero/hero.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NgxLampComponent } from '@omnedia/ngx-lamp';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    MatGridListModule,
    MatCardModule,
    CommonModule,
    NgxLampComponent,
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  services = [
    {
      name: 'Web UI Design',
      description:
        'Creating modern, user-friendly websites that are visually appealing and tailored to meet your business goals.',
    },
    {
      name: 'Photography',
      description:
        'Offering personalized photography services to help showcase your brand and enhance your online presence.',
    },
    {
      name: 'Hosting & Maintenance',
      description:
        'Providing reliable hosting and ongoing maintenance to ensure your website runs smoothly and stays up-to-date.',
    },
    {
      name: 'Website Visibility (SEO)',
      description:
        'Optimizing your website to improve search engine rankings and attract more potential customers to your business.',
    },
  ];

  breakpoint = 1;

  ngOnInit() {
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2;
  }

  onResize(event: Event) {
    this.breakpoint = (event.target as Window).innerWidth <= 600 ? 1 : 2;
  }

  onResumeClick() {
    window.open('assets/pdf/Resume2025.pdf', '_blank');
  }
}
