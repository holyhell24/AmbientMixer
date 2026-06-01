export const mixerChannelStyles = `
  .mixer-channel {
    display: grid;
    min-height: 292px;
    grid-template-rows: auto 1fr auto;
    gap: 12px;
    padding: 12px;
    border: 1px solid rgba(255, 255, 255, 0.09);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.025)),
      rgba(12, 14, 18, 0.82);
  }

  .mixer-channel__top {
    display: grid;
    gap: 8px;
    justify-items: center;
  }

  .mixer-channel__badge {
    display: grid;
    width: 38px;
    height: 38px;
    place-items: center;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 50%;
    color: #fff;
    background:
      radial-gradient(circle at 35% 25%, rgba(154, 202, 224, 0.28), transparent 56%),
      rgba(0, 0, 0, 0.28);
    font-size: 0.76rem;
    font-weight: 900;
  }

  .mixer-channel__label {
    display: -webkit-box;
    max-width: 100%;
    min-height: 34px;
    overflow: hidden;
    color: #f6f2ea;
    font-size: 0.78rem;
    font-weight: 900;
    line-height: 1.18;
    text-align: center;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .mixer-channel__fader {
    display: grid;
    min-height: 136px;
    grid-template-rows: 1fr auto;
    justify-items: center;
    gap: 8px;
    padding: 12px 0 10px;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.16);
  }

  .mixer-channel__volume {
    color: #9acade;
    font-size: 0.72rem;
    font-weight: 900;
    letter-spacing: 0.08em;
  }

  .mixer-channel__slider {
    width: 24px;
    height: 104px;
    accent-color: #d8773b;
    cursor: pointer;
    writing-mode: vertical-lr;
    direction: rtl;
  }

  .mixer-channel__actions {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 7px;
  }

  .mixer-channel__button {
    display: inline-flex;
    width: 100%;
    min-height: 34px;
    align-items: center;
    justify-content: center;
    gap: 6px;
    border: 1px solid rgba(255, 255, 255, 0.11);
    border-radius: 999px;
    color: #f4efe7;
    background: rgba(255, 255, 255, 0.055);
    font-size: 0.72rem;
    font-weight: 900;
  }

  .mixer-channel__button svg {
    width: 15px;
    height: 15px;
    flex: 0 0 auto;
  }

  .mixer-channel__button:hover {
    border-color: rgba(154, 202, 224, 0.62);
    background: rgba(154, 202, 224, 0.12);
  }

  .mixer-channel__button[data-active="true"] {
    color: #101112;
    background: #ffb19a;
  }

  .mixer-channel__button--remove {
    color: #b9b4c1;
  }

  @media (max-width: 520px) {
    .mixer-channel {
      min-height: 246px;
      padding: 9px;
    }

    .mixer-channel__badge {
      width: 32px;
      height: 32px;
      font-size: 0.68rem;
    }

    .mixer-channel__fader {
      min-height: 112px;
    }

    .mixer-channel__slider {
      height: 84px;
    }
  }
`;
