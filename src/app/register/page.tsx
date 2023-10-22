'use client'

import { Button, Image, Input, Link } from '@nextui-org/react'
import NextLink from 'next/link'
import NextImage from 'next/image'
import ThirdPartiesAuth from '@/components/auth/ThirdPartiesAuth'
import { Dispatch, SetStateAction, useState } from 'react'
import { PasswordInput } from '@/components/auth'

const Register = () => {
  const [pwdVisible, setPwdVisible] = useState(false)
  const [confPwdVisible, setConfPwdVisible] = useState(false)

  const toggleVisibility = (setFn: Dispatch<SetStateAction<boolean>>) => () => {
    setFn((prev) => !prev)
  }

  const handleSubmit = () => {}

  return (
    <div className='text-center bg-white rounded-3xl px-16 py-14 text-base shadow-2xl'>
      <div className='flex justify-center'>
        <Image as={NextImage} width={150} height={75} src='/static/logo_dark.svg' alt='devorum_logo' />
      </div>

      <h1 className='font-medium text-3xl mt-6'>Join the devorum community</h1>
      <p className='mt-4'>You give us some texts, we give you the whole community. Best deal ever!</p>

      <form className='mt-10' onSubmit={handleSubmit}>
        <Input label='Email' required name='email' size='lg' />
        <Input label='Username' required name='username' size='lg' className='mt-4' />
        <PasswordInput visible={pwdVisible} toggle={toggleVisibility(setPwdVisible)} label='Passcode' name='password' />
        <PasswordInput
          visible={confPwdVisible}
          toggle={toggleVisibility(setConfPwdVisible)}
          label='Passcode confirm'
          name='confirm-password'
        />

        <Button size='lg' fullWidth className='mt-8 bg-black text-white'>
          Register
        </Button>
      </form>

      <div className='flex justify-center items-center gap-4 mt-6 text-sm'>
        <p className='w-6 border-t'></p>
        Or Register With
        <p className='w-6 border-t'></p>
      </div>

      <ThirdPartiesAuth />

      <p className='text-sm mt-8'>
        Already have an account?{' '}
        <Link as={NextLink} href='/login' color='foreground' className='font-medium text-sm'>
          Login
        </Link>
      </p>
    </div>
  )
}

export default Register
