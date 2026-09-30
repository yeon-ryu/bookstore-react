'use client'

import { bookApi } from "@/api/bookAPI";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { useCartStore } from "@/stores/useCartStore";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function BookDetail() {
    const params = useParams();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [book, setBook] = useState({});

    const { addCart } = useCartStore();

    const router = useRouter();

    const addBookToCart = () => {
        try {
            addCart(book);
            alert("장바구니에 추가했습니다!");
        } catch(e) {
            alert(e.message);
        }
    }

    useEffect(() => {
        if(!params.bookId) {
            setError(new Error("책의 식별값이 없습니다!"));
            return;
        }
        setLoading(true);
        setError(null);

        bookApi.getBook(params.bookId).then(b => {
            setBook(b);
        }).catch(e => {
            setError(e);
        }).finally(() => {
            setLoading(false);
        });
    }, [params]);

    if(loading) return <Loading />
    if(error) return <Error error={error} />

    return <div className="page-container">
        <div className="img-container">
            <img src={book.image} alt={book.name} />
        </div>
        <div className="book-detail-content">
            <h2 className="book-detail-title">{book.name}</h2>
            <p className="book-detail-meta">
                <span onClick={() => router.push(`/?writer=${book.writer}`)}>{book.writer}</span> 
                <span onClick={() => router.push(`/?category=${book.category}`)}>{book.category}</span>
            </p>
            <p className="book-detail-price">{Number(book.price)?.toLocaleString()}원</p>
            <p className="book-detail-desc">{book.description}</p>
        </div>
        <div className="btn-container">
            <button className="action-btn save" onClick={addBookToCart}>장바구니 담기</button>
            <button className="action-btn warning" onClick={() => router.push(`/manage?bookId=${book.id}`)}>도서 수정</button>
        </div>
    </div>
}