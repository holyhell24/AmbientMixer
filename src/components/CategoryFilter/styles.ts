export const categoryFilterStyles = `
  .category-filter {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(132px, 1fr));
    gap: 10px;
    padding: 2px 0 16px;
  }

  .category-filter__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
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

  @media (max-width: 560px) {
    .category-filter {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
`;
