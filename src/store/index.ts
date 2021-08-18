import { InjectionKey } from "vue";
import { createStore, createLogger, useStore as baseUseStore } from "vuex";
import {
  store as player,
  TState as TPlayerState,
  TGetters as TPlayerGetters,
  TActions as TPlayerActions,
  TMutations as TPlayerMutations,
  TPlayerStore,
} from "./modules/player";

type TRootState = {
  player: TPlayerState;
};

type TRootGetters = {
  player: TPlayerGetters;
};

type TRootActions = {
  player: TPlayerActions;
};

type TRootMutations = {
  player: TPlayerMutations;
};

export type TRoot = {
  state: TRootState;
  getters: TRootGetters;
  actions: TRootActions;
  mutations: TRootMutations;
};

export type TStore = TPlayerStore<Pick<TRootState, "player">>;

const debug = process.env.NODE_ENV !== "production";
const plugins = debug ? [createLogger({})] : [];

export const store = createStore({
  plugins,
  modules: {
    player,
  },
});

export const storeKey: InjectionKey<TStore> = Symbol();

export function useStore(): TStore {
  return baseUseStore(storeKey);
}
