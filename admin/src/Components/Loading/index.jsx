import React from 'react'
// import '../Loading/style.css'
const Loading = () => {
  return (
    <div className="bg-[#f1f1f1] w-full min-h-screen flex justify-center items-center">
  <div className="flex min-h-screen w-full items-center justify-center bg-[#f1f1f1]">
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 animate-spin">
      <div className="h-9 w-9 rounded-full bg-[#f1f1f1]"></div>
    </div>
  </div>
</div>
    
  )
}

export default Loading