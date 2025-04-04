import { Children, cloneElement, Fragment, ReactNode, useState } from 'react';
import AnimationProvider from './animation/AnimationContext';
import RequestAnimationFrameProvider from './animation/RequestAnimationFrameContext';
import Box from './Box';
import { useDeviceType } from './contexts/DeviceTypeProvider';
import { DropdownContextProvider } from './Dropdown/Context';
import DropdownItem from './DropdownItem';
import DropdownLink from './DropdownLink';
import DropdownSection from './DropdownSection';
import { DOWN_ARROW, ENTER, ESCAPE, SPACE, TAB, UP_ARROW } from './keyCodes';
import Layer from './Layer';
import InternalPopover from './Popover/InternalPopover';
import PartialPage from './SheetMobile/PartialPage';
import { DirectionOptionType } from './utils/keyboardNavigation';
import useExperimentalTheme from './utils/useExperimentalTheme';
import { Indexable } from './zIndex';

const KEYS = {
  UP: -1,
  DOWN: 1,
  ENTER: 0,
} as const;

const dropdownItemDisplayNames = ['Dropdown.Item', 'Dropdown.Link'];

// @ts-expect-error - TS7006 - Parameter 'childrenArray' implicitly has an 'any' type.
function getChildrenOptions(childrenArray) {
  // @ts-expect-error - TS2347 - Untyped function calls may not accept type arguments. | TS7006 - Parameter 'accumulatedChildren' implicitly has an 'any' type. | TS7006 - Parameter 'currentChild' implicitly has an 'any' type.
  return childrenArray.reduce<Array<any>>((accumulatedChildren, currentChild) => {
    const {
      props: { children: currentItemChildren },
      type,
      type: { displayName },
    } = currentChild;

    if ((currentItemChildren && displayName === 'Dropdown.Section') || type === Fragment) {
      return [
        ...accumulatedChildren,
        ...(Array.isArray(currentItemChildren)
          ? currentItemChildren.flat()
          : [currentItemChildren]),
      ];
    }

    if (dropdownItemDisplayNames.includes(displayName)) {
      return [...accumulatedChildren, currentChild];
    }

    // eslint-disable-next-line no-console
    console.error(
      'Only children of type Dropdown.Item, Dropdown.Link, or Dropdown.Section are allowed.',
    );

    return [...accumulatedChildren];
  }, []);
}

/* In order to properly supply a consecutive index to each Dropdown.Item,
 * used for keyboard navigation,
 * we must clone the item and inject the index prop
 */
// @ts-expect-error - TS7006 - Parameter 'dropdownChildren' implicitly has an 'any' type.
const renderDropdownItemsWithIndex = (dropdownChildren, idxBase: number) =>
  // @ts-expect-error - TS7006 - Parameter 'child' implicitly has an 'any' type. | TS7006 - Parameter 'idx' implicitly has an 'any' type.
  dropdownChildren.map((child, idx) => {
    if (dropdownItemDisplayNames.includes(child.type.displayName)) {
      const index = idx + idxBase;
      return cloneElement(child, { _index: index });
    }
    return child;
  });

// @ts-expect-error - TS7006 - Parameter 'childrenArray' implicitly has an 'any' type.
const renderChildrenWithIndex = (childrenArray) => {
  let numItemsRendered = 0;

  // @ts-expect-error - TS2347 - Untyped function calls may not accept type arguments. | TS7006 - Parameter 'acc' implicitly has an 'any' type. | TS7006 - Parameter 'child' implicitly has an 'any' type.
  return childrenArray.reduce<Array<any>>((acc, child) => {
    const subSectionChildren = child.props.children;
    const childDisplayName = child.type.displayName;

    if (
      (subSectionChildren && childDisplayName === 'Dropdown.Section') ||
      child.type === Fragment
    ) {
      // @ts-expect-error - TS2558 - Expected 0 type arguments, but got 1.
      const sectionChildrenArray = Children.toArray<ReactNode>(subSectionChildren).flat();

      const childWithIndex = cloneElement(child, {
        children: renderDropdownItemsWithIndex(sectionChildrenArray, numItemsRendered),
      });
      numItemsRendered += sectionChildrenArray.length;
      return [...acc, childWithIndex];
    }
    if (dropdownItemDisplayNames.includes(childDisplayName)) {
      const childWithIndex = cloneElement(child, { _index: numItemsRendered });
      numItemsRendered += 1;
      return [...acc, childWithIndex];
    }
    return acc;
  }, []);
};

