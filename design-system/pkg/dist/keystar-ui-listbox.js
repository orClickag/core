export { Item } from 'react-stately/Item';
export { Section } from 'react-stately/Section';
import { Icon } from '@keystar/ui/icon';
import { checkIcon } from '@keystar/ui/icon/icons/checkIcon';
import { ClearSlots, SlotProvider } from '@keystar/ui/slots';
import { tokenSchema, css, toDataAttributes, classNames, useStyleProps } from '@keystar/ui/style';
import { forwardRefWithAs } from '@keystar/ui/utils/ts';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useListState } from 'react-stately/useListState';
import { useObjectRef } from 'react-aria/useObjectRef';
import { createContext, useContext, useRef, Fragment, useMemo, forwardRef } from 'react';
import { FocusScope } from 'react-aria/FocusScope';
import { useOption, useListBoxSection, useListBox } from 'react-aria/useListBox';
import { useLocalizedStringFormatter } from 'react-aria/useLocalizedStringFormatter';
import { mergeProps } from 'react-aria/mergeProps';
import { Virtualizer } from 'react-aria/private/virtualizer/Virtualizer';
import { layoutInfoToStyle, VirtualizerItem } from 'react-aria/private/virtualizer/VirtualizerItem';
import { useProvider } from '@keystar/ui/core';
import { ProgressCircle } from '@keystar/ui/progress';
import { assert } from 'emery';
import { ListLayout, Rect, LayoutInfo } from 'react-stately/useVirtualizerState';
import { useFocusRing } from 'react-aria/useFocusRing';
import { isFocusVisible } from 'react-aria/private/interactions/useFocusVisible';
import { useHover } from 'react-aria/useHover';
import { Text } from '@keystar/ui/typography';
import { isReactText } from '@keystar/ui/utils';
import { useLocale } from 'react-aria/I18nProvider';
import { useVirtualizerItem } from 'react-aria/private/virtualizer/useVirtualizerItem';
import { Divider } from '@keystar/ui/layout';

// TODO: the styling is a mess. I need to clean it up.

