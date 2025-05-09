import { ComponentProps, forwardRef, useImperativeHandle, useRef } from 'react';
import getAriaLabel from './accessibility/getAriaLabel';
import NewTabAccessibilityLabel from './accessibility/NewTabAccessibilityLabel';
import Box from './Box';
import Button from './Button';
import { useColorScheme } from './contexts/ColorSchemeProvider';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider';
import Icon from './Icon';
import icons from './icons/index';
import InternalLink from './Link/InternalLink';
import Text from './Text';
import TextUI from './TextUI';
import useExperimentalTheme from './utils/useExperimentalTheme';

const DEFAULT_TEXT_COLORS = {
  blue: 'inverse',
  gray: 'default',
  red: 'inverse',
  transparent: 'default',
  semiTransparentWhite: 'default',
  transparentWhiteText: 'inverse',
  white: 'default',
  light: 'dark',
  dark: 'light',
} as const;

const SIZE_NAME_TO_PIXEL = {
  sm: 10,
  md: 12,
  lg: 12,
} as const;

type ButtonProps = {
  /**
   * Label to provide more context around ButtonLink’s function or purpose. See the [Accessibility guidelines](/foundations/accessibility) to learn more.,
   */
  accessibilityLabel?: string;
  /**
   * The background color of ButtonLink.
   */
  color?: ComponentProps<typeof Button>['color'];
  /**
   * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
   */
  dataTestId?: string;
  /**
   * Indicates if ButtonLink is disabled. Disabled Buttons are inactive and cannot be interacted with.
   */
  disabled?: boolean;
  /**
   * When supplied, the target (the file specified in the href attribute) will be downloaded when a user clicks on the hyperlink. If the value is a string, the string value will define the filename
   */
  download?: boolean | string;
  /**
   * Indicates whether this component is hosted in a light or dark container.
   * Used for improving focus ring color contrast.
   */
  focusColor?: 'lightBackground' | 'darkBackground';
  /**
   * An icon displayed after the text to help clarify the usage of ButtonLink. See the [icon variant](#Icons) to learn more.
   */
  iconEnd?: keyof typeof icons;
  /**
   * An icon displayed before the text to help clarify the usage of ButtonLink. See the [icon variant](#Icons) to learn more.
   */
  iconStart?: keyof typeof icons;
  /**
   * Default Buttons are sized by the text within the ButtonLink whereas full-width Buttons expand to the full width of their container.
   */
  fullWidth?: boolean;
  /**
   * Visually truncate the text to the specified number of lines. This also adds the `title` attribute if `children` is a string, which displays the full text on hover in most browsers. See the [truncation variant](https://gestalt.pinterest.systems/web/buttonlink#Truncation) for more details.
   */
  lineClamp?: 1;
  /**
   * Use "-1" to remove ButtonLink from keyboard navigation. See the [Accessibility guidelines](/foundations/accessibility) to learn more.
   */
  tabIndex?: -1 | 0;
  /**
     * Callback invoked when the user clicks (press and release) on ButtonLink with the mouse or keyboard.
       See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
     */
  onClick?: (arg1: {
    event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
    dangerouslyDisableOnNavigation: () => void;
  }) => void;
  /**
   * Callback fired when a mouse pointer moves in a ButtonLink component.
   */
  _onMouseEnter?: (arg1: { event: React.MouseEvent<HTMLAnchorElement> }) => void;
  /**
   * Callback fired when a mouse pointer moves out a ButtonLink component.
   */
  _onMouseLeave?: (arg1: { event: React.MouseEvent<HTMLAnchorElement> }) => void;
  /**
   * sm: 32px, md: 40px, lg: 48px
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Text to render inside the ButtonLink to convey the function and purpose of the ButtonLink.
   */
  text: string;
  /**
   * Specifies a link URL.
   */
  href: string;
  /**
   * Provides hints for SEO. See the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#rel) to learn more.
   */
  rel?: 'none' | 'nofollow';
  /**
     * Indicates the browsing context where an href will be opened:
  - 'null' opens the anchor in the same window.
  - 'blank' opens the anchor in a new window.
  - 'self' opens an anchor in the same frame.
     */
  target?: null | 'self' | 'blank';
};

/**
 * [ButtonLink](https://gestalt.pinterest.systems/buttonlink) is mainly used as a navigational element to direct users to a new page or location.
 *
 * ![ButtonLink light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ButtonLink.spec.ts-snapshots/ButtonLink-chromium-darwin.png)
 * ![ButtonLink dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ButtonLink-dark.spec.ts-snapshots/ButtonLink-dark-chromium-darwin.png)
 */

