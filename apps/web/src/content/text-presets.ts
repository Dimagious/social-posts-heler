import type { TextStyle } from '@mint/core';

export type PresetLanguage = 'en' | 'ru';
export type PresetCategory = 'hook' | 'body' | 'cta';
export type PresetGoal = 'reach' | 'engagement' | 'conversion';
export type PresetFormat = 'universal' | 'reel' | 'carousel' | 'story';
export type PresetTone = 'personal' | 'expert' | 'direct';

interface LocalizedString {
  en: string;
  ru: string;
}

export interface TextPreset {
  readonly id: string;
  readonly category: PresetCategory;
  readonly goal: PresetGoal;
  readonly format: PresetFormat;
  readonly tone: PresetTone;
  readonly title: LocalizedString;
  readonly text: LocalizedString;
  readonly placement: {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
  };
  readonly style: Partial<TextStyle>;
}

const BASE_PRESET_STYLE: TextStyle = {
  fontFamily: 'Inter',
  fontSize: 56,
  fontWeight: 700,
  color: '#ffffff',
  opacity: 1,
  textAlign: 'left',
  lineHeight: 1.15,
  letterSpacing: 0,
  shadow: null,
  stroke: null,
  background: null,
};

export function mergePresetStyle(overrides: Partial<TextStyle>): TextStyle {
  return {
    ...BASE_PRESET_STYLE,
    ...overrides,
    shadow:
      overrides.shadow === undefined
        ? BASE_PRESET_STYLE.shadow
        : overrides.shadow,
    stroke:
      overrides.stroke === undefined
        ? BASE_PRESET_STYLE.stroke
        : overrides.stroke,
    background:
      overrides.background === undefined
        ? BASE_PRESET_STYLE.background
        : overrides.background,
  };
}

export function getPresetText(
  preset: TextPreset,
  language: PresetLanguage,
): string {
  return preset.text[language];
}

export function getPresetTitle(
  preset: TextPreset,
  language: PresetLanguage,
): string {
  return preset.title[language];
}

