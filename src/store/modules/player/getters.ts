import { TEpisode } from "@/@types/episode";
import { TRoot } from "@/store";
import { GetterTree } from "vuex";
import { TState } from "./state";

export type TGetters = {
  [K in keyof TState]: (state: TState) => TState[K];
} & {
  currentEpisode(state: TState): TEpisode;
  playlistLength(state: TState): number;
  hasNext(state: TState): boolean;
  hasPrevious(state: TState): boolean;
};

export const getters: GetterTree<TState, TRoot["state"]> & TGetters = {
  currentEpisode: (state) => state.playlist[state.current],
  playlistLength: (state) => state.playlist.length,
  hasNext: (state) =>
    state.current + 1 < state.playlist.length || state.shuffle,
  hasPrevious: (state) => state.current > 0 && !state.shuffle,
  current: (state) => state.current,
  isPlaying: (state) => state.isPlaying,
  isLooping: (state) => state.isLooping,
  shuffle: (state) => state.shuffle,
  playlist: (state) => state.playlist,
  progress: (state) => state.progress,
  audioRef: (state) => state.audioRef,
};
