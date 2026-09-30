'use client'

import { bookApi } from "@/api/bookAPI";
import Empty from "@/components/Empty";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import Paging from "@/components/Paging";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const searchParam = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [bookList, setBookList] = useState([]);
  const [paging, setPaging] = useState({page : 1, perPage : 20});
  const [itemMaxCount, setItemMaxCount] = useState(0);
  const [filterValue, setFilterValue] = useState({
    category : "",
    name : "",
    writer : ""
  });

  // 중복 검색을 피하기 위한 스위치
  const [refresh, setRefresh] = useState(false);

  const getBookList = async() => {
    setError(null);
    setLoading(true);

    try {
      const books = await bookApi.getBookList(paging.page, paging.perPage, filterValue.category, filterValue.name, filterValue.writer);
      setBookList(books.data);
      setItemMaxCount(books.items);
    } catch(e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  const changeFilterValue = (e) => {
    setFilterValue({...filterValue, [e.target.name] : e.target.value});
  }

  useEffect(() => {
    if(searchParam.get('page')) setPaging(prev => ({...prev, page : searchParam.get('page')}));
    if(searchParam.get('perPage')) setPaging(prev => ({...prev, perPage : searchParam.get('perPage')}));
    if(searchParam.get('category')) setFilterValue(prev => ({...prev, category : searchParam.get('category')}));
    if(searchParam.get('name')) setFilterValue(prev => ({...prev, name : searchParam.get('name')}));
    if(searchParam.get('writer')) setFilterValue(prev => ({...prev, writer : searchParam.get('writer')}));

    setRefresh(true);
  }, [searchParam]);

  useEffect(() => {
    setRefresh(true);
  }, [paging]);

  useEffect(() => {
    if(refresh) {
      getBookList();
      setRefresh(false);
    }
  }, [refresh])

  if(loading) return <Loading />
  if(error) return <Error error={error} />

  // 검색 창, 검색 버튼 누르면 getBookList 호출, bookList 출력
  return (
    <div className="page-container main">
      <div className="side-bar">
        <p className="side-bar-title">카테고리</p>
        <input type="radio" id="category-all" name="category" value="" checked={filterValue.category === ""}
          onChange={e => {changeFilterValue(e); setRefresh(true);}} className="category-input" />
        <label htmlFor="category-all">전체</label>
        <input type="radio" id="category-local" name="category" value="국내도서" checked={filterValue.category === "국내도서"}
          onChange={e => {changeFilterValue(e); setRefresh(true);}} className="category-input" />
        <label htmlFor="category-local">국내도서</label>
        <input type="radio" id="category-foreign" name="category" value="외국도서" checked={filterValue.category === "외국도서"}
          onChange={e => {changeFilterValue(e); setRefresh(true);}} className="category-input" />
        <label htmlFor="category-foreign">외국도서</label>
        <input type="radio" id="category-pricture" name="category" value="그림책" checked={filterValue.category === "그림책"}
          onChange={e => {changeFilterValue(e); setRefresh(true);}} className="category-input" />
        <label htmlFor="category-pricture">그림책</label>
        <input type="radio" id="category-ebook" name="category" value="전자책" checked={filterValue.category === "전자책"}
          onChange={e => {changeFilterValue(e); setRefresh(true);}} className="category-input" />
        <label htmlFor="category-ebook">전자책</label>
      </div>

      <div className="list-container">
        <div className="search-box">
          <input className="search-input" type="text" name="name" value={filterValue.name} onChange={e => changeFilterValue(e)} placeholder="책 제목 검색" />
          <input className="search-input" type="text" name="writer" value={filterValue.writer} onChange={e => changeFilterValue(e)} placeholder="작가명 검색" />
          <button className="action-btn info" onClick={() => {setPaging({page : 1, perPage : 20}); setRefresh(true);}}>검색</button>
          <select className="search-select" name="perPage" id="" value={paging.perPage} onChange={e => setPaging({...paging, perPage : e.target.value})} required>
              <option value="20">20개씩 보기</option>
              <option value="30">30개씩 보기</option>
              <option value="40">40개씩 보기</option>
          </select>
        </div>

        {(!bookList || bookList.length === 0) && <Empty />}

        {bookList.map(book => (<Link href={`/book/${book.id}`} className="book-card" key={book.id}>
          <img src={book.image} alt={book.name} />
          <div className="book-content">
            <strong className="book-title">{book.name}</strong>
            <p className="book-meta"><span>{book.writer}</span><span>{book.category}</span></p>
            <p className="book-desc">{book.description}</p>
          </div>
          <div className="right-content">
            {Number(book.price)?.toLocaleString()}원
          </div>
        </Link>))}

        <Paging click={(movePage, itemsPerPage) => setPaging({page : movePage, perPage : itemsPerPage})}
          page={paging.page} perPage={paging.perPage} maxCount={itemMaxCount} useNumber={true} />
      </div>
    </div>
  );
}
