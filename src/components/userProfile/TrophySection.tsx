import { Button, Tooltip } from '@nextui-org/react'
import Image from 'next/image'
import React from 'react'

const TrophySection = () => {
  return (
    <div className="rounded-lg bg-dark-2">
      <h3 className="p-4 font-medium">Trophy</h3>

      {/* Divider */}
      <div className="w-full border-t border-dark-1" />

      {/* Trophy */}
      <div className="grid grid-cols-2 gap-7 px-7 py-4">
        <Tooltip content="Badge 1">
          <Image
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--NpIq4Uy3--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/91/Version2-04.png"
            alt="badge_1"
            width={120}
            height={120}
            className="h-full w-full rounded-full"
          />
        </Tooltip>
        <Tooltip content="Badge 1">
          <Image
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--NpIq4Uy3--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/91/Version2-04.png"
            alt="badge_1"
            width={120}
            height={120}
            className="h-full w-full rounded-full"
          />
        </Tooltip>
        <Tooltip content="Badge 1">
          <Image
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--NpIq4Uy3--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/91/Version2-04.png"
            alt="badge_1"
            width={120}
            height={120}
            className="h-full w-full rounded-full"
          />
        </Tooltip>
        <Tooltip content="Badge 1">
          <Image
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--NpIq4Uy3--/c_limit,f_auto,fl_progressive,q_80,w_180/https://dev-to-uploads.s3.amazonaws.com/uploads/badge/badge_image/91/Version2-04.png"
            alt="badge_1"
            width={120}
            height={120}
            className="h-full w-full rounded-full"
          />
        </Tooltip>
      </div>

      <Button variant="light" className="mx-4 mb-2 w-[calc(100%-32px)]">
        View all trophies
      </Button>
    </div>
  )
}

export default TrophySection
