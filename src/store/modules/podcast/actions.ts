import { TEpisode } from "@/@types/episode";
import { TBaseActions } from "@/@types/generics";
import { TRoot } from "@/store";
import { ActionTree } from "vuex";
import { TGetters } from "./getters";
import { TMutations, TMutationTypes } from "./mutations";
import { TState } from "./state";

enum TActionTypes {
  SET_EPISODES = "SET_EPISODES",
}

type TActionContext = TBaseActions<
  TMutations,
  TGetters,
  TState,
  TRoot["state"]
>;

type TActions = {
  [TActionTypes.SET_EPISODES](
    context: TActionContext,
    payload: TEpisode[]
  ): void;
};

const actions: ActionTree<TState, TRoot["state"]> & TActions = {
  SET_EPISODES: ({ commit }, payload) => {
    commit(TMutationTypes.SET_EPISODES, payload);
  },
};

export { actions, TActions, TActionTypes };
