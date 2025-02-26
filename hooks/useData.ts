import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const fetchAllProducts = () => {
  return axios.get("https://fakestoreapi.com/products");
};

export const useData = () => {
  const { data: Datas } = useQuery({
    queryKey: ["Datas"],
    queryFn: fetchAllProducts,
  });
  return { Datas };
};

const fetchProductDetails = async (id: string) => {
  if (!id) return null;
  const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return response.data;
};

export const useDetail = (id: string) => {
  return useQuery({
    queryKey: ["productDetails", id],
    queryFn: () => fetchProductDetails(id),
    enabled: !!id,
  });
};
