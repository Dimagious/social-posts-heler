import React, { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  getPresetText,
  getPresetTitle,
  TEXT_PRESETS,
} from '../content/text-presets';
import type {
  PresetCategory,
  PresetFormat,
  PresetGoal,
  PresetLanguage,
  PresetTone,
  TextPreset,
} from '../content/text-presets';

interface TextPresetDialogProps {
  open: boolean;
  language: PresetLanguage;
  onClose: () => void;
  onApply: (preset: TextPreset) => void;
}

type GoalFilter = 'all' | PresetGoal;
type FormatFilter = 'all' | PresetFormat;
type CategoryFilter = 'all' | PresetCategory;

const CATEGORY_ORDER: PresetCategory[] = ['hook', 'body', 'cta'];

export const TextPresetDialog: React.FC<TextPresetDialogProps> = ({
  open,
  language,
  onClose,
  onApply,
}) => {
  const { t } = useTranslation();
  const [goalFilter, setGoalFilter] = useState<GoalFilter>('all');
  const [formatFilter, setFormatFilter] = useState<FormatFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');

  const filteredPresets = useMemo(() => {
    return TEXT_PRESETS.filter((preset) => {
      const goalMatches = goalFilter === 'all' || preset.goal === goalFilter;
      const formatMatches =
        formatFilter === 'all' || preset.format === formatFilter;
      const categoryMatches =
        categoryFilter === 'all' || preset.category === categoryFilter;
      return goalMatches && formatMatches && categoryMatches;
    });
  }, [goalFilter, formatFilter, categoryFilter]);

  const renderToneChip = (tone: PresetTone) => (
    <Chip
      size="small"
      label={t(`presetsLibrary.tones.${tone}`)}
      color="primary"
      variant="outlined"
    />
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{t('presetsLibrary.title')}</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              {t('presetsLibrary.goal')}
            </Typography>
            <ToggleButtonGroup
              size="small"
              exclusive
              value={goalFilter}
              onChange={(_, value: GoalFilter | null) => {
                if (value) setGoalFilter(value);
              }}
              sx={{ mt: 0.5, flexWrap: 'wrap', gap: 0.5 }}
            >
              <ToggleButton value="all">
                {t('presetsLibrary.filters.all')}
              </ToggleButton>
              <ToggleButton value="reach">
                {t('presetsLibrary.goals.reach')}
              </ToggleButton>
              <ToggleButton value="engagement">
                {t('presetsLibrary.goals.engagement')}
              </ToggleButton>
              <ToggleButton value="conversion">
                {t('presetsLibrary.goals.conversion')}
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              {t('presetsLibrary.format')}
            </Typography>
            <ToggleButtonGroup
              size="small"
              exclusive
              value={formatFilter}
              onChange={(_, value: FormatFilter | null) => {
                if (value) setFormatFilter(value);
              }}
              sx={{ mt: 0.5, flexWrap: 'wrap', gap: 0.5 }}
            >
              <ToggleButton value="all">
                {t('presetsLibrary.filters.all')}
              </ToggleButton>
              <ToggleButton value="universal">
                {t('presetsLibrary.formats.universal')}
              </ToggleButton>
              <ToggleButton value="story">
                {t('presetsLibrary.formats.story')}
              </ToggleButton>
              <ToggleButton value="carousel">
                {t('presetsLibrary.formats.carousel')}
              </ToggleButton>
              <ToggleButton value="reel">
                {t('presetsLibrary.formats.reel')}
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              {t('presetsLibrary.category')}
            </Typography>
            <ToggleButtonGroup
              size="small"
              exclusive
              value={categoryFilter}
              onChange={(_, value: CategoryFilter | null) => {
                if (value) setCategoryFilter(value);
              }}
              sx={{ mt: 0.5, flexWrap: 'wrap', gap: 0.5 }}
            >
              <ToggleButton value="all">
                {t('presetsLibrary.filters.all')}
              </ToggleButton>
              <ToggleButton value="hook">
                {t('presetsLibrary.categories.hook')}
              </ToggleButton>
              <ToggleButton value="body">
                {t('presetsLibrary.categories.body')}
              </ToggleButton>
              <ToggleButton value="cta">
                {t('presetsLibrary.categories.cta')}
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {filteredPresets.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              {t('presetsLibrary.empty')}
            </Typography>
          )}

          {CATEGORY_ORDER.map((category) => {
            const categoryItems = filteredPresets.filter(
              (preset) => preset.category === category,
            );
            if (!categoryItems.length) return null;

            return (
              <Stack key={category} spacing={1}>
                <Typography variant="subtitle2">
                  {t(`presetsLibrary.categories.${category}`)}
                </Typography>
                <Stack spacing={1}>
                  {categoryItems.map((preset) => (
                    <Card key={preset.id} variant="outlined">
                      <CardContent sx={{ pb: '12px !important' }}>
                        <Stack
                          direction={{ xs: 'column', sm: 'row' }}
                          spacing={1}
                          justifyContent="space-between"
                          alignItems={{ xs: 'stretch', sm: 'center' }}
                        >
                          <Stack direction="row" spacing={0.75} flexWrap="wrap">
                            {renderToneChip(preset.tone)}
                            <Chip
                              size="small"
                              label={t(`presetsLibrary.goals.${preset.goal}`)}
                              variant="outlined"
                            />
                            <Chip
                              size="small"
                              label={t(
                                `presetsLibrary.formats.${preset.format}`,
                              )}
                              variant="outlined"
                            />
                          </Stack>
                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => onApply(preset)}
                          >
                            {t('presetsLibrary.apply')}
                          </Button>
                        </Stack>
                        <Typography variant="subtitle2" sx={{ mt: 1.25 }}>
                          {getPresetTitle(preset, language)}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}
                        >
                          {getPresetText(preset, language)}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