/** Common list item component for menus and pickers. */
const ListItem = forwardRefWithAs(function ListItem(props, forwardedRef) {
  let {
    children,
    elementType: ElementType = 'div',
    descriptionProps,
    keyboardShortcutProps,
    labelProps,
    isFocused,
    isHovered,
    isPressed,
    isSelected,
    ...otherProps
  } = props;
  let gridGutter = tokenSchema.size.space.regular;
  let contentGutter = tokenSchema.size.space.medium;
  let focusIndicatorWidth = tokenSchema.size.space.xsmall;
  let gridClassname = css({
    display: 'grid',
    // listboxes (options) have selection indicators at the end, whilst menus have them at the start
    gridTemplateAreas: '". icon text . kbd checkmark ." ". icon description . kbd checkmark ."',
    gridTemplateColumns: `${gridGutter} auto 1fr ${contentGutter} auto ${tokenSchema.size.icon.regular} ${gridGutter}`,
    gridTemplateRows: '1fr auto',
    borderRadius: tokenSchema.size.radius.small,
    paddingBlock: tokenSchema.size.space.regular
  });
  let rootClassname = css({
    cursor: 'default',
    color: tokenSchema.color.alias.foregroundIdle,
    display: 'block',
    outline: 0,
    position: 'relative',
    paddingInline: tokenSchema.size.space.small,
    // indicate when external link? e.g. `&[href^=http]`
    'a&': {
      cursor: 'pointer'
    },
    '& .list-item-text': {
      marginBlock: `calc((${tokenSchema.size.icon.regular} - ${tokenSchema.typography.text.regular.capheight}) / 2)`
    },
    [`&:not([aria-disabled=true])`]: {
      '& .list-item-checkmark': {
        stroke: tokenSchema.color.alias.foregroundSelected
      },
      '& .list-item-icon': {
        color: tokenSchema.color.foreground.neutralSecondary
      }
    },
    // standard menu items: no selection indicator
    [`&[role=menuitem] .${gridClassname}`]: {
      gridTemplateAreas: '". icon text . kbd ." ". icon description . kbd ."',
      gridTemplateColumns: `${gridGutter} auto 1fr ${contentGutter} auto ${gridGutter}`
    },
    [[
    // selectable menu items: selection indicator at the start
    `&[role=menuitemcheckbox] .${gridClassname}, &[role=menuitemradio] .${gridClassname}`,
    // menus with _any_ selectable items must make space for the selection indicator
    `[data-selection=single] &[role=menuitem] .${gridClassname}, [data-selection=multiple] &[role=menuitem] .${gridClassname}`].join(', ')]: {
      gridTemplateAreas: '". checkmark icon text . kbd ." ". checkmark icon description . kbd ."',
      gridTemplateColumns: `${tokenSchema.size.space.small} ${tokenSchema.size.icon.medium} auto 1fr ${contentGutter} auto ${gridGutter}`
    },
    // hover
    [`&[aria-disabled=false]:hover .${gridClassname}, &[data-hovered] .${gridClassname}`]: {
      backgroundColor: tokenSchema.color.alias.backgroundHovered,
      color: tokenSchema.color.alias.foregroundHovered
    },
    // focus
    [`&[aria-disabled=false]:focus .${gridClassname}, &[data-focused] .${gridClassname}`]: {
      backgroundColor: tokenSchema.color.alias.backgroundHovered,
      color: tokenSchema.color.alias.foregroundHovered
    },
    // emphasise icons during interaction
    '&[aria-disabled=false]:hover .list-item-icon, &[data-hovered] .list-item-icon, &[aria-disabled=false]:focus .list-item-icon, &[data-focused] .list-item-icon': {
      color: tokenSchema.color.alias.foregroundIdle
    },
    // emphasise `kbd` during interaction
    '&[aria-disabled=false]:hover kbd, &[data-hovered] kbd, &[aria-disabled=false]:focus kbd, &[data-focused] kbd': {
      color: tokenSchema.color.alias.foregroundIdle
    },
    // press
    [`&[aria-disabled=false]:active .${gridClassname}, &[data-pressed] .${gridClassname}`]: {
      backgroundColor: tokenSchema.color.alias.backgroundPressed,
      color: tokenSchema.color.alias.foregroundPressed
    },
    // focus indicator
    '&[data-focused]': {
      // [`& .${gridClassname}`]: {
      //   backgroundColor: tokenSchema.color.alias.backgroundSelected,
      // },
      '&::before': {
        backgroundColor: tokenSchema.color.background.accentEmphasis,
        borderRadius: focusIndicatorWidth,
        content: '""',
        insetBlock: tokenSchema.size.space.xsmall,
        insetInlineStart: 0,
        position: 'absolute',
        width: focusIndicatorWidth
      }
    },
    // disabled
    '&[aria-disabled=true]': {
      color: tokenSchema.color.alias.foregroundDisabled,
      '& kbd': {
        color: 'currentColor'
      },
      '& .list-item-checkmark': {
        stroke: 'currentColor'
      }
    }
  });
  const slots = {
    text: {
      ...labelProps,
      color: 'inherit',
      gridArea: 'text',
      // weight: 'medium',
      UNSAFE_className: 'list-item-text'
    },
    icon: {
      gridArea: 'icon',
      marginEnd: 'regular',
      UNSAFE_className: 'list-item-icon'
    },
    description: {
      color: 'neutralSecondary',
      gridArea: 'description',
      marginY: 'small',
      size: 'small',
      ...descriptionProps
    },
    kbd: {
      UNSAFE_className: css({
        alignItems: 'center',
        color: tokenSchema.color.foreground.neutralTertiary,
        display: 'flex',
        gridArea: 'kbd',
        height: tokenSchema.size.icon.regular
      }),
      ...keyboardShortcutProps
    }
  };
  return /*#__PURE__*/jsx(ElementType
  // NOTE: disabled and selected states should be stored against aria attributes
  , {
    ...toDataAttributes({
      focused: isFocused || undefined,
      hovered: isHovered || undefined,
      pressed: isPressed || undefined
    }),
    ...otherProps,
    ref: forwardedRef,
    className: classNames(rootClassname),
    children: /*#__PURE__*/jsx("div", {
      className: gridClassname,
      children: /*#__PURE__*/jsx(ClearSlots, {
        children: /*#__PURE__*/jsxs(SlotProvider, {
          slots: slots,
          children: [children, isSelected && /*#__PURE__*/jsx(Icon, {
            src: checkIcon,
            slot: "checkmark",
            strokeScaling: false,
            gridArea: "checkmark",
            UNSAFE_className: "list-item-checkmark"
          })]
        })
      })
    })
  });
});

