'use client'

import { Image, Link } from '@nextui-org/react'
import NextLink from 'next/link'
import NextImage from 'next/image'
import ThirdPartiesAuth from '@/components/auth/ThirdPartiesAuth'
import { useState } from 'react'
import { useFormik } from 'formik'
import RegisterForm from '@/components/auth/RegisterForm'
import { registerService } from '@/services/userService'
import { toast } from 'react-toastify'
import { isAxiosError } from 'axios'
import registerValidationSchema from '@/validators/registerValidator'
import { useRouter } from 'next/navigation'

const initialValues = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
}

const initialErrors = { ...initialValues }

const Register = () => {
  const [pwdVisible, setPwdVisible] = useState(false)
  const router = useRouter()
  const [confPwdVisible, setConfPwdVisible] = useState(false)

  const formik = useFormik({
    initialValues,
    validationSchema: registerValidationSchema,

    async onSubmit(values, { resetForm, setErrors }) {
      try {
        await registerService(values)
        resetForm()
        toast.success('Registered successfully')
        router.push('/login')
      } catch (error) {
        if (isAxiosError(error)) {
          const errorFields = error.response?.data?.errors
          if (Array.isArray(errorFields)) {
            const errors = errorFields.reduce((prev, curr) => {
              if (['email', 'username', 'password'].includes(curr.path)) {
                prev[curr.path] = curr.msg
              }
              return prev
            }, {})
            setErrors({ ...initialErrors, ...errors })
          }
        } else {
          toast.error('Registered failed')
        }
        console.log('Register errors:', error)
      }
    },
  })

  return (
    <div className="rounded-3xl bg-dark-2 px-16 py-14 text-center text-base shadow-2xl">
      <div className="flex justify-center">
        <Image as={NextImage} width={150} height={75} src="/logo_dark.svg" alt="devorum_logo" />
      </div>

      <h1 className="mt-6 text-3xl font-medium">Join the devorum community</h1>
      <p className="mt-4">You give us some texts, we give you the whole community. Best deal ever!</p>

      <RegisterForm
        formik={formik}
        pwdVisible={pwdVisible}
        setPwdVisible={setPwdVisible}
        confPwdVisible={confPwdVisible}
        setConfPwdVisible={setConfPwdVisible}
      />

      <div className="mt-6 flex items-center justify-center gap-4 text-sm">
        <p className="w-6 border-t"></p>
        Or Register With
        <p className="w-6 border-t"></p>
      </div>

      <ThirdPartiesAuth />

      <p className="mt-8 text-sm">
        Already have an account?{' '}
        <Link as={NextLink} href="/login" color="foreground" className="text-sm font-medium">
          Login
        </Link>
      </p>
    </div>
  )
}

export default Register
