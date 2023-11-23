import { Input } from '@nextui-org/react'
import React from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

type Props = {
  visible?: boolean
  toggle?: () => void
} & React.ComponentProps<typeof Input>

const PasswordInput = ({ toggle = () => {}, ...props }: Props) => {
  return (
    <Input
      {...props}
      label={props.label}
      required
      name={props.name}
      size="lg"
      labelPlacement="outside"
      className="mt-4"
      endContent={
        <button className="focus:outline-none" type="button" onClick={toggle}>
          {props.visible ? (
            <AiFillEyeInvisible className="pointer-events-none text-2xl text-default-400" />
          ) : (
            <AiFillEye className="pointer-events-none text-2xl text-default-400" />
          )}
        </button>
      }
      type={props.visible ? 'text' : 'password'}
    />
  )
}

export default PasswordInput
