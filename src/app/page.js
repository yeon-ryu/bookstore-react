'use client'

import { bookApi } from "@/api/bookAPI";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import Paging from "@/components/Paging";
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
    if(searchParam.get('_page')) setPaging(prev => ({...prev, page : searchParam.get('_page')}));
    if(searchParam.get('_per_page')) setPaging(prev => ({...prev, perPage : searchParam.get('_per_page')}));
    if(searchParam.get('category')) setFilterValue(prev => ({...prev, category : searchParam.get('category')}));
    if(searchParam.get('name')) setFilterValue(prev => ({...prev, category : searchParam.get('name')}));
    if(searchParam.get('writer')) setFilterValue(prev => ({...prev, category : searchParam.get('writer')}));
  }, [searchParam]);

  useEffect(() => {
    getBookList();
  }, [paging]);

  if(loading) return <Loading />
  if(error) return <Error error={error} />

  // 검색 창, 검색 버튼 누르면 getBookList 호출, bookList 출력
  return (
    <div className="page-container">
      <div className="side-bar">
        <div>카테고리</div>
        <input type="radio" id="category-all" name="category" value="" checked={filterValue.category === ""}
          onChange={e => changeFilterValue(e)} className="category-input" />
        <label htmlFor="category-all">전체</label><br/>
        <input type="radio" id="category-local" name="category" value="국내도서" checked={filterValue.category === "국내도서"}
          onChange={e => changeFilterValue(e)} className="category-input" />
        <label htmlFor="category-local">국내도서</label><br/>
        <input type="radio" id="category-foreign" name="category" value="외국도서" checked={filterValue.category === "외국도서"}
          onChange={e => changeFilterValue(e)} className="category-input" />
        <label htmlFor="category-foreign">외국도서</label><br/>
        <input type="radio" id="category-pricture" name="category" value="그림책" checked={filterValue.category === "그림책"}
          onChange={e => changeFilterValue(e)} className="category-input" />
        <label htmlFor="category-pricture">그림책</label><br/>
      </div>

      <div className="list-container">
        <div>
          <input className="search-input" type="text" name="name" value={filterValue.name} onChange={e => changeFilterValue(e)} placeholder="책 제목 검색" />
          <input className="search-input" type="text" name="writer" value={filterValue.writer} onChange={e => changeFilterValue(e)} placeholder="작가명 검색" />
          <button onClick={() => {setPaging({page : 1, perPage : 20}); getBookList();}}>검색</button>
        </div>

        {bookList.map(book => (<div className="book-card" key={book.id}>
          <img src={book.image} alt={book.name} />
          <div className="book-content">
            <strong>{book.name}</strong><br/>
            <p>{book.writer} {book.category}</p><br/>
            <p>{book.description}</p>
          </div>
          <div className="right-content">
            {book.price?.toLocaleString()}원
          </div>
        </div>))}

        <Paging click={(movePage, itemsPerPage) => setPaging({page : movePage, perPage : itemsPerPage})}
          page={paging.page} perPage={paging.perPage} maxCount={itemMaxCount} useNumber={true} />
      </div>
    </div>
  );
}
