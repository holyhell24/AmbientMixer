import { FiVolume2, FiVolumeX, FiX } from "react-icons/fi";
import { IoPlay, IoStop } from "react-icons/io5";
import type { TransportControlsProps } from "./types";

function TransportControls({
  activeCount,
  isPlaying,
  masterMuted,
  masterVolume,
  onChangeMasterVolume,
  onReset,
  onToggleMasterMute,
  onTogglePlay,
}: TransportControlsProps) {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2.5 max-[520px]:grid max-[520px]:grid-cols-[1fr_auto]">
      <div className="flex items-center justify-center gap-2.5 max-[520px]:contents">
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
      <div className="flex min-h-11 w-[min(100%,320px)] items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-3.5 text-[#f7f0e4] max-[520px]:col-span-2">
        <button
          aria-label={masterMuted ? "Unmute all sounds" : "Mute all sounds"}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-black/20 text-[#f7f0e4] data-[active=true]:bg-[var(--theme-active)] data-[active=true]:text-[var(--theme-active-text)]"
          data-active={masterMuted}
          onClick={onToggleMasterMute}
          title={masterMuted ? "Unmute all" : "Mute all"}
          type="button"
        >
          {masterMuted ? (
            <FiVolumeX aria-hidden="true" className="h-4 w-4" />
          ) : (
            <FiVolume2 aria-hidden="true" className="h-4 w-4" />
          )}
        </button>
        <label className="grid min-w-0 flex-1 gap-1 text-[0.68rem] font-black tracking-[0.08em] text-[#aaa69f] uppercase">
          <span className="flex items-center justify-between gap-2">
            <span>Volume</span>
            <span className="text-[var(--theme-glow)]">{masterMuted ? 0 : masterVolume}%</span>
          </span>
          <input
            aria-label="Master volume"
            className="w-full accent-[var(--theme-accent)]"
            max="100"
            min="0"
            onChange={(event) => onChangeMasterVolume(Number(event.target.value))}
            type="range"
            value={masterVolume}
          />
        </label>
      </div>
    </div>
  );
}

export default TransportControls;
