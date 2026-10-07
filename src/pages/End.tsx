import { useState } from 'react'
import { logEvent } from '../lib/logger'
import { scenarios } from '../scenarios'
import type { ScenarioResult } from '../lib/score'

const card = 'mx-auto mt-8 max-w-md rounded-2xl bg-white p-6 shadow-lg'

export function Result({
  results,
  onBack,
  onNext,
}: {
  results: Record<string, ScenarioResult>
  onBack: () => void
  onNext: () => void
}) {
  const done = Object.keys(results).length
  const list = Object.values(results)
  const safe = list.filter((r) => r.outcome === 'safe').length
  const avg = done ? Math.round(list.reduce((s, r) => s + r.score, 0) / done) : 0
  const totalChecks = list.reduce((s, r) => s + r.checks, 0)
  const badge =
    avg >= 85 ? '🏅 Chuyên gia an toàn mạng' : avg >= 60 ? '🥈 Cảnh giác tốt' : avg >= 30 ? '🥉 Cần luyện thêm' : '📘 Hãy học lại các Red Flag'
  const missed = scenarios.filter((s) => results[s.id]?.outcome === 'trap')
  return (
    <div className={card}>
      <h2 className="text-xl font-bold text-slate-900">Kết quả của bạn</h2>
      <div className="mt-2 text-4xl font-extrabold text-blue-600">{avg}/100</div>
      <div className="text-xs text-slate-500">
        điểm trung bình · {safe}/{done} tình huống an toàn · đã dùng {totalChecks} công cụ kiểm tra (đã làm {done}/{scenarios.length})
      </div>
      <div className="mt-1 font-semibold text-slate-800">{badge}</div>
      {totalChecks >= 3 && <div className="mt-1 text-sm font-semibold text-emerald-700">🕵️ Thám tử mạng: bạn chủ động kiểm tra thông tin!</div>}
      <div className="mt-3 space-y-1 text-sm">
        {scenarios
          .filter((s) => results[s.id])
          .map((s) => (
            <div key={s.id} className="flex justify-between rounded bg-slate-50 px-3 py-1.5">
              <span>{s.title}</span>
              <b>{results[s.id].score}đ</b>
            </div>
          ))}
      </div>
      {missed.length > 0 && (
        <div className="mt-4">
          <div className="font-semibold text-red-700">Các tình huống bạn đã sập bẫy:</div>
          {missed.map((s) => (
            <div key={s.id} className="mt-2 rounded-lg bg-red-50 p-3 text-sm">
              <b>{s.title}</b>
              <ul className="mt-1 list-disc pl-5 text-slate-700">
                {s.redFlags.map((f) => (
                  <li key={f.id}>{f.label}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-slate-800">
        <b>Quy tắc vàng:</b> Dừng lại → Xác minh bằng kênh khác → Hỏi người lớn → Chỉ chuyển tiền khi đã chắc chắn.
      </div>
      <button onClick={onBack} className="mt-4 w-full rounded-lg border border-slate-300 py-3 font-semibold text-slate-800 active:scale-95">
        ← Làm thêm tình huống
      </button>
      <button onClick={onNext} className="mt-2 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white active:scale-95">
        Làm khảo sát ngắn →
      </button>
    </div>
  )
}

export function Survey({ studentId, grade }: { studentId: string; grade: string }) {
  const [conf, setConf] = useState(0)
  const [text, setText] = useState('')
  const [done, setDone] = useState(false)

  function submit() {
    logEvent({ type: 'survey', studentId, grade, confidence: conf, feedback: text.slice(0, 500) })
    setDone(true)
  }

  if (done)
    return (
      <div className={card + ' text-center'}>
        <div className="text-5xl">🎉</div>
        <h2 className="mt-2 text-xl font-bold">Cảm ơn bạn đã tham gia!</h2>
        <p className="mt-2 text-slate-600">Hãy chia sẻ những gì bạn học được với bạn bè và gia đình nhé.</p>
      </div>
    )

  return (
    <div className={card}>
      <h2 className="text-xl font-bold text-slate-900">Khảo sát nhanh</h2>
      <div className="mt-3 text-sm font-medium text-slate-700">Bạn tự tin nhận biết lừa đảo mạng đến mức nào? (1 = chưa, 5 = rất)</div>
      <div className="mt-2 flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => setConf(n)}
            className={`h-11 flex-1 rounded-lg border font-bold ${conf === n ? 'border-blue-600 bg-blue-600 text-white' : 'bg-white'}`}
          >
            {n}
          </button>
        ))}
      </div>
      <label className="mt-4 block text-sm font-medium text-slate-700">
        Cảm nhận của bạn (không ghi thông tin cá nhân)
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          maxLength={500}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
        />
      </label>
      <button
        disabled={conf === 0}
        onClick={submit}
        className="mt-4 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white disabled:opacity-40 active:scale-95"
      >
        Gửi
      </button>
    </div>
  )
}
