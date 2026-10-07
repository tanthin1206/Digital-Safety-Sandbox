import { useEffect, useState } from 'react'
import type { VoiceProfile } from '../scenarios/types'
import { PauseIcon, PlayIcon } from './Icons'
import { speak, stopSpeech } from '../lib/speech'

type Props = {
  seconds: number
  profile: VoiceProfile
  transcript: string
  /** true nếu bong bóng có nền màu đậm (tin của mình) */
  onDark?: boolean
}

/** Tin nhắn thoại: bấm để nghe (giọng đọc tiếng Việt của trình duyệt), có thể xem lời thoại. */
export default function VoiceBubble({ seconds, profile, transcript, onDark }: Props) {
  const [playing, setPlaying] = useState(false)
  const [showText, setShowText] = useState(false)

  useEffect(() => () => stopSpeech(), [])

  function toggle() {
    if (playing) {
      stopSpeech()
      setPlaying(false)
      return
    }
    stopSpeech()
    setPlaying(true)
    speak(transcript, profile, () => setPlaying(false))
  }

  const bars = Array.from({ length: 22 }, (_, i) => 6 + ((i * 37 + seconds * 13) % 15))
  const accent = onDark ? 'text-white' : 'text-slate-700'

  return (
    <div className="w-[200px]">
      <div className="flex items-center gap-2">
        <button
          onClick={toggle}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${onDark ? 'bg-white/25' : 'bg-slate-500/20'} ${accent}`}
          aria-label={playing ? 'Dừng' : 'Nghe'}
        >
          {playing ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
        </button>
        <div className="flex h-6 flex-1 items-center gap-[2px]">
          {bars.map((h, i) => (
            <span
              key={i}
              className={`w-[3px] rounded-full ${playing ? 'dot' : ''} ${onDark ? 'bg-white/80' : 'bg-slate-500/70'}`}
              style={{ height: h, animationDelay: `${(i % 6) * 0.1}s` }}
            />
          ))}
        </div>
        <span className={`text-[11px] ${accent}`}>0:{String(seconds).padStart(2, '0')}</span>
      </div>
      <button onClick={() => setShowText((s) => !s)} className={`mt-1 text-[11px] underline ${accent} opacity-80`}>
        {showText ? 'Ẩn nội dung' : 'Xem nội dung'}
      </button>
      {showText && <div className={`mt-1 text-[12px] italic ${accent}`}>"{transcript}"</div>}
    </div>
  )
}
