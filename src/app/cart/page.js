'use client'

import { purchaseApi } from "@/api/purchaseAPI";
import BookCard from "@/components/BookCard";
import Empty from "@/components/Empty";
import Error from "@/components/Error";
import { DeleteButton } from "@/components/Icon";
import Loading from "@/components/Loading";
import { useCartStore } from "@/stores/useCartStore"
import { useState } from "react";

export default function Cart() {
    const { cart, updateCount, updateCheck, deleteBook, resetCart } = useCartStore();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePurchase = async() => {
        setError(null);
        setLoading(true);

        try {
            const purchaseDate = new Date();
            const purchaseId = purchaseDate.getTime() + Math.random().toString(16).slice(2, 4);
            const purchase = cart.filter(b => b.checked).map(async(b) => purchaseApi.purchase({...b, count : Number(b.count)
                , purchaseDate : purchaseDate, purchaseId : purchaseId}));
            const result = await Promise.all(purchase);
            if(result.length === 0) {
                alert("결제할 상품이 없습니다!");
                setLoading(false);
                return;
            }
            let sum = 0;
            result.forEach((r) => {
                sum += r.price * r.count;
                deleteBook(r.bookId);
            });
            alert(`총액 ${sum}원 결제가 성공했습니다!`);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const handleUpdate = (id, e) => {
        try {
            updateCount(id, e.target.value);
        } catch(error) {
            alert(error.message);
        }
    }

    const handleDelete = (id) => {
        try {
            deleteBook(id);
        } catch(error) {
            alert(error.message);
        }
    }

    if(loading) return <Loading />;
    if(error) return <Error error={error} />;
    if(!cart || cart.length === 0) return <Empty />;

    return <div className="page-container">
        <div className="list-container">
            <button className="action-btn error right-content" onClick={resetCart}>장바구니 비우기</button>
        </div>

        <div className="list-container">
            {cart.map(book => (
                <BookCard key={book.id} book={book} bookId={book.bookId}
                    leftContent={<input type="checkbox" checked={book.checked} onChange={() => updateCheck(book.id)} />}
                    rightContent={<>
                        {Number(book.price)?.toLocaleString()}원
                        <div className="input-group">
                            <label htmlFor="count">수량</label>
                            <input type="number" name="count" value={book.count} onChange={e => handleUpdate(book.id, e)} />
                        </div>
                        <button className="delete-btn" onClick={e => handleDelete(book.id)}><DeleteButton /></button>
                    </>} />
                ))}
        </div>

        <div className="list-container">
            <button className="action-btn info" onClick={handlePurchase}>결제</button>
        </div>
    </div>
}