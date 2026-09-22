'use client';
export { Item } from 'react-stately/Item';
import React, { useRef, useMemo, useState, useEffect, createElement } from 'react';
import { useFocusRing } from 'react-aria/useFocusRing';
import { useHover } from 'react-aria/useHover';
import { useLink } from 'react-aria/useLink';
import { useTag, useTagGroup } from 'react-aria/useTagGroup';
import { mergeProps } from 'react-aria/mergeProps';
import { ClearButton, ActionButton } from '@keystar/ui/button';
import { SlotProvider, ClearSlots } from '@keystar/ui/slots';
import { tokenSchema, useStyleProps, css, toDataAttributes, classNames, transition, FocusRing } from '@keystar/ui/style';
import { Text } from '@keystar/ui/typography';
import { isReactText } from '@keystar/ui/utils';
import { jsx, jsxs } from 'react/jsx-runtime';
import { FocusScope } from 'react-aria/FocusScope';
import { useLocale } from 'react-aria/I18nProvider';
import { useLocalizedStringFormatter } from 'react-aria/useLocalizedStringFormatter';
import { ListKeyboardDelegate } from 'react-aria/ListKeyboardDelegate';
import { useId } from 'react-aria/useId';
import { useObjectRef } from 'react-aria/useObjectRef';
import { useEffectEvent } from 'react-aria/private/utils/useEffectEvent';
import { useLayoutEffect } from 'react-aria/private/utils/useLayoutEffect';
import { useResizeObserver } from 'react-aria/private/utils/useResizeObserver';
import { useValueEffect } from 'react-aria/private/utils/useValueEffect';
import { ListCollection } from 'react-stately/private/list/ListCollection';
import { useListState } from 'react-stately/useListState';
import { useProviderProps, KeystarProvider } from '@keystar/ui/core';
import { FieldPrimitive } from '@keystar/ui/field';

const gapVar = tokenSchema.size.space.regular;
const heightVar = tokenSchema.size.element.small;
const radiusVar = tokenSchema.size.radius.small;
const tokenValues = {
  gap: 8,
  height: 24
};

// TODO: revisit this approach, so we can keep things in-sync
// export function getNumericTokenValues() {
//   const computedStyle = window.getComputedStyle(document.body);
//   const gap = computedStyle.getPropertyValue(unwrapCssVar(gapVar));
//   const height = computedStyle.getPropertyValue(unwrapCssVar(heightVar));
//   return {
//     gap: parseInt(gap, 10),
//     height: parseInt(height, 10),
//   };
// }
// function unwrapCssVar(value: string) {
//   return value.slice(4, -1);
// }

