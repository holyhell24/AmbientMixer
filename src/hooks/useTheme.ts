import { useEffect, useState } from 'react';
import {
  colorPresets,
  colorPresetStorageKey,
  getColorPresetById,
} from '../colorPresets';
import type { ColorPreset } from '../types';

const applyColorPreset = (colorPreset: ColorPreset) => {
  const rootStyle = document.documentElement.style;

  rootStyle.setProperty('--theme-warm', colorPreset.warm);
  rootStyle.setProperty('--theme-cool', colorPreset.cool);
  rootStyle.setProperty('--theme-accent', colorPreset.accent);
  rootStyle.setProperty('--theme-active', colorPreset.active);
  rootStyle.setProperty('--theme-active-text', colorPreset.activeText);
  rootStyle.setProperty('--theme-ring', colorPreset.ring);
  rootStyle.setProperty('--theme-glow', colorPreset.glow);
};

export const useTheme = () => {
  const [selectedColorPreset, setSelectedColorPreset] = useState<ColorPreset>(
    () => getColorPresetById(localStorage.getItem(colorPresetStorageKey)),
  );

  useEffect(() => {
    applyColorPreset(selectedColorPreset);
    localStorage.setItem(colorPresetStorageKey, selectedColorPreset.id);
  }, [selectedColorPreset]);

  return {
    colorPresets,
    selectedColorPreset,
    setColorPreset: (presetId: string) => {
      setSelectedColorPreset(getColorPresetById(presetId));
    },
  };
};
