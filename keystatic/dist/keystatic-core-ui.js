import React, { useState, useCallback, useRef, useEffect, useMemo, useContext, memo, useSyncExternalStore, Suspense, useDeferredValue, Fragment as Fragment$1 } from 'react';
import { ActionButton, Button, ButtonGroup } from '@keystar/ui/button';
import { Icon } from '@keystar/ui/icon';
import { fileX2Icon } from '@keystar/ui/icon/icons/fileX2Icon';
import { githubIcon } from '@keystar/ui/icon/icons/githubIcon';
import { Flex, HStack, Box, Divider, VStack } from '@keystar/ui/layout';
import { Heading, Text } from '@keystar/ui/typography';
import { useLocalizedStringFormatter } from 'react-aria/useLocalizedStringFormatter';
import { isHotkey } from 'is-hotkey';
import { alertCircleIcon } from '@keystar/ui/icon/icons/alertCircleIcon';
import { listXIcon } from '@keystar/ui/icon/icons/listXIcon';
import { searchIcon } from '@keystar/ui/icon/icons/searchIcon';
import { searchXIcon } from '@keystar/ui/icon/icons/searchXIcon';
import { diffIcon } from '@keystar/ui/icon/icons/diffIcon';
import { plusSquareIcon } from '@keystar/ui/icon/icons/plusSquareIcon';
import { dotSquareIcon } from '@keystar/ui/icon/icons/dotSquareIcon';
import { TextLink, useLink } from '@keystar/ui/link';
import { ProgressCircle } from '@keystar/ui/progress';
import { SearchField } from '@keystar/ui/search-field';
import { useMediaQuery, breakpointQueries, css, tokenSchema, containerQueries, classNames, transition } from '@keystar/ui/style';
import { TableView, TableHeader, Column, TableBody, Cell, Row } from '@keystar/ui/table';
import { P as PageRoot, s as strings, a as PageHeader, f as fetchBlob, l as loadDataFile, p as parseProps, A as AppSlugContext, b as serializeProps, y as yjsToVal, c as parseEntry, d as serializeEntryToFiles, u as useItemData, e as PageBody, g as getYjsValFromParsedValue, h as containerWidthForEntryLayout, i as useCollection, j as usePreviewProps, k as useUpsertItem, m as usePreviewPropsFromY, n as useCreateBranchMutation, o as prettyErrorForCreateBranchMutation, q as useSlugFieldInfo, r as useDeleteItem, t as clientSideValidateProp, v as setValueToPreviewProps, F as FormForEntry, w as getInitialPropsValue, x as useAssociatedPullRequest, C as CreateBranchDialog, z as useNavItems, B as pluralize, D as useSidebar, S as SidebarDialog, E as SidebarPanel, G as SidebarProvider, H as useSingleton, I as InstallGitHubApp, J as AppSlugProvider, K as Provider } from './useItemData-a15ccb4e.js';
import { u as useRouter, a as useTree, g as getCollectionPath, b as useRepoInfo, c as useCurrentBranch, i as isLocalConfig, d as useBaseCommit, e as getEntriesInCollectionWithTreeKey, f as useData, h as getCollectionFormat, j as getEntryDataFilepath, k as getCollectionItemPath, l as getSlugGlobForCollection, s as serializeRepoConfig, m as getAuth, G as GitHubAppShellQuery, p as parseRepoConfig, n as useCloudInfo, o as useAwarenessStates, q as getSlugFromState, r as blobSha, t as useYjs, v as getDraft, w as useYjsIfAvailable, L as LOADING, x as getCollection, y as suspendOnData, z as useShowRestoredDraftMessage, A as setDraft, B as delDraft, C as useEventCallback, D as useConfig, E as getBranchPrefix, F as getRepoUrl, H as getPathPrefix, I as getDataFileExtension, J as isGitHubConfig, K as useViewer, M as useContentPanelState, N as ContentPanelProvider, O as AppShellErrorContext, P as ConfigContext, Q as AppStateContext, R as GitHubAppShellProvider, S as LocalAppShellProvider, T as useRawCloudInfo, U as useBranches, V as GitHubAppShellDataContext, W as getSingletonFormat, X as getSingletonPath, Y as isCloudConfig, Z as KEYSTATIC_CLOUD_BROWSER_API_URL, _ as KEYSTATIC_CLOUD_HEADERS, $ as assertValidRepoConfig, a0 as RouterProvider, a1 as redirectToCloudAuth, a2 as CloudInfoProvider, a3 as GitHubAppShellDataProvider } from './index-f046736f.js';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as Y from 'yjs';
import * as s from 'superstruct';
import { Dialog, DialogContainer, AlertDialog, DialogTrigger } from '@keystar/ui/dialog';
import { historyIcon } from '@keystar/ui/icon/icons/historyIcon';
import { Notice } from '@keystar/ui/notice';
import { toastQueue } from '@keystar/ui/toast';
import { ActionGroup, Item as Item$1 } from '@keystar/ui/action-group';
import { Badge } from '@keystar/ui/badge';
import { copyPlusIcon } from '@keystar/ui/icon/icons/copyPlusIcon';
import { clipboardCopyIcon } from '@keystar/ui/icon/icons/clipboardCopyIcon';
import { clipboardPasteIcon } from '@keystar/ui/icon/icons/clipboardPasteIcon';
import { externalLinkIcon } from '@keystar/ui/icon/icons/externalLinkIcon';
import { trash2Icon } from '@keystar/ui/icon/icons/trash2Icon';
import { Content } from '@keystar/ui/slots';
import { TextField } from '@keystar/ui/text-field';
import { useClient } from 'urql';
import { Breadcrumbs, Item } from '@keystar/ui/breadcrumbs';
import { Avatar } from '@keystar/ui/avatar';
import isEqual from 'fast-deep-equal';
import { b as base64UrlDecode, a as base64UrlEncode } from './base64-8b5b6625.js';
import { gitBranchIcon } from '@keystar/ui/icon/icons/gitBranchIcon';
import { gitBranchPlusIcon } from '@keystar/ui/icon/icons/gitBranchPlusIcon';
import { gitPullRequestIcon } from '@keystar/ui/icon/icons/gitPullRequestIcon';
import { plusIcon } from '@keystar/ui/icon/icons/plusIcon';
import { SplitView, SplitPanePrimary, SplitPaneSecondary } from '@keystar/ui/split-view';
import 'lru-cache';
import '@keystar/ui/picker';
import '@keystar/ui/field';
import '@keystar/ui/menu';
import 'react-aria/useField';
import 'emery';
import '@keystar/ui/drag-and-drop';
import '@keystar/ui/list-view';
import '@keystar/ui/tooltip';
import 'slate';
import 'slate-react';
import 'react-aria/I18nProvider';
import '@keystar/ui/icon/icons/panelLeftOpenIcon';
import '@keystar/ui/icon/icons/panelLeftCloseIcon';
import '@keystar/ui/icon/icons/panelRightOpenIcon';
import '@keystar/ui/icon/icons/panelRightCloseIcon';
import 'react-aria/Overlay';
import 'react-aria/useModalOverlay';
import 'react-aria/private/utils/useUpdateEffect';
import 'react-stately/useOverlayTriggerState';
import '@keystar/ui/nav-list';
import '@keystar/ui/overlays';
import '@keystar/ui/status-light';
import '@keystar/ui/utils';
import '@keystar/ui/core';
import 'react-stately/Section';
import 'react-stately/Item';
import '@ts-gql/tag/no-transform';
import '@keystar/ui/icon/icons/logOutIcon';
import '@keystar/ui/icon/icons/gitForkIcon';
import '@keystar/ui/icon/icons/imageIcon';
import '@keystar/ui/icon/icons/monitorIcon';
import '@keystar/ui/icon/icons/moonIcon';
import '@keystar/ui/icon/icons/sunIcon';
import '@keystar/ui/icon/icons/userIcon';
import '@keystar/ui/combobox';
import '@keystar/ui/radio';
import '@keystar/ui/icon/icons/editIcon';
import '@keystar/ui/icon/icons/linkIcon';
import '@keystar/ui/icon/icons/unlinkIcon';
import '@braintree/sanitize-url';
import '@keystar/ui/icon/icons/boldIcon';
import '@keystar/ui/icon/icons/chevronDownIcon';
import '@keystar/ui/icon/icons/codeIcon';
import '@keystar/ui/icon/icons/italicIcon';
import '@keystar/ui/icon/icons/maximizeIcon';
import '@keystar/ui/icon/icons/minimizeIcon';
import '@keystar/ui/icon/icons/removeFormattingIcon';
import '@keystar/ui/icon/icons/strikethroughIcon';
import '@keystar/ui/icon/icons/subscriptIcon';
import '@keystar/ui/icon/icons/superscriptIcon';
import '@keystar/ui/icon/icons/typeIcon';
import '@keystar/ui/icon/icons/underlineIcon';
import '@keystar/ui/icon/icons/alignLeftIcon';
import '@keystar/ui/icon/icons/alignRightIcon';
import '@keystar/ui/icon/icons/alignCenterIcon';
import '@keystar/ui/icon/icons/quoteIcon';
import 'match-sorter';
import 'emery/assertions';
import '@keystar/ui/icon/icons/trashIcon';
import '@emotion/weak-memoize';
import '@keystar/ui/icon/icons/minusIcon';
import '@keystar/ui/icon/icons/columnsIcon';
import '@keystar/ui/icon/icons/listIcon';
import '@keystar/ui/icon/icons/listOrderedIcon';
import '@keystar/ui/icon/icons/fileUpIcon';
import '@keystar/ui/checkbox';
import '@keystar/ui/number-field';
import '@markdoc/markdoc/dist/index.mjs';
import '@keystar/ui/action-bar';
import 'minimatch';
import '@keystar/ui/icon/icons/refreshCwIcon';
import '@sindresorhus/slugify';
import 'prosemirror-commands';
import 'prosemirror-state';
import 'prosemirror-transform';
import '@keystar/ui/editor';
import '@keystar/ui/icon/icons/tableIcon';
import '@keystar/ui/icon/icons/fileCodeIcon';
import '@keystar/ui/icon/icons/heading1Icon';
import '@keystar/ui/icon/icons/heading2Icon';
import '@keystar/ui/icon/icons/heading3Icon';
import '@keystar/ui/icon/icons/heading4Icon';
import '@keystar/ui/icon/icons/heading5Icon';
import '@keystar/ui/icon/icons/heading6Icon';
import '@keystar/ui/icon/icons/separatorHorizontalIcon';
import 'prosemirror-model';
import 'js-yaml';
import '@urql/exchange-graphcache';
import '@urql/exchange-auth';
import '@urql/exchange-graphcache/extras';
import 'prosemirror-view';
import 'react-aria/ListKeyboardDelegate';
import 'react-aria/private/selection/useSelectableCollection';
import 'react-aria/chain';
import 'react-stately/useListState';
import '@keystar/ui/listbox';
import 'prosemirror-tables';
import '@keystar/ui/icon/icons/sheetIcon';
import '@keystar/ui/icon/icons/pencilIcon';
import '@keystar/ui/icon/icons/arrowLeftIcon';
import '@keystar/ui/icon/icons/smartphoneIcon';
import '@keystar/ui/icon/icons/tabletIcon';
import '@keystar/ui/icon/icons/viewIcon';
import 'react-dom';
import 'y-prosemirror';
import 'prosemirror-history';
import 'prosemirror-keymap';
import 'escape-string-regexp';
import 'mdast-util-from-markdown';
import 'mdast-util-to-markdown';
import 'mdast-util-gfm-autolink-literal';
import 'mdast-util-gfm-strikethrough';
import 'mdast-util-gfm-table';
import 'mdast-util-mdx';
import 'micromark-extension-gfm-autolink-literal';
import 'micromark-extension-gfm-strikethrough';
import 'micromark-extension-gfm-table';
import 'micromark-extension-mdxjs';
import 'unist-util-visit';
import 'scroll-into-view-if-needed';
import 'react-aria/useOverlayTrigger';
import 'slate-history';
import '@keystar/ui/icon/icons/link2Icon';
import '@keystar/ui/icon/icons/link2OffIcon';
import '@keystar/ui/icon/icons/undo2Icon';
import 'react-aria/useOverlay';
import 'react-aria/useOverlayPosition';
import 'react-aria/mergeProps';
import 'y-protocols/awareness';
import '@toeverything/y-indexeddb';
import 'lib0/broadcastchannel';
import 'lib0/time';
import 'lib0/encoding';
import 'lib0/decoding';
import 'y-protocols/sync';
import 'y-protocols/auth';
import 'lib0/mutex';
import 'lib0/math';
import 'cookie';
import 'idb-keyval';
import 'react-aria/private/utils/useEffectEvent';
import 'partysocket/ws';
import 'lib0/encoding.js';
import 'react-aria/private/utils/useResizeObserver';

// the collator enables language-sensitive string comparison
const collator = new Intl.Collator(undefined, {
  sensitivity: 'base'
});

/**
 * Creates a comparison function that should be provided to the `sort()` method
 * of your data array.
 */
function sortBy(direction, valueA, valueB) {
  const modifier = direction === 'ascending' ? 1 : -1;

  // always push `null` and `undefined` to the bottom
  if (valueA == null) return 1;
  if (valueB == null) return -1;

  // the collator is only appropriate for strings, it fails in subtle
  // ways for floats, dates, etc.
  if (typeof valueA === 'string' && typeof valueB === 'string') {
    return collator.compare(valueA, valueB) * modifier;
  }
  return compare(valueA, valueB) * modifier;
}

/** Default comparison for non-string values */
function compare(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

function EmptyState(props) {
  return /*#__PURE__*/jsx(Flex, {
    alignItems: "center",
    direction: "column",
    gap: "large",
    justifyContent: "center",
    minHeight: "scale.3000",
    paddingX: {
      mobile: 'medium',
      tablet: 'xlarge',
      desktop: 'xxlarge'
    },
    children: 'children' in props ? props.children : /*#__PURE__*/jsxs(Fragment, {
      children: [props.icon && /*#__PURE__*/jsx(Icon, {
        src: props.icon,
        size: "large",
        color: "neutralEmphasis"
      }), props.title && /*#__PURE__*/jsx(Heading, {
        align: "center",
        size: "medium",
        children: props.title
      }), props.message && /*#__PURE__*/jsx(Text, {
        align: "center",
        children: props.message
      }), props.actions]
    })
  });
}

class NotFoundError extends Error {
  constructor() {
    super('Not found');
    this.name = 'NotFoundError';
  }
}
function isNotFoundError(err) {
  return typeof err === 'object' && err !== null && err instanceof NotFoundError;
}
function notFound() {
  throw new NotFoundError();
}
class NotFoundErrorBoundaryInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notFound: false,
      lastHref: props.href
    };
  }
  static getDerivedStateFromError(err) {
    if (isNotFoundError(err)) {
      return {
        notFound: true
      };
    }
    throw err;
  }
  static getDerivedStateFromProps(props, state) {
    if (props.href !== state.lastHref && state.notFound) {
      return {
        notFound: false,
        lastHref: props.href
      };
    }
    return {
      notFound: state.notFound,
      lastHref: props.href
    };
  }
  render() {
    if (this.state.notFound) return this.props.fallback;
    return this.props.children;
  }
}
function NotFoundBoundary(props) {
  const router = useRouter();
  return /*#__PURE__*/jsx(NotFoundErrorBoundaryInner, {
    ...props,
    href: router.href
  });
}

