import { useEffect, useState } from 'react'
import Menu from './pages/Menu'
import Teacher from './pages/Teacher'
import Handbook from './pages/Handbook'
import AiGuard from './pages/AiGuard'

type Tab = 'handbook' | 'game' | 'aiguard'

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash)
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    if (window.location.hash === '#/game') return 'game'
    if (window.location.hash === '#/aiguard') return 'aiguard'
    return 'handbook'
  })

  useEffect(() => {
    const handleHash = () => {
      const h = window.location.hash
      setHash(h)
      if (h === '#/game') setActiveTab('game')
      else if (h === '#/aiguard') setActiveTab('aiguard')
      else if (h === '#/handbook') setActiveTab('handbook')
    }
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  if (hash === '#/teacher') return <Teacher />

  const handleSelectTab = (tab: Tab) => {
    setActiveTab(tab)
    if (tab === 'game') window.location.hash = '#/game'
    else if (tab === 'aiguard') window.location.hash = '#/aiguard'
    else window.location.hash = '#/handbook'
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Sticky Top Navigation Bar */}
      <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2 sm:px-6 sm:py-2.5 lg:px-8">
          {/* Logo / Brand Title */}
          <div
            onClick={() => handleSelectTab('handbook')}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 text-lg sm:text-xl shadow-md text-white font-bold">
              🛡️
            </div>
            <div>
              <div className="text-xs sm:text-base font-extrabold tracking-tight text-slate-900 leading-tight">
                Digital Safety Sandbox
              </div>
              <div className="hidden xs:block text-[10px] sm:text-[11px] text-slate-500 font-medium">
                Phòng chống lừa đảo trực tuyến
              </div>
            </div>
          </div>

          {/* Three Main Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-1.5 rounded-2xl bg-slate-100 p-1 border border-slate-200/80">
            {/* Tab 1: Sổ tay số "Giải mã Ma Trận" */}
            <button
              onClick={() => handleSelectTab('handbook')}
              className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'handbook'
                  ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span className="text-base sm:text-lg">📖</span>
              <div className="text-left">
                <div className="leading-tight">Mục 1: Sổ tay số</div>
                <div className="hidden lg:block text-[10px] font-normal text-slate-500 leading-none mt-0.5">
                  "Giải mã Ma Trận"
                </div>
              </div>
            </button>

            {/* Tab 2: Trò chơi "Tàn Ảo" */}
            <button
              onClick={() => handleSelectTab('game')}
              className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'game'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span className="text-base sm:text-lg">🎮</span>
              <div className="text-left">
                <div className="leading-tight">Mục 2: Trò chơi</div>
                <div className="hidden lg:block text-[10px] font-normal text-slate-500 leading-none mt-0.5">
                  "Tàn Ảo" Thực tế
                </div>
              </div>
            </button>

            {/* Tab 3: Trợ lý ảo AI "Cảnh Vệ Số" */}
            <button
              onClick={() => handleSelectTab('aiguard')}
              className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'aiguard'
                  ? 'bg-white text-emerald-700 shadow-xs border border-slate-200/70 ring-1 ring-emerald-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span className="text-base sm:text-lg">🤖</span>
              <div className="text-left">
                <div className="leading-tight flex items-center gap-1">
                  <span>Mục 3: AI Cảnh Vệ</span>
                  <span className="hidden sm:inline-block rounded-full bg-emerald-500 text-white text-[9px] px-1 py-0.2">Mới</span>
                </div>
                <div className="hidden lg:block text-[10px] font-normal text-slate-500 leading-none mt-0.5">
                  Quét lừa đảo Gemini
                </div>
              </div>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'handbook' && (
          <Handbook onStartGame={() => handleSelectTab('game')} />
        )}
        {activeTab === 'game' && (
          <Menu onOpenHandbook={() => handleSelectTab('handbook')} />
        )}
        {activeTab === 'aiguard' && <AiGuard />}
      </main>
    </div>
  )
}
