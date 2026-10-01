// 탭을 관리하는 전역 상태 관리
import { resolveRoute } from "@/tab/pageRegistry";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTabStore = create(persist((set, get) => ({
    // search : url 에 ? 뒤에 들어갈 searchParams
    tabs : [{id : "main-0", key : "main", pathname : "/", search : ""}],
    activeId : "main-0",

    openTab : (pathname, search = "") => {
        const route = resolveRoute(pathname);
        if(!route) return;

        // pathname 이 같으면 기존 탭 재사용, search 만 갱신
        const exist = get().tabs.find((t) => t.pathname === pathname);
        if(exist) {
            set(state => ({
                activeId : exist.id,
                tabs : state.tabs.map(t => (t.id === exist.id ? {...t, search} : t))
            }));
            return;
        }

        const id = `${pathname}-${Date.now()}`;
        set(state => ({
            tabs : [...state.tabs, {id : id, key : route.key, pathname : pathname, search}],
            activeId : id
        }));
    },

    updateSearch : (id, search) => set(state => ({ tabs : state.tabs.map(t => (t.id === id ? {...t, search} : t)) })),

    closeTab : (id) => {
        // 탭이 하나만 있을 경우 해당 탭까지 닫을 수는 없다.
        if(get().tabs.length <= 1) {
            alert('탭은 전부 닫을 수 없습니다!');
            return;
        }

        set(state => {
            const idx = state.tabs.findIndex(t => t.id === id);
            const newIdx = idx === state.tabs.length - 1 ? idx - 1 : idx;
            
            return {tabs : state.tabs.filter(t => t.id !== id), acriveId : state.tabs[newIdx].id};
        });
    },

    setActive : (id) => set({activeId : id}),

    closeOthers : (id) => set(state => ({tabs : state.tabs.filter(t => t.id === id), activeId : id})
)

}), {name : "tab-storage"}))