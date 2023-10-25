'use client'

import { Button, Image, Input, Link } from '@nextui-org/react'
import NextLink from 'next/link'
import NextImage from 'next/image'
import ThirdPartiesAuth from '@/components/auth/ThirdPartiesAuth'
import { PasswordInput } from '@/components/auth'
import { useState } from 'react'

const Login = () => {
  const [pwdVisible, setPwdVisible] = useState(false)

  const handleSubmit = () => {}

  return (
    <div className='text-center bg-white rounded-3xl px-16 py-14 text-base shadow-2xl'>
      <div className='flex justify-center'>
        <Image as={NextImage} width={150} height={75} src='/logo_dark.svg' alt='devorum_logo' />
      </div>

      <h1 className='font-medium text-3xl mt-6'>Dive into the devorum community</h1>
      <p className='mt-4'>Hey, Enter your details to get sign in to your account</p>

      <form className='mt-10' onSubmit={handleSubmit}>
        <Input name='email' size='lg' label='Email' />
        <PasswordInput
          visible={pwdVisible}
          toggle={() => setPwdVisible((prev) => !prev)}
          label='Passcode'
          name='password'
        />
        <div className='w-full text-left mt-6'>
          <Link color='foreground' as={NextLink} href='/forget-password' className='text-sm'>
            Forget your password?
          </Link>
        </div>
        <Button size='lg' fullWidth className='mt-8 bg-black text-white'>
          Login
        </Button>
      </form>

      <div className='flex justify-center items-center gap-4 mt-6 text-sm'>
        <p className='w-6 border-t'></p>
        Or Login With
        <p className='w-6 border-t'></p>
      </div>

      <ThirdPartiesAuth />

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
