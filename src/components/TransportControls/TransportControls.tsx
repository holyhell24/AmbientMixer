import { FiX } from "react-icons/fi";
import { IoPlay, IoStop } from "react-icons/io5";
import type { TransportControlsProps } from "./types";

function TransportControls({
  activeCount,
  isPlaying,
  onReset,
  onTogglePlay,
}: TransportControlsProps) {
  return (
    <div className="flex w-full items-center justify-center gap-2.5 max-[360px]:grid max-[360px]:grid-cols-[1fr_auto]">
      <button
        className="inline-flex min-h-11 min-w-[146px] items-center justify-center gap-2 rounded-full border border-white/15 bg-[#fff9ef] px-4.5 font-black text-[#101112] disabled:cursor-not-allowed disabled:opacity-50 max-[360px]:min-w-0"
        disabled={activeCount === 0}
        onClick={onTogglePlay}
        type="button"
      >
        {isPlaying ? (
          <IoStop aria-hidden="true" className="h-4 w-4" />
        ) : (
          <IoPlay aria-hidden="true" className="h-4 w-4" />
        )}
        {isPlaying ? "Stop" : "Play"}
      </button>
      <button
        aria-label="Clear active sounds"
        className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-[#f7f0e4]"
        onClick={onReset}
        title="Clear active sounds"
        type="button"
      >
        <FiX aria-hidden="true" className="h-[18px] w-[18px]" />
      </button>
    </div>
  );
}

export default TransportControls;
