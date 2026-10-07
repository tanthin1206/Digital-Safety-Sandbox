import { useEffect, useState } from 'react'
import type { Check, CheckTool } from '../scenarios/types'
import MockImage from './MockImage'
import { PhoneIcon } from './Icons'
import { speak, stopSpeech } from '../lib/speech'

export const TOOL_ICON: Record<CheckTool, string> = {
  call: '📞',
  bank: '🔎',
  link: '🌐',
  company: '🏢',
  profile: '👤',
  zoom: '🖼️',
  app: '📲',
}

const VERDICT = {
  warn: { cls: 'border-red-400 bg-red-50 text-red-800', label: '⚠️ Phát hiện dấu hiệu đáng ngờ' },
  ok: { cls: 'border-green-400 bg-green-50 text-green-800', label: '✅ Đã xác minh được thông tin' },
  neutral: { cls: 'border-slate-300 bg-slate-50 text-slate-700', label: 'ℹ️ Thông tin tham khảo' },
}

/** Cửa sổ kết quả của công cụ kiểm tra. Với "gọi điện" sẽ đọc to lời thoại. */
export default function CheckModal({ check, onClose }: { check: Check; onClose: () => void }) {
  const [talking, setTalking] = useState(false)
  const v = check.risky ? { cls: 'border-amber-400 bg-amber-50 text-amber-800', label: '⚠️ Cách xác minh chưa đúng' } : VERDICT[check.verdict]

  function listen() {
    if (!check.speech) return
    stopSpeech()
    setTalking(true)
    speak(check.speech.text, check.speech.profile, () => setTalking(false))
  }

  useEffect(() => {
    if (check.speech) listen()
    return () => stopSpeech()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check.id])

  return (
    <div className="absolute inset-0 z-30 flex items-end justify-center bg-black/50 sm:items-center">
      <div className="pop m-2 max-h-[90%] w-full max-w-sm overflow-y-auto rounded-2xl bg-white p-4 text-sm shadow-2xl">
        <div className="flex items-start justify-between gap-2">
          <div className="text-base font-bold text-slate-900">
            {TOOL_ICON[check.tool]} {check.title}
          </div>
          <button onClick={onClose} className="rounded-full bg-slate-100 px-2 text-slate-600" aria-label="Đóng">
            ✕
          </button>
        </div>

        {check.tool === 'call' && check.speech && (
          <div className="mt-3 rounded-xl bg-slate-900 p-3 text-center text-white">
            <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${talking ? 'bg-green-500' : 'bg-slate-600'}`}>
              <PhoneIcon size={22} />
            </div>
            <div className="mt-2 text-xs opacity-70">{talking ? 'Đang trả lời…' : 'Cuộc gọi đã kết thúc'}</div>
            <div className="mt-1 italic">"{check.speech.text}"</div>
            <button onClick={listen} className="mt-2 rounded-full bg-white/20 px-3 py-1 text-xs">🔊 Nghe lại</button>
          </div>
        )}

        {check.tool === 'zoom' && check.image && (
          <div className="mt-3 flex justify-center overflow-hidden rounded-lg border bg-slate-50 pb-10 pt-2">
            <MockImage type={check.image.type} params={check.image.params} large />
          </div>
        )}

        {check.rows && (
          <div className="mt-3 divide-y rounded-lg border">
            {check.rows.map((r) => (
              <div key={r.k + r.v} className="flex gap-2 px-3 py-1.5">
                <span className="w-28 shrink-0 text-slate-500">{check.tool === 'zoom' ? `Dấu hiệu ${r.k}` : r.k}</span>
                <span className="font-medium text-slate-900">{r.v}</span>
              </div>
            ))}
          </div>
        )}

        <div className={`mt-3 rounded-lg border-l-4 p-3 ${v.cls}`}>
          <div className="font-semibold">{v.label}</div>
          <div className="mt-0.5">{check.body}</div>
        </div>
        <button onClick={onClose} className="mt-3 w-full rounded-lg bg-slate-800 py-2 font-semibold text-white active:scale-95">
          Quay lại cuộc trò chuyện
        </button>
      </div>
    </div>
  )
}
