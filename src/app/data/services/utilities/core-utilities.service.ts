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

  trackFormSuccess(label: string) {
    gtag('event', 'form_submission', {
      event_category: 'Contact',
      event_label: label,
    });
  }
  trackFormError(label: string) {
    gtag('event', 'form_submission_error', {
      event_category: 'Contact',
      event_label: label,
    });
  }
  trackEvent(eventName: string, category: string, label: string) {
    gtag('event', eventName, {
      event_category: category,
      event_label: label,
    });
  }
}
