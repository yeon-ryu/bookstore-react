import { purchaseApi } from "@/api/purchaseAPI";
import { create } from "zustand";

export const useCartStore = create(set => ({
    cart : [],

    addCart : (book) => set(state => ({cart : [...state.cart, {...book, bookId : book.id, count : 1}]})),

    updateCount : (id, cnt) => {
        if(cnt <= 0) {
            throw new Error('책의 수량은 0개 이하로 변경할 수 없습니다. 삭제하시려면 삭제 버튼을 눌러주세요.');
        }
        set(state => ({cart : state.cart.map(b => b.bookId === id ? {...b, count : cnt} : b)}));
    },

    deleteBook : (id) => set(state => ({cart : state.cart.filter(b => b.bookId !== id)})),

    // purchase 시, 특정 책들만 결제한 후 삭제할 때 사용
    deleteBooks : async(ids) => set(state => ({cart : state.cart.filter(b => !ids.includes(b.bookId))})),

    resetCart : () => set({cart : []})
}))