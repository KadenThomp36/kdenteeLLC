declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void
  }
}

export const GA_TRACKING_ID = 'G-7X2J418LQ8'

export function trackEvent(
  eventName: string,
  category: string,
  label: string,
  value?: number
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

export function trackNavigation(label: string) {
  trackEvent('navigation_click', 'Navigation', label)
}

export function trackFormSuccess(label: string) {
  trackEvent('form_success', 'Form', label)
}

export function trackFormError(label: string) {
  trackEvent('form_error', 'Form', label)
}
