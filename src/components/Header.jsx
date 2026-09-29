'use client'

import { useCartStore } from "@/stores/useCartStore"
import Link from "next/link"

export default function Header() {
    const { bookCount } = useCartStore();
   
    return <div className="header">
        <div className="title"><Link href={"/"}>도서 관리 및 구매 시스템</Link></div>
        <div className="icon-btn"><Link href={"/manage"}>도서 추가 아이콘</Link></div>
        <div className="icon-btn"><Link href={"/cart"}>{bookCount} 장바구니 아이콘</Link></div>
    </div>
}