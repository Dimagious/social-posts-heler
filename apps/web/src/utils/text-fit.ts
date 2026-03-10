import type { TextLayerData } from '@mint/core';

const MIN_FONT_SIZE = 8;
const MAX_FONT_SIZE = 240;
const FABRIC_CHAR_SPACING_MULTIPLIER = 10;

const measureCanvas =
  typeof window !== 'undefined'
    ? window.document.createElement('canvas')
    : null;
const measureContext = measureCanvas?.getContext('2d') ?? null;

function getMeasureContext(): CanvasRenderingContext2D | null {
  return measureContext;
}

function getLetterSpacingPx(fontSize: number, letterSpacing: number): number {
  // Fabric Textbox interprets charSpacing as 1/1000 em units.
  return (letterSpacing * FABRIC_CHAR_SPACING_MULTIPLIER * fontSize) / 1000;
}

function measureLineWidth(
  ctx: CanvasRenderingContext2D,
  line: string,
  letterSpacingPx: number,
): number {
  if (!line) return 0;
  const measured = ctx.measureText(line).width;
  const spacing = Math.max(0, line.length - 1) * letterSpacingPx;
  return measured + spacing;
}

function maxTextWidthForSize(layer: TextLayerData, fontSize: number): number {
  const ctx = getMeasureContext();
  if (!ctx) return Number.POSITIVE_INFINITY;

  ctx.font = `${layer.style.fontWeight} ${fontSize}px "${layer.style.fontFamily}", sans-serif`;
  const letterSpacingPx = getLetterSpacingPx(
    fontSize,
    layer.style.letterSpacing,
  );
  const lines = layer.text.split('\n');
  const widths = lines.map((line) =>
    measureLineWidth(ctx, line, letterSpacingPx),
  );
  return Math.max(...widths, 0);
}

export function calculateFitFontSize(layer: TextLayerData): number {
  const padding = layer.style.background?.padding ?? 0;
  const targetWidth = Math.max(40, layer.width - padding * 2);

  if (maxTextWidthForSize(layer, MIN_FONT_SIZE) > targetWidth) {
    return MIN_FONT_SIZE;
  }

  let low = MIN_FONT_SIZE;
  let high = MAX_FONT_SIZE;
  let best = layer.style.fontSize;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const width = maxTextWidthForSize(layer, mid);
    if (width <= targetWidth) {
      best = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, best));
}
