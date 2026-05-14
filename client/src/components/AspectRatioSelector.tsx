import { RectangleHorizontal } from 'lucide-react'
import React from 'react'

const AspectRatioSelector = () => {
    const iconMap ={
   '16:9' :<RectangleHorizontal className='siz-6'/>
    }
  return (
    <div className='space-y-3 dark'>
        
        <label className='block text-sn font-medium text-zinc-200'> Aspect Raio</label>
       <div className='flex flex-wrap gap-2'>

       </div>
    </div>
  )
}

export default AspectRatioSelector