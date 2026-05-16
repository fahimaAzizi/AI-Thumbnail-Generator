import type React from 'react'

const StyleSelector = ({
  value,
  onChange,
  isOpen,
  setIsOpen
}: {
  value: ThumbnailStyle
  onChange: (style: ThumbnailStyle) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}) => {

  return (
    <div className="relative space-y-3 dark">

      <label className='block text-sm font-medium text-zinc-200'>
        Thumbnail Style
      </label>

      <button>
        <div className="space-y-1">

        </div>
      </button>

    </div>
  )
}

export default StyleSelector