import { useRef, useState } from 'react';
import type { PresetFile } from '../../types';
import type { PresetManagerProps } from './types';

function PresetManager({
  activeCount,
  presets,
  onApplyPreset,
  onExportPresets,
  onImportPresets,
  onSavePreset,
}: PresetManagerProps) {
  const [presetName, setPresetName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSavePreset = () => {
    const trimmedName = presetName.trim();

    if (!trimmedName) {
      return;
    }

    onSavePreset(trimmedName);
    setPresetName('');
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
      className="my-[18px] mb-[34px] grid gap-3.5 rounded-lg border border-white/10 bg-[rgba(18,20,25,0.76)] p-4"
      aria-label="Sound presets"
    >
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <h2 className="m-0 font-serif text-[1.4rem] tracking-normal text-white">Presets</h2>
        <div className="grid grid-cols-2 items-center gap-2.5">
          <button className="min-h-[38px] whitespace-nowrap rounded-md border border-white/15 bg-white/[0.06] px-3 font-black text-[#f8f7fb] hover:border-[#9acae0]/70 hover:bg-[#9acae0]/10" onClick={onExportPresets} type="button">
            Export
          </button>
          <button className="min-h-[38px] whitespace-nowrap rounded-md border border-white/15 bg-white/[0.06] px-3 font-black text-[#f8f7fb] hover:border-[#9acae0]/70 hover:bg-[#9acae0]/10" onClick={() => fileInputRef.current?.click()} type="button">
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

      <div className="grid grid-cols-[minmax(180px,1fr)_minmax(120px,180px)] items-center gap-2.5 max-[560px]:grid-cols-1">
        <input
          aria-label="Preset name"
          className="min-h-[38px] min-w-0 rounded-md border border-white/15 bg-black/20 px-3 text-[#f8f7fb]"
          onChange={(event) => setPresetName(event.target.value)}
          placeholder="Preset name"
          type="text"
          value={presetName}
        />
        <button className="min-h-[38px] whitespace-nowrap rounded-md border border-white/15 bg-white/[0.06] px-3 font-black text-[#f8f7fb] hover:border-[#9acae0]/70 hover:bg-[#9acae0]/10 disabled:cursor-not-allowed disabled:opacity-40" disabled={activeCount === 0 || presetName.trim().length === 0} onClick={handleSavePreset} type="button">
          Save Mix
        </button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-2.5 max-[560px]:grid-cols-1">
        {presets.map((preset) => (
          <button className="grid min-h-[58px] justify-items-start rounded-md border border-white/15 bg-white/[0.06] px-3 py-2.5 text-left font-black whitespace-normal text-[#f8f7fb] hover:border-[#9acae0]/70 hover:bg-[#9acae0]/10" key={preset.id} onClick={() => onApplyPreset(preset)} type="button">
            {preset.name}
            <span className="text-xs font-bold text-[#9c98a5]">{preset.tracks.length} tracks</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default PresetManager;