type Props = {
  /**
   * Ref for the element that the Dropdown will attach to, will most likely be a [Button](https://gestalt.pinterest.systems/web/button). See the [Accessibility](https://gestalt.pinterest.systems/web/dropdown#Accessibility) guidelines to learn more.
   */
  anchor?: HTMLElement | null | undefined;
  /**
   * Must be instances of [Dropdown.Item](https://gestalt.pinterest.systems/web/dropdown#Types-of-items), [Dropdown.Link](https://gestalt.pinterest.systems/web/dropdown#Types-of-items) or [Dropdown.Section](https://gestalt.pinterest.systems/web/dropdown#Sections) components. See the [Types of items](https://gestalt.pinterest.systems/web/dropdown#Types-of-items) variant to learn more.
   */
  children: ReactNode;
  /**
   * Enables correct behavior when Dropdown is used within a fixed container. To achieve this it removes the Layer component around Popover and enables positioning relative to its anchor element. Should only be used in cases where Layer breaks the Dropdown positionings such as when the anchor element is within a sticky component.
   */
  isWithinFixedContainer?: boolean;
  /**
   * Content to display at the top of the Dropdown before any items or sections. See the [Custom header](https://gestalt.pinterest.systems/web/dropdown#Custom-header) variant to learn more.
   */
  headerContent?: ReactNode;
  /**
   * Unique id to identify each Dropdown. Used for [Accessibility](https://gestalt.pinterest.systems/web/dropdown#Accessibility) purposes.
   */
  id: string;
  /**
   * Specifies the preferred position of Dropdown relative to its anchor element. See the [ideal direction variant in Popover's](https://gestalt.pinterest.systems/web/popover#Ideal-direction) to learn more.
   */
  idealDirection?: 'up' | 'right' | 'down' | 'left';
  /**
   * Forces the  position of Dropdown relative to its anchor element.
   */
  forceDirection?: boolean;
  /**
   *  Define a controlled size to dropdown's Popover.
   */
  maxHeight?: '30vh';
  /**
   * Mobile-only prop. Callback fired when Dropdown's in & out animations end. See the [mobile variant](https://gestalt.pinterest.systems/web/dropdown#mobile) to learn more.
   */
  mobileOnAnimationEnd?: (arg1: { animationState: 'in' | 'out' }) => void;
  /**
   * Callback fired when the menu is closed.
   */
  onDismiss: () => void;
  /**
   * Dropdown can adapt to mobile devices to [SheetMobile](https://gestalt.pinterest.systems/web/sheetmobile). Mobile adaptation is disabled by default. Set to 'false' to enable SheetMobile in mobile devices. See the [mobile variant](https://gestalt.pinterest.systems/web/dropdown#mobile) to learn more.
   */
  disableMobileUI?: boolean;
  /**
   * An object representing the zIndex value of the Dropdown menu. Learn more about [zIndex classes](https://gestalt.pinterest.systems/web/zindex_classes)
   */
  zIndex?: Indexable;
};

/**
 * [Dropdown](https://gestalt.pinterest.systems/web/dropdown) displays a list of actions, options or links. It is triggered when a user interacts with a Button, Textfield or other control. Dropdown allows for complex functionality that can’t be accomplished with SelectList.
 *
 * ![Dropdown open light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Dropdown-open.spec.ts-snapshots/Dropdown-open-chromium-darwin.png)
 * ![Dropdown open dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Dropdown-open-dark.spec.ts-snapshots/Dropdown-open-dark-chromium-darwin.png)
 *
 */
