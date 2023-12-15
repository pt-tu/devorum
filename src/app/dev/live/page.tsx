'use client'
import React, { useState } from 'react'
import Header from '../Header'
import { Button, Input } from '@nextui-org/react'
import { IoSearchSharp } from 'react-icons/io5'

const Live = () => {
  const [search, setSearch] = useState('')
  const [options, setOptions] = useState({
    fontSize: '13px',
    fontFamily: 'Fira Code',
    tabSize: 2,
    formatOnSave: false,
  })

  return (
    <div className="">
      <title>Lobby</title>
      <Header options={options} setOptions={setOptions} submit={() => {}} />
      <div className="mt-4 px-10 py-8">
        <div className="flex items-center gap-6">
          <h1 className="text-3xl font-medium">Lobby</h1>
          <Input
            classNames={{
              inputWrapper: 'bg-dark-5',
            }}
            variant="flat"
            className="ml-auto w-fit"
            size="sm"
            type="email"
            placeholder="Search room..."
            startContent={<IoSearchSharp />}
          />
          <Button color="primary">Create Room</Button>
        </div>
        <div className="auto-grid mt-8 gap-6">
          <Button className="h-fit rounded-xl bg-dark-5 p-4 shadow-sm" fullWidth>
            <div className="h-full w-full text-left">
              <p>Room</p>
              <p className="font-light">1fuahadof878097awefnc</p>
              <p className="mt-2">User</p>
              <p className="font-light">tuan-hda</p>
              <p className="mt-2">Created At</p>
              <p className="font-light">9:23:45</p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Live
