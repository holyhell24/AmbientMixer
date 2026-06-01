import type { EqualizerSettings } from '../../types';
import { defaultEqualizerSettings } from '../../utils';

export const defaultChannelVolume = 50;
export const defaultChannelPan = 0;

export const equalizerBands = [
  { name: 'low', label: 'Low' },
  { name: 'mid', label: 'Mid' },
  { name: 'high', label: 'High' },
] as const;

export type EqualizerBand = (typeof equalizerBands)[number]['name'];

export const getUpdatedEqualizerSettings = (
  equalizerSettings: EqualizerSettings,
  band: EqualizerBand,
  value: number,
) => ({
  ...equalizerSettings,
  [band]: value,
});

export const getResetEqualizerSettings = (
  equalizerSettings: EqualizerSettings,
  band: EqualizerBand,
) =>
  getUpdatedEqualizerSettings(
    equalizerSettings,
    band,
    defaultEqualizerSettings[band],
  );

export const resetChannelVolume = (onChangeVolume: (volume: number) => void) => {
  onChangeVolume(defaultChannelVolume);
};

export const resetChannelPan = (onChangePan: (pan: number) => void) => {
  onChangePan(defaultChannelPan);
};
