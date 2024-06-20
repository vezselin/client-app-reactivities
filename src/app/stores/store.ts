import ActivityStore from "./activityStore.ts";
import { createContext, useContext } from "react";
import CommonStore from "./commonStore.tsx";

interface Store {
    activityStore: ActivityStore;
    commonStore: CommonStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
};
export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
