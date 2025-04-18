import  { memo } from 'react';

const NotFound = () => {
    return (
      <div className="bg-gray-900 flex items-center justify-center min-h-screen text-white">
        <div className="text-center">
          {/* Large 404 Text */}
          <h1 className="text-9xl font-bold mb-8">404</h1>
  
          {/* Not Found Message */}
          <div className="text-white text-2xl font-semibold mb-8">
            Page Not Found
          </div>
  
          {/* Button to go back */}
          <a href="/" className="text-blue-500 hover:text-blue-400 text-lg font-medium">
            Go Back to Home
          </a>
        </div>
      </div>
    )
} 


export default memo(NotFound);
