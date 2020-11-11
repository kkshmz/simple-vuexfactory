import {
  M_SET_ERROR,
  M_ADD_PAYLOAD,
  M_REMOVE_PAYLOAD,
  Mutations
} from "./mutationtypes";
import { MutationTree } from "vuex";
import { State } from "./state";

export function createCrudMutations<S>(): MutationTree<State<S>> &
  Mutations<State<S>> {
  return {
    [M_SET_ERROR]<S>(state: State<S>, payload: string) {
      state.error = payload;
    },
    [M_ADD_PAYLOAD]<S>(state: State<S>, payload: S) {
      let dup = false;
      state.payload.some(element => {
        if (element === payload) {
          dup = true;
          return;
        }
      });
      if (dup === false) state.payload.push(payload);
    },
    [M_REMOVE_PAYLOAD]<S>(state: State<S>, payload: S) {
      // query the array for item of the same name and remove
      state.payload.forEach(element => {
        if (element === payload) {
          const index = state.payload.indexOf(element);
          if (index === -1) return;
          state.payload.splice(index, 1);
        }
      });
    }
  };
}
