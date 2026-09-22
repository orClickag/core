import { u as useProvider, d as documentElementClasses } from './KeystarProvider-56accbb9.js';
export { K as KeystarProvider, K as TestProvider, d as documentElementClasses, u as useProvider, a as useProviderProps } from './KeystarProvider-56accbb9.js';
import { useLayoutEffect } from 'react';
import 'react-aria/I18nProvider';
import 'react-aria/private/overlays/useModal';
import 'react-aria/private/utils/openLink';
import 'react-aria/filterDOMProps';
import './context-f808ea2f.js';
import 'react/jsx-runtime';
import '@keystar/ui/style';
import '@keystar/ui/utils/ts';
import '@keystar/ui/primitives';

function ClientSideOnlyDocumentElement(props) {
  const context = useProvider();
  const classes = documentElementClasses({
    bodyBackground: props.bodyBackground,
    colorScheme: context.colorScheme
  });
  useLayoutEffect(() => {
    const split = classes.split(' ');
    const root = document.documentElement;
    root.classList.add(...split);
    return () => {
      root.classList.remove(...split);
    };
  }, [classes]);
  return null;
}

export { ClientSideOnlyDocumentElement };
