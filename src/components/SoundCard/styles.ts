export const soundCardStyles = `
  .sound-card {
    min-height: 144px;
    padding: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.02)),
      rgba(5, 6, 7, 0.45);
    transition:
      border-color 180ms ease,
      transform 180ms ease,
      background 180ms ease;
  }

  .sound-card[data-active="true"] {
    border-color: rgba(255, 249, 239, 0.88);
    background:
      linear-gradient(180deg, rgba(158, 210, 200, 0.13), rgba(220, 119, 59, 0.06)),
      rgba(5, 6, 7, 0.58);
  }

  .sound-card:hover {
    transform: translateY(-2px);
  }

  .sound-card__toggle {
    display: grid;
    width: 100%;
    place-items: center;
    border: 0;
    color: #fff9ef;
    background: transparent;
  }

  .sound-card__icon {
    display: grid;
    width: 42px;
    height: 42px;
    place-items: center;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 50%;
    color: #fff;
    background: rgba(0, 0, 0, 0.22);
    font-size: 1.2rem;
  }

  .sound-card__name {
    min-height: 40px;
    color: #fff;
    font-weight: 800;
    line-height: 1.18;
    text-align: center;
  }

  .sound-card__volume {
    display: grid;
    gap: 6px;
    margin-top: 10px;
    color: #aaa69f;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .sound-card input[type="range"] {
    width: 100%;
    accent-color: #d8773b;
  }

  @media (max-width: 520px) {
    .sound-card {
      min-height: 132px;
      padding: 10px 8px;
    }

    .sound-card__toggle {
      gap: 7px;
    }

    .sound-card__icon {
      width: 34px;
      height: 34px;
      font-size: 0.78rem;
    }

    .sound-card__name {
      min-height: 32px;
      font-size: 0.82rem;
      overflow-wrap: anywhere;
    }

    .sound-card__volume {
      margin-top: 4px;
      font-size: 0.62rem;
    }
  }
`;