function CollectionPage(props) {
  var _config$collections, _URLSearchParams$get;
  const {
    collection,
    config
  } = props;
  const containerWidth = 'none'; // TODO: use a "large" when we have more columns
  const collectionConfig = (_config$collections = config.collections) === null || _config$collections === void 0 ? void 0 : _config$collections[collection];
  if (!collectionConfig) notFound();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState((_URLSearchParams$get = new URLSearchParams(router.search).get('search')) !== null && _URLSearchParams$get !== void 0 ? _URLSearchParams$get : '');
  const setSearchTermFromForm = useCallback(value => {
    setSearchTerm(value);
    const params = new URLSearchParams(router.search);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    router.replace(router.pathname + '?' + params.toString());
  }, [router]);
  let debouncedSearchTerm = useDebouncedValue(searchTerm, 300);
  return /*#__PURE__*/jsxs(PageRoot, {
    containerWidth: containerWidth,
    children: [/*#__PURE__*/jsx(CollectionPageHeader, {
      collectionLabel: collectionConfig.label,
      createHref: `${props.basePath}/collection/${encodeURIComponent(props.collection)}/create`,
      searchTerm: searchTerm,
      onSearchTermChange: setSearchTermFromForm
    }), /*#__PURE__*/jsx(CollectionPageContent, {
      searchTerm: debouncedSearchTerm,
      ...props
    })]
  });
}
function CollectionPageHeader(props) {
  const {
    collectionLabel,
    createHref
  } = props;
  const stringFormatter = useLocalizedStringFormatter(strings);
  const isAboveMobile = useMediaQuery(breakpointQueries.above.mobile);
  const [searchVisible, setSearchVisible] = useState(isAboveMobile);
  const searchRef = useRef(null);
  useEffect(() => {
    setSearchVisible(isAboveMobile);
  }, [isAboveMobile]);

  // entries are presented in a virtualized table view, so we replace the
  // default (e.g. ctrl+f) browser search behaviour
  useEffect(() => {
    const listener = event => {
      // bail if the search field is already focused; let users invoke the
      // browser search if they need to
      if (document.activeElement === searchRef.current) {
        return;
      }
      if (isHotkey('mod+f', event)) {
        var _searchRef$current;
        event.preventDefault();
        (_searchRef$current = searchRef.current) === null || _searchRef$current === void 0 || _searchRef$current.select();
      }
    };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, []);
  return /*#__PURE__*/jsxs(PageHeader, {
    children: [/*#__PURE__*/jsx(Heading, {
      elementType: "h1",
      id: "page-title",
      size: "small",
      flex: true,
      minWidth: 0,
      children: collectionLabel
    }), /*#__PURE__*/jsx("div", {
      role: "search",
      style: {
        display: searchVisible ? 'block' : 'none'
      },
      children: /*#__PURE__*/jsx(SearchField, {
        ref: searchRef,
        "aria-label": stringFormatter.format('search') // TODO: l10n "Search {collection}"?
        ,
        onChange: props.onSearchTermChange,
        onClear: () => {
          props.onSearchTermChange('');
          if (!isAboveMobile) {
            // the timeout ensures that the "add" button isn't pressed
            setTimeout(() => {
              setSearchVisible(false);
            }, 250);
          }
        },
        onBlur: () => {
          if (!isAboveMobile && props.searchTerm === '') {
            setSearchVisible(false);
          }
        },
        placeholder: stringFormatter.format('search'),
        value: props.searchTerm,
        width: "scale.2400"
      })
    }), /*#__PURE__*/jsx(ActionButton, {
      "aria-label": "show search",
      isHidden: searchVisible || {
        above: 'mobile'
      },
      onPress: () => {
        setSearchVisible(true);
        // NOTE: this hack is to force the search field to focus, and invoke
        // the software keyboard on mobile safari
        let tempInput = document.createElement('input');
        tempInput.style.position = 'absolute';
        tempInput.style.opacity = '0';
        document.body.appendChild(tempInput);
        tempInput.focus();
        setTimeout(() => {
          var _searchRef$current2;
          (_searchRef$current2 = searchRef.current) === null || _searchRef$current2 === void 0 || _searchRef$current2.focus();
          tempInput.remove();
        }, 0);
      },
      children: /*#__PURE__*/jsx(Icon, {
        src: searchIcon
      })
    }), /*#__PURE__*/jsx(Button, {
      marginStart: "auto",
      prominence: "high",
      href: createHref,
      isHidden: searchVisible ? {
        below: 'tablet'
      } : undefined,
      children: stringFormatter.format('add')
    })]
  });
}
function CollectionPageContent(props) {
  const trees = useTree();
  const tree = trees.merged.kind === 'loaded' ? trees.merged.data.current.entries.get(getCollectionPath(props.config, props.collection)) : null;
  if (trees.merged.kind === 'error') {
    return /*#__PURE__*/jsx(EmptyState, {
      icon: alertCircleIcon,
      title: "Unable to load collection",
      message: trees.merged.error.message,
      actions: /*#__PURE__*/jsx(Button, {
        tone: "accent",
        href: props.basePath,
        children: "Dashboard"
      })
    });
  }
  if (trees.merged.kind === 'loading') {
    return /*#__PURE__*/jsx(EmptyState, {
      children: /*#__PURE__*/jsx(ProgressCircle, {
        "aria-label": "Loading Entries",
        isIndeterminate: true,
        size: "large"
      })
    });
  }
  if (!tree) {
    return /*#__PURE__*/jsx(EmptyState, {
      icon: listXIcon,
      title: "Empty collection",
      message: /*#__PURE__*/jsxs(Fragment, {
        children: ["There aren't any entries yet.", ' ', /*#__PURE__*/jsx(TextLink, {
          href: `${props.basePath}/collection/${encodeURIComponent(props.collection)}/create`,
          children: "Create the first entry"
        }), ' ', "to see it here."]
      })
    });
  }
  return /*#__PURE__*/jsx(CollectionTable, {
    ...props,
    trees: trees.merged.data
  });
}
const SLUG = '@@slug';
const STATUS = '@@status';
function CollectionTable(props) {
  let {
    searchTerm
  } = props;
  const repoInfo = useRepoInfo();
  const currentBranch = useCurrentBranch();
  let isLocalMode = isLocalConfig(props.config);
  let router = useRouter();
  let [sortDescriptor, setSortDescriptor] = useState({
    column: SLUG,
    direction: 'ascending'
  });
  let hideStatusColumn = isLocalMode || currentBranch === (repoInfo === null || repoInfo === void 0 ? void 0 : repoInfo.defaultBranch);
  const baseCommit = useBaseCommit();
  const collection = props.config.collections[props.collection];
  const entriesWithStatus = useMemo(() => {
    const defaultEntries = new Map(getEntriesInCollectionWithTreeKey(props.config, props.collection, props.trees.default.tree).map(x => [x.slug, x.key]));
    return getEntriesInCollectionWithTreeKey(props.config, props.collection, props.trees.current.tree).map(entry => {
      return {
        name: entry.slug,
        status: defaultEntries.has(entry.slug) ? defaultEntries.get(entry.slug) === entry.key ? 'Unchanged' : 'Changed' : 'Added',
        sha: entry.sha
      };
    });
  }, [props.collection, props.config, props.trees]);
  const mainFiles = useData(useCallback(async () => {
    var _collection$columns;
    if (!((_collection$columns = collection.columns) !== null && _collection$columns !== void 0 && _collection$columns.length)) return undefined;
    const formatInfo = getCollectionFormat(props.config, props.collection);
    const entries = await Promise.all(entriesWithStatus.map(async entry => {
      return [entry.name, await fetchBlob(props.config, entry.sha, getEntryDataFilepath(getCollectionItemPath(props.config, props.collection, entry.name), formatInfo), baseCommit, repoInfo)];
    }));
    const glob = getSlugGlobForCollection(props.config, props.collection);
    const rootSchema = {
      kind: 'object',
      fields: collection.schema
    };
    const parsedEntries = new Map();
    for (const [slug, dataFile] of entries) {
      try {
        const {
          loaded
        } = loadDataFile(dataFile, formatInfo);
        const validated = parseProps(rootSchema, loaded, [], [], (schema, value, path) => {
          if (schema.formKind === 'asset') {
            return schema.reader.parse(value);
          }
          if (schema.formKind === 'content' || schema.formKind === 'assets') {
            return;
          }
          if (path.length === 1 && slug !== undefined) {
            if (path[0] === collection.slugField) {
              if (schema.formKind !== 'slug') {
                throw new Error(`Slug field ${collection.slugField} is not a slug field`);
              }
              return schema.reader.parseWithSlug(value, {
                slug,
                glob
              });
            }
          }
          return schema.reader.parse(value);
        }, true);
        parsedEntries.set(slug, validated);
      } catch {}
    }
    return parsedEntries;
  }, [collection, props.config, props.collection, entriesWithStatus, baseCommit, repoInfo]));
  const entriesWithData = useMemo(() => {
    if (mainFiles.kind !== 'loaded' || !mainFiles.data) {
      return entriesWithStatus;
    }
    const {
      data
    } = mainFiles;
    return entriesWithStatus.map(entry => {
      return {
        ...entry,
        data: data.get(entry.name)
      };
    });
  }, [entriesWithStatus, mainFiles]);
  const filteredItems = useMemo(() => {
    return entriesWithData.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [entriesWithData, searchTerm]);
  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const readCol = (row, other) => {
        var _other;
        if (sortDescriptor.column === SLUG) {
          var _collection$parseSlug, _collection$parseSlug2;
          return (_collection$parseSlug = (_collection$parseSlug2 = collection.parseSlugForSort) === null || _collection$parseSlug2 === void 0 ? void 0 : _collection$parseSlug2.call(collection, row.name)) !== null && _collection$parseSlug !== void 0 ? _collection$parseSlug : row.name;
        }
        if (sortDescriptor.column === STATUS) {
          return row.status;
        }
        return (_other = other === null || other === void 0 ? void 0 : other[sortDescriptor.column]) !== null && _other !== void 0 ? _other : row.name;
      };
      const other = mainFiles.kind === 'loaded' ? mainFiles.data : undefined;
      return sortBy(sortDescriptor.direction, readCol(a, other === null || other === void 0 ? void 0 : other.get(a.name)), readCol(b, other === null || other === void 0 ? void 0 : other.get(b.name)));
    });
  }, [collection, filteredItems, mainFiles, sortDescriptor.column, sortDescriptor.direction]);
  const columns = useMemo(() => {
    var _collection$columns2;
    if ((_collection$columns2 = collection.columns) !== null && _collection$columns2 !== void 0 && _collection$columns2.length) {
      return [...(hideStatusColumn ? [] : [{
        name: 'Status',
        key: STATUS,
        minWidth: 32,
        width: 32
      }]), {
        name: 'Slug',
        key: SLUG
      }, ...collection.columns.map(column => {
        const schema = collection.schema[column];
        return {
          name: 'label' in schema && schema.label || column,
          key: column
        };
      })];
    }
    return hideStatusColumn ? [{
      name: 'Name',
      key: SLUG
    }] : [{
      name: 'Status',
      key: STATUS,
      minWidth: 32,
      width: 32
    }, {
      name: 'Name',
      key: SLUG
    }];
  }, [collection, hideStatusColumn]);
  return /*#__PURE__*/jsxs(TableView, {
    "aria-labelledby": "page-title",
    selectionMode: "none",
    onSortChange: setSortDescriptor,
    sortDescriptor: sortDescriptor,
    density: "spacious",
    overflowMode: "truncate",
    prominence: "low",
    onAction: key => {
      router.push(getItemPath(props.basePath, props.collection, key.toString().slice('key:'.length)));
    },
    renderEmptyState: () => /*#__PURE__*/jsx(EmptyState, {
      icon: searchXIcon,
      title: "No results",
      message: `No items matching "${searchTerm}" were found.`
    }),
    flex: true,
    marginTop: {
      tablet: 'large'
    },
    marginBottom: {
      mobile: 'regular',
      tablet: 'xlarge'
    },
    UNSAFE_className: css({
      marginInline: tokenSchema.size.space.regular,
      [breakpointQueries.above.mobile]: {
        marginInline: `calc(${tokenSchema.size.space.xlarge} - ${tokenSchema.size.space.medium})`
      },
      [breakpointQueries.above.tablet]: {
        marginInline: `calc(${tokenSchema.size.space.xxlarge} - ${tokenSchema.size.space.medium})`
      },
      '[role=rowheader]': {
        cursor: 'pointer'
      }
    }),
    children: [/*#__PURE__*/jsx(TableHeader, {
      columns: columns,
      children: ({
        name,
        key,
        ...options
      }) => key === STATUS ? /*#__PURE__*/jsx(Column, {
        isRowHeader: true,
        allowsSorting: true,
        ...options,
        children: /*#__PURE__*/jsx(Icon, {
          "aria-label": "Status",
          src: diffIcon
        })
      }, key) : /*#__PURE__*/jsx(Column, {
        isRowHeader: true,
        allowsSorting: true,
        ...options,
        children: name
      }, key)
    }), /*#__PURE__*/jsx(TableBody, {
      items: sortedItems,
      children: item => {
        var _collection$columns3;
        const statusCell = /*#__PURE__*/jsx(Cell, {
          textValue: item.status,
          children: item.status === 'Added' ? /*#__PURE__*/jsx(Icon, {
            color: "positive",
            src: plusSquareIcon
          }) : item.status === 'Changed' ? /*#__PURE__*/jsx(Icon, {
            color: "accent",
            src: dotSquareIcon
          }) : null
        }, STATUS + item.name);
        const nameCell = /*#__PURE__*/jsx(Cell, {
          textValue: item.name,
          children: /*#__PURE__*/jsx(Text, {
            weight: "medium",
            children: item.name
          })
        }, SLUG + item.name);
        if ((_collection$columns3 = collection.columns) !== null && _collection$columns3 !== void 0 && _collection$columns3.length) {
          return /*#__PURE__*/jsx(Row, {
            children: [...(hideStatusColumn ? [] : [statusCell]), nameCell, ...collection.columns.map(column => {
              var _item$data;
              let val;
              val = (_item$data = item.data) === null || _item$data === void 0 ? void 0 : _item$data[column];
              if (val == null) {
                val = undefined;
              } else {
                val = val + '';
              }
              return /*#__PURE__*/jsx(Cell, {
                textValue: val,
                children: /*#__PURE__*/jsx(Text, {
                  weight: "medium",
                  children: val
                })
              }, column + item.name);
            })]
          }, 'key:' + item.name);
        }
        return hideStatusColumn ? /*#__PURE__*/jsx(Row, {
          children: nameCell
        }, 'key:' + item.name) : /*#__PURE__*/jsxs(Row, {
          children: [statusCell, nameCell]
        }, 'key:' + item.name);
      }
    })]
  });
}
function getItemPath(basePath, collection, key) {
  return `${basePath}/collection/${encodeURIComponent(collection)}/item/${encodeURIComponent(key)}`;
}
function useDebouncedValue(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouncedValue;
}

function ForkRepoDialog(props) {
  const stringFormatter = useLocalizedStringFormatter(strings);
  const client = useClient();
  const [state, setState] = useState({
    kind: 'idle'
  });
  useEffect(() => {
    const listener = async event => {
      if (event.key === 'ks-refetch-installations' && event.newValue === 'true') {
        localStorage.removeItem('ks-refetch-installations');
        try {
          var _res$data;
          const auth = await getAuth(props.config);
          if (!auth) throw new Error('Unauthorized');
          const res = await client.query(GitHubAppShellQuery, parseRepoConfig(props.config.storage.repo)).toPromise();
          if ((_res$data = res.data) !== null && _res$data !== void 0 && (_res$data = _res$data.repository) !== null && _res$data !== void 0 && (_res$data = _res$data.forks.nodes) !== null && _res$data !== void 0 && _res$data.some(x => (x === null || x === void 0 ? void 0 : x.viewerPermission) === 'ADMIN' || (x === null || x === void 0 ? void 0 : x.viewerPermission) === 'WRITE' || (x === null || x === void 0 ? void 0 : x.viewerPermission) === 'MAINTAIN')) {
            await new Promise(resolve => setTimeout(resolve, 100));
            props.onCreate();
          }
        } catch (err) {
          setState({
            kind: 'error',
            error: err
          });
        }
      }
    };
    addEventListener('storage', listener);
    return () => removeEventListener('storage', listener);
  }, [client, props]);
  const appSlug = useContext(AppSlugContext);
  return /*#__PURE__*/jsxs(Dialog, {
    size: "small",
    isDismissable: true,
    onDismiss: () => {
      props.onDismiss();
    },
    children: [/*#__PURE__*/jsx(Heading, {
      children: "Fork Repo"
    }), state.kind === 'error' ? /*#__PURE__*/jsxs(Fragment, {
      children: [/*#__PURE__*/jsx(Content, {
        children: /*#__PURE__*/jsx(Notice, {
          tone: "critical",
          children: state.error.message
        })
      }), /*#__PURE__*/jsx(ButtonGroup, {
        children: /*#__PURE__*/jsx(Button, {
          onPress: props.onDismiss,
          children: stringFormatter.format('cancel')
        })
      })]
    }) : /*#__PURE__*/jsx(Fragment, {
      children: /*#__PURE__*/jsx(Content, {
        children: /*#__PURE__*/jsxs(Flex, {
          gap: "large",
          direction: "column",
          marginBottom: "large",
          children: [/*#__PURE__*/jsx(Text, {
            children: "You don't have permission to write to this repo so to save your changes, you need to fork the repo."
          }), /*#__PURE__*/jsxs(Text, {
            children: ["To start,", ' ', /*#__PURE__*/jsx(TextLink, {
              href: `https://github.com/${serializeRepoConfig(props.config.storage.repo)}/fork`,
              target: "_blank",
              rel: "noopener noreferrer",
              children: "fork the repo on GitHub"
            }), ". Then, come back to this page and", ' ', /*#__PURE__*/jsx(TextLink, {
              href: `https://github.com/apps/${appSlug === null || appSlug === void 0 ? void 0 : appSlug.value}/installations/new?state=close`,
              target: "_blank",
              rel: "noopener noreferrer",
              children: "install the Keystatic GitHub App on your fork."
            })]
          })]
        })
      })
    })]
  });
}

const HeaderBreadcrumbs = /*#__PURE__*/memo(props => /*#__PURE__*/jsx(Breadcrumbs, {
  flex: true,
  size: "medium",
  minWidth: "alias.singleLineWidth",
  children: props.items.map(item => /*#__PURE__*/jsx(Item, {
    href: item.href,
    children: item.label
  }, item.key))
}));

function PresenceAvatars() {
  const cloudInfo = useCloudInfo();
  const awarenessStates = useAwarenessStates();
  const router = useRouter();
  if (!cloudInfo) return null;
  return /*#__PURE__*/jsx(HStack, {
    children: [...awarenessStates.values()].map(val => {
      if (!val.user || router.href !== `/keystatic/branch/${val.branch}/${val.location}`) {
        return null;
      }
      return /*#__PURE__*/jsx(Avatar, {
        src: val.user.avatarUrl,
        name: val.user.name
      });
    })
  });
}

function useHasChanged(args) {
  const serialize = useCallback(async state => {
    const slug = args.slugField ? getSlugFromState({
      schema: args.schema.fields,
      slugField: args.slugField
    }, state) : undefined;
    const serializedState = serializeProps(state, args.schema, args.slugField, slug, true);
    return {
      slug,
      value: serializedState.value,
      extraFiles: Object.fromEntries(await Promise.all(serializedState.extraFiles.map(async val => [JSON.stringify([val.path, val.parent]), await blobSha(val.contents)])))
    };
  }, [args.schema, args.slugField]);
  const initialFilesForUpdate = useData(useCallback(() => args.initialState === null ? null : serialize(args.initialState), [args.initialState, serialize]));
  const filesForUpdate = useData(useCallback(() => serialize(args.state), [serialize, args.state]));
  const hasChangedState = useMemo(() => {
    if (initialFilesForUpdate.kind === 'loaded' && filesForUpdate.kind === 'loaded') {
      const a = initialFilesForUpdate.data;
      const b = filesForUpdate.data;
      return !isEqual(a, b);
    }
    return 'unknown';
  }, [initialFilesForUpdate, filesForUpdate]);
  const [hasChanged, setHasChanged] = useState(false);
  if (typeof hasChangedState === 'boolean' && hasChangedState !== hasChanged) {
    setHasChanged(hasChangedState);
  }
  return hasChanged;
}

