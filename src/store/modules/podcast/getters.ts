import { TRoot } from "@/store";
import { GetterTree } from "vuex";
import { TState } from "./state";

export type TGetters = {
  [K in keyof TState]: (state: TState) => TState[K];
};

export const getters: GetterTree<TState, TRoot["state"]> & TGetters = {
  episodes: (state) => state.episodes,
};
