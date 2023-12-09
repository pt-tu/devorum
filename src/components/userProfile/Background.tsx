import { Input } from '@nextui-org/react'
import { UserProfileCompProps } from '@/types/userProfileComp.type'

const Background = ({ userProfile, handleChange }: UserProfileCompProps) => {
  return (
    <div className="break-inside-avoid rounded-xl bg-dark-2 p-4">
      <h2 className="mb-1 text-lg font-medium">Background</h2>
      <form className="mt-8 space-y-10">
        <Input
          onChange={handleChange('work')}
          value={userProfile.work}
          labelPlacement="outside"
          placeholder="Some work here"
          label="Work"
          name="work"
          required
        />
        <Input
          onChange={handleChange('education')}
          value={userProfile.education}
          labelPlacement="outside"
          placeholder="Some education here"
          label="Education"
          name="education"
          required
        />
      </form>
    </div>
  )
}

export default Background
