import { Textarea } from '@nextui-org/react'
import { User } from '@/types/user.type'
import { UserProfileCompProps } from '@/types/userProfileComp.type'

const Bio = ({ userProfile, handleChange }: UserProfileCompProps) => {
  return (
    <div className="break-inside-avoid rounded-xl bg-dark-2 p-4">
      <h2 className="text-lg font-medium">Bio</h2>
      <Textarea
        onChange={handleChange('about')}
        value={userProfile.about}
        fullWidth
        placeholder="Enter your description"
        className=""
      />
    </div>
  )
}

export default Bio
