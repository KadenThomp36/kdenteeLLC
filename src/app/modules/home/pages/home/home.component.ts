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
        'I work with clients to help them bring their visions to life and design an ideal website for their buisinesses.',
    },
    {
      name: 'Photography',
      description:
        'Personalize your website by shooting your business inside, out and in the air.',
    },
    {
      name: 'Hosting & Maintence',
      description:
        'I will manage all the technical details of your website so my clients can focus on running their busniess',
    },
    {
      name: 'Search Engine Optimization',
      description:
        'I will work to get your website included amoung the top user search results on google.',
    },

    // ... add 7 more services to complete the 3x3 grid
  ];

  breakpoint = 1;

  ngOnInit() {
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2;
  }

  onResize(event: Event) {
    this.breakpoint = (event.target as Window).innerWidth <= 600 ? 1 : 2;
  }
}
