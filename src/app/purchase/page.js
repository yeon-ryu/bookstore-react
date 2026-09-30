'use client'

import { purchaseApi } from "@/api/purchaseAPI";
import Empty from "@/components/Empty";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react"

export default function Purchase() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [purchaseList, setPurchaseList] = useState([]);

    const getPurchaseList = async() => {
        setError(null);
        setLoading(true);

        try {
            const result = await purchaseApi.getPurchaseList();
            setPurchaseList(result);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getPurchaseList();
    }, []);

    if(loading) <Loading />
    if(error) <Error error={error} />
    if(!purchaseList || purchaseList.length === 0) return <Empty />

    return <div className="list-container">
        {purchaseList.map(purchase => (<div className="book-card" key={purchase.id}>
            <div>
                <p>주문 번호 : {purchase.id}</p>
                <p>주문 날짜 : {(new Date(purchase.purchaseDate)).toLocaleString('ko-KR')}</p>
            </div>
            <div>
                <img src={purchase.image} alt={purchase.name} />
            </div>
            <div className="book-content">
                <strong>{purchase.name}</strong><br/>
                <p>{purchase.writer} {purchase.category}</p><br/>
                <p>{purchase.description}</p>
            </div>
            <div className="right-content">
                {purchase.price?.toLocaleString()}원<br/>
                수량 : {purchase.count}개
            </div>
        </div>))}
    </div>
}