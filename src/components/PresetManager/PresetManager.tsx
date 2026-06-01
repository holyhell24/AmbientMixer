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
    <section className="preset-manager" aria-label="Sound presets">
      <div className="preset-manager__header">
        <h2>Presets</h2>
        <div className="preset-manager__file-actions">
          <button onClick={onExportPresets} type="button">
            Export
          </button>
          <button onClick={() => fileInputRef.current?.click()} type="button">
            Import
          </button>
          <input
            accept="application/json,.json"
            className="preset-manager__file-input"
            onChange={(event) => handleImportFile(event.target.files?.[0])}
            ref={fileInputRef}
            type="file"
          />
        </div>
      </div>

      <div className="preset-manager__save">
        <input
          aria-label="Preset name"
          onChange={(event) => setPresetName(event.target.value)}
          placeholder="Preset name"
          type="text"
          value={presetName}
        />
        <button disabled={activeCount === 0 || presetName.trim().length === 0} onClick={handleSavePreset} type="button">
          Save Mix
        </button>
      </div>

      <div className="preset-manager__list">
        {presets.map((preset) => (
          <button key={preset.id} onClick={() => onApplyPreset(preset)} type="button">
            {preset.name}
            <span>{preset.tracks.length} tracks</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default PresetManager;
