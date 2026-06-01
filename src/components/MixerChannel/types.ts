import type { Sound, TrackState } from '../../types';

export type MixerChannelProps = {
  sound: Sound;
  track: TrackState;
  onChangeVolume: (volume: number) => void;
  onToggleActive: () => void;
  onToggleMute: () => void;
  onToggleRandomize: () => void;
};
