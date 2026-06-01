import type { Sound, TrackState } from '../../types';

export type SoundGridProps = {
  sounds: Sound[];
  tracks: TrackState[];
  maxActiveReached: boolean;
  onChangeVolume: (id: string, volume: number) => void;
  onToggleSound: (sound: Sound) => void;
};
