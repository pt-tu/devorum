'use client'

import { Image, Link } from '@nextui-org/react'
import NextLink from 'next/link'
import NextImage from 'next/image'
import ThirdPartiesAuth from '@/components/auth/ThirdPartiesAuth'
import { useState } from 'react'
import { useFormik } from 'formik'
import validationSchema from './validation'
import RegisterForm from '@/components/auth/RegisterForm'

const Register = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
    },
  })
  const [pwdVisible, setPwdVisible] = useState(false)
  const [confPwdVisible, setConfPwdVisible] = useState(false)

  return (
    <div className='text-center bg-white rounded-3xl px-16 py-14 text-base shadow-2xl'>
      <div className='flex justify-center'>
        <Image as={NextImage} width={150} height={75} src='/logo_dark.svg' alt='devorum_logo' />
      </div>

      <h1 className='font-medium text-3xl mt-6'>Join the devorum community</h1>
      <p className='mt-4'>You give us some texts, we give you the whole community. Best deal ever!</p>

      <RegisterForm
        formik={formik}
        pwdVisible={pwdVisible}
        setPwdVisible={setPwdVisible}
        confPwdVisible={confPwdVisible}
        setConfPwdVisible={setConfPwdVisible}
      />

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