/** @private Internal use only: rendered via `Item` by consumer. */
function Tag(props) {
  const {
    item,
    state,
    ...otherProps
  } = props;
  let styleProps = useStyleProps(otherProps);
  let {
    hoverProps,
    isHovered
  } = useHover({});
  let {
    isFocused,
    isFocusVisible,
    focusProps
  } = useFocusRing({
    within: true
  });
  let domRef = useRef(null);
  let linkRef = useRef(null);
  let {
    removeButtonProps,
    gridCellProps,
    rowProps,
    allowsRemoving: isRemovable
  } = useTag(stripSyntheticLinkProps({
    ...props,
    item
  }), state, domRef);
  const slots = useMemo(() => ({
    avatar: {
      UNSAFE_className: css({
        marginInlineStart: tokenSchema.size.space.regular
      }),
      size: 'xsmall'
    },
    icon: {
      UNSAFE_className: css({
        marginInlineStart: tokenSchema.size.space.regular
      }),
      size: 'small'
    },
    text: {
      color: 'inherit',
      size: 'small',
      truncate: true,
      trim: false,
      UNSAFE_className: css({
        display: 'block',
        paddingInline: tokenSchema.size.space.regular
      })
    }
  }), []);
  const isLink = 'href' in item.props;
  const {
    linkProps
  } = useLink(item.props, linkRef);
  const contents = isReactText(item.rendered) ? /*#__PURE__*/jsx(Text, {
    children: item.rendered
  }) : item.rendered;
  return /*#__PURE__*/jsx("div", {
    ...mergeProps(rowProps, hoverProps, focusProps),
    ...toDataAttributes({
      isFocused,
      isFocusVisible,
      isHovered,
      isLink,
      isRemovable
    }, {
      omitFalsyValues: true,
      trimBooleanKeys: true
    }),
    className: classNames(css({
      backgroundColor: tokenSchema.color.alias.backgroundIdle,
      border: `${tokenSchema.size.border.regular} solid ${tokenSchema.color.alias.borderIdle}`,
      borderRadius: tokenSchema.size.radius.small,
      color: tokenSchema.color.alias.foregroundIdle,
      cursor: 'default',
      display: 'inline-flex',
      height: heightVar,
      margin: `calc(${gapVar} / 2)`,
      maxInlineSize: '100%',
      outline: `0 solid transparent`,
      position: 'relative',
      transition: transition(['outline-color', 'outline-width'], {
        duration: 'short'
      }),
      userSelect: 'none',
      '&[data-href]': {
        cursor: 'pointer',
        '&[data-hovered]': {
          backgroundColor: tokenSchema.color.alias.backgroundHovered,
          borderColor: tokenSchema.color.alias.borderHovered,
          color: tokenSchema.color.alias.foregroundHovered
        }
      },
      '&[data-focus-visible]': {
        outlineColor: tokenSchema.color.alias.focusRing,
        outlineWidth: tokenSchema.size.alias.focusRing,
        outlineOffset: `calc(${tokenSchema.size.border.regular} * -1)`
      }
    }), styleProps.className),
    ref: domRef,
    children: /*#__PURE__*/jsx("div", {
      className: css({
        alignItems: 'center',
        display: 'flex'
      }),
      ...gridCellProps,
      children: /*#__PURE__*/jsxs(SlotProvider, {
        slots: slots,
        children: [isLink ? /*#__PURE__*/jsx("a", {
          ...linkProps,
          tabIndex: -1,
          ref: linkRef,
          className: css({
            color: 'inherit',
            outline: 'none',
            textDecoration: 'none',
            '&::before': {
              content: '""',
              inset: 0,
              position: 'absolute'
            }
          }),
          children: contents
        }) : contents, /*#__PURE__*/jsx(ClearSlots, {
          children: isRemovable && /*#__PURE__*/jsx(ClearButton, {
            ...removeButtonProps,
            UNSAFE_className: css({
              marginInlineStart: `calc(${tokenSchema.size.space.regular} * -1)`,
              height: heightVar,
              width: heightVar
            })
          })
        })]
      })
    })
  });
}
const SYNTHETIC_LINK_ATTRS = new Set(['data-download', 'data-href', 'data-ping', 'data-referrer-policy', 'data-rel', 'data-target']);

/**
 * Circumvent react-aria synthetic link and implement real anchor, so users can
 * right-click and open in new tab, etc.
 */
function stripSyntheticLinkProps(props) {
  const safeProps = {
    ...props
  };
  for (const attr of SYNTHETIC_LINK_ATTRS) {
    delete safeProps[attr];
  }
  return safeProps;
}

