import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CategoryFilter from "./components/CategoryFilter";
import MixerChannel from "./components/MixerChannel";
import PresetManager from "./components/PresetManager";
import SoundGrid from "./components/SoundGrid";
import TransportControls from "./components/TransportControls";
import presetData from "./presets.json";
import { categoryLabels, sounds } from "./soundLibrary";
import { SoundCategory } from "./types";
import type { PresetFile, Sound, SoundPreset, TrackState } from "./types";

const initialTracks: TrackState[] = sounds.map((sound, index) => ({
  id: sound.id,
  active: index < 3,
  muted: false,
  randomize: false,
  volume: index < 3 ? 58 : 42,
}));

const customPresetStorageKey = "ambient-mixer-presets";
const deletedPresetIdsStorageKey = "ambient-mixer-deleted-preset-ids";
const builtInPresets = presetData.presets satisfies SoundPreset[];
const maxActiveTracks = 6;

const normalizePreset = (preset: SoundPreset): SoundPreset => ({
  id: preset.id || `preset-${crypto.randomUUID()}`,
  name: preset.name || "Imported Preset",
  category: preset.category?.trim() || "Custom",
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
  const [selectedCategory, setSelectedCategory] = useState<SoundCategory>(
    SoundCategory.Nature,
  );
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
  const [deletedPresetIds, setDeletedPresetIds] = useState<string[]>(() => {
    const storedDeletedPresetIds = localStorage.getItem(
      deletedPresetIdsStorageKey,
    );

    if (!storedDeletedPresetIds) {
      return [];
    }

    try {
      const parsedDeletedPresetIds = JSON.parse(storedDeletedPresetIds);

      return Array.isArray(parsedDeletedPresetIds)
        ? parsedDeletedPresetIds.filter((id): id is string => typeof id === "string")
        : [];
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
  const deletedPresetIdSet = new Set(deletedPresetIds);
  const presets = mergePresets(builtInPresets, customPresets).filter(
    (preset) => !deletedPresetIdSet.has(preset.id),
  );
  const presetCategories = Array.from(
    new Set(presets.map((preset) => preset.category).filter(Boolean)),
  ).sort((firstCategory, secondCategory) =>
    firstCategory.localeCompare(secondCategory),
  );

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
      audio.currentTime = 0;
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

  useEffect(() => {
    localStorage.setItem(
      deletedPresetIdsStorageKey,
      JSON.stringify(deletedPresetIds, null, 2),
    );
  }, [deletedPresetIds]);

  const updateTrack = (id: string, patch: Partial<TrackState>) => {
    setTracks((currentTracks) =>
      currentTracks.map((track) =>
        track.id === id ? { ...track, ...patch } : track,
      ),
    );
  };

  const toggleSound = (sound: Sound) => {
    setTracks((currentTracks) =>
      currentTracks.map((track) => {
        if (track.id !== sound.id) {
          return track;
        }

        const activeTrackCount = currentTracks.filter(
          (currentTrack) => currentTrack.active,
        ).length;

        if (!track.active && activeTrackCount >= maxActiveTracks) {
          return track;
        }

        return { ...track, active: !track.active, muted: false };
      }),
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
      preset.tracks.slice(0, maxActiveTracks).map((track) => [track.id, track]),
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

  const savePreset = (name: string, category: string) => {
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
        category: category.trim() || "Custom",
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
    setDeletedPresetIds((currentDeletedPresetIds) =>
      currentDeletedPresetIds.filter(
        (deletedPresetId) =>
          !importedPresets.some((preset) => preset.id === deletedPresetId),
      ),
    );
  };

  const removePreset = (id: string) => {
    setCustomPresets((currentPresets) =>
      currentPresets.filter((preset) => preset.id !== id),
    );
    setDeletedPresetIds((currentDeletedPresetIds) =>
      currentDeletedPresetIds.includes(id)
        ? currentDeletedPresetIds
        : [...currentDeletedPresetIds, id],
    );
  };

  return (
    <main className="mx-auto min-h-svh w-[min(880px,calc(100%-32px))] px-0 py-16 text-[#f8f7fb] max-[640px]:w-full max-[640px]:px-3 max-[640px]:pt-8 max-[420px]:px-2">
      <section
        className="grid justify-items-center pb-16 text-center max-[640px]:pb-10"
        aria-labelledby="app-title"
      >
        <h1
          className="m-0 text-balance font-serif text-[clamp(2.2rem,7vw,4rem)] leading-none tracking-normal text-white [text-shadow:0_2px_0_rgba(72,46,31,0.85)] max-[420px]:text-[2.45rem]"
          id="app-title"
        >
          Ambient Mixer
        </h1>
      </section>

      <aside
        className="mb-6 -mt-7 overflow-hidden rounded-lg border border-[#9acae0]/20 bg-[linear-gradient(180deg,rgba(154,202,224,0.08),rgba(255,255,255,0.025)),rgba(18,20,25,0.88)] shadow-[0_24px_70px_rgba(0,0,0,0.36)] max-[640px]:-mt-4"
        aria-label="Mixer channels"
      >
        <div className="flex items-center justify-between gap-3.5 border-b border-white/10 px-4.5 py-4 text-[#a5a2ad] max-[420px]:px-3 max-[420px]:py-3">
          <h2 className="m-0 font-serif text-2xl tracking-normal text-white">
            Mixer
          </h2>
          <span>{activeTracks.length} active</span>
        </div>
        {activeSounds.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(128px,1fr))] gap-2.5 p-2.5 max-[560px]:grid-cols-2 max-[360px]:grid-cols-1">
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
                  onChangeVolume={(volume) => updateTrack(sound.id, { volume })}
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
          <p className="m-0 p-7 text-center text-[#9c98a5]">
            Choose a sound card to add it to the mix.
          </p>
        )}
      </aside>

      <section
        className="relative mb-8 mt-3 grid justify-items-center max-[640px]:mb-7 max-[640px]:mt-2"
        aria-label="Playback controls"
      >
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
        presetCategories={presetCategories}
        onApplyPreset={applyPreset}
        onExportPresets={exportPresets}
        onImportPresets={importPresets}
        onRemovePreset={removePreset}
        onSavePreset={savePreset}
      />

      <section
        className="grid gap-4.5 justify-items-center"
        aria-label="Categories"
      >
        <h2 className="m-0 font-serif text-[clamp(1.65rem,4vw,2.15rem)] tracking-normal text-white">
          Categories
        </h2>
        <CategoryFilter
          activeCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </section>

      <section
        className="mt-8 grid gap-5.5 justify-items-center"
        aria-labelledby="library-title"
      >
        <div className="grid justify-items-center gap-3">
          <h2
            className="m-0 font-serif text-[clamp(1.65rem,4vw,2.15rem)] tracking-normal text-white"
            id="library-title"
          >
            {categoryLabels[selectedCategory]}
          </h2>
        </div>
        <SoundGrid
          sounds={selectedSounds}
          tracks={tracks}
          maxActiveReached={activeTracks.length >= maxActiveTracks}
          onChangeVolume={(id, volume) => updateTrack(id, { volume })}
          onToggleSound={toggleSound}
        />
      </section>
    </main>
  );
}

export default App;
