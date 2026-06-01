export const categoryFilterStyles = `
  .category-filter {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding: 2px 0 16px;
    scrollbar-width: thin;
  }

  .category-filter__button {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 8px;
    min-height: 42px;
    padding: 0 14px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 999px;
    color: #d9d2c7;
    background: rgba(255, 255, 255, 0.045);
    transition:
      border-color 160ms ease,
      background 160ms ease,
      transform 160ms ease;
  }

  .category-filter__button:hover,
  .category-filter__button[aria-selected="true"] {
    border-color: rgba(158, 210, 200, 0.78);
    background: rgba(158, 210, 200, 0.13);
    color: #fff;
  }

  .category-filter__button:hover {
    transform: translateY(-1px);
  }

  .category-filter__icon {
    display: grid;
    width: 20px;
    height: 20px;
    place-items: center;
  }
`;
