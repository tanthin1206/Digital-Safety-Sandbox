import { useState } from 'react'

const card = 'mx-auto mt-8 max-w-md rounded-2xl bg-white p-6 shadow-lg'
const btn = 'mt-4 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white disabled:opacity-40 active:scale-95'

export function Welcome({ onStart }: { onStart: () => void }) {
  const [ok, setOk] = useState(false)
  return (
    <div className={card}>
      <div className="text-4xl">🛡️</div>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">Digital Safety Sandbox</h1>
      <p className="mt-2 text-slate-700">
        Thử thách nhận diện lừa đảo mạng gồm 5 tình huống mô phỏng (giả danh bạn bè, Deepfake, việc làm online, cài ứng dụng lạ, việc làm "không cần bằng cấp" ở nước ngoài).
        Mỗi tình huống bạn sẽ chọn cách xử lý và nhận giải thích về các <b>Red Flag</b>.
      </p>
      <ul className="mt-3 list-disc pl-5 text-sm text-slate-600">
        <li>Hoàn toàn là mô phỏng, không có tiền hay thông tin thật nào bị lấy.</li>
        <li>Chỉ dùng mã ID ẩn danh, không cần nhập tên, số điện thoại hay email.</li>
        <li>Kết quả chỉ dùng cho mục đích học tập.</li>
      </ul>
      <label className="mt-4 flex items-start gap-2 text-sm text-slate-800">
        <input type="checkbox" checked={ok} onChange={(e) => setOk(e.target.checked)} className="mt-1" />
        Tôi đã đọc và đồng ý tham gia (đã được nhà trường/phụ huynh cho phép).
      </label>
      <button disabled={!ok} onClick={onStart} className={btn}>
        Bắt đầu
      </button>
      <a href="#/teacher" className="mt-4 block text-center text-xs text-slate-400 underline">
        Dành cho giáo viên
      </a>
    </div>
  )
}

export function Register({ onDone }: { onDone: (id: string, grade: string) => void }) {
  const [id, setId] = useState('')
  const [grade, setGrade] = useState('')
  const valid = /^[A-Za-z0-9_-]{3,20}$/.test(id) && grade !== ''
  return (
    <div className={card}>
      <h2 className="text-xl font-bold text-slate-900">Thông tin ẩn danh</h2>
      <label className="mt-4 block text-sm font-medium text-slate-700">
        Mã ID (3–20 ký tự chữ/số, ví dụ: HS2024-07)
        <input
          value={id}
          onChange={(e) => setId(e.target.value.trim())}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          placeholder="Mã giáo viên cấp hoặc tự đặt, không dùng tên thật"
        />
      </label>
      <label className="mt-3 block text-sm font-medium text-slate-700">
        Khối lớp
        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
        >
          <option value="">-- Chọn --</option>
          {['6', '7', '8', '9', '10', '11', '12'].map((g) => (
            <option key={g} value={g}>
              Khối {g}
            </option>
          ))}
        </select>
      </label>
      <button disabled={!valid} onClick={() => onDone(id, grade)} className={btn}>
        Vào thử thách
      </button>
    </div>
  )
}
