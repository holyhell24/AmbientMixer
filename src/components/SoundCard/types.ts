import type { Sound, TrackState } from '../../types';

export type SoundCardProps = {
  sound: Sound;
  track: TrackState;
  disabled: boolean;
  onToggleSound: (sound: Sound) => void;
};
