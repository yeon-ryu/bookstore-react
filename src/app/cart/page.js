'use client'

import { purchaseApi } from "@/api/purchaseAPI";
import Empty from "@/components/Empty";
import Error from "@/components/Error";
import { DeleteButton } from "@/components/Icon";
import Loading from "@/components/Loading";
import { useCartStore } from "@/stores/useCartStore"
import Link from "next/link";
import { useState } from "react";

export default function Cart() {
    const { cart, updateCount, deleteBook, resetCart } = useCartStore();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePurchase = async() => {
        setError(null);
        setLoading(true);

        try {
            const purchaseDate = new Date();
            const purchase = cart.map(async(b) => purchaseApi.purchase({...b, count : Number(b.count), purchaseDate : purchaseDate}));
            const result = await Promise.all(purchase);
            resetCart();
            alert("결제가 성공했습니다!");
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

    if(loading) return <Loading />
    if(error) return <Error error={error} />
    if(!cart || cart.length === 0) return <Empty />

    return <div className="page-container">
        <div className="list-container">
            <button className="action-btn error right-content" onClick={resetCart}>장바구니 비우기</button>
        </div>

        <div className="list-container">
            {cart.map(book => (<div className="book-card" key={book.id}>
            <Link href={`/book/${book.id}`}><img src={book.image} alt={book.name} /></Link>
            <div className="book-content">
                <strong className="book-title">{book.name}</strong>
                <p className="book-meta"><span>{book.writer}</span><span>{book.category}</span></p>
                <p className="book-desc">{book.description}</p>
            </div>
            <div className="right-content">
                {book.price?.toLocaleString()}원
                <div className="input-group">
                    <label htmlFor="count">수량</label>
                    <input type="number" name="count" value={book.count} onChange={e => handleUpdate(book.id, e)} />
                </div>
                <button className="delete-btn" onClick={e => handleDelete(book.id)}><DeleteButton /></button>
            </div>
            </div>))}
        </div>

        <div className="list-container">
            <button className="action-btn info" onClick={handlePurchase}>결제</button>
        </div>
    </div>
}