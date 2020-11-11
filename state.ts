export interface State<S> {
  payload: Array<S>;
  error: string;
}

export const state = <S>(): State<S> => {
  return {
    payload: [],
    error: ""
  };
};
