import { ComponentCustomProperties as VueComponentCustomProperties } from "vue";
import { Store } from "vuex";
import { OmitFirstArg } from "./@types/generics";
import { TRoot } from "./store";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties extends VueComponentCustomProperties {
    $store: Store<TRoot["state"]>;
  }
}

declare module "vuex" {
  type TMapGettersWithNamespace = {
    <
      RG extends TRoot["getters"],
      N extends keyof RG,
      G extends RG[N],
      K extends keyof G
    >(
      namespace: N,
      getterNames: Array<K>
    ): { [V in K]: G[V] };
  };

  type TMapActionsWithNamespace = {
    <
      RA extends TRoot["actions"],
      N extends keyof RA,
      A extends RA[N],
      K extends keyof A
    >(
      namespace: N,
      getterNames: Array<K>
    ): {
      [V in K]: OmitFirstArg<A[V]>;
    };
  };

  export const mapGetters: TMapGettersWithNamespace;
  export const mapActions: TMapActionsWithNamespace;
}
