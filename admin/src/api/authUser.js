
import axiosIntance from "../axiosIntance/axiosIntance";

export const loginUser = async(data) => {
    const res = await axiosIntance.post('/api/user/admin',data);
    return res.data
}