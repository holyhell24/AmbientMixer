import type { EqualizerSettings, Sound, TrackState } from '../../types';

export type MixerChannelProps = {
  sound: Sound;
  track: TrackState;
  onChangeEqualizer: (equalizerSettings: EqualizerSettings) => void;
  onChangePan: (pan: number) => void;
  onChangeVolume: (volume: number) => void;
  onToggleActive: () => void;
  onToggleMute: () => void;
  onToggleRandomize: () => void;
};
