'use client'

import { bookApi } from "@/api/bookAPI";
import Error from "@/components/Error";
import { DeleteButton } from "@/components/Icon";
import Loading from "@/components/Loading";
import { useCartStore } from "@/stores/useCartStore";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

export function Manage() {
    const searchParam = useSearchParams();
    const bookId = useRef(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formValue, setFormValue] = useState({category : "국내도서"});

    const { deleteBook } = useCartStore();

    const router = useRouter();

    const handleForm = (e) => {
        setFormValue({...formValue, [e.target.name] : e.target.value});
    }

    const saveBook = async() => {
        if(!formValue.name || formValue.name.trim().length === 0) {
            alert("도서명은 필수 값입니다!");
            return;
        } else if(!formValue.category) {
            alert("카테고리는 필수 값입니다!");
            return;
        } else if(!formValue.writer) {
            alert("작가는 필수 값입니다!");
            return;
        } else if(!formValue.price) {
            alert("가격은 필수 값입니다!");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            if(bookId.current) { // 수정
                const book = await bookApi.updateBook(bookId.current, formValue);
                alert("수정을 성공했습니다!");
                router.replace(`/book/${book.id}`);
            } else { // 추가
                const book = await bookApi.addBook(formValue);
                alert("추가를 성공했습니다!");
                router.replace(`/book/${book.id}`);
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
            deleteBook(bookId.current);
            alert("삭제를 성공했습니다!");
            router.replace("/");
        } catch(e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        bookId.current = searchParam.get('bookId') ? searchParam.get('bookId') : null;
        if(!bookId.current) return;

        setLoading(true);
        setError(false);
        bookApi.getBook(bookId.current).then(book => {
            setFormValue(book);
        }).catch(e => {
            setError(e);
        }).finally(() => {
            setLoading(false);
        });
    }, [searchParam]);

    if(loading) return <Loading />;
    if(error) return <Error error={error} />;

    return <>
        {bookId.current && <div className="list-container"><button className="action-btn right-content error" onClick={removeBook}><DeleteButton /></button></div>}
        <div className="form-container">
            <fieldset>
                <legend>도서 정보 입력</legend>

                <div className="form-group">
                    <label className="label" htmlFor="name">도서명</label>
                    <input type="text" name="name" value={formValue.name || ''} onChange={e => handleForm(e)} />
                </div>
                <div className="form-group">
                    <label className="label" htmlFor="category">카테고리</label>
                    <select name="category" id="" value={formValue.category || ''} onChange={e => handleForm(e)}>
                        <option value="국내도서">국내도서</option>
                        <option value="외국도서">외국도서</option>
                        <option value="그림책">그림책</option>
                        <option value="전자책">전자책</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="label" htmlFor="writer">작가</label>
                    <input type="text" name="writer" value={formValue.writer || ''} onChange={e => handleForm(e)} />
                </div>
                <div className="form-group">
                    <label className="label" htmlFor="price">가격</label>
                    <input type="number" name="price" value={formValue.price || ''} onChange={e => handleForm(e)} />
                </div>
                <div className="form-group">
                    <label className="label" htmlFor="description">줄거리</label>
                    <textarea name="description" id="" rows={3} value={formValue.description || ''} onChange={e => handleForm(e)} />
                </div>
                <div className="form-group">
                    <label className="label" htmlFor="image">이미지</label>
                    <input type="text" name="image" value={formValue.image || ''} onChange={e => handleForm(e)} />
                </div>
                <div className="form-group">
                    <img src={formValue.image} alt="이미지 미리보기" />
                </div>
                <div className="form-group">
                    <button className="action-btn save" onClick={saveBook}>저장</button>
                    <button className="action-btn error" onClick={() => router.push("/")}>취소</button>
                </div>
            </fieldset>
        </div>
    </>
}

export default function ManagePage() {
    return (
        <Suspense fallback={<Loading />}>
            <Manage />
        </Suspense>
    )
}