import { useState } from 'react'
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
  onOpenHandbook?: () => void
}

export default function Menu({ results, onPick, onFinish, onOpenHandbook }: Props) {
  const [copied, setCopied] = useState(false)
  const done = Object.keys(results).length
  const total = scenarios.length
  const pct = Math.round((done / total) * 100)

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header section */}
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              🎮 Mục 2: Trò chơi "Tàn Ảo" · Trải Nghiệm Thực Tế
            </div>
            {onOpenHandbook && (
              <button
                onClick={onOpenHandbook}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 hover:bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 transition"
              >
                <span>📖 Xem Mục 1: Sổ tay số "Giải mã Ma Trận"</span>
                <span>→</span>
              </button>
            )}
          </div>
          <h1 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Trải nghiệm thực tế với trò chơi Tàn Ảo
          </h1>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl">
            Đối mặt trực tiếp với 5 kịch bản lừa đảo tinh vi nhất. Hãy sử dụng công cụ điều tra (gọi check, tra cứu STK, quét link, soi ảnh) để giải mã ma trận và đưa ra quyết định an toàn!
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

      {/* Hero Portal Card: Nhấn trực tiếp vào đây hoặc quét qr để trải nghiệm */}
      <div className="mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 p-6 sm:p-8 text-white shadow-2xl border border-indigo-800/40 relative">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-4 py-1.5 text-xs font-semibold text-indigo-300 border border-indigo-400/30">
              ✨ TRẢI NGHIỆM TRÒ CHƠI "TÀN ẢO" TRỰC TUYẾN
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
              Nhấn trực tiếp vào đây hoặc quét qr để trãi nghiệm
            </h2>
            
            <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
              Truy cập ngay phiên bản trò chơi <strong className="text-white">"Tàn Ảo"</strong> trên nền tảng web di động để nhập vai xử lý các tình huống lừa đảo nghẹt thở.
            </p>

            {/* Direct Link Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="https://tanthin1206.github.io/t-n-t-o/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-4 text-sm sm:text-base font-extrabold text-white shadow-lg hover:from-blue-500 hover:to-purple-500 hover:scale-[1.02] active:scale-95 transition-all text-center"
              >
                <span>👉 Nhấn trực tiếp vào đây để trải nghiệm</span>
                <span>↗</span>
              </a>

              <button
                onClick={() => {
                  navigator.clipboard.writeText('https://tanthin1206.github.io/t-n-t-o/')
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2500)
                }}
                className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-3.5 text-xs sm:text-sm font-semibold text-slate-200 transition active:scale-95"
              >
                <span>{copied ? '✓ Đã sao chép link!' : '📋 Sao chép link'}</span>
              </button>
            </div>

            <div className="text-xs text-indigo-300/80 font-mono break-all pt-1">
              🔗 Link:{' '}
              <a
                href="https://tanthin1206.github.io/t-n-t-o/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white font-semibold"
              >
                https://tanthin1206.github.io/t-n-t-o/
              </a>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="flex flex-col items-center shrink-0">
            <a
              href="https://tanthin1206.github.io/t-n-t-o/"
              target="_blank"
              rel="noopener noreferrer"
              title="Nhấn để mở trò chơi hoặc quét QR"
              className="group relative rounded-2xl bg-white p-3.5 shadow-2xl ring-4 ring-indigo-500/30 transition-transform hover:scale-105 block"
            >
              <img
                src="images/qr_tanao.png"
                alt="Mã QR trải nghiệm trò chơi Tàn Ảo"
                className="h-44 w-44 sm:h-52 sm:w-52 rounded-xl object-contain"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 pointer-events-none" />
            </a>
            <div className="mt-3 text-center">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                <span>📱</span> Quét mã QR bằng Camera / Zalo
              </span>
            </div>
          </div>
        </div>

        {/* Decorative blur */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      {/* Section Divider & Sandbox Scenarios Grid */}
      <div className="mt-10 mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>🛡️ Bộ Kịch Bản Thực Chiến Mô Phỏng Trên Web</span>
            <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs text-slate-700 font-semibold">{total} tình huống</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Trải nghiệm trực tiếp các tình huống mô phỏng chi tiết ngay tại trình duyệt:
          </p>
        </div>
      </div>

      {/* Grid of Scenarios - dàn hàng ngang đa cột */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

