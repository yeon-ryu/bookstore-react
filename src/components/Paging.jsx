import "@/css/Paging.css";

/**
 * click(이동할 페이지, 페이지당 출력 수)
 * page : 현재 페이지
 * perPage : 현재 페이지당 출력 수
 * maxCount : 전체 아이템 수 (숫자 버튼 안 쓰면 생략 가능)
 * useNumber : 숫자 페이징 버튼 사용 여부 (디폴트 : true)
 * btnCount : 숫자 페이징 버튼 갯수
 */
export default  function Paging({ click, page = 1, perPage = 20, maxCount = 0, useNumber = true, btnCount = 5 }) {
    let startPage = 1;
    let btnCnt = 0;

    if(useNumber) {
        startPage = Math.floor((page - 1) / btnCount) * btnCount + 1;

        // 최대 btnCount개의 버튼 생성(maxCount 보다 많으면 생성 안함)
        btnCnt = (startPage + btnCount - 1) * perPage > maxCount ? (Math.ceil(maxCount / perPage) - startPage + 1) : btnCount;
    }

    return <div className="paging">
        <button className="paging-btn paging-btn--icon" onClick={() => click(1, perPage)} disabled={page <= 1}><FirstIcon /></button>
        <button className="paging-btn paging-btn--icon" onClick={() => click(page - 1, perPage)} disabled={page <= 1}><PrevIcon /></button>

        {useNumber && Array.from({ length : btnCnt }).map((_, idx) => {
            return <button className="paging-btn" key={idx} onClick={() => click((startPage + idx), perPage)} disabled={(startPage + idx) === page}>
                {(startPage + idx)}
            </button>
        })}

        <button className="paging-btn paging-btn--icon" onClick={() => click(page + 1, perPage)} disabled={page * perPage >= maxCount}><NextIcon /></button>
        <button className="paging-btn paging-btn--icon" onClick={() => click(Math.ceil(maxCount / perPage), perPage)} disabled={page * perPage >= maxCount}><LastIcon /></button>
    </div>
}

const FirstIcon = () => (
  <svg className="paging-btn__icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M11 17l-5-5 5-5" />
    <path d="M18 17l-5-5 5-5" />
  </svg>
);
 
const PrevIcon = () => (
  <svg className="paging-btn__icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);
 
const NextIcon = () => (
  <svg className="paging-btn__icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M9 18l6-6-6-6" />
  </svg>
);
 
const LastIcon = () => (
  <svg className="paging-btn__icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M13 17l5-5-5-5" />
    <path d="M6 17l5-5-5-5" />
  </svg>
);