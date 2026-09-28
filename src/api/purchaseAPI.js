const BASE_URL = "http://localhost:4000/purchase";

export const purchaseApi = {
    getPurchaseList : async() => {
        const res = await fetch(BASE_URL);
        if(!res.ok) throw new Error("구매 기록을 불러오는 중 오류가 발생했습니다!");
        return res.json();
    },

    purchase : async({name, count, price}) => {
        const res = await fetch(BASE_URL, {
            method : "POST",
            headers : {"Content-Typle" : "application/json"},
            body : JSON.stringify({'name' : name, 'count' : count, 'price' : price })
        });
        if(!res.ok) throw new Error("결제하는 중 오류가 발생했습니다!");

        return res.json();
    }
}