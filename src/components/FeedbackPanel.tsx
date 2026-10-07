import type { Choice, RedFlag } from '../scenarios/types'

type Props = {
  choice: Choice
  flags: RedFlag[]
  score: number
  checksUsed: string[]
  onNext: () => void
}

/** Phản hồi đỏ/xanh + giải thích Red Flag sau khi học sinh chọn */
export default function FeedbackPanel({ choice, flags, score, checksUsed, onNext }: Props) {
  const trap = choice.outcome === 'trap'
  return (
    <div
      className={`pop max-h-[55%] overflow-y-auto border-t-4 p-3 text-sm ${
        trap ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'
      }`}
    >
      <div className={`text-base font-bold ${trap ? 'text-red-700' : 'text-green-700'}`}>{choice.feedbackTitle}</div>
      <p className="mt-1 text-slate-800">{choice.feedbackBody}</p>
      <div className="mt-2 rounded bg-white/70 p-2 text-slate-800">
        🎯 Điểm tình huống: <b>{score}/100</b>
        <div className="text-xs text-slate-600">
          {checksUsed.length > 0
            ? `Bạn đã dùng ${checksUsed.length} công cụ kiểm tra.`
            : 'Bạn chưa dùng công cụ kiểm tra nào. Lần sau hãy thử gọi xác minh hoặc tra cứu trước khi quyết định.'}
        </div>
      </div>
      <div className="mt-2 font-semibold text-slate-900">🚩 Red Flag trong tình huống:</div>
      <ul className="mt-1 space-y-1">
        {flags.map((f, i) => (
          <li key={f.id} className="rounded bg-white/70 p-2">
            <b>
              {i + 1}. {f.label}
            </b>
            <div className="text-slate-700">{f.explanation}</div>
          </li>
        ))}
      </ul>
      <button onClick={onNext} className="mt-3 w-full rounded-lg bg-slate-800 py-2 font-semibold text-white active:scale-95">
        Về danh sách tình huống →
      </button>
    </div>
  )
}
