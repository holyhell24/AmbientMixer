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
  muted: boolean;
  randomize: boolean;
  volume: number;
};

export type PresetTrack = {
  id: string;
  muted: boolean;
  randomize?: boolean;
  volume: number;
};

export type SoundPreset = {
  id: string;
  name: string;
  tracks: PresetTrack[];
};

export type PresetFile = {
  presets: SoundPreset[];
};
