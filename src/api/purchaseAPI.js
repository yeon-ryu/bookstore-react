const BASE_URL = "http://localhost:4000/purchase";

export const purchaseApi = {
    getPurchaseList : async(page = 1, perPage = 40) => {
        const url = new URL(BASE_URL);
        url.searchParams.append('_sort', '-purchaseDate');
        url.searchParams.append('_page', page);
        url.searchParams.append('_per_page', perPage);
        const res = await fetch(url);
        if(!res.ok) throw new Error(`구매 기록을 불러오는 중 오류가 발생했습니다! (${res.statusText})`);
        return res.json();
    },

    purchase : async(book) => {
        const res = await fetch(BASE_URL, {
            method : "POST",
            headers : {"Content-Typle" : "application/json"},
            body : JSON.stringify({'bookId' : book.bookId, 'count' : book.count, 'price' : book.price, 'purchaseDate' : book.purchaseDate, 'purchaseId' : book.purchaseId
                , 'name' : book.name, 'writer' : book.writer, 'category' : book.category, 'image' : book.image })
        });
        if(!res.ok) throw new Error(`결제하는 중 오류가 발생했습니다! (${res.statusText})`);

        return res.json();
    }
}