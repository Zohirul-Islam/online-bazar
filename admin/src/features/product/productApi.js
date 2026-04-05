import axiosInstance from "../../api/axios";

export const getProduct = async() => {
    const { data } = await axiosInstance.get('/product/list-product');
    return data;
}
export const createProduct = async(product,token) => {
    const { data } = await axiosInstance.post('/product/add', product, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
            
        }
    });
    return data;
}
export const deleteProduct = async (id) => {
    const { data } = await axiosInstance.delete(`/product/remove/${id}`);
    return data
}
