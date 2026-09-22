'use client';
export { Item } from 'react-stately/Item';
import { FocusScope } from 'react-aria/FocusScope';
import { announce } from 'react-aria/private/live-announcer/LiveAnnouncer';
import { useLocalizedStringFormatter } from 'react-aria/useLocalizedStringFormatter';
import { useKeyboard } from 'react-aria/useKeyboard';
import { filterDOMProps } from 'react-aria/filterDOMProps';
import { useObjectRef } from 'react-aria/useObjectRef';
import React, { useState, useRef, useEffect } from 'react';
import { ActionGroup } from '@keystar/ui/action-group';
import { ActionButton } from '@keystar/ui/button';
import { Icon } from '@keystar/ui/icon';
import { xIcon } from '@keystar/ui/icon/icons/xIcon';
import { Transition } from '@keystar/ui/overlays';
import { ClassList, useStyleProps, classNames, css, transition, tokenSchema } from '@keystar/ui/style';
import { Text } from '@keystar/ui/typography';
import { useProviderProps } from '@keystar/ui/core';
import { jsx, jsxs } from 'react/jsx-runtime';

const localizedMessages = {
  "ar-AE": {
    "actions": `الإجراءات`,
    "actionsAvailable": `الإجراءات المتاحة.`,
    "clearSelection": `إزالة التحديد`,
    "selected": (args, formatter) => `${formatter.plural(args.count, {
      "=0": `غير محدد`,
      other: () => `${formatter.number(args.count)} محدد`
    })}`,
    "selectedAll": `تم تحديد الكل`
  },
  "bg-BG": {
    "actions": `Действия`,
    "actionsAvailable": `Налични действия.`,
    "clearSelection": `Изчистване на избора`,
    "selected": (args, formatter) => `${formatter.plural(args.count, {
      "=0": `Няма избрани`,
      one: () => `${formatter.number(args.count)} избран`,
      other: () => `${formatter.number(args.count)} избрани`
    })}`,
    "selectedAll": `Всички избрани`
  },
  "cs-CZ": {
    "actions": `Akce`,
    "actionsAvailable": `Dostupné akce.`,
    "clearSelection": `Vymazat výběr`,
    "selected": args => `Vybráno: ${args.count}`,
    "selectedAll": `Vybráno vše`
  },
  "da-DK": {
    "actions": `Handlinger`,
    "actionsAvailable": `Tilgængelige handlinger.`,
    "clearSelection": `Ryd markering`,
    "selected": (args, formatter) => `${formatter.plural(args.count, {
      "=0": `Ingen valgt`,
      other: () => `${formatter.number(args.count)} valgt`
    })}`,
    "selectedAll": `Alle valgt`
  },
  "de-DE": {
    "actions": `Aktionen`,
    "actionsAvailable": `Aktionen verfügbar.`,
    "clearSelection": `Auswahl löschen`,
    "selected": (args, formatter) => `${formatter.plural(args.count, {
      "=0": `Nichts ausgewählt`,
      one: () => `${formatter.number(args.count)} ausgewählt`,
      other: () => `${formatter.number(args.count)} ausgewählt`
    })}`,
    "selectedAll": `Alles ausgewählt`
  },
  "el-GR": {
    "actions": `Ενέργειες`,
    "actionsAvailable": `Υπάρχουν διαθέσιμες ενέργειες.`,
    "clearSelection": `Εκκαθάριση επιλογής`,
    "selected": (args, formatter) => `${formatter.plural(args.count, {
      "=0": `Δεν επιλέχθηκε κανένα`,
      one: () => `${formatter.number(args.count)} επιλεγμένο`,
      other: () => `${formatter.number(args.count)} επιλεγμένα`
    })}`,
    "selectedAll": `Επιλέχθηκαν όλα`
  },
  "en-US": {
    "clearSelection": `Clear selection`,
    "selected": (args, formatter) => `${formatter.plural(args.count, {
      "=0": `None selected`,
      other: () => `${formatter.number(args.count)} selected`
    })}`,
    "selectedAll": `All selected`,
    "actions": `Actions`,
    "actionsAvailable": `Actions available.`
  },
  "es-ES": {
    "actions": `Acciones`,
    "actionsAvailable": `Acciones disponibles.`,
    "clearSelection": `Borrar selección`,
    "selected": (args, formatter) => `${formatter.plural(args.count, {
      "=0": `Nada seleccionado`,
      one: () => `${formatter.number(args.count)} seleccionado`,
      other: () => `${formatter.number(args.count)} seleccionados`
    })}`,
    "selectedAll": `Todo seleccionado`
  },
  "et-EE": {
    "actions": `Toimingud`,
    "actionsAvailable": `Toimingud saadaval.`,
    "clearSelection": `Puhasta valik`,
    "selected": (args, formatter) => `${formatter.plural(args.count, {
      "=0": `Pole valitud`,
      other: () => `${formatter.number(args.count)} valitud`
    })}`,
    "selectedAll": `Kõik valitud`
  },
  "fi-FI": {
    "actions": `Toiminnot`,
    "actionsAvailable": `Toiminnot käytettävissä.`,
    "clearSelection": `Poista valinta`,
    "selected": (args, formatter) => `${formatter.plural(args.count, {
      "=0": `Ei mitään valittu`,
      other: () => `${formatter.number(args.count)} valittu`
    })}`,
    "selectedAll": `Kaikki valittu`
  },
  "fr-FR": {
    "actions": `Actions`,
    "actionsAvailable": `Actions disponibles.`,
    "clearSelection": `Supprimer la sélection`,
    "selected": (args, formatter) => `${formatter.plural(args.count, {
      "=0": `Aucun élément sélectionné`,
      one: () => `${formatter.number(args.count)} sélectionné`,
      other: () => `${formatter.number(args.count)} sélectionnés`
    })}`,
    "selectedAll": `Toute la sélection`
  },
  "he-IL": {
    "actions": `פעולות`,
    "actionsAvailable": `פעולות זמינות.`,
    "clearSelection": `נקה בחירה`,
    "selected": (args, formatter) => `${formatter.plural(args.count, {
      "=0": `לא בוצעה בחירה`,
      one: () => ` ${formatter.number(args.count)} בחר`,
      other: () => `${formatter.number(args.count)} נבחרו`
    })}",`,
    "selectedAll": `כל הפריטים שנבחרו`
  },
  "hr-HR": {
    "actions": `Radnje`,
    "actionsAvailable": `Dostupne radnje.`,
    "clearSelection": `Poništi odabir`,
    "selected": args => `Odabrano: ${args.count}`,
    "selectedAll": `Sve je odabrano`
  },
  "hu-HU": {
    "actions": `Műveletek`,
    "actionsAvailable": `Műveletek állnak rendelkezésre.`,
    "clearSelection": `Kijelölés törlése`,
    "selected": (args, formatter) => `${formatter.plural(args.count, {
      "=0": `Egy sincs kijelölve`,
      other: () => `${formatter.number(args.count)} kijelölve`
    })}`,
    "selectedAll": `Mind kijelölve`
  },
  "it-IT": {
    "actions": `Azioni`,
    "actionsAvailable": `Azioni disponibili.`,
    "clearSelection": `Annulla selezione`,
    "selected": (args, formatter) => `${formatter.plural(args.count, {
      "=0": `Nessuno selezionato`,
      one: () => `${formatter.number(args.count)} selezionato`,
      other: () => `${formatter.number(args.count)} selezionati`
    })}`,
    "selectedAll": `Tutti selezionati`
  },
  "ja-JP": {
    "actions": `アクション`,
    "actionsAvailable": `アクションを利用できます。`,
    "clearSelection": `選択をクリア`,
    "selected": (args, formatter) => `${formatter.plural(args.count, {
      "=0": `選択されていません`,
      other: () => `${formatter.number(args.count)} 個を選択しました`
    })}`,
    "selectedAll": `すべてを選択`
  },
  "ko-KR": {
    "actions": `액션`,
    "actionsAvailable": `사용 가능한 액션`,
    "clearSelection": `선택 항목 지우기`,
    "selected": (args, formatter) => `${formatter.plural(args.count, {
      "=0": `선택된 항목 없음`,
      other: () => `${formatter.number(args.count)}개 선택됨`
    })}`,
    "selectedAll": `모두 선택됨`
  },
  "lt-LT": {
    "actions": `Veiksmai`,
    "actionsAvailable": `Galimi veiksmai.`,
    "clearSelection": `Išvalyti pasirinkimą`,
    "selected": args => `Pasirinkta: ${args.count}`,
    "selectedAll": `Pasirinkta viskas`
  },
  "lv-LV": {
    "actions": `Darbības`,
    "actionsAvailable": `Pieejamas darbības.`,
    "clearSelection": `Notīrīt atlasi`,
    "selected": (args, formatter) => `${formatter.plural(args.count, {
      "=0": `Nav atlasīts nekas`,
      other: () => `Atlasīts(-i): ${formatter.number(args.count)}`
    })}`,
    "selectedAll": `Atlasīts viss`
  },
  "nb-NO": {
    "actions": `Handlinger`,
    "actionsAvailable": `Tilgjengelige handlinger.`,
    "clearSelection": `Tøm utvalg`,
    "selected": args => `Valde element: ${args.count}`,
    "selectedAll": `Alle er valgt`
  },
  "nl-NL": {
    "actions": `Acties`,
    "actionsAvailable": `Acties beschikbaar.`,
    "clearSelection": `Selectie wissen`,
    "selected": (args, formatter) => `${formatter.plural(args.count, {
      "=0": `Niets geselecteerd`,
      other: () => `${formatter.number(args.count)} geselecteerd`
    })}`,
    "selectedAll": `Alles geselecteerd`
  },
  "pl-PL": {
    "actions": `Działania`,
    "actionsAvailable": `Dostępne działania.`,
    "clearSelection": `Wyczyść zaznaczenie`,
    "selected": args => `Zaznaczono: ${args.count}`,
    "selectedAll": `Wszystkie zaznaczone`
  },
  "pt-BR": {
    "actions": `Ações`,
    "actionsAvailable": `Ações disponíveis.`,
    "clearSelection": `Limpar seleção`,
    "selected": (args, formatter) => `${formatter.plural(args.count, {
      "=0": `Nenhum selecionado`,
      one: () => `${formatter.number(args.count)} selecionado`,
      other: () => `${formatter.number(args.count)} selecionados`
    })}`,
    "selectedAll": `Todos selecionados`
  },
  "pt-PT": {
    "actions": `Ações`,
    "actionsAvailable": `Ações disponíveis.`,
    "clearSelection": `Limpar seleção`,
    "selected": (args, formatter) => `${formatter.plural(args.count, {
      "=0": `Nenhum selecionado`,
      one: () => `${formatter.number(args.count)} selecionado`,
      other: () => `${formatter.number(args.count)} selecionados`
    })}`,
    "selectedAll": `Tudo selecionado`
  },
  "ro-RO": {
    "actions": `Acțiuni`,
    "actionsAvailable": `Acțiuni disponibile.`,
    "clearSelection": `Goliți selecția`,
    "selected": (args, formatter) => `${formatter.plural(args.count, {
      "=0": `Niciunul selectat`,
      one: () => ` ${formatter.number(args.count)} selectat`,
      other: () => `${formatter.number(args.count)} selectate`
    })}`,
    "selectedAll": `Toate selectate`
  },
  "ru-RU": {
    "actions": `Действия`,
    "actionsAvailable": `Возможно выполнение действий.`,
    "clearSelection": `Очистить выбор`,
    "selected": args => `Выбрано: ${args.count}`,
    "selectedAll": `Выбрано все`
  },
  "sk-SK": {
    "actions": `Akcie`,
    "actionsAvailable": `Dostupné akcie.`,
    "clearSelection": `Vymazať výber`,
    "selected": args => `Vybrané položky: ${args.count}`,
    "selectedAll": `Všetky vybraté položky`
  },
  "sl-SI": {
    "actions": `Dejanja`,
    "actionsAvailable": `Na voljo so dejanja.`,
    "clearSelection": `Počisti izbor`,
    "selected": args => `Izbrano: ${args.count}`,
    "selectedAll": `Vsi izbrani`
  },
  "sr-SP": {
    "actions": `Radnje`,
    "actionsAvailable": `Dostupne su radnje.`,
    "clearSelection": `Poništi izbor`,
    "selected": args => `Izabrano: ${args.count}`,
    "selectedAll": `Sve je izabrano`
  },
  "sv-SE": {
    "actions": `Åtgärder`,
    "actionsAvailable": `Åtgärder finns.`,
    "clearSelection": `Rensa markering`,
    "selected": (args, formatter) => `${formatter.plural(args.count, {
      "=0": `Inga valda`,
      one: () => `${formatter.number(args.count)} vald`,
      other: () => `${formatter.number(args.count)} valda`
    })}`,
    "selectedAll": `Alla markerade`
  },
  "tr-TR": {
    "actions": `Eylemler`,
    "actionsAvailable": `Eylemler mevcut.`,
    "clearSelection": `Seçimi temizle`,
    "selected": (args, formatter) => `${formatter.plural(args.count, {
      "=0": `Hiçbiri seçilmedi`,
      other: () => `${formatter.number(args.count)} seçildi`
    })}`,
    "selectedAll": `Tümü seçildi`
  },
  "uk-UA": {
    "actions": `Дії`,
    "actionsAvailable": `Доступні дії.`,
    "clearSelection": `Очистити вибір`,
    "selected": args => `Вибрано: ${args.count}`,
    "selectedAll": `Усе вибрано`
  },
  "zh-CN": {
    "actions": `操作`,
    "actionsAvailable": `有可用操作。`,
    "clearSelection": `清除选择`,
    "selected": (args, formatter) => `${formatter.plural(args.count, {
      "=0": `无选择`,
      other: () => `已选择 ${formatter.number(args.count)} 个`
    })}`,
    "selectedAll": `全选`
  },
  "zh-TW": {
    "actions": `動作`,
    "actionsAvailable": `可執行的動作。`,
    "clearSelection": `清除選取項目`,
    "selected": (args, formatter) => `${formatter.plural(args.count, {
      "=0": `未選取任何項目`,
      other: () => `已選取 ${formatter.number(args.count)} 個`
    })}`,
    "selectedAll": `已選取所有項目`
  }
};

