import type { SoundCategory } from '../../types';

export type CategoryFilterProps = {
  activeCategory: SoundCategory;
  onSelectCategory: (category: SoundCategory) => void;
};
