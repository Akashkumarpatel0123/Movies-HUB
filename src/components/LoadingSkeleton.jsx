const LoadingSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <div className="h-8 w-48 bg-gray-700 rounded mb-6"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-64 bg-gray-700 rounded-lg"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-12">
        <div className="h-8 w-48 bg-gray-700 rounded mb-6"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-64 bg-gray-700 rounded-lg"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LoadingSkeleton