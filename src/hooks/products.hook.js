import { useQuery } from "react-query";
import { getProducts } from "../api/products";

export const useProducts = ({ groupNum }) => {
    const queryKey = ['getProducts', groupNum];

    const query = useQuery(queryKey, () => getProducts({ groupNum }), { retry: false });

    return {
        products: query?.data,
    };
};