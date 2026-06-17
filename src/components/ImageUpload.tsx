import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { Card, SectionTitle } from './UI'

interface ImageUploadProps {
  onSubmit: (file: File) => Promise<void>
}

export function ImageUpload({ onSubmit }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0]
    if (!selected) return
    setFile(selected)
    setStatus('idle')
    const url = URL.createObjectURL(selected)
    setPreview(url)
  }

  async function handleSubmit() {
    if (!file) return
    setIsSubmitting(true)
    setStatus('idle')
    try {
      await onSubmit(file)
      setStatus('success')
    } catch (error) {
      console.error(error)
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="space-y-4">
      <SectionTitle
        title="Upload Spiral Drawing Photo"
        description="Upload a photo of your spiral drawing for additional analysis. This complements the interactive spiral test for comprehensive Parkinson's screening."
      />

      <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-sky-300 bg-sky-50/40 px-4 py-8 text-center text-xs text-slate-500 hover:bg-sky-50">
        <span className="mb-2 rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-sky-700 shadow-sm">
          Choose PNG / JPG
        </span>
        <p className="max-w-xs">
          Upload a photo of your spiral drawing for additional analysis. Take a clear photo of your drawing on paper.
        </p>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {preview ? (
        <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div>
            <p className="mb-2 text-xs font-medium text-slate-700">Spiral drawing preview</p>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-900">
              <img
                src={preview}
                alt="Uploaded spiral drawing preview"
                className="h-64 w-full object-cover md:h-72"
              />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-3 rounded-xl bg-slate-50 p-4 text-xs text-slate-600">
            <div>
              <p className="mb-1 font-semibold text-slate-800">Upload details</p>
              <ul className="list-disc pl-4">
                <li>{file?.name}</li>
                <li>{file ? `${Math.round(file.size / 1024)} KB` : null}</li>
                <li>Encrypted in transit • PHI-safe by design</li>
              </ul>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!file || isSubmitting}
                className="inline-flex items-center justify-center rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-sky-300"
              >
                {isSubmitting ? 'Uploading drawing…' : 'Submit for analysis'}
              </button>
              {status === 'success' ? (
                <p className="text-xs text-emerald-600">Drawing uploaded. Analysis will appear soon.</p>
              ) : null}
              {status === 'error' ? (
                <p className="text-xs text-rose-600">
                  Something went wrong. Please retry or contact support.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </Card>
  )
}


