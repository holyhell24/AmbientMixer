import SoundIcon from '../SoundIcon';
import type { SoundCardProps } from './types';

function SoundCard({
  disabled,
  sound,
  track,
  onToggleSound,
}: SoundCardProps) {
  return (
    <article
      className="min-h-32 rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02)),rgba(5,6,7,0.45)] p-4 transition hover:-translate-y-0.5 data-[active=true]:border-[var(--theme-active)] data-[active=true]:bg-[linear-gradient(180deg,color-mix(in_srgb,var(--theme-ring)_13%,transparent),color-mix(in_srgb,var(--theme-accent)_7%,transparent)),rgba(5,6,7,0.58)] data-[disabled=true]:opacity-45 data-[disabled=true]:hover:translate-y-0 max-[520px]:min-h-[112px] max-[520px]:p-2 max-[360px]:min-h-0"
      data-active={track.active}
      data-disabled={disabled}
    >
      <button
        aria-pressed={track.active}
        className="grid w-full place-items-center gap-2.5 border-0 bg-transparent text-[#fff9ef] disabled:cursor-not-allowed max-[520px]:gap-1.5"
        disabled={disabled}
        onClick={() => onToggleSound(sound)}
        type="button"
      >
        <span className="grid h-[42px] w-[42px] place-items-center rounded-full border border-white/15 bg-black/20 text-xl text-white max-[520px]:h-[34px] max-[520px]:w-[34px] max-[520px]:text-xs" aria-hidden="true">
          <SoundIcon name={sound.icon} />
        </span>
        <span className="min-h-10 text-center leading-[1.18] font-extrabold text-white max-[520px]:min-h-8 max-[520px]:text-[0.82rem] max-[520px]:break-anywhere">{sound.name}</span>
      </button>
    </article>
  );
}

export default SoundCard;
