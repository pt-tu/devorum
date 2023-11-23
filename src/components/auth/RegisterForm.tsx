import { Button, Input } from '@nextui-org/react'
import React, { Dispatch, SetStateAction } from 'react'
import PasswordInput from './PasswordInput'

type Props = {
  formik: any
  pwdVisible: boolean
  setPwdVisible: Dispatch<SetStateAction<boolean>>
  confPwdVisible: boolean
  setConfPwdVisible: Dispatch<SetStateAction<boolean>>
}

const RegisterForm = ({ formik, pwdVisible, setPwdVisible, confPwdVisible, setConfPwdVisible }: Props) => {
  const toggleVisibility = (setFn: Dispatch<SetStateAction<boolean>>) => () => {
    setFn((prev) => !prev)
  }

  return (
    <form className="mt-10 text-left" onSubmit={formik.handleSubmit}>
      <Input
        placeholder="Enter your email"
        labelPlacement="outside"
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
      <Input
        placeholder="Enter your username"
        labelPlacement="outside"
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isInvalid={formik.touched.username && Boolean(formik.errors.username)}
        errorMessage={formik.touched.username && formik.errors.username}
        label="Username"
        required
        name="username"
        size="lg"
        className="mt-4"
      />
      <PasswordInput
        placeholder="Enter a secure passcode"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isInvalid={formik.touched.password && Boolean(formik.errors.password)}
        errorMessage={formik.touched.password && formik.errors.password}
        visible={pwdVisible}
        toggle={toggleVisibility(setPwdVisible)}
        label="Passcode"
        name="password"
      />
      <PasswordInput
        placeholder="Enter passcode again"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isInvalid={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
        errorMessage={formik.touched.confirmPassword && formik.errors.confirmPassword}
        visible={confPwdVisible}
        toggle={toggleVisibility(setConfPwdVisible)}
        label="Passcode Confirm"
        name="confirmPassword"
      />

      <Button type="submit" size="lg" fullWidth className="mt-8 bg-black text-white">
        Register
      </Button>
    </form>
  )
}

export default RegisterForm
