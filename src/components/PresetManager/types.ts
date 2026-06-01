import type { PresetFile, SoundPreset } from '../../types';

export type PresetManagerProps = {
  activeCount: number;
  presets: SoundPreset[];
  onApplyPreset: (preset: SoundPreset) => void;
  onExportPresets: () => void;
  onImportPresets: (presetFile: PresetFile) => void;
  onSavePreset: (name: string) => void;
};
