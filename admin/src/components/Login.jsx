import axios from 'axios';
import {useForm} from 'react-hook-form'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
const Login = ({setToken}) => {
    const { register, handleSubmit } = useForm();
    const loginHandler = async(data) => {
        try {
            const response = await axios.post(backendUrl + '/api/user/admin', data);
            console.log(response);
            if (response.data.success) {
                toast.success(response.data.message);
                setToken(response.data.token);
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }
  return (
      <div className='flex items-center justify-center w-full min-h-screen'>
          <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
              <h1 className='text-2xl font-bold mb-4'>Admin panel</h1>
              <form onSubmit={handleSubmit(loginHandler)}>
                  <div className='mb-3 min-w-72'>
                      <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                      <input {...register('email',{required:"email required!"})} className='w-full rounded-md px-3 py-2 border outline-0 border-gray-300' type="email" placeholder='your@gmail.com' required />
                  </div>
                    <div className='mb-3 min-w-72'>
                      <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                      <input {...register('password',{required:"password required !"})} className='w-full rounded-md px-3 py-2 border outline-0 border-gray-300' type="password" placeholder='password' required />
                  </div>
                  <button className='w-full bg-black text-white px-3 py-2 cursor-pointer' type='submit'>Login</button>
              </form>
          </div>
    </div>
  )
}

export default Login