import type { PresetFile, SoundPreset } from '../../types';

export type PresetManagerProps = {
  activeCount: number;
  presets: SoundPreset[];
  presetCategories: string[];
  onApplyPreset: (preset: SoundPreset) => void;
  onExportPresets: () => void;
  onImportPresets: (presetFile: PresetFile) => void;
  onRemovePreset: (id: string) => void;
  onSavePreset: (name: string, category: string) => void;
};
