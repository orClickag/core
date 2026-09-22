/** @vitest-environment jsdom */
import { describe, expect, test } from 'vitest';
import { fields } from '../form/api';
import {
  findRelationshipField,
  getRelatedEntryCreatePath,
  getRelatedEntryKey,
  isRelatedEntryRecursive,
} from './related-entry-editor';

describe('findRelationshipField', () => {
  test('returns the collection metadata for a relationship field', () => {
    expect(
      findRelationshipField({
        component: fields.relationship({
          label: 'Component',
          collection: 'components',
        }),
      })
    ).toEqual({ field: 'component', collection: 'components' });
  });

  test('ignores regular fields', () => {
    expect(
      findRelationshipField({ title: fields.text({ label: 'Title' }) })
    ).toBeUndefined();
  });

  test('builds the related collection create path safely', () => {
    expect(getRelatedEntryCreatePath('marketing components')).toBe(
      '/keystatic/collection/marketing%20components/create'
    );
  });

  test('detects only an entry already open in the reference context', () => {
    const entries = new Set([getRelatedEntryKey('components', 'header')]);

    expect(isRelatedEntryRecursive(entries, 'components', 'header')).toBe(true);
    expect(isRelatedEntryRecursive(entries, 'components', 'cta')).toBe(false);
    expect(isRelatedEntryRecursive(entries, 'components', undefined)).toBe(
      false
    );
  });
});
