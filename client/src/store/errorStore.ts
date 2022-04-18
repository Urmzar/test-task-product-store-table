import { types } from "mobx-state-tree";

export const ErrorStore = types
  .model("ErrorStore", {
    error: types.maybeNull(types.string),
  })
  .actions(self => ({
    setError(error: string | null) {
      self.error = error;
    },
  }));
