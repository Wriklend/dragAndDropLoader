export const getValidatedFile = (prevFile = {}, files = {}) => {
  if (files.length > 1) return 'Choose only 1 image'
  const file = files[0]

  if (!file || !/image/.test(file.type)) return 'Drop images only'

  if (prevFile.size === file.size && prevFile.name === file.name) return 'Image already loaded'

  return 'ok'
}