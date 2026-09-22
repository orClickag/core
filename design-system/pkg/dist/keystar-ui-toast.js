'use client';
import { useToastQueue, ToastQueue } from 'react-stately/useToastState';
import { forwardRef, useMemo, useRef, useEffect, useSyncExternalStore } from 'react';
import { warning } from 'emery';
import { useLocalizedStringFormatter } from 'react-aria/useLocalizedStringFormatter';
import { useToast, useToastRegion } from 'react-aria/useToast';
import { useObjectRef } from 'react-aria/useObjectRef';
import { Button, ClearButton } from '@keystar/ui/button';
import { Icon } from '@keystar/ui/icon';
import { checkCircle2Icon } from '@keystar/ui/icon/icons/checkCircle2Icon';
import { infoIcon } from '@keystar/ui/icon/icons/infoIcon';
import { alertTriangleIcon } from '@keystar/ui/icon/icons/alertTriangleIcon';
import { SlotProvider } from '@keystar/ui/slots';
import { useStyleProps, classNames, css, tokenSchema, useMediaQuery, useIsMobileDevice, FocusRing } from '@keystar/ui/style';
import { Text } from '@keystar/ui/typography';
import { isReactText } from '@keystar/ui/utils';
import { u as useProvider } from './KeystarProvider-56accbb9.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useLocale } from 'react-aria/I18nProvider';
import ReactDOM from 'react-dom';
import { KeystarProvider } from '@keystar/ui/core';
import 'react-aria/private/overlays/useModal';
import 'react-aria/private/utils/openLink';
import 'react-aria/filterDOMProps';
import './context-f808ea2f.js';
import '@keystar/ui/utils/ts';
import '@keystar/ui/primitives';

const localizedMessages = {
  "ar-AE": {
    "info": `معلومات`,
    "critical": `خطأ`,
    "positive": `تم بنجاح`
  },
  "bg-BG": {
    "info": `Инфо`,
    "critical": `Грешка`,
    "positive": `Успех`
  },
  "cs-CZ": {
    "info": `Informace`,
    "critical": `Chyba`,
    "positive": `Úspěch`
  },
  "da-DK": {
    "info": `Info`,
    "critical": `Fejl`,
    "positive": `Fuldført`
  },
  "de-DE": {
    "info": `Informationen`,
    "critical": `Fehler`,
    "positive": `Erfolg`
  },
  "el-GR": {
    "info": `Πληροφορίες`,
    "critical": `Σφάλμα`,
    "positive": `Επιτυχία`
  },
  "en-US": {
    "info": `Info`,
    "critical": `Error`,
    "positive": `Success`
  },
  "es-ES": {
    "info": `Información`,
    "critical": `Error`,
    "positive": `Éxito`
  },
  "et-EE": {
    "info": `Teave`,
    "critical": `Viga`,
    "positive": `Valmis`
  },
  "fi-FI": {
    "info": `Tiedot`,
    "critical": `Virhe`,
    "positive": `Onnistui`
  },
  "fr-FR": {
    "info": `Infos`,
    "critical": `Erreur`,
    "positive": `Succès`
  },
  "he-IL": {
    "info": `מידע`,
    "critical": `שגיאה`,
    "positive": `הצלחה`
  },
  "hr-HR": {
    "info": `Informacije`,
    "critical": `Pogreška`,
    "positive": `Uspješno`
  },
  "hu-HU": {
    "info": `Információ`,
    "critical": `Hiba`,
    "positive": `Siker`
  },
  "it-IT": {
    "info": `Informazioni`,
    "critical": `Errore`,
    "positive": `Operazione riuscita`
  },
  "ja-JP": {
    "info": `情報`,
    "critical": `エラー`,
    "positive": `成功`
  },
  "ko-KR": {
    "info": `정보`,
    "critical": `오류`,
    "positive": `성공`
  },
  "lt-LT": {
    "info": `Informacija`,
    "critical": `Klaida`,
    "positive": `Sėkmingai`
  },
  "lv-LV": {
    "info": `Informācija`,
    "critical": `Kļūda`,
    "positive": `Izdevās`
  },
  "nb-NO": {
    "info": `Info`,
    "critical": `Feil`,
    "positive": `Vellykket`
  },
  "nl-NL": {
    "info": `Info`,
    "critical": `Fout`,
    "positive": `Geslaagd`
  },
  "pl-PL": {
    "info": `Informacje`,
    "critical": `Błąd`,
    "positive": `Powodzenie`
  },
  "pt-BR": {
    "info": `Informações`,
    "critical": `Erro`,
    "positive": `Sucesso`
  },
  "pt-PT": {
    "info": `Informação`,
    "critical": `Erro`,
    "positive": `Sucesso`
  },
  "ro-RO": {
    "info": `Informaţii`,
    "critical": `Eroare`,
    "positive": `Succes`
  },
  "ru-RU": {
    "info": `Информация`,
    "critical": `Ошибка`,
    "positive": `Успешно`
  },
  "sk-SK": {
    "info": `Informácie`,
    "critical": `Chyba`,
    "positive": `Úspech`
  },
  "sl-SI": {
    "info": `Informacije`,
    "critical": `Napaka`,
    "positive": `Uspešno`
  },
  "sr-SP": {
    "info": `Informacije`,
    "critical": `Greška`,
    "positive": `Uspešno`
  },
  "sv-SE": {
    "info": `Info`,
    "critical": `Fel`,
    "positive": `Lyckades`
  },
  "tr-TR": {
    "info": `Bilgiler`,
    "critical": `Hata`,
    "positive": `Başarılı`
  },
  "uk-UA": {
    "info": `Інформація`,
    "critical": `Помилка`,
    "positive": `Успішно`
  },
  "zh-CN": {
    "info": `信息`,
    "critical": `错误`,
    "positive": `成功`
  },
  "zh-TW": {
    "info": `資訊`,
    "critical": `錯誤`,
    "positive": `成功`
  }
};

