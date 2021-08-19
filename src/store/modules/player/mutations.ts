import { TEpisode } from "@/@types/episode";
import { MutationTree } from "vuex";
import { TState } from "./state";

enum TMutationTypes {
  SET_EPISODE_LIST = "SET_EPISODE_LIST",
  SET_CURRENT_EPISODE = "SET_CURRENT_EPISODE",
  SET_IS_PLAYING = "SET_IS_PLAYING",
  SET_IS_LOOPING = "SET_IS_LOOPING",
  SET_PROGRESS = "SET_PROGRESS",
  SET_SHUFFLE = "SET_SHUFFLE",
  SET_AUDIO_REF = "SET_AUDIO_REF",
}

type TMutations = {
  [TMutationTypes.SET_CURRENT_EPISODE](state: TState, payload: number): void;
  [TMutationTypes.SET_EPISODE_LIST](state: TState, payload: TEpisode[]): void;
  [TMutationTypes.SET_IS_PLAYING](state: TState, payload: boolean): void;
  [TMutationTypes.SET_IS_LOOPING](state: TState, payload: boolean): void;
  [TMutationTypes.SET_PROGRESS](state: TState, payload: number): void;
  [TMutationTypes.SET_SHUFFLE](state: TState, payload: boolean): void;
  [TMutationTypes.SET_AUDIO_REF](
    state: TState,
    payload: HTMLAudioElement
  ): void;
};

const mutations: MutationTree<TState> & TMutations = {
  [TMutationTypes.SET_CURRENT_EPISODE](state, payload) {
    state.current = payload;
  },
  [TMutationTypes.SET_EPISODE_LIST](state, payload) {
    state.playlist = payload;
  },
  [TMutationTypes.SET_IS_PLAYING](state, payload) {
    state.isPlaying = payload;
  },
  [TMutationTypes.SET_IS_LOOPING](state, payload) {
    state.isLooping = payload;
  },
  [TMutationTypes.SET_PROGRESS](state, payload) {
    state.progress = payload;
  },
  [TMutationTypes.SET_SHUFFLE](state, payload) {
    state.shuffle = payload;
  },
  [TMutationTypes.SET_AUDIO_REF](state, payload) {
    state.audioRef = payload;
  },
};

export { mutations, TMutations, TMutationTypes };
