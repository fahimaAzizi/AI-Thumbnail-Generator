import { RectangleHorizontal, RectangleVertical, Square } from 'lucide-react'
import {AspectRatio, aspectRatioSelector} from '../assets/assets'
import type React from 'react'
const AspectRatioSelector = ({value, onChange} :{value: AspectRatio ; onchange: ( ratio : AspectRatio)=> void}) => {



    const iconMap ={
   '16:9' :<RectangleHorizontal className='siz-6'/>,
   '1:1' : <Square className='siz-6'/>,
   '9:16' :<RectangleVertical className='siz-6'/>
    } as Record<AspectRatio , React.ReactNode>
  return (
    <div className='space-y-3 dark'>
        
        <label className='block text-sn font-medium text-zinc-200'> Aspect Raio</label>
       <div className='flex flex-wrap gap-2'>
        {AspectRatio.map}

       </div>
    </div>
  )
}

export default AspectRatioSelector