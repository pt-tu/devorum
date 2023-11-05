import * as Yup from 'yup'

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string().required('Password is required'),
})

export default loginValidationSchema
