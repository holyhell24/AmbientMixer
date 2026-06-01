import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CategoryFilter from "./components/CategoryFilter";
import MixerChannel from "./components/MixerChannel";
import PresetManager from "./components/PresetManager";
import SoundGrid from "./components/SoundGrid";
import TransportControls from "./components/TransportControls";
import presetData from "./presets.json";
import { categoryLabels, sounds } from "./soundLibrary";
import { appStyles } from "./styles";
import { SoundCategory } from "./types";
import type {
  PresetFile,
  Sound,
  SoundPreset,
  TrackState,
} from "./types";

const initialTracks: TrackState[] = sounds.map((sound, index) => ({
  id: sound.id,
  active: index < 3,
  muted: false,
  randomize: false,
  volume: index < 3 ? 58 : 42,
}));

const customPresetStorageKey = "ambient-mixer-presets";
const builtInPresets = presetData.presets satisfies SoundPreset[];

const normalizePreset = (preset: SoundPreset): SoundPreset => ({
  id: preset.id || `preset-${crypto.randomUUID()}`,
  name: preset.name || "Imported Preset",
  tracks: preset.tracks
    .filter((track) => sounds.some((sound) => sound.id === track.id))
    .map((track) => ({
      id: track.id,
      muted: Boolean(track.muted),
      randomize: Boolean(track.randomize),
      volume: Math.min(100, Math.max(0, Number(track.volume) || 0)),
    })),
});

const mergePresets = (
  basePresets: SoundPreset[],
  overridePresets: SoundPreset[],
) => {
  const presetById = new Map(basePresets.map((preset) => [preset.id, preset]));

  overridePresets.forEach((preset) => {
    presetById.set(preset.id, preset);
  });

  return Array.from(presetById.values());
};

