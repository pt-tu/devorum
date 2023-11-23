'use client'

import { Button, Image, Input, Link } from '@nextui-org/react'
import NextLink from 'next/link'
import NextImage from 'next/image'
import ThirdPartiesAuth from '@/components/auth/ThirdPartiesAuth'
import { PasswordInput } from '@/components/auth'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import loginValidationSchema from '@/validators/loginValidator'
import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'
import { loginService } from '@/services/userService'
import { useAuthStore } from '@/store/useUserStore'
import { useRouter } from 'next/navigation'

const initialValues = {
  email: '',
  password: '',
}

const Login = () => {
  const [pwdVisible, setPwdVisible] = useState(false)
  const setCredentials = useAuthStore((state) => state.setCredentials)
  const router = useRouter()

  const formik = useFormik({
    initialValues,
    validationSchema: loginValidationSchema,

    async onSubmit(values, { resetForm, setErrors }) {
      try {
        const response = await loginService(values)
        const { _id, token } = response.data
        setCredentials(_id, token)
        resetForm()
        router.push('/')
      } catch (error) {
        if (isAxiosError(error) && typeof error.response?.data?.msg === 'string') {
          toast.error(error.response?.data?.msg)
        } else {
          toast.error('Logged in failed')
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

      <h1 className="mt-6 text-3xl font-medium">Dive into the devorum community</h1>
      <p className="mt-4">Hey, Enter your details to get sign in to your account</p>

      <form className="mt-10 text-left" onSubmit={formik.handleSubmit}>
        <Input
          labelPlacement="outside"
          placeholder="Your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.email && Boolean(formik.errors.email)}
          errorMessage={formik.touched.email && formik.errors.email}
          label="Email"
          name="email"
          required
          size="lg"
        />
        <PasswordInput
          placeholder="Your password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.password && Boolean(formik.errors.password)}
          errorMessage={formik.touched.password && formik.errors.password}
          visible={pwdVisible}
          toggle={() => setPwdVisible((prev) => !prev)}
          label="Passcode"
          name="password"
        />
        <div className="mt-6 w-full text-left">
          <Link color="foreground" as={NextLink} href="/forget-password" className="text-sm">
            Forget your password?
          </Link>
        </div>
        <Button type="submit" size="lg" fullWidth className="mt-8 bg-black text-white">
          Login
        </Button>
      </form>

      <div className="mt-6 flex items-center justify-center gap-4 text-sm">
        <p className="w-6 border-t"></p>
        Or Login With
        <p className="w-6 border-t"></p>
      </div>

      <ThirdPartiesAuth />

      <p className="mt-8 text-sm">
        Don&#39;t have an account?{' '}
        <Link as={NextLink} href="/register" color="foreground" className="text-sm font-medium">
          Register Now
        </Link>
      </p>
    </div>
  )
}

export default Login
