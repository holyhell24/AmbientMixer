export type SoundCategory =
  | 'nature'
  | 'rain'
  | 'animals'
  | 'places'
  | 'things'
  | 'ambient'
  | 'urban';

export type Sound = {
  id: string;
  name: string;
  category: SoundCategory;
  src: string;
  icon: string;
};

export type TrackState = {
  id: string;
  active: boolean;
  muted: boolean;
  volume: number;
};