const ButtonLinkWithForwardRef = forwardRef<HTMLAnchorElement, ButtonProps>(function ButtonLink(
  {
    accessibilityLabel,
    color = 'gray',
    dataTestId,
    disabled = false,
    download,
    focusColor,
    fullWidth = false,
    iconEnd,
    iconStart,
    onClick,
    _onMouseEnter,
    _onMouseLeave,
    lineClamp,
    tabIndex = 0,
    size = 'md',
    text,
    href,
    rel = 'none',
    target = null,
  }: ButtonProps,
  ref,
) {
  const textSizesVR: {
    [key: string]: 'xs' | 'sm' | 'md';
  } = {
    sm: 'xs',
    md: 'sm',
    lg: 'md',
  };

  const innerRef = useRef<null | HTMLAnchorElement>(null);

  // When using both forwardRef and innerRef, React.useimperativehandle() allows a parent component
  // that renders <ButtonLink ref={inputRef} /> to call inputRef.current.focus()
  // @ts-expect-error - TS2322 - Type 'HTMLAnchorElement | null' is not assignable to type 'HTMLAnchorElement'.
  useImperativeHandle(ref, () => innerRef.current);

  const theme = useExperimentalTheme();

  const { accessibilityNewTabLabel } = useDefaultLabelContext('Link');

  const { colorSchemeName } = useColorScheme();
  // We need to make a few exceptions for accessibility reasons in darkMode for red buttons
  const isDarkMode = colorSchemeName === 'darkMode';
  const isDarkModeRed = isDarkMode && color === 'red';

  const textColor =
    (disabled && 'disabled') || (isDarkModeRed && 'default') || DEFAULT_TEXT_COLORS[color];

  const ariaLabel = getAriaLabel({
    target,
    accessibilityLabel,
    accessibilityNewTabLabel,
  });

  const handleClick = ({
    event,
    dangerouslyDisableOnNavigation,
  }: {
    dangerouslyDisableOnNavigation: () => void;
    event: React.KeyboardEvent<HTMLAnchorElement> | React.MouseEvent<HTMLAnchorElement>;
  }) =>
    onClick
      ? onClick({
          event,
          dangerouslyDisableOnNavigation: dangerouslyDisableOnNavigation ?? (() => {}),
        })
      : undefined;

  const handleOnMouseEnter: ComponentProps<typeof InternalLink>['onMouseEnter'] = ({ event }) => {
    // @ts-expect-error - TS2322 - Type 'MouseEvent<HTMLAnchorElement, MouseEvent> | MouseEvent<HTMLDivElement, MouseEvent>' is not assignable to type 'MouseEvent<HTMLAnchorElement, MouseEvent>'.
    _onMouseEnter?.({ event });
  };
  const handleOnMouseLeave: ComponentProps<typeof InternalLink>['onMouseLeave'] = ({ event }) =>
    // @ts-expect-error - TS2322 - Type 'MouseEvent<HTMLAnchorElement, MouseEvent> | MouseEvent<HTMLDivElement, MouseEvent>' is not assignable to type 'MouseEvent<HTMLAnchorElement, MouseEvent>'.
    _onMouseLeave?.({ event });

  return (
    <InternalLink
      ref={innerRef}
      accessibilityLabel={ariaLabel}
      colorClass={color}
      dataTestId={dataTestId}
      disabled={disabled}
      download={download}
      focusColor={focusColor}
      fullWidth={fullWidth}
      href={href}
      onClick={handleClick}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      rel={rel}
      selected={false}
      size={size}
      tabIndex={tabIndex}
      target={target}
      wrappedComponent="button"
    >
      {iconStart ? (
        <Box height={SIZE_NAME_TO_PIXEL[size]} marginEnd={1.5} width={SIZE_NAME_TO_PIXEL[size]}>
          <Icon
            accessibilityLabel=""
            color={textColor}
            icon={iconStart}
            size={SIZE_NAME_TO_PIXEL[size]}
          />
        </Box>
      ) : null}
      {theme.MAIN ? (
        <TextUI
          align="center"
          color={textColor}
          lineClamp={lineClamp}
          overflow="normal"
          size={textSizesVR[size]}
        >
          {text}
        </TextUI>
      ) : (
        <Text
          align="center"
          color={textColor}
          lineClamp={lineClamp}
          overflow="normal"
          size={size === 'sm' ? '200' : '300'}
          weight="bold"
        >
          {text}
        </Text>
      )}
      {iconEnd ? (
        <Box height={SIZE_NAME_TO_PIXEL[size]} marginStart={1.5} width={SIZE_NAME_TO_PIXEL[size]}>
          <Icon
            accessibilityLabel=""
            color={textColor}
            icon={iconEnd}
            size={SIZE_NAME_TO_PIXEL[size]}
          />
        </Box>
      ) : null}
      <NewTabAccessibilityLabel target={target} />
    </InternalLink>
  );
});

ButtonLinkWithForwardRef.displayName = 'ButtonLink';

export default ButtonLinkWithForwardRef;