const actionbarClassList = new ClassList('ActionBar', ['bar', 'container']);

function ActionBar(props, forwardedRef) {
  let isOpen = props.selectedItemCount !== 0;
  let domRef = useObjectRef(forwardedRef);
  return /*#__PURE__*/jsx(Transition, {
    nodeRef: domRef,
    isOpen: isOpen,
    children: /*#__PURE__*/jsx(ActionBarInnerWithRef, {
      ...props,
      ref: domRef
    })
  });
}
function ActionBarInner(props, ref) {
  props = useProviderProps(props);
  let {
    children,
    onAction,
    onClearSelection,
    selectedItemCount,
    isOpen,
    items,
    buttonLabelBehavior
  } = props;
  let styleProps = useStyleProps(props);
  let stringFormatter = useLocalizedStringFormatter(localizedMessages);

  // Store the last count greater than zero in a ref so that we can retain it while rendering the fade-out animation.
  let [lastCount, setLastCount] = useState(selectedItemCount);
  if ((selectedItemCount === 'all' || selectedItemCount > 0) && selectedItemCount !== lastCount) {
    setLastCount(selectedItemCount);
  }
  let {
    keyboardProps
  } = useKeyboard({
    onKeyDown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClearSelection();
      }
    }
  });

  // Announce "actions available" on mount.
  let isInitial = useRef(true);
  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      announce(stringFormatter.format('actionsAvailable'));
    }
  }, [stringFormatter]);

  // FIXME: style props are passed to both the root and the bar elements
  return /*#__PURE__*/jsx(FocusScope, {
    restoreFocus: true,
    children: /*#__PURE__*/jsx("div", {
      ...filterDOMProps(props),
      ...styleProps,
      ...keyboardProps,
      "data-open": isOpen,
      ref: ref,
      className: classNames(css({
        flex: 'none',
        height: 0,
        opacity: 0,
        overflow: 'hidden',
        transition: transition(['height', 'opacity'], {
          duration: 'short'
        }),
        '&[data-open="true"]': {
          height: `calc(${tokenSchema.size.element.large} + (2 * ${tokenSchema.size.space.regular}))`,
          opacity: 1
        }
      }), actionbarClassList.element('root'), styleProps.className),
      children: /*#__PURE__*/jsxs("div", {
        "data-open": isOpen,
        className: classNames(css({
          alignItems: 'center',
          backgroundColor: tokenSchema.color.background.canvas,
          border: `${tokenSchema.size.border.regular} solid ${tokenSchema.color.border.emphasis}`,
          borderRadius: tokenSchema.size.radius.regular,
          boxShadow: `0 1px 4px ${tokenSchema.color.shadow.regular}`,
          display: 'grid',
          gap: tokenSchema.size.space.small,
          gridTemplateAreas: '"clear selected . actiongroup"',
          gridTemplateColumns: `auto max-content minmax(${tokenSchema.size.element.small}, 1fr) auto`,
          bottom: tokenSchema.size.space.regular,
          insetInline: tokenSchema.size.space.regular,
          isolation: 'isolate',
          justifyContent: 'space-between',
          margin: '0 auto',
          padding: tokenSchema.size.space.regular,
          position: 'absolute',
          transform: `translateY(${tokenSchema.size.space.large})`,
          // initialise with offset
          transition: transition('transform', {
            duration: 'short'
          }),
          '&[data-open="true"]': {
            transform: 'translateY(0)'
          }
        }), actionbarClassList.element('bar')),
        children: [/*#__PURE__*/jsx(ActionGroup, {
          items: items,
          "aria-label": stringFormatter.format('actions'),
          prominence: "low",
          overflowMode: "collapse",
          buttonLabelBehavior: buttonLabelBehavior,
          onAction: onAction,
          gridArea: "actiongroup",
          disabledKeys: props.disabledKeys,
          children: children
        }), /*#__PURE__*/jsx(ActionButton, {
          gridArea: "clear",
          "aria-label": stringFormatter.format('clearSelection'),
          onPress: () => onClearSelection(),
          prominence: "low",
          children: /*#__PURE__*/jsx(Icon, {
            src: xIcon
          })
        }), /*#__PURE__*/jsx(Text, {
          gridArea: "selected",
          children: lastCount === 'all' ? stringFormatter.format('selectedAll') : `${lastCount} selected`
        })]
      })
    })
  });
}
const ActionBarInnerWithRef = /*#__PURE__*/React.forwardRef(ActionBarInner);

/**
 * Action bars are used for single and bulk selection patterns when a user needs
 * to perform actions on one or more items at the same time.
 */
const _ActionBar = /*#__PURE__*/React.forwardRef(ActionBar);

function ActionBarContainer(props, forwardedRef) {
  let styleProps = useStyleProps(props);
  let domRef = useObjectRef(forwardedRef);
  return /*#__PURE__*/jsx("div", {
    ...filterDOMProps(props),
    ...styleProps,
    ref: domRef,
    className: classNames(css({
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      [`& > :not(${actionbarClassList.selector('root')})`]: {
        flex: 1,
        minHeight: 0
      }
    }), actionbarClassList.element('container'), styleProps.className),
    children: props.children
  });
}

/**
 * ActionBarContainer wraps around an ActionBar and a component that supports selection. It handles
 * the ActionBar's position with respect to its linked component.
 */
const _ActionBarContainer = /*#__PURE__*/React.forwardRef(ActionBarContainer);

export { _ActionBar as ActionBar, _ActionBarContainer as ActionBarContainer };
