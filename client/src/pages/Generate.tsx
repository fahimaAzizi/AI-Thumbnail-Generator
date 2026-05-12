import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import type { ITestimonial } from '../types';
import SoftBackdrop from '../components/SoftBackdrop';

const Generate = () => {
  const {id} = useParams();
  const [title, setTitle] = useState('')
  const [additionalDetails, setAdditionalDetails] = useState('')
    
   
   const [thumbnail, setThumbnail] = useState<ITestimonial | null>(null)
    const [loding, setLoging] = useState(false)

  return (
    <div>
 <SoftBackdrop/>
    </div>
  )
}

export default Generate