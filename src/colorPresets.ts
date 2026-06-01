import type { ColorPreset } from './types';

export const colorPresetStorageKey = 'ambient-mixer-color-preset';

export const colorPresets: ColorPreset[] = [
  {
    id: 'ember-grove',
    name: 'Ember Grove',
    warm: '216, 119, 59',
    cool: '64, 128, 116',
    accent: '#d8773b',
    active: '#ffb19a',
    activeText: '#101112',
    ring: '#9ed2c8',
    glow: '#9acade',
  },
  {
    id: 'aurora',
    name: 'Aurora',
    warm: '118, 98, 224',
    cool: '45, 184, 156',
    accent: '#7dd3fc',
    active: '#a7f3d0',
    activeText: '#071014',
    ring: '#67e8f9',
    glow: '#bae6fd',
  },
  {
    id: 'rosewood',
    name: 'Rosewood',
    warm: '221, 87, 137',
    cool: '94, 105, 196',
    accent: '#f472b6',
    active: '#fbcfe8',
    activeText: '#180812',
    ring: '#c4b5fd',
    glow: '#f9a8d4',
  },
  {
    id: 'midnight',
    name: 'Midnight',
    warm: '56, 189, 248',
    cool: '99, 102, 241',
    accent: '#38bdf8',
    active: '#bfdbfe',
    activeText: '#07111f',
    ring: '#93c5fd',
    glow: '#bae6fd',
  },
  {
    id: 'violet-dusk',
    name: 'Violet Dusk',
    warm: '168, 85, 247',
    cool: '109, 40, 217',
    accent: '#a855f7',
    active: '#ddd6fe',
    activeText: '#12081f',
    ring: '#c084fc',
    glow: '#e9d5ff',
  },
  {
    id: 'moss',
    name: 'Moss',
    warm: '190, 143, 55',
    cool: '61, 145, 108',
    accent: '#a3e635',
    active: '#d9f99d',
    activeText: '#101508',
    ring: '#86efac',
    glow: '#bbf7d0',
  },
];

export const defaultColorPreset = colorPresets[0];

export const getColorPresetById = (id: string | null) =>
  colorPresets.find((preset) => preset.id === id) ?? defaultColorPreset;
