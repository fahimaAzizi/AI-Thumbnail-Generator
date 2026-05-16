import { ChevronDown } from 'lucide-react'
import type React from 'react'
import type { ThumbnailStyle } from '../types'

type Props = {
  value: ThumbnailStyle
  onChange: (style: ThumbnailStyle) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const StyleSelector = ({
  value,
  onChange,
  isOpen,
  setIsOpen,
}: Props) => {

  const styles: ThumbnailStyle[] = [
    'Bold 3D Graphic',
    'Minimal Clean',
    'Gaming Neon',
    'Cinematic Dark',
    'Modern YouTube'
  ]

  return (
    <div className='relative space-y-3 dark'>

      <label className='block text-sm font-medium text-zinc-200'>
        Thumbnail Style
      </label>

      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className='w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-left'
      >

        <div className='space-y-1'>

          <div className='flex items-center justify-between'>
            <span className='text-sm text-zinc-100'>
              {value}
            </span>

            <ChevronDown
              className={`size-4 transition ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </div>

          <p className='text-xs text-zinc-400'>
            Select your thumbnail style
          </p>

        </div>

      </button>

      {isOpen && (
        <div className='absolute z-20 mt-2 w-full rounded-xl border border-white/10 bg-zinc-900 shadow-xl overflow-hidden'>

          {styles.map((style) => (
            <button
              key={style}
              type='button'
              onClick={() => {
                onChange(style)
                setIsOpen(false)
              }}
              className={`w-full px-4 py-3 text-left text-sm transition hover:bg-white/10 ${
                value === style
                  ? 'bg-white/10 text-white'
                  : 'text-zinc-300'
              }`}
            >
              {style}
            </button>
          ))}

        </div>
      )}

    </div>
  )
}

export default StyleSelector