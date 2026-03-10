import { describe, it, expect } from 'vitest';
import { createDefaultDocument, createTextLayer } from '@mint/core';
import { isEditorDocument } from './document-validation';

describe('isEditorDocument', () => {
  it('accepts a valid document', () => {
    const doc = {
      ...createDefaultDocument(),
      layers: [createTextLayer()],
    };

    expect(isEditorDocument(doc)).toBe(true);
  });

  it('rejects documents without a valid background object', () => {
    const invalid = {
      ...createDefaultDocument(),
      background: undefined,
    };

    expect(isEditorDocument(invalid)).toBe(false);
  });

  it('rejects layers with missing style', () => {
    const invalid = {
      ...createDefaultDocument(),
      layers: [
        {
          id: 'layer-1',
          text: 'Hello',
          x: 0,
          y: 0,
          width: 300,
          height: 100,
          rotation: 0,
          visible: true,
          locked: false,
        },
      ],
    };

    expect(isEditorDocument(invalid)).toBe(false);
  });
});
