import React from 'react'
import type { AspectRatio } from '../assets/assets';
import { DownloadIcon, Loader2Icon } from 'lucide-react';
import { div } from 'motion/react-m';

const PreviewPanel = ({thumbnail, isLoading, aspectRatio} : 
  {thumbnail: IThumbnail, isLoading: boolean; aspectRatio: AspectRatio}) =>{
    
    
    
    const aspectClasses = {
  '16:9': 'aspect-video',
  '1:1': 'aspect-square',
  '9:16': 'aspect-[9/16]',
} as Record<AspectRatio, string>;


const onDownload =() =>{
  if (!thumbnail.image_url) return;
  window.open(thumbnail.image_url, '_blank')
}

  return (
   <div className="relative mx-auto w-full max-w-2xl">
    <div
      className={`relative overflow-hidden ${aspectClasses[aspectRatio]}`}
    >
      {/* Loading state */}
      {isLoading && (
        <div>
          <Loader2Icon className='size-8 animate-spin text-zinc-400'/>
       {/* Image preview */}
{!isLoading && thumbnail?.image_url && (
  <div className="group relative h-full w-full">
    <img
      src={thumbnail?.image_url}
      alt={thumbnail.title}
      className="h-full w-full object-cover"
    />

    <div className='absolute instt-0 flex items-end justify-center bg-black/10 opacity-0 tarnsition-opacity group-hover:opacity-100'>
      <button onClick={onDownload} type="button" className='md-6 flex items-center gap-2 rounded-md px-5 py-2.5 text-xs font-medium transition bg-white/30 ring-2 ring-white/40 backdrop-blur hover:scale-105 avtive:scale-95'>
        <DownloadIcon className="size-4" />
        Download Thumbnail
      </button>
    </div>
  </div>
)}
       </div>
      )}

      {!isLoading && !thumbnail?.image_url && (
        <div></div>
      )}
    </div>
  </div>
  )
}

export default PreviewPanel