const localizedMessages = {
  "ar-AE": {
    "actions": `الإجراءات`,
    "hideButtonLabel": `إظهار أقل`,
    "noTags": `بدون`,
    "showAllButtonLabel": (args, formatter) => `عرض الكل (${formatter.number(args.tagCount)})`
  },
  "bg-BG": {
    "actions": `Действия`,
    "hideButtonLabel": `Показване на по-малко`,
    "noTags": `Нито един`,
    "showAllButtonLabel": (args, formatter) => `Показване на всички (${formatter.number(args.tagCount)})`
  },
  "cs-CZ": {
    "actions": `Akce`,
    "hideButtonLabel": `Zobrazit méně`,
    "noTags": `Žádný`,
    "showAllButtonLabel": (args, formatter) => `Zobrazit vše (${formatter.number(args.tagCount)})`
  },
  "da-DK": {
    "actions": `Handlinger`,
    "hideButtonLabel": `Vis mindre`,
    "noTags": `Ingen`,
    "showAllButtonLabel": (args, formatter) => `Vis alle (${formatter.number(args.tagCount)})`
  },
  "de-DE": {
    "actions": `Aktionen`,
    "hideButtonLabel": `Weniger zeigen`,
    "noTags": `Keine`,
    "showAllButtonLabel": (args, formatter) => `Alle anzeigen (${formatter.number(args.tagCount)})`
  },
  "el-GR": {
    "actions": `Ενέργειες`,
    "hideButtonLabel": `Εμφάνιση λιγότερων`,
    "noTags": `Κανένα`,
    "showAllButtonLabel": (args, formatter) => `Εμφάνιση όλων (${formatter.number(args.tagCount)})`
  },
  "en-US": {
    "showAllButtonLabel": (args, formatter) => `Show all (${formatter.number(args.tagCount)})`,
    "hideButtonLabel": `Show less`,
    "actions": `Actions`,
    "noTags": `None`
  },
  "es-ES": {
    "actions": `Acciones`,
    "hideButtonLabel": `Mostrar menos`,
    "noTags": `Ninguno`,
    "showAllButtonLabel": (args, formatter) => `Mostrar todo (${formatter.number(args.tagCount)})`
  },
  "et-EE": {
    "actions": `Toimingud`,
    "hideButtonLabel": `Kuva vähem`,
    "noTags": `Puudub`,
    "showAllButtonLabel": (args, formatter) => `Kuva kõik (${formatter.number(args.tagCount)})`
  },
  "fi-FI": {
    "actions": `Toiminnot`,
    "hideButtonLabel": `Näytä vähemmän`,
    "noTags": `Ei mitään`,
    "showAllButtonLabel": (args, formatter) => `Näytä kaikki (${formatter.number(args.tagCount)})`
  },
  "fr-FR": {
    "actions": `Actions`,
    "hideButtonLabel": `Afficher moins`,
    "noTags": `Aucun`,
    "showAllButtonLabel": (args, formatter) => `Tout afficher (${formatter.number(args.tagCount)})`
  },
  "he-IL": {
    "actions": `פעולות`,
    "hideButtonLabel": `הצג פחות`,
    "noTags": `ללא`,
    "showAllButtonLabel": (args, formatter) => `הצג הכל (${formatter.number(args.tagCount)})`
  },
  "hr-HR": {
    "actions": `Radnje`,
    "hideButtonLabel": `Prikaži manje`,
    "noTags": `Nema`,
    "showAllButtonLabel": (args, formatter) => `Prikaži sve (${formatter.number(args.tagCount)})`
  },
  "hu-HU": {
    "actions": `Műveletek`,
    "hideButtonLabel": `Mutass kevesebbet`,
    "noTags": `Egyik sem`,
    "showAllButtonLabel": (args, formatter) => `Az összes megjelenítése (${formatter.number(args.tagCount)})`
  },
  "it-IT": {
    "actions": `Azioni`,
    "hideButtonLabel": `Mostra meno`,
    "noTags": `Nessuno`,
    "showAllButtonLabel": (args, formatter) => `Mostra tutto (${formatter.number(args.tagCount)})`
  },
  "ja-JP": {
    "actions": `アクション`,
    "hideButtonLabel": `表示を減らす`,
    "noTags": `なし`,
    "showAllButtonLabel": (args, formatter) => `すべての (${formatter.number(args.tagCount)}) を表示`
  },
  "ko-KR": {
    "actions": `액션`,
    "hideButtonLabel": `간단히 표시`,
    "noTags": `없음`,
    "showAllButtonLabel": (args, formatter) => `모두 표시 (${formatter.number(args.tagCount)})`
  },
  "lt-LT": {
    "actions": `Veiksmai`,
    "hideButtonLabel": `Rodyti mažiau`,
    "noTags": `Nėra`,
    "showAllButtonLabel": (args, formatter) => `Rodyti viską (${formatter.number(args.tagCount)})`
  },
  "lv-LV": {
    "actions": `Darbības`,
    "hideButtonLabel": `Rādīt mazāk`,
    "noTags": `Nav`,
    "showAllButtonLabel": (args, formatter) => `Rādīt visu (${formatter.number(args.tagCount)})`
  },
  "nb-NO": {
    "actions": `Handlinger`,
    "hideButtonLabel": `Vis mindre`,
    "noTags": `Ingen`,
    "showAllButtonLabel": (args, formatter) => `Vis alle (${formatter.number(args.tagCount)})`
  },
  "nl-NL": {
    "actions": `Acties`,
    "hideButtonLabel": `Minder weergeven`,
    "noTags": `Geen`,
    "showAllButtonLabel": (args, formatter) => `Alles tonen (${formatter.number(args.tagCount)})`
  },
  "pl-PL": {
    "actions": `Działania`,
    "hideButtonLabel": `Wyświetl mniej`,
    "noTags": `Brak`,
    "showAllButtonLabel": (args, formatter) => `Pokaż wszystko (${formatter.number(args.tagCount)})`
  },
  "pt-BR": {
    "actions": `Ações`,
    "hideButtonLabel": `Mostrar menos`,
    "noTags": `Nenhum`,
    "showAllButtonLabel": (args, formatter) => `Mostrar tudo (${formatter.number(args.tagCount)})`
  },
  "pt-PT": {
    "actions": `Ações`,
    "hideButtonLabel": `Mostrar menos`,
    "noTags": `Nenhum`,
    "showAllButtonLabel": (args, formatter) => `Mostrar tudo (${formatter.number(args.tagCount)})`
  },
  "ro-RO": {
    "actions": `Acțiuni`,
    "hideButtonLabel": `Se afișează mai puțin`,
    "noTags": `Niciuna`,
    "showAllButtonLabel": (args, formatter) => `Se afișează tot (${formatter.number(args.tagCount)})`
  },
  "ru-RU": {
    "actions": `Действия`,
    "hideButtonLabel": `Показать меньше`,
    "noTags": `Нет`,
    "showAllButtonLabel": (args, formatter) => `Показать все (${formatter.number(args.tagCount)})`
  },
  "sk-SK": {
    "actions": `Akcie`,
    "hideButtonLabel": `Zobraziť menej`,
    "noTags": `Žiadne`,
    "showAllButtonLabel": (args, formatter) => `Zobraziť všetko (${formatter.number(args.tagCount)})`
  },
  "sl-SI": {
    "actions": `Dejanja`,
    "hideButtonLabel": `Prikaži manj`,
    "noTags": `Nič`,
    "showAllButtonLabel": (args, formatter) => `Prikaž vse (${formatter.number(args.tagCount)})`
  },
  "sr-SP": {
    "actions": `Radnje`,
    "hideButtonLabel": `Prikaži manje`,
    "noTags": `Ne postoji`,
    "showAllButtonLabel": (args, formatter) => `Prikaži sve (${formatter.number(args.tagCount)})`
  },
  "sv-SE": {
    "actions": `Åtgärder`,
    "hideButtonLabel": `Visa mindre`,
    "noTags": `Ingen`,
    "showAllButtonLabel": (args, formatter) => `Visa alla (${formatter.number(args.tagCount)})`
  },
  "tr-TR": {
    "actions": `Eylemler`,
    "hideButtonLabel": `Daha az göster`,
    "noTags": `Hiçbiri`,
    "showAllButtonLabel": (args, formatter) => `Tümünü göster (${formatter.number(args.tagCount)})`
  },
  "uk-UA": {
    "actions": `Дії`,
    "hideButtonLabel": `Показувати менше`,
    "noTags": `Немає`,
    "showAllButtonLabel": (args, formatter) => `Показати всі (${formatter.number(args.tagCount)})`
  },
  "zh-CN": {
    "actions": `操作`,
    "hideButtonLabel": `显示更少`,
    "noTags": `无`,
    "showAllButtonLabel": (args, formatter) => `全部显示 (${formatter.number(args.tagCount)})`
  },
  "zh-TW": {
    "actions": `動作`,
    "hideButtonLabel": `顯示較少`,
    "noTags": `無`,
    "showAllButtonLabel": (args, formatter) => `顯示全部 (${formatter.number(args.tagCount)})`
  }
};

