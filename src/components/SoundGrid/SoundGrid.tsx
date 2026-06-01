import SoundCard from '../SoundCard';
import type { SoundGridProps } from './types';

function SoundGrid({ sounds, tracks, onChangeVolume, onToggleSound }: SoundGridProps) {
  return (
    <div className="sound-grid">
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
