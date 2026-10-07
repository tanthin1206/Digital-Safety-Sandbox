/** Ghi dữ liệu về Google Sheets qua Google Apps Script. Có hàng đợi offline trong localStorage. */
export const SHEET_URL = (import.meta.env.VITE_SHEET_URL as string | undefined) ?? ''

const QUEUE_KEY = 'dss-queue'

export type LogRow = { type: 'answer' | 'survey' | 'check'; [k: string]: unknown }

function readQueue(): LogRow[] {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) ?? '[]')
  } catch {
    return []
  }
}

function writeQueue(q: LogRow[]) {
  localStorage.setItem(QUEUE_KEY, JSON.stringify(q))
}

export async function flushQueue(): Promise<void> {
  if (!SHEET_URL) return
  let q = readQueue()
  while (q.length > 0) {
    try {
      // text/plain + no-cors để tránh preflight với Apps Script
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(q[0]),
      })
      q = q.slice(1)
      writeQueue(q)
    } catch {
      return // mất mạng: giữ lại hàng đợi, thử lại lần sau
    }
  }
}

export function logEvent(row: LogRow) {
  const q = readQueue()
  q.push({ ...row, timestamp: new Date().toISOString() })
  writeQueue(q)
  void flushQueue()
}

window.addEventListener('online', () => void flushQueue())

export type AnswerRow = {
  timestamp: string
  studentId: string
  grade: string
  scenarioId: string
  choiceId: string
  outcome: 'trap' | 'safe' | 'continue'
  stage: number
  attempt: number
  timeToAnswerMs: number
  checksUsed?: string
  score?: number | ''
}

export async function fetchAnswers(key: string): Promise<AnswerRow[]> {
  if (!SHEET_URL) throw new Error('Chưa cấu hình VITE_SHEET_URL')
  const res = await fetch(`${SHEET_URL}?key=${encodeURIComponent(key)}`)
  const json = await res.json()
  if (json.error) throw new Error(json.error)
  return json.answers as AnswerRow[]
}
