export const fetcher = async (url: string): Promise<any> => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_TOKEN}`,
    },
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return await response.json()
}
