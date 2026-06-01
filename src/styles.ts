import { categoryFilterStyles } from './components/CategoryFilter/styles';
import { mixerChannelStyles } from './components/MixerChannel/styles';
import { presetManagerStyles } from './components/PresetManager/styles';
import { soundCardStyles } from './components/SoundCard/styles';
import { soundGridStyles } from './components/SoundGrid/styles';
import { soundIconStyles } from './components/SoundIcon/styles';
import { transportControlsStyles } from './components/TransportControls/styles';

export const appStyles = `
  :root {
    color: #f8f7fb;
    background: #07080b;
    font-family:
      Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      sans-serif;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-width: 320px;
    min-height: 100svh;
    background:
      radial-gradient(circle at 50% -10%, rgba(104, 121, 145, 0.22), transparent 28rem),
      linear-gradient(180deg, #0a0b10 0%, #07080b 46%, #08090c 100%);
  }

  body::before {
    position: fixed;
    inset: 0;
    pointer-events: none;
    content: "";
    background-image:
      radial-gradient(circle, rgba(255, 255, 255, 0.16) 1px, transparent 1px),
      radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
    background-position:
      0 0,
      18px 18px;
    background-size:
      36px 36px,
      36px 36px;
    mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.9), transparent 56%);
  }

  button,
  input {
    font: inherit;
  }

  button {
    cursor: pointer;
  }

  #root {
    min-height: 100svh;
  }

  .app {
    width: min(880px, calc(100% - 32px));
    min-height: 100svh;
    margin: 0 auto;
    padding: 52px 0 64px;
    color: #f8f7fb;
  }

  .app__intro {
    display: grid;
    justify-items: center;
    padding: 0 0 64px;
    text-align: center;
  }

  .app__mark {
    display: grid;
    width: 56px;
    height: 56px;
    place-items: center;
    margin-bottom: 18px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 50%;
    color: #f5f4fa;
    background: rgba(255, 255, 255, 0.04);
    font-size: 2rem;
  }

  .app__title,
  .app__section-title {
    margin: 0;
    color: #fff;
    font-family: Georgia, "Times New Roman", serif;
    letter-spacing: 0;
  }

  .app__title {
    font-size: clamp(2.2rem, 7vw, 4rem);
    line-height: 1;
    text-shadow: 0 2px 0 rgba(46, 76, 113, 0.8);
  }

  .app__subtitle {
    margin: 4px 0 18px;
    color: #9c98a5;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(1.45rem, 4vw, 2.1rem);
    font-weight: 800;
    letter-spacing: 0;
  }

  .app__count {
    display: inline-flex;
    align-items: center;
    min-height: 30px;
    padding: 0 14px;
    border: 1px solid rgba(255, 255, 255, 0.13);
    border-radius: 999px;
    color: #c9cedc;
    background: rgba(255, 255, 255, 0.04);
    font-size: 0.88rem;
    text-transform: capitalize;
  }

  .app__categories,
  .app__transport,
  .app__library {
    display: grid;
    justify-items: center;
  }

  .app__categories {
    gap: 18px;
  }

  .app__section-title {
    font-size: clamp(1.65rem, 4vw, 2.15rem);
  }

  .app__transport {
    position: relative;
    margin: 12px 0 34px;
  }

  .app__library {
    gap: 22px;
    margin-top: 34px;
  }

  .app__library-heading {
    display: grid;
    gap: 12px;
    justify-items: center;
  }

  .app__category-icon {
    display: grid;
    width: 48px;
    height: 48px;
    place-items: center;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 50%;
    color: #fff;
    background: rgba(255, 255, 255, 0.035);
  }

  .app__mixer {
    margin-top: -28px;
    margin-bottom: 24px;
    overflow: hidden;
    border: 1px solid rgba(154, 202, 224, 0.16);
    border-radius: 8px;
    background:
      linear-gradient(180deg, rgba(154, 202, 224, 0.08), rgba(255, 255, 255, 0.025)),
      rgba(18, 20, 25, 0.88);
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.36);
  }

  .app__mixer-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    padding: 16px 18px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.09);
    color: #a5a2ad;
  }

  .app__mixer-heading .app__section-title {
    font-size: 1.45rem;
  }

  .app__channels {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(112px, 1fr));
    gap: 10px;
    padding: 10px;
  }

  .app__empty {
    margin: 0;
    padding: 28px;
    color: #9c98a5;
    text-align: center;
  }

  @media (max-width: 640px) {
    .app {
      width: min(100% - 12px, 880px);
      padding-top: 34px;
    }

    .app__intro {
      padding-bottom: 46px;
    }

    .app__transport {
      margin: 8px 0 28px;
    }
  }

  ${categoryFilterStyles}
  ${presetManagerStyles}
  ${soundGridStyles}
  ${soundIconStyles}
  ${soundCardStyles}
  ${mixerChannelStyles}
  ${transportControlsStyles}
`;
