'use client'

import { bookApi } from "@/api/bookAPI";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Manage() {
    const searchParam = useSearchParams();
    const bookId = useRef(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formValue, setFormValue] = useState({});

    const router = useRouter();

    const saveBook = async() => {
        // ++ 필수 값 검증 로직 추가

        setLoading(true);
        setError(false);
        try {
            if(bookId.current) { // 수정
                const book = await bookApi.updateBook(bookId.current, formValue);
                alert("수정을 성공했습니다!");
                router.push(`/book/${book.id}`);
            } else { // 추가
                const book = await bookApi.addBook(formValue);
                alert("추가를 성공했습니다!");
                router.push(`/book/${book.id}`);
            }
        } catch(e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    const removeBook = async() => {
        if(!bookId.current) {
            setError(new Error("삭제할 책이 존재하지 않습니다."));
            return;
        }

        const shoudDelete = window.confirm('정말 삭제할까요?');
        if(!shoudDelete) return;

        setLoading(true);
        setError(false);
        try {
            await bookApi.deleteBook(bookId.current);
            alert("삭제를 성공했습니다!");
            router.push("/");
        } catch(e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        bookId.current = searchParam.get('bookId') ? searchParam.get('page') : null;
        if(!bookId.current) return;

        setLoading(true);
        setError(false);
        bookApi.getBook(bookId.current).then(book => {
            setFormValue(b);
        }).catch(e => {
            setError(e);
        }).finally(() => {
            setLoading(false);
        });
    }, [searchParam]);

    if(loading) return <Loading />
    if(error) return <Error error={error} />

    return <>
        <h1>책 입력폼</h1>
        {bookId.current && <button className="error" onClick={removeBook}>삭제 아이콘</button>}
        <div className="form-container">

        <button className="save round-btn" onClick={saveBook}>저장</button>
        <button className="error round-btn" onClick={() => router.push("/")}>취소</button>
        </div>
    </>
}