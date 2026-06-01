import { categoryIcons, categoryLabels } from '../../soundLibrary';
import type { SoundCategory } from '../../types';
import type { CategoryFilterProps } from './types';

const categories = Object.keys(categoryLabels) as SoundCategory[];

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
          <span className="category-filter__icon" aria-hidden="true">
            {categoryIcons[category]}
          </span>
          <span>{categoryLabels[category]}</span>
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