function useYJsValue(schema, type) {
  const yjsInfo = useYjs();
  const thing = useMemo(() => {
    let lastVal = yjsToVal(schema, yjsInfo.awareness, type);
    return {
      getSnapshot: () => lastVal,
      subscribe: cb => {
        const handler = () => {
          lastVal = yjsToVal(schema, yjsInfo.awareness, type);
          cb();
        };
        type.observeDeep(handler);
        return () => {
          type.unobserveDeep(handler);
        };
      }
    };
  }, [schema, type, yjsInfo.awareness]);
  return useSyncExternalStore(thing.subscribe, thing.getSnapshot, thing.getSnapshot);
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null
    };
  }
  static getDerivedStateFromError(err) {
    if (isNotFoundError(err)) {
      throw err;
    }
    return {
      message: String(err)
    };
  }
  render() {
    if (this.state.message) {
      return typeof this.props.fallback === 'function' ? this.props.fallback(this.state.message) : this.props.fallback;
    }
    return this.props.children;
  }
}

const keystaticEntryAttributeSchema = s.type({
  slug: s.optional(s.string()),
  files: s.record(s.string(), s.coerce(s.instance(Uint8Array), s.string(), value => base64UrlDecode(value)))
});
const textDecoder = new TextDecoder();
function parseEntryFromHtml(html, format, schema, slugField) {
  const parsedHtml = new DOMParser().parseFromString(html, 'text/html');
  const pre = parsedHtml.querySelector('pre');
  if (!(pre !== null && pre !== void 0 && pre.dataset.keystaticEntry)) {
    return;
  }
  try {
    var _entryInfo$slug, _entryInfo$slug2;
    const parsed = JSON.parse(pre.dataset.keystaticEntry);
    const entryInfo = keystaticEntryAttributeSchema.create(parsed);
    const files = new Map(Object.entries(entryInfo.files));
    return parseEntry({
      dirpath: (_entryInfo$slug = entryInfo.slug) !== null && _entryInfo$slug !== void 0 ? _entryInfo$slug : 'entry',
      format,
      schema,
      slug: slugField ? {
        field: slugField,
        slug: (_entryInfo$slug2 = entryInfo.slug) !== null && _entryInfo$slug2 !== void 0 ? _entryInfo$slug2 : ''
      } : undefined,
      requireFrontmatter: true
    }, files).initialState;
  } catch {}
}
function parseEntryFromPlaintext(bytes, format, schema, slugInfo) {
  try {
    var _slugInfo$slug;
    const dirpath = (_slugInfo$slug = slugInfo === null || slugInfo === void 0 ? void 0 : slugInfo.slug) !== null && _slugInfo$slug !== void 0 ? _slugInfo$slug : 'entry';
    return parseEntry({
      dirpath,
      format,
      schema,
      slug: slugInfo,
      requireFrontmatter: true
    }, new Map([[getEntryDataFilepath(dirpath, format), bytes]])).initialState;
  } catch {}
}
async function getPastedEntry(format, schema, slugInfo) {
  let clipboardItems;
  try {
    // TODO: maybe explore alternative UI for this with an input
    // and instructing users to paste there so the permission is not needed
    clipboardItems = await navigator.clipboard.read();
  } catch (err) {
    if (err instanceof DOMException && err.name === 'NotAllowedError') {
      toastQueue.critical('Failed to paste because clipboard access was denied', {
        timeout: 5000
      });
      return;
    }
    toastQueue.critical('Failed to read clipboard', {
      timeout: 5000
    });
    return;
  }
  for (const item of clipboardItems) {
    if (item.types.includes('text/html')) {
      const html = await item.getType('text/html');
      const text = await html.text();
      const entry = parseEntryFromHtml(text, format, schema, slugInfo === null || slugInfo === void 0 ? void 0 : slugInfo.field);
      if (entry) {
        return entry;
      }
    }
    if (item.types.includes('text/plain')) {
      const plain = await item.getType('text/plain');
      const text = await plain.arrayBuffer();
      const entry = parseEntryFromPlaintext(new Uint8Array(text), format, schema, slugInfo);
      if (entry) {
        return entry;
      }
    }
  }
  toastQueue.critical('Entry not found in clipboard', {
    timeout: 5000
  });
}
function serializeEntryForClipboard(state, format, schema, slug) {
  var _slug$value;
  const basePath = (_slug$value = slug === null || slug === void 0 ? void 0 : slug.value) !== null && _slug$value !== void 0 ? _slug$value : 'entry';
  const files = serializeEntryToFiles({
    basePath,
    format,
    schema,
    slug,
    state
  });
  const element = document.createElement('pre');
  element.dataset.keystaticEntry = JSON.stringify({
    slug: slug === null || slug === void 0 ? void 0 : slug.value,
    files: Object.fromEntries(files.map(f => [f.path, base64UrlEncode(f.contents)]))
  });
  const mainEntryFilepath = getEntryDataFilepath(basePath, format);
  const mainFile = files.find(f => f.path === mainEntryFilepath);
  if (!mainFile) {
    throw new Error('No main entry file found');
  }
  const plain = textDecoder.decode(mainFile.contents);
  element.textContent = plain;
  return {
    html: element.outerHTML,
    plain
  };
}
function copyEntryToClipboard(state, format, schema, slug) {
  const out = serializeEntryForClipboard(state, format, schema, slug);
  navigator.clipboard.write([new ClipboardItem({
    'text/plain': new Blob([out.plain], {
      type: 'text/plain'
    }),
    'text/html': new Blob([out.html], {
      type: 'text/html'
    })
  })]);
}

