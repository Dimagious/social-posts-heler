import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEditorStore } from '@mint/editor';
import { StylePanel } from '@mint/ui';
import type { TextLayerData } from '@mint/core';

const PANEL_WIDTH = 300;

interface PropertiesPanelProps {
  mobile?: boolean;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  mobile = false,
}) => {
  const { t } = useTranslation();
  const doc = useEditorStore((s) => s.document);
  const selectedLayerId = useEditorStore((s) => s.selectedLayerId);
  const updateTextLayer = useEditorStore((s) => s.updateTextLayer);

  const selectedLayer = doc.layers.find((l) => l.id === selectedLayerId);

  return (
    <Paper
      data-testid={mobile ? 'properties-panel-mobile' : 'properties-panel'}
      sx={{
        width: mobile ? '100%' : PANEL_WIDTH,
        minWidth: mobile ? 0 : PANEL_WIDTH,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 0,
        borderLeft: mobile ? 0 : 1,
        borderColor: 'divider',
        overflow: 'auto',
        height: '100%',
      }}
      elevation={0}
    >
      <Box sx={{ p: 1.5, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle2">{t('properties.title')}</Typography>
      </Box>

      {selectedLayer ? (
        <StylePanel
          layer={selectedLayer}
          onUpdate={(changes: Partial<Omit<TextLayerData, 'id'>>) =>
            updateTextLayer(selectedLayer.id, changes)
          }
        />
      ) : (
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {t('properties.selectLayer')}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};