const localizedMessages = {
  "ar-AE": {
    "loading": `جارٍ التحميل...`,
    "loadingMore": `جارٍ تحميل المزيد...`
  },
  "bg-BG": {
    "loading": `Зареждане...`,
    "loadingMore": `Зареждане на още...`
  },
  "cs-CZ": {
    "loading": `Načítání...`,
    "loadingMore": `Načítání dalších...`
  },
  "da-DK": {
    "loading": `Indlæser ...`,
    "loadingMore": `Indlæser flere ...`
  },
  "de-DE": {
    "loading": `Laden...`,
    "loadingMore": `Mehr laden ...`
  },
  "el-GR": {
    "loading": `Φόρτωση...`,
    "loadingMore": `Φόρτωση περισσότερων...`
  },
  "en-US": {
    "loading": `Loading…`,
    "loadingMore": `Loading more…`
  },
  "es-ES": {
    "loading": `Cargando…`,
    "loadingMore": `Cargando más…`
  },
  "et-EE": {
    "loading": `Laadimine...`,
    "loadingMore": `Laadi rohkem...`
  },
  "fi-FI": {
    "loading": `Ladataan…`,
    "loadingMore": `Ladataan lisää…`
  },
  "fr-FR": {
    "loading": `Chargement...`,
    "loadingMore": `Chargement supplémentaire...`
  },
  "he-IL": {
    "loading": `טוען...`,
    "loadingMore": `טוען עוד...`
  },
  "hr-HR": {
    "loading": `Učitavam...`,
    "loadingMore": `Učitavam još...`
  },
  "hu-HU": {
    "loading": `Betöltés folyamatban…`,
    "loadingMore": `Továbbiak betöltése folyamatban…`
  },
  "it-IT": {
    "loading": `Caricamento...`,
    "loadingMore": `Caricamento altri...`
  },
  "ja-JP": {
    "loading": `読み込み中...`,
    "loadingMore": `さらに読み込み中...`
  },
  "ko-KR": {
    "loading": `로드 중`,
    "loadingMore": `추가 로드 중`
  },
  "lt-LT": {
    "loading": `Įkeliama...`,
    "loadingMore": `Įkeliama daugiau...`
  },
  "lv-LV": {
    "loading": `Notiek ielāde...`,
    "loadingMore": `Tiek ielādēts vēl...`
  },
  "nb-NO": {
    "loading": `Laster inn ...`,
    "loadingMore": `Laster inn flere ...`
  },
  "nl-NL": {
    "loading": `Laden...`,
    "loadingMore": `Meer laden...`
  },
  "pl-PL": {
    "loading": `Ładowanie...`,
    "loadingMore": `Wczytywanie większej liczby...`
  },
  "pt-BR": {
    "loading": `Carregando...`,
    "loadingMore": `Carregando mais...`
  },
  "pt-PT": {
    "loading": `A carregar...`,
    "loadingMore": `A carregar mais...`
  },
  "ro-RO": {
    "loading": `Se încarcă...`,
    "loadingMore": `Se încarcă mai multe...`
  },
  "ru-RU": {
    "loading": `Загрузка...`,
    "loadingMore": `Дополнительная загрузка...`
  },
  "sk-SK": {
    "loading": `Načítava sa...`,
    "loadingMore": `Načítava sa viac...`
  },
  "sl-SI": {
    "loading": `Nalaganje...`,
    "loadingMore": `Nalaganje več vsebine...`
  },
  "sr-SP": {
    "loading": `Učitavam...`,
    "loadingMore": `Učitavam još...`
  },
  "sv-SE": {
    "loading": `Läser in...`,
    "loadingMore": `Läser in mer...`
  },
  "tr-TR": {
    "loading": `Yükleniyor...`,
    "loadingMore": `Daha fazla yükleniyor...`
  },
  "uk-UA": {
    "loading": `Завантаження…`,
    "loadingMore": `Завантаження інших об’єктів...`
  },
  "zh-CN": {
    "loading": `正在加载...`,
    "loadingMore": `正在加载更多...`
  },
  "zh-T": {
    "loading": `正在載入`,
    "loadingMore": `正在載入更多…`
  }
};

