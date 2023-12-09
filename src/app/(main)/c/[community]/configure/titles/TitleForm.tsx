import useUserTitlesData from '@/hooks/useUserTitlesData'
import { createUserTitleService, updateUserTitleService } from '@/services/communityService'
import { CreateUserTitle, UserTitle } from '@/types/community.type'
import newUserTitleSchema from '@/validators/newUserTitleValidator'
import { Button, Card, CardBody, Input } from '@nextui-org/react'
import { isAxiosError } from 'axios'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

const initialValues = {
  name: '',
  description: '',
  backgroundColor: '',
  textColor: '',
  _id: '',
}

type Props = {
  community: string
  onCancel: () => void
  data?: UserTitle | false
}

const TitleForm = ({ community, onCancel, data }: Props) => {
  const { mutate } = useUserTitlesData(community)

  const formik = useFormik<CreateUserTitle>({
    initialValues,
    validationSchema: newUserTitleSchema,

    async onSubmit(values, { resetForm, setErrors }) {
      try {
        if (data) {
          await updateUserTitleService(community, data._id, values)
        } else {
          await createUserTitleService(community, values as CreateUserTitle)
        }
        mutate()
        resetForm()
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(String(error.response?.data?.msg))
        }
        console.log(error)
      }
    },
  })

  useEffect(() => {
    if (data) formik.setValues(data)
    else formik.setValues(initialValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <Card className="mt-10">
      <CardBody>
        <form className="flex flex-col gap-7 p-6" onSubmit={formik.handleSubmit}>
          <h2 className="text-2xl font-medium">{data ? `Edit '${data.name}'` : 'Create new title'}</h2>
          <div>
            <Input
              value={formik.values.name}
              onChange={(e) => {
                if (e.target.value.length <= 12) formik.handleChange(e)
              }}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.name && Boolean(formik.errors.name)}
              errorMessage={formik.touched.name && formik.errors.name}
              size="lg"
              type="text"
              name="name"
              placeholder="Title name, e.g. Senior"
              label={
                <p className="text-base">
                  Title Name
                  <span className="ml-4 text-sm font-light text-gray-6/60">
                    {12 - (formik.values?.name?.length || 0)} characters remaining
                  </span>
                </p>
              }
              labelPlacement="outside"
            />
          </div>
          <div>
            <Input
              value={formik.values.description}
              onChange={(e) => {
                if (e.target.value.length <= 50) formik.handleChange(e)
              }}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.description && Boolean(formik.errors.description)}
              errorMessage={formik.touched.description && formik.errors.description}
              size="lg"
              type="text"
              name="description"
              placeholder="Description"
              label={
                <p className="text-base">
                  Description
                  <span className="ml-4 text-sm font-light text-gray-6/60">
                    {50 - (formik.values?.description?.length || 0)} characters remaining
                  </span>
                </p>
              }
              labelPlacement="outside"
            />
          </div>

          <div className="flex gap-7">
            <Input
              value={formik.values.backgroundColor}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.backgroundColor && Boolean(formik.errors.backgroundColor)}
              errorMessage={formik.touched.backgroundColor && formik.errors.backgroundColor}
              size="lg"
              type="text"
              placeholder="Background Color"
              name="backgroundColor"
              label={<p className="text-base">Background Color</p>}
              labelPlacement="outside"
            />
            <Input
              value={formik.values.textColor}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.textColor && Boolean(formik.errors.textColor)}
              errorMessage={formik.touched.textColor && formik.errors.textColor}
              size="lg"
              type="text"
              name="textColor"
              placeholder="Text Color"
              label={<p className="text-base">Text Color</p>}
              labelPlacement="outside"
            />
          </div>
          <div className="flex gap-5">
            <Button color="primary" size="lg" type="submit">
              Save
            </Button>
            <Button onClick={onCancel} variant="flat" size="lg">
              Cancel
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}

export default TitleForm
