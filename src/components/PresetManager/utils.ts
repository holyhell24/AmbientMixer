import type { PresetFile, SoundPreset } from '../../types';

export const groupPresetsByCategory = (presets: SoundPreset[]) =>
  presets
    .toSorted((firstPreset, secondPreset) => {
      const categoryComparison = firstPreset.category.localeCompare(
        secondPreset.category,
      );

      return categoryComparison || firstPreset.name.localeCompare(secondPreset.name);
    })
    .reduce<Record<string, SoundPreset[]>>((groupedPresets, preset) => {
      const category = preset.category || 'Custom';

      return {
        ...groupedPresets,
        [category]: [...(groupedPresets[category] ?? []), preset],
      };
    }, {});

export const readPresetFile = (file: File) =>
  new Promise<PresetFile>((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      try {
        resolve(JSON.parse(String(reader.result)) as PresetFile);
      } catch (error) {
        reject(error);
      }
    });

    reader.addEventListener('error', () => {
      reject(reader.error);
    });

    reader.readAsText(file);
  });
