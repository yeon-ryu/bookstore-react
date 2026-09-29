'use client'

import { purchaseApi } from "@/api/purchaseAPI";
import Error from "@/components/Error";
import { useCartStore } from "@/stores/useCartStore"
import Link from "next/link";
import { useState } from "react";

export default function Cart() {
    const { cart, updateCount, deleteBook, resetCart } = useCartStore();

    const [error, setError] = useState(null);

    const handlePurchase = () => {
        setError(null);

        cart.forEach(async(b) => {
            try{
                await purchaseApi.purchase({...b, count : Number(b.count)});
                deleteBook(b.bookId);
            } catch (error) {
                setError(error);
            }
        });
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

    if(error) return <Error error={error} />

    return <>
        <h1>장바구니</h1>
        <div className="flex-container"><button className="error right-content" onClick={resetCart}>장바구니 비우기</button></div>

        <div className="list-container">
            {cart.map(book => (<div className="book-card" key={book.id}>
            <Link href={`/book/${book.id}`}><img src={book.image} alt={book.name} /></Link>
            <div className="book-content">
                <strong>{book.name}</strong><br/>
                <p>{book.writer} {book.category}</p><br/>
                <p>{book.description}</p>
            </div>
            <div className="right-content">
                {book.price?.toLocaleString()}원
                <label htmlFor="count">수량</label>
                <input type="number" name="count" value={book.count} onChange={e => handleUpdate(book.id, e)} />
                <button className="error" onClick={e => handleDelete(book.id)}>삭제 아이콘</button>
            </div>
            </div>))}
        </div>

        <div className="flex-container">
            <button className="right-content round-btn" onClick={handlePurchase}>결제</button>
        </div>
    </>
}