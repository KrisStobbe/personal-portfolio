/**
 * Generic fetch wrapper that handles API requests with authentication.
 * Automatically adds the Sanity API token to the request headers.
 * 
 * @param {string} url - The URL to fetch from
 * @returns {Promise<any>} The JSON response from the API
 * @throws {Error} If the network response is not ok
 */
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
