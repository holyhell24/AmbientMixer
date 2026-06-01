import { sounds } from './soundLibrary';
import type { PresetFile, Sound, SoundPreset, TrackState } from './types';

export const customPresetStorageKey = 'ambient-mixer-presets';
export const deletedPresetIdsStorageKey = 'ambient-mixer-deleted-preset-ids';
export const maxActiveTracks = 6;

export const createInitialTracks = (): TrackState[] =>
  sounds.map((sound, index) => ({
    id: sound.id,
    active: index < 3,
    muted: false,
    randomize: false,
    volume: index < 3 ? 58 : 42,
  }));

export const normalizePreset = (preset: SoundPreset): SoundPreset => ({
  id: preset.id || `preset-${crypto.randomUUID()}`,
  name: preset.name || 'Imported Preset',
  category: preset.category?.trim() || 'Custom',
  tracks: preset.tracks
    .filter((track) => sounds.some((sound) => sound.id === track.id))
    .map((track) => ({
      id: track.id,
      muted: Boolean(track.muted),
      randomize: Boolean(track.randomize),
      volume: Math.min(100, Math.max(0, Number(track.volume) || 0)),
    })),
});

export const parseStoredPresets = (storedPresetFile: string | null) => {
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
};

export const parseDeletedPresetIds = (storedDeletedPresetIds: string | null) => {
  if (!storedDeletedPresetIds) {
    return [];
  }

  try {
    const parsedDeletedPresetIds = JSON.parse(storedDeletedPresetIds);

    return Array.isArray(parsedDeletedPresetIds)
      ? parsedDeletedPresetIds.filter(
          (id): id is string => typeof id === 'string',
        )
      : [];
  } catch {
    return [];
  }
};

export const mergePresets = (
  basePresets: SoundPreset[],
  overridePresets: SoundPreset[],
) => {
  const presetById = new Map(basePresets.map((preset) => [preset.id, preset]));

  overridePresets.forEach((preset) => {
    presetById.set(preset.id, preset);
  });

  return Array.from(presetById.values());
};

export const getPresetCategories = (presets: SoundPreset[]) =>
  Array.from(
    new Set(presets.map((preset) => preset.category).filter(Boolean)),
  ).sort((firstCategory, secondCategory) =>
    firstCategory.localeCompare(secondCategory),
  );

export const getActiveSounds = (
  activeTracks: TrackState[],
  soundById: Map<string, Sound>,
) =>
  activeTracks
    .map((track) => soundById.get(track.id))
    .filter((sound): sound is Sound => Boolean(sound));

export const updateTrackState = (
  tracks: TrackState[],
  id: string,
  patch: Partial<TrackState>,
) =>
  tracks.map((track) => (track.id === id ? { ...track, ...patch } : track));

export const toggleSoundTrack = (
  tracks: TrackState[],
  soundId: string,
  maxActiveTrackCount: number,
) =>
  tracks.map((track) => {
    if (track.id !== soundId) {
      return track;
    }

    const activeTrackCount = tracks.filter(
      (currentTrack) => currentTrack.active,
    ).length;

    if (!track.active && activeTrackCount >= maxActiveTrackCount) {
      return track;
    }

    return { ...track, active: !track.active, muted: false };
  });

export const resetTracks = (tracks: TrackState[]) =>
  tracks.map((track) => ({
    ...track,
    active: false,
    muted: false,
    randomize: false,
    volume: 50,
  }));

export const applyPresetToTracks = (
  tracks: TrackState[],
  preset: SoundPreset,
  maxActiveTrackCount: number,
) => {
  const presetTrackById = new Map(
    preset.tracks.slice(0, maxActiveTrackCount).map((track) => [track.id, track]),
  );

  return tracks.map((track) => {
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
  });
};