const storedValSchema$2 = s.type({
  version: s.literal(1),
  savedAt: s.date(),
  slug: s.string(),
  beforeTreeKey: s.string(),
  files: s.map(s.string(), s.instance(Uint8Array))
});
function ItemPageInner(props) {
  var _getPathPrefix, _getPathPrefix2;
  const {
    collection,
    config,
    itemSlug,
    updateResult,
    onUpdate: parentOnUpdate
  } = props;
  const {
    collectionConfig,
    schema
  } = useCollection(collection);
  const router = useRouter();
  const baseCommit = useBaseCommit();
  const currentBasePath = getCollectionItemPath(config, collection, itemSlug);
  const formatInfo = getCollectionFormat(config, collection);
  const currentBranch = useCurrentBranch();
  const repoInfo = useRepoInfo();
  const [forceValidation, setForceValidation] = useState(false);
  const previewHref = collectionConfig.previewUrl ? collectionConfig.previewUrl.replace('{slug}', props.itemSlug).replace('{branch}', currentBranch) : undefined;
  const {
    push,
    replace
  } = router;
  const slugInfo = useSlugFieldInfo(collection, itemSlug);
  const [deleteResult, deleteItem, resetDeleteItem] = useDeleteItem({
    initialFiles: props.initialFiles,
    storage: config.storage,
    basePath: currentBasePath
  });
  const onDelete = useEventCallback(async () => {
    // TODO: delete multiplayer draft
    if (await deleteItem()) {
      push(`${props.basePath}/collection/${encodeURIComponent(collection)}`);
    }
  });
  const onDuplicate = () => {
    push(`${props.basePath}/collection/${encodeURIComponent(collection)}/create?duplicate=${itemSlug}`);
  };
  const isSavingDisabled = updateResult.kind === 'loading' || !props.hasChanged;
  const onUpdate = useEventCallback(async () => {
    if (isSavingDisabled) return false;
    if (!clientSideValidateProp(schema, props.state, slugInfo)) {
      setForceValidation(true);
      return false;
    }
    const slug = getSlugFromState(collectionConfig, props.state);
    const hasUpdated = await parentOnUpdate();
    if (hasUpdated && slug !== itemSlug) {
      replace(`${props.basePath}/collection/${encodeURIComponent(collection)}/item/${encodeURIComponent(slug)}`);
    }
    return hasUpdated;
  });
  const onCopy = useEventCallback(() => {
    copyEntryToClipboard(props.state, formatInfo, collectionConfig.schema, {
      field: collectionConfig.slugField,
      value: getSlugFromState(collectionConfig, props.state)
    });
  });
  const onPaste = useEventCallback(async () => {
    const entry = await getPastedEntry(formatInfo, collectionConfig.schema, {
      field: collectionConfig.slugField,
      slug: getSlugFromState(collectionConfig, props.state)
    });
    if (entry) {
      setValueToPreviewProps(entry, props.previewProps);
      toastQueue.positive('Entry pasted', {
        shouldCloseOnAction: true,
        actionLabel: 'Undo',
        onAction: () => {
          setValueToPreviewProps(props.state, props.previewProps);
        }
      });
    }
  });
  const viewHref = config.storage.kind !== 'local' && repoInfo ? `${getRepoUrl(repoInfo)}${formatInfo.dataLocation === 'index' ? `/tree/${currentBranch}/${(_getPathPrefix = getPathPrefix(config.storage)) !== null && _getPathPrefix !== void 0 ? _getPathPrefix : ''}${currentBasePath}` : `/blob/${currentBranch}/${(_getPathPrefix2 = getPathPrefix(config.storage)) !== null && _getPathPrefix2 !== void 0 ? _getPathPrefix2 : ''}${currentBasePath}${getDataFileExtension(formatInfo)}`}` : undefined;
  const formID = 'item-edit-form';

  // allow shortcuts "cmd+s" and "ctrl+s" to save
  useEffect(() => {
    const listener = event => {
      if (updateResult.kind === 'loading') {
        return;
      }
      if (isHotkey('mod+s', event)) {
        event.preventDefault();
        onUpdate();
      }
    };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [updateResult.kind, onUpdate]);
  return /*#__PURE__*/jsx(Fragment, {
    children: /*#__PURE__*/jsxs(ItemPageShell, {
      headerActions: /*#__PURE__*/jsx(HeaderActions, {
        formID: formID,
        isLoading: updateResult.kind === 'loading',
        hasChanged: props.hasChanged,
        onDelete: onDelete,
        onDuplicate: onDuplicate,
        onCopy: onCopy,
        onPaste: onPaste,
        onReset: props.onReset,
        viewHref: viewHref,
        previewHref: previewHref
      }),
      ...props,
      children: [updateResult.kind === 'error' && /*#__PURE__*/jsx(Notice, {
        tone: "critical",
        children: updateResult.error.message
      }), deleteResult.kind === 'error' && /*#__PURE__*/jsx(Notice, {
        tone: "critical",
        children: deleteResult.error.message
      }), /*#__PURE__*/jsx(Box, {
        id: formID,
        height: "100%",
        minHeight: 0,
        minWidth: 0,
        elementType: "form",
        onSubmit: event => {
          if (event.target !== event.currentTarget) return;
          event.preventDefault();
          onUpdate();
        },
        children: /*#__PURE__*/jsx(FormForEntry, {
          previewProps: props.previewProps,
          forceValidation: forceValidation,
          entryLayout: collectionConfig.entryLayout,
          formatInfo: formatInfo,
          slugField: slugInfo,
          previewUrl: previewHref
        })
      }), /*#__PURE__*/jsx(DialogContainer
      // ideally this would be a popover on desktop but using a DialogTrigger wouldn't work since
      // this doesn't open on click but after doing a network request and it failing and manually wiring about a popover and modal would be a pain
      , {
        onDismiss: props.onResetUpdateItem,
        children: updateResult.kind === 'needs-new-branch' && /*#__PURE__*/jsx(CreateBranchDuringUpdateDialog, {
          branchOid: baseCommit,
          onCreate: async newBranch => {
            const itemBasePath = `/keystatic/branch/${encodeURIComponent(newBranch)}/collection/${encodeURIComponent(collection)}/item/`;
            router.push(itemBasePath + encodeURIComponent(itemSlug));
            const slug = getSlugFromState(collectionConfig, props.state);
            const hasUpdated = await parentOnUpdate({
              branch: newBranch,
              sha: baseCommit
            });
            if (hasUpdated && slug !== itemSlug) {
              router.replace(itemBasePath + encodeURIComponent(slug));
            }
          },
          reason: updateResult.reason,
          onDismiss: props.onResetUpdateItem
        })
      }), /*#__PURE__*/jsx(DialogContainer
      // ideally this would be a popover on desktop but using a DialogTrigger
      // wouldn't work since this doesn't open on click but after doing a
      // network request and it failing and manually wiring about a popover
      // and modal would be a pain
      , {
        onDismiss: props.onResetUpdateItem,
        children: updateResult.kind === 'needs-fork' && isGitHubConfig(props.config) && /*#__PURE__*/jsx(ForkRepoDialog, {
          onCreate: async () => {
            const slug = getSlugFromState(collectionConfig, props.state);
            const hasUpdated = await props.onUpdate();
            if (hasUpdated && slug !== itemSlug) {
              router.replace(`${props.basePath}/collection/${encodeURIComponent(collection)}/item/${encodeURIComponent(slug)}`);
            }
          },
          onDismiss: props.onResetUpdateItem,
          config: props.config
        })
      }), /*#__PURE__*/jsx(DialogContainer
      // ideally this would be a popover on desktop but using a DialogTrigger
      // wouldn't work since this doesn't open on click but after doing a
      // network request and it failing and manually wiring about a popover
      // and modal would be a pain
      , {
        onDismiss: resetDeleteItem,
        children: deleteResult.kind === 'needs-fork' && isGitHubConfig(props.config) && /*#__PURE__*/jsx(ForkRepoDialog, {
          onCreate: async () => {
            await deleteItem();
            router.push(`${props.basePath}/collection/${encodeURIComponent(collection)}`);
          },
          onDismiss: resetDeleteItem,
          config: props.config
        })
      })]
    })
  });
}
function LocalItemPage(props) {
  var _draft$state;
  const {
    collection,
    config,
    initialFiles,
    initialState,
    localTreeKey,
    draft
  } = props;
  const {
    collectionConfig,
    schema
  } = useCollection(collection);
  const [{
    state,
    localTreeKey: localTreeKeyInState
  }, setState] = useState({
    state: (_draft$state = draft === null || draft === void 0 ? void 0 : draft.state) !== null && _draft$state !== void 0 ? _draft$state : initialState,
    localTreeKey
  });
  useShowRestoredDraftMessage(draft, state, localTreeKey);
  if (localTreeKeyInState !== localTreeKey) {
    setState({
      state: initialState,
      localTreeKey
    });
  }
  const onPreviewPropsChange = useCallback(stateUpdater => {
    setState(state => ({
      localTreeKey: state.localTreeKey,
      state: stateUpdater(state.state)
    }));
  }, []);
  const previewProps = usePreviewProps(schema, onPreviewPropsChange, state);
  const hasChanged = useHasChanged({
    initialState,
    schema,
    state,
    slugField: collectionConfig.slugField
  });
  const slug = getSlugFromState(collectionConfig, state);
  const formatInfo = getCollectionFormat(config, collection);
  const futureBasePath = getCollectionItemPath(config, collection, slug);
  const [updateResult, _update, resetUpdateItem] = useUpsertItem({
    state,
    initialFiles,
    config,
    schema: collectionConfig.schema,
    basePath: futureBasePath,
    format: formatInfo,
    currentLocalTreeKey: localTreeKey,
    slug: {
      field: collectionConfig.slugField,
      value: slug
    }
  });
  useEffect(() => {
    const key = ['collection', collection, props.itemSlug];
    if (hasChanged) {
      const serialized = serializeEntryToFiles({
        basePath: futureBasePath,
        format: getCollectionFormat(config, collection),
        schema: collectionConfig.schema,
        slug: {
          field: collectionConfig.slugField,
          value: slug
        },
        state
      });
      const files = new Map(serialized.map(x => [x.path, x.contents]));
      const data = {
        beforeTreeKey: localTreeKey,
        slug,
        files,
        savedAt: new Date(),
        version: 1
      };
      setDraft(key, data);
    } else {
      delDraft(key);
    }
  }, [collection, collectionConfig, config, futureBasePath, localTreeKey, props.itemSlug, slug, state, hasChanged]);
  const update = useEventCallback(_update);
  const onReset = () => {
    setState({
      state: initialState,
      localTreeKey
    });
  };
  return /*#__PURE__*/jsx(ItemPageInner, {
    ...props,
    onUpdate: update,
    onReset: onReset,
    updateResult: updateResult,
    onResetUpdateItem: resetUpdateItem,
    previewProps: previewProps,
    state: state,
    hasChanged: hasChanged
  });
}
function CollabItemPage(props) {
  const {
    collection,
    config,
    initialFiles,
    initialState,
    localTreeKey
  } = props;
  const {
    collectionConfig,
    schema
  } = useCollection(collection);
  const state = useYJsValue(schema, props.map);
  const previewProps = usePreviewPropsFromY(schema, props.map, state);
  const slug = getSlugFromState(collectionConfig, state);
  const formatInfo = getCollectionFormat(props.config, props.collection);
  const hasChanged = useHasChanged({
    initialState,
    schema,
    state,
    slugField: collectionConfig.slugField
  });
  const futureBasePath = getCollectionItemPath(config, collection, slug);
  const [updateResult, _update, resetUpdateItem] = useUpsertItem({
    state,
    initialFiles,
    config,
    schema: collectionConfig.schema,
    basePath: futureBasePath,
    format: formatInfo,
    currentLocalTreeKey: localTreeKey,
    slug: {
      field: collectionConfig.slugField,
      value: slug
    }
  });
  const update = useEventCallback(_update);
  const onReset = () => {
    var _props$map$doc;
    (_props$map$doc = props.map.doc) === null || _props$map$doc === void 0 || _props$map$doc.transact(() => {
      for (const [key, value] of Object.entries(collectionConfig.schema)) {
        const val = getYjsValFromParsedValue(value, props.initialState[key]);
        props.map.set(key, val);
      }
    });
  };
  return /*#__PURE__*/jsx(ItemPageInner, {
    ...props,
    onUpdate: update,
    onReset: onReset,
    updateResult: updateResult,
    onResetUpdateItem: resetUpdateItem,
    previewProps: previewProps,
    state: state,
    hasChanged: hasChanged
  });
}
function HeaderActions(props) {
  let {
    formID,
    hasChanged,
    isLoading,
    onDelete,
    onDuplicate,
    onReset,
    onCopy,
    onPaste,
    previewHref,
    viewHref
  } = props;
  const isBelowDesktop = useMediaQuery(breakpointQueries.below.desktop);
  const stringFormatter = useLocalizedStringFormatter(strings);
  const [deleteAlertIsOpen, setDeleteAlertOpen] = useState(false);
  const [duplicateAlertIsOpen, setDuplicateAlertOpen] = useState(false);
  const menuActions = useMemo(() => {
    let items = [{
      key: 'reset',
      label: 'Reset changes',
      // TODO: l10n
      icon: historyIcon
    }, {
      key: 'delete',
      label: 'Delete entry…',
      // TODO: l10n
      icon: trash2Icon
    }, {
      key: 'copy',
      label: 'Copy entry',
      // TODO: l10n
      icon: clipboardCopyIcon
    }, {
      key: 'paste',
      label: 'Paste entry',
      // TODO: l10n
      icon: clipboardPasteIcon
    }, {
      key: 'duplicate',
      label: 'Duplicate entry…',
      // TODO: l10n
      icon: copyPlusIcon
    }];
    if (previewHref) {
      items.push({
        key: 'preview',
        label: 'Preview',
        icon: externalLinkIcon,
        href: previewHref,
        target: '_blank',
        rel: 'noopener noreferrer'
      });
    }
    if (viewHref) {
      items.push({
        key: 'view',
        label: 'View on GitHub',
        icon: githubIcon,
        href: viewHref,
        target: '_blank',
        rel: 'noopener noreferrer'
      });
    }
    return items;
  }, [previewHref, viewHref]);
  const indicatorElement = (() => {
    if (isLoading) {
      return /*#__PURE__*/jsx(ProgressCircle, {
        "aria-label": "Saving changes",
        isIndeterminate: true,
        size: "small",
        alignSelf: "center"
      });
    }
    if (hasChanged) {
      return isBelowDesktop ? /*#__PURE__*/jsx(Box, {
        backgroundColor: "pendingEmphasis",
        height: "scale.75",
        width: "scale.75",
        borderRadius: "full",
        children: /*#__PURE__*/jsx(Text, {
          visuallyHidden: true,
          children: "Unsaved"
        })
      }) : /*#__PURE__*/jsx(Badge, {
        tone: "pending",
        children: "Unsaved"
      });
    }
    return null;
  })();
  return /*#__PURE__*/jsxs(Flex, {
    alignItems: "center",
    gap: {
      mobile: 'small',
      tablet: 'regular'
    },
    children: [/*#__PURE__*/jsx(PresenceAvatars, {}), indicatorElement, /*#__PURE__*/jsx(ActionGroup, {
      buttonLabelBehavior: "hide",
      overflowMode: "collapse",
      prominence: "low",
      density: "compact",
      maxWidth: isBelowDesktop ? 'element.regular' : undefined // force switch to action menu on small devices
      ,
      items: menuActions,
      disabledKeys: hasChanged ? [] : ['reset'],
      onAction: key => {
        switch (key) {
          case 'reset':
            onReset();
            break;
          case 'delete':
            setDeleteAlertOpen(true);
            break;
          case 'copy':
            onCopy();
            break;
          case 'paste':
            onPaste();
            break;
          case 'duplicate':
            if (hasChanged) {
              setDuplicateAlertOpen(true);
            } else {
              onDuplicate();
            }
            break;
        }
      },
      children: item => /*#__PURE__*/jsxs(Item$1, {
        textValue: item.label,
        href: item.href,
        target: item.target,
        rel: item.rel,
        children: [/*#__PURE__*/jsx(Icon, {
          src: item.icon
        }), /*#__PURE__*/jsx(Text, {
          children: item.label
        })]
      }, item.key)
    }), /*#__PURE__*/jsx(Button, {
      form: formID,
      isDisabled: isLoading,
      prominence: "high",
      type: "submit",
      children: stringFormatter.format('save')
    }), /*#__PURE__*/jsx(DialogContainer, {
      onDismiss: () => setDeleteAlertOpen(false),
      children: deleteAlertIsOpen && /*#__PURE__*/jsx(AlertDialog, {
        title: "Delete entry",
        tone: "critical",
        cancelLabel: "Cancel",
        primaryActionLabel: "Yes, delete",
        autoFocusButton: "cancel",
        onPrimaryAction: onDelete,
        children: "Are you sure? This action cannot be undone."
      })
    }), /*#__PURE__*/jsx(DialogContainer, {
      onDismiss: () => setDuplicateAlertOpen(false),
      children: duplicateAlertIsOpen && /*#__PURE__*/jsx(AlertDialog, {
        title: "Save and duplicate entry",
        tone: "neutral",
        cancelLabel: "Cancel",
        primaryActionLabel: "Save and duplicate",
        autoFocusButton: "primary",
        onPrimaryAction: onDuplicate,
        children: "You have unsaved changes. Save this entry to duplicate it."
      })
    })]
  });
}
function CreateBranchDuringUpdateDialog(props) {
  var _data$createRef;
  const stringFormatter = useLocalizedStringFormatter(strings);
  const repoInfo = useRepoInfo();
  const [branchName, setBranchName] = useState('');
  const [{
    error,
    fetching,
    data
  }, createBranch] = useCreateBranchMutation();
  const isLoading = fetching || !!(data !== null && data !== void 0 && (_data$createRef = data.createRef) !== null && _data$createRef !== void 0 && _data$createRef.__typename);
  const config = useConfig();
  const branchPrefix = getBranchPrefix(config);
  const propsForBranchPrefix = branchPrefix ? {
    UNSAFE_className: css({
      '& input': {
        paddingInlineStart: tokenSchema.size.space.xsmall
      }
    }),
    startElement: /*#__PURE__*/jsx(Flex, {
      alignItems: "center",
      paddingStart: "regular",
      justifyContent: "center",
      pointerEvents: "none",
      children: /*#__PURE__*/jsx(Text, {
        color: "neutralSecondary",
        children: branchPrefix
      })
    })
  } : {};
  return /*#__PURE__*/jsx(Dialog, {
    children: /*#__PURE__*/jsxs("form", {
      style: {
        display: 'contents'
      },
      onSubmit: async event => {
        var _result$data;
        if (event.target !== event.currentTarget) return;
        event.preventDefault();
        const fullBranchName = (branchPrefix !== null && branchPrefix !== void 0 ? branchPrefix : '') + branchName;
        const name = `refs/heads/${fullBranchName}`;
        const result = await createBranch({
          input: {
            name,
            oid: props.branchOid,
            repositoryId: repoInfo.id
          }
        });
        if ((_result$data = result.data) !== null && _result$data !== void 0 && (_result$data = _result$data.createRef) !== null && _result$data !== void 0 && _result$data.__typename) {
          props.onCreate(fullBranchName);
        }
      },
      children: [/*#__PURE__*/jsx(Heading, {
        children: stringFormatter.format('newBranch')
      }), /*#__PURE__*/jsx(Content, {
        children: /*#__PURE__*/jsx(Flex, {
          gap: "large",
          direction: "column",
          children: /*#__PURE__*/jsx(TextField, {
            value: branchName,
            onChange: setBranchName,
            label: "Branch name",
            description: props.reason,
            autoFocus: true,
            errorMessage: prettyErrorForCreateBranchMutation(error),
            ...propsForBranchPrefix
          })
        })
      }), /*#__PURE__*/jsxs(ButtonGroup, {
        children: [isLoading && /*#__PURE__*/jsx(ProgressCircle, {
          isIndeterminate: true,
          size: "small",
          "aria-label": "Creating Branch"
        }), /*#__PURE__*/jsx(Button, {
          isDisabled: isLoading,
          onPress: props.onDismiss,
          children: stringFormatter.format('cancel')
        }), /*#__PURE__*/jsx(Button, {
          isDisabled: isLoading,
          prominence: "high",
          type: "submit",
          children: "Create branch and save"
        })]
      })]
    })
  });
}
function ItemPageOuterWrapper(props) {
  var _props$config$collect;
  const collectionConfig = (_props$config$collect = props.config.collections) === null || _props$config$collect === void 0 ? void 0 : _props$config$collect[props.collection];
  if (!collectionConfig) notFound();
  const format = useMemo(() => getCollectionFormat(props.config, props.collection), [props.config, props.collection]);
  const slugInfo = useMemo(() => {
    return {
      slug: props.itemSlug,
      field: collectionConfig.slugField
    };
  }, [collectionConfig.slugField, props.itemSlug]);
  const draftData = useData(useCallback(async () => {
    try {
      const raw = await getDraft(['collection', props.collection, props.itemSlug]);
      if (!raw) throw new Error('No draft found');
      const stored = storedValSchema$2.create(raw);
      const parsed = parseEntry({
        dirpath: getCollectionItemPath(props.config, props.collection, stored.slug),
        format: getCollectionFormat(props.config, props.collection),
        schema: collectionConfig.schema,
        slug: {
          field: collectionConfig.slugField,
          slug: stored.slug
        }
      }, stored.files);
      return {
        state: parsed.initialState,
        savedAt: stored.savedAt,
        treeKey: stored.beforeTreeKey
      };
    } catch {}
  }, [collectionConfig, props.collection, props.config, props.itemSlug]));
  const itemData = useItemData({
    config: props.config,
    dirpath: getCollectionItemPath(props.config, props.collection, props.itemSlug),
    schema: collectionConfig.schema,
    format,
    slug: slugInfo
  });
  const currentBranch = useCurrentBranch();
  const key = `${currentBranch}/${props.collection}/item/${props.itemSlug}`;
  const yjsInfo = useYjsIfAvailable();
  const isItemDataLoading = itemData.kind !== 'loaded';
  const isItemNotFound = !isItemDataLoading && itemData.data === 'not-found';
  const mapData = useData(useCallback(() => {
    if (!yjsInfo) return;
    if (yjsInfo === 'loading') return LOADING;
    if (isItemDataLoading) return LOADING;
    if (isItemNotFound) return;
    return (async () => {
      await yjsInfo.doc.whenSynced;
      let doc = yjsInfo.data.get(key);
      if (doc instanceof Y.Doc) {
        const promise = doc.whenLoaded;
        doc.load();
        await promise;
      } else {
        doc = new Y.Doc();
        yjsInfo.data.set(key, doc);
      }
      const data = doc.getMap('data');
      return data;
    })();
  }, [isItemDataLoading, isItemNotFound, key, yjsInfo]));
  return /*#__PURE__*/jsx(NotFoundBoundary, {
    fallback: /*#__PURE__*/jsx(ItemPageShell, {
      ...props,
      children: /*#__PURE__*/jsx(PageBody, {
        children: /*#__PURE__*/jsx(Notice, {
          tone: "caution",
          children: "Entry not found."
        })
      })
    }),
    children: /*#__PURE__*/jsx(ErrorBoundary, {
      fallback: message => /*#__PURE__*/jsx(ItemPageShell, {
        ...props,
        children: /*#__PURE__*/jsx(PageBody, {
          children: /*#__PURE__*/jsx(Notice, {
            tone: "critical",
            children: message
          })
        })
      }),
      children: /*#__PURE__*/jsx(Suspense, {
        fallback: /*#__PURE__*/jsx(ItemPageShell, {
          ...props,
          children: /*#__PURE__*/jsx(Flex, {
            alignItems: "center",
            justifyContent: "center",
            minHeight: "scale.3000",
            children: /*#__PURE__*/jsx(ProgressCircle, {
              "aria-label": "Loading Item",
              isIndeterminate: true,
              size: "large"
            })
          })
        }),
        children: /*#__PURE__*/jsx(ItemPageWrapper, {
          mapData: mapData,
          draftData: draftData,
          itemData: itemData,
          ...props
        })
      })
    })
  });
}
function ItemPageWrapper(props) {
  const collectionConfig = getCollection(props.config, props.collection);
  const deferredDraftData = useDeferredValue(props.draftData);
  const itemData = suspendOnData(props.itemData);
  if (itemData === 'not-found') notFound();
  const mapData = suspendOnData(props.mapData);
  useMemo(() => {
    var _mapData$doc;
    if (!mapData || mapData.size) {
      return;
    }
    const {
      initialState
    } = itemData;
    (_mapData$doc = mapData.doc) === null || _mapData$doc === void 0 || _mapData$doc.transact(() => {
      for (const [key, value] of Object.entries(collectionConfig.schema)) {
        const val = getYjsValFromParsedValue(value, initialState[key]);
        mapData.set(key, val);
      }
    });
  }, [collectionConfig.schema, itemData, mapData]);
  const loadedDraft = suspendOnData(deferredDraftData);
  if (mapData) {
    return /*#__PURE__*/jsx(CollabItemPage, {
      collection: props.collection,
      basePath: props.basePath,
      config: props.config,
      itemSlug: props.itemSlug,
      initialState: itemData.initialState,
      initialFiles: itemData.initialFiles,
      localTreeKey: itemData.localTreeKey,
      map: mapData
    });
  }
  return /*#__PURE__*/jsx(LocalItemPage, {
    collection: props.collection,
    basePath: props.basePath,
    config: props.config,
    itemSlug: props.itemSlug,
    initialState: itemData.initialState,
    initialFiles: itemData.initialFiles,
    draft: loadedDraft,
    localTreeKey: itemData.localTreeKey
  });
}
function ItemPageShell(props) {
  const collectionConfig = getCollection(props.config, props.collection);
  const collectionHref = `${props.basePath}/collection/${props.collection}`;
  const breadcrumbItems = [{
    key: 'collection',
    label: collectionConfig.label,
    href: collectionHref
  }, {
    key: 'item',
    label: props.itemSlug
  }];
  return /*#__PURE__*/jsxs(PageRoot, {
    containerWidth: containerWidthForEntryLayout(collectionConfig),
    children: [/*#__PURE__*/jsxs(PageHeader, {
      children: [/*#__PURE__*/jsx(HeaderBreadcrumbs, {
        items: breadcrumbItems
      }), props.headerActions]
    }), props.children]
  });
}

function useDuplicateSlug(duplicateInitalState, collectionConfig) {
  return useMemo(() => {
    if (duplicateInitalState) {
      // we'll make a best effort to add something to the slug after duplicated so it's different
      // but if it fails a user can change it before creating
      // (e.g. potentially it's not just a text field so appending -copy might not work)
      const {
        slugField
      } = collectionConfig;
      const defaultSlugVal = duplicateInitalState[collectionConfig.slugField];
      const slugFieldSchema = collectionConfig.schema[collectionConfig.slugField];
      if (slugFieldSchema.kind === 'form' && slugFieldSchema.formKind === 'slug') {
        try {
          const serialized = slugFieldSchema.serializeWithSlug(defaultSlugVal);
          const slugFieldValue = slugFieldSchema.parse(serialized.value, {
            slug: serialized.slug ? `${serialized.slug}-copy` : ''
          });
          return {
            ...duplicateInitalState,
            [slugField]: slugFieldValue
          };
        } catch {}
      }
      return {
        ...duplicateInitalState,
        [slugField]: defaultSlugVal
      };
    }
  }, [collectionConfig, duplicateInitalState]);
}

function CreateItemWrapper(props) {
  var _props$config$collect;
  const router = useRouter();
  const duplicateSlug = useMemo(() => {
    const url = new URL(router.href, 'http://localhost');
    return url.searchParams.get('duplicate');
  }, [router.href]);
  const collectionConfig = (_props$config$collect = props.config.collections) === null || _props$config$collect === void 0 ? void 0 : _props$config$collect[props.collection];
  if (!collectionConfig) notFound();
  const format = useMemo(() => getCollectionFormat(props.config, props.collection), [props.config, props.collection]);
  const draftData = useData(useCallback(async () => {
    const raw = await getDraft(['collection-create', props.collection, ...(duplicateSlug ? [duplicateSlug] : [])]);
    if (!raw) throw new Error('No draft found');
    const stored = storedValSchema$1.create(raw);
    const parsed = parseEntry({
      dirpath: getCollectionItemPath(props.config, props.collection, stored.slug),
      format,
      schema: collectionConfig.schema,
      slug: {
        field: collectionConfig.slugField,
        slug: stored.slug
      }
    }, stored.files);
    return {
      state: parsed.initialState,
      savedAt: stored.savedAt
    };
  }, [collectionConfig, duplicateSlug, format, props.collection, props.config]));
  const slug = useMemo(() => {
    if (duplicateSlug) {
      return {
        field: collectionConfig.slugField,
        slug: duplicateSlug
      };
    }
    if (collectionConfig.template) {
      return {
        field: collectionConfig.slugField,
        slug: ''
      };
    }
  }, [duplicateSlug, collectionConfig]);
  const isFromTemplate = !!duplicateSlug || !!collectionConfig.template;
  const itemData = useItemData({
    config: props.config,
    dirpath: collectionConfig.template && !duplicateSlug ? collectionConfig.template : getCollectionItemPath(props.config, props.collection, duplicateSlug !== null && duplicateSlug !== void 0 ? duplicateSlug : ''),
    schema: collectionConfig.schema,
    format,
    slug
  });
  const duplicateInitalState = isFromTemplate && itemData.kind === 'loaded' && itemData.data !== 'not-found' ? itemData.data.initialState : undefined;
  const duplicateInitalStateWithUpdatedSlug = useDuplicateSlug(duplicateInitalState, collectionConfig);
  const currentBranch = useCurrentBranch();
  const yjsInfo = useYjsIfAvailable();
  const key = `${currentBranch}/${props.collection}/create${duplicateSlug !== null && duplicateSlug !== void 0 && duplicateSlug.length ? `?duplicate=${duplicateSlug}` : ''}`;
  const mapData = useData(useCallback(async () => {
    if (!yjsInfo) return;
    if (yjsInfo === 'loading') return LOADING;
    await yjsInfo.doc.whenSynced;
    if (isFromTemplate && !duplicateInitalState) return LOADING;
    let doc = yjsInfo.data.get(key);
    if (doc instanceof Y.Doc) {
      const promise = doc.whenLoaded;
      doc.load();
      await promise;
    } else {
      doc = new Y.Doc();
      yjsInfo.data.set(key, doc);
    }
    const data = doc.getMap('data');
    if (!data.size) {
      doc.transact(() => {
        for (const [key, value] of Object.entries(collectionConfig.schema)) {
          var _duplicateInitalState;
          const val = getYjsValFromParsedValue(value, (_duplicateInitalState = duplicateInitalState === null || duplicateInitalState === void 0 ? void 0 : duplicateInitalState[key]) !== null && _duplicateInitalState !== void 0 ? _duplicateInitalState : getInitialPropsValue(value));
          data.set(key, val);
        }
      });
    }
    return data;
  }, [collectionConfig, duplicateInitalState, isFromTemplate, key, yjsInfo]));
  if (isFromTemplate && itemData.kind === 'error') {
    return /*#__PURE__*/jsx(PageBody, {
      children: /*#__PURE__*/jsx(Notice, {
        tone: "critical",
        children: itemData.error.message
      })
    });
  }
  if (mapData.kind === 'error') {
    console.log(mapData.error);
    return /*#__PURE__*/jsx(PageBody, {
      children: /*#__PURE__*/jsx(Notice, {
        tone: "critical",
        children: mapData.error.message
      })
    });
  }
  if (isFromTemplate && itemData.kind === 'loading' || draftData.kind === 'loading' || mapData.kind === 'loading') {
    return /*#__PURE__*/jsx(Flex, {
      alignItems: "center",
      justifyContent: "center",
      minHeight: "scale.3000",
      children: /*#__PURE__*/jsx(ProgressCircle, {
        "aria-label": "Loading Item",
        isIndeterminate: true,
        size: "large"
      })
    });
  }
  if (isFromTemplate && itemData.kind === 'loaded' && itemData.data === 'not-found') {
    return /*#__PURE__*/jsx(PageBody, {
      children: /*#__PURE__*/jsx(Notice, {
        tone: "caution",
        children: "Entry not found."
      })
    });
  }
  if (!mapData.data) {
    return /*#__PURE__*/jsx(CreateItemLocal, {
      collection: props.collection,
      config: props.config,
      basePath: props.basePath,
      draft: draftData.kind === 'loaded' ? draftData.data : undefined,
      duplicateSlug: duplicateSlug,
      initialState: duplicateInitalStateWithUpdatedSlug
    });
  }
  return /*#__PURE__*/jsx(CreateItemCollab, {
    collection: props.collection,
    config: props.config,
    basePath: props.basePath,
    duplicateSlug: duplicateSlug,
    initialState: duplicateInitalStateWithUpdatedSlug,
    map: mapData.data
  });
}
const storedValSchema$1 = s.type({
  version: s.literal(1),
  savedAt: s.date(),
  slug: s.string(),
  files: s.map(s.string(), s.instance(Uint8Array))
});
function CreateItemLocal(props) {
  var _props$draft$state, _props$draft;
  const {
    collectionConfig,
    schema
  } = useCollection(props.collection);
  const initialState = useMemo(() => {
    var _props$initialState;
    return (_props$initialState = props.initialState) !== null && _props$initialState !== void 0 ? _props$initialState : getInitialPropsValue(schema);
  }, [props.initialState, schema]);
  const [state, setState] = useState((_props$draft$state = (_props$draft = props.draft) === null || _props$draft === void 0 ? void 0 : _props$draft.state) !== null && _props$draft$state !== void 0 ? _props$draft$state : initialState);
  const previewProps = usePreviewProps(schema, setState, state);
  useShowRestoredDraftMessage(props.draft, state, undefined);
  const slug = getSlugFromState(collectionConfig, state);
  const formatInfo = getCollectionFormat(props.config, props.collection);
  const basePath = getCollectionItemPath(props.config, props.collection, slug);
  const [createResult, _createItem, resetCreateItemState] = useUpsertItem({
    state,
    basePath,
    initialFiles: undefined,
    config: props.config,
    schema: collectionConfig.schema,
    format: formatInfo,
    currentLocalTreeKey: undefined,
    slug: {
      field: collectionConfig.slugField,
      value: slug
    }
  });
  const createItem = useEventCallback(_createItem);
  const hasChanged = useHasChanged({
    initialState,
    schema,
    state,
    slugField: collectionConfig.slugField
  });
  const hasCreated = createResult.kind === 'updated' || createResult.kind === 'loading';
  useEffect(() => {
    const key = ['collection-create', props.collection, ...(props.duplicateSlug ? [props.duplicateSlug] : [])];
    if (hasChanged && !hasCreated) {
      const serialized = serializeEntryToFiles({
        basePath,
        format: formatInfo,
        schema: collectionConfig.schema,
        slug: {
          field: collectionConfig.slugField,
          value: slug
        },
        state
      });
      const files = new Map(serialized.map(x => [x.path, x.contents]));
      const data = {
        slug,
        files,
        savedAt: new Date(),
        version: 1
      };
      setDraft(key, data);
    } else {
      delDraft(key);
    }
  }, [collectionConfig, slug, state, hasChanged, props.duplicateSlug, props.collection, basePath, formatInfo, hasCreated]);
  return /*#__PURE__*/jsx(CreateItemInner, {
    basePath: props.basePath,
    collection: props.collection,
    createResult: createResult,
    createItem: createItem,
    resetCreateItemState: resetCreateItemState,
    state: state,
    slug: slug,
    previewProps: previewProps,
    onReset: () => {
      setState(initialState);
    }
  });
}
function CreateItemCollab(props) {
  const {
    collectionConfig,
    schema
  } = useCollection(props.collection);
  const state = useYJsValue(schema, props.map);
  const previewProps = usePreviewPropsFromY(schema, props.map, state);
  const slug = getSlugFromState(collectionConfig, state);
  const formatInfo = getCollectionFormat(props.config, props.collection);
  const basePath = getCollectionItemPath(props.config, props.collection, slug);
  const [createResult, _createItem, resetCreateItemState] = useUpsertItem({
    state,
    basePath,
    initialFiles: undefined,
    config: props.config,
    schema: collectionConfig.schema,
    format: formatInfo,
    currentLocalTreeKey: undefined,
    slug: {
      field: collectionConfig.slugField,
      value: slug
    }
  });
  const createItem = useEventCallback(_createItem);
  return /*#__PURE__*/jsx(CreateItemInner, {
    basePath: props.basePath,
    collection: props.collection,
    createResult: createResult,
    createItem: createItem,
    resetCreateItemState: resetCreateItemState,
    state: state,
    slug: slug,
    previewProps: previewProps,
    onReset: () => {
      var _props$map$doc;
      (_props$map$doc = props.map.doc) === null || _props$map$doc === void 0 || _props$map$doc.transact(() => {
        for (const [key, value] of Object.entries(collectionConfig.schema)) {
          var _props$initialState$k, _props$initialState2;
          const val = getYjsValFromParsedValue(value, (_props$initialState$k = (_props$initialState2 = props.initialState) === null || _props$initialState2 === void 0 ? void 0 : _props$initialState2[key]) !== null && _props$initialState$k !== void 0 ? _props$initialState$k : getInitialPropsValue(value));
          props.map.set(key, val);
        }
      });
    }
  });
}
function CreateItemInner(props) {
  const {
    onReset
  } = props;
  const stringFormatter = useLocalizedStringFormatter(strings);
  const router = useRouter();
  const config = useConfig();
  const {
    collectionConfig,
    schema
  } = useCollection(props.collection);
  const [forceValidation, setForceValidation] = useState(false);
  const formatInfo = getCollectionFormat(config, props.collection);
  const baseCommit = useBaseCommit();
  let collectionPath = `${props.basePath}/collection/${encodeURIComponent(props.collection)}`;
  const {
    createResult
  } = props;
  const currentSlug = createResult.kind === 'updated' || createResult.kind === 'loading' ? props.slug : undefined;
  const slugInfo = useSlugFieldInfo(props.collection, currentSlug);
  const onCreate = async () => {
    if (createResult.kind === 'loading') return;
    if (!clientSideValidateProp(schema, props.state, slugInfo)) {
      setForceValidation(true);
      return;
    }
    if (await props.createItem()) {
      const slug = getSlugFromState(collectionConfig, props.state);
      router.push(`${collectionPath}/item/${encodeURIComponent(slug)}`);
      toastQueue.positive('Entry created', {
        timeout: 5000
      }); // TODO: l10n
    }
  };
  const onCopy = () => {
    copyEntryToClipboard(props.state, formatInfo, collectionConfig.schema, {
      field: collectionConfig.slugField,
      value: getSlugFromState(collectionConfig, props.state)
    });
  };
  const onPaste = async () => {
    const entry = await getPastedEntry(formatInfo, collectionConfig.schema, {
      field: collectionConfig.slugField,
      slug: getSlugFromState(collectionConfig, props.state)
    });
    if (entry) {
      setValueToPreviewProps(entry, props.previewProps);
      toastQueue.positive('Entry pasted', {
        shouldCloseOnAction: true,
        actionLabel: 'Undo',
        onAction: () => {
          setValueToPreviewProps(props.state, props.previewProps);
        }
      });
    }
  };

  // note we're still "loading" when it's already been created
  // since we're waiting to go to the item page
  const isLoading = createResult.kind === 'loading' || createResult.kind === 'updated';
  const formID = 'item-create-form';
  const breadcrumbItems = useMemo(() => [{
    key: 'collection',
    label: collectionConfig.label,
    href: collectionPath
  }, {
    key: 'current',
    label: stringFormatter.format('add')
  }], [collectionConfig.label, stringFormatter, collectionPath]);
  const isBelowDesktop = useMediaQuery(breakpointQueries.below.desktop);
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsxs(PageRoot, {
      containerWidth: containerWidthForEntryLayout(collectionConfig),
      children: [/*#__PURE__*/jsxs(PageHeader, {
        children: [/*#__PURE__*/jsx(HeaderBreadcrumbs, {
          items: breadcrumbItems
        }), /*#__PURE__*/jsx(PresenceAvatars, {}), isLoading && /*#__PURE__*/jsx(ProgressCircle, {
          "aria-label": "Creating entry",
          isIndeterminate: true,
          size: "small"
        }), /*#__PURE__*/jsx(ActionGroup, {
          buttonLabelBehavior: "hide",
          overflowMode: "collapse",
          prominence: "low",
          density: "compact",
          maxWidth: isBelowDesktop ? 'element.regular' : undefined // force switch to action menu on small devices
          ,
          items: menuActions,
          onAction: key => {
            switch (key) {
              case 'reset':
                onReset();
                setForceValidation(false);
                break;
              case 'copy':
                onCopy();
                break;
              case 'paste':
                onPaste();
                break;
            }
          },
          children: item => /*#__PURE__*/jsxs(Item$1, {
            textValue: item.label,
            children: [/*#__PURE__*/jsx(Icon, {
              src: item.icon
            }), /*#__PURE__*/jsx(Text, {
              children: item.label
            })]
          }, item.key)
        }), /*#__PURE__*/jsx(Button, {
          isDisabled: isLoading,
          prominence: "high",
          type: "submit",
          form: formID,
          marginStart: "auto",
          children: stringFormatter.format('create')
        })]
      }), /*#__PURE__*/jsxs(Flex, {
        id: formID,
        elementType: "form",
        onSubmit: event => {
          if (event.target !== event.currentTarget) return;
          event.preventDefault();
          onCreate();
        },
        direction: "column",
        gap: "xxlarge",
        height: "100%",
        minHeight: 0,
        minWidth: 0,
        children: [createResult.kind === 'error' && /*#__PURE__*/jsx(Notice, {
          tone: "critical",
          children: createResult.error.message
        }), /*#__PURE__*/jsx(FormForEntry, {
          previewProps: props.previewProps,
          forceValidation: forceValidation,
          entryLayout: collectionConfig.entryLayout,
          formatInfo: formatInfo,
          slugField: slugInfo
        })]
      })]
    }), /*#__PURE__*/jsx(DialogContainer
    // ideally this would be a popover on desktop but using a DialogTrigger
    // wouldn't work since this doesn't open on click but after doing a
    // network request and it failing and manually wiring about a popover
    // and modal would be a pain
    , {
      onDismiss: props.resetCreateItemState,
      children: createResult.kind === 'needs-new-branch' && /*#__PURE__*/jsx(CreateBranchDuringUpdateDialog, {
        branchOid: baseCommit,
        onCreate: async newBranch => {
          router.push(`/keystatic/branch/${encodeURIComponent(newBranch)}/collection/${encodeURIComponent(props.collection)}/create`);
          if (await props.createItem({
            branch: newBranch,
            sha: baseCommit
          })) {
            const slug = getSlugFromState(collectionConfig, props.state);
            router.push(`/keystatic/branch/${encodeURIComponent(newBranch)}/collection/${encodeURIComponent(props.collection)}/item/${encodeURIComponent(slug)}`);
          }
        },
        reason: createResult.reason,
        onDismiss: props.resetCreateItemState
      })
    }), /*#__PURE__*/jsx(DialogContainer
    // ideally this would be a popover on desktop but using a DialogTrigger
    // wouldn't work since this doesn't open on click but after doing a
    // network request and it failing and manually wiring about a popover
    // and modal would be a pain
    , {
      onDismiss: props.resetCreateItemState,
      children: createResult.kind === 'needs-fork' && isGitHubConfig(config) && /*#__PURE__*/jsx(ForkRepoDialog, {
        onCreate: async () => {
          if (await props.createItem()) {
            const slug = getSlugFromState(collectionConfig, props.state);
            router.push(`${collectionPath}/item/${encodeURIComponent(slug)}`);
          }
        },
        onDismiss: props.resetCreateItemState,
        config: config
      })
    })]
  });
}
const menuActions = [{
  key: 'reset',
  label: 'Reset',
  icon: historyIcon
}, {
  key: 'copy',
  label: 'Copy entry',
  icon: clipboardCopyIcon
}, {
  key: 'paste',
  label: 'Paste entry',
  icon: clipboardPasteIcon
}];