const ICONS = {
  info: infoIcon,
  critical: alertTriangleIcon,
  // neutral: infoIcon,
  positive: checkCircle2Icon
};
function Toast(props, ref) {
  let {
    toast: {
      key,
      content: {
        children,
        tone,
        actionLabel,
        onAction,
        shouldCloseOnAction
      }
    },
    state,
    ...otherProps
  } = props;
  let domRef = useObjectRef(ref);
  let {
    closeButtonProps,
    titleProps,
    toastProps,
    contentProps
  } = useToast(props, state, domRef);
  let styleProps = useStyleProps(otherProps);
  let stringFormatter = useLocalizedStringFormatter(localizedMessages);
  let iconLabel = tone && tone !== 'neutral' ? stringFormatter.format(tone) : null;
  let icon = tone && tone !== 'neutral' ? ICONS[tone] : null;
  const colorScheme = useColorScheme();
  const staticColor = tone === 'neutral' && colorScheme === 'dark' ? 'dark' : 'light';
  const handleAction = () => {
    if (onAction) {
      onAction();
    }
    if (shouldCloseOnAction) {
      state.close(key);
    }
  };
  let slots = useMemo(() => ({
    text: {
      color: 'inherit'
    }
  }), []);
  return /*#__PURE__*/jsx("div", {
    ...styleProps,
    ...toastProps,
    ref: domRef,
    "data-tone": tone,
    className: classNames(css({
      borderRadius: tokenSchema.size.radius.regular,
      display: 'flex',
      margin: tokenSchema.size.space.large,
      maxWidth: tokenSchema.size.container.xsmall,
      minHeight: tokenSchema.size.element.large,
      padding: tokenSchema.size.space.regular,
      paddingInlineStart: tokenSchema.size.space.large,
      pointerEvents: 'auto',
      position: 'absolute',
      // tones
      color: tokenSchema.color.foreground.onEmphasis,
      '&[data-tone=neutral]': {
        backgroundColor: tokenSchema.color.background.inverse,
        color: tokenSchema.color.foreground.inverse
      },
      '&[data-tone=info]': {
        background: tokenSchema.color.background.accentEmphasis
      },
      '&[data-tone=positive]': {
        background: tokenSchema.color.background.positiveEmphasis
      },
      '&[data-tone=critical]': {
        background: tokenSchema.color.background.criticalEmphasis
      }
    }), styleProps.className),
    style: styleProps.style,
    children: /*#__PURE__*/jsxs(SlotProvider, {
      slots: slots,
      children: [/*#__PURE__*/jsxs("div", {
        ...contentProps,
        className: css({
          display: 'flex'
        }),
        children: [icon && /*#__PURE__*/jsx(Icon, {
          "aria-label": iconLabel,
          src: icon,
          size: "medium",
          marginTop: "small",
          marginEnd: "regular"
        }), /*#__PURE__*/jsxs("div", {
          className: classNames(css({
            alignItems: 'center',
            display: 'flex',
            columnGap: tokenSchema.size.space.large,
            flex: 1,
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
            paddingInlineEnd: tokenSchema.size.space.large
          })),
          children: [/*#__PURE__*/jsx("div", {
            className: classNames(css({
              flexGrow: 1,
              paddingBlock: tokenSchema.size.space.regular
            })),
            ...titleProps,
            children: isReactText(children) ? /*#__PURE__*/jsx(Text, {
              children: children
            }) : children
          }), actionLabel && /*#__PURE__*/jsx(Button, {
            onPress: handleAction,
            static: staticColor,
            children: actionLabel
          })]
        })]
      }), /*#__PURE__*/jsx("div", {
        className: css({
          borderInlineStart: `${tokenSchema.size.border.regular} solid var(--divider)`,
          paddingInlineStart: tokenSchema.size.space.regular,
          '--divider': 'color-mix(in srgb, transparent, currentColor 20%)'
        }),
        children: /*#__PURE__*/jsx(ClearButton, {
          static: staticColor,
          ...closeButtonProps
        })
      })]
    })
  });
}
function useColorScheme() {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const preferred = useProvider();
  if (preferred.colorScheme === 'auto') {
    return prefersDark ? 'dark' : 'light';
  }
  return preferred.colorScheme;
}
let _Toast = /*#__PURE__*/forwardRef(Toast);

