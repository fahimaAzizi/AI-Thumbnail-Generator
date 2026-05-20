import React from 'react'
import type { AspectRatio } from '../assets/assets';
import { DownloadIcon, Loader2Icon } from 'lucide-react';

const PreviewPanel = ({thumbnail, isLoading, aspectRatio} : 
  {thumbnail: IThumbnail, isLoading: boolean; aspectRatio: AspectRatio}) =>{
    
    
    
    const aspectClasses = {
  '16:9': 'aspect-video',
  '1:1': 'aspect-square',
  '9:16': 'aspect-[9/16]',
} as Record<AspectRatio, string>;

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

    <div>
      <button type="button">
        <DownloadIcon className="size-4" />
        Download Thumbnail
      </button>
    </div>
  </div>
)}
       </div>
      )}
    </div>
  </div>
  )
}

export default PreviewPanel