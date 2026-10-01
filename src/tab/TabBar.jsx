// 탭 바 영역
'use client'

import { useTabStore } from "@/stores/useTabStore";
import { pageRegistry } from "./pageRegistry";

export default function TabBar() {
    const { tabs, activeId, setActive, closeTab } = useTabStore();

    return <div role="tablist" className="tab-bar">
        { tabs.map(tab => (
            <div key={tab.id} role="tab" className={tab.id === activeId ? "tab active" : "tab"}
                aria-selected={tab.id === activeId} onClick={() => setActive(tab.id)}>
                    {pageRegistry[tab.key].title()}
                    <button onClick={(e) => {e.stopPropagation(); closeTab(tab.id);}}> X</button>
            </div>
            ))
        }

    </div>
}