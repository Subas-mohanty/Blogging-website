import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button, Logo, Input} from './index'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { login } from '../store/authSlice';

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const {register, handleSubmit} = useForm();
    
    const create = async (data) =>{
        setError("");

        try {
            const session = await authService.createAccount(data);
            if(session){
                const userData = await authService.getCurrent();
                if(userData) dispatch(login(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    }
  return (
    <div className='flex items-center justify-center'>
        <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl -10 border border-black/10'>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-dull max-w-[100px]'>
                    <Logo width='100%'></Logo>
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to create account</h2>

            <p className='mt-2 text-center text-base text-black/60'>Already have an account?&nbsp;
            <Link to = "/login" className='font-medium text-primary transition-all duration-200 hover:underline'>
                Sign in
            </Link>
            </p>
            {error && <p className='text-red-500 text-center'>{error}</p>}

            <form onSubmit={handleSubmit(create)}>
                <div className='space-y-5'>
                    
                    <input 
                    label = "Full Name: "
                     placeholder='Enter your full name'
                     {...register("name",{
                        required : true
                     }) }/>

                    <input label = "Email: "
                    placeholder='Enter your email'
                    type = "email"
                    {...register("email", {
                        required : true,
                        validate : {
                            matchPattern: (value) => /[\w|.|-]*@\w*\.[\w|.]*/.test(value) || "Email address must be a valid address"
                        }
                    })}
                    />

                    <input
                    label = "Password"
                    type='password' 
                    placeholder='Enter your password'
                    {...register('password', {
                        required: true
                    })}
                    />

                    <Button
                    type='submit'
                    className='w-full'
                    >Create Account</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup
