import { TEpisode } from "@/@types/episode";

type TState = {
  episodes: TEpisode[];
};

const state: TState = {
  episodes: [],
};

export { state, TState };
