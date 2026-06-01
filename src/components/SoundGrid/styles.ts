export const soundGridStyles = `
  .sound-grid {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(156px, 1fr));
    gap: 14px;
  }

  @media (max-width: 520px) {
    .sound-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
    }
  }
`;
