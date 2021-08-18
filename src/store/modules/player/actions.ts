import { TEpisode } from "@/@types/episode";
import { TBaseActions } from "@/@types/generics";
import { TRoot } from "@/store";
import { getRandom } from "@/utils/getRandom";
import { ActionTree } from "vuex";
import { TGetters } from "./getters";
import { TMutations, TMutationTypes } from "./mutations";
import { TState } from "./state";

enum TActionsTypes {
  PLAY_LIST = "PLAY_LIST",
  PLAY = "PLAY",
  TOGGLE_PLAY = "TOGGLE_PLAY",
  TOGGLE_LOOP = "TOGGLE_LOOP",
  UPDATE_PROGRESS = "UPDATE_PROGRESS",
  TOGGLE_SHUFFLE = "TOGGLE_SHUFFLE",
  NEXT_EPISODE = "NEXT_EPISODE",
  PREVIOUS_EPISODE = "PREVIOUS_EPISODE",
  CLEAR_PLAYER = "CLEAR_PLAYER",
  SET_AUDIO_REF = "SET_AUDIO_REF",
}

interface IPlayListPayload {
  episodeList: TEpisode[];
  current: number;
}

interface IPlayPayload {
  episode: TEpisode;
}

type TActionContext = TBaseActions<
  TMutations,
  TGetters,
  TState,
  TRoot["state"]
>;

type TActions = {
  [TActionsTypes.PLAY_LIST](
    context: TActionContext,
    payload: IPlayListPayload
  ): void;
  [TActionsTypes.PLAY](context: TActionContext, payload: IPlayPayload): void;
  [TActionsTypes.TOGGLE_PLAY](context: TActionContext, payload?: boolean): void;
  [TActionsTypes.TOGGLE_LOOP](context: TActionContext): void;
  [TActionsTypes.UPDATE_PROGRESS](
    context: TActionContext,
    payload: number
  ): void;
  [TActionsTypes.TOGGLE_SHUFFLE](context: TActionContext): void;
  [TActionsTypes.NEXT_EPISODE](context: TActionContext): void;
  [TActionsTypes.PREVIOUS_EPISODE](context: TActionContext): void;
  [TActionsTypes.CLEAR_PLAYER](context: TActionContext): void;
  [TActionsTypes.SET_AUDIO_REF](
    context: TActionContext,
    payload: TState["audioRef"]
  ): void;
};

const actions: ActionTree<TState, TRoot["state"]> & TActions = {
  [TActionsTypes.PLAY_LIST]({ commit }, payload) {
    const { episodeList, current } = payload;

    commit(TMutationTypes.SET_EPISODE_LIST, episodeList);
    commit(TMutationTypes.SET_CURRENT_EPISODE, current);
    commit(TMutationTypes.SET_IS_PLAYING, true);
  },
  [TActionsTypes.PLAY]({ commit }, payload) {
    const { episode } = payload;

    commit(TMutationTypes.SET_EPISODE_LIST, [episode]);
    commit(TMutationTypes.SET_CURRENT_EPISODE, 0);
    commit(TMutationTypes.SET_IS_PLAYING, true);
  },
  [TActionsTypes.TOGGLE_PLAY]({ commit, state }, payload) {
    commit(
      TMutationTypes.SET_IS_PLAYING,
      typeof payload === "boolean" ? payload : !state.isPlaying
    );
  },
  [TActionsTypes.TOGGLE_LOOP]({ commit, state }) {
    commit(TMutationTypes.SET_IS_LOOPING, !state.isLooping);
  },
  [TActionsTypes.UPDATE_PROGRESS]({ commit }: TActionContext, payload: number) {
    commit(TMutationTypes.SET_PROGRESS, payload);
  },
  [TActionsTypes.TOGGLE_SHUFFLE]({ commit, state }) {
    commit(TMutationTypes.SET_SHUFFLE, !state.shuffle);
  },
  [TActionsTypes.NEXT_EPISODE]({ commit, state, getters }) {
    if (!getters.hasNext) return;

    let previousEpisode = state.current + 1;
    if (state.shuffle) previousEpisode = getRandom(0, state.playlist.length);

    commit(TMutationTypes.SET_CURRENT_EPISODE, previousEpisode);
  },
  [TActionsTypes.PREVIOUS_EPISODE]({ commit, state }) {
    if (state.current === 0 || state.isLooping || state.shuffle) return;

    commit(TMutationTypes.SET_CURRENT_EPISODE, state.current - 1);
  },
  [TActionsTypes.CLEAR_PLAYER]({ commit }) {
    commit(TMutationTypes.SET_EPISODE_LIST, []);
    commit(TMutationTypes.SET_CURRENT_EPISODE, 0);
  },
  [TActionsTypes.SET_AUDIO_REF]({ commit }, payload) {
    commit(TMutationTypes.SET_AUDIO_REF, payload);
  },
};

export { actions, TActions, TActionsTypes };
