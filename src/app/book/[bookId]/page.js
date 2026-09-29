'use client'

import { bookApi } from "@/api/bookAPI";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function BookDetail() {
    const params = useParams();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [book, setBook] = useState({});

    const router = useRouter();

    useEffect(() => {
        if(!params.bookId) {
            setError(new Error("책의 식별값이 없습니다!"));
            return;
        }
        setLoading(true);
        setError(false);

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

    return <>
        <div className="img-container">
            <img src={book.image} alt={book.name} />
        </div>
        <div className="book-detail-content">
            <h2>{book.name}</h2>
            <span onClick={() => router.push(`/?writer=${book.writer}`)}>{book.writer}</span> 
            <span onClick={() => router.push(`/?category=${book.category}`)}>{book.category}</span>
            <h3>{book.price?.toLocaleString()}원</h3>
            <div>{book.description}</div>
        </div>
    </>
}