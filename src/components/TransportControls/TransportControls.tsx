import type { TransportControlsProps } from './types';

function TransportControls({
  activeCount,
  isPlaying,
  onReset,
  onTogglePlay,
}: TransportControlsProps) {
  return (
    <div className="transport-controls">
      <button
        className="transport-controls__play"
        disabled={activeCount === 0}
        onClick={onTogglePlay}
        type="button"
      >
        <span aria-hidden="true">{isPlaying ? '■' : '▶'}</span>
        {isPlaying ? 'Stop' : 'Play'}
      </button>
      <button
        aria-label="Clear active sounds"
        className="transport-controls__icon"
        onClick={onReset}
        title="Clear active sounds"
        type="button"
      >
        ⌫
      </button>
    </div>
  );
}

export default TransportControls;
