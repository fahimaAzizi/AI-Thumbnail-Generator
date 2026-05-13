import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import type { ITestimonial } from '../types'
import SoftBackdrop from '../components/SoftBackdrop'

const Generate = () => {
  const { id } = useParams()

  const [title, setTitle] = useState('')
  const [additionalDetails, setAdditionalDetails] = useState('')

  const [thumbnail, setThumbnail] = useState<ITestimonial | null>(null)
  const [loading, setLoading] = useState(false)

  return (
    <>
      <SoftBackdrop />

      <div className='pt-24 min-h-screen'>
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8">

          <div className="grid lg:grid-cols-[400px_1fr] gap-8">

            {/* LEFT PANEL */}
            <div className={`space-y-6 ${id && 'pointer-events-none'}`}>

              <div className="p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6">

                <div>
                  <h2 className="text-xl font-bold text-zinc-100 mb-1">
                    Create Your Thumbnail
                  </h2>

                  <p className="text-sm text-zinc-400">
                    Describe your vision and let AI bring it to life
                  </p>
                </div>

                {/* INPUTS */}
                <div className="space-y-5">

                  {/* Title */}
                  <div>
                    <label className="block text-sm text-zinc-300 mb-2">
                      Thumbnail Title
                    </label>

                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter thumbnail title"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-white/10 text-white outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Additional Details */}
                  <div>
                    <label className="block text-sm text-zinc-300 mb-2">
                      Additional Details
                    </label>

                    <textarea
                      rows={5}
                      value={additionalDetails}
                      onChange={(e) => setAdditionalDetails(e.target.value)}
                      placeholder="Describe style, colors, text, emotion, etc..."
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-white/10 text-white outline-none resize-none focus:border-purple-500"
                    />
                  </div>

                </div>

              </div>

              {/* BUTTON */}
              <button
                className="w-full py-4 rounded-2xl bg-purple-600 hover:bg-purple-700 transition-all text-white font-semibold shadow-lg"
              >
                {loading ? 'Generating...' : 'Generate Thumbnail'}
              </button>

            </div>

            {/* RIGHT PANEL */}
            <div className="rounded-2xl border border-white/10 bg-white/5 min-h-[500px] flex items-center justify-center">

              {thumbnail ? (
                <img
                  src={thumbnail.image}
                  alt="thumbnail"
                  className="rounded-xl"
                />
              ) : (
                <p className="text-zinc-400">
                  Your generated thumbnail will appear here
                </p>
              )}

            </div>

          </div>

        </main>
      </div>
    </>
  )
}

export default Generate