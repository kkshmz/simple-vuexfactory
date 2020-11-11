import {
  A_ADD_PAYLOAD,
  A_REMOVE_PAYLOAD,
  A_GET_PAYLOAD,
  Actions,
  ActionAugments
} from "./actiontypes";

import { ActionTree } from "vuex";
import { State } from "./state";
import { fireutil } from "/@/plugins/firebase";

export function createCrudActions<S>(
  collectionName: string
): ActionTree<State<S>, State<S>> & Actions<S> {
  return {
    [A_ADD_PAYLOAD]({ commit }, payload: S) {
      return fireutil.utils
        .createDoc(collectionName, payload)
        .then(() => {
          commit("M_ADD_PAYLOAD", payload);
        })
        .catch(error => {
          commit("M_SET_ERROR", error);
          return;
        });
    },
    [A_REMOVE_PAYLOAD](
      { commit }: ActionAugments<S>,
      payload: S
    ): Promise<void> {
      return fireutil.utils
        .removeDoc(collectionName, payload)
        .then(() => {
          commit("M_REMOVE_PAYLOAD", payload);
          return;
        })
        .catch(error => {
          commit("M_SET_ERROR", error);
        });
    },
    [A_GET_PAYLOAD]({ commit }: ActionAugments<S>, payload: S): Promise<void> {
      return fireutil.utils.getAllDocs(collectionName).then(result => {
        if (result === undefined) {
          // we should have some kind of error code here
          console.log("not good");
          return;
        } else if (result instanceof Error) {
          console.log("result error");
          // its an error so we do we turn that as an Error?
          commit("M_SET_ERROR", result.message);
          return;
        } else {
          commit("M_ADD_PAYLOAD", payload);
        }
      });
    }
  };
}
