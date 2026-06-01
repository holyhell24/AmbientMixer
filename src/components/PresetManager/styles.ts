export const presetManagerStyles = `
  .preset-manager {
    display: grid;
    gap: 14px;
    margin: 18px 0 34px;
    padding: 16px;
    border: 1px solid rgba(255, 255, 255, 0.11);
    border-radius: 8px;
    background: rgba(18, 20, 25, 0.76);
  }

  .preset-manager__header {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
  }

  .preset-manager__save,
  .preset-manager__file-actions {
    display: grid;
    gap: 10px;
    align-items: center;
  }

  .preset-manager__file-actions {
    grid-template-columns: repeat(2, minmax(120px, 1fr));
  }

  .preset-manager__save {
    grid-template-columns: minmax(180px, 1fr) minmax(120px, 180px);
  }

  .preset-manager h2 {
    margin: 0;
    color: #fff;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1.4rem;
    letter-spacing: 0;
  }

  .preset-manager button,
  .preset-manager input {
    min-height: 38px;
    border: 1px solid rgba(255, 255, 255, 0.13);
    border-radius: 6px;
  }

  .preset-manager button {
    padding: 0 12px;
    color: #f8f7fb;
    background: rgba(255, 255, 255, 0.06);
    font-weight: 800;
    white-space: nowrap;
  }

  .preset-manager button:hover {
    border-color: rgba(154, 202, 224, 0.66);
    background: rgba(154, 202, 224, 0.12);
  }

  .preset-manager button:disabled {
    cursor: not-allowed;
    opacity: 0.42;
  }

  .preset-manager input {
    min-width: 0;
    padding: 0 12px;
    color: #f8f7fb;
    background: rgba(0, 0, 0, 0.22);
  }

  .preset-manager__file-input {
    display: none;
  }

  .preset-manager__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
    gap: 10px;
  }

  .preset-manager__list button {
    display: grid;
    justify-items: start;
    min-height: 58px;
    padding: 10px 12px;
    text-align: left;
    white-space: normal;
  }

  .preset-manager__list span {
    color: #9c98a5;
    font-size: 0.76rem;
    font-weight: 700;
  }

  @media (max-width: 560px) {
    .preset-manager__file-actions,
    .preset-manager__save,
    .preset-manager__list {
      grid-template-columns: 1fr;
    }
  }
`;
