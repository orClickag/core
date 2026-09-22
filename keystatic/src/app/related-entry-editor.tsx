import { Button, ButtonGroup } from '@keystar/ui/button';
import { Dialog, DialogContainer } from '@keystar/ui/dialog';
import { Flex } from '@keystar/ui/layout';
import { Notice } from '@keystar/ui/notice';
import { ProgressCircle } from '@keystar/ui/progress';
import { Content } from '@keystar/ui/slots';
import { Heading } from '@keystar/ui/typography';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { clientSideValidateProp } from '../form/errors';
import { FormForEntry } from './entry-form';
import {
  getCollectionFormat,
  getCollectionItemPath,
  getSlugFromState,
} from './utils';
import { useConfig } from './shell/context';
import { useCollection, usePreviewProps } from './preview-props';
import { useItemData } from './useItemData';
import { useSlugFieldInfo } from './slugs';
import { useUpsertItem } from './updating';
import { useEventCallback } from '../form/fields/document/DocumentEditor/ui-utils';
import { ComponentSchema } from '../form/api';

export const RelatedEntryContext = createContext<ReadonlySet<string>>(
  new Set()
);

export function getRelatedEntryCreatePath(collection: string) {
  return `/keystatic/collection/${encodeURIComponent(collection)}/create`;
}

export function getRelatedEntryKey(collection: string, slug: string) {
  return `${collection}:${slug}`;
}

export function isRelatedEntryRecursive(
  entries: ReadonlySet<string>,
  collection: string,
  slug: string | undefined
) {
  return (
    slug !== undefined && entries.has(getRelatedEntryKey(collection, slug))
  );
}

export function findRelationshipField(schema: Record<string, ComponentSchema>) {
  const entry = Object.entries(schema).find(
    ([, field]) =>
      field.kind === 'form' &&
      'relationship' in field &&
      field.relationship !== undefined
  );
  if (
    !entry ||
    entry[1].kind !== 'form' ||
    !('relationship' in entry[1]) ||
    entry[1].relationship === undefined
  ) {
    return undefined;
  }
  return { field: entry[0], collection: entry[1].relationship.collection };
}

export function RelatedEntryEditor(props: {
  collection: string;
  slug: string;
  onClose: () => void;
}) {
  const config = useConfig();
  const { collectionConfig, schema } = useCollection(props.collection);
  const format = getCollectionFormat(config, props.collection);
  const slugField = useSlugFieldInfo(props.collection, props.slug);
  const relatedSlug = useMemo(
    () => ({ field: collectionConfig.slugField, slug: props.slug }),
    [collectionConfig.slugField, props.slug]
  );
  const itemData = useItemData({
    config,
    dirpath: getCollectionItemPath(config, props.collection, props.slug),
    format,
    schema: collectionConfig.schema,
    slug: relatedSlug,
  });
  const [state, setState] = useState<Record<string, unknown> | undefined>();
  const [forceValidation, setForceValidation] = useState(false);

  useEffect(() => {
    if (
      state === undefined &&
      itemData.kind === 'loaded' &&
      itemData.data !== 'not-found'
    ) {
      setState(itemData.data.initialState);
    }
  }, [itemData, state]);

  const editingState = state ?? {};
  const previewProps = usePreviewProps(
    schema,
    useCallback(update => setState(update), []),
    editingState
  );
  const slug =
    state === undefined
      ? props.slug
      : getSlugFromState(collectionConfig, editingState) || props.slug;
  const basePath = getCollectionItemPath(config, props.collection, slug);
  const [updateResult, update] = useUpsertItem({
    state: editingState,
    initialFiles:
      itemData.kind === 'loaded' && itemData.data !== 'not-found'
        ? itemData.data.initialFiles
        : [],
    config,
    schema: collectionConfig.schema,
    basePath,
    format,
    currentLocalTreeKey:
      itemData.kind === 'loaded' && itemData.data !== 'not-found'
        ? itemData.data.localTreeKey
        : undefined,
    slug: {
      field: collectionConfig.slugField,
      value: slug,
    },
  });

  const save = useEventCallback(async () => {
    if (
      itemData.kind !== 'loaded' ||
      itemData.data === 'not-found' ||
      state === undefined
    ) {
      return;
    }
    if (!clientSideValidateProp(schema, state, slugField)) {
      setForceValidation(true);
      return;
    }
    if (await update()) {
      props.onClose();
    }
  });

  return (
    <Dialog width="container.large">
      <Heading>Edit {props.slug}</Heading>
      {itemData.kind === 'loading' && (
        <Flex
          alignItems="center"
          justifyContent="center"
          minHeight="scale.3000"
        >
          <ProgressCircle
            aria-label="Loading component"
            isIndeterminate
            size="large"
          />
        </Flex>
      )}
      {itemData.kind === 'loaded' && itemData.data === 'not-found' && (
        <Notice tone="caution">
          Component not found. The reference can be removed or replaced.
        </Notice>
      )}
      {itemData.kind === 'error' && (
        <Notice tone="critical">{itemData.error.message}</Notice>
      )}
      {updateResult.kind === 'error' && (
        <Notice tone="critical">{updateResult.error.message}</Notice>
      )}
      {itemData.kind === 'loaded' &&
        itemData.data !== 'not-found' &&
        state !== undefined && (
          <Content>
            <FormForEntry
              previewProps={previewProps as any}
              forceValidation={forceValidation}
              entryLayout={collectionConfig.entryLayout}
              contentPaneSize={640}
              formatInfo={format}
              slugField={slugField}
            />
          </Content>
        )}
      <ButtonGroup>
        <Button onPress={props.onClose}>Cancel</Button>
        <Button
          prominence="high"
          onPress={save}
          isDisabled={
            updateResult.kind === 'loading' ||
            itemData.kind !== 'loaded' ||
            itemData.data === 'not-found' ||
            state === undefined
          }
        >
          {updateResult.kind === 'loading' ? 'Saving…' : 'Save'}
        </Button>
      </ButtonGroup>
    </Dialog>
  );
}

export function RelatedEntryDialog(props: {
  collection: string;
  slug: string;
  onDismiss: () => void;
}) {
  const parentEntries = useContext(RelatedEntryContext);
  const entryKey = getRelatedEntryKey(props.collection, props.slug);
  const entries = new Set(parentEntries);
  entries.add(entryKey);
  return (
    <DialogContainer onDismiss={props.onDismiss}>
      <RelatedEntryContext.Provider value={entries}>
        <RelatedEntryEditor {...props} onClose={props.onDismiss} />
      </RelatedEntryContext.Provider>
    </DialogContainer>
  );
}
