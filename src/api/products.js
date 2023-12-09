import { get } from "./query";

export const getProducts = async (groupNum) => {
    const response = await get('https://localhost:7135/api/products?groupNum=MI-GGTM19-SET');
    console.log(response);
    return response.json();
};