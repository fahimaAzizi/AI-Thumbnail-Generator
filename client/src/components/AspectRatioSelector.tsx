import { RectangleHorizontal, RectangleVertical, Square } from 'lucide-react'
import {aspectRatioSelector , type AspectRatio} from '../assets/assets'
import type React from 'react'
const AspectRatioSelector = ({}) => {



    const iconMap ={
   '16:9' :<RectangleHorizontal className='siz-6'/>,
   '1:1' : <Square className='siz-6'/>,
   '9:16' :<RectangleVertical className='siz-6'/>
    } as Recod<AspectRatio ,React.RractNode>
  return (
    <div className='space-y-3 dark'>
        
        <label className='block text-sn font-medium text-zinc-200'> Aspect Raio</label>
       <div className='flex flex-wrap gap-2'>

       </div>
    </div>
  )
}

export default AspectRatioSelector