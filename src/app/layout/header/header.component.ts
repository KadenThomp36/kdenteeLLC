import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, shareReplay } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MenuItem } from '@app/data/interfaces/MenuItem';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private breakpointObserver = inject(BreakpointObserver);
  mobile$: Observable<boolean>;

  @Output() toggleDrawer = new EventEmitter<void>();
  @Input() menuItems: MenuItem[] = [];

  constructor(private router: Router) {
    this.mobile$ = this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
      .pipe(
        map((result) => result.matches),
        shareReplay()
      );
  }

  onToggleDrawer() {
    this.toggleDrawer.emit();
  }

  onContactClick() {
    this.router.navigate(['/contact']);
  }
}
