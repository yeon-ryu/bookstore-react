'use client'

import "@/css/Header.css";
import { useCartStore } from "@/stores/useCartStore"
import Link from "next/link"

export default function Header() {
    const { bookCount } = useCartStore();
   
    return <header className="app-header">
        <div className="app-header__inner">
        {/* 제목 → 메인 페이지 이동 */}
        <Link href={"/"}>
          <svg className="app-header__logo" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H19v14H5.5A1.5 1.5 0 0 0 4 19.5v-14z" />
            <path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H19v-3" />
            <path d="M9 8.5h6" />
          </svg>
          <span className="app-header__title-text">도서 관리 및 구매 시스템</span>
        </Link>

        <nav className="app-header__actions" aria-label="주요 메뉴">
          {/* 장바구니 */}
          <Link href={"/cart"}>
            <span className="app-header__icon-wrap">
                <svg className="app-header__icon" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="9" cy="20" r="1.4" />
                <circle cx="18" cy="20" r="1.4" />
                <path d="M2.5 3.5h2.7l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 7.5H6.2" />
                </svg>
                <span className="app-header__badge" aria-hidden="true">
                    {bookCount}
                </span>
            </span>
          </Link>

          {/* 구매 기록 */}
          <Link href={"/purchase"}>
            <svg className="app-header__icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.5 3.5h15v17l-2.5-1.6-2.5 1.6-2.5-1.6-2.5 1.6-2.5-1.6-2.5 1.6z" />
              <path d="M8.5 8.5h7" />
              <path d="M8.5 12.5h7" />
            </svg>
          </Link>

          {/* 도서 추가 */}
          <Link href={"/manage"}>
            <svg className="app-header__icon" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
          </Link>
        </nav>
      </div>
    </header>
}