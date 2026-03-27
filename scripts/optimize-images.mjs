import sharp from 'sharp'
import { readdir, rename, unlink, stat } from 'fs/promises'
import { join, extname, basename } from 'path'

const IMG_DIR = new URL('../public/img', import.meta.url).pathname
const MAX_WIDTH = 1920
const WEBP_QUALITY = 82
const JPG_QUALITY = 82

async function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

async function optimizeImage(file) {
  const ext = extname(file).toLowerCase()
  const src = join(IMG_DIR, file)
  const srcStat = await stat(src)
  const srcSize = srcStat.size

  // Skip already-small files
  if (srcSize < 50 * 1024) return null

  try {
    const image = sharp(src)
    const meta = await image.metadata()
    const needsResize = (meta.width || 0) > MAX_WIDTH

    let pipeline = sharp(src)
    if (needsResize) pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true })

    let outFile, outExt
    if (ext === '.png') {
      // PNGs → WebP (huge savings, especially for gazebo-small PNGs)
      outExt = '.webp'
      outFile = join(IMG_DIR, basename(file, ext) + outExt)
      await pipeline.webp({ quality: WEBP_QUALITY }).toFile(outFile + '.tmp')
    } else if (ext === '.jpg' || ext === '.jpeg') {
      outExt = ext
      outFile = src
      await pipeline.jpeg({ quality: JPG_QUALITY, mozjpeg: true }).toFile(src + '.tmp')
    } else if (ext === '.webp') {
      outExt = ext
      outFile = src
      await pipeline.webp({ quality: WEBP_QUALITY }).toFile(src + '.tmp')
    } else {
      return null
    }

    const tmpStat = await stat(outFile + '.tmp')
    const dstSize = tmpStat.size

    // Only replace if actually smaller
    if (dstSize < srcSize) {
      if (outFile !== src) {
        // PNG→WebP: write new file, delete old
        await rename(outFile + '.tmp', outFile)
        await unlink(src)
      } else {
        await rename(outFile + '.tmp', outFile)
      }
      return { file, outFile: basename(outFile), srcSize, dstSize, saved: srcSize - dstSize }
    } else {
      await unlink(outFile + '.tmp')
      return { file, outFile: basename(outFile), srcSize, dstSize: srcSize, saved: 0, skipped: true }
    }
  } catch (e) {
    console.error(`  ✗ ${file}: ${e.message}`)
    return null
  }
}

const files = await readdir(IMG_DIR)
const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))

console.log(`\nОптимизация ${imageFiles.length} изображений...\n`)

let totalSaved = 0
let totalSrcSize = 0
const results = []

for (const file of imageFiles) {
  const r = await optimizeImage(file)
  if (!r) continue
  results.push(r)
  totalSrcSize += r.srcSize
  totalSaved += r.saved
  const tag = r.skipped ? '─' : '✓'
  const arrow = r.file !== r.outFile ? ` → ${r.outFile}` : ''
  const saving = r.saved > 0 ? ` (−${await formatBytes(r.saved)}, ${Math.round(r.saved/r.srcSize*100)}%)` : ' (уже оптимальный)'
  console.log(`  ${tag} ${r.file}${arrow}${saving}`)
}

console.log(`\n${'─'.repeat(60)}`)
console.log(`Итого сохранено: ${await formatBytes(totalSaved)} из ${await formatBytes(totalSrcSize)}`)
console.log(`Изображений обработано: ${results.filter(r => !r.skipped).length} / ${results.length}`)
console.log()
