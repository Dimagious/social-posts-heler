import type {
  EditorDocument,
  TextLayerData,
  TextStyle,
  TextShadow,
  TextStroke,
  TextBackground,
  BackgroundData,
} from '@mint/core';
import { CANVAS_PRESETS } from '@mint/core';

const PRESET_IDS: ReadonlySet<string> = new Set(
  CANVAS_PRESETS.map((p) => p.id),
);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

function isTextShadow(value: unknown): value is TextShadow {
  if (!isRecord(value)) return false;
  return (
    isFiniteNumber(value.offsetX) &&
    isFiniteNumber(value.offsetY) &&
    isFiniteNumber(value.blur) &&
    typeof value.color === 'string'
  );
}

function isTextStroke(value: unknown): value is TextStroke {
  if (!isRecord(value)) return false;
  return isFiniteNumber(value.width) && typeof value.color === 'string';
}

function isTextBackground(value: unknown): value is TextBackground {
  if (!isRecord(value)) return false;
  return (
    typeof value.color === 'string' &&
    isFiniteNumber(value.padding) &&
    isFiniteNumber(value.borderRadius)
  );
}

function isTextAlign(value: unknown): value is TextStyle['textAlign'] {
  return value === 'left' || value === 'center' || value === 'right';
}

function isTextStyle(value: unknown): value is TextStyle {
  if (!isRecord(value)) return false;
  return (
    typeof value.fontFamily === 'string' &&
    isFiniteNumber(value.fontSize) &&
    isFiniteNumber(value.fontWeight) &&
    typeof value.color === 'string' &&
    isFiniteNumber(value.opacity) &&
    isTextAlign(value.textAlign) &&
    isFiniteNumber(value.lineHeight) &&
    isFiniteNumber(value.letterSpacing) &&
    (value.shadow === null || isTextShadow(value.shadow)) &&
    (value.stroke === null || isTextStroke(value.stroke)) &&
    (value.background === null || isTextBackground(value.background))
  );
}

function isTextLayer(value: unknown): value is TextLayerData {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === 'string' &&
    typeof value.text === 'string' &&
    isFiniteNumber(value.x) &&
    isFiniteNumber(value.y) &&
    isFiniteNumber(value.width) &&
    isFiniteNumber(value.height) &&
    isFiniteNumber(value.rotation) &&
    isTextStyle(value.style) &&
    isBoolean(value.visible) &&
    isBoolean(value.locked)
  );
}

function isBackground(value: unknown): value is BackgroundData {
  if (!isRecord(value)) return false;
  return (
    (value.dataUrl === null || typeof value.dataUrl === 'string') &&
    (value.fit === 'contain' || value.fit === 'cover') &&
    typeof value.color === 'string'
  );
}

export function isEditorDocument(value: unknown): value is EditorDocument {
  if (!isRecord(value)) return false;

  return (
    typeof value.presetId === 'string' &&
    PRESET_IDS.has(value.presetId) &&
    isBackground(value.background) &&
    Array.isArray(value.layers) &&
    value.layers.every(isTextLayer)
  );
}
