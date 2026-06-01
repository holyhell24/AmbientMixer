import { useRef, useState } from 'react';
import { FiChevronDown, FiX } from 'react-icons/fi';
import type { PresetFile } from '../../types';
import type { PresetManagerProps } from './types';

function PresetManager({
  activeCount,
  presets,
  presetCategories,
  onApplyPreset,
  onExportPresets,
  onImportPresets,
  onRemovePreset,
  onSavePreset,
}: PresetManagerProps) {
  const [presetName, setPresetName] = useState('');
  const [presetCategory, setPresetCategory] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const presetsByCategory = presets
    .toSorted((firstPreset, secondPreset) => {
      const categoryComparison = firstPreset.category.localeCompare(
        secondPreset.category,
      );

      return categoryComparison || firstPreset.name.localeCompare(secondPreset.name);
    })
    .reduce<Record<string, typeof presets>>((groupedPresets, preset) => {
      const category = preset.category || 'Custom';

      return {
        ...groupedPresets,
        [category]: [...(groupedPresets[category] ?? []), preset],
      };
    }, {});

  const handleSavePreset = () => {
    const trimmedName = presetName.trim();
    const trimmedCategory = presetCategory.trim();

    if (!trimmedName) {
      return;
    }

    onSavePreset(trimmedName, trimmedCategory);
    setPresetName('');
    setPresetCategory('');
  };

  const handleImportFile = (file: File | undefined) => {
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.addEventListener('load', () => {
      try {
        const parsedPresetFile = JSON.parse(String(reader.result)) as PresetFile;
        onImportPresets(parsedPresetFile);
      } catch {
        window.alert('This file is not a valid presets JSON file.');
      }
    });

    reader.readAsText(file);
  };

  return (
    <section
      className="my-[18px] mb-[34px] grid gap-3.5 rounded-lg border border-[#9acae0]/20 bg-[linear-gradient(180deg,rgba(154,202,224,0.08),rgba(255,255,255,0.025)),rgba(18,20,25,0.88)] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.36)] max-[560px]:p-3"
      aria-label="Sound presets"
    >
      <div className="flex flex-wrap items-center justify-between gap-2.5 max-[560px]:grid max-[560px]:grid-cols-1">
        <h2 className="m-0 font-serif text-[1.4rem] tracking-normal text-white">Presets</h2>
        <div className="grid grid-cols-2 items-center gap-2.5 max-[560px]:w-full">
          <button className="min-h-[42px] whitespace-nowrap rounded-md border border-white/15 bg-white/[0.06] px-3 font-black text-[#f8f7fb] hover:border-[#9acae0]/70 hover:bg-[#9acae0]/10" onClick={onExportPresets} type="button">
            Export
          </button>
          <button className="min-h-[42px] whitespace-nowrap rounded-md border border-white/15 bg-white/[0.06] px-3 font-black text-[#f8f7fb] hover:border-[#9acae0]/70 hover:bg-[#9acae0]/10" onClick={() => fileInputRef.current?.click()} type="button">
            Import
          </button>
          <input
            accept="application/json,.json"
            className="hidden"
            onChange={(event) => handleImportFile(event.target.files?.[0])}
            ref={fileInputRef}
            type="file"
          />
        </div>
      </div>

      <div className="grid grid-cols-[minmax(160px,1fr)_minmax(150px,0.8fr)_minmax(120px,180px)] items-center gap-2.5 max-[720px]:grid-cols-1">
        <input
          aria-label="Preset name"
          className="min-h-[42px] min-w-0 rounded-md border border-white/15 bg-black/20 px-3 text-[#f8f7fb]"
          onChange={(event) => setPresetName(event.target.value)}
          placeholder="Preset name"
          type="text"
          value={presetName}
        />
        <input
          aria-label="Preset category"
          className="min-h-[42px] min-w-0 rounded-md border border-white/15 bg-black/20 px-3 text-[#f8f7fb]"
          list="preset-categories"
          onChange={(event) => setPresetCategory(event.target.value)}
          placeholder="Category"
          type="text"
          value={presetCategory}
        />
        <datalist id="preset-categories">
          {presetCategories.map((category) => (
            <option key={category} value={category} />
          ))}
        </datalist>
        <button className="min-h-[42px] whitespace-nowrap rounded-md border border-white/15 bg-white/[0.06] px-3 font-black text-[#f8f7fb] hover:border-[#9acae0]/70 hover:bg-[#9acae0]/10 disabled:cursor-not-allowed disabled:opacity-40" disabled={activeCount === 0 || presetName.trim().length === 0} onClick={handleSavePreset} type="button">
          Save Mix
        </button>
      </div>

      <div className="grid gap-2.5">
        {Object.entries(presetsByCategory).map(([category, categoryPresets]) => (
          <details
            className="group rounded-md border border-white/15 bg-white/[0.04] p-2.5 open:bg-white/[0.06]"
            key={category}
            open
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded px-1 py-1 font-black text-[#f8f7fb] marker:hidden [&::-webkit-details-marker]:hidden">
              <span className="flex items-center gap-2">
                <FiChevronDown
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
                />
                {category}
              </span>
              <span className="text-xs font-bold text-[#9acade]">
                {categoryPresets.length} presets
              </span>
            </summary>
            <div className="mt-2.5 flex flex-wrap gap-2.5">
              {categoryPresets.map((preset) => (
                <div
                  className="grid h-[72px] w-[210px] grid-cols-[1fr_32px] items-center gap-2 rounded-md border border-white/15 bg-white/[0.06] px-3 py-2.5 text-[#f8f7fb] hover:border-[#9acae0]/70 hover:bg-[#9acae0]/10 max-[520px]:w-[min(210px,100%)]"
                  key={preset.id}
                >
                  <button
                    className="grid min-w-0 justify-items-start text-left font-black"
                    onClick={() => onApplyPreset(preset)}
                    type="button"
                  >
                    <span className="max-w-full truncate">{preset.name}</span>
                    <span className="text-xs font-bold text-[#9c98a5]">
                      {preset.tracks.length} tracks
                    </span>
                  </button>
                  <button
                    aria-label={`Remove ${preset.name}`}
                    className="flex h-8 w-8 items-center justify-center self-center justify-self-center rounded-full border border-white/10 bg-black/20 p-0 text-[#b9b4c1] hover:border-[#ffb19a]/70 hover:text-[#ffb19a]"
                    onClick={() => onRemovePreset(preset.id)}
                    title="Remove preset"
                    type="button"
                  >
                    <FiX aria-hidden="true" className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export default PresetManager;
