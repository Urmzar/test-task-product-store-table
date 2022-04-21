import { Instance } from "mobx-state-tree";
import { RootStore } from ".";

let _rootStore: Instance<typeof RootStore>;

const useStore = () => {
  if (!_rootStore) _rootStore = RootStore.create({}, this);
  return _rootStore;
};

export default useStore;