export const TEXT_PRESETS: readonly TextPreset[] = [
  {
    id: 'hook-vacation-build',
    category: 'hook',
    goal: 'reach',
    format: 'story',
    tone: 'personal',
    title: {
      en: 'Vacation build story',
      ru: 'История про отпуск',
    },
    text: {
      en: 'I built this app on vacation with a laptop on my knees.\nHere is what happened next.',
      ru: 'Я собрал это приложение в отпуске буквально на коленках.\nА вот что было дальше.',
    },
    placement: { x: 90, y: 260, width: 900, height: 360 },
    style: {
      fontSize: 76,
      textAlign: 'center',
      lineHeight: 1.05,
      background: {
        color: 'rgba(0,0,0,0.55)',
        padding: 18,
        borderRadius: 8,
      },
    },
  },
  {
    id: 'hook-3-mistakes',
    category: 'hook',
    goal: 'reach',
    format: 'carousel',
    tone: 'expert',
    title: {
      en: 'Three mistakes',
      ru: 'Три ошибки',
    },
    text: {
      en: '3 mistakes that kill your social reach in 2026',
      ru: '3 ошибки, которые убивают охваты в 2026',
    },
    placement: { x: 90, y: 130, width: 900, height: 210 },
    style: {
      fontSize: 74,
      fontWeight: 900,
      textAlign: 'center',
      shadow: {
        offsetX: 0,
        offsetY: 2,
        blur: 12,
        color: 'rgba(0,0,0,0.45)',
      },
    },
  },
  {
    id: 'hook-contrarian',
    category: 'hook',
    goal: 'engagement',
    format: 'universal',
    tone: 'expert',
    title: {
      en: 'Contrarian opener',
      ru: 'Контрарный заход',
    },
    text: {
      en: 'Hot take: you do NOT need expensive tools to make posts people save.',
      ru: 'Спорный тезис: вам НЕ нужны дорогие сервисы, чтобы делать сохраняемые посты.',
    },
    placement: { x: 90, y: 130, width: 900, height: 240 },
    style: {
      fontSize: 62,
      fontWeight: 700,
      textAlign: 'left',
    },
  },
  {
    id: 'hook-pattern-break',
    category: 'hook',
    goal: 'reach',
    format: 'reel',
    tone: 'direct',
    title: {
      en: 'Pattern break',
      ru: 'Pattern break',
    },
    text: {
      en: 'Stop scrolling.\nSteal this post template before your competitors do.',
      ru: 'Стоп скролл.\nЗабери этот шаблон поста раньше конкурентов.',
    },
    placement: { x: 90, y: 200, width: 900, height: 260 },
    style: {
      fontSize: 68,
      textAlign: 'center',
      stroke: { width: 1.5, color: '#111111' },
    },
  },
  {
    id: 'hook-identity',
    category: 'hook',
    goal: 'engagement',
    format: 'universal',
    tone: 'personal',
    title: {
      en: 'Identity trigger',
      ru: 'Триггер идентичности',
    },
    text: {
      en: 'If you are a solo creator with zero design team,\nthis workflow is for you.',
      ru: 'Если ты соло-креатор и без дизайн-команды,\nэтот процесс для тебя.',
    },
    placement: { x: 90, y: 160, width: 900, height: 260 },
    style: {
      fontSize: 58,
      fontWeight: 700,
      textAlign: 'left',
    },
  },
  {
    id: 'hook-proof',
    category: 'hook',
    goal: 'conversion',
    format: 'carousel',
    tone: 'expert',
    title: {
      en: 'Proof hook',
      ru: 'Хук с пруфом',
    },
    text: {
      en: 'I tested this format on 12 posts.\nSaves doubled.',
      ru: 'Я протестировал этот формат на 12 постах.\nСохранения выросли в 2 раза.',
    },
    placement: { x: 90, y: 140, width: 900, height: 250 },
    style: {
      fontSize: 62,
      textAlign: 'center',
      background: {
        color: 'rgba(20,20,20,0.65)',
        padding: 14,
        borderRadius: 8,
      },
    },
  },
  {
    id: 'body-problem-solution',
    category: 'body',
    goal: 'engagement',
    format: 'universal',
    tone: 'expert',
    title: {
      en: 'Problem -> solution',
      ru: 'Проблема -> решение',
    },
    text: {
      en: 'Problem: {pain}\nFix: {solution}\nResult: {result}',
      ru: 'Проблема: {pain}\nРешение: {solution}\nРезультат: {result}',
    },
    placement: { x: 120, y: 460, width: 840, height: 280 },
    style: {
      fontSize: 50,
      fontWeight: 600,
      lineHeight: 1.2,
    },
  },
  {
    id: 'body-steps',
    category: 'body',
    goal: 'reach',
    format: 'carousel',
    tone: 'direct',
    title: {
      en: 'Three-step flow',
      ru: 'Схема из 3 шагов',
    },
    text: {
      en: '1) Pick background\n2) Add hook + body + CTA\n3) Export and post today',
      ru: '1) Выбери фон\n2) Добавь хук + основу + CTA\n3) Экспортируй и публикуй сегодня',
    },
    placement: { x: 120, y: 420, width: 840, height: 320 },
    style: {
      fontSize: 48,
      fontWeight: 700,
      lineHeight: 1.25,
    },
  },
  {
    id: 'body-story-arc',
    category: 'body',
    goal: 'engagement',
    format: 'story',
    tone: 'personal',
    title: {
      en: 'Mini story arc',
      ru: 'Мини-арка истории',
    },
    text: {
      en: 'Context: {where/when}\nConflict: {challenge}\nShift: {what changed}',
      ru: 'Контекст: {где/когда}\nСложность: {проблема}\nПоворот: {что изменилось}',
    },
    placement: { x: 100, y: 740, width: 880, height: 360 },
    style: {
      fontSize: 52,
      fontWeight: 600,
      background: {
        color: 'rgba(0,0,0,0.45)',
        padding: 12,
        borderRadius: 10,
      },
    },
  },
  {
    id: 'body-proof-stack',
    category: 'body',
    goal: 'conversion',
    format: 'universal',
    tone: 'expert',
    title: {
      en: 'Proof stack',
      ru: 'Блок доказательств',
    },
    text: {
      en: 'Used by: {who}\nOutcome: {result}\nTime to create: {time}',
      ru: 'Кто использует: {who}\nРезультат: {result}\nВремя создания: {time}',
    },
    placement: { x: 110, y: 450, width: 860, height: 280 },
    style: {
      fontSize: 46,
      fontWeight: 600,
      textAlign: 'left',
    },
  },
  {
    id: 'body-why-to-buy',
    category: 'body',
    goal: 'conversion',
    format: 'carousel',
    tone: 'expert',
    title: {
      en: 'Why-to-buy block',
      ru: 'Блок why-to-buy',
    },
    text: {
      en: 'Why now: {reason}\nWhy this: {benefit}\nWhy trust me: {proof}',
      ru: 'Почему сейчас: {reason}\nПочему это: {benefit}\nПочему мне верить: {proof}',
    },
    placement: { x: 120, y: 450, width: 840, height: 300 },
    style: {
      fontSize: 46,
      fontWeight: 600,
      lineHeight: 1.25,
    },
  },
  {
    id: 'body-checklist',
    category: 'body',
    goal: 'engagement',
    format: 'story',
    tone: 'direct',
    title: {
      en: 'Quick checklist',
      ru: 'Быстрый чеклист',
    },
    text: {
      en: 'Done this?\n[ ] Clear hook\n[ ] One key message\n[ ] One CTA',
      ru: 'Сделано?\n[ ] Понятный хук\n[ ] Одна главная мысль\n[ ] Один CTA',
    },
    placement: { x: 90, y: 770, width: 900, height: 300 },
    style: {
      fontSize: 50,
      fontWeight: 700,
      background: {
        color: 'rgba(0,0,0,0.5)',
        padding: 12,
        borderRadius: 10,
      },
    },
  },
  {
    id: 'cta-save-share',
    category: 'cta',
    goal: 'engagement',
    format: 'carousel',
    tone: 'direct',
    title: {
      en: 'Save and share CTA',
      ru: 'CTA на сохранение и репост',
    },
    text: {
      en: 'Save this post and send it to one creator friend.',
      ru: 'Сохрани пост и отправь его одному другу-креатору.',
    },
    placement: { x: 110, y: 910, width: 860, height: 140 },
    style: {
      fontSize: 44,
      fontWeight: 700,
      textAlign: 'center',
      color: '#ffe082',
    },
  },
  {
    id: 'cta-comment-keyword',
    category: 'cta',
    goal: 'engagement',
    format: 'reel',
    tone: 'direct',
    title: {
      en: 'Comment keyword CTA',
      ru: 'CTA на комментарий',
    },
    text: {
      en: "Comment 'MINT' and I will send you the template.",
      ru: "Напиши в комментах 'MINT' и я отправлю шаблон.",
    },
    placement: { x: 110, y: 900, width: 860, height: 160 },
    style: {
      fontSize: 46,
      fontWeight: 800,
      textAlign: 'center',
      background: {
        color: 'rgba(255,101,132,0.28)',
        padding: 10,
        borderRadius: 10,
      },
    },
  },
  {
    id: 'cta-link-bio',
    category: 'cta',
    goal: 'conversion',
    format: 'story',
    tone: 'direct',
    title: {
      en: 'Link in bio CTA',
      ru: 'CTA со ссылкой в био',
    },
    text: {
      en: 'Free tool. Link in bio.\nIf it helps you, buy me a coffee.',
      ru: 'Инструмент бесплатный. Ссылка в био.\nЕсли помогло - угости меня кофе.',
    },
    placement: { x: 100, y: 1480, width: 880, height: 240 },
    style: {
      fontSize: 50,
      fontWeight: 700,
      textAlign: 'center',
      lineHeight: 1.15,
    },
  },
  {
    id: 'cta-dm',
    category: 'cta',
    goal: 'conversion',
    format: 'universal',
    tone: 'personal',
    title: {
      en: 'DM CTA',
      ru: 'CTA в директ',
    },
    text: {
      en: 'Want the setup file? DM me: {keyword}',
      ru: 'Нужен файл-настройка? Напиши в директ: {keyword}',
    },
    placement: { x: 110, y: 880, width: 860, height: 140 },
    style: {
      fontSize: 44,
      fontWeight: 700,
      textAlign: 'center',
    },
  },
  {
    id: 'cta-follow-series',
    category: 'cta',
    goal: 'reach',
    format: 'story',
    tone: 'expert',
    title: {
      en: 'Follow for series',
      ru: 'Подписка на серию',
    },
    text: {
      en: 'Follow for part 2:\nmy full workflow from idea to post.',
      ru: 'Подпишись на часть 2:\nпокажу весь путь от идеи до поста.',
    },
    placement: { x: 110, y: 1460, width: 860, height: 230 },
    style: {
      fontSize: 48,
      fontWeight: 700,
      textAlign: 'center',
      background: {
        color: 'rgba(0,0,0,0.48)',
        padding: 10,
        borderRadius: 10,
      },
    },
  },
  {
    id: 'cta-trial',
    category: 'cta',
    goal: 'conversion',
    format: 'carousel',
    tone: 'direct',
    title: {
      en: 'Try now CTA',
      ru: 'CTA попробовать сейчас',
    },
    text: {
      en: 'Try it free today.\nBuild your first post in 5 minutes.',
      ru: 'Попробуй бесплатно сегодня.\nСобери первый пост за 5 минут.',
    },
    placement: { x: 120, y: 900, width: 840, height: 170 },
    style: {
      fontSize: 48,
      fontWeight: 800,
      textAlign: 'center',
      color: '#b3e5fc',
    },
  },
] as const;