const DashboardSection = ({
  children,
  title
}) => {
  return /*#__PURE__*/jsxs(Flex, {
    elementType: "section",
    direction: "column",
    gap: "medium",
    children: [/*#__PURE__*/jsx(Text, {
      casing: "uppercase",
      color: "neutralTertiary",
      size: "small",
      weight: "bold",
      elementType: "h2",
      children: title
    }), children]
  });
};
const FILL_COLS = 'fill';
const DashboardGrid = props => {
  return /*#__PURE__*/jsx("div", {
    className: css({
      display: 'grid',
      gap: tokenSchema.size.space.large,
      gridAutoRows: tokenSchema.size.element.xlarge,
      gridTemplateColumns: `[${FILL_COLS}-start] 1fr [${FILL_COLS}-end]`,
      [containerQueries.above.mobile]: {
        gridTemplateColumns: `[${FILL_COLS}-start] 1fr 1fr [${FILL_COLS}-end]`
      },
      [containerQueries.above.tablet]: {
        gridTemplateColumns: `[${FILL_COLS}-start] 1fr 1fr 1fr [${FILL_COLS}-end]`
      }
    }),
    ...props
  });
};
const DashboardCard = props => {
  const ref = useRef(null);
  const {
    linkProps
  } = useLink(props, ref);
  return /*#__PURE__*/jsxs(Flex, {
    alignItems: "center",
    backgroundColor: "canvas",
    borderRadius: "medium",
    padding: "large",
    position: "relative",
    children: [/*#__PURE__*/jsxs(Flex, {
      direction: "column",
      gap: "medium",
      flex: true,
      children: [/*#__PURE__*/jsx(Heading, {
        elementType: "h3",
        size: "small",
        truncate: true,
        children: /*#__PURE__*/jsx("a", {
          ref: ref,
          href: props.href,
          ...linkProps,
          className: classNames(css({
            color: tokenSchema.color.foreground.neutral,
            outline: 'none',
            '&:hover': {
              color: tokenSchema.color.foreground.neutralEmphasis,
              '::before': {
                backgroundColor: tokenSchema.color.alias.backgroundIdle,
                borderColor: tokenSchema.color.border.neutral
              }
            },
            '&:active': {
              '::before': {
                backgroundColor: tokenSchema.color.alias.backgroundHovered,
                borderColor: tokenSchema.color.alias.borderHovered
              }
            },
            '&:focus-visible::before': {
              outline: `${tokenSchema.size.alias.focusRing} solid ${tokenSchema.color.alias.focusRing}`,
              outlineOffset: tokenSchema.size.alias.focusRingGap
            },
            // fill the available space so that the card is clickable
            '::before': {
              border: `${tokenSchema.size.border.regular} solid ${tokenSchema.color.border.muted}`,
              borderRadius: tokenSchema.size.radius.medium,
              content: '""',
              position: 'absolute',
              inset: 0,
              transition: transition(['background-color', 'border-color'])
            }
          })),
          children: props.label
        })
      }), props.children]
    }), props.endElement]
  });
};

function useLocalizedString() {
  let stringFormatter = useLocalizedStringFormatter(strings);
  return stringFormatter;
}

