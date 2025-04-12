import { Component } from '@angular/core';
import { HeroComponent } from '@app/shared/components/hero/hero.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NgxShineBorderComponent } from '@omnedia/ngx-shine-border';
import { NgxLampComponent } from '@omnedia/ngx-lamp';
import { NgxAuroraComponent } from '@omnedia/ngx-aurora';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    MatGridListModule,
    MatCardModule,
    CommonModule,
    NgxShineBorderComponent,
    NgxLampComponent,
    NgxAuroraComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  services = [
    {
      name: 'Web UI Design',
      description:
        'I collaborate with clients to bring their visions to life by designing modern, user-friendly websites tailored to their business needs.',
    },
    {
      name: 'Photography',
      description:
        'Enhance your website with personalized photography that showcases your business inside and out, creating a unique and professional online presence.',
    },
    {
      name: 'Hosting & Maintenance',
      description:
        'Let me handle the technical aspects of your website, including hosting and ongoing maintenance, so you can focus on your business.',
    },
    {
      name: 'Search Engine Optimization (SEO)',
      description:
        'I optimize your website to improve its visibility on search engines, helping it rank higher and attract more potential customers.',
    },
  ];

  breakpoint = 1;

  ngOnInit() {
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2;
  }

  onResize(event: Event) {
    this.breakpoint = (event.target as Window).innerWidth <= 600 ? 1 : 2;
  }
}
