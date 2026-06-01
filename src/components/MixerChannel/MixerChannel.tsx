import type { MixerChannelProps } from './types';

function MixerChannel({
  sound,
  track,
  onChangeVolume,
  onToggleActive,
  onToggleMute,
}: MixerChannelProps) {
  return (
    <section className="mixer-channel" aria-label={`${sound.name} channel`}>
      <span className="mixer-channel__label">{sound.name}</span>
      <span className="mixer-channel__icon" aria-hidden="true">
        {sound.icon}
      </span>
      <input
        aria-label={`${sound.name} mixer volume`}
        className="mixer-channel__slider"
        max="100"
        min="0"
        onChange={(event) => onChangeVolume(Number(event.target.value))}
        type="range"
        value={track.volume}
      />
      <button
        className="mixer-channel__button"
        data-active={track.muted}
        onClick={onToggleMute}
        type="button"
      >
        {track.muted ? 'Muted' : 'Mute'}
      </button>
      <button className="mixer-channel__button" onClick={onToggleActive} type="button">
        Remove
      </button>
    </section>
  );
}

export default MixerChannel;
