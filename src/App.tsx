import { useEffect, useMemo, useRef, useState } from "react";
import CategoryFilter from "./components/CategoryFilter";
import ColorThemePicker from "./components/ColorThemePicker";
import MixerChannel from "./components/MixerChannel";
import PresetManager from "./components/PresetManager";
import SoundGrid from "./components/SoundGrid";
import TransportControls from "./components/TransportControls";
import { useTheme } from "./hooks/useTheme";
import presetData from "./presets.json";
import { categoryLabels, sounds } from "./soundLibrary";
import { SoundCategory } from "./types";
import type {
  PresetFile,
  Sound,
  SoundPreset,
  TrackState,
} from "./types";
import {
  addDeletedPresetId,
  applyPresetToTracks,
  createInitialTracks,
  createPreset,
  customPresetStorageKey,
  deletedPresetIdsStorageKey,
  downloadPresetFile,
  getActiveSounds,
  getImportedPresets,
  getPresetCategories,
  maxActiveTracks,
  mergePresets,
  normalizePreset,
  parseDeletedPresetIds,
  parseStoredPresets,
  removePresetById,
  resetTracks,
  restoreImportedPresetIds,
  stopAudio,
  syncTrackAudio,
  toggleSoundTrack,
  updateTrackState,
  type AudioGraph,
} from "./utils";

const builtInPresets = (presetData.presets satisfies SoundPreset[]).map(
  normalizePreset,
);

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState<SoundCategory>(
    SoundCategory.Nature,
  );
  const [tracks, setTracks] = useState<TrackState[]>(createInitialTracks);
  const [isPlaying, setIsPlaying] = useState(false);
  const [masterMuted, setMasterMuted] = useState(false);
  const [masterVolume, setMasterVolume] = useState(100);
  const { colorPresets, selectedColorPreset, setColorPreset } = useTheme();
  const [customPresets, setCustomPresets] = useState<SoundPreset[]>(() => {
    return parseStoredPresets(localStorage.getItem(customPresetStorageKey));
  });
  const [deletedPresetIds, setDeletedPresetIds] = useState<string[]>(() => {
    return parseDeletedPresetIds(localStorage.getItem(deletedPresetIdsStorageKey));
  });
  const audioRefs = useRef(new Map<string, HTMLAudioElement>());
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioGraphRefs = useRef(new Map<string, AudioGraph>());
  const randomReplayTimeoutRefs = useRef(new Map<string, number>());

  const soundById = useMemo(
    () => new Map<string, Sound>(sounds.map((sound) => [sound.id, sound])),
    [],
  );

  const activeTracks = tracks.filter((track) => track.active);
  const activeSounds = getActiveSounds(activeTracks, soundById);
  const selectedSounds = sounds.filter(
    (sound) => sound.category === selectedCategory,
  );
  const deletedPresetIdSet = new Set(deletedPresetIds);
  const presets = mergePresets(builtInPresets, customPresets).filter(
    (preset) => !deletedPresetIdSet.has(preset.id),
  );
  const presetCategories = getPresetCategories(presets);

  useEffect(() => {
    if (!isPlaying && audioRefs.current.size === 0) {
      return;
    }

    const audioContext = audioContextRef.current ?? new AudioContext();
    audioContextRef.current = audioContext;

    syncTrackAudio({
      audioContext,
      audioGraphs: audioGraphRefs.current,
      audioRefs: audioRefs.current,
      isPlaying,
      masterMuted,
      masterVolume,
      randomReplayTimeoutRefs: randomReplayTimeoutRefs.current,
      soundById,
      tracks,
    });
  }, [isPlaying, masterMuted, masterVolume, soundById, tracks]);

  useEffect(() => {
    const audioMap = audioRefs.current;
    const randomReplayTimeoutMap = randomReplayTimeoutRefs.current;

    return () => {
      stopAudio(audioMap, randomReplayTimeoutMap);
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
      updateTrackState(currentTracks, id, patch),
    );
  };

  const toggleSound = (sound: Sound) => {
    setTracks((currentTracks) =>
      toggleSoundTrack(currentTracks, sound.id, maxActiveTracks),
    );
  };

  const resetMixer = () => {
    setIsPlaying(false);
    setTracks(resetTracks);
  };

  const applyPreset = (preset: SoundPreset) => {
    setTracks((currentTracks) =>
      applyPresetToTracks(currentTracks, preset, maxActiveTracks),
    );
  };

  const savePreset = (name: string, category: string) => {
    const existingPreset = presets.find(
      (preset) => preset.name.toLowerCase() === name.toLowerCase(),
    );
    const preset = createPreset(name, category, activeTracks, existingPreset);

    if (!preset) {
      return;
    }

    setCustomPresets((currentPresets) =>
      mergePresets(currentPresets, [preset]),
    );
    setDeletedPresetIds((currentDeletedPresetIds) =>
      currentDeletedPresetIds.filter(
        (deletedPresetId) => deletedPresetId !== preset.id,
      ),
    );
  };

  const exportPresets = () => {
    downloadPresetFile(presets);
  };

  const importPresets = (presetFile: PresetFile) => {
    if (!Array.isArray(presetFile.presets)) {
      window.alert("This presets JSON file must include a presets array.");
      return;
    }

    const importedPresets = getImportedPresets(presetFile);

    if (!importedPresets) {
      window.alert("This presets JSON file must include a presets array.");
      return;
    }

    setCustomPresets((currentPresets) =>
      mergePresets(currentPresets, importedPresets),
    );
    setDeletedPresetIds((currentDeletedPresetIds) =>
      restoreImportedPresetIds(currentDeletedPresetIds, importedPresets),
    );
  };

  const removePreset = (id: string) => {
    setCustomPresets((currentPresets) =>
      removePresetById(currentPresets, id),
    );
    setDeletedPresetIds((currentDeletedPresetIds) =>
      addDeletedPresetId(currentDeletedPresetIds, id),
    );
  };

  return (
    <>
      <ColorThemePicker
        colorPresets={colorPresets}
        selectedColorPresetId={selectedColorPreset.id}
        onChangeColorPreset={setColorPreset}
      />
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
        className="mb-6 -mt-7 overflow-hidden rounded-lg border border-[color-mix(in_srgb,var(--theme-glow)_22%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--theme-glow)_8%,transparent),rgba(255,255,255,0.025)),rgba(18,20,25,0.88)] shadow-[0_24px_70px_rgba(0,0,0,0.36)] max-[640px]:-mt-4"
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
                  onChangeEqualizer={(eq) => updateTrack(sound.id, { eq })}
                  onChangePan={(pan) => updateTrack(sound.id, { pan })}
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
          masterMuted={masterMuted}
          masterVolume={masterVolume}
          onChangeMasterVolume={setMasterVolume}
          onReset={resetMixer}
          onToggleMasterMute={() =>
            setMasterMuted((currentValue) => !currentValue)
          }
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
          onToggleSound={toggleSound}
        />
      </section>
      </main>
    </>
  );
};

export default App;
