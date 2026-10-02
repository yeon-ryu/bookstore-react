import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
    persist(
        (set, get) => ({
            cart : [],
            bookCount : 0,

            addCart : (book) => {
                const existed = get().cart.find(b => b.bookId === book.id);
                if(existed) {
                    throw new Error('이미 장바구니에 있는 책입니다.');
                }
                set(state => ({cart : [...state.cart, {...book, bookId : book.id, count : 1, checked : true}], bookCount : state.bookCount + 1}))
            },

            updateCount : (id, cnt) => {
                if(cnt <= 0) {
                    throw new Error('책의 수량은 0개 이하로 변경할 수 없습니다. 삭제하시려면 삭제 버튼을 눌러주세요.');
                }
                set(state => ({cart : state.cart.map(b => b.bookId === id ? {...b, count : cnt} : b)}));
            },

            updateCheck : (id) => set(state => ({cart : state.cart.map(b => b.bookId === id ? {...b, checked : !b.checked} : b)})),

            deleteBook : (id) => set(state => ({cart : state.cart.filter(b => b.bookId !== id), bookCount : (state.bookCount - 1 >= 0 ? state.bookCount - 1 : 0)})),

            resetCart : () => {
                set({cart : [], bookCount : 0});
            }
        }),
        {name : "cart-storage"}
    )
)