/** @vitest-environment jsdom */
import { render, screen } from '@testing-library/react';
import { KeystarProvider } from '@keystar/ui/core';
import { describe, expect, test } from 'vitest';
import { block } from '../content-components';
import { getInitialPropsValue } from '../form/initial-values';
import { fields } from '../form/api';
import { editorOptionsToConfig } from '../form/fields/markdoc/config';
import { createEditorState } from '../form/fields/markdoc/editor/editor-state';
import { Editor } from '../form/fields/markdoc/editor';
import { toSerialized } from '../form/fields/markdoc/editor/props-serialization';
import { createEditorSchema } from '../form/fields/markdoc/editor/schema';
import { ConfigContext } from './shell/context';
import { config } from '..';

describe('related component editor actions', () => {
  test('shows accessible actions for an empty reference', () => {
    const component = block({
      label: 'Component',
      schema: {
        component: fields.relationship({
          label: 'Component',
          collection: 'components',
        }),
      },
    });
    const editorSchema = createEditorSchema(
      editorOptionsToConfig({}),
      { component },
      false
    ).schema;
    const propsSchema = { kind: 'object' as const, fields: component.schema };
    const state = createEditorState(
      editorSchema.node('doc', null, [
        editorSchema.node('component', {
          props: toSerialized(
            getInitialPropsValue(propsSchema),
            propsSchema.fields
          ),
        }),
      ])
    );

    render(
      <ConfigContext.Provider value={config({ storage: { kind: 'cloud' } })}>
        <KeystarProvider>
          <Editor value={state} onChange={() => {}} />
        </KeystarProvider>
      </ConfigContext.Provider>
    );

    expect(
      screen.getByRole('button', { name: 'Create component in components' })
    ).toBeVisible();
    expect(
      screen.getByRole('button', { name: 'Select a component before editing' })
    ).toBeDisabled();
  });
});
