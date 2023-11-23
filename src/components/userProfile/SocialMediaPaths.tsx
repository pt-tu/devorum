import { Input } from '@nextui-org/react'
import { FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { CgWebsite } from 'react-icons/cg'
import { UserProfileCompProps } from '@/types/userProfileComp.type'

const SocialMediaPaths = ({ userProfile, handleChange }: UserProfileCompProps) => {
  return (
    <div className="break-inside-avoid space-y-4 rounded-xl bg-dark-2 p-4">
      <h2 className="mb-4 text-lg font-medium">Social Media paths</h2>
      <Input
        startContent={<FaGithub />}
        labelPlacement="outside"
        placeholder="Enter your Github"
        label="Github"
        name="github"
        value={userProfile.github}
        onChange={handleChange('github')}
        required
      />
      <Input
        startContent={<FaXTwitter />}
        labelPlacement="outside"
        placeholder="Enter your X"
        value={userProfile.x}
        label="X"
        onChange={handleChange('x')}
        name="X"
        required
      />
      <Input
        startContent={<CgWebsite />}
        labelPlacement="outside"
        placeholder="Enter your Website"
        value={userProfile.website}
        label="Website"
        onChange={handleChange('website')}
        name="Website"
        required
      />
    </div>
  )
}

export default SocialMediaPaths
