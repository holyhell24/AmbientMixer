import type { Sound, TrackState } from '../../types';

export type SoundCardProps = {
  sound: Sound;
  track: TrackState;
  onChangeVolume: (id: string, volume: number) => void;
  onToggleSound: (sound: Sound) => void;
};
