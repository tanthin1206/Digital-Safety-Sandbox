import { useEffect, useState } from 'react'
import Menu from './pages/Menu'
import Play from './pages/Play'
import { Result, Survey } from './pages/End'
import Teacher from './pages/Teacher'
import { scenarios } from './scenarios'
import { pickVariant } from './scenarios/variants'
import type { Scenario } from './scenarios/types'
import type { ViewMode } from './components/PhoneFrame'
import type { ScenarioResult } from './lib/score'

type Step = 'menu' | 'play' | 'result' | 'survey'

export default function App() {
  const [hash, setHash] = useState(window.location.hash)
  const [step, setStep] = useState<Step>('menu')
  const [studentId] = useState(() => 'HS-' + Math.random().toString(36).substring(2, 7).toUpperCase())
  const [grade] = useState('')
  const [active, setActive] = useState<{ scenario: Scenario; variantId: number } | null>(null)
  const [results, setResults] = useState<Record<string, ScenarioResult>>({})
  const [attempts, setAttempts] = useState<Record<string, number>>({})
  const mode: ViewMode = 'web'

  useEffect(() => {
    const h = () => setHash(window.location.hash)
    window.addEventListener('hashchange', h)
    return () => window.removeEventListener('hashchange', h)
  }, [])

  if (hash === '#/teacher') return <Teacher />

  let page
  if (step === 'menu')
    page = (
      <Menu
        results={results}
        onPick={(id) => {
          setActive(pickVariant(scenarios.find((s) => s.id === id)!))
          setAttempts((a) => ({ ...a, [id]: (a[id] ?? 0) + 1 }))
          setStep('play')
        }}
        onFinish={() => setStep('result')}
      />
    )
  else if (step === 'play' && active) {
    const sc = active.scenario
    page = (
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
  } else if (step === 'result') page = <Result results={results} onBack={() => setStep('menu')} onNext={() => setStep('survey')} />
  else page = <Survey studentId={studentId} grade={grade} />

  return page
}