const ListBoxContext = /*#__PURE__*/createContext(null);
function useListBoxContext() {
  let context = useContext(ListBoxContext);
  assert(!!context, 'ListBoxContext is missing');
  return context;
}

class ListBoxLayout extends ListLayout {
  isLoading = false;
  constructor(opts) {
    super(opts);
    this.placeholderHeight = opts.placeholderHeight;
  }
  update(invalidationContext) {
    var _invalidationContext$;
    this.isLoading = ((_invalidationContext$ = invalidationContext.layoutOptions) === null || _invalidationContext$ === void 0 ? void 0 : _invalidationContext$.isLoading) || false;
    super.update(invalidationContext);
  }
  buildCollection() {
    let nodes = super.buildCollection(this.padding);
    let y = this.contentSize.height;
    if (this.isLoading) {
      var _this$virtualizer;
      let rect = new Rect(0, y, (_this$virtualizer = this.virtualizer) === null || _this$virtualizer === void 0 ? void 0 : _this$virtualizer.visibleRect.width, 40);
      let loader = new LayoutInfo('loader', 'loader', rect);
      let node = {
        layoutInfo: loader,
        validRect: loader.rect
      };
      nodes.push(node);
      this.layoutNodes.set(loader.key, node);
      y = loader.rect.maxY;
    }
    if (nodes.length === 0) {
      var _this$virtualizer2, _this$placeholderHeig, _this$virtualizer3;
      let rect = new Rect(0, y, (_this$virtualizer2 = this.virtualizer) === null || _this$virtualizer2 === void 0 ? void 0 : _this$virtualizer2.visibleRect.width, (_this$placeholderHeig = this.placeholderHeight) !== null && _this$placeholderHeig !== void 0 ? _this$placeholderHeig : (_this$virtualizer3 = this.virtualizer) === null || _this$virtualizer3 === void 0 ? void 0 : _this$virtualizer3.visibleRect.height);
      let placeholder = new LayoutInfo('placeholder', 'placeholder', rect);
      let node = {
        layoutInfo: placeholder,
        validRect: placeholder.rect
      };
      nodes.push(node);
      this.layoutNodes.set(placeholder.key, node);
      y = placeholder.rect.maxY;
    }
    this.contentSize.height = y + this.padding;
    return nodes;
  }
  buildSection(node, x, y) {
    var _section$children;
    // Synthesize a collection node for the header.
    let headerNode = {
      type: 'header',
      key: node.key + ':header',
      parentKey: node.key,
      value: null,
      level: node.level,
      index: node.index,
      hasChildNodes: false,
      childNodes: [],
      rendered: node.rendered,
      textValue: node.textValue
    };

    // Build layout node for it and adjust y offset of section children.
    let header = this.buildSectionHeader(headerNode, x, y);
    header.node = headerNode;
    header.layoutInfo.parentKey = node.key;
    this.layoutNodes.set(headerNode.key, header);
    y += header.layoutInfo.rect.height;
    let section = super.buildSection(node, x, y);
    (_section$children = section.children) === null || _section$children === void 0 || _section$children.unshift(header);
    return section;
  }
}

