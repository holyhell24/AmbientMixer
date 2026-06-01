import { categoryLabels } from '../../soundLibrary';
import { SoundCategory } from '../../types';
import type { CategoryFilterProps } from './types';

const categories = Object.values(SoundCategory);

function CategoryFilter({ activeCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="category-filter" aria-label="Sound categories" role="tablist">
      {categories.map((category) => (
        <button
          aria-selected={activeCategory === category}
          className="category-filter__button"
          key={category}
          onClick={() => onSelectCategory(category)}
          role="tab"
          title={categoryLabels[category]}
          type="button"
        >
          <span>{categoryLabels[category]}</span>
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
