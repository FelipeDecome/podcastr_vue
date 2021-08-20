import { Module } from "vuex";
import { TBaseModuleStore } from "@/@types/generics";
import { TRoot } from "@/store";
import { state, TState } from "./state";
import { getters, TGetters } from "./getters";
import { mutations, TMutations } from "./mutations";
import { actions, TActions } from "./actions";

type TPodcastStore = TBaseModuleStore<TState, TMutations, TActions, TGetters>;

const store: Module<TState, TRoot["state"]> = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};

export { store, TState, TGetters, TActions, TMutations, TPodcastStore };