function BranchSection() {
  let repoInfo = useRepoInfo();
  let currentBranch = useCurrentBranch();
  let router = useRouter();
  let localizedString = useLocalizedString();
  let prNumber = useAssociatedPullRequest();
  let repoURL = repoInfo && getRepoUrl(repoInfo);
  let isDefaultBranch = currentBranch === (repoInfo === null || repoInfo === void 0 ? void 0 : repoInfo.defaultBranch);
  return /*#__PURE__*/jsxs(DashboardSection, {
    title: localizedString.format('currentBranch'),
    children: [/*#__PURE__*/jsxs(Flex, {
      alignItems: "center",
      gap: "regular",
      border: "muted",
      borderRadius: "medium",
      backgroundColor: "canvas",
      padding: "large",
      children: [/*#__PURE__*/jsx(Icon, {
        src: gitBranchIcon,
        color: "neutralTertiary"
      }), /*#__PURE__*/jsx(Text, {
        size: "medium",
        weight: "semibold",
        children: currentBranch
      })]
    }), /*#__PURE__*/jsxs(Flex, {
      gap: "regular",
      wrap: true,
      children: [/*#__PURE__*/jsxs(DialogTrigger, {
        children: [/*#__PURE__*/jsxs(ActionButton, {
          children: [/*#__PURE__*/jsx(Icon, {
            src: gitBranchPlusIcon
          }), /*#__PURE__*/jsx(Text, {
            children: localizedString.format('newBranch')
          })]
        }), close => /*#__PURE__*/jsx(CreateBranchDialog, {
          onDismiss: close,
          onCreate: branchName => {
            close();
            router.push(router.href.replace(/\/branch\/[^/]+/, '/branch/' + encodeURIComponent(branchName)));
          }
        })]
      }), !isDefaultBranch && prNumber !== undefined && (prNumber === false ? /*#__PURE__*/jsxs(ActionButton, {
        href: `${repoURL}/pull/new/${currentBranch}`,
        target: "_blank",
        children: [/*#__PURE__*/jsx(Icon, {
          src: gitPullRequestIcon
        }), /*#__PURE__*/jsx(Text, {
          children: localizedString.format('createPullRequest')
        })]
      }) : /*#__PURE__*/jsxs(ActionButton, {
        href: `${repoURL}/pull/${prNumber}`,
        target: "_blank",
        children: [/*#__PURE__*/jsx(Icon, {
          src: gitPullRequestIcon
        }), /*#__PURE__*/jsxs(Text, {
          children: ["Pull request #", prNumber]
        })]
      }))]
    })]
  });
}

function DashboardCards() {
  const navItems = useNavItems();
  const hasSections = navItems.some(item => 'children' in item);
  const items = navItems.map(item => renderItemOrGroup(item));
  return hasSections ? /*#__PURE__*/jsx(Fragment, {
    children: items
  }) : /*#__PURE__*/jsx(DashboardSection, {
    title: "Content",
    children: /*#__PURE__*/jsx(DashboardGrid, {
      children: items
    })
  });
}
let dividerCount = 0;
function renderItemOrGroup(itemOrGroup) {
  if (itemOrGroup.isDivider) {
    return /*#__PURE__*/jsx(Flex, {
      gridColumn: FILL_COLS,
      children: /*#__PURE__*/jsx(Divider, {
        alignSelf: "center",
        size: "medium",
        width: "alias.singleLineWidth"
      })
    }, dividerCount++);
  }
  if (itemOrGroup.children) {
    return /*#__PURE__*/jsx(DashboardSection, {
      title: itemOrGroup.title,
      children: /*#__PURE__*/jsx(DashboardGrid, {
        children: itemOrGroup.children.map(child => renderItemOrGroup(child))
      })
    }, itemOrGroup.title);
  }
  let changeElement = (() => {
    if (!itemOrGroup.changed) {
      return undefined;
    }
    return typeof itemOrGroup.changed === 'number' ? /*#__PURE__*/jsx(Badge, {
      tone: "accent",
      marginStart: "auto",
      children: pluralize(itemOrGroup.changed, {
        singular: 'change',
        plural: 'changes'
      })
    }) : /*#__PURE__*/jsx(Badge, {
      tone: "accent",
      children: "Changed"
    });
  })();
  let endElement = (() => {
    // entry counts are only available for collections
    if (typeof itemOrGroup.entryCount !== 'number') {
      return changeElement;
    }
    return /*#__PURE__*/jsxs(Flex, {
      gap: "medium",
      alignItems: "center",
      children: [changeElement, /*#__PURE__*/jsx(ActionButton, {
        "aria-label": "Add",
        href: `${itemOrGroup.href}/create`,
        children: /*#__PURE__*/jsx(Icon, {
          src: plusIcon
        })
      })]
    });
  })();
  return /*#__PURE__*/jsx(DashboardCard, {
    label: itemOrGroup.label,
    href: itemOrGroup.href,
    endElement: endElement,
    children: typeof itemOrGroup.entryCount === 'number' ? /*#__PURE__*/jsx(Text, {
      color: "neutralSecondary",
      children: pluralize(itemOrGroup.entryCount, {
        singular: 'entry',
        plural: 'entries'
      })
    }) : null
  }, itemOrGroup.key);
}

function DashboardPage(props) {
  var _viewer$name;
  const stringFormatter = useLocalizedStringFormatter(strings);
  const viewer = useViewer();
  const cloudInfo = useCloudInfo();
  const user = viewer ? {
    name: (_viewer$name = viewer.name) !== null && _viewer$name !== void 0 ? _viewer$name : viewer.login,
    avatarUrl: viewer.avatarUrl
  } : cloudInfo === null || cloudInfo === void 0 ? void 0 : cloudInfo.user;
  return /*#__PURE__*/jsxs(PageRoot, {
    containerWidth: "large",
    children: [/*#__PURE__*/jsx(PageHeader, {
      children: /*#__PURE__*/jsx(Heading, {
        elementType: "h1",
        id: "page-title",
        size: "small",
        children: stringFormatter.format('dashboard')
      })
    }), /*#__PURE__*/jsx(PageBody, {
      isScrollable: true,
      children: /*#__PURE__*/jsxs(Flex, {
        direction: "column",
        gap: "xxlarge",
        children: [user && /*#__PURE__*/jsx(UserInfo, {
          user: user,
          manageAccount: !!cloudInfo
        }), !isLocalConfig(props.config) && /*#__PURE__*/jsx(BranchSection, {}), /*#__PURE__*/jsx(DashboardCards, {})]
      })
    })]
  });
}
function UserInfo({
  user,
  manageAccount
}) {
  return /*#__PURE__*/jsxs(Flex, {
    alignItems: "center",
    gap: "medium",
    isHidden: {
      below: 'tablet'
    },
    children: [/*#__PURE__*/jsx(Avatar, {
      src: user.avatarUrl,
      name: user.name,
      size: "large"
    }), /*#__PURE__*/jsxs(VStack, {
      gap: "medium",
      children: [/*#__PURE__*/jsxs(Heading, {
        size: "medium",
        elementType: "p",
        UNSAFE_style: {
          fontWeight: tokenSchema.typography.fontWeight.bold
        },
        children: ["Hello, ", user.name, "!"]
      }), manageAccount && /*#__PURE__*/jsx(TextLink, {
        href: "http://localhost:3000",
        children: "Manage Account"
      })]
    })]
  });
}

const MainPanelLayout = props => {
  let isBelowDesktop = useMediaQuery(breakpointQueries.below.desktop);
  let sidebarState = useSidebar();
  let ref = useRef(null);
  let context = useContentPanelState(ref);
  return /*#__PURE__*/jsx(ContentPanelProvider, {
    value: context,
    children: /*#__PURE__*/jsxs(SplitView, {
      autoSaveId: "keystatic-app-split-view",
      isCollapsed: isBelowDesktop || !sidebarState.isOpen,
      onCollapseChange: sidebarState.toggle,
      defaultSize: 260,
      minSize: 180,
      maxSize: 400
      // styles
      ,
      height: "100vh",
      children: [isBelowDesktop ? /*#__PURE__*/jsx(SidebarDialog, {}) : /*#__PURE__*/jsx(SplitPanePrimary, {
        children: /*#__PURE__*/jsx(SidebarPanel, {})
      }), /*#__PURE__*/jsx(SplitPaneSecondary, {
        ref: ref,
        children: props.children
      })]
    })
  });
};

function CloudProvisioningState(props) {
  var _props$config$cloud$u, _props$config$cloud;
  const cloudInfo = useRawCloudInfo();
  const isAdmin = cloudInfo !== null && cloudInfo !== "unauthorized" && cloudInfo.role === "admin" && cloudInfo.capabilities.provisioning;
  const setupUrl = cloudInfo && cloudInfo !== "unauthorized" ? new URL(`/projects/${encodeURIComponent(cloudInfo.project.id)}`, (_props$config$cloud$u = (_props$config$cloud = props.config.cloud) === null || _props$config$cloud === void 0 ? void 0 : _props$config$cloud.url) !== null && _props$config$cloud$u !== void 0 ? _props$config$cloud$u : window.location.origin).toString() : null;
  return /*#__PURE__*/jsx(EmptyState, {
    icon: alertCircleIcon,
    title: "Projeto Cloud ainda n\xE3o est\xE1 configurado",
    message: isAdmin ? "Um administrador precisa vincular uma instalação GitHub, repositório e branch antes de abrir o editor." : "O projeto ainda não está disponível. Peça a um administrador para concluir a configuração no Cloud.",
    actions: isAdmin && setupUrl ? /*#__PURE__*/jsx("a", {
      href: setupUrl,
      children: "Configurar projeto no Cloud"
    }) : undefined
  });
}
function getCloudErrorCode(error) {
  var _error$graphQLErrors;
  const code = error === null || error === void 0 || (_error$graphQLErrors = error.graphQLErrors) === null || _error$graphQLErrors === void 0 || (_error$graphQLErrors = _error$graphQLErrors.find(graphQLError => {
    var _graphQLError$extensi;
    return typeof (graphQLError === null || graphQLError === void 0 || (_graphQLError$extensi = graphQLError.extensions) === null || _graphQLError$extensi === void 0 ? void 0 : _graphQLError$extensi.code) === "string";
  })) === null || _error$graphQLErrors === void 0 || (_error$graphQLErrors = _error$graphQLErrors.extensions) === null || _error$graphQLErrors === void 0 ? void 0 : _error$graphQLErrors.code;
  return typeof code === "string" ? code : null;
}
function BranchNotFound(props) {
  var _appShellDataContext$;
  const branches = useBranches();
  const currentBranch = useCurrentBranch();
  const appShellDataContext = useContext(GitHubAppShellDataContext);
  if ((appShellDataContext === null || appShellDataContext === void 0 || (_appShellDataContext$ = appShellDataContext.data) === null || _appShellDataContext$ === void 0 || (_appShellDataContext$ = _appShellDataContext$.repository) === null || _appShellDataContext$ === void 0 || (_appShellDataContext$ = _appShellDataContext$.refs) === null || _appShellDataContext$ === void 0 ? void 0 : _appShellDataContext$.pageInfo.hasNextPage) === false && !branches.has(currentBranch)) {
    return /*#__PURE__*/jsx(EmptyState, {
      icon: alertCircleIcon,
      title: "Branch not found",
      message: `The branch ${currentBranch} does not exist in this repository.`
    });
  }
  return props.children;
}
const AppShell = props => {
  const content = /*#__PURE__*/jsx(AppShellErrorContext.Consumer, {
    children: error => error ? getCloudErrorCode(error) === "CLOUD_GITHUB_REPOSITORY_REQUIRED" && props.config.storage.kind === "cloud" ? /*#__PURE__*/jsx(CloudProvisioningState, {
      config: props.config
    }) : !(error !== null && error !== void 0 && error.graphQLErrors.some(err => {
      var _err$originalError;
      return (err === null || err === void 0 || (_err$originalError = err.originalError) === null || _err$originalError === void 0 ? void 0 : _err$originalError.type) === "NOT_FOUND";
    })) ? /*#__PURE__*/jsx(EmptyState, {
      icon: alertCircleIcon,
      title: "Failed to load shell",
      message: error.message
    }) : props.children : props.children
  });
  const inner = /*#__PURE__*/jsx(ConfigContext.Provider, {
    value: props.config,
    children: /*#__PURE__*/jsx(AppStateContext.Provider, {
      value: {
        basePath: props.basePath
      },
      children: /*#__PURE__*/jsx(SidebarProvider, {
        children: /*#__PURE__*/jsx(MainPanelLayout, {
          children: /*#__PURE__*/jsx(BranchNotFound, {
            children: content
          })
        })
      })
    })
  });
  if (isGitHubConfig(props.config) || props.config.storage.kind === "cloud") {
    return /*#__PURE__*/jsx(GitHubAppShellProvider, {
      currentBranch: props.currentBranch,
      config: props.config,
      children: inner
    });
  }
  if (isLocalConfig(props.config)) {
    return /*#__PURE__*/jsx(LocalAppShellProvider, {
      config: props.config,
      children: inner
    });
  }
  return null;
};

