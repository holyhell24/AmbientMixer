export type TransportControlsProps = {
  activeCount: number;
  isPlaying: boolean;
  masterMuted: boolean;
  masterVolume: number;
  onChangeMasterVolume: (volume: number) => void;
  onReset: () => void;
  onToggleMasterMute: () => void;
  onTogglePlay: () => void;
};