/** @private */
function ListBoxOption(props) {
  let {
    item,
    shouldSelectOnPressUp,
    shouldFocusOnHover,
    shouldUseVirtualFocus
  } = props;
  let {
    rendered,
    key
  } = item;
  let {
    state
  } = useListBoxContext();
  let ref = useRef(null);
  let {
    optionProps,
    labelProps,
    descriptionProps,
    isSelected,
    isDisabled,
    isFocused,
    isPressed
  } = useOption({
    'aria-label': item['aria-label'],
    key,
    shouldSelectOnPressUp,
    shouldFocusOnHover,
    isVirtualized: true,
    shouldUseVirtualFocus
  }, state, ref);
  let {
    hoverProps,
    isHovered
  } = useHover({
    ...props,
    isDisabled
  });
  let {
    isFocusVisible: isFocusVisible$1,
    focusProps
  } = useFocusRing();
  let contents = isReactText(rendered) ? /*#__PURE__*/jsx(Text, {
    children: rendered
  }) : rendered;
  let isKeyboardModality = isFocusVisible();
  return /*#__PURE__*/jsx(ListItem, {
    descriptionProps: descriptionProps,
    labelProps: labelProps
    // If using virtual focus, apply focused styles to the item when the user is interacting with keyboard modality
    ,
    isFocused: shouldUseVirtualFocus ? isFocused && isKeyboardModality : isFocusVisible$1
    // When shouldFocusOnHover is false, apply hover styles both when hovered with the mouse.
    // Otherwise, apply hover styles when focused using non-keyboard modality.
    ,
    isHovered: isHovered && !shouldFocusOnHover || isFocused && !isKeyboardModality,
    ...mergeProps(optionProps, focusProps, shouldFocusOnHover ? {} : hoverProps),
    isPressed: isPressed,
    isSelected: isSelected,
    ref: ref,
    children: contents
  });
}

/** @private */
function ListBoxSection(props) {
  let {
    children,
    layoutInfo,
    headerLayoutInfo,
    virtualizer,
    item
  } = props;
  let {
    headingProps,
    groupProps
  } = useListBoxSection({
    heading: item.rendered,
    'aria-label': item['aria-label']
  });
  let headerRef = useRef(null);
  useVirtualizerItem({
    layoutInfo: headerLayoutInfo,
    virtualizer,
    ref: headerRef
  });
  let {
    direction
  } = useLocale();
  let {
    state
  } = useListBoxContext();
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsxs("div", {
      role: "presentation",
      ref: headerRef,
      style: layoutInfoToStyle(headerLayoutInfo, direction),
      children: [item.key !== state.collection.getFirstKey() && /*#__PURE__*/jsx(Divider, {
        role: "presentation",
        elementType: "div",
        size: "medium",
        UNSAFE_className: css({
          margin: tokenSchema.size.space.medium
        })
      }), item.rendered && /*#__PURE__*/jsx(Text, {
        ...headingProps,
        casing: "uppercase",
        color: "neutralSecondary",
        size: "small",
        weight: "medium",
        UNSAFE_className: css({
          padding: tokenSchema.size.space.medium
        }),
        children: item.rendered
      })]
    }), /*#__PURE__*/jsx("div", {
      ...groupProps,
      style: layoutInfo ? layoutInfoToStyle(layoutInfo, direction) : undefined,
      className: classNames(css({}), 'ListBoxSection'),
      children: children
    })]
  });
}

/** @private */
function useListBoxLayout() {
  let {
    scale
  } = useProvider();
  let layout = useMemo(() => new ListBoxLayout({
    estimatedRowHeight: scale === 'large' ? 48 : 32,
    estimatedHeadingHeight: scale === 'large' ? 33 : 26,
    padding: scale === 'large' ? 5 : 4,
    // TODO: get from DNA
    placeholderHeight: scale === 'large' ? 48 : 32
  }), [scale]);
  return layout;
}

