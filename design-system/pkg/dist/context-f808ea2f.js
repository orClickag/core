import { createContext, useContext } from 'react';
import { jsx } from 'react/jsx-runtime';

/* eslint-disable react-compiler/react-compiler */
const RouterContext = /*#__PURE__*/createContext(null);
const hookIds = new WeakMap();
let nextHookId = 1;
function getHookId(hook) {
  if (hook === undefined) return 0;
  let id = hookIds.get(hook);
  if (id === undefined) {
    id = nextHookId++;
    hookIds.set(hook, id);
  }
  return id;
}
function getRouterHooksKey(router) {
  return `${getHookId(router.usePathname)}:${getHookId(router.useSearch)}`;
}
function RouterContextProvider({
  children,
  router
}) {
  return /*#__PURE__*/jsx(RouterContext.Provider, {
    value: router,
    children: children
  }, getRouterHooksKey(router));
}
function useRouterContext() {
  const context = useContext(RouterContext);
  if (context === null) {
    throw new Error('Router hooks must be used within a KeystarProvider with a router.');
  }
  return context;
}

/** Returns the function configured for client-side navigation. */
function useNavigate() {
  return useRouterContext().navigate;
}

/** Returns the current application-relative pathname. */
function usePathname() {
  const usePathname = useRouterContext().usePathname;
  if (usePathname === undefined) {
    throw new Error('usePathname requires the KeystarProvider router to implement usePathname.');
  }
  return usePathname();
}

/** Returns the current query string, including the leading question mark. */
function useSearch() {
  const useSearch = useRouterContext().useSearch;
  if (useSearch === undefined) {
    throw new Error('useSearch requires the KeystarProvider router to implement useSearch.');
  }
  return useSearch();
}

export { RouterContextProvider as R, usePathname as a, useSearch as b, useNavigate as u };
