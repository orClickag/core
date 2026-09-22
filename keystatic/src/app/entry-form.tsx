import { Box } from '@keystar/ui/layout';
import {
  SplitView,
  SplitPanePrimary,
  SplitPaneSecondary,
} from '@keystar/ui/split-view';
import { ReactNode, createContext, useContext } from 'react';

import { ReadonlyPropPath } from '../form/fields/document/DocumentEditor/component-blocks/utils';
import {
  AddToPathProvider,
  PathContextProvider,
  SlugFieldInfo,
  SlugFieldProvider,
} from '../form/fields/text/path-slug-context';
import {
  InnerFormValueContentFromPreviewProps,
  FormValueContentFromPreviewProps,
} from '../form/form-from-preview';
import {
  GenericPreviewProps,
  ObjectField,
  ComponentSchema,
  Collection,
  Singleton,
} from '..';
import { FormatInfo } from './path-utils';
import { ScrollView } from './shell/primitives';
import { PageContainer } from './shell/page';
import { useContentPanelQuery } from './shell/context';

const emptyArray: ReadonlyPropPath = [];
const RESPONSIVE_PADDING = {
  mobile: 'medium',
  tablet: 'xlarge',
  desktop: 'xxlarge',
};

export function containerWidthForEntryLayout(
  config: Collection<any, any> | Singleton<any>
) {
  return config.entryLayout === 'content' ? 'none' : 'medium';
}

const EntryLayoutSplitPaneContext = createContext<'main' | 'side' | null>(null);
export function useEntryLayoutSplitPaneContext() {
  return useContext(EntryLayoutSplitPaneContext);
}

export function ResetEntryLayoutContext(props: { children: ReactNode }) {
  return (
    <EntryLayoutSplitPaneContext.Provider value={null}>
      {props.children}
    </EntryLayoutSplitPaneContext.Provider>
  );
}

function isPreviewPropsKind<Kind extends ComponentSchema['kind']>(
  props: GenericPreviewProps<ComponentSchema, unknown>,
  kind: Kind
): props is GenericPreviewProps<
  Extract<ComponentSchema, { kind: Kind }>,
  unknown
> {
  return props.schema.kind === kind;
}

export function FormForEntry({
  formatInfo,
  forceValidation,
  slugField,
  entryLayout,
  contentPaneSize,
  previewUrl,
  previewProps: props,
}: {
  previewProps: GenericPreviewProps<
    ObjectField<Record<string, ComponentSchema>>,
    unknown
  >;
  formatInfo: FormatInfo;
  entryLayout: 'content' | 'form' | undefined;
  forceValidation: boolean | undefined;
  slugField: SlugFieldInfo | undefined;
  contentPaneSize?: number;
  previewUrl?: string;
}) {
  const isAboveMobile = useContentPanelQuery({ above: 'mobile' });

  if (entryLayout === 'content' && formatInfo.contentField && isAboveMobile) {
    const { contentField } = formatInfo;
    let contentFieldProps: GenericPreviewProps<ComponentSchema, unknown> =
      props;
    for (const key of contentField.path) {
      if (isPreviewPropsKind(contentFieldProps, 'object')) {
        contentFieldProps = contentFieldProps.fields[key];
        continue;
      }
      if (isPreviewPropsKind(contentFieldProps, 'conditional')) {
        if (key !== 'value') {
          throw new Error(
            'Conditional fields referenced in a contentField path must only reference the value field.'
          );
        }
        contentFieldProps = contentFieldProps.value;
        continue;
      }
      throw new Error(
        `Path specified in contentField does not point to a content field`
      );
    }
    return (
      <PathContextProvider value={emptyArray}>
        <SlugFieldProvider value={slugField}>
          <SplitView
            autoSaveId={
              contentPaneSize === undefined
                ? 'keystatic-content-split-view'
                : undefined
            }
            defaultSize={contentPaneSize ?? 320}
            minSize={contentPaneSize === undefined ? 240 : 480}
            maxSize={contentPaneSize === undefined ? 480 : 800}
            flex
          >
            <SplitPaneSecondary>
              <EntryLayoutSplitPaneContext.Provider value="main">
                <ScrollView>
                  <AddToPathProvider part={contentField.path}>
                    <InnerFormValueContentFromPreviewProps
                      forceValidation={forceValidation}
                      previewUrl={previewUrl}
                      {...contentFieldProps}
                    />
                  </AddToPathProvider>
                </ScrollView>
              </EntryLayoutSplitPaneContext.Provider>
            </SplitPaneSecondary>
            <SplitPanePrimary>
              <EntryLayoutSplitPaneContext.Provider value="side">
                <ScrollView>
                  <Box padding={RESPONSIVE_PADDING}>
                    <InnerFormValueContentFromPreviewProps
                      forceValidation={forceValidation}
                      omitFieldAtPath={contentField.path}
                      previewUrl={previewUrl}
                      {...props}
                    />
                  </Box>
                </ScrollView>
              </EntryLayoutSplitPaneContext.Provider>
            </SplitPanePrimary>
          </SplitView>
        </SlugFieldProvider>
      </PathContextProvider>
    );
  }

  return (
    <ScrollView>
      <PageContainer paddingY={RESPONSIVE_PADDING}>
        <FormValueContentFromPreviewProps
          // autoFocus
          forceValidation={forceValidation}
          slugField={slugField}
          previewUrl={previewUrl}
          {...props}
        />
      </PageContainer>
    </ScrollView>
  );
}
