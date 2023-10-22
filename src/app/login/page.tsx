'use client'

import { Button, Input, Link } from '@nextui-org/react'
import NextLink from 'next/link'
import { AiOutlineGoogle } from 'react-icons/ai'
import { BiLogoFacebook } from 'react-icons/bi'
import { FaXTwitter } from 'react-icons/fa6'

const Login = () => {
  const handleSubmit = () => {}

  return (
    <div className='text-center bg-white rounded-3xl px-16 py-14 text-base shadow-2xl'>
      <h1 className='font-medium text-3xl'>Join the devorum community</h1>
      <p className='mt-4'>Hey, Enter your details to get sign in to your account</p>

      <form className='mt-10' onSubmit={handleSubmit}>
        <Input size='lg' placeholder='Enter Email' />
        <Input size='lg' placeholder='Enter Passcode' className='mt-4' type='password' />
      </form>

      <div className='w-full text-left mt-6'>
        <Link color='foreground' as={NextLink} href='/forget-password' className='text-sm'>
          Forget your password?
        </Link>
      </div>

      <Button size='lg' fullWidth className='mt-8 bg-black text-white'>
        Login
      </Button>

      <div className='flex justify-center items-center gap-4 mt-6 text-sm'>
        <p className='w-6 border-t'></p>
        Or Login With
        <p className='w-6 border-t'></p>
      </div>

      <div className='flex items-center gap-2 mt-4'>
        <Button variant='flat' fullWidth>
          <AiOutlineGoogle className='text-2xl' />
          Google
        </Button>
        <Button variant='flat' fullWidth>
          <BiLogoFacebook className='text-2xl' />
          Facebook
        </Button>
        <Button variant='flat' fullWidth>
          <FaXTwitter className='text-xl' />
          Twitter
        </Button>
      </div>

      <p className='text-sm mt-8'>
        Don&#39;t have an account?{' '}
        <Link as={NextLink} href='/register' color='foreground' className='font-medium text-sm'>
          Register Now
        </Link>
      </p>
    </div>
  )
}

export default Login
