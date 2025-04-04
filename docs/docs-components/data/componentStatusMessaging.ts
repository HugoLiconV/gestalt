export const STATUS_EQUIVALENCY_MAP = Object.freeze({
  'ready': 'ok',
  'notAvailable': 'notAvailable',
  'partial': 'inProgress',
  'planned': 'unstarted',
  'deprecated': 'canceled',
});

export const STATUS_DESCRIPTION = Object.freeze({
  ready: { title: 'Ready', description: "Available for use. Has been reviewed and QA'd." },
  partial: {
    title: 'Partially ready',
    description: 'Ready, but all features may not be available.',
  },
  notAvailable: { title: 'Not available', description: 'Not currently available or planned.' },
  planned: {
    title: 'Planned',
    description: 'Slotted for an upcoming sprint or in the process of being updated.',
  },
  deprecated: { title: 'Deprecated', description: 'No longer supported by Gestalt.' },
});

export const COMPONENT_STATUS_MESSAGING = Object.freeze({
  accessible: { shortTitle: 'A11y', title: 'Accessibility' },
  documentation: {
    title: 'Documentation',
    ready: 'Component has been documented on web and mobile web.',
    partial: 'Component has been documented, however some content may be missing.',
    notAvailable: 'Component does not include documentation for web and mobile web.',
    planned: 'Component is slotted to be documented on web and mobile web.',
  },
  figmaStatus: {
    shortTitle: 'Figma',
    title: 'Figma Library',
    ready: 'Component is available in Figma for web and mobile web.',
    partial: 'Component is live in Figma, however may not be available for all platforms.',
    notAvailable: 'Component is not currently available in Figma.',
    planned: 'Component is slotted to be added to Figma.',
  },
  mobileAdaptive: {
    shortTitle: 'Adaptive',
    title: 'Adaptive Web',
    ready: 'Component uses a mobile-specific UI on mobile web.',
    partial: '',
    notAvailable: 'Component does not use a mobile-specific UI on mobile web.',
    planned: 'Component is slotted to be built to adapt to mobile web.',
  },
  responsive: {
    shortTitle: 'Responsive',
    title: 'Responsive Web',
    ready: 'Component responds to changing viewport sizes in web and mobile web.',
    partial: '',
    notAvailable: 'Component does not respond to changing viewport sizes in web and mobile web.',
    planned: 'Component is slotted to be built responsively for web and mobile web.',
  },
  status: {
    shortTitle: 'Status',
    title: 'Component Status',
    ready: 'Component is ready for use.',
    partial: 'Component is ready for use, however some features may not be available.',
    notAvailable: 'Component is not currently available.',
    planned: 'Component is slotted to be built.',
  },
});

export const COMPONENT_A11Y_STATUS_MESSAGING = Object.freeze({
  a11yVisual: {
    title: 'Visually accessible',
    ready: 'Component has been checked for appropriate color contrast, color use and readability.',
    partial:
      'Component has been reviewed, however it may not meet criteria for color contrast, color use and readability.',
    notAvailable:
      'Component has not been checked for appropriate color contrast, color use and readability.',
    planned: 'Component is slotted for accessibility improvements.',
  },
  a11yNavigation: {
    title: 'Navigable and operable',
    ready:
      'Component includes focus states and an intuitive structure that can be navigated using a keyboard or other input modalities.',
    partial:
      'Component has been reviewed, however it may not meet criteria for appropriate structure and navigation.',
    notAvailable: 'Component has not been checked for appropriate structure and navigation.',
    planned: 'Component is slotted for accessibility improvements.',
  },
  a11yScreenreader: {
    title: 'Screen reader compatible',
    ready:
      'Component has appropriate headings, labels, and alternative text that allows it to be verbally described by a screen reader.',
    partial:
      'Component has been reviewed, however it may not meet  criteria regarding headings, labels, and alternative text.',
    notAvailable:
      'Component has not been checked for appropriate headings, labels, and alternative text.',
    planned: 'Component is slotted for accessibility improvements.',
  },
  a11yComprehension: {
    title: 'Understandable',
    ready:
      'Component contains content that is understandable by most users, operates in predictable ways and provides intuitive error handling.',
    partial:
      'Component has been reviewed, however it may not meet  criteria for understandability and error handling. ',
    notAvailable: 'Component content has not been checked for understandability or error handling.',
    planned: 'Component is slotted for accessibility improvements.',
  },
});
