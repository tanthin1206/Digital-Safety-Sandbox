import { useEffect, useRef, useState } from 'react'
import PhoneFrame from '../components/PhoneFrame'
import MessageBubble from '../components/MessageBubble'
import FeedbackPanel from '../components/FeedbackPanel'
import CallScreen from '../components/CallScreen'
import CheckModal, { TOOL_ICON } from '../components/CheckModal'
import { logEvent } from '../lib/logger'
import { computeScore, type ScenarioResult } from '../lib/score'
import { stopSpeech } from '../lib/speech'
import type { Check, Choice, Message, Scenario } from '../scenarios/types'
import type { ViewMode } from '../components/PhoneFrame'

type Props = {
  scenario: Scenario
  variantId: number
  mode: ViewMode
  studentId: string
  grade: string
  attempt: number
  onFinish: (result: ScenarioResult | null) => void
}

export default function Play({ scenario, variantId, mode, studentId, grade, attempt, onFinish }: Props) {
  const [timeline, setTimeline] = useState<Message[]>(scenario.stages[0].messages)
  const [shown, setShown] = useState(0)
  const [stage, setStage] = useState(0)
  const [picked, setPicked] = useState<Choice | null>(null)
  const [result, setResult] = useState<ScenarioResult | null>(null)
  const [openCall, setOpenCall] = useState<number | null>(null)
  const [callsDone, setCallsDone] = useState<number[]>([])
  const [used, setUsed] = useState<string[]>([])
  const [openCheck, setOpenCheck] = useState<Check | null>(null)
  const readyAt = useRef<number | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const last = shown > 0 ? timeline[shown - 1] : undefined
  const blocked = !!last && last.kind === 'call' && !callsDone.includes(shown - 1)
  const ready = shown >= timeline.length && !blocked

  useEffect(() => {
    if (ready) {
      readyAt.current ??= Date.now()
      return
    }
    readyAt.current = null
    if (blocked || shown >= timeline.length) return
    const t = setTimeout(() => setShown((s) => s + 1), timeline[shown].delayMs ?? 1000)
    return () => clearTimeout(t)
  }, [shown, timeline, ready, blocked])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [shown, picked, ready])

  useEffect(() => () => stopSpeech(), [])

  function runCheck(c: Check) {
    setOpenCheck(c)
    if (used.includes(c.id)) return
    setUsed((u) => [...u, c.id])
    logEvent({ type: 'check', studentId, grade, scenarioId: scenario.id, attempt, stage, checkId: c.id })
  }

  function choose(c: Choice) {
    if (picked) return
    const res = c.outcome === 'continue' ? null : computeScore(scenario, used, c)
    logEvent({
      type: 'answer',
      studentId,
      grade,
      scenarioId: scenario.id,
      variantId,
      stage,
      attempt,
      choiceId: c.id,
      outcome: c.outcome,
      timeToAnswerMs: readyAt.current ? Date.now() - readyAt.current : 0,
      checksUsed: res ? used.join('|') : '',
      score: res ? res.score : '',
    })
    const mine: Message[] = c.reply ? [{ from: 'me', text: c.reply }] : []
    if (c.outcome === 'continue') {
      const next = scenario.stages[c.next ?? 0]
      setTimeline((t) => [...t, ...mine, ...next.messages])
      setStage(c.next ?? 0)
    } else {
      setTimeline((t) => [...t, ...mine])
      setPicked(c)
      setResult(res)
    }
    if (mine.length) setShown((s) => s + 1)
  }

  const visible = timeline.slice(0, shown)
  const revealed = used.map((id) => scenario.checks.find((c) => c.id === id)?.flagId)
  const visibleFlags = scenario.redFlags.filter(
    (f) => visible.some((m) => m.flagId === f.id) || revealed.includes(f.id),
  )
  const choices = scenario.stages[stage].choices
  const available = scenario.checks.filter((c) => (c.fromStage ?? 0) <= stage)
  const callMsg = openCall !== null ? timeline[openCall] : null

  const footer = !ready ? null : picked && result ? (
    <FeedbackPanel choice={picked} flags={visibleFlags} score={result.score} checksUsed={used} onNext={() => onFinish(result)} />
  ) : (
    <div className="pop max-h-[52%] space-y-2 overflow-y-auto border-t bg-slate-50 p-2.5">
      {available.length > 0 && (
        <div>
          <div className="text-[11px] font-semibold text-slate-500">🔍 Kiểm tra / gọi xác minh trước khi quyết định</div>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {available.map((c) => (
              <button
                key={c.id}
                onClick={() => runCheck(c)}
                className={`rounded-full border px-2.5 py-1 text-[12px] font-medium active:scale-95 ${
                  used.includes(c.id) ? 'border-slate-300 bg-slate-200 text-slate-500' : 'border-blue-300 bg-white text-blue-700'
                }`}
              >
                {TOOL_ICON[c.tool]} {c.label}
                {used.includes(c.id) && ' ✓'}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="space-y-1.5">
        <div className="text-[11px] font-semibold text-slate-500">Bạn sẽ làm gì?</div>
        {choices.map((c) => (
          <button
            key={c.id}
            onClick={() => choose(c)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-left text-[13px] font-medium text-slate-800 hover:bg-slate-100 active:scale-[0.98]"
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  )

  const overlay = openCheck ? (
    <CheckModal check={openCheck} onClose={() => setOpenCheck(null)} />
  ) : callMsg?.call ? (
    <CallScreen
      name={scenario.contactName}
      avatarUrl={scenario.avatarUrl}
      lines={callMsg.call.lines}
      profile={callMsg.call.profile}
      onEnd={() => {
        setCallsDone((d) => [...d, openCall as number])
        setOpenCall(null)
      }}
    />
  ) : null

  return (
    <div className={mode === 'fullscreen' ? 'h-full w-full' : mode === 'web' ? 'p-2 sm:p-3' : 'p-3'}>
      <PhoneFrame
        platform={scenario.platform}
        mode={mode}
        name={scenario.contactName}
        status={scenario.contactStatus}
        avatarUrl={scenario.avatarUrl}
        onBack={() => onFinish(null)}
        footer={footer}
        overlay={overlay}
      >
        {visible.map((m, i) => (
          <MessageBubble
            key={i}
            msg={m}
            platform={scenario.platform}
            contactName={scenario.contactName}
            avatarUrl={scenario.avatarUrl}
            flagged={!!picked && !!m.flagId}
            callDone={callsDone.includes(i)}
            onAnswer={() => setOpenCall(i)}
          />
        ))}
        {!ready && !blocked && (
          <div className="flex items-end gap-1.5">
            <div className="flex w-14 justify-center gap-1 rounded-2xl bg-slate-200 px-3 py-3">
              <span className="dot h-2 w-2 rounded-full bg-slate-500" />
              <span className="dot h-2 w-2 rounded-full bg-slate-500" />
              <span className="dot h-2 w-2 rounded-full bg-slate-500" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </PhoneFrame>
    </div>
  )
}
