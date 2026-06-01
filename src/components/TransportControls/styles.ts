export const transportControlsStyles = `
  .transport-controls {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .transport-controls__play,
  .transport-controls__icon {
    border: 1px solid rgba(255, 255, 255, 0.14);
    color: #101112;
    background: #fff9ef;
    font-weight: 900;
  }

  .transport-controls__play {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-width: 146px;
    min-height: 44px;
    padding: 0 18px;
    border-radius: 999px;
  }

  .transport-controls__play:disabled {
    cursor: not-allowed;
    opacity: 0.48;
  }

  .transport-controls__icon {
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    border-radius: 50%;
    color: #f7f0e4;
    background: rgba(255, 255, 255, 0.06);
  }
`;
