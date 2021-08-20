import { TEpisode } from "@/@types/episode";
import { MutationTree } from "vuex";
import { TState } from "./state";

enum TMutationTypes {
  SET_EPISODES = "SET_EPISODES",
}

type TMutations = {
  [TMutationTypes.SET_EPISODES](state: TState, payload: TEpisode[]): void;
};

const mutations: MutationTree<TState> & TMutations = {
  SET_EPISODES(state, payload) {
    state.episodes = payload;
  },
};

export { mutations, TMutations, TMutationTypes };
