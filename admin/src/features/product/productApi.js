import axiosInstance from "../../api/axios";

export const getProduct = async() => {
    const { data } = await axiosInstance.get('/product/list-product');
    return data;
}
export const createProduct = async(product) => {
    const { data } = await axiosInstance.post('/product/add', product);
    return data;
}
export const deleteProduct = async (id) => {
    const { data } = await axiosInstance.delete(`/product/remove/${id}`);
    return data
}
