import { createPinia } from 'pinia';
import PersistedState from 'pinia-plugin-persistedstate';
import { useUserStore, useUserStoreExternal } from '@/store/modules/user';
import type { App } from 'vue';

export let store: ReturnType<typeof createPinia>;

export function setupStore(app: App<Element>) {
    store = createPinia();
    store.use(PersistedState);
    app.use(store);
}

export { useUserStore, useUserStoreExternal };
