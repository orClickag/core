'use client';
import { createCalendar } from '@internationalized/date';
import { useDateSegment, useDateField } from 'react-aria/useDateField';
import { useLocale } from 'react-aria/I18nProvider';
import { useDateFieldState } from 'react-stately/useDateFieldState';
import React, { forwardRef, useRef, useMemo, useState, useLayoutEffect, useImperativeHandle } from 'react';
import { useProviderProps } from '@keystar/ui/core';
import { FieldPrimitive } from '@keystar/ui/field';
import { mergeProps } from 'react-aria/mergeProps';
import { useObjectRef } from 'react-aria/useObjectRef';
import { useFocusRing } from 'react-aria/useFocusRing';
import { css, classNames, tokenSchema, toDataAttributes, ClassList, useIsMobileDevice, transition } from '@keystar/ui/style';
import { jsx, jsxs } from 'react/jsx-runtime';
import { Text } from '@keystar/ui/typography';
import { useDisplayNames } from 'react-aria/private/datepicker/useDisplayNames';
import { createFocusManager } from 'react-aria/private/focus/FocusScope';
import { useDateFormatter } from 'react-aria/useDateFormatter';
import { useDatePicker } from 'react-aria/useDatePicker';
import { useHover } from 'react-aria/useHover';
import { useDatePickerState } from 'react-stately/useDatePickerState';
import { FieldButton } from '@keystar/ui/button';
import { Calendar, RangeCalendar } from '@keystar/ui/calendar';
import { Icon } from '@keystar/ui/icon';
import { calendarDaysIcon } from '@keystar/ui/icon/icons/calendarDaysIcon';
import { useDialog } from 'react-aria/useDialog';
import { Popover, Tray } from '@keystar/ui/overlays';
import { useDateRangePicker } from 'react-aria/useDateRangePicker';
import { useDateRangePickerState } from 'react-stately/useDateRangePickerState';
import { useTimeField } from 'react-aria/useTimeField';
import { useTimeFieldState } from 'react-stately/useTimeFieldState';

const Input = /*#__PURE__*/forwardRef(function Input(props, forwardedRef) {
  var _props$isInvalid;
  let inputRef = useObjectRef(forwardedRef);
  let {
    children,
    disableFocusRing,
    fieldProps,
    isDisabled,
    validationState
  } = props;
  let {
    focusProps,
    isFocused
  } = useFocusRing({
    isTextInput: true,
    within: true
  });
  let isInvalid = ((_props$isInvalid = props.isInvalid) !== null && _props$isInvalid !== void 0 ? _props$isInvalid : validationState === 'invalid') && !isDisabled;
  let styleProps = useInputStyles(props, {
    isDisabled,
    isInvalid,
    isFocused,
    // prefer focusring appearance, regardless of input modality. otherwise it looks like a read-only field
    isFocusVisible: isFocused && !disableFocusRing
  });
  return /*#__PURE__*/jsx("div", {
    role: "presentation",
    ...mergeProps(fieldProps, focusProps),
    ...styleProps,
    children: /*#__PURE__*/jsx("div", {
      role: "presentation",
      className: css({
        alignItems: 'center',
        display: 'inline-flex',
        height: '100%',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }),
      ref: inputRef,
      children: children
    })
  });
});
function useInputStyles(props, state) {
  let className = classNames(css({
    backgroundColor: tokenSchema.color.background.canvas,
    border: `${tokenSchema.size.border.regular} solid ${tokenSchema.color.alias.borderIdle}`,
    borderRadius: tokenSchema.size.radius.regular,
    cursor: 'text',
    height: tokenSchema.size.element.regular,
    lineHeight: tokenSchema.typography.lineheight.small,
    outline: 0,
    overflow: 'visible',
    paddingBlock: tokenSchema.size.space.small,
    paddingInline: tokenSchema.size.space.medium,
    position: 'relative',
    textIndent: 0,
    verticalAlign: 'top',
    minWidth: tokenSchema.size.scale[2000],
    width: '100%',
    '&[data-invalid]': {
      borderColor: tokenSchema.color.alias.borderInvalid
    },
    '&[data-focused]': {
      borderColor: tokenSchema.color.alias.borderFocused,
      boxShadow: `0 0 0 1px ${tokenSchema.color.alias.borderFocused}`
    },
    // '&[data-focus-visible]': {
    //   boxShadow: `0 0 0 1px ${tokenSchema.color.alias.borderFocused}`,
    // },
    '&[data-disabled]': {
      backgroundColor: tokenSchema.color.alias.backgroundDisabled,
      borderColor: 'transparent'
    }
  }), props.className);
  return {
    ...toDataAttributes(state, {
      omitFalsyValues: true,
      trimBooleanKeys: true
    }),
    className,
    style: props.style
  };
}

