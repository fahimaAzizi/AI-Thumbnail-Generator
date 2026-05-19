import React from 'react'
import type { AspectRatio } from '../assets/assets';

const PreviewPanel = ({thumbnail, isLoading, aspectRatio} : 
  {thumbnail: IThumbnail , isLoading: boolean; aspectRatio: AspectRatio}) =>{
    
    
    
    const aspectClasses = {
  '16:9': 'aspect-video',
  '1:1': 'aspect-square',
  '9:16': 'aspect-[9/16]',
} as Record<AspectRatio, string>;

  return (
    <div>PreviewPanel</div>
  )
}

export default PreviewPanel