import { types } from "mobx-state-tree";

const FlagStore = types
  .model("FlagStore", {
    isEditMode: types.optional(types.boolean, false),
  })
  .actions(self => ({
    setEditMode(value: boolean) {
      self.isEditMode = value;
    },
  }));

export default FlagStore;
