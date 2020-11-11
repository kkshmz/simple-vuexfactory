import { State } from "./state";

export const M_SET_ERROR = "M_SET_ERROR";
export const M_ADD_PAYLOAD = "M_ADD_PAYLOAD";
export const M_REMOVE_PAYLOAD = "M_REMOVE_PAYLOAD";

type Mutations<S> = {
  [M_SET_ERROR](state: State<S>, payload: string): void;
  [M_ADD_PAYLOAD](state: State<S>, payload: S): void;
  [M_REMOVE_PAYLOAD](state: State<S>, payload: S): void;
};

export type {Mutations}