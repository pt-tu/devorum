function dataURLtoFile(dataurl: string, filename: string) {
  const arr = dataurl.split(',')

  if (arr.length > 0) {
    let mime = arr
        .at(0)
        ?.match(/:(.*?);/)
        ?.at(1),
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n)

    if (!mime) {
      return null
    }

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename + '.' + (mime.split('/').at(1) || 'png'), { type: mime })
  } else return null
}

export default dataURLtoFile
