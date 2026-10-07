import { useEffect, useRef, useState } from 'react'
import type { VoiceProfile } from '../scenarios/types'
import { speak, stopSpeech } from '../lib/speech'
import { MicIcon, PhoneIcon, VideoIcon } from './Icons'

/** Khuôn mặt "Deepfake" vẽ bằng SVG: giật hình, miệng chỉ cử động khi nói */
function FakeFace({ speaking }: { speaking: boolean }) {
  return (
    <svg viewBox="0 0 200 240" className="glitch h-full w-full">
      <rect width="200" height="240" fill="#6b7a8f" />
      <path d="M20 240c0-50 35-70 80-70s80 20 80 70z" fill="#b45f8a" />
      <rect x="85" y="140" width="30" height="35" fill="#d9a57d" />
      <ellipse cx="100" cy="100" rx="48" ry="58" fill="#e8b890" />
      <path d="M50 95c-5-55 30-70 52-70s58 15 50 72c-8-30-30-42-50-42s-45 10-52 40z" fill="#3b2f2f" />
      <circle cx="100" cy="30" r="14" fill="#3b2f2f" />
      <path d="M72 85q9-6 18 0M110 85q9-6 18 0" stroke="#3b2f2f" strokeWidth="3" fill="none" />
      <ellipse cx="81" cy="98" rx="5" ry="3.5" fill="#222" />
      <ellipse cx="119" cy="98" rx="5" ry="3.5" fill="#222" />
      <path d="M100 100v18" stroke="#c9946b" strokeWidth="3" />
      <ellipse cx="100" cy="138" rx="14" ry="6" fill="#a8323c" className={speaking ? 'talk' : ''} style={{ transformOrigin: '100px 138px' }} />
    </svg>
  )
}

type Props = {
  name: string
  avatarUrl?: string
  lines: string[]
  profile: VoiceProfile
  onEnd: () => void
}

/** Màn hình cuộc gọi video đến: tự đọc lần lượt các câu thoại bằng giọng nói + phụ đề. */
export default function CallScreen({ name, avatarUrl, lines, profile, onEnd }: Props) {
  const [idx, setIdx] = useState(0)
  const [sec, setSec] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setSec((s) => s + 1), 1000)
    return () => {
      clearInterval(t)
      stopSpeech()
    }
  }, [])

  const endRef = useRef(onEnd)
  endRef.current = onEnd

  useEffect(() => {
    if (idx >= lines.length) {
      const t = setTimeout(() => endRef.current(), 900)
      return () => clearTimeout(t)
    }
    let finished = false
    const started = Date.now()
    const minMs = lines[idx].length * 45
    let timer: ReturnType<typeof setTimeout>
    let advance: ReturnType<typeof setTimeout> | undefined
    const next = () => {
      if (finished) return
      finished = true
      clearTimeout(timer)
      advance = setTimeout(() => setIdx((i) => i + 1), Math.max(500, minMs - (Date.now() - started)))
    }
    timer = setTimeout(next, lines[idx].length * 110 + 3000)
    speak(lines[idx], profile, next)
    return () => {
      finished = true
      clearTimeout(timer)
      clearTimeout(advance)
      stopSpeech()
    }
  }, [idx, lines, profile])

  const speaking = idx < lines.length
  const mm = String(Math.floor(sec / 60)).padStart(2, '0')
  const ss = String(sec % 60).padStart(2, '0')

  return (
    <div className="absolute inset-0 z-20 flex flex-col bg-slate-900 text-white">
      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden">
          {avatarUrl ? (
            <div className="relative w-full h-full">
              <img
                src={avatarUrl}
                alt={name}
                className={`glitch w-full h-full object-cover filter contrast-125 brightness-90 ${speaking ? 'scale-105' : 'scale-100'} transition-transform duration-300`}
              />
              <div className="absolute inset-0 bg-blue-900/20 mix-blend-color-dodge pointer-events-none" />
              <div className="absolute top-4 left-4 rounded bg-red-600/80 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase animate-pulse">
                Tín hiệu yếu (Lag)
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 blur-[1px]">
              <FakeFace speaking={speaking} />
            </div>
          )}
        </div>
        <div className="scan pointer-events-none absolute inset-0" />
        <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/60 to-transparent p-4 pt-8 text-center">
          <div className="text-lg font-semibold">{name}</div>
          <div className="text-xs opacity-80">Cuộc gọi video · {mm}:{ss}</div>
        </div>
        <div className="absolute bottom-3 left-3 right-3 min-h-[3.5rem] rounded-xl bg-black/65 px-3 py-2 text-center text-sm">
          {idx < lines.length ? lines[idx] : '…'}
        </div>
      </div>
      <div className="flex items-center justify-center gap-5 bg-slate-900 py-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15"><MicIcon size={20} /></span>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15"><VideoIcon size={20} /></span>
        <button onClick={onEnd} className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 active:scale-95">
          <PhoneIcon size={24} className="rotate-[135deg]" />
        </button>
      </div>
    </div>
  )
}
