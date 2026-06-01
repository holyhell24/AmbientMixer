import SoundIcon from '../SoundIcon';
import type { SoundCardProps } from './types';

function SoundCard({ sound, track, onChangeVolume, onToggleSound }: SoundCardProps) {
  return (
    <article
      className="min-h-36 rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02)),rgba(5,6,7,0.45)] p-4 transition hover:-translate-y-0.5 data-[active=true]:border-[#fff9ef]/90 data-[active=true]:bg-[linear-gradient(180deg,rgba(158,210,200,0.13),rgba(220,119,59,0.06)),rgba(5,6,7,0.58)] max-[520px]:min-h-[132px] max-[520px]:p-2"
      data-active={track.active}
    >
      <button
        aria-pressed={track.active}
        className="grid w-full place-items-center gap-2.5 border-0 bg-transparent text-[#fff9ef] max-[520px]:gap-1.5"
        onClick={() => onToggleSound(sound)}
        type="button"
      >
        <span className="grid h-[42px] w-[42px] place-items-center rounded-full border border-white/15 bg-black/20 text-xl text-white max-[520px]:h-[34px] max-[520px]:w-[34px] max-[520px]:text-xs" aria-hidden="true">
          <SoundIcon name={sound.icon} />
        </span>
        <span className="min-h-10 text-center leading-[1.18] font-extrabold text-white max-[520px]:min-h-8 max-[520px]:text-[0.82rem] max-[520px]:break-anywhere">{sound.name}</span>
      </button>
      <label className="mt-2.5 grid gap-1.5 text-[0.72rem] font-extrabold tracking-[0.08em] text-[#aaa69f] uppercase max-[520px]:mt-1 max-[520px]:text-[0.62rem]">
        <span>Volume</span>
        <input
          aria-label={`${sound.name} volume`}
          className="w-full accent-[#d8773b]"
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