function TagGroup(props, forwardedRef) {
  props = useProviderProps(props);
  // props = useFormProps(props);
  let {
    maxRows,
    actionLabel,
    onAction,
    renderEmptyState: renderEmptyStateProp
  } = props;
  let domRef = useObjectRef(forwardedRef);
  let containerRef = useRef(null);
  let tagsRef = useRef(null);
  let {
    direction
  } = useLocale();
  let stringFormatter = useLocalizedStringFormatter(localizedMessages);
  let [isCollapsed, setIsCollapsed] = useState(maxRows != null);
  let state = useListState(props);
  let [tagState, setTagState] = useValueEffect({
    visibleTagCount: state.collection.size,
    showCollapseButton: false
  });
  let renderEmptyState = useMemo(() => {
    if (renderEmptyStateProp) {
      return renderEmptyStateProp;
    }
    return () => /*#__PURE__*/jsx(Text, {
      marginStart: "regular",
      trim: false,
      children: stringFormatter.format('noTags')
    });
  }, [stringFormatter, renderEmptyStateProp]);
  let keyboardDelegate = useMemo(() => {
    let collection = isCollapsed ? new ListCollection([...state.collection].slice(0, tagState.visibleTagCount)) : new ListCollection([...state.collection]);
    return new ListKeyboardDelegate({
      collection,
      ref: domRef,
      direction,
      orientation: 'horizontal'
    });
  }, [direction, isCollapsed, state.collection, tagState.visibleTagCount, domRef]);
  // Remove onAction from props so it doesn't make it into useGridList.
  delete props.onAction;
  const {
    gridProps,
    labelProps,
    descriptionProps,
    errorMessageProps
  } = useTagGroup({
    ...props,
    keyboardDelegate
  }, state, tagsRef);
  const actionsId = useId();
  const actionsRef = useRef(null);
  let updateVisibleTagCount = () => {
    if (maxRows && maxRows > 0) {
      let computeVisibleTagCount = () => {
        const containerEl = containerRef.current;
        const tagsEl = tagsRef.current;
        const actionsEl = actionsRef.current;
        if (!containerEl || !tagsEl || !actionsEl || state.collection.size === 0) {
          return {
            visibleTagCount: 0,
            showCollapseButton: false
          };
        }

        // Count rows and show tags until we hit the maxRows.
        let tags = [...tagsEl.children];
        let currY = -Infinity;
        let rowCount = 0;
        let index = 0;
        const tagWidths = [];
        for (let tag of tags) {
          let {
            width,
            y
          } = tag.getBoundingClientRect();
          if (y !== currY) {
            currY = y;
            rowCount++;
          }
          if (maxRows && rowCount > maxRows) {
            break;
          }
          tagWidths.push(width);
          index++;
        }

        // Remove tags until there is space for the collapse button and action button (if present) on the last row.
        let buttons = [...actionsEl.children];
        if (maxRows && buttons.length > 0 && rowCount >= maxRows) {
          var _containerEl$parentEl, _containerEl$parentEl2, _tags;
          let buttonsWidth = buttons.reduce((acc, curr) => acc += curr.getBoundingClientRect().width, 0);
          buttonsWidth += tokenValues.gap * buttons.length;
          let end = direction === 'ltr' ? 'right' : 'left';
          let containerEnd = (_containerEl$parentEl = (_containerEl$parentEl2 = containerEl.parentElement) === null || _containerEl$parentEl2 === void 0 ? void 0 : _containerEl$parentEl2.getBoundingClientRect()[end]) !== null && _containerEl$parentEl !== void 0 ? _containerEl$parentEl : 0;
          let lastTagEnd = (_tags = tags[index - 1]) === null || _tags === void 0 ? void 0 : _tags.getBoundingClientRect()[end];
          lastTagEnd += tokenValues.gap / 2;
          let availableWidth = containerEnd - lastTagEnd;
          while (availableWidth < buttonsWidth && index > 0) {
            // ceremony for TS to understand that tagWidths.pop() is not undefined
            let nextAvailableWidth = tagWidths.pop();
            if (nextAvailableWidth) {
              availableWidth += nextAvailableWidth;
            }
            index--;
          }
        }
        return {
          visibleTagCount: Math.max(index, 1),
          showCollapseButton: index < state.collection.size
        };
      };
      setTagState(function* () {
        // Update to show all items.
        yield {
          visibleTagCount: state.collection.size,
          showCollapseButton: true
        };

        // Measure, and update to show the items until maxRows is reached.
        yield computeVisibleTagCount();
      });
    }
  };
  let updateVisibleTagCountEffect = useEffectEvent(updateVisibleTagCount);
  useResizeObserver({
    ref: containerRef,
    onResize: updateVisibleTagCount
  });
  useLayoutEffect(() => {
    if (state.collection.size > 0 && maxRows != null && maxRows > 0) {
      queueMicrotask(updateVisibleTagCountEffect);
    }
  }, [state.collection.size, maxRows, updateVisibleTagCountEffect]);
  useEffect(() => {
    var _document$fonts;
    // Recalculate visible tags when fonts are loaded.
    (_document$fonts = document.fonts) === null || _document$fonts === void 0 || _document$fonts.ready.then(() => updateVisibleTagCountEffect());

    // we strictly want this effect to only run once
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let visibleTags = useMemo(() => [...state.collection].slice(0, isCollapsed ? tagState.visibleTagCount : state.collection.size), [isCollapsed, state.collection, tagState.visibleTagCount]);
  let handlePressCollapse = () => {
    // Prevents button from losing focus if focusedKey got collapsed.
    state.selectionManager.setFocusedKey(null);
    setIsCollapsed(prevCollapsed => !prevCollapsed);
  };
  let showActions = tagState.showCollapseButton || actionLabel && onAction;
  let isEmpty = state.collection.size === 0;
  let containerStyle = useMemo(() => {
    if (maxRows == null || !isCollapsed || isEmpty) {
      return undefined;
    }
    let maxHeight = (tokenValues.height + tokenValues.gap) * maxRows;
    return {
      maxHeight,
      overflow: 'hidden'
    };
  }, [isCollapsed, maxRows, isEmpty]);
  return /*#__PURE__*/jsx(FocusScope, {
    children: /*#__PURE__*/jsx(FieldPrimitive, {
      ...props,
      labelProps: labelProps,
      descriptionProps: descriptionProps,
      errorMessageProps: errorMessageProps,
      ref: domRef,
      labelElementType: "span",
      children: /*#__PURE__*/jsxs("div", {
        ref: containerRef,
        "data-empty": isEmpty,
        className: css({
          '&[data-empty=false]': {
            margin: `calc(${gapVar} / -2)`
          }
        }),
        style: containerStyle,
        children: [/*#__PURE__*/jsx(FocusRing, {
          children: /*#__PURE__*/jsxs("div", {
            ref: tagsRef,
            ...gridProps,
            className: css({
              borderRadius: radiusVar,
              display: 'inline',
              outline: 'none',
              '&[data-focus=visible]': {
                display: 'block',
                outlineColor: tokenSchema.color.alias.focusRing,
                outlineStyle: 'solid',
                outlineWidth: tokenSchema.size.alias.focusRing,
                outlineOffset: `calc(${tokenSchema.size.border.regular} * -1)`
              }
            }),
            children: [visibleTags.map(item => /*#__PURE__*/createElement(Tag, {
              ...item.props,
              key: item.key,
              item: item,
              state: state
            }, item.rendered)), isEmpty && /*#__PURE__*/jsx("div", {
              className: css({
                minHeight: heightVar
              }),
              children: renderEmptyState()
            })]
          })
        }), showActions && !isEmpty && /*#__PURE__*/jsx(KeystarProvider, {
          isDisabled: false,
          children: /*#__PURE__*/jsx(SlotProvider, {
            slots: {
              text: {
                size: 'small'
              }
            },
            children: /*#__PURE__*/jsxs("div", {
              role: "group",
              ref: actionsRef,
              id: actionsId,
              "aria-label": stringFormatter.format('actions'),
              "aria-labelledby": `${gridProps.id} ${actionsId}`,
              className: css({
                display: 'inline'
              }),
              children: [tagState.showCollapseButton && /*#__PURE__*/jsx(ActionButton, {
                prominence: "low",
                onPress: handlePressCollapse,
                UNSAFE_className: css({
                  borderRadius: radiusVar,
                  height: heightVar,
                  margin: `calc(${gapVar} / 2)`,
                  paddingInline: tokenSchema.size.space.small
                }),
                children: isCollapsed ? stringFormatter.format('showAllButtonLabel', {
                  tagCount: state.collection.size
                }) : stringFormatter.format('hideButtonLabel')
              }), actionLabel && onAction && /*#__PURE__*/jsx(ActionButton, {
                prominence: "low",
                onPress: () => onAction === null || onAction === void 0 ? void 0 : onAction(),
                UNSAFE_className: css({
                  borderRadius: radiusVar,
                  height: heightVar,
                  margin: `calc(${gapVar} / 2)`,
                  paddingInline: tokenSchema.size.space.small
                }),
                children: actionLabel
              })]
            })
          })
        })]
      })
    })
  });
}

/** Tags allow users to categorize content. They can represent keywords or people, and are grouped to describe an item or a search request. */
const _TagGroup = /*#__PURE__*/React.forwardRef(TagGroup);

export { Tag, _TagGroup as TagGroup };
