import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CoreUtilitiesService {
  constructor(private router: Router) {}

  routeTo(path: string) {
    this.router.navigate([path]);
  }
  trackNavigation(label: string) {
    gtag('event', 'navigation_click', {
      event_category: 'Navigation',
      event_label: label,
    });
  }
}
