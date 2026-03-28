import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, getProduct } from "./productApi";
import { toast } from "react-toastify";
// create
export const useCreateProduct = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: createProduct,
      onSuccess: (data) => {
            toast.success(data.message || "Product added")
           qc.invalidateQueries({ queryKey: ["products"] })
         }
    })
}
// GET
export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: getProduct,
  });