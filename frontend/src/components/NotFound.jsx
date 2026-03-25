import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {

  const [count, setCount] = useState(7)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => currentCount - 1)
    }, 1000)

    if (count === 0) navigate('/')
    return () => clearInterval(interval)
  }, [count, navigate])

  // Simulate dial removal by hiding border sides one by one
  const ringMap = {
    5: 'border-t-indigo-600 border-r-indigo-600 border-b-indigo-600 border-l-indigo-600',
    4: 'border-t-indigo-600 border-r-indigo-600 border-b-indigo-600',
    3: 'border-t-indigo-600 border-r-indigo-600',
    2: 'border-t-indigo-600',
    1: '',
    0: '',
  }

  const currentRing = ringMap[count] || '';

  return (
    <div className='flex items-center justify-center h-screen '>
      <div
        className={`w-[300px] h-[300px] rounded-full border-8 ${currentRing} border-solid flex flex-col items-center justify-center text-center transition-all duration-1000 ease-in-out gap-3 text-white bg-black`}
      >
        {(count === 0 || count > 5) && (
          <div>
            <h3 className='text-4xl capitalize'>page</h3>
            <h2 className='text-2xl capitalize'>not</h2>
            <h3 className='text-3xl capitalize'>found</h3>
          </div>
        )}


        <p className='text-8xl opacity-80 my-4 font-bold text-red-600 absolute'>
          {(count >= 1 && count <= 5) && count}
        </p>


      </div>
    </div>
  )
}

export default NotFound