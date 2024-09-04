import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgxGradientTextComponent } from '@omnedia/ngx-gradient-text';
import { NgxTypewriterComponent } from '@omnedia/ngx-typewriter';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [MatButtonModule, NgxGradientTextComponent, NgxTypewriterComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {}
