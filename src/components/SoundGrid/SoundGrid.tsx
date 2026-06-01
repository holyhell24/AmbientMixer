import SoundCard from '../SoundCard';
import type { SoundGridProps } from './types';

function SoundGrid({ sounds, tracks, onChangeVolume, onToggleSound }: SoundGridProps) {
  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(156px,1fr))] gap-3.5 max-[520px]:grid-cols-3 max-[520px]:gap-2">
      {sounds.map((sound) => {
        const track = tracks.find((currentTrack) => currentTrack.id === sound.id);

        if (!track) {
          return null;
        }

        return (
          <SoundCard
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
