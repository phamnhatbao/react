import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getInfoAsync, loginAsync } from '../redux/account.slide';
import { AppDispatch, AppState } from '../redux/store';
import { useEffect, useRef } from 'react';

interface Login {
  email: string;
  password: string;
}

function Login(): JSX.Element {
  const navigate = useNavigate();
  const mount = useRef(true);
  useSelector((state: AppState) => {
    if (state.account.value?.username) {
      return navigate('/dashboard');
    }
    return state.account.value;
  });
  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Login>();

  useEffect(() => {
    if (mount.current) {
      // Only run in first time
      reset({ email: 'admin@yourstore.com', password: 'P@ssword123' });

      mount.current = false;
      return;
    }
  });
  const submitLoginForm = async (formData: Login) => {
    if (formData.email && formData.password) {
      await dispatch(loginAsync(formData));
      await dispatch(getInfoAsync());
      navigate('/dashboard');
      // dispatch(loginAsync(formData)).then(() => {
      //   dispatch(getInfoAsync()).then(() => {
      //     navigate('/dashboard');
      //   });
      // });
    }
  };

  return (
    <div className='max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8'>
      <div className='max-w-lg mx-auto text-center'>
        <h1 className='text-2xl font-bold sm:text-3xl'>Get started today!</h1>

        <p className='mt-4 text-gray-500'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error neque ipsa culpa autem, at itaque nostrum!
        </p>
      </div>

      <form onSubmit={handleSubmit(submitLoginForm)} className='max-w-md mx-auto mt-8 mb-0 space-y-4'>
        <div>
          <label htmlFor='email' className='sr-only'>
            Email
          </label>

          <div className='relative'>
            <input
              type='email'
              placeholder='Enter email'
              {...register('email', {
                required: { value: true, message: 'Email is required' },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address',
                },
              })}
              className={'w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm' + (errors.email ? ' border-red-500' : '')}
            />

            <span className='absolute inset-y-0 inline-flex items-center right-4'>
              <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label htmlFor='password' className='sr-only'>
            Password
          </label>
          <div className='relative'>
            <input
              type='password'
              placeholder='Enter password'
              {...register('password')}
              className='w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm'
            />

            <span className='absolute inset-y-0 inline-flex items-center right-4'>
              <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                />
              </svg>
            </span>
          </div>
        </div>

        <div className='flex justify-end'>
          <button type='submit' className='inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-blue-500 rounded-lg'>
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