/** @private Positioning and provider for toast children. */
function ToastContainer(props) {
  let {
    children,
    state
  } = props;
  let {
    direction
  } = useLocale();
  let isMobileDevice = useIsMobileDevice();
  let placement = isMobileDevice ? 'center' : props.placement || 'end';
  let position = isMobileDevice ? 'bottom' : props.position || 'bottom';
  let ref = useRef(null);
  let {
    regionProps
  } = useToastRegion(props, state, ref);
  let contents = /*#__PURE__*/jsx(KeystarProvider, {
    UNSAFE_style: {
      background: 'transparent'
    },
    children: /*#__PURE__*/jsx(FocusRing, {
      children: /*#__PURE__*/jsx("div", {
        ...regionProps,
        ref: ref
        // TODO: replace with CSS `dir(rtl)` when supported: https://caniuse.com/css-dir-pseudo
        ,
        "data-direction": direction,
        "data-position": position,
        "data-placement": placement,
        className: css({
          display: 'flex',
          insetInline: 0,
          outline: 'none',
          pointerEvents: 'none',
          position: 'fixed',
          zIndex: 100 /* above modals */,

          '&[data-focus=visible] > :first-child:after': {
            borderRadius: `calc(${tokenSchema.size.radius.regular} + ${tokenSchema.size.alias.focusRingGap})`,
            boxShadow: `0 0 0 ${tokenSchema.size.alias.focusRing} ${tokenSchema.color.alias.focusRing}`,
            content: '""',
            inset: 0,
            margin: `calc(-1 * ${tokenSchema.size.alias.focusRingGap})`,
            pointerEvents: 'none',
            position: 'absolute'
          },
          '&[data-position=top]': {
            top: 0,
            flexDirection: 'column',
            '--slide-from': 'translateY(-100%)',
            '--slide-to': 'translateY(0)'
          },
          '&[data-position=bottom]': {
            bottom: 0,
            flexDirection: 'column-reverse',
            '--slide-from': 'translateY(100%)',
            '--slide-to': 'translateY(0)'
          },
          '&[data-placement=start]': {
            alignItems: 'flex-start',
            '--slide-from': 'translateX(-100%)',
            '--slide-to': 'translateX(0)',
            '&[data-direction=rtl]': {
              '--slide-from': 'translateX(100%)'
            }
          },
          '&[data-placement=center]': {
            alignItems: 'center'
          },
          '&[data-placement=end]': {
            alignItems: 'flex-end',
            '--slide-from': 'translateX(100%)',
            '--slide-to': 'translateX(0)',
            '&[data-direction=rtl]': {
              '--slide-from': 'translateX(-100%)'
            }
          }
        }),
        children: children
      })
    })
  });
  return /*#__PURE__*/ReactDOM.createPortal(contents, document.body);
}

