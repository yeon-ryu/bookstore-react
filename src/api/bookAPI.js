const BASE_URL = "http://localhost:4000/books";

export const bookApi = {
    getBookList : async(page = 1, limit = 20, category = '', name = '', writer = '') => {
        const url = new URL(BASE_URL);
        url.searchParams.append('_page', page);
        url.searchParams.append('_limit', limit);

        if(category.trim().length > 0) {
            url.searchParams.append('category', category);
        }
        if(name.trim().length > 0) {
            url.searchParams.append('name', name);
        }
        if(writer.trim().length > 0) {
            url.searchParams.append('writer', writer);
        }

        const res = await fetch(url);
        if(!res.ok) throw new Error("책 리스트를 불러오는 중 오류가 발생했습니다!");

        return res.json();
    },

    getBook : async(id) => {
        const res = await fetch(`${BASE_URL}/${id}`);
        if(!res.ok) throw new Error("책 상세정보를 불러오는 중 오류가 발생했습니다!");

        return res.json();
    },

    addBook : async(newBook) => {
        const res = await fetch(BASE_URL, {
            method : "POST",
            headers : {"Content-Typle" : "application/json"},
            body : JSON.stringify(newBook)
        });
        if(!res.ok) throw new Error("책을 추가하는 중 오류가 발생했습니다!");

        return res.json();
    },

    updateBook : async(id, bookData) => {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method : "PUT",
            headers : {"Content-Typle" : "application/json"},
            body : JSON.stringify(newBook)
        });
        if(!res.ok) throw new Error("책을 수정하는 중 오류가 발생했습니다!");

        return res.json();
    },

    deleteBook : async(id) => {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method : "DELETE"
        });
        if(!res.ok) throw new Error("책을 삭제하는 중 오류가 발생했습니다!"); 

        return res.ok; // 여기까지 오면 true 밖에 안 남긴 함
    }
}