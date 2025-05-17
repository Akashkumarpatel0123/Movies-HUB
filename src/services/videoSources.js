// Mock implementation - in a real app, you'd integrate with actual video providers
export const getVideoSource = async (contentId, contentType) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Return mock URLs based on content type
  const sources = {
    movie: [
      `https://example.com/embed/movie/${contentId}`,
      `https://backup.example.com/movie/${contentId}`
    ],
    tv: [
      `https://example.com/embed/tv/${contentId}`,
      `https://backup.example.com/tv/${contentId}`
    ]
  }

  // Return first available source
  return sources[contentType][0]
}