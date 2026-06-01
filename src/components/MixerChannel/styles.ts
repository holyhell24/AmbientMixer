export const mixerChannelStyles = `
  .mixer-channel {
    display: grid;
    min-height: 330px;
    grid-template-rows: 44px 34px 1fr 34px 34px;
    gap: 10px;
    justify-items: center;
    padding: 12px 8px;
    background: rgba(60, 72, 67, 0.48);
  }

  .mixer-channel__label {
    display: -webkit-box;
    max-width: 100%;
    overflow: hidden;
    color: #f4efe7;
    font-size: 0.78rem;
    font-weight: 800;
    line-height: 1.2;
    text-align: center;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .mixer-channel__icon {
    display: grid;
    width: 30px;
    height: 30px;
    place-items: center;
    border: 1px solid rgba(255, 255, 255, 0.13);
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.18);
  }

  .mixer-channel__slider {
    width: 140px;
    height: 140px;
    accent-color: #9ed2c8;
    transform: rotate(-90deg);
    align-self: center;
  }

  .mixer-channel__button {
    width: 100%;
    min-height: 32px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    color: #f4efe7;
    background: rgba(0, 0, 0, 0.28);
    font-size: 0.78rem;
    font-weight: 800;
  }

  .mixer-channel__button[data-active="true"] {
    color: #ffb19a;
  }
`;
