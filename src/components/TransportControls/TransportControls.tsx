import { FiX } from "react-icons/fi";
import { IoStop, IoPlay } from "react-icons/io5";
import type { TransportControlsProps } from "./types";

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
        {isPlaying ? (
          <IoStop aria-hidden="true" />
        ) : (
          <IoPlay aria-hidden="true" />
        )}
        {isPlaying ? "Stop" : "Play"}
      </button>
      <button
        aria-label="Clear active sounds"
        className="transport-controls__icon"
        onClick={onReset}
        title="Clear active sounds"
        type="button"
      >
        <FiX aria-hidden="true" />
      </button>
    </div>
  );
}

export default TransportControls;
