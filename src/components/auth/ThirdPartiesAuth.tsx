import { Button, Tooltip } from '@nextui-org/react'
import { AiOutlineGoogle } from 'react-icons/ai'
import { BiLogoFacebook } from 'react-icons/bi'
import { FaXTwitter } from 'react-icons/fa6'
import { TbBrandGithubFilled } from 'react-icons/tb'

const ThirdPartiesAuth = () => {
  return (
    <div className='flex items-center justify-center gap-2 mt-4'>
      <Tooltip delay={1000} content='Google'>
        <Button name='google' variant='flat' fullWidth>
          <AiOutlineGoogle className='text-2xl' />
        </Button>
      </Tooltip>

      <Tooltip delay={1000} content='Facebook'>
        <Button name='facebook' variant='flat' fullWidth>
          <BiLogoFacebook className='text-2xl' />
        </Button>
      </Tooltip>

      <Tooltip delay={1000} content='Twitter'>
        <Button name='twitter' variant='flat' fullWidth>
          <FaXTwitter className='text-xl' />
        </Button>
      </Tooltip>

      <Tooltip delay={1000} content='Github'>
        <Button name='github' variant='flat' fullWidth>
          <TbBrandGithubFilled className='text-xl' />
        </Button>
      </Tooltip>
    </div>
  )
}

export default ThirdPartiesAuth
