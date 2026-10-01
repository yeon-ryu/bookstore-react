// 탭 이동 되는 페이지 종류
import { lazy } from "react";
import { matchPath } from "react-router-dom";

export const pageRegistry = {
    main : {title : () => "메인 페이지", path : "/", component : lazy(() => import("@/app/page"))},
    detail : {title : (name) => `${name} 상세 페이지`, path : "/book/:id", component : lazy(() => import("@/app/book/[bookId]/page"))},
    manage : {title : () => "관리 페이지", path : "/manage", component : lazy(() => import("@/app/manage/page"))},
    cart : {title : () => "장바구니", path : "/cart", component : lazy(() => import("@/app/cart/page"))},
    purchase : {title : () => "구매 이력", path : "/purchase", component : lazy(() => import("@/app/purchase/page"))}
};

/** pathname 과 일치하는 path 가 있으면 해당 key 와 params(:id 와 같이 pathVariable 값이 객체로 저장된다. ex. {id:"42"}) 를 반환한다. */
export function resolveRoute(pathname) {
    for (const [key, route] of Object.entries(pageRegistry)) {
        const m = matchPath({path : route.path, end : true}, pathname);
        if(m) return {key, params : m.params}
    }
    return null;
}