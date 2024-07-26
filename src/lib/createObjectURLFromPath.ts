export const createObjectURLFromPath = async (path: string) => {
  const response = await fetch(path)
  const blob = await response.blob()
  return URL.createObjectURL(blob)
}
