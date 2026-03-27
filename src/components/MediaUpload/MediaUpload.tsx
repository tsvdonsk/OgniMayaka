import { useRef, useState } from 'react'
import { useTheme } from '../../context/ThemeContext'

export type UploadResult = {
  url: string          // blob URL or data URL
  type: 'image' | 'video'
  originalSize: number
  compressedSize: number
  filename: string
  blob: Blob
}

interface Props {
  onUpload: (result: UploadResult) => void
  accept?: string
  label?: string
}

// Compress image with Canvas → WebP
async function compressImage(file: File, maxWidth = 1920, quality = 0.82): Promise<{ blob: Blob; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      let { width, height } = img
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width)
        width = maxWidth
      }
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, width, height)
      canvas.toBlob(
        blob => blob ? resolve({ blob, width, height }) : reject(new Error('Compression failed')),
        'image/webp',
        quality,
      )
    }
    img.onerror = reject
    img.src = url
  })
}

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

export default function MediaUpload({ onUpload, accept = 'image/*,video/*', label = 'Загрузить файл' }: Props) {
  const { C } = useTheme()
  const inputRef = useRef<HTMLInputElement>(null)
  const [state, setState] = useState<'idle' | 'processing' | 'done' | 'error'>('idle')
  const [result, setResult] = useState<UploadResult | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [progress, setProgress] = useState('')

  const handleFile = async (file: File) => {
    if (!file) return
    setState('processing')
    setResult(null)
    setErrorMsg('')

    try {
      const isImage = file.type.startsWith('image/')
      const isVideo = file.type.startsWith('video/')

      if (isImage) {
        setProgress('Сжимаем изображение…')
        const { blob } = await compressImage(file)
        const blobUrl = URL.createObjectURL(blob)
        const res: UploadResult = {
          url: blobUrl,
          type: 'image',
          originalSize: file.size,
          compressedSize: blob.size,
          filename: file.name.replace(/\.[^.]+$/, '.webp'),
          blob,
        }
        setResult(res)
        setState('done')
        onUpload(res)
      } else if (isVideo) {
        setProgress('Подготавливаем видео…')
        const blobUrl = URL.createObjectURL(file)
        const res: UploadResult = {
          url: blobUrl,
          type: 'video',
          originalSize: file.size,
          compressedSize: file.size,
          filename: file.name,
          blob: file,
        }
        setResult(res)
        setState('done')
        onUpload(res)
      } else {
        setErrorMsg('Неподдерживаемый формат файла')
        setState('error')
      }
    } catch (e) {
      setErrorMsg('Ошибка обработки файла')
      setState('error')
    }
  }

  const downloadOptimized = () => {
    if (!result) return
    const a = document.createElement('a')
    a.href = URL.createObjectURL(result.blob)
    a.download = result.filename
    a.click()
  }

  const reset = () => { setState('idle'); setResult(null) }

  const saved = result ? result.originalSize - result.compressedSize : 0
  const savedPct = result && result.originalSize > 0 ? Math.round(saved / result.originalSize * 100) : 0

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = '' }}
      />

      {state === 'idle' && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '9px 16px',
            background: C.accentBg2,
            border: `1px solid ${C.borderAccent}`,
            borderRadius: 4, color: C.accent,
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}
        >
          ↑ {label}
        </button>
      )}

      {state === 'processing' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 16px', background: C.isDark ? 'rgba(42,36,32,0.3)' : 'rgba(100,80,60,0.06)', border: `1px solid ${C.border}`, borderRadius: 4 }}>
          <span style={{ color: C.ghost, fontSize: 13 }}>⏳ {progress}</span>
        </div>
      )}

      {state === 'error' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: '#c84040', fontSize: 13 }}>✗ {errorMsg}</span>
          <button type="button" onClick={reset} style={{ background: 'none', border: 'none', color: C.ghost, fontSize: 12, cursor: 'pointer' }}>Повторить</button>
        </div>
      )}

      {state === 'done' && result && (
        <div style={{ background: C.isDark ? 'rgba(42,36,32,0.2)' : 'rgba(100,80,60,0.04)', border: `1px solid ${C.border}`, borderRadius: 6, overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 0 }}>
            {/* Preview */}
            <div style={{ width: 120, flexShrink: 0 }}>
              {result.type === 'image'
                ? <img src={result.url} alt="" style={{ width: 120, height: 80, objectFit: 'cover', display: 'block' }} />
                : <video src={result.url} style={{ width: 120, height: 80, objectFit: 'cover', display: 'block' }} muted />
              }
            </div>
            {/* Info */}
            <div style={{ flex: 1, padding: '10px 14px', minWidth: 0 }}>
              <p style={{ color: C.text2, fontSize: 12, fontWeight: 600, marginBottom: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{result.filename}</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
                <span style={{ color: C.ghost, fontSize: 11 }}>До: {formatSize(result.originalSize)}</span>
                <span style={{ color: C.accent, fontSize: 11, fontWeight: 600 }}>После: {formatSize(result.compressedSize)}</span>
                {saved > 0 && (
                  <span style={{ color: '#4caf7d', fontSize: 11, fontWeight: 700 }}>−{savedPct}% ({formatSize(saved)})</span>
                )}
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button type="button" onClick={downloadOptimized}
                  style={{ padding: '4px 12px', background: C.accentBg2, border: `1px solid ${C.borderAccent}`, borderRadius: 3, color: C.accent, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                  ↓ Скачать WebP
                </button>
                <button type="button" onClick={() => { reset(); inputRef.current?.click() }}
                  style={{ padding: '4px 10px', background: 'none', border: `1px solid ${C.border}`, borderRadius: 3, color: C.muted, fontSize: 11, cursor: 'pointer' }}>
                  Другой файл
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