/** @private */
function ListBoxBase(props, forwardedRef) {
  let {
    layout,
    state,
    shouldFocusOnHover = false,
    shouldUseVirtualFocus = false,
    domProps = {},
    isLoading,
    showLoadingSpinner = isLoading,
    onScroll,
    renderEmptyState
  } = props;
  let {
    listBoxProps
  } = useListBox({
    ...props,
    layoutDelegate: layout,
    isVirtualized: true
  }, state, forwardedRef);
  let styleProps = useStyleProps(props);
  let stringFormatter = useLocalizedStringFormatter(localizedMessages);

  // This overrides collection view's renderWrapper to support heirarchy of items in sections.
  // The header is extracted from the children so it can receive ARIA labeling properties.

  let renderWrapper = (parent, reusableView, children, renderChildren) => {
    if (reusableView.viewType === 'section') {
      var _children$find;
      return /*#__PURE__*/jsx(ListBoxSection, {
        item: reusableView.content,
        layoutInfo: reusableView.layoutInfo,
        virtualizer: reusableView.virtualizer,
        headerLayoutInfo: (_children$find = children.find(c => c.viewType === 'header')) === null || _children$find === void 0 ? void 0 : _children$find.layoutInfo,
        children: renderChildren(children.filter(c => c.viewType === 'item'))
      }, reusableView.key);
    }
    return /*#__PURE__*/jsx(VirtualizerItem, {
      layoutInfo: reusableView.layoutInfo,
      virtualizer: reusableView.virtualizer,
      parent: parent === null || parent === void 0 ? void 0 : parent.layoutInfo,
      children: reusableView.rendered
    }, reusableView.key);
  };
  let focusedKey = state.selectionManager.focusedKey;
  let persistedKeys = useMemo(() => focusedKey != null ? new Set([focusedKey]) : null, [focusedKey]);
  return /*#__PURE__*/jsx(ListBoxContext.Provider, {
    value: {
      state,
      renderEmptyState,
      shouldFocusOnHover,
      shouldUseVirtualFocus
    },
    children: /*#__PURE__*/jsx(FocusScope, {
      children: /*#__PURE__*/jsx(Virtualizer, {
        ...styleProps,
        ...mergeProps(listBoxProps, domProps),
        ref: forwardedRef,
        persistedKeys: persistedKeys,
        autoFocus: !!props.autoFocus,
        scrollDirection: "vertical",
        layout: layout,
        layoutOptions: useMemo(() => ({
          isLoading: showLoadingSpinner
        }), [showLoadingSpinner]),
        collection: state.collection,
        renderWrapper: renderWrapper,
        isLoading: props.isLoading,
        onLoadMore: props.onLoadMore,
        onScroll: onScroll,
        children: (type, item) => {
          if (type === 'item') {
            return /*#__PURE__*/jsx(ListBoxOption, {
              item: item,
              shouldUseVirtualFocus: shouldUseVirtualFocus
            });
          } else if (type === 'loader') {
            return /*#__PURE__*/jsx("div", {
              role: "option",
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
              },
              children: /*#__PURE__*/jsx(ProgressCircle, {
                isIndeterminate: true,
                size: "small",
                "aria-label": state.collection.size > 0 ? stringFormatter.format('loadingMore') : stringFormatter.format('loading')
              })
            });
          } else if (type === 'placeholder') {
            let emptyState = props.renderEmptyState ? props.renderEmptyState() : null;
            if (emptyState == null) {
              return null;
            }
            return /*#__PURE__*/jsx("div", {
              role: "option",
              children: emptyState
            });
          }
        }
      })
    })
  });
}

// forwardRef doesn't support generic parameters, so cast the result to the correct type
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
const _ListBoxBase = /*#__PURE__*/forwardRef(ListBoxBase);

function ListBox(props, forwardedRef) {
  let domRef = useObjectRef(forwardedRef);
  let state = useListState(props);
  let layout = useListBoxLayout();
  return /*#__PURE__*/jsx(_ListBoxBase, {
    ...props,
    ref: domRef,
    state: state,
    layout: layout
  });
}

// forwardRef doesn't support generic parameters, so cast the result to the correct type
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref

/**
 * A list of options that can allow selection of one or more.
 */
const _ListBox = /*#__PURE__*/forwardRef(ListBox);

const listStyles = css({
  borderRadius: 'inherit',
  maxHeight: 'var(--popover-max-height, inherit)',
  // maxWidth: tokenSchema.size.dialog.small,
  outline: 0,
  overflowY: 'auto',
  paddingBlock: tokenSchema.size.space.small,
  userSelect: 'none'
});

export { _ListBox as ListBox, _ListBoxBase as ListBoxBase, ListItem, listStyles, useListBoxLayout };
