import type { Sound, TrackState } from '../../types';

export type SoundGridProps = {
  sounds: Sound[];
  tracks: TrackState[];
  maxActiveReached: boolean;
  onToggleSound: (sound: Sound) => void;
};