export default function Dropdown({
  anchor,
  children,
  isWithinFixedContainer = false,
  headerContent,
  id,
  idealDirection = 'down',
  forceDirection = false,
  onDismiss,
  zIndex,
  maxHeight,
  mobileOnAnimationEnd,
  disableMobileUI = false,
}: Props) {
  const [isPopoverPositioned, setIsPopoverPositioned] = useState(false);
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  const theme = useExperimentalTheme();

  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null | undefined>(
    isMobile ? undefined : 0,
  );

  const [focusedItemIndex, setFocusedItemIndex] = useState<number | null | undefined>(
    isMobile ? undefined : 0,
  );

  // @ts-expect-error - TS2558 - Expected 0 type arguments, but got 1.
  const dropdownChildrenArray = Children.toArray<ReactNode>(children);
  const allowedChildrenOptions = getChildrenOptions(dropdownChildrenArray);

  let selectedElement;
  const setOptionRef = (optionRef?: HTMLElement | null) => {
    // Prevent focusing on element until Popover is correctly positioned
    if (!isPopoverPositioned) return;

    selectedElement = optionRef;
    const linkElement = selectedElement?.getElementsByTagName('a')[0];
    if (linkElement) {
      linkElement.focus();
    } else if (selectedElement) {
      selectedElement.focus();
    }
  };

  const handleKeyNavigation = (
    event: React.KeyboardEvent<HTMLElement>,
    direction: DirectionOptionType,
    index?: number | null,
  ) => {
    const newIndex = direction + (index ?? 0);
    const optionsCount = allowedChildrenOptions.length - 1;

    // If there's an existing item, navigate from that position
    let cursorIndex = newIndex;

    // If we've reached the end, start at the top
    if (newIndex > optionsCount) {
      cursorIndex = 0;
    }
    // If we're at the top going backwards, start at the last item
    else if (newIndex < 0) {
      cursorIndex = optionsCount;
    }

    const { props: cursorOption } = allowedChildrenOptions[cursorIndex];

    if (cursorOption) {
      const item = cursorOption.option;

      setFocusedItemIndex(cursorIndex);
      setHoveredItemIndex(null);

      if (direction === KEYS.ENTER && !cursorOption.disabled) {
        cursorOption.onSelect?.({
          event,
          item,
        });
      }
    }
  };

  const onKeyDown = ({ event }: { event: React.KeyboardEvent<HTMLElement> }) => {
    const { keyCode } = event;
    if (keyCode === UP_ARROW) {
      handleKeyNavigation(event, KEYS.UP, focusedItemIndex);
      event.preventDefault();
    } else if (keyCode === DOWN_ARROW) {
      handleKeyNavigation(event, KEYS.DOWN, focusedItemIndex);
      event.preventDefault();
    } else if (keyCode === ENTER) {
      event.stopPropagation();
      handleKeyNavigation(event, KEYS.ENTER, focusedItemIndex);
    } else if ([ESCAPE, TAB].includes(keyCode)) {
      anchor?.focus();
      onDismiss?.();
    } else if (keyCode === SPACE) {
      event.preventDefault();
    }
  };

  if (isMobile && !disableMobileUI) {
    return (
      <AnimationProvider>
        <RequestAnimationFrameProvider>
          <PartialPage
            align="start"
            // @ts-expect-error - TS2322 - Type '((arg1: { animationState: "in" | "out"; }) => void) | undefined' is not assignable to type '(arg1: { animationState: "in" | "out"; }) => void | null | undefined'.
            onAnimationEnd={mobileOnAnimationEnd}
            onDismiss={onDismiss}
            padding="default"
            role="dialog"
            showDismissButton
            size="auto"
            zIndex={zIndex}
          >
            {headerContent}
            <DropdownContextProvider
              value={{
                id,
                focusedItemIndex,
                hoveredItemIndex,
                setFocusedItemIndex,
                setHoveredItemIndex,
                setOptionRef,
              }}
            >
              {renderChildrenWithIndex(dropdownChildrenArray)}
            </DropdownContextProvider>
          </PartialPage>
        </RequestAnimationFrameProvider>
      </AnimationProvider>
    );
  }

  const dropdown = (
    <InternalPopover
      accessibilityLabel="Dropdown"
      anchor={anchor}
      color="white"
      disablePortal
      forceDirection={forceDirection}
      hideWhenReferenceHidden
      id={id}
      idealDirection={idealDirection}
      onDismiss={onDismiss}
      onKeyDown={onKeyDown}
      onPositioned={() => setIsPopoverPositioned(true)}
      role="menu"
      shouldFocus
      showCaret={false}
      size="xl"
    >
      <Box
        alignItems="center"
        direction="column"
        display="flex"
        flex="grow"
        margin={theme.MAIN ? 3 : 2}
        maxHeight={maxHeight}
      >
        {Boolean(headerContent) && <Box padding={2}>{headerContent}</Box>}

        <DropdownContextProvider
          value={{
            id,
            hoveredItemIndex,
            setHoveredItemIndex,
            setFocusedItemIndex,
            setOptionRef,
            focusedItemIndex,
          }}
        >
          {renderChildrenWithIndex(dropdownChildrenArray)}
        </DropdownContextProvider>
      </Box>
    </InternalPopover>
  );

  return isWithinFixedContainer ? dropdown : <Layer zIndex={zIndex}>{dropdown}</Layer>;
}

Dropdown.Item = DropdownItem;
Dropdown.Link = DropdownLink;
Dropdown.Section = DropdownSection;

Dropdown.displayName = 'Dropdown';
