import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { ITestimonial, AspectRatio, ThumbnailStyle } from '../types'
import SoftBackdrop from '../components/SoftBackdrop'
import AspectRatioSelector from '../components/AspectRatioSelector'
import { colorSchemes } from '../assets/assets'
import StyleSelector from '../components/StyleSelector'
import ColorSchemeSelector from '../components/ColorSchemeSelector'
import PreviewPanel from '../components/PreviewPanel'

const Generate = () => {
  const { id } = useParams()

  const [title, setTitle] = useState('')
  const [additionalDetails, setAdditionalDetails] = useState('')

  const [thumbnail, setThumbnail] = useState<ITestimonial | null>(null)
  const [loading, setLoading] = useState(false)

  const [aspectRatio, setAspectRatio] =
    useState<AspectRatio>('16:9')

  const [colorSchemeId, setColorSchemeId] =
    useState<string>(colorSchemes[0].id)

  const [style, setStyle] =
    useState<ThumbnailStyle>('Bold 3D Graphic')

  const [styleDropdownOpen, setStyleDropdownOpen] =
    useState(false)


    const handleGenerate = async () =>{

    }
    const fetchThumbnail = async () => {
      if(id){
        const thumbnail : any = dummyThumbnail.find((thumbnail)=> thumbnail._id === id);
        setThumbnail(thumbnail)
        setAdditionalDetails(thumbnail.user_propt)
        setTitle(thumbnail.title)
      }

    }
    useEffect(()=>{
      if(id){
        fetchThumbnail()
      }
    },[id])

  return (
    <>
      <SoftBackdrop />

      <div className='pt-24 min-h-screen'>
        <main className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8'>

          <div className='grid lg:grid-cols-[400px_1fr] gap-8'>

            {/* LEFT PANEL */}
            <div className={`space-y-6 ${id ? 'pointer-events-none' : ''}`}>

              <div className='p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6'>

                <div>
                  <h2 className='text-xl font-bold text-zinc-100 mb-1'>
                    Create Your Thumbnail
                  </h2>

                  <p className='text-sm text-zinc-400'>
                    Describe your vision and let AI bring it to life
                  </p>
                </div>

                <div className='space-y-5'>

                  {/* TITLE INPUT */}
                  <div className='space-y-2'>

                    <label className='block text-sm font-medium'>
                      Title or Topic
                    </label>

                    <input
                      type='text'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      maxLength={100}
                      placeholder='e.g., 10 Tips for Better Sleep'
                      className='w-full px-4 py-3 rounded-lg border border-white/12 bg-black/20 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500'
                    />

                    <div className='flex justify-end'>
                      <span className='text-xs text-zinc-400'>
                        {title.length}/100
                      </span>
                    </div>

                  </div>

                  {/* ASPECT RATIO SELECTOR */}
                  <AspectRatioSelector
                    value={aspectRatio}
                    onChange={setAspectRatio}
                  />
                  <StyleSelector value={style} onChange={setStyle} isOpen={styleDropdownOpen} setIsOpen={setStyleDropdownOpen} />
                    <ColorSchemeSelector value={colorSchemeId} onChange={setColorSchemeId} />
                  {/* ADDITIONAL DETAILS */}
                  <div className='space-y-2'>

                    <label className='block text-sm font-medium'>
                      Additional Prompts
                      <span className='text-zinc-400 text-xs ml-1'>
                        (Optional)
                      </span>
                    </label>

                    <textarea
                      value={additionalDetails}
                      onChange={(e) =>
                        setAdditionalDetails(e.target.value)
                      }
                      rows={4}
                      placeholder='Add more details about your thumbnail...'
                      className='w-full px-4 py-3 rounded-lg border border-white/12 bg-black/20 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none'
                    />

                  </div>

                </div>

                {!id && (
                  <button
                    className='w-full py-3 rounded-lg bg-pink-500 hover:bg-pink-600 transition text-white font-medium'
                  >
                    {loading ? 'Generating...' : 'Generate Thumbnail'}
                  </button>
                )}

              </div>

            </div>
             <div>
            <div className='p-6 rounded-2xl bg-white/8 border border-white/10 shadow-xl'>
            <h2 className='text-lg font-semibold text-zinc-100'> Perview</h2>
              <PreviewPanel thumbnail={thumbnail} isLoading={loading} aspectRatio={aspectRatio}/>
             

              </div>
            </div>

          </div>

        </main>
      </div>
    </>
  )
}

export default Generate