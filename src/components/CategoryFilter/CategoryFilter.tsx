import { categoryLabels } from '../../soundLibrary';
import { SoundCategory } from '../../types';
import type { CategoryFilterProps } from './types';

const categories = Object.values(SoundCategory);

function CategoryFilter({ activeCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div
      className="grid w-full grid-cols-[repeat(auto-fit,minmax(132px,1fr))] gap-2.5 pt-0.5 pb-4 max-[560px]:flex max-[560px]:overflow-x-auto max-[560px]:pb-3"
      aria-label="Sound categories"
      role="tablist"
    >
      {categories.map((category) => (
        <button
          aria-selected={activeCategory === category}
          className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-white/15 bg-white/[0.045] px-3.5 text-[#d9d2c7] transition hover:-translate-y-px hover:border-[var(--theme-ring)] hover:bg-[color-mix(in_srgb,var(--theme-ring)_15%,transparent)] hover:text-white aria-selected:border-[var(--theme-ring)] aria-selected:bg-[color-mix(in_srgb,var(--theme-ring)_15%,transparent)] aria-selected:text-white max-[560px]:shrink-0"
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