function App() {
  const [selectedCategory, setSelectedCategory] =
    useState<SoundCategory>(SoundCategory.Nature);
  const [tracks, setTracks] = useState<TrackState[]>(initialTracks);
  const [isPlaying, setIsPlaying] = useState(false);
  const [customPresets, setCustomPresets] = useState<SoundPreset[]>(() => {
    const storedPresetFile = localStorage.getItem(customPresetStorageKey);

    if (!storedPresetFile) {
      return [];
    }

    try {
      const parsedPresetFile = JSON.parse(storedPresetFile) as PresetFile;

      return parsedPresetFile.presets
        .map(normalizePreset)
        .filter((preset) => preset.tracks.length > 0);
    } catch {
      return [];
    }
  });
  const audioRefs = useRef(new Map<string, HTMLAudioElement>());
  const randomReplayTimeoutRefs = useRef(new Map<string, number>());

  const soundById = useMemo(
    () => new Map<string, Sound>(sounds.map((sound) => [sound.id, sound])),
    [],
  );

  const activeTracks = tracks.filter((track) => track.active);
  const activeSounds = activeTracks
    .map((track) => soundById.get(track.id))
    .filter((sound): sound is Sound => Boolean(sound));
  const selectedSounds = sounds.filter(
    (sound) => sound.category === selectedCategory,
  );
  const presets = mergePresets(builtInPresets, customPresets);

  const getAudio = useCallback((sound: Sound) => {
    const existingAudio = audioRefs.current.get(sound.id);

    if (existingAudio) {
      return existingAudio;
    }

    const audio = new Audio(sound.src);
    audio.loop = true;
    audio.preload = "auto";
    audioRefs.current.set(sound.id, audio);

    return audio;
  }, []);

  useEffect(() => {
    randomReplayTimeoutRefs.current.forEach((timeoutId) => {
      window.clearTimeout(timeoutId);
    });
    randomReplayTimeoutRefs.current.clear();

    tracks.forEach((track) => {
      const sound = soundById.get(track.id);

      if (!sound) {
        return;
      }

      const audio = getAudio(sound);
      audio.onended = null;
      audio.loop = !track.randomize;
      audio.volume = track.muted ? 0 : track.volume / 100;

      if (isPlaying && track.active) {
        if (track.randomize) {
          audio.onended = () => {
            const delay = Math.floor(5000 + Math.random() * 5000);
            const timeoutId = window.setTimeout(() => {
              audio.currentTime = 0;
              void audio.play();
              randomReplayTimeoutRefs.current.delete(track.id);
            }, delay);

            randomReplayTimeoutRefs.current.set(track.id, timeoutId);
          };
        }

        void audio.play();
        return;
      }

      audio.pause();
    });
  }, [getAudio, isPlaying, soundById, tracks]);

  useEffect(() => {
    const audioMap = audioRefs.current;
    const randomReplayTimeoutMap = randomReplayTimeoutRefs.current;

    return () => {
      randomReplayTimeoutMap.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
      randomReplayTimeoutMap.clear();
      audioMap.forEach((audio) => {
        audio.pause();
      });
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(
      customPresetStorageKey,
      JSON.stringify({ presets: customPresets }, null, 2),
    );
  }, [customPresets]);

  const updateTrack = (id: string, patch: Partial<TrackState>) => {
    setTracks((currentTracks) =>
      currentTracks.map((track) =>
        track.id === id ? { ...track, ...patch } : track,
      ),
    );
  };

  const toggleSound = (sound: Sound) => {
    setTracks((currentTracks) =>
      currentTracks.map((track) =>
        track.id === sound.id
          ? { ...track, active: !track.active, muted: false }
          : track,
      ),
    );
  };

  const resetMixer = () => {
    setIsPlaying(false);
    setTracks((currentTracks) =>
      currentTracks.map((track) => ({
        ...track,
        active: false,
        muted: false,
        randomize: false,
        volume: 50,
      })),
    );
  };

  const applyPreset = (preset: SoundPreset) => {
    const presetTrackById = new Map(
      preset.tracks.map((track) => [track.id, track]),
    );

    setTracks((currentTracks) =>
      currentTracks.map((track) => {
        const presetTrack = presetTrackById.get(track.id);

        if (!presetTrack) {
          return { ...track, active: false };
        }

        return {
          ...track,
          active: true,
          muted: presetTrack.muted,
          randomize: Boolean(presetTrack.randomize),
          volume: presetTrack.volume,
        };
      }),
    );
  };

  const savePreset = (name: string) => {
    const activePresetTracks = activeTracks.map((track) => ({
      id: track.id,
      muted: track.muted,
      randomize: track.randomize,
      volume: track.volume,
    }));

    if (activePresetTracks.length === 0) {
      return;
    }

    setCustomPresets((currentPresets) => [
      ...currentPresets,
      {
        id: `preset-${crypto.randomUUID()}`,
        name,
        tracks: activePresetTracks,
      },
    ]);
  };

  const exportPresets = () => {
    const presetFile: PresetFile = { presets };
    const blob = new Blob([JSON.stringify(presetFile, null, 2)], {
      type: "application/json",
    });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = objectUrl;
    link.download = "ambient-mixer-presets.json";
    link.click();
    URL.revokeObjectURL(objectUrl);
  };

  const importPresets = (presetFile: PresetFile) => {
    if (!Array.isArray(presetFile.presets)) {
      window.alert("This presets JSON file must include a presets array.");
      return;
    }

    const importedPresets = presetFile.presets
      .map(normalizePreset)
      .filter((preset) => preset.tracks.length > 0);

    setCustomPresets((currentPresets) =>
      mergePresets(currentPresets, importedPresets),
    );
  };

  return (
    <>
      <style>{appStyles}</style>
      <main className="app">
        <section className="app__intro" aria-labelledby="app-title">
          <h1 className="app__title" id="app-title">
            Ambient Sounds
          </h1>
          <p className="app__subtitle">For Focus and Calm</p>
          <span className="app__count">{sounds.length} sounds</span>
        </section>

        <aside className="app__mixer" aria-label="Mixer channels">
          <div className="app__mixer-heading">
            <h2 className="app__section-title">Mixer</h2>
            <span>{activeTracks.length} active</span>
          </div>
          {activeSounds.length > 0 ? (
            <div className="app__channels">
              {activeSounds.map((sound) => {
                const track = tracks.find(
                  (currentTrack) => currentTrack.id === sound.id,
                );

                if (!track) {
                  return null;
                }

                return (
                  <MixerChannel
                    key={sound.id}
                    sound={sound}
                    track={track}
                    onChangeVolume={(volume) =>
                      updateTrack(sound.id, { volume })
                    }
                    onToggleActive={() =>
                      updateTrack(sound.id, { active: !track.active })
                    }
                    onToggleMute={() =>
                      updateTrack(sound.id, { muted: !track.muted })
                    }
                    onToggleRandomize={() =>
                      updateTrack(sound.id, { randomize: !track.randomize })
                    }
                  />
                );
              })}
            </div>
          ) : (
            <p className="app__empty">
              Choose a sound card to add it to the mix.
            </p>
          )}
        </aside>

        <section className="app__transport" aria-label="Playback controls">
          <TransportControls
            activeCount={activeTracks.length}
            isPlaying={isPlaying}
            onReset={resetMixer}
            onTogglePlay={() => setIsPlaying((currentValue) => !currentValue)}
          />
        </section>

        <PresetManager
          activeCount={activeTracks.length}
          presets={presets}
          onApplyPreset={applyPreset}
          onExportPresets={exportPresets}
          onImportPresets={importPresets}
          onSavePreset={savePreset}
        />

        <section className="app__categories" aria-label="Categories">
          <h2 className="app__section-title">Categories</h2>
          <CategoryFilter
            activeCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </section>

        <section className="app__library" aria-labelledby="library-title">
          <div className="app__library-heading">
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
      </main>
    </>
  );
}

export default App;
