import * as Yup from 'yup'

const newUserTitleSchema = Yup.object().shape({
  name: Yup.string().required('Email is required'),
  backgroundColor: Yup.string()
    .required('Background color is required')
    .matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/, 'Invalid color'),
  textColor: Yup.string()
    .required('Background color is required')
    .matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/, 'Invalid color'),
})

export default newUserTitleSchema
