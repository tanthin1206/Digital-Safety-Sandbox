import { useState } from 'react'

type Props = {
  onOpenHandbook?: () => void
}

export default function Menu({ onOpenHandbook }: Props) {
  const [copied, setCopied] = useState(false)

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
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
            Nhập vai và đối mặt với các tình huống lừa đảo mạng chân thực thông qua trò chơi tương tác "Tàn Ảo". Hãy tỉnh táo, nhận diện cạm bẫy và bảo vệ bản thân trên không gian mạng!
          </p>
        </div>
      </div>

      {/* Hero Portal Card: Nhấn trực tiếp vào đây hoặc quét qr để trải nghiệm */}
      <div className="mt-8 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 p-6 sm:p-10 text-white shadow-2xl border border-indigo-800/50 relative">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12">
          <div className="flex-1 space-y-5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-4 py-1.5 text-xs font-semibold text-indigo-300 border border-indigo-400/30">
              ✨ CỔNG VÀO TRÒ CHƠI "TÀN ẢO"
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-snug">
              Nhấn trực tiếp vào đây hoặc quét qr để trãi nghiệm
            </h2>

            <p className="text-slate-300 text-sm sm:text-base max-w-lg leading-relaxed">
              Bạn có thể nhấn vào nút bên dưới để mở trò chơi ngay trên trình duyệt, hoặc dùng điện thoại quét mã QR bên cạnh để chơi trực tiếp trên di động.
            </p>

            {/* Direct Link Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="https://tanthin1206.github.io/t-n-t-o/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-4 text-base font-extrabold text-white shadow-xl hover:from-blue-500 hover:to-purple-500 hover:scale-[1.02] active:scale-95 transition-all text-center"
              >
                <span>👉 Nhấn trực tiếp vào đây để trải nghiệm</span>
                <span className="text-lg">↗</span>
              </a>

              <button
                onClick={() => {
                  navigator.clipboard.writeText('https://tanthin1206.github.io/t-n-t-o/')
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2500)
                }}
                className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-4 text-xs sm:text-sm font-semibold text-slate-200 transition active:scale-95"
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
              className="group relative rounded-2xl bg-white p-4 shadow-2xl ring-4 ring-indigo-500/30 transition-transform hover:scale-105 block"
            >
              <img
                src="images/qr_tanao.png"
                alt="Mã QR trải nghiệm trò chơi Tàn Ảo"
                className="h-48 w-48 sm:h-60 sm:w-60 rounded-xl object-contain"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 pointer-events-none" />
            </a>
            <div className="mt-3.5 text-center">
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-200">
                <span>📱</span> Dùng Camera / Zalo quét mã QR
              </span>
            </div>
          </div>
        </div>

        {/* Decorative blur */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>
    </div>
  )
}
