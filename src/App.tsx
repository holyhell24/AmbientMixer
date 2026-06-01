import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CategoryFilter from './components/CategoryFilter';
import MixerChannel from './components/MixerChannel';
import SoundGrid from './components/SoundGrid';
import TransportControls from './components/TransportControls';
import { categoryLabels, sounds } from './soundLibrary';
import { appStyles } from './styles';
import type { Sound, SoundCategory, TrackState } from './types';

const initialTracks: TrackState[] = sounds.map((sound, index) => ({
  id: sound.id,
  active: index < 3,
  muted: false,
  volume: index < 3 ? 58 : 42,
}));

function App() {
  const [selectedCategory, setSelectedCategory] = useState<SoundCategory>('nature');
  const [tracks, setTracks] = useState<TrackState[]>(initialTracks);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRefs = useRef(new Map<string, HTMLAudioElement>());

  const soundById = useMemo(
    () => new Map<string, Sound>(sounds.map((sound) => [sound.id, sound])),
    [],
  );

  const activeTracks = tracks.filter((track) => track.active);
  const activeSounds = activeTracks
    .map((track) => soundById.get(track.id))
    .filter((sound): sound is Sound => Boolean(sound));
  const selectedSounds = sounds.filter((sound) => sound.category === selectedCategory);

  const getAudio = useCallback((sound: Sound) => {
    const existingAudio = audioRefs.current.get(sound.id);

    if (existingAudio) {
      return existingAudio;
    }

    const audio = new Audio(sound.src);
    audio.loop = true;
    audio.preload = 'auto';
    audioRefs.current.set(sound.id, audio);

    return audio;
  }, []);

  useEffect(() => {
    tracks.forEach((track) => {
      const sound = soundById.get(track.id);

      if (!sound) {
        return;
      }

      const audio = getAudio(sound);
      audio.volume = track.muted ? 0 : track.volume / 100;

      if (isPlaying && track.active) {
        void audio.play();
        return;
      }

      audio.pause();
    });
  }, [getAudio, isPlaying, soundById, tracks]);

  useEffect(() => {
    const audioMap = audioRefs.current;

    return () => {
      audioMap.forEach((audio) => {
        audio.pause();
      });
    };
  }, []);

  const updateTrack = (id: string, patch: Partial<TrackState>) => {
    setTracks((currentTracks) =>
      currentTracks.map((track) => (track.id === id ? { ...track, ...patch } : track)),
    );
  };

  const toggleSound = (sound: Sound) => {
    setTracks((currentTracks) =>
      currentTracks.map((track) =>
        track.id === sound.id ? { ...track, active: !track.active, muted: false } : track,
      ),
    );
  };

  const resetMixer = () => {
    setIsPlaying(false);
    setTracks((currentTracks) =>
      currentTracks.map((track) => ({ ...track, active: false, muted: false, volume: 50 })),
    );
  };

  return (
    <>
      <style>{appStyles}</style>
      <main className="app">
        <section className="app__intro" aria-labelledby="app-title">
          <div className="app__mark" aria-hidden="true">
            ✺
          </div>
          <h1 className="app__title" id="app-title">
            Ambient Sounds
          </h1>
          <p className="app__subtitle">For Focus and Calm</p>
          <span className="app__count">◍ {sounds.length} sounds</span>
        </section>

        <section className="app__categories" aria-label="Categories">
          <h2 className="app__section-title">Categories</h2>
          <CategoryFilter activeCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        </section>

        <section className="app__transport" aria-label="Playback controls">
          <TransportControls
            activeCount={activeTracks.length}
            isPlaying={isPlaying}
            onReset={resetMixer}
            onTogglePlay={() => setIsPlaying((currentValue) => !currentValue)}
          />
        </section>

        <section className="app__library" aria-labelledby="library-title">
          <div className="app__library-heading">
            <span className="app__category-icon" aria-hidden="true">
              ◌
            </span>
            <h2 className="app__section-title" id="library-title">
              {categoryLabels[selectedCategory]}
            </h2>
          </div>
          <SoundGrid
            sounds={selectedSounds}
            tracks={tracks}
            onChangeVolume={(id, volume) => updateTrack(id, { volume })}
            onToggleSound={toggleSound}
          />
        </section>

        <aside className="app__mixer" aria-label="Mixer channels">
          <div className="app__mixer-heading">
            <h2 className="app__section-title">Mixer</h2>
            <span>{activeTracks.length} active</span>
          </div>
          {activeSounds.length > 0 ? (
            <div className="app__channels">
              {activeSounds.map((sound) => {
                const track = tracks.find((currentTrack) => currentTrack.id === sound.id);

                if (!track) {
                  return null;
                }

                return (
                  <MixerChannel
                    key={sound.id}
                    sound={sound}
                    track={track}
                    onChangeVolume={(volume) => updateTrack(sound.id, { volume })}
                    onToggleActive={() => updateTrack(sound.id, { active: !track.active })}
                    onToggleMute={() => updateTrack(sound.id, { muted: !track.muted })}
                  />
                );
              })}
            </div>
          ) : (
            <p className="app__empty">Choose a sound card to add it to the mix.</p>
          )}
        </aside>
      </main>
    </>
  );
}

export default App;
