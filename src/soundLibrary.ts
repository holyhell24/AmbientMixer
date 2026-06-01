import { SoundCategory, SoundIconName } from './types';
import type { Sound } from './types';

const soundFiles = import.meta.glob<string>('./sounds/**/*.mp3', {
  eager: true,
  import: 'default',
  query: '?url',
});

const source = (path: string) => soundFiles[path] ?? path;

export const categoryLabels: Record<SoundCategory, string> = {
  [SoundCategory.Nature]: 'Nature',
  [SoundCategory.Rain]: 'Rain',
  [SoundCategory.Animals]: 'Animals',
  [SoundCategory.Places]: 'Places',
  [SoundCategory.Things]: 'Things',
  [SoundCategory.Ambient]: 'Long Ambients',
  [SoundCategory.Urban]: 'Urban',
};

export const sounds: Sound[] = [
  { id: 'river', name: 'River', category: SoundCategory.Nature, icon: SoundIconName.Wave, src: source('./sounds/nature/river.mp3') },
  { id: 'waves', name: 'Waves', category: SoundCategory.Nature, icon: SoundIconName.Wave, src: source('./sounds/nature/waves.mp3') },
  { id: 'campfire', name: 'Campfire', category: SoundCategory.Nature, icon: SoundIconName.Fire, src: source('./sounds/nature/campfire.mp3') },
  { id: 'wind', name: 'Wind', category: SoundCategory.Nature, icon: SoundIconName.Air, src: source('./sounds/nature/wind.mp3') },
  { id: 'howling-wind', name: 'Howling Wind', category: SoundCategory.Nature, icon: SoundIconName.Air, src: source('./sounds/nature/howling-wind.mp3') },
  { id: 'wind-in-trees', name: 'Wind in Trees', category: SoundCategory.Nature, icon: SoundIconName.Leaf, src: source('./sounds/nature/wind-in-trees.mp3') },
  { id: 'waterfall', name: 'Waterfall', category: SoundCategory.Nature, icon: SoundIconName.Wave, src: source('./sounds/nature/waterfall.mp3') },
  { id: 'jungle', name: 'Jungle', category: SoundCategory.Nature, icon: SoundIconName.Wild, src: source('./sounds/nature/jungle.mp3') },
  { id: 'droplets', name: 'Droplets', category: SoundCategory.Nature, icon: SoundIconName.Drop, src: source('./sounds/nature/droplets.mp3') },
  { id: 'light-rain', name: 'Light Rain', category: SoundCategory.Rain, icon: SoundIconName.Rain, src: source('./sounds/rain/light-rain.mp3') },
  { id: 'heavy-rain', name: 'Heavy Rain', category: SoundCategory.Rain, icon: SoundIconName.Rain, src: source('./sounds/rain/heavy-rain.mp3') },
  { id: 'thunder', name: 'Thunder', category: SoundCategory.Rain, icon: SoundIconName.Bolt, src: source('./sounds/rain/thunder.mp3') },
  { id: 'rain-window', name: 'Rain on Window', category: SoundCategory.Rain, icon: SoundIconName.Rain, src: source('./sounds/rain/rain-on-window.mp3') },
  { id: 'rain-tent', name: 'Rain on Tent', category: SoundCategory.Rain, icon: SoundIconName.Rain, src: source('./sounds/rain/rain-on-tent.mp3') },
  { id: 'birds', name: 'Birds', category: SoundCategory.Animals, icon: SoundIconName.Music, src: source('./sounds/animals/birds.mp3') },
  { id: 'crickets', name: 'Crickets', category: SoundCategory.Animals, icon: SoundIconName.Music, src: source('./sounds/animals/crickets.mp3') },
  { id: 'cat-purring', name: 'Cat Purring', category: SoundCategory.Animals, icon: SoundIconName.Tone, src: source('./sounds/animals/cat-purring.mp3') },
  { id: 'owl', name: 'Owl', category: SoundCategory.Animals, icon: SoundIconName.Moon, src: source('./sounds/animals/owl.mp3') },
  { id: 'wolf', name: 'Wolf', category: SoundCategory.Animals, icon: SoundIconName.Music, src: source('./sounds/animals/wolf.mp3') },
  { id: 'library', name: 'Library', category: SoundCategory.Places, icon: SoundIconName.Book, src: source('./sounds/places/library.mp3') },
  { id: 'temple', name: 'Temple', category: SoundCategory.Places, icon: SoundIconName.Bell, src: source('./sounds/places/temple.mp3') },
  { id: 'church', name: 'Church', category: SoundCategory.Places, icon: SoundIconName.Hall, src: source('./sounds/places/church.mp3') },
  { id: 'restaurant', name: 'Restaurant', category: SoundCategory.Places, icon: SoundIconName.Restaurant, src: source('./sounds/places/restaurant.mp3') },
  { id: 'night-village', name: 'Night Village', category: SoundCategory.Places, icon: SoundIconName.Moon, src: source('./sounds/places/night-village.mp3') },
  { id: 'clock', name: 'Clock', category: SoundCategory.Things, icon: SoundIconName.Clock, src: source('./sounds/things/clock.mp3') },
  { id: 'bubbles', name: 'Bubbles', category: SoundCategory.Things, icon: SoundIconName.Bubbles, src: source('./sounds/things/bubbles.mp3') },
  { id: 'singing-bowl', name: 'Singing Bowl', category: SoundCategory.Things, icon: SoundIconName.Tone, src: source('./sounds/things/singing-bowl.mp3') },
  { id: 'wind-chimes', name: 'Wind Chimes', category: SoundCategory.Things, icon: SoundIconName.Chime, src: source('./sounds/things/wind-chimes.mp3') },
  { id: 'medieval-village', name: 'Medieval Village', category: SoundCategory.Ambient, icon: SoundIconName.Town, src: source('./sounds/long-ambients/medieval-village.mp3') },
  { id: 'tavern', name: 'Tavern Ambience', category: SoundCategory.Ambient, icon: SoundIconName.Restaurant, src: source('./sounds/long-ambients/tavern-ambience.mp3') },
  { id: 'castle-night', name: 'Castle Night', category: SoundCategory.Ambient, icon: SoundIconName.Castle, src: source('./sounds/long-ambients/castle-night.mp3') },
  { id: 'fireplace', name: 'Fireplace', category: SoundCategory.Ambient, icon: SoundIconName.Fire, src: source('./sounds/long-ambients/fireplace.mp3') },
  { id: 'crowd', name: 'Crowd', category: SoundCategory.Urban, icon: SoundIconName.Crowd, src: source('./sounds/urban/crowd.mp3') },
];
