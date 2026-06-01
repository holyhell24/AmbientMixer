import type { Sound, SoundCategory } from './types';

const source = (path: string) => new URL(path, import.meta.url).href;

export const categoryLabels: Record<SoundCategory, string> = {
  nature: 'Nature',
  rain: 'Rain',
  animals: 'Animals',
  places: 'Places',
  things: 'Things',
  ambient: 'Long Ambients',
  urban: 'Urban',
};

export const categoryIcons: Record<SoundCategory, string> = {
  nature: '♧',
  rain: '☔',
  animals: '♘',
  places: '⌂',
  things: '✦',
  ambient: '◉',
  urban: '▦',
};

export const sounds: Sound[] = [
  { id: 'river', name: 'River', category: 'nature', icon: '≋', src: source('./sounds/nature/river.mp3') },
  { id: 'waves', name: 'Waves', category: 'nature', icon: '≈', src: source('./sounds/nature/waves.mp3') },
  { id: 'campfire', name: 'Campfire', category: 'nature', icon: '♨', src: source('./sounds/nature/campfire.mp3') },
  { id: 'wind', name: 'Wind', category: 'nature', icon: '≋', src: source('./sounds/nature/wind.mp3') },
  { id: 'howling-wind', name: 'Howling Wind', category: 'nature', icon: '〰', src: source('./sounds/nature/howling-wind.mp3') },
  { id: 'wind-in-trees', name: 'Wind in Trees', category: 'nature', icon: '♧', src: source('./sounds/nature/wind-in-trees.mp3') },
  { id: 'waterfall', name: 'Waterfall', category: 'nature', icon: '⇣', src: source('./sounds/nature/waterfall.mp3') },
  { id: 'jungle', name: 'Jungle', category: 'nature', icon: '✹', src: source('./sounds/nature/jungle.mp3') },
  { id: 'droplets', name: 'Droplets', category: 'nature', icon: '•', src: source('./sounds/nature/droplets.mp3') },
  { id: 'light-rain', name: 'Light Rain', category: 'rain', icon: '☔', src: source('./sounds/rain/light-rain.mp3') },
  { id: 'heavy-rain', name: 'Heavy Rain', category: 'rain', icon: '☂', src: source('./sounds/rain/heavy-rain.mp3') },
  { id: 'thunder', name: 'Thunder', category: 'rain', icon: 'ϟ', src: source('./sounds/rain/thunder.mp3') },
  { id: 'rain-window', name: 'Rain on Window', category: 'rain', icon: '▥', src: source('./sounds/rain/rain-on-window.mp3') },
  { id: 'rain-tent', name: 'Rain on Tent', category: 'rain', icon: '△', src: source('./sounds/rain/rain-on-tent.mp3') },
  { id: 'birds', name: 'Birds', category: 'animals', icon: '♪', src: source('./sounds/animals/birds.mp3') },
  { id: 'crickets', name: 'Crickets', category: 'animals', icon: '⋯', src: source('./sounds/animals/crickets.mp3') },
  { id: 'cat-purring', name: 'Cat Purring', category: 'animals', icon: '◌', src: source('./sounds/animals/cat-purring.mp3') },
  { id: 'owl', name: 'Owl', category: 'animals', icon: '◐', src: source('./sounds/animals/owl.mp3') },
  { id: 'wolf', name: 'Wolf', category: 'animals', icon: '⌁', src: source('./sounds/animals/wolf.mp3') },
  { id: 'library', name: 'Library', category: 'places', icon: '▤', src: source('./sounds/places/library.mp3') },
  { id: 'temple', name: 'Temple', category: 'places', icon: '⌂', src: source('./sounds/places/temple.mp3') },
  { id: 'church', name: 'Church', category: 'places', icon: '✚', src: source('./sounds/places/church.mp3') },
  { id: 'restaurant', name: 'Restaurant', category: 'places', icon: '♨', src: source('./sounds/places/restaurant.mp3') },
  { id: 'night-village', name: 'Night Village', category: 'places', icon: '☾', src: source('./sounds/places/night-village.mp3') },
  { id: 'clock', name: 'Clock', category: 'things', icon: '◷', src: source('./sounds/things/clock.mp3') },
  { id: 'bubbles', name: 'Bubbles', category: 'things', icon: '○', src: source('./sounds/things/bubbles.mp3') },
  { id: 'singing-bowl', name: 'Singing Bowl', category: 'things', icon: '◉', src: source('./sounds/things/singing-bowl.mp3') },
  { id: 'wind-chimes', name: 'Wind Chimes', category: 'things', icon: '✧', src: source('./sounds/things/wind-chimes.mp3') },
  { id: 'medieval-village', name: 'Medieval Village', category: 'ambient', icon: '⌘', src: source('./sounds/long-ambients/medieval-village.mp3') },
  { id: 'tavern', name: 'Tavern Ambience', category: 'ambient', icon: '♬', src: source('./sounds/long-ambients/tavern-ambience.mp3') },
  { id: 'castle-night', name: 'Castle Night', category: 'ambient', icon: '♜', src: source('./sounds/long-ambients/castle-night.mp3') },
  { id: 'fireplace', name: 'Fireplace', category: 'ambient', icon: '♨', src: source('./sounds/long-ambients/fireplace.mp3') },
  { id: 'crowd', name: 'Crowd', category: 'urban', icon: '▦', src: source('./sounds/urban/crowd.mp3') },
];
