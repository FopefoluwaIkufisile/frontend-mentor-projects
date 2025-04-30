import React from 'react'
import ImageInteractive from "../assets/desktop/image-interactive.jpg"

const Leader = () => {
  return (
    <div className=''>
        <div className=' relative max-w-6xl mx-auto mt-20 sm:mt-30 sm:mb-0  sm:h-[600px] p-6 sm:p-0'>
            <div className=" relative sm:absolute sm:top-0 sm:left-0 w-ful sm:w-3/5 sm:h-3/4 sm:-z-10">
                <img src={ImageInteractive} alt="" className='w-full h-full  object-cover' />
            </div>
            <div className="relative sm:absolute sm:bottom-0 sm:right-0 w-full sm:w-3/4 leader:w-2/4 sm:h-3/4 bg-white">
                <div className="w-full h-full text-inner p-15 font-josefin flex flex-col gap-6">
                    <p className='font-josefin font-light text-3xl sm:text-5xl text-center sm:text-left tracking-tight'>THE LEADER IN INTERACTIVE VR</p>
                    <p className='text-gray-500 text-center sm:text-left'>Founded in 2011, Loopstudios has been producing world-class virtual reality projects for some of the best companies around the globe. Our award-winning creations have transformed businesses through digital experiences that bind to their brand.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Leader