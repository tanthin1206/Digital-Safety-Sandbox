import { useState } from 'react'
import { fetchAnswers, SHEET_URL, type AnswerRow } from '../lib/logger'
import { scenarios } from '../scenarios'

export default function Teacher() {
  const [key, setKey] = useState('')
  const [rows, setRows] = useState<AnswerRow[] | null>(null)
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  async function load() {
    setLoading(true)
    setErr('')
    try {
      setRows(await fetchAnswers(key))
    } catch (e) {
      setErr((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const final = rows ? rows.filter((r) => r.outcome !== 'continue') : []
  const grades = rows ? [...new Set(rows.map((r) => String(r.grade)))].sort((a, b) => +a - +b) : []
  const students = rows ? new Set(rows.map((r) => r.studentId)).size : 0
  const pct = (list: AnswerRow[]) =>
    list.length ? Math.round((list.filter((r) => r.outcome === 'trap').length / list.length) * 100) + '%' : '-'

  return (
    <div className="mx-auto mt-8 max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="text-xl font-bold text-slate-900">Dashboard giáo viên</h2>
      {!SHEET_URL && (
        <p className="mt-2 rounded bg-amber-50 p-2 text-sm text-amber-800">
          Chưa cấu hình <code>VITE_SHEET_URL</code>. Xem README để kết nối Google Sheets.
        </p>
      )}
      <div className="mt-3 flex gap-2">
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Mật khẩu giáo viên"
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2"
        />
        <button
          onClick={load}
          disabled={!key || loading}
          className="rounded-lg bg-blue-600 px-4 font-semibold text-white disabled:opacity-40"
        >
          {loading ? '...' : 'Tải dữ liệu'}
        </button>
      </div>
      {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
      {rows && (
        <>
          <p className="mt-4 text-sm text-slate-600">
            {students} học sinh · {rows.length} lượt trả lời
          </p>
          <table className="mt-2 w-full text-sm">
            <thead>
              <tr className="border-b text-left text-slate-500">
                <th className="py-1">Tình huống</th>
                <th>Tổng</th>
                {grades.map((g) => (
                  <th key={g}>Khối {g}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scenarios.map((s) => {
                const list = final.filter((r) => r.scenarioId === s.id)
                return (
                  <tr key={s.id} className="border-b">
                    <td className="py-2">{s.title}</td>
                    <td className="font-bold text-red-600">{pct(list)}</td>
                    {grades.map((g) => (
                      <td key={g}>{pct(list.filter((r) => String(r.grade) === g))}</td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
          <p className="mt-1 text-xs text-slate-500">Số liệu là tỉ lệ % học sinh "sập bẫy" theo từng tình huống.</p>
        </>
      )}
      <a href="#/" className="mt-4 block text-center text-xs text-slate-400 underline">
        ← Về trang chính
      </a>
    </div>
  )
}
