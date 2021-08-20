import type { ActionContext, DispatchOptions, Store } from "vuex";

type TBaseCommit<Mutations> = <
  M = Mutations,
  K extends keyof M,
  P extends Parameters<M[K]>[1]
>(
  key: K,
  payload: P,
  options?: CommitOptions
) => ReturnType<M[K]>;

type TBaseDispatch<Actions> = <A = Actions, K extends keyof A>(
  key: K | string /* Fix namespaced modules typings */,
  payload: Parameters<A[K]>[1],
  options?: DispatchOptions
) => ReturnType<A[K]>;

export type TBaseGetters<Getters> = {
  [K in keyof Getters]: ReturnType<Getters[K]>;
};

export type TBaseActions<Mutations, Getters, State, RootState> = {
  commit: TBaseCommit<Mutations>;
  getters: TBaseGetters<Getters>;
} & Omit<ActionContext<State, RootState>, "commit" | "getters">;

export type TBaseModuleStore<
  State,
  Mutations = unknown,
  Actions = unknown,
  Getters = unknown
> = Omit<Store<State>, "getters" | "commit" | "dispatch"> & {
  commit: TBaseCommit<Mutations>;
} & {
  dispatch: TBaseDispatch<Actions>;
} & {
  getters: TBaseGetters<Getters>;
};

export type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R
  ? (...args: P) => R
  : never;
