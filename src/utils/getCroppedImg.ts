import { Crop } from 'react-image-crop'

export function getCroppedImg(image: HTMLImageElement, crop: Crop) {
  const canvas = document.createElement('canvas')
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  canvas.width = crop.width
  canvas.height = crop.height
  const ctx = canvas.getContext('2d')

  // New lines to be added
  const pixelRatio = window.devicePixelRatio
  canvas.width = crop.width * pixelRatio
  canvas.height = crop.height * pixelRatio
  ctx?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
  if (ctx) {
    ctx.imageSmoothingQuality = 'high'
  }

  ctx?.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height,
  )

  // As Base64 string
  const base64Image = canvas.toDataURL('image/jpeg')
  return base64Image

  // As a blob
}

export default getCroppedImg
