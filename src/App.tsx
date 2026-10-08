import { useEffect, useState } from 'react'
import Menu from './pages/Menu'
import Play from './pages/Play'
import { Result, Survey } from './pages/End'
import Teacher from './pages/Teacher'
import Handbook from './pages/Handbook'
import { scenarios } from './scenarios'
import { pickVariant } from './scenarios/variants'
import type { Scenario } from './scenarios/types'
import type { ViewMode } from './components/PhoneFrame'
import type { ScenarioResult } from './lib/score'

type Step = 'menu' | 'play' | 'result' | 'survey'
type Tab = 'handbook' | 'game'

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash)
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    if (window.location.hash === '#/game') return 'game'
    return 'handbook'
  })
  const [step, setStep] = useState<Step>('menu')
  const [studentId] = useState(() => 'HS-' + Math.random().toString(36).substring(2, 7).toUpperCase())
  const [grade] = useState('')
  const [active, setActive] = useState<{ scenario: Scenario; variantId: number } | null>(null)
  const [results, setResults] = useState<Record<string, ScenarioResult>>({})
  const [attempts, setAttempts] = useState<Record<string, number>>({})
  const mode: ViewMode = 'web'

  useEffect(() => {
    const handleHash = () => {
      const h = window.location.hash
      setHash(h)
      if (h === '#/game') setActiveTab('game')
      else if (h === '#/handbook') setActiveTab('handbook')
    }
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  if (hash === '#/teacher') return <Teacher />

  const handleSelectTab = (tab: Tab) => {
    setActiveTab(tab)
    window.location.hash = tab === 'game' ? '#/game' : '#/handbook'
  }

  const handlePickScenario = (id: string) => {
    const sc = scenarios.find((s) => s.id === id)
    if (sc) {
      setActive(pickVariant(sc))
      setAttempts((a) => ({ ...a, [id]: (a[id] ?? 0) + 1 }))
      setStep('play')
      setActiveTab('game')
      window.location.hash = '#/game'
    }
  }

  let gamePage
  if (step === 'menu') {
    gamePage = (
      <Menu
        results={results}
        onPick={handlePickScenario}
        onFinish={() => setStep('result')}
        onOpenHandbook={() => handleSelectTab('handbook')}
      />
    )
  } else if (step === 'play' && active) {
    const sc = active.scenario
    gamePage = (
      <Play
        key={`${sc.id}-${attempts[sc.id]}`}
        scenario={sc}
        variantId={active.variantId}
        mode={mode}
        studentId={studentId}
        grade={grade}
        attempt={attempts[sc.id] ?? 1}
        onFinish={(res) => {
          if (res) setResults((r) => ({ ...r, [sc.id]: res }))
          setStep('menu')
        }}
      />
    )
  } else if (step === 'result') {
    gamePage = <Result results={results} onBack={() => setStep('menu')} onNext={() => setStep('survey')} />
  } else {
    gamePage = <Survey studentId={studentId} grade={grade} />
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Sticky Top Navigation Bar */}
      <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2.5 sm:px-6 sm:py-3 lg:px-8">
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

          {/* Two Main Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2 rounded-2xl bg-slate-100 p-1 border border-slate-200/80">
            {/* Tab 1: Sổ tay số "Giải mã Ma Trận" */}
            <button
              onClick={() => handleSelectTab('handbook')}
              className={`flex items-center gap-1.5 sm:gap-2 rounded-xl px-2.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'handbook'
                  ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span className="text-base sm:text-lg">📖</span>
              <div className="text-left">
                <div className="leading-tight">Mục 1: Sổ tay số</div>
                <div className="hidden md:block text-[10px] font-normal text-slate-500 leading-none mt-0.5">
                  "Giải mã Ma Trận"
                </div>
              </div>
            </button>

            {/* Tab 2: Trò chơi "Tàn Ảo" */}
            <button
              onClick={() => handleSelectTab('game')}
              className={`flex items-center gap-1.5 sm:gap-2 rounded-xl px-2.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'game'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span className="text-base sm:text-lg">🎮</span>
              <div className="text-left">
                <div className="leading-tight">Mục 2: Trò chơi</div>
                <div className="hidden md:block text-[10px] font-normal text-slate-500 leading-none mt-0.5">
                  "Tàn Ảo" Thực tế
                </div>
              </div>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'handbook' ? (
          <Handbook
            onStartGame={() => {
              setActiveTab('game')
              setStep('menu')
              window.location.hash = '#/game'
            }}
            onPickScenario={handlePickScenario}
          />
        ) : (
          gamePage
        )}
      </main>
    </div>
  )
}
