import { User } from '@/types/user.type'
import { UserProfileCompProps } from '@/types/userProfileComp.type'
import { Input } from '@nextui-org/react'
import React from 'react'

const PersonalInformation = ({ userProfile, handleChange }: UserProfileCompProps) => {
  return (
    <div className="break-inside-avoid rounded-xl bg-dark-2 p-4">
      <h2 className="mb-1 text-lg font-medium">Personal Information</h2>
      <form className="mt-4 space-y-4">
        <Input
          onChange={handleChange('fullName')}
          labelPlacement="outside"
          placeholder="Some name here"
          label="Full Name"
          name="fullName"
          value={userProfile.fullName}
          required
        />
        <Input
          onChange={handleChange('email')}
          labelPlacement="outside"
          placeholder="Some email here"
          label="Email"
          name="email"
          value={userProfile.email}
          required
        />
        <Input
          onChange={handleChange('username')}
          labelPlacement="outside"
          placeholder="Some username here"
          label="Username"
          name="username"
          value={userProfile.username}
          required
        />
        <Input
          onChange={handleChange('position')}
          labelPlacement="outside"
          placeholder="Role"
          label="Role"
          name="position"
          value={userProfile.position}
          required
        />
      </form>
    </div>
  )
}

export default PersonalInformation
