// URL <> 스토어 동기화
'use client'

import { useTabStore } from "@/stores/useTabStore";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function TabRouterSync() {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const openTab = useTabStore((s) => s.openTab);
  const activeTab = useTabStore((s) => s.tabs.find((t) => t.id === s.activeId));

  // URL → 스토어 (주소창 입력, 뒤로가기, 링크 클릭)
  useEffect(() => {
    openTab(pathname, search);
  }, [pathname, search, openTab]);

  // 스토어 → URL (탭 클릭, 탭 닫힘으로 활성 탭 변경, 탭 내부 search 변경)
  useEffect(() => {
    if (!activeTab) return;
    if (activeTab.pathname !== pathname || activeTab.search !== search) {
      navigate(activeTab.pathname + activeTab.search);
    }
  }, [activeTab?.pathname, activeTab?.search]); // eslint-disable-line
}