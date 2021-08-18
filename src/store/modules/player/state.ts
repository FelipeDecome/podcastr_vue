import { TEpisode } from "@/@types/episode";

export type TAudioRef = {
  handleSliderChange: (progress: number) => void;
} & HTMLAudioElement;

type TState = {
  current: number;
  isPlaying: boolean;
  isLooping: boolean;
  shuffle: boolean;
  playlist: TEpisode[];
  progress: number;
};

const state: TState = {
  current: 0,
  isPlaying: false,
  isLooping: false,
  shuffle: false,
  playlist: [],
  progress: 0,
};

export { state, TState };
