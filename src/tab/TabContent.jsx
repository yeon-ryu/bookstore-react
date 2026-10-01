// 탭 화면 영역
'use client'

import Loading from "@/components/Loading";
import { useTabStore } from "@/stores/useTabStore"
import { Suspense, useMemo } from "react";
import { pageRegistry, resolveRoute } from "./pageRegistry";
import { TabContext } from "./TabContext";

function TabPane({tab, active}) {
    const { updateSearch } = useTabStore();
    const Page = pageRegistry[tab.key]?.component;
    if(!Page) return null;

    const value = useMemo(() => ({
        params : resolveRoute(tab.pathname)?.params ?? {}, // params 정보가 없으면 {} 를 넣음
        searchParams : new URLSearchParams(tab.search),
        setSearchParams : (next) => updateSearch(tab.id, "?" + new URLSearchParams(next).toString())
    }), [tab.id, tab.pathname, tab.search, updateSearch]);

    return <div style={{display : active ? "block" : "none"}}>
        {/** 여기부터 머리가 잘 안 돌아가기 시작함 */}
        <TabContext.Provider value={value}>
            <Page />
        </TabContext.Provider>
    </div>
}

export default function TabContent() {
    const { tabs, activeId } = useTabStore();

    return <Suspense fallback={<Loading />}>
        {tabs.map(tab => <TabPane key={tab.id} tab={tab} active={tab.id === activeId} />)}
    </Suspense>
}