import { render, screen } from '@testing-library/react';
import DefaultLabelProvider, { useDefaultLabelContext } from './DefaultLabelProvider';

// DefaultLabelProvider is basically a passthrough to the React Context.Provider, so no tests required

describe('useDefaultLabelContext', () => {
  it('returns provided string values for a supported component', () => {
    function TestComponent() {
      const { accessibilityHidePasswordLabel, accessibilityShowPasswordLabel } =
        useDefaultLabelContext('TextField');

      return <div>{[accessibilityHidePasswordLabel, accessibilityShowPasswordLabel]}</div>;
    }

    render(
      <DefaultLabelProvider
        labels={{
          Accordion: {
            accessibilityCollapseLabel: 'Collapse section',
            accessibilityExpandLabel: 'Expand section',
          },
          ActivationCard: {
            accessibilityDismissButtonLabel: 'Dismiss',
          },
          BannerOverlay: {
            accessibilityDismissButtonLabel: 'Dismiss Banner',
          },
          BannerCallout: {
            accessibilityDismissButtonLabel: 'Dismiss Banner',
            iconAccessibilityLabelError: 'Error',
            iconAccessibilityLabelInfo: 'Information',
            iconAccessibilityLabelRecommendation: 'Recommendation',
            iconAccessibilityLabelWarning: 'Warning',
            iconAccessibilityLabelSuccess: 'Success',
          },
          ButtonSocial: {
            textLoginEmail: 'Login with Email',
            textLoginFacebook: 'Login with Facebook',
            textLoginGoogle: 'Login with Google',
            textLoginApple: 'Login with Apple',
            textLoginLine: 'Login with Line',
            textContinueEmail: 'Continue with Email',
            textContinueFacebook: 'Continue with Facebook',
            textContinueGoogle: 'Continue with Google',
            textContinueApple: 'Continue with Apple',
            textContinueLine: 'Continue with Line',
            textSignupEmail: 'Sign up with Email',
            textSignupFacebook: 'Sign up with Facebook',
            textSignupGoogle: 'Sign up with Google',
            textSignupApple: 'Sign up with Apple',
            textSignupLine: 'Sign up with Line',
          },
          ChartGraph: {
            accessibilityLabelPrefixText: 'ChartGraph',
            defaultViewText: 'Default view mode',
            accessibleViewText: 'Visual pattern view',
            tabularData: 'Tabular data',
            accessibilityLabelDismissModal: 'Dismiss tabular data modal',
            tableSeriesText: 'Series',
            tableXAxisText: 'x-axis values',
            tableYAxisText: 'y-axis values',
            downloadCsvButtonText: 'Download as .csv',
            cancelButtonText: 'Cancel',
          },
          ComboBox: {
            noResultText: 'No results',
            accessibilityClearButtonLabel: 'Clear input',
          },
          DatePicker: {
            accessibilityDismissButtonLabel: 'Dismiss date picker',
            dismissButton: 'Close',
            openCalendar: 'Open calendar',
            previousMonth: 'Navigate to previou month',
            nextMonth: 'Navigate to next month',
          },
          DateRange: {
            cancelText: 'Cancel',
            applyText: 'Apply',
          },
          Link: {
            accessibilityNewTabLabel: 'Opens a new tab',
            accessibilityDownloadLabel: 'Downloads a file',
          },
          Modal: {
            accessibilityDismissButtonLabel: 'Dismiss modal',
          },
          Popover: {
            accessibilityDismissButtonLabel: 'Dismiss popover',
          },
          OverlayPanel: {
            accessibilityDismissButtonLabel: 'Dismiss overlay panel',
            dismissConfirmationMessage: 'Are you sure you want to dismiss?',
            dismissConfirmationSubtext: 'You will lose all of your changes. This cannot be undone.',
            dismissConfirmationPrimaryActionText: 'Yes, dismiss',
            dismissConfirmationPrimaryActionTextLabel: 'Yes, dismiss the overlay panel.',
            dismissConfirmationSecondaryActionText: 'No, go back',
            dismissConfirmationSecondaryActionTextLabel: 'No, go back to the overlay panel.',
          },
          SheetMobile: {
            accessibilityDismissButtonLabel: 'Dismiss bottom sheet',
            accessibilityGrabberLabel: 'Grabber',
            accessibilityLabel: 'Bottom sheet',
          },
          SideNavigation: {
            accessibilityDismissButtonLabel: 'Dismiss side navigation',
            accessibilityCollapseButtonLabel: 'Navigation expanded. Click button to collapse.',
            accessibilityExpandButtonLabel: 'Navigation collapsed. Click button to expand.',
            accessibilityEllipsisLabel: 'Collapsed navigation items. Expand for more options',
          },
          BannerSlim: {
            accessibilityDismissButtonLabel: 'Dismiss Banner',
            iconAccessibilityLabelError: 'Error',
            iconAccessibilityLabelInfo: 'Information',
            iconAccessibilityLabelRecommendation: 'Recommendation',
            iconAccessibilityLabelWarning: 'Warning',
            iconAccessibilityLabelSuccess: 'Success',
          },
          SearchField: {
            accessibilityClearButtonLabel: 'Clear input',
          },
          Spinner: {
            accessibilityLabel: 'Loading',
          },
          TableOfContents: {
            accessibilityLabel: 'Table of contents',
          },
          Tag: {
            accessibilityErrorIconLabel: 'Error',
            accessibilityRemoveIconLabel: 'Remove tag',
            accessibilityWarningIconLabel: 'Warning',
          },
          TagData: {
            accessibilityRemoveIconLabel: 'Remove tag',
          },
          TextField: {
            accessibilityHidePasswordLabel: 'Hide password',
            accessibilityShowPasswordLabel: 'Show password',
          },
          HelpButton: {
            tooltipMessage: 'Click to learn more',
          },
          Tabs: {
            accessibilityNotificationLabel: 'This tab is displaying a notification indicator',
          },
          Toast: {
            accessibilityDismissButtonLabel: 'Dismiss message',
            accessibilityIconSuccessLabel: 'Success message',
            accessibilityIconErrorLabel: 'Error message',
            accessibilityProcessingLabel: 'Processing message',
          },
          BannerUpsell: {
            accessibilityDismissButtonLabel: 'Dismiss banner',
          },
          Video: {
            accessibilityMaximizeLabel: 'Maximize',
            accessibilityMinimizeLabel: 'Minimize',
            accessibilityMuteLabel: 'Mute',
            accessibilityPauseLabel: 'Pause',
            accessibilityPlayLabel: 'Play',
            accessibilityProgressLabel: 'Video progress',
            accessibilityUnmuteLabel: 'Unmute',
            accessibilityHideCaptionsLabel: 'Hide captions',
            accessibilityShowCaptionsLabel: 'Show captions',
          },
        }}
      >
        <TestComponent />
      </DefaultLabelProvider>,
    );

    // This is a bit roundabout — we don't really care that these strings are in the document, but that they were returned from the Hook correctly
    expect(screen.getByText(/Hide password/)).toBeInTheDocument();
    expect(screen.getByText(/Show password/)).toBeInTheDocument();
  });
});