const segmentClassList = new ClassList('InputSegment', ['editable']);
function InputSegment({
  segment,
  state
}) {
  if (segment.type === 'literal') {
    return /*#__PURE__*/jsx(LiteralSegment, {
      segment: segment
    });
  }
  return /*#__PURE__*/jsx(EditableSegment, {
    segment: segment,
    state: state
  });
}

/** A separator, e.g. punctuation like "/" or "." */
function LiteralSegment({
  segment
}) {
  return /*#__PURE__*/jsx(Text, {
    elementType: "span",
    "aria-hidden": "true",
    trim: false,
    UNSAFE_className: css({
      color: tokenSchema.color.foreground.neutral,
      userSelect: 'none',
      whiteSpace: 'pre',
      [`${segmentClassList.selector('editable')}[data-placeholder] ~ &`]: {
        color: tokenSchema.color.foreground.neutralTertiary
      }
    }),
    "data-testid": segment.type === 'literal' ? undefined : segment.type,
    children: segment.text
  });
}
function EditableSegment({
  segment,
  state
}) {
  let ref = useRef(null);
  let {
    segmentProps
  } = useDateSegment(segment, state, ref);
  let styleProps = useEditableSectionStyles(segment);
  return /*#__PURE__*/jsxs("div", {
    ...segmentProps,
    ...styleProps,
    style: {
      ...styleProps.style,
      ...segmentProps.style
    },
    ref: ref,
    "data-testid": segment.type,
    children: [/*#__PURE__*/jsx("span", {
      "aria-hidden": "true",
      "data-hidden": !segment.isPlaceholder,
      className: css({
        display: 'block',
        fontStyle: 'italic',
        height: '0',
        pointerEvents: 'none',
        textAlign: 'center',
        visibility: 'hidden',
        width: '100%',
        '&[data-hidden=false]': {
          height: 'auto',
          visibility: 'visible'
        }
      }),
      children: segment.placeholder
    }), !segment.isPlaceholder && segment.text]
  });
}
function useEditableSectionStyles(segment) {
  return {
    ...toDataAttributes({
      placeholder: segment.isPlaceholder,
      readonly: !segment.isEditable
    }, {
      omitFalsyValues: true
    }),
    className: classNames(css({
      borderRadius: tokenSchema.size.radius.small,
      color: tokenSchema.color.foreground.neutral,
      paddingInline: tokenSchema.size.space.xsmall,
      // text styles
      fontFamily: tokenSchema.typography.fontFamily.base,
      fontSize: tokenSchema.typography.text.regular.size,
      fontVariantNumeric: 'tabular-nums',
      fontWeight: tokenSchema.typography.fontWeight.regular,
      lineHeight: tokenSchema.typography.lineheight.small,
      whiteSpace: 'nowrap',
      MozOsxFontSmoothing: 'auto',
      WebkitFontSmoothing: 'auto',
      '[dir=ltr] &': {
        textAlign: 'right'
      },
      '[dir=rtl] &': {
        textAlign: 'left'
      },
      '&[data-placeholder]': {
        color: tokenSchema.color.foreground.neutralTertiary
      },
      '&:focus': {
        backgroundColor: tokenSchema.color.background.accentEmphasis,
        color: tokenSchema.color.foreground.onEmphasis,
        outline: 'none'
      }
    }), segmentClassList.element('editable')),
    style: {
      minWidth: segment.maxValue != null ? String(segment.maxValue).length + 'ch' : undefined
    }
  };
}

