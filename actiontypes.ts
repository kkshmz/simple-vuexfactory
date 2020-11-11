import { Mutations } from "./mutationtypes";
import { ActionContext } from "vuex";
import { State } from "/@/store/modules/VuexFactory/state";

export const A_SET_ERROR = "A_SET_ERROR";
export const A_ADD_PAYLOAD = "A_ADD_PAYLOAD";
export const A_REMOVE_PAYLOAD = "A_REMOVE_PAYLOAD";
export const A_GET_PAYLOAD = "A_GET_PAYLOAD";

export type ActionAugments<S> = {
  commit<K extends keyof Mutations<S>>(
    key: K,
    payload: Parameters<Mutations<S>[K]>[1]
  ): ReturnType<Mutations<S>[K]>;
} & Omit<ActionContext<State<S>, State<S>>, "commit">;

export interface Actions<S> {
  [A_ADD_PAYLOAD]({ commit }: ActionAugments<S>, payload: S): Promise<void>;
  [A_REMOVE_PAYLOAD]({ commit }: ActionAugments<S>, payload: S): Promise<void>;
  [A_GET_PAYLOAD]({ commit }: ActionAugments<S>, payload: S): Promise<void>;
}