// There is a single global toast queue instance for the whole app, initialized lazily.
let globalToastQueue = null;
function getGlobalToastQueue() {
  if (!globalToastQueue) {
    globalToastQueue = new ToastQueue({
      maxVisibleToasts: 1
    });
  }
  return globalToastQueue;
}
let toastProviders = new Set();
let subscriptions = new Set();
function subscribe(fn) {
  subscriptions.add(fn);
  return () => subscriptions.delete(fn);
}
function getActiveToaster() {
  return toastProviders.values().next().value;
}
function useActiveToaster() {
  return useSyncExternalStore(subscribe, getActiveToaster, getActiveToaster);
}

/**
 * A Toaster renders the queued toasts in an application. It should be
 * placed at the root of the app.
 */
function Toaster(props) {
  // Track all toast provider instances in a set.
  // Only the first one will actually render.
  // We use a ref to do this, since it will have a stable identity
  // over the lifetime of the component.
  let ref = useRef(null);
  toastProviders.add(ref);
  useEffect(() => {
    return () => {
      // Remove this toast provider, and call subscriptions.
      // This will cause all other instances to re-render,
      // and the first one to become the new active toast provider.
      toastProviders.delete(ref);
      for (let fn of subscriptions) {
        fn();
      }
    };
  }, []);

  // Only render if this is the active toast provider instance, and there are visible toasts.
  let activeToaster = useActiveToaster();
  let state = useToastQueue(getGlobalToastQueue());
  if (ref === activeToaster && state.visibleToasts.length > 0) {
    return /*#__PURE__*/jsx(ToastContainer, {
      state: state,
      ...props,
      children: state.visibleToasts.map(toast => /*#__PURE__*/jsx(_Toast, {
        toast: toast,
        state: state
      }, toast.key))
    });
  }
  return null;
}
function addToast(children, tone, options = {}) {
  // Dispatch a custom event so that toasts can be intercepted and re-targeted, e.g. when inside an iframe.
  if (typeof CustomEvent !== 'undefined' && typeof window !== 'undefined') {
    let event = new CustomEvent('keystar-ui-toast', {
      cancelable: true,
      bubbles: true,
      detail: {
        children,
        tone,
        options
      }
    });
    let shouldContinue = window.dispatchEvent(event);
    if (!shouldContinue) {
      return () => {};
    }
  }
  let value = {
    children,
    tone,
    actionLabel: options.actionLabel,
    onAction: options.onAction,
    shouldCloseOnAction: options.shouldCloseOnAction
  };
  warning(typeof options.timeout === 'number' && options.timeout >= 5000, 'Timeouts must be at least 5000ms, for accessibility.');
  let timeout = options.timeout ? Math.max(options.timeout, 5000) : undefined;
  let queue = getGlobalToastQueue();
  let key = queue.add(value, {
    timeout,
    onClose: options.onClose
  });
  return () => queue.close(key);
}
const toastQueue = {
  /** Queues a neutral toast. */
  neutral(children, options = {}) {
    return addToast(children, 'neutral', options);
  },
  /** Queues a positive toast. */
  positive(children, options = {}) {
    return addToast(children, 'positive', options);
  },
  /** Queues a critical toast. */
  critical(children, options = {}) {
    return addToast(children, 'critical', options);
  },
  /** Queues an informational toast. */
  info(children, options = {}) {
    return addToast(children, 'info', options);
  }
};

export { Toaster, toastQueue };
