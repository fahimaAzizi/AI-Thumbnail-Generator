import React, { useState } from 'react'
import SoftBackdrop from '../components/SoftBackdrop'
import { dummyThumbnails, type IThumbnail } from '../assets/assets'

function MyGeneration() {
 
  const [thumbnails , setThumbnails] = useState<IThumbnail>([])
  const [loading, setLoading] = useState(false)

  const fetchThumbnails = async () =>{
    setThumbnails(dummyThumbnails as unknown as IThumbnail[])
    setLoading(false)
  }

  const handel

  return (
    <>

    <SoftBackdrop/>
    <div className='mt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32'>

      {/* HEADER */}
      <div className='mb-8'>
        <h1 text-2xl font-bold text-zin-200> My Generations</h1>
        <p className='text-sm text-zinc-400 mt-1'> View and manage all your AI-generated thumbnails </p>
      </div>

    </div>

    </>
  )
}

export default MyGeneration