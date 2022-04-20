import { types } from "mobx-state-tree";

const ErrorStore = types
  .model("ErrorStore", {
    error: types.maybeNull(types.string),
  })
  .actions(self => ({
    setError(error: string | null) {
      self.error = error;
    },
  }));

export default ErrorStore;
