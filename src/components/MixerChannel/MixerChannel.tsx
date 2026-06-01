import { FiShuffle, FiTrash2, FiVolume2, FiVolumeX } from "react-icons/fi";
import SoundIcon from "../SoundIcon";
import type { MixerChannelProps } from "./types";

function MixerChannel({
  sound,
  track,
  onChangeVolume,
  onToggleActive,
  onToggleMute,
  onToggleRandomize,
}: MixerChannelProps) {
  return (
    <section className="mixer-channel" aria-label={`${sound.name} channel`}>
      <div className="mixer-channel__top">
        <span className="mixer-channel__badge" aria-hidden="true">
          <SoundIcon name={sound.icon} />
        </span>
        <span className="mixer-channel__label">{sound.name}</span>
      </div>
      <div className="mixer-channel__fader">
        <input
          aria-label={`${sound.name} mixer volume`}
          className="mixer-channel__slider"
          max="100"
          min="0"
          onChange={(event) => onChangeVolume(Number(event.target.value))}
          type="range"
          value={track.volume}
        />
        <span className="mixer-channel__volume">{track.volume}%</span>
      </div>
      <div className="mixer-channel__actions">
        <button
          aria-label={track.muted ? `Unmute ${sound.name}` : `Mute ${sound.name}`}
          className="mixer-channel__button"
          data-active={track.muted}
          onClick={onToggleMute}
          title={track.muted ? "Unmute" : "Mute"}
          type="button"
        >
          {track.muted ? (
            <FiVolumeX aria-hidden="true" />
          ) : (
            <FiVolume2 aria-hidden="true" />
          )}
        </button>
        <button
          aria-label={`${track.randomize ? "Disable" : "Enable"} random replay delay for ${sound.name}`}
          className="mixer-channel__button"
          data-active={track.randomize}
          onClick={onToggleRandomize}
          title={track.randomize ? "Disable random delay" : "Enable random delay"}
          type="button"
        >
          <FiShuffle aria-hidden="true" />
        </button>
        <button
          aria-label={`Remove ${sound.name}`}
          className="mixer-channel__button mixer-channel__button--remove"
          onClick={onToggleActive}
          title="Remove"
          type="button"
        >
          <FiTrash2 aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

export default MixerChannel;
