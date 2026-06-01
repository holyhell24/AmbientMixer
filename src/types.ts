export enum SoundCategory {
  Nature = 'nature',
  Rain = 'rain',
  Animals = 'animals',
  Places = 'places',
  Things = 'things',
  Ambient = 'ambient',
  Urban = 'urban',
}

export enum SoundIconName {
  Air = 'air',
  Bell = 'bell',
  Bolt = 'bolt',
  Book = 'book',
  Bubbles = 'bubbles',
  Castle = 'castle',
  Chime = 'chime',
  Clock = 'clock',
  Crowd = 'crowd',
  Drop = 'drop',
  Fire = 'fire',
  Hall = 'hall',
  Leaf = 'leaf',
  Moon = 'moon',
  Music = 'music',
  Rain = 'rain',
  Restaurant = 'restaurant',
  Tone = 'tone',
  Town = 'town',
  Wave = 'wave',
  Wild = 'wild',
}

export type Sound = {
  id: string;
  name: string;
  category: SoundCategory;
  src: string;
  icon: SoundIconName;
};

export type TrackState = {
  id: string;
  active: boolean;
  eq: EqualizerSettings;
  muted: boolean;
  pan: number;
  randomize: boolean;
  volume: number;
};

export type PresetTrack = {
  id: string;
  eq?: EqualizerSettings;
  muted: boolean;
  pan?: number;
  randomize?: boolean;
  volume: number;
};

export type EqualizerSettings = {
  high: number;
  low: number;
  mid: number;
};

export type SoundPreset = {
  id: string;
  name: string;
  category: string;
  tracks: PresetTrack[];
};

export type PresetFile = {
  presets: SoundPreset[];
};