export const createPreset = (
  name: string,
  category: string,
  activeTracks: TrackState[],
): SoundPreset | null => {
  const activePresetTracks = activeTracks.map((track) => ({
    id: track.id,
    muted: track.muted,
    randomize: track.randomize,
    volume: track.volume,
  }));

  if (activePresetTracks.length === 0) {
    return null;
  }

  return {
    id: `preset-${crypto.randomUUID()}`,
    name,
    category: category.trim() || 'Custom',
    tracks: activePresetTracks,
  };
};

export const getImportedPresets = (presetFile: PresetFile) => {
  if (!Array.isArray(presetFile.presets)) {
    return null;
  }

  return presetFile.presets
    .map(normalizePreset)
    .filter((preset) => preset.tracks.length > 0);
};

export const removePresetById = (presets: SoundPreset[], id: string) =>
  presets.filter((preset) => preset.id !== id);

export const addDeletedPresetId = (deletedPresetIds: string[], id: string) =>
  deletedPresetIds.includes(id) ? deletedPresetIds : [...deletedPresetIds, id];

export const restoreImportedPresetIds = (
  deletedPresetIds: string[],
  importedPresets: SoundPreset[],
) =>
  deletedPresetIds.filter(
    (deletedPresetId) =>
      !importedPresets.some((preset) => preset.id === deletedPresetId),
  );

export const downloadPresetFile = (presets: SoundPreset[]) => {
  const presetFile: PresetFile = { presets };
  const blob = new Blob([JSON.stringify(presetFile, null, 2)], {
    type: 'application/json',
  });
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = objectUrl;
  link.download = 'ambient-mixer-presets.json';
  link.click();
  URL.revokeObjectURL(objectUrl);
};

export const getAudio = (
  sound: Sound,
  audioRefs: Map<string, HTMLAudioElement>,
) => {
  const existingAudio = audioRefs.get(sound.id);

  if (existingAudio) {
    return existingAudio;
  }

  const audio = new Audio(sound.src);
  audio.loop = true;
  audio.preload = 'auto';
  audioRefs.set(sound.id, audio);

  return audio;
};

export const clearRandomReplayTimeouts = (
  randomReplayTimeoutRefs: Map<string, number>,
) => {
  randomReplayTimeoutRefs.forEach((timeoutId) => {
    window.clearTimeout(timeoutId);
  });
  randomReplayTimeoutRefs.clear();
};

export const syncTrackAudio = ({
  audioRefs,
  isPlaying,
  masterMuted,
  masterVolume,
  randomReplayTimeoutRefs,
  soundById,
  tracks,
}: {
  audioRefs: Map<string, HTMLAudioElement>;
  isPlaying: boolean;
  masterMuted: boolean;
  masterVolume: number;
  randomReplayTimeoutRefs: Map<string, number>;
  soundById: Map<string, Sound>;
  tracks: TrackState[];
}) => {
  clearRandomReplayTimeouts(randomReplayTimeoutRefs);

  tracks.forEach((track) => {
    const sound = soundById.get(track.id);

    if (!sound) {
      return;
    }

    const audio = getAudio(sound, audioRefs);
    audio.onended = null;
    audio.loop = !track.randomize;
    audio.volume = track.muted || masterMuted
      ? 0
      : (track.volume / 100) * (masterVolume / 100);

    if (isPlaying && track.active) {
      if (track.randomize) {
        audio.onended = () => {
          const delay = Math.floor(5000 + Math.random() * 5000);
          const timeoutId = window.setTimeout(() => {
            audio.currentTime = 0;
            void audio.play();
            randomReplayTimeoutRefs.delete(track.id);
          }, delay);

          randomReplayTimeoutRefs.set(track.id, timeoutId);
        };
      }

      void audio.play();
      return;
    }

    audio.pause();
    audio.currentTime = 0;
  });
};

export const stopAudio = (
  audioRefs: Map<string, HTMLAudioElement>,
  randomReplayTimeoutRefs: Map<string, number>,
) => {
  clearRandomReplayTimeouts(randomReplayTimeoutRefs);
  audioRefs.forEach((audio) => {
    audio.pause();
  });
};
