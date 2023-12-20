/* eslint-disable @next/next/no-img-element */
import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from '@nextui-org/react'
import { ChangeEvent, ReactNode, useCallback, useMemo, useRef, useState } from 'react'
import { TbMessageReport } from 'react-icons/tb'
import html2canvas from 'html2canvas'
import { IoClose } from 'react-icons/io5'
import dataURLtoFile from '@/utils/dataUrlToFile'
import { uploadFileService } from '@/services/uploadService'
import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop, { Crop } from 'react-image-crop'
import getCroppedImg from '@/utils/getCroppedImg'
import _ from 'lodash'
import ImageResize from 'image-resize'

const Report = ({ children }: { children?: ReactNode }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [screenshotImageUrl, setScreenshotImageUrl] = useState('')
  const [localImageUrl, setLocalImageUrl] = useState('')
  const [description, setDescription] = useState('')
  const [crop, setCrop] = useState<Crop>()
  const screenshotImageRef = useRef<HTMLImageElement | null>(null)

  const [loading, setLoading] = useState(false)
  const ref = useRef<HTMLInputElement | null>(null)
  const getImage = () => {
    html2canvas(document.documentElement).then((canvas) => {
      const ctx = canvas.getContext('2d')
      ctx?.fillRect(50, 50, 50, 50)
      setScreenshotImageUrl(canvas?.toDataURL())
    })
  }

  const onRemove = () => {
    setLocalImageUrl('')
  }

  const getCroppedImage = (c: Crop) => {
    if (screenshotImageRef.current) {
      const base64Image = getCroppedImg(screenshotImageRef.current, c)
      setLocalImageUrl(base64Image)
      setScreenshotImageUrl('')
      setCrop(undefined)
      onOpen()
    }
  }

  const handleCropChange = (c: Crop) => {
    setCrop(c)
  }

  const onUploadClick = () => {
    ref.current?.click()
  }

  const handleUploadChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageResize = new ImageResize({
        format: 'png',
        height: window.innerHeight,
      })
      const result = await imageResize.play(file)
      setScreenshotImageUrl(result)
      onClose()
      setLocalImageUrl('')
    }
  }

  const handleSendReport = async () => {
    if (localImageUrl) {
      const file = dataURLtoFile(localImageUrl, 'report')
      if (file) {
        try {
          setLoading(true)
          const formData = new FormData()
          formData.append('file', file)
          const response = await uploadFileService(formData)
          console.log('response upload image report:', response)
          // const await
        } catch (error) {
          console.log('upload image error:', error)
        } finally {
          setLoading(false)
        }
      }
    }
  }

  return (
    <>
      {screenshotImageUrl && (
        <div className="fixed left-0 top-0 z-[50] flex h-screen w-screen overflow-hidden rounded-xl">
          <ReactCrop
            onDragEnd={() => crop && getCroppedImage(crop)}
            className="mx-auto"
            crop={crop}
            onChange={handleCropChange}
          >
            <img
              ref={screenshotImageRef}
              className="rounded-xl object-contain"
              alt="capture-img"
              src={screenshotImageUrl}
            />
          </ReactCrop>
        </div>
      )}
      <input onChange={handleUploadChange} accept="*.png,*.jpg,*.jpeg" ref={ref} type="file" className="hidden"></input>
      <Button
        onClick={getImage}
        size="lg"
        radius="full"
        className="fixed bottom-4 left-4 z-[30] opacity-75"
        variant="flat"
      >
        Report <TbMessageReport className="text-xl" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Report problem</ModalHeader>
              <ModalBody>
                <Textarea
                  onChange={(e) => setDescription(e.target.value)}
                  size="lg"
                  placeholder="Please include as much information as possible"
                ></Textarea>
                {localImageUrl && (
                  <div className="relative">
                    <div className=" aspect-video w-full overflow-hidden rounded-xl">
                      <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
                        <Image className="w-full rounded-xl object-cover" alt="capture-img" src={localImageUrl} />
                      </ReactCrop>
                    </div>
                    <Button
                      onClick={onRemove}
                      size="sm"
                      isIconOnly
                      className="absolute -right-2 -top-2 z-[11]"
                      radius="full"
                    >
                      <IoClose />
                    </Button>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                {!localImageUrl && (
                  <Button onClick={onUploadClick} className="">
                    Upload Image
                  </Button>
                )}
                <Button isLoading={loading} onClick={handleSendReport} isDisabled={!description.trim()} color="primary">
                  Send report
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default Report
