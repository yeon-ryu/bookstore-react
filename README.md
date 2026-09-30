# 도서 관리 및 결제 시스템
도서 검색, 도서 관리, 장바구니에 넣고 결제할 수 있는 Next.js / React 기반 시스템입니다.

&nbsp;

## 구조
```
src/
├─ app/           /, /book/[bookId], /manage, /cart, /purchase
├─ components/    Layout, Header, Error, Loading, Empty, Paging
├─ api/           bookAPI, purchaseAPI
└─ stores/        useCartStore
```
CSS 는 AI Claude 를 활용했습니다.

&nbsp;


## 실행
http://localhost:3000
```bash
npm install
npm run dev
```
서버 : 4000 포트
```bash
npm run server
```

&nbsp;

### 추가한 라이브러리
```bash
npm install zustand
npm install -D json-server
```
