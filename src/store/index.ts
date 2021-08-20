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
import {
  store as podcast,
  TState as TPodcastState,
  TGetters as TPodcastGetters,
  TActions as TPodcastActions,
  TMutations as TPodcastMutations,
  TPodcastStore,
} from "./modules/podcast";

type TRootState = {
  player: TPlayerState;
  podcast: TPodcastState;
};

type TRootGetters = {
  player: TPlayerGetters;
  podcast: TPodcastGetters;
};

type TRootActions = {
  player: TPlayerActions;
  podcast: TPodcastActions;
};

type TRootMutations = {
  player: TPlayerMutations;
  podcast: TPodcastMutations;
};

export type TRoot = {
  state: TRootState;
  getters: TRootGetters;
  actions: TRootActions;
  mutations: TRootMutations;
};

export type TStore = TPlayerStore & TPodcastStore;

const debug = process.env.NODE_ENV !== "production";
const plugins = debug ? [createLogger({})] : [];

export const store = createStore({
  plugins,
  modules: {
    player,
    podcast,
  },
});

export const storeKey: InjectionKey<TStore> = Symbol();

export function useStore(): TStore {
  return baseUseStore(storeKey) as TStore;
}