function SingletonPageInner(props) {
  var _getPathPrefix, _getPathPrefix2;
  const isBelowDesktop = useMediaQuery(breakpointQueries.below.desktop);
  const repoInfo = useRepoInfo();
  const currentBranch = useCurrentBranch();
  const [forceValidation, setForceValidation] = useState(false);
  const {
    schema,
    singletonConfig
  } = useSingleton(props.singleton);
  const router = useRouter();
  const previewHref = useMemo(() => {
    if (!singletonConfig.previewUrl) return undefined;
    return singletonConfig.previewUrl.replace('{branch}', currentBranch);
  }, [currentBranch, singletonConfig.previewUrl]);
  const isGitHub = isGitHubConfig(props.config) || isCloudConfig(props.config);
  const formatInfo = getSingletonFormat(props.config, props.singleton);
  const singletonExists = !!props.initialState;
  const singletonPath = getSingletonPath(props.config, props.singleton);
  const viewHref = isGitHub && singletonExists && repoInfo ? `${getRepoUrl(repoInfo)}${formatInfo.dataLocation === 'index' ? `/tree/${currentBranch}/${(_getPathPrefix = getPathPrefix(props.config.storage)) !== null && _getPathPrefix !== void 0 ? _getPathPrefix : ''}${singletonPath}` : `/blob/${(_getPathPrefix2 = getPathPrefix(props.config.storage)) !== null && _getPathPrefix2 !== void 0 ? _getPathPrefix2 : ''}${currentBranch}/${singletonPath}${getDataFileExtension(formatInfo)}`}` : undefined;
  const menuActions = useMemo(() => {
    const actions = [{
      key: 'reset',
      label: 'Reset',
      icon: historyIcon
    }, {
      key: 'copy',
      label: 'Copy entry',
      icon: clipboardCopyIcon
    }, {
      key: 'paste',
      label: 'Paste entry',
      icon: clipboardPasteIcon
    }];
    if (previewHref) {
      actions.push({
        key: 'preview',
        label: 'Preview',
        icon: externalLinkIcon,
        href: previewHref,
        target: '_blank',
        rel: 'noopener noreferrer'
      });
    }
    if (viewHref) {
      actions.push({
        key: 'view',
        label: 'View on GitHub',
        icon: githubIcon,
        href: viewHref,
        target: '_blank',
        rel: 'noopener noreferrer'
      });
    }
    return actions;
  }, [previewHref, viewHref]);
  const formID = 'singleton-form';
  const baseCommit = useBaseCommit();
  const isCreating = props.initialState === null;
  const onCreate = async () => {
    if (props.updateResult.kind === 'loading' || !props.hasChanged) return;
    if (!clientSideValidateProp(schema, props.state, undefined)) {
      setForceValidation(true);
      return;
    }
    await props.onUpdate();
  };
  const onCopy = () => {
    copyEntryToClipboard(props.state, formatInfo, singletonConfig.schema, undefined);
  };
  const onPaste = async () => {
    const entry = await getPastedEntry(formatInfo, singletonConfig.schema, undefined);
    if (entry) {
      setValueToPreviewProps(entry, props.previewProps);
      toastQueue.positive('Entry pasted', {
        shouldCloseOnAction: true,
        actionLabel: 'Undo',
        onAction: () => {
          setValueToPreviewProps(props.state, props.previewProps);
        }
      });
    }
  };
  return /*#__PURE__*/jsxs(PageRoot, {
    containerWidth: containerWidthForEntryLayout(singletonConfig),
    children: [/*#__PURE__*/jsxs(PageHeader, {
      children: [/*#__PURE__*/jsxs(Flex, {
        flex: true,
        alignItems: "center",
        gap: "regular",
        children: [/*#__PURE__*/jsx(Heading, {
          elementType: "h1",
          id: "page-title",
          size: "small",
          children: singletonConfig.label
        }), props.updateResult.kind === 'loading' ? /*#__PURE__*/jsx(ProgressCircle, {
          "aria-label": `Updating ${singletonConfig.label}`,
          isIndeterminate: true,
          size: "small",
          alignSelf: "center"
        }) : props.hasChanged && /*#__PURE__*/jsx(Badge, {
          tone: "pending",
          children: "Unsaved"
        })]
      }), /*#__PURE__*/jsx(PresenceAvatars, {}), /*#__PURE__*/jsx(ActionGroup, {
        buttonLabelBehavior: "hide",
        overflowMode: "collapse",
        prominence: "low",
        density: "compact",
        maxWidth: isBelowDesktop ? 'element.regular' : undefined // force switch to action menu on small devices
        ,
        items: menuActions,
        disabledKeys: props.hasChanged ? [] : ['reset'],
        onAction: key => {
          switch (key) {
            case 'reset':
              props.onReset();
              break;
            case 'copy':
              onCopy();
              break;
            case 'paste':
              onPaste();
              break;
          }
        },
        children: item => /*#__PURE__*/jsxs(Item$1, {
          textValue: item.label,
          href: item.href,
          target: item.target,
          rel: item.rel,
          children: [/*#__PURE__*/jsx(Icon, {
            src: item.icon
          }), /*#__PURE__*/jsx(Text, {
            children: item.label
          })]
        }, item.key)
      }), /*#__PURE__*/jsx(Button, {
        form: formID,
        isDisabled: props.updateResult.kind === 'loading',
        prominence: "high",
        type: "submit",
        children: isCreating ? 'Create' : 'Save'
      })]
    }), /*#__PURE__*/jsxs(Flex, {
      elementType: "form",
      id: formID,
      onSubmit: event => {
        if (event.target !== event.currentTarget) return;
        event.preventDefault();
        onCreate();
      },
      direction: "column",
      gap: "xxlarge",
      height: "100%",
      minHeight: 0,
      minWidth: 0,
      children: [props.updateResult.kind === 'error' && /*#__PURE__*/jsx(Notice, {
        tone: "critical",
        children: props.updateResult.error.message
      }), /*#__PURE__*/jsx(FormForEntry, {
        previewProps: props.previewProps,
        forceValidation: forceValidation,
        entryLayout: singletonConfig.entryLayout,
        formatInfo: formatInfo,
        slugField: undefined,
        previewUrl: previewHref
      }), /*#__PURE__*/jsx(DialogContainer
      // ideally this would be a popover on desktop but using a DialogTrigger wouldn't work since
      // this doesn't open on click but after doing a network request and it failing and manually wiring about a popover and modal would be a pain
      , {
        onDismiss: props.onResetUpdateItem,
        children: props.updateResult.kind === 'needs-new-branch' && /*#__PURE__*/jsx(CreateBranchDuringUpdateDialog, {
          branchOid: baseCommit,
          onCreate: async newBranch => {
            router.push(`/keystatic/branch/${encodeURIComponent(newBranch)}/singleton/${encodeURIComponent(props.singleton)}`);
            props.onUpdate({
              branch: newBranch,
              sha: baseCommit
            });
          },
          reason: props.updateResult.reason,
          onDismiss: props.onResetUpdateItem
        })
      }), /*#__PURE__*/jsx(DialogContainer
      // ideally this would be a popover on desktop but using a DialogTrigger
      // wouldn't work since this doesn't open on click but after doing a
      // network request and it failing and manually wiring about a popover
      // and modal would be a pain
      , {
        onDismiss: props.onResetUpdateItem,
        children: props.updateResult.kind === 'needs-fork' && isGitHubConfig(props.config) && /*#__PURE__*/jsx(ForkRepoDialog, {
          onCreate: async () => {
            props.onUpdate();
          },
          onDismiss: props.onResetUpdateItem,
          config: props.config
        })
      })]
    })]
  });
}
function LocalSingletonPage(props) {
  const {
    singleton,
    initialFiles,
    initialState,
    localTreeKey,
    config,
    draft
  } = props;
  const {
    schema,
    singletonConfig
  } = useSingleton(props.singleton);
  const singletonPath = getSingletonPath(config, singleton);
  const [{
    state,
    localTreeKey: localTreeKeyInState
  }, setState] = useState(() => {
    var _draft$state;
    return {
      localTreeKey: localTreeKey,
      state: (_draft$state = draft === null || draft === void 0 ? void 0 : draft.state) !== null && _draft$state !== void 0 ? _draft$state : initialState === null ? getInitialPropsValue(schema) : initialState
    };
  });
  useShowRestoredDraftMessage(draft, state, localTreeKey);
  if (localTreeKeyInState !== localTreeKey) {
    setState({
      localTreeKey: localTreeKey,
      state: initialState === null ? getInitialPropsValue(schema) : initialState
    });
  }
  const isCreating = initialState === null;
  const hasChanged = useHasChanged({
    initialState,
    state,
    schema,
    slugField: undefined
  }) || isCreating;
  useEffect(() => {
    const key = ['singleton', singleton];
    if (hasChanged) {
      const serialized = serializeEntryToFiles({
        basePath: singletonPath,
        format: getSingletonFormat(config, singleton),
        schema: singletonConfig.schema,
        slug: undefined,
        state
      });
      const files = new Map(serialized.map(x => [x.path, x.contents]));
      const data = {
        beforeTreeKey: localTreeKey,
        files,
        savedAt: new Date(),
        version: 1
      };
      setDraft(key, data);
    } else {
      delDraft(key);
    }
  }, [config, localTreeKey, state, hasChanged, singleton, singletonPath, singletonConfig]);
  const onPreviewPropsChange = useCallback(cb => {
    setState(state => ({
      localTreeKey: state.localTreeKey,
      state: cb(state.state)
    }));
  }, []);
  const previewProps = usePreviewProps(schema, onPreviewPropsChange, state);
  const formatInfo = getSingletonFormat(config, singleton);
  const [updateResult, _update, resetUpdateItem] = useUpsertItem({
    state,
    initialFiles,
    config,
    schema: singletonConfig.schema,
    basePath: singletonPath,
    format: formatInfo,
    currentLocalTreeKey: localTreeKey,
    slug: undefined
  });
  const update = useEventCallback(_update);
  const onReset = () => setState({
    localTreeKey: localTreeKey,
    state: initialState === null ? getInitialPropsValue(schema) : initialState
  });
  return /*#__PURE__*/jsx(SingletonPageInner, {
    ...props,
    hasChanged: hasChanged,
    onReset: onReset,
    onUpdate: update,
    onResetUpdateItem: resetUpdateItem,
    updateResult: updateResult,
    state: state,
    previewProps: previewProps
  });
}
function CollabSingletonPage(props) {
  const {
    singleton,
    initialFiles,
    initialState,
    localTreeKey,
    config
  } = props;
  const {
    schema,
    singletonConfig
  } = useSingleton(props.singleton);
  const singletonPath = getSingletonPath(config, singleton);
  const state = useYJsValue(schema, props.map);
  const previewProps = usePreviewPropsFromY(schema, props.map, state);
  const isCreating = initialState === null;
  const hasChanged = useHasChanged({
    initialState,
    state,
    schema,
    slugField: undefined
  }) || isCreating;
  const formatInfo = getSingletonFormat(config, singleton);
  const [updateResult, _update, resetUpdateItem] = useUpsertItem({
    state,
    initialFiles,
    config,
    schema: singletonConfig.schema,
    basePath: singletonPath,
    format: formatInfo,
    currentLocalTreeKey: localTreeKey,
    slug: undefined
  });
  const update = useEventCallback(_update);
  const onReset = () => {
    props.map.doc.transact(() => {
      for (const [key, value] of Object.entries(singletonConfig.schema)) {
        var _props$initialState$k, _props$initialState;
        const val = getYjsValFromParsedValue(value, (_props$initialState$k = (_props$initialState = props.initialState) === null || _props$initialState === void 0 ? void 0 : _props$initialState[key]) !== null && _props$initialState$k !== void 0 ? _props$initialState$k : getInitialPropsValue(value));
        props.map.set(key, val);
      }
    });
  };
  return /*#__PURE__*/jsx(SingletonPageInner, {
    ...props,
    hasChanged: hasChanged,
    onReset: onReset,
    onUpdate: update,
    onResetUpdateItem: resetUpdateItem,
    updateResult: updateResult,
    state: state,
    previewProps: previewProps
  });
}
const storedValSchema = s.type({
  version: s.literal(1),
  savedAt: s.date(),
  beforeTreeKey: s.optional(s.string()),
  files: s.map(s.string(), s.instance(Uint8Array))
});
function SingletonPageWrapper(props) {
  var _props$config$singlet;
  const singletonConfig = (_props$config$singlet = props.config.singletons) === null || _props$config$singlet === void 0 ? void 0 : _props$config$singlet[props.singleton];
  if (!singletonConfig) notFound();
  const header = /*#__PURE__*/jsx(PageHeader, {
    children: /*#__PURE__*/jsx(Heading, {
      elementType: "h1",
      id: "page-title",
      size: "small",
      children: singletonConfig.label
    })
  });
  const format = useMemo(() => getSingletonFormat(props.config, props.singleton), [props.config, props.singleton]);
  const dirpath = getSingletonPath(props.config, props.singleton);
  const draftData = useData(useCallback(async () => {
    const raw = await getDraft(['singleton', props.singleton]);
    if (!raw) throw new Error('No draft found');
    const stored = storedValSchema.create(raw);
    const parsed = parseEntry({
      dirpath,
      format,
      schema: singletonConfig.schema,
      slug: undefined
    }, stored.files);
    return {
      state: parsed.initialState,
      savedAt: stored.savedAt,
      treeKey: stored.beforeTreeKey
    };
  }, [dirpath, format, props.singleton, singletonConfig.schema]));
  const itemData = useItemData({
    config: props.config,
    dirpath,
    schema: singletonConfig.schema,
    format,
    slug: undefined
  });
  const currentBranch = useCurrentBranch();
  const key = `${currentBranch}/${props.singleton}`;
  const yjsInfo = useYjsIfAvailable();
  const isItemDataLoading = itemData.kind === 'loading';
  const mapData = useData(useCallback(async () => {
    if (!yjsInfo) return;
    if (yjsInfo === 'loading') return LOADING;
    await yjsInfo.doc.whenSynced;
    if (isItemDataLoading) return LOADING;
    let doc = yjsInfo.data.get(key);
    if (doc instanceof Y.Doc) {
      const promise = doc.whenLoaded;
      doc.load();
      await promise;
    } else {
      doc = new Y.Doc();
      yjsInfo.data.set(key, doc);
    }
    return doc.getMap('data');
  }, [yjsInfo, isItemDataLoading, key]));
  useMemo(() => {
    if (mapData.kind !== 'loaded' || itemData.kind !== 'loaded' || !mapData.data || mapData.data.size) {
      return;
    }
    const data = mapData.data;
    data.doc.transact(() => {
      for (const [key, value] of Object.entries(singletonConfig.schema)) {
        const val = getYjsValFromParsedValue(value, itemData.data === 'not-found' ? getInitialPropsValue(value) : itemData.data.initialState[key]);
        data.set(key, val);
      }
    });
  }, [itemData, mapData, singletonConfig]);
  if (itemData.kind === 'error') {
    return /*#__PURE__*/jsxs(PageRoot, {
      children: [header, /*#__PURE__*/jsx(PageBody, {
        children: /*#__PURE__*/jsx(Notice, {
          margin: "xxlarge",
          tone: "critical",
          children: itemData.error.message
        })
      })]
    });
  }
  if (mapData.kind === 'error') {
    return /*#__PURE__*/jsxs(PageRoot, {
      children: [header, /*#__PURE__*/jsx(PageBody, {
        children: /*#__PURE__*/jsx(Notice, {
          margin: "xxlarge",
          tone: "critical",
          children: mapData.error.message
        })
      })]
    });
  }
  if (itemData.kind === 'loading' || draftData.kind === 'loading' || mapData.kind === 'loading') {
    return /*#__PURE__*/jsxs(PageRoot, {
      children: [header, /*#__PURE__*/jsx(PageBody, {
        children: /*#__PURE__*/jsx(Flex, {
          alignItems: "center",
          justifyContent: "center",
          minHeight: "scale.3000",
          children: /*#__PURE__*/jsx(ProgressCircle, {
            "aria-label": `Loading ${singletonConfig.label}`,
            isIndeterminate: true,
            size: "large"
          })
        })
      })]
    });
  }
  if (mapData.data) {
    return /*#__PURE__*/jsx(CollabSingletonPage, {
      singleton: props.singleton,
      config: props.config,
      initialState: itemData.data === 'not-found' ? null : itemData.data.initialState,
      initialFiles: itemData.data === 'not-found' ? [] : itemData.data.initialFiles,
      localTreeKey: itemData.data === 'not-found' ? undefined : itemData.data.localTreeKey,
      map: mapData.data
    });
  }
  return /*#__PURE__*/jsx(LocalSingletonPage, {
    singleton: props.singleton,
    config: props.config,
    initialState: itemData.data === 'not-found' ? null : itemData.data.initialState,
    initialFiles: itemData.data === 'not-found' ? [] : itemData.data.initialFiles,
    localTreeKey: itemData.data === 'not-found' ? undefined : itemData.data.localTreeKey,
    draft: draftData.kind === 'loaded' ? draftData.data : undefined
  });
}

function CreatedGitHubApp(props) {
  return /*#__PURE__*/jsx(Flex, {
    alignItems: "center",
    justifyContent: "center",
    margin: "xxlarge",
    children: /*#__PURE__*/jsxs(Flex, {
      backgroundColor: "surface",
      padding: "large",
      border: "color.alias.borderIdle",
      borderRadius: "medium",
      direction: "column",
      justifyContent: "center",
      gap: "xlarge",
      maxWidth: "scale.4600",
      children: [/*#__PURE__*/jsx(Heading, {
        children: "You've installed Keystatic! \uD83C\uDF89"
      }), /*#__PURE__*/jsx(Text, {
        children: "To start using Keystatic, you need to install the GitHub app you've created."
      }), /*#__PURE__*/jsxs(Text, {
        children: ["Make sure to add the App to the", ' ', /*#__PURE__*/jsx("code", {
          children: serializeRepoConfig(props.config.storage.repo)
        }), ' ', "repository."]
      }), /*#__PURE__*/jsx(InstallGitHubApp, {
        config: props.config
      })]
    })
  });
}

function KeystaticSetup(props) {
  const [deployedURL, setDeployedURL] = useState('');
  const [organization, setOrganization] = useState('');
  return /*#__PURE__*/jsx(Flex, {
    alignItems: "center",
    justifyContent: "center",
    margin: "xxlarge",
    children: /*#__PURE__*/jsxs(Flex, {
      backgroundColor: "surface",
      padding: "large",
      border: "color.alias.borderIdle",
      borderRadius: "medium",
      direction: "column",
      justifyContent: "center",
      gap: "xlarge",
      maxWidth: "scale.4600",
      elementType: "form",
      action: `https://github.com${organization ? `/organizations/${organization}` : ''}/settings/apps/new`,
      method: "post",
      children: [/*#__PURE__*/jsx(Flex, {
        justifyContent: "center",
        children: /*#__PURE__*/jsx(Heading, {
          children: "Keystatic Setup"
        })
      }), /*#__PURE__*/jsx(Text, {
        children: "Keystatic doesn't have the required config."
      }), /*#__PURE__*/jsx(Text, {
        children: "If you've already created your GitHub app, make sure to add the following environment variables:"
      }), /*#__PURE__*/jsxs(Box, {
        elementType: "ul",
        children: [/*#__PURE__*/jsx("li", {
          children: /*#__PURE__*/jsx("code", {
            children: "KEYSTATIC_GITHUB_CLIENT_ID"
          })
        }), /*#__PURE__*/jsx("li", {
          children: /*#__PURE__*/jsx("code", {
            children: "KEYSTATIC_GITHUB_CLIENT_SECRET"
          })
        }), /*#__PURE__*/jsx("li", {
          children: /*#__PURE__*/jsx("code", {
            children: "KEYSTATIC_SECRET"
          })
        })]
      }), /*#__PURE__*/jsx(Text, {
        children: "If you haven't created your GitHub app for Keystatic, you can create one below."
      }), /*#__PURE__*/jsx(TextField, {
        label: "Deployed App URL",
        description: "This should the root of your domain. If you're not sure where Keystatic will be deployed, leave this blank and you can update the GitHub app later.",
        value: deployedURL,
        onChange: setDeployedURL
      }), /*#__PURE__*/jsx(TextField, {
        label: "GitHub organization (if any)",
        description: "You must be an owner or GitHub App manager in the organization to create the GitHub App. Leave this blank to create the app in your personal account.",
        value: organization,
        onChange: setOrganization
      }), /*#__PURE__*/jsxs(Text, {
        children: ["After visiting GitHub to create the GitHub app, you'll be redirected back here and secrets generated from GitHub will be written to your", ' ', /*#__PURE__*/jsx("code", {
          children: ".env"
        }), " file."]
      }), /*#__PURE__*/jsx("input", {
        type: "text",
        name: "manifest",
        className: css({
          display: 'none'
        }),
        value: JSON.stringify({
          name: `${parseRepoConfig(props.config.storage.repo).owner} Keystatic`,
          url: deployedURL ? new URL('/keystatic', deployedURL).toString() : `${window.location.origin}/keystatic`,
          public: true,
          redirect_url: `${window.location.origin}/api/keystatic/github/created-app`,
          callback_urls: [`${window.location.origin}/api/keystatic/github/oauth/callback`, `http://127.0.0.1/api/keystatic/github/oauth/callback`, ...(deployedURL ? [new URL('/api/keystatic/github/oauth/callback', deployedURL).toString()] : [])],
          request_oauth_on_install: true,
          default_permissions: {
            contents: 'write',
            metadata: 'read',
            pull_requests: 'read'
          }
        })
      }), /*#__PURE__*/jsx(Button, {
        prominence: "high",
        type: "submit",
        children: "Create GitHub App"
      })]
    })
  });
}

function RepoNotFound(props) {
  const repo = serializeRepoConfig(props.config.storage.repo);
  return /*#__PURE__*/jsx(Flex, {
    alignItems: "center",
    justifyContent: "center",
    margin: "xxlarge",
    children: /*#__PURE__*/jsxs(Flex, {
      backgroundColor: "surface",
      padding: "large",
      border: "color.alias.borderIdle",
      borderRadius: "medium",
      direction: "column",
      justifyContent: "center",
      gap: "xlarge",
      maxWidth: "scale.4600",
      children: [/*#__PURE__*/jsx(Flex, {
        justifyContent: "center",
        children: /*#__PURE__*/jsx(Heading, {
          children: "Repo not found"
        })
      }), /*#__PURE__*/jsxs(Text, {
        children: ["Keystatic is configured for the", ' ', /*#__PURE__*/jsx("a", {
          href: `https://github.com/${repo}`,
          children: repo
        }), " GitHub repo but Keystatic isn't able to access this repo. This is either because you don't have access to this repo or you haven't added the GitHub app to it."]
      }), /*#__PURE__*/jsx(InstallGitHubApp, {
        config: props.config
      })]
    })
  });
}