function useFormatHelpText(props) {
  let formatter = useDateFormatter({
    dateStyle: 'short'
  });
  let displayNames = useDisplayNames();
  return useMemo(() => {
    if (props.description) {
      return props.description;
    }
    if (props.showFormatHelpText) {
      return formatter.formatToParts(new Date()).map(s => {
        if (s.type === 'literal') {
          return s.value;
        }
        return displayNames.of(s.type);
      }).join(' ');
    }
    return '';
  }, [props.description, props.showFormatHelpText, formatter, displayNames]);
}
function useVisibleMonths(maxVisibleMonths) {
  let [visibleMonths, setVisibleMonths] = useState(getVisibleMonths());
  useLayoutEffect(() => {
    let onResize = () => setVisibleMonths(getVisibleMonths());
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return Math.max(1, Math.min(visibleMonths, maxVisibleMonths, 3));
}

// these calculations are brittle, they depend on styling decisions in both:
// - the `CalendarBase` component, from "@keystar/ui/calendar"
// - the `DatePickerPopover` component
function getVisibleMonths() {
  if (typeof window === 'undefined') {
    return 1;
  }
  let monthWidth = 248;
  let gap = 16;
  let dialogPadding = 20;
  return Math.floor((window.innerWidth - dialogPadding * 2) / (monthWidth + gap));
}
function useFocusManagerRef(ref) {
  let domRef = useObjectRef(ref);
  // @ts-expect-error FIXME: not sure how to properly resolve this type issue
  useImperativeHandle(ref, () => ({
    ...domRef.current,
    focus() {
      createFocusManager(domRef).focusFirst({
        tabbable: true
      });
    }
  }));
  return domRef;
}

function DateField(props, ref) {
  props = useProviderProps(props);
  let {
    autoFocus,
    isDisabled,
    isReadOnly
  } = props;
  let domRef = useFocusManagerRef(ref);
  let {
    locale
  } = useLocale();
  let state = useDateFieldState({
    ...props,
    locale,
    createCalendar
  });
  let fieldRef = useRef(null);
  let inputRef = useRef(null);
  let {
    descriptionProps,
    errorMessageProps,
    fieldProps,
    inputProps,
    labelProps
  } = useDateField({
    ...props,
    inputRef
  }, state, fieldRef);

  // Note: this description is intentionally not passed to useDatePicker.
  // The format help text is unnecessary for screen reader users because each segment already has a label.
  let description = useFormatHelpText(props);
  if (description && !props.description) {
    let {
      id,
      ..._descriptionProps
    } = descriptionProps;
    descriptionProps = _descriptionProps;
  }
  if (props.errorMessage) {
    state = {
      ...state,
      validationState: 'invalid'
    };
  }
  return /*#__PURE__*/jsx(FieldPrimitive, {
    ...props,
    ref: domRef,
    description: description,
    labelElementType: "span",
    labelProps: labelProps,
    descriptionProps: descriptionProps,
    errorMessageProps: errorMessageProps
    // validationState={state.validationState}
    ,
    children: /*#__PURE__*/jsxs(Input, {
      ref: fieldRef,
      disableFocusRing: isReadOnly,
      fieldProps: fieldProps,
      isDisabled: isDisabled,
      autoFocus: autoFocus,
      isInvalid: state.isInvalid,
      children: [state.segments.map((segment, i) => /*#__PURE__*/jsx(InputSegment, {
        segment: segment,
        state: state
      }, i)), /*#__PURE__*/jsx("input", {
        ...inputProps,
        ref: inputRef
      })]
    })
  });
}

// forwardRef doesn't support generic parameters, so cast the result to the correct type
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref

/**
 * DateFields allow users to enter and edit date and time values using a keyboard.
 * Each part of a date value is displayed in an individually editable segment.
 */
const _DateField = /*#__PURE__*/React.forwardRef(DateField);

/** @private for internal use only. */
function DatePickerField(props) {
  let {
    rangeFieldType
  } = props;
  let fieldRef = useRef(null);
  let inputRef = useRef(null);
  let {
    locale
  } = useLocale();
  let state = useDateFieldState({
    ...props,
    locale,
    createCalendar
  });
  let {
    fieldProps,
    inputProps
  } = useDateField({
    ...props,
    inputRef
  }, state, fieldRef);
  return /*#__PURE__*/jsxs("div", {
    ...fieldProps,
    // @ts-expect-error
    "data-testid": props['data-testid'],
    "data-range": rangeFieldType,
    className: css({
      display: 'flex',
      '&[data-range=start]': {
        paddingInlineEnd: tokenSchema.size.space.regular
      },
      '&[data-range=end]': {
        paddingInlineStart: tokenSchema.size.space.regular
      }
    }),
    ref: fieldRef,
    children: [state.segments.map((segment, i) => /*#__PURE__*/jsx(InputSegment, {
      segment: segment,
      state: state
    }, i)), /*#__PURE__*/jsx("input", {
      ...inputProps,
      ref: inputRef
    })]
  });
}

function DatePickerPopover({
  state,
  ...props
}) {
  let scrollRef = useRef(null);
  let {
    direction
  } = useLocale();
  let isMobile = useIsMobileDevice();
  let {
    dialogProps
  } = useDialog(props.dialogProps, scrollRef);
  let content = /*#__PURE__*/jsx("div", {
    ref: scrollRef,
    className: css({
      display: 'flex',
      justifyContent: 'center',
      maxHeight: 'inherit',
      outline: 0,
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch'
    }),
    ...dialogProps,
    children: /*#__PURE__*/jsx("div", {
      className: css({
        paddingInline: tokenSchema.size.space.medium,
        paddingTop: tokenSchema.size.space.medium,
        // bottom-padding fix for the scrollable area
        '&::after': {
          content: '""',
          display: 'block',
          height: tokenSchema.size.space.medium
        }
      }),
      children: props.children
    })
  });
  let overlay;
  if (isMobile) {
    overlay = /*#__PURE__*/jsx(Tray, {
      state: state,
      children: content
    });
  } else {
    overlay = /*#__PURE__*/jsx(Popover, {
      hideArrow: true,
      placement: direction === 'rtl' ? 'bottom right' : 'bottom left',
      scrollRef: scrollRef,
      shouldFlip: props.shouldFlip,
      state: state,
      triggerRef: props.triggerRef,
      children: content
    });
  }
  return overlay;
}

function DatePicker(props, forwardedRef) {
  props = useProviderProps(props);
  let {
    autoFocus,
    isDisabled,
    isReadOnly,
    maxVisibleMonths = 1,
    pageBehavior
  } = props;
  let {
    hoverProps,
    isHovered
  } = useHover({
    isDisabled
  });
  let triggerRef = useRef(null);
  let domRef = useFocusManagerRef(forwardedRef);
  let state = useDatePickerState(props);
  if (props.errorMessage) {
    state = {
      ...state,
      validationState: 'invalid'
    };
  }
  let {
    buttonProps,
    calendarProps,
    descriptionProps,
    dialogProps,
    errorMessageProps,
    fieldProps,
    groupProps,
    labelProps
  } = useDatePicker(props, state, triggerRef);
  let {
    isFocused,
    focusProps
  } = useFocusRing({
    within: true,
    isTextInput: true,
    autoFocus
  });
  let {
    isFocused: isFocusedButton,
    focusProps: focusPropsButton
  } = useFocusRing({
    within: false,
    isTextInput: false,
    autoFocus
  });

  // Note: this description is intentionally not passed to useDatePicker.
  // The format help text is unnecessary for screen reader users because each segment already has a label.
  let description = useFormatHelpText(props);
  if (description && !props.description) {
    const {
      id,
      ..._descriptionProps
    } = descriptionProps;
    descriptionProps = _descriptionProps;
  }
  let visibleMonths = useVisibleMonths(maxVisibleMonths);
  let styleProps = usePickerStyles({
    isHovered,
    isFocused,
    // prefer focusring appearance, regardless of input modality. otherwise it looks like a read-only field
    isFocusVisible: isFocused && !isFocusedButton,
    isDisabled,
    isReadOnly,
    isInvalid: state.isInvalid
  });
  return /*#__PURE__*/jsx(FieldPrimitive, {
    ...props,
    ref: domRef,
    description: description,
    labelElementType: "span",
    labelProps: labelProps,
    descriptionProps: descriptionProps,
    errorMessageProps: errorMessageProps
    // validationState={state.validationState}
    ,
    children: /*#__PURE__*/jsxs("div", {
      ...mergeProps(groupProps, hoverProps, focusProps),
      ...styleProps.root,
      ref: triggerRef,
      children: [/*#__PURE__*/jsx(Input, {
        isDisabled: isDisabled,
        isInvalid: state.isInvalid,
        disableFocusRing: true,
        ...styleProps.input,
        children: /*#__PURE__*/jsx(DatePickerField, {
          ...fieldProps,
          "data-testid": "date-field"
        })
      }), /*#__PURE__*/jsx(FieldButton, {
        ...mergeProps(buttonProps, focusPropsButton),
        ...styleProps.button,
        isInvalid: state.isInvalid,
        isDisabled: isDisabled || isReadOnly,
        children: /*#__PURE__*/jsx(Icon, {
          src: calendarDaysIcon
        })
      }), /*#__PURE__*/jsx(DatePickerPopover, {
        dialogProps: dialogProps,
        shouldFlip: props.shouldFlip,
        state: state,
        triggerRef: triggerRef,
        children: /*#__PURE__*/jsx(Calendar, {
          ...calendarProps,
          visibleMonths: visibleMonths,
          pageBehavior: pageBehavior
        })
      })]
    })
  });
}

// forwardRef doesn't support generic parameters, so cast the result to the correct type
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref

/**
 * DatePickers combine a DateField and a Calendar popover to allow users to
 * enter or select a date and time value.
 */
const _DatePicker = /*#__PURE__*/React.forwardRef(DatePicker);
function usePickerStyles(state) {
  let root = {
    ...toDataAttributes(state, {
      omitFalsyValues: true,
      trimBooleanKeys: true
    }),
    className: css({
      borderRadius: tokenSchema.size.radius.regular,
      display: 'flex',
      position: 'relative',
      '&::after': {
        borderRadius: `inherit`,
        content: '""',
        inset: tokenSchema.size.border.regular,
        margin: 0,
        pointerEvents: 'none',
        position: 'absolute',
        transition: transition(['box-shadow', 'margin'], {
          easing: 'easeOut'
        })
      },
      '&[data-focus-visible]::after': {
        boxShadow: `0 0 0 ${tokenSchema.size.alias.focusRing} ${tokenSchema.color.alias.focusRing}`
      }
    })
  };
  let input = {
    className: css({
      borderStartEndRadius: 0,
      borderEndEndRadius: 0,
      borderInlineEndWidth: 0,
      [`.${root.className}[data-focused] &`]: {
        borderColor: tokenSchema.color.alias.borderFocused
      }
    })
  };
  let button = {
    UNSAFE_className: css({
      borderStartStartRadius: 0,
      borderEndStartRadius: 0,
      [`.${root.className}[data-read-only] &`]: {
        borderColor: tokenSchema.color.alias.borderIdle
      },
      [`.${root.className}[data-invalid] &`]: {
        borderColor: tokenSchema.color.alias.borderInvalid
      },
      [`.${root.className}[data-focused] &`]: {
        borderColor: tokenSchema.color.alias.borderFocused
      },
      [`.${root.className}[data-disabled] &`]: {
        borderColor: 'transparent'
      }
    })
  };
  return {
    button,
    input,
    root
  };
}

function DateRangePicker(props, forwardedRef) {
  props = useProviderProps(props);
  let {
    autoFocus,
    isDisabled,
    isReadOnly,
    maxVisibleMonths = 1,
    pageBehavior
  } = props;
  let {
    hoverProps,
    isHovered
  } = useHover({
    isDisabled
  });
  let triggerRef = useRef(null);
  let domRef = useFocusManagerRef(forwardedRef);
  let state = useDateRangePickerState(props);
  if (props.errorMessage) {
    state = {
      ...state,
      validationState: 'invalid'
    };
  }
  let {
    buttonProps,
    calendarProps,
    descriptionProps,
    dialogProps,
    endFieldProps,
    errorMessageProps,
    groupProps,
    labelProps,
    startFieldProps
  } = useDateRangePicker(props, state, triggerRef);
  let {
    isFocused,
    isFocusVisible,
    focusProps
  } = useFocusRing({
    within: true,
    isTextInput: true,
    autoFocus
  });
  let {
    isFocused: isFocusedButton,
    focusProps: focusPropsButton
  } = useFocusRing({
    within: false,
    isTextInput: false,
    autoFocus
  });

  // Note: this description is intentionally not passed to useDateRangePicker.
  // The format help text is unnecessary for screen reader users because each segment already has a label.
  let description = useFormatHelpText(props);
  if (description && !props.description) {
    const {
      id,
      ..._descriptionProps
    } = descriptionProps;
    descriptionProps = _descriptionProps;
  }
  let visibleMonths = useVisibleMonths(maxVisibleMonths);
  let styleProps = usePickerStyles({
    isHovered,
    isFocused,
    isFocusVisible: isFocusVisible && !isFocusedButton,
    isDisabled,
    isReadOnly,
    isInvalid: state.validationState === 'invalid'
  });
  return /*#__PURE__*/jsx(FieldPrimitive, {
    ...props,
    ref: domRef,
    description: description,
    labelElementType: "span",
    labelProps: labelProps,
    descriptionProps: descriptionProps,
    errorMessageProps: errorMessageProps
    // validationState={state.validationState}
    ,
    children: /*#__PURE__*/jsxs("div", {
      ...mergeProps(groupProps, hoverProps, focusProps),
      ...styleProps.root,
      ref: triggerRef,
      children: [/*#__PURE__*/jsxs(Input, {
        isDisabled: isDisabled,
        isInvalid: state.isInvalid,
        disableFocusRing: true,
        ...styleProps.input,
        children: [/*#__PURE__*/jsx(DatePickerField, {
          rangeFieldType: "start",
          "data-testid": "start-date",
          ...startFieldProps
        }), /*#__PURE__*/jsx(Text, {
          "aria-hidden": "true",
          trim: false,
          children: '\u2014'
        }), /*#__PURE__*/jsx(DatePickerField, {
          rangeFieldType: "end",
          "data-testid": "end-date",
          ...endFieldProps
        })]
      }), /*#__PURE__*/jsx(FieldButton, {
        ...mergeProps(buttonProps, focusPropsButton),
        ...styleProps.button,
        isInvalid: state.isInvalid,
        isDisabled: isDisabled || isReadOnly,
        children: /*#__PURE__*/jsx(Icon, {
          src: calendarDaysIcon
        })
      }), /*#__PURE__*/jsx(DatePickerPopover, {
        dialogProps: dialogProps,
        shouldFlip: props.shouldFlip,
        state: state,
        triggerRef: triggerRef,
        children: /*#__PURE__*/jsx(RangeCalendar, {
          ...calendarProps,
          visibleMonths: visibleMonths,
          pageBehavior: pageBehavior
        })
      })]
    })
  });
}

// forwardRef doesn't support generic parameters, so cast the result to the correct type
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref

/**
 * DateRangePickers combine two DateFields and a RangeCalendar popover to allow users
 * to enter or select a date and time range.
 */
const _DateRangePicker = /*#__PURE__*/React.forwardRef(DateRangePicker);

function TimeField(props, ref) {
  props = useProviderProps(props);
  let {
    autoFocus,
    isDisabled
  } = props;
  let domRef = useFocusManagerRef(ref);
  let {
    locale
  } = useLocale();
  let state = useTimeFieldState({
    ...props,
    locale
  });
  let inputRef = useRef(null);
  let {
    labelProps,
    fieldProps,
    descriptionProps,
    errorMessageProps
  } = useTimeField(props, state, inputRef);
  if (props.errorMessage) {
    state = {
      ...state,
      validationState: 'invalid'
    };
  }
  return /*#__PURE__*/jsx(FieldPrimitive, {
    ...props,
    ref: domRef,
    labelProps: labelProps,
    descriptionProps: descriptionProps,
    errorMessageProps: errorMessageProps
    // validationState={state.validationState}
    ,
    children: /*#__PURE__*/jsx(Input, {
      ref: inputRef,
      fieldProps: fieldProps,
      isDisabled: isDisabled,
      autoFocus: autoFocus,
      isInvalid: state.isInvalid,
      children: state.segments.map((segment, i) => /*#__PURE__*/jsx(InputSegment, {
        segment: segment,
        state: state
      }, i))
    })
  });
}

// forwardRef doesn't support generic parameters, so cast the result to the correct type
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref

/**
 * TimeFields allow users to enter and edit time values using a keyboard.
 * Each part of the time is displayed in an individually editable segment.
 */
const _TimeField = /*#__PURE__*/React.forwardRef(TimeField);

export { _DateField as DateField, _DatePicker as DatePicker, _DateRangePicker as DateRangePicker, _TimeField as TimeField };
