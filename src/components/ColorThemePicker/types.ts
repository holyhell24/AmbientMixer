import type { ColorPreset } from '../../types';

export type ColorThemePickerProps = {
  colorPresets: ColorPreset[];
  selectedColorPresetId: string;
  onChangeColorPreset: (presetId: string) => void;
};
