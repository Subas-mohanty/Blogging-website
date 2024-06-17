import React, {useState} from 'react';
import { login as authLogin } from '../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import {Button, Logo, Input} from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState("");
    
    const login = async (data) =>{
        setError("");
        try {
           const session = await authService.logIn(data); // session is login status
           if(session){
            // if user is logged in, get the userData
            const userData = await authService.getCurrent();
            // if userData is present then call the login(authLogin) with the userData
            if(userData) dispatch(authLogin(userData));
            navigate("/"); // if we use Link, then we have to click that to redirect but in navigate we can directly redirect the user to the desired route
           }

        } catch (error) {
           setError(error.message); 
        }
    }
  return (
    <div className='flex items-center justify-center w-full'>
        <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-dull max-w-[100px]'>
                    <Logo width='100%'></Logo>
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>

            <p className='mt-2 text-center text-base text-black/60'>Don&apos;t have any account?&nbsp;
            <Link to = "/signup" className='font-medium text-primary transition-all duration-200 hover:underline'>
                Sign up
            </Link>
            </p>
            {error && <p className='text-red-500 text-center'>{error}</p>}

            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>

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
                    type = "submit"
                    >Sign in</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login