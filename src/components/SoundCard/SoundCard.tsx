import type { SoundCardProps } from './types';

function SoundCard({ sound, track, onChangeVolume, onToggleSound }: SoundCardProps) {
  return (
    <article className="sound-card" data-active={track.active}>
      <button
        aria-pressed={track.active}
        className="sound-card__toggle"
        onClick={() => onToggleSound(sound)}
        type="button"
      >
        <span className="sound-card__icon" aria-hidden="true">
          {sound.icon}
        </span>
        <span className="sound-card__name">{sound.name}</span>
      </button>
      <label className="sound-card__volume">
        <span>Volume</span>
        <input
          aria-label={`${sound.name} volume`}
          max="100"
          min="0"
          onChange={(event) => onChangeVolume(sound.id, Number(event.target.value))}
          type="range"
          value={track.volume}
        />
      </label>
    </article>
  );
}

export default SoundCard;
