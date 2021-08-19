import { Module } from "vuex";
import { TBaseModuleStore } from "@/@types/generics";
import { TRoot } from "@/store";
import { actions, TActions } from "./actions";
import { getters, TGetters } from "./getters";
import { mutations, TMutations } from "./mutations";
import { state, TState } from "./state";

type TPlayerStore<State = TState> = TBaseModuleStore<
  State,
  TMutations,
  TActions,
  TGetters
>;

const store: Module<TState, TRoot["state"]> = {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};

export { store, TState, TGetters, TActions, TMutations, TPlayerStore };
