import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, getProduct } from "./productApi";
// create product hook
export const useCreateProduct = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: createProduct,
         onSuccess: () => qc.invalidateQueries([{ queryKey: ["products"] }]),
    })
}
// GET
export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: getProduct,
  });