import * as Yup from 'yup'

const registerValidationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email is invalid'),
  username: Yup.string().required('Username is required'),
  password: Yup.string().required().min(8, 'Passcode must be at least 8 chars'),
  confirmPassword: Yup.string()
    .required('Confirm Passcode is required')
    .oneOf([Yup.ref('password')], 'Passcodes must match'),
  acceptTermsandConditions: Yup.bool().oneOf([true], 'You must accept our terms & conditions'),
})

export default registerValidationSchema
