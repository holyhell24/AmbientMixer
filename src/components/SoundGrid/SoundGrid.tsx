import SoundCard from '../SoundCard';
import type { SoundGridProps } from './types';

function SoundGrid({
  sounds,
  tracks,
  maxActiveReached,
  onChangeVolume,
  onToggleSound,
}: SoundGridProps) {
  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(156px,1fr))] gap-3.5 max-[640px]:grid-cols-[repeat(auto-fit,minmax(132px,1fr))] max-[520px]:gap-2 max-[340px]:grid-cols-1">
      {sounds.map((sound) => {
        const track = tracks.find((currentTrack) => currentTrack.id === sound.id);

        if (!track) {
          return null;
        }

        return (
          <SoundCard
            disabled={maxActiveReached && !track.active}
            key={sound.id}
            sound={sound}
            track={track}
            onChangeVolume={onChangeVolume}
            onToggleSound={onToggleSound}
          />
        );
      })}
    </div>
  );
}

export default SoundGrid;