const storedStateSchema = s.object({
  state: s.string(),
  from: s.string(),
  code_verifier: s.string()
});
const tokenResponseSchema = s.type({
  token_type: s.string(),
  expires_in: s.number()
});
function KeystaticCloudAuthCallback({
  config
}) {
  var _config$cloud2;
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedState = useMemo(() => {
    const _storedState = localStorage.getItem('keystatic-cloud-state');
    const storedState = (() => {
      try {
        return storedStateSchema.create(JSON.parse(_storedState || ''));
      } catch {
        return null;
      }
    })();
    return storedState;
  }, []);
  const [error, setError] = useState(null);
  useEffect(() => {
    var _config$cloud;
    if (code && state && storedState && state === storedState.state && (_config$cloud = config.cloud) !== null && _config$cloud !== void 0 && _config$cloud.project) {
      const {
        project
      } = config.cloud;
      (async () => {
        const res = await fetch(`${KEYSTATIC_CLOUD_BROWSER_API_URL}/oauth/token`, {
          method: 'POST',
          credentials: 'same-origin',
          body: new URLSearchParams({
            code,
            client_id: project,
            redirect_uri: `${window.location.origin}/keystatic/cloud/oauth/callback`,
            code_verifier: storedState.code_verifier,
            grant_type: 'authorization_code'
          }).toString(),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...KEYSTATIC_CLOUD_HEADERS
          }
        });
        if (!res.ok) {
          throw new Error(`Bad response: ${res.status} ${res.statusText}\n\n${await res.text()}`);
        }
        const data = await res.json();
        tokenResponseSchema.create(data);
        localStorage.removeItem('keystatic-cloud-state');
        localStorage.removeItem('keystatic-cloud-access-token');
        window.location.assign(`/keystatic/${storedState.from}`);
      })().catch(error => {
        setError(error);
      });
    }
  }, [code, state, storedState, config]);
  if (!((_config$cloud2 = config.cloud) !== null && _config$cloud2 !== void 0 && _config$cloud2.project)) {
    return /*#__PURE__*/jsx(Text, {
      children: "Missing Keystatic Cloud config"
    });
  }
  if (!code || !state) {
    return /*#__PURE__*/jsx(Text, {
      children: "Missing code or state"
    });
  }
  if (!storedState || state !== storedState.state) {
    return /*#__PURE__*/jsx(Text, {
      children: "Invalid state"
    });
  }
  if (error) {
    return /*#__PURE__*/jsx(Text, {
      children: error.message
    });
  }
  return /*#__PURE__*/jsx(Flex, {
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    children: /*#__PURE__*/jsx(ProgressCircle, {
      size: "large",
      isIndeterminate: true,
      "aria-label": "Authenticating"
    })
  });
}

function parseParamsWithoutBranch(params) {
  if (params.length === 0) {
    return {};
  }
  if (params.length === 2 && params[0] === 'singleton') {
    return {
      singleton: params[1]
    };
  }
  if (params.length < 2 || params[0] !== 'collection') return null;
  const collection = params[1];
  if (params.length === 2) {
    return {
      collection
    };
  }
  if (params.length === 3 && params[2] === 'create') {
    return {
      collection,
      kind: 'create'
    };
  }
  if (params.length === 4 && params[2] === 'item') {
    const slug = params[3];
    return {
      collection,
      kind: 'edit',
      slug
    };
  }
  return null;
}
function RedirectToBranch(props) {
  const {
    push
  } = useRouter();
  const {
    data,
    error
  } = useContext(GitHubAppShellDataContext);
  useEffect(() => {
    var _error$response, _data$repository, _data$repository2, _error$graphQLErrors, _error$graphQLErrors2;
    if ((error === null || error === void 0 || (_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.status) === 401) {
      if (props.config.storage.kind === 'github') {
        window.location.href = '/api/keystatic/github/login';
      } else {
        redirectToCloudAuth('', props.config);
      }
    }
    if (data !== null && data !== void 0 && (_data$repository = data.repository) !== null && _data$repository !== void 0 && _data$repository.defaultBranchRef) {
      push(`/keystatic/branch/${encodeURIComponent(data.repository.defaultBranchRef.name)}`);
    }
    if (props.config.storage.kind === 'github' && !(data !== null && data !== void 0 && (_data$repository2 = data.repository) !== null && _data$repository2 !== void 0 && _data$repository2.id) && (error === null || error === void 0 || (_error$graphQLErrors = error.graphQLErrors) === null || _error$graphQLErrors === void 0 || (_error$graphQLErrors = _error$graphQLErrors[0]) === null || _error$graphQLErrors === void 0 || (_error$graphQLErrors = _error$graphQLErrors.originalError) === null || _error$graphQLErrors === void 0 ? void 0 : _error$graphQLErrors.type) === 'NOT_FOUND' || (error === null || error === void 0 || (_error$graphQLErrors2 = error.graphQLErrors) === null || _error$graphQLErrors2 === void 0 || (_error$graphQLErrors2 = _error$graphQLErrors2[0]) === null || _error$graphQLErrors2 === void 0 || (_error$graphQLErrors2 = _error$graphQLErrors2.originalError) === null || _error$graphQLErrors2 === void 0 ? void 0 : _error$graphQLErrors2.type) === 'FORBIDDEN') {
      window.location.href = '/api/keystatic/github/repo-not-found';
    }
  }, [data, error, push, props.config]);
  return null;
}
function PageInner({
  config
}) {
  var _config$ui, _config$cloud, _config$ui2;
  const {
    params
  } = useRouter();
  let branch = null,
    parsedParams,
    basePath;
  if (params.join('/') === 'cloud/oauth/callback') {
    return /*#__PURE__*/jsx(KeystaticCloudAuthCallback, {
      config: config
    });
  }
  if (isLocalConfig(config) && (_config$ui = config.ui) !== null && _config$ui !== void 0 && _config$ui.localAuth && params.length === 1 && params[0] === 'setup') {
    return /*#__PURE__*/jsx(LocalSetup, {
      config: config
    });
  }
  let wrapper = x => x;
  if (isCloudConfig(config) || isLocalConfig(config) && (_config$cloud = config.cloud) !== null && _config$cloud !== void 0 && _config$cloud.project) {
    wrapper = element => /*#__PURE__*/jsx(CloudInfoProvider, {
      config: config,
      children: element
    });
  }
  if (isLocalConfig(config) && (_config$ui2 = config.ui) !== null && _config$ui2 !== void 0 && _config$ui2.localAuth) {
    const originalWrapper = wrapper;
    wrapper = element => /*#__PURE__*/jsx(AuthWrapper, {
      config: config,
      children: originalWrapper(element)
    });
  }
  if (isGitHubConfig(config) || isCloudConfig(config)) {
    const origWrapper = wrapper;
    wrapper = element => /*#__PURE__*/jsx(AuthWrapper, {
      config: config,
      children: /*#__PURE__*/jsx(GitHubAppShellDataProvider, {
        config: config,
        children: origWrapper(element)
      })
    });
    if (params.length === 0) {
      return wrapper(/*#__PURE__*/jsx(RedirectToBranch, {
        config: config
      }));
    }
    if (params.length === 1 && isGitHubConfig(config)) {
      if (params[0] === 'setup') return /*#__PURE__*/jsx(KeystaticSetup, {
        config: config
      });
      if (params[0] === 'repo-not-found') {
        return /*#__PURE__*/jsx(RepoNotFound, {
          config: config
        });
      }
      if (params[0] === 'created-github-app') {
        return /*#__PURE__*/jsx(CreatedGitHubApp, {
          config: config
        });
      }
    }
    if (params[0] !== 'branch' || params.length < 2) {
      return /*#__PURE__*/jsx(Text, {
        children: "Not found"
      });
    }
    branch = params[1];
    basePath = `/keystatic/branch/${encodeURIComponent(branch)}`;
    parsedParams = parseParamsWithoutBranch(params.slice(2));
  } else {
    parsedParams = parseParamsWithoutBranch(params);
    basePath = '/keystatic';
  }
  return wrapper(/*#__PURE__*/jsx(AppShell, {
    config: config,
    currentBranch: branch || '',
    basePath: basePath,
    children: /*#__PURE__*/jsx(NotFoundBoundary, {
      fallback: /*#__PURE__*/jsx(PageRoot, {
        children: /*#__PURE__*/jsx(PageBody, {
          children: /*#__PURE__*/jsx(EmptyState, {
            icon: fileX2Icon,
            title: "Not found",
            message: "This page could not be found."
          })
        })
      }),
      children: parsedParams === null ? /*#__PURE__*/jsx(AlwaysNotFound, {}) : parsedParams.collection ? parsedParams.kind === 'create' ? /*#__PURE__*/jsx(CreateItemWrapper, {
        collection: parsedParams.collection,
        config: config,
        basePath: basePath
      }, parsedParams.collection) : parsedParams.kind === 'edit' ? /*#__PURE__*/jsx(ItemPageOuterWrapper, {
        collection: parsedParams.collection,
        basePath: basePath,
        config: config,
        itemSlug: parsedParams.slug
      }, parsedParams.collection) : /*#__PURE__*/jsx(CollectionPage, {
        basePath: basePath,
        collection: parsedParams.collection,
        config: config
      }, parsedParams.collection) : parsedParams.singleton ? /*#__PURE__*/jsx(SingletonPageWrapper, {
        config: config,
        singleton: parsedParams.singleton
      }, parsedParams.singleton) : /*#__PURE__*/jsx(DashboardPage, {
        config: config,
        basePath: basePath
      })
    })
  }));
}
function AlwaysNotFound() {
  notFound();
}
function AuthWrapper(props) {
  const [state, setState] = useState('unknown');
  const router = useRouter();
  useEffect(() => {
    getAuth(props.config).then(auth => {
      if (auth) {
        setState('valid');
        return;
      }
      setState('explicit-auth');
    });
  }, [props.config]);
  if (state === 'valid') {
    return props.children;
  }
  if (state === 'explicit-auth') {
    var _props$config$ui;
    if (props.config.storage.kind === 'github') {
      return /*#__PURE__*/jsx(Flex, {
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        children: /*#__PURE__*/jsxs(Button, {
          href: `/api/keystatic/github/login${router.params.length ? `?${new URLSearchParams({
            from: router.params.map(encodeURIComponent).join('/')
          })}` : ''}`
          // even though we'll never be in an iframe, so this isn't really distinct from _self
          // it makes react-aria avoid using client-side routing which we need here
          ,
          target: "_top",
          children: [/*#__PURE__*/jsx(Icon, {
            src: githubIcon
          }), /*#__PURE__*/jsx(Text, {
            children: "Log in with GitHub"
          })]
        })
      });
    }
    if (props.config.storage.kind === 'cloud') {
      return /*#__PURE__*/jsx(RedirectToCloudLogin, {
        config: props.config,
        from: router.params
      });
    }
    if (props.config.storage.kind === 'local' && (_props$config$ui = props.config.ui) !== null && _props$config$ui !== void 0 && _props$config$ui.localAuth) {
      return /*#__PURE__*/jsx(LocalLogin, {
        config: props.config
      });
    }
  }
  return null;
}
function LocalLogin(props) {
  var _props$config$ui2;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const project = (_props$config$ui2 = props.config.ui) === null || _props$config$ui2 === void 0 || (_props$config$ui2 = _props$config$ui2.localAuth) === null || _props$config$ui2 === void 0 ? void 0 : _props$config$ui2.project;
  async function submit(event) {
    event.preventDefault();
    if (!project) return;
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/keystatic/local/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password,
          project_id: project
        })
      });
      if (!response.ok) {
        setError('Usuário, senha ou acesso ao projeto inválido.');
        return;
      }
      window.location.reload();
    } catch {
      setError('Não foi possível acessar o serviço de autenticação.');
    } finally {
      setSubmitting(false);
    }
  }
  return /*#__PURE__*/jsx(Flex, {
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    children: /*#__PURE__*/jsxs("form", {
      onSubmit: submit,
      style: {
        display: 'grid',
        gap: '1rem',
        minWidth: '20rem'
      },
      children: [/*#__PURE__*/jsxs("div", {
        children: [/*#__PURE__*/jsx("h1", {
          children: "Entrar no Keystatic"
        }), /*#__PURE__*/jsx("p", {
          children: "Use a conta local criada pelo administrador deste projeto."
        })]
      }), /*#__PURE__*/jsxs("label", {
        children: ["Usu\xE1rio", /*#__PURE__*/jsx("input", {
          autoComplete: "username",
          disabled: submitting,
          onChange: event => setUsername(event.target.value),
          required: true,
          value: username
        })]
      }), /*#__PURE__*/jsxs("label", {
        children: ["Senha", /*#__PURE__*/jsx("input", {
          autoComplete: "current-password",
          disabled: submitting,
          minLength: 12,
          onChange: event => setPassword(event.target.value),
          required: true,
          type: "password",
          value: password
        })]
      }), error && /*#__PURE__*/jsx("p", {
        role: "alert",
        children: error
      }), /*#__PURE__*/jsx("button", {
        disabled: submitting,
        type: "submit",
        children: submitting ? 'Entrando…' : 'Entrar'
      })]
    })
  });
}
function LocalSetup(props) {
  var _props$config$ui3, _props$config$ui4;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [bootstrapToken, setBootstrapToken] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const project = (_props$config$ui3 = props.config.ui) === null || _props$config$ui3 === void 0 || (_props$config$ui3 = _props$config$ui3.localAuth) === null || _props$config$ui3 === void 0 ? void 0 : _props$config$ui3.project;
  const repository = (_props$config$ui4 = props.config.ui) === null || _props$config$ui4 === void 0 || (_props$config$ui4 = _props$config$ui4.localAuth) === null || _props$config$ui4 === void 0 ? void 0 : _props$config$ui4.repository;
  async function submit(event) {
    event.preventDefault();
    if (!project || !repository) {
      setError('O projeto ou repositório autorizado não está configurado.');
      return;
    }
    if (password !== passwordConfirmation) {
      setError('As senhas não coincidem.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/keystatic/local/register', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Bootstrap': bootstrapToken
        },
        body: JSON.stringify({
          username,
          password,
          project_id: project,
          site_url: window.location.origin,
          github_repository: repository
        })
      });
      if (!response.ok) {
        setError('Não foi possível criar o administrador. Confirme o token e se o bootstrap ainda está disponível.');
        return;
      }
      window.location.assign('/keystatic');
    } catch {
      setError('Não foi possível acessar o serviço de autenticação.');
    } finally {
      setSubmitting(false);
    }
  }
  return /*#__PURE__*/jsx(Flex, {
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    children: /*#__PURE__*/jsxs("form", {
      onSubmit: submit,
      style: {
        display: 'grid',
        gap: '1rem',
        minWidth: '20rem'
      },
      children: [/*#__PURE__*/jsxs("div", {
        children: [/*#__PURE__*/jsx("h1", {
          children: "Criar o primeiro administrador"
        }), /*#__PURE__*/jsx("p", {
          children: "Este cadastro s\xF3 funciona uma vez. Use o token de bootstrap fornecido pelo operador da API; ele n\xE3o \xE9 armazenado no navegador."
        })]
      }), /*#__PURE__*/jsxs("label", {
        children: ["Usu\xE1rio", /*#__PURE__*/jsx("input", {
          autoComplete: "username",
          disabled: submitting,
          minLength: 3,
          onChange: event => setUsername(event.target.value),
          required: true,
          value: username
        })]
      }), /*#__PURE__*/jsxs("label", {
        children: ["Senha", /*#__PURE__*/jsx("input", {
          autoComplete: "new-password",
          disabled: submitting,
          minLength: 12,
          onChange: event => setPassword(event.target.value),
          required: true,
          type: "password",
          value: password
        })]
      }), /*#__PURE__*/jsxs("label", {
        children: ["Confirmar senha", /*#__PURE__*/jsx("input", {
          autoComplete: "new-password",
          disabled: submitting,
          minLength: 12,
          onChange: event => setPasswordConfirmation(event.target.value),
          required: true,
          type: "password",
          value: passwordConfirmation
        })]
      }), /*#__PURE__*/jsxs("label", {
        children: ["Token de bootstrap", /*#__PURE__*/jsx("input", {
          autoComplete: "off",
          disabled: submitting,
          onChange: event => setBootstrapToken(event.target.value),
          required: true,
          type: "password",
          value: bootstrapToken
        })]
      }), error && /*#__PURE__*/jsx("p", {
        role: "alert",
        children: error
      }), /*#__PURE__*/jsx("button", {
        disabled: submitting,
        type: "submit",
        children: submitting ? 'Criando…' : 'Criar administrador'
      })]
    })
  });
}
function RedirectToCloudLogin(props) {
  useEffect(() => {
    redirectToCloudAuth(props.from.map(encodeURIComponent).join('/'), props.config);
  }, [props.config, props.from]);
  return null;
}

/**
 * Use loopback instead of localhost to follow OAuth best practices.
 * Learn more: https://datatracker.ietf.org/doc/html/rfc8252#section-8.3
 */
function RedirectToLoopback(props) {
  useEffect(() => {
    if (window.location.hostname === 'localhost') {
      window.location.href = window.location.href.replace('localhost', '127.0.0.1');
    }
  }, []);
  if (window.location.hostname === 'localhost') {
    return null;
  }
  return props.children;
}
function Keystatic(props) {
  if (props.config.storage.kind === 'github') {
    assertValidRepoConfig(props.config.storage.repo);
  }

  // The loopback redirect is only needed if the storage uses OAuth callbacks.
  const Wrapper = props.config.storage.kind === 'local' ? Fragment$1 : RedirectToLoopback;
  return /*#__PURE__*/jsx(ClientOnly, {
    children: /*#__PURE__*/jsx(Wrapper, {
      children: /*#__PURE__*/jsx(AppSlugProvider, {
        value: props.appSlug,
        children: /*#__PURE__*/jsx(RouterProvider, {
          children: /*#__PURE__*/jsx(Provider, {
            config: props.config,
            children: /*#__PURE__*/jsx(PageInner, {
              config: props.config
            })
          })
        })
      })
    })
  });
}
function ClientOnly(props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return props.children;
}

export { Keystatic };
