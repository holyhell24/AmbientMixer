import { FiShuffle, FiTrash2, FiVolume2, FiVolumeX } from 'react-icons/fi';
import SoundIcon from '../SoundIcon';
import type { MixerChannelProps } from './types';

function MixerChannel({
  sound,
  track,
  onChangeVolume,
  onToggleActive,
  onToggleMute,
  onToggleRandomize,
}: MixerChannelProps) {
  return (
    <section
      aria-label={`${sound.name} channel`}
      className="grid min-h-[292px] grid-rows-[auto_1fr_auto] gap-3 border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.025)),rgba(12,14,18,0.82)] p-3 max-[520px]:min-h-[246px] max-[520px]:p-2.5 max-[360px]:min-h-0"
    >
      <div className="grid justify-items-center gap-2">
        <span className="grid h-[38px] w-[38px] place-items-center rounded-full border border-white/15 bg-[radial-gradient(circle_at_35%_25%,rgba(154,202,224,0.28),transparent_56%),rgba(0,0,0,0.28)] text-[0.76rem] font-black text-white max-[520px]:h-8 max-[520px]:w-8 max-[520px]:text-[0.68rem]" aria-hidden="true">
          <SoundIcon name={sound.icon} />
        </span>
        <span className="line-clamp-2 min-h-[34px] max-w-full overflow-hidden text-center text-[0.78rem] leading-[1.18] font-black text-[#f6f2ea]">
          {sound.name}
        </span>
      </div>
      <div className="grid min-h-[136px] grid-rows-[1fr_auto] justify-items-center gap-2 rounded-lg bg-black/15 px-0 pt-3 pb-2.5 max-[520px]:min-h-28 max-[360px]:min-h-[104px]">
        <input
          aria-label={`${sound.name} mixer volume`}
          className="h-[104px] w-6 cursor-pointer accent-[#d8773b] [direction:rtl] [writing-mode:vertical-lr] max-[520px]:h-[84px] max-[360px]:h-[76px]"
          max="100"
          min="0"
          onChange={(event) => onChangeVolume(Number(event.target.value))}
          type="range"
          value={track.volume}
        />
        <span className="text-[0.72rem] font-black tracking-[0.08em] text-[#9acade]">{track.volume}%</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        <button
          aria-label={track.muted ? `Unmute ${sound.name}` : `Mute ${sound.name}`}
          className="inline-flex min-h-[34px] w-full items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/[0.055] text-[0.72rem] font-black text-[#f4efe7] hover:border-[#9acae0]/60 hover:bg-[#9acae0]/10 data-[active=true]:bg-[#ffb19a] data-[active=true]:text-[#101112]"
          data-active={track.muted}
          onClick={onToggleMute}
          title={track.muted ? 'Unmute' : 'Mute'}
          type="button"
        >
          {track.muted ? <FiVolumeX aria-hidden="true" className="h-[15px] w-[15px]" /> : <FiVolume2 aria-hidden="true" className="h-[15px] w-[15px]" />}
        </button>
        <button
          aria-label={`${track.randomize ? 'Disable' : 'Enable'} random replay delay for ${sound.name}`}
          className="inline-flex min-h-[34px] w-full items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/[0.055] text-[0.72rem] font-black text-[#f4efe7] hover:border-[#9acae0]/60 hover:bg-[#9acae0]/10 data-[active=true]:bg-[#ffb19a] data-[active=true]:text-[#101112]"
          data-active={track.randomize}
          onClick={onToggleRandomize}
          title={track.randomize ? 'Disable random delay' : 'Enable random delay'}
          type="button"
        >
          <FiShuffle aria-hidden="true" className="h-[15px] w-[15px]" />
        </button>
        <button
          aria-label={`Remove ${sound.name}`}
          className="inline-flex min-h-[34px] w-full items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/[0.055] text-[0.72rem] font-black text-[#b9b4c1] hover:border-[#9acae0]/60 hover:bg-[#9acae0]/10"
          onClick={onToggleActive}
          title="Remove"
          type="button"
        >
          <FiTrash2 aria-hidden="true" className="h-[15px] w-[15px]" />
        </button>
      </div>
    </section>
  );
}

export default MixerChannel;
