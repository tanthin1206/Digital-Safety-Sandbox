import { scenarios } from '../scenarios'
import type { Platform } from '../scenarios/types'
import type { ScenarioResult } from '../lib/score'

const BADGE: Record<Platform, { label: string; cls: string; btnCls: string; icon: string }> = {
  messenger: { label: 'Messenger', cls: 'bg-[#0084ff]', btnCls: 'bg-[#0084ff] hover:bg-[#0073e6]', icon: '💬' },
  zalo: { label: 'Zalo', cls: 'bg-[#0068ff]', btnCls: 'bg-[#0068ff] hover:bg-[#0057d6]', icon: '💙' },
  tiktok: { label: 'TikTok', cls: 'bg-black', btnCls: 'bg-black hover:bg-neutral-800', icon: '🎵' },
}

type Props = {
  results: Record<string, ScenarioResult>
  onPick: (id: string) => void
  onFinish: () => void
}

export default function Menu({ results, onPick, onFinish }: Props) {
  const done = Object.keys(results).length
  const total = scenarios.length
  const pct = Math.round((done / total) * 100)

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header section */}
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            🛡️ Sandbox An Toàn Số · Mô Phỏng Thực Chiến
          </div>
          <h1 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Chọn tình huống lừa đảo
          </h1>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl">
            Mỗi tình huống mô phỏng 100% kịch bản thực tế tại Việt Nam. Sử dụng công cụ điều tra (gọi check, tra cứu STK, quét link) trước khi đưa ra quyết định!
          </p>
        </div>

        {/* Progress & action */}
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center md:flex-col md:items-end">
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs font-semibold text-slate-500">Tiến độ hoàn thành</div>
              <div className="text-base font-bold text-slate-900">{done} / {total} tình huống ({pct}%)</div>
            </div>
            <div className="h-10 w-10 rounded-full border-4 border-slate-200 flex items-center justify-center font-bold text-xs text-blue-600 bg-blue-50">
              {pct}%
            </div>
          </div>
          <button
            disabled={done === 0}
            onClick={onFinish}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 active:scale-95"
          >
            📊 Xem kết quả tổng kết ({done}/{total})
          </button>
        </div>
      </div>

      {/* Grid of Scenarios - dàn hàng ngang đa cột */}
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {scenarios.map((s, idx) => {
          const b = BADGE[s.platform]
          const r = results[s.id]
          return (
            <div
              key={s.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-slate-300"
            >
              <div>
                {/* Platform Header Bar */}
                <div className={`${b.cls} flex items-center justify-between px-4 py-2.5 text-xs font-bold text-white tracking-wide`}>
                  <span className="flex items-center gap-1.5">
                    <span>{b.icon}</span>
                    <span>{b.label}</span>
                    <span className="opacity-75">· Tình huống {idx + 1}</span>
                  </span>
                  {r ? (
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                      r.outcome === 'safe' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                      {r.outcome === 'safe' ? '✓ Đạt an toàn' : '✗ Đã sập bẫy'} · {r.score}đ
                    </span>
                  ) : (
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-medium text-white/90">
                      Chưa làm
                    </span>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Character Avatar */}
                    <div className="relative shrink-0">
                      {s.avatarUrl ? (
                        <img
                          src={s.avatarUrl}
                          alt={s.contactName}
                          className="h-14 w-14 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-slate-100"
                        />
                      ) : (
                        <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
                          {s.contactName.charAt(0)}
                        </div>
                      )}
                      <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                        <span>Đối tượng:</span>
                        <span className="text-slate-800 truncate">{s.contactName}</span>
                      </div>
                      <h3 className="mt-1 font-bold text-[16px] leading-snug text-slate-900 group-hover:text-blue-600 transition-colors">
                        {s.title}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-3.5 text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {s.description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="border-t border-slate-100 bg-slate-50/60 p-4">
                <button
                  onClick={() => onPick(s.id)}
                  className={`w-full rounded-xl ${b.btnCls} py-2.5 px-4 text-center text-xs font-bold text-white shadow-xs transition-all active:scale-[0.98] flex items-center justify-center gap-1.5`}
                >
                  <span>{r ? '🔄 Làm lại kịch bản' : '🚀 Bắt đầu tình huống'}</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom finish button for mobile / scrolling */}
      <div className="mt-8 flex flex-col items-center gap-3 border-t border-slate-200 pt-6">
        <button
          disabled={done === 0}
          onClick={onFinish}
          className="w-full sm:w-auto rounded-xl bg-slate-900 px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800 disabled:opacity-40 active:scale-95"
        >
          Hoàn thành và xem đánh giá tổng thể ({done}/{total})
        </button>
        <a href="#/teacher" className="text-xs text-slate-400 hover:text-slate-600 underline">
          Dành cho giáo viên / Quản trị
        </a>
      </div>
    </div>
  )
}

