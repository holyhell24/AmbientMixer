import type { CSSProperties } from 'react';
import type { ColorThemePickerProps } from './types';

function ColorThemePicker({
  colorPresets,
  selectedColorPresetId,
  onChangeColorPreset,
}: ColorThemePickerProps) {
  return (
    <div
      aria-label="Color presets"
      className="fixed top-4 right-4 z-20 flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 shadow-[0_16px_46px_rgba(0,0,0,0.32)] backdrop-blur-md max-[560px]:top-2 max-[560px]:right-2 max-[560px]:gap-1.5 max-[560px]:px-2.5"
      role="group"
    >
      {colorPresets.map((preset) => (
        <button
          aria-label={`Use ${preset.name} color preset`}
          aria-pressed={selectedColorPresetId === preset.id}
          className="h-7 w-7 rounded-full border border-white/20 bg-[linear-gradient(135deg,var(--preset-warm),var(--preset-cool))] ring-offset-2 ring-offset-[#07080b] transition hover:scale-105 aria-pressed:ring-2 aria-pressed:ring-[var(--theme-ring)] max-[560px]:h-6 max-[560px]:w-6"
          key={preset.id}
          onClick={() => onChangeColorPreset(preset.id)}
          style={
            {
              '--preset-cool': `rgb(${preset.cool})`,
              '--preset-warm': `rgb(${preset.warm})`,
            } as CSSProperties
          }
          title={preset.name}
          type="button"
        />
      ))}
    </div>
  );
}

export default ColorThemePicker;
