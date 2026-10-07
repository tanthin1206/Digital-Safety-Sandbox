import type { Message, Platform } from '../scenarios/types'
import { Avatar } from './PhoneFrame'
import MockImage from './MockImage'
import VoiceBubble from './VoiceBubble'
import { VideoIcon } from './Icons'

type Props = {
  msg: Message
  platform: Platform
  contactName: string
  avatarUrl?: string
  flagged: boolean
  callDone: boolean
  onAnswer: () => void
}

function bubbleStyle(platform: Platform, mine: boolean) {
  if (platform === 'messenger')
    return mine ? 'bg-[#0084ff] text-white rounded-[18px]' : 'bg-[#e4e6eb] text-black rounded-[18px]'
  if (platform === 'zalo')
    return mine ? 'bg-[#e5efff] text-black rounded-lg shadow-sm' : 'bg-white text-black rounded-lg shadow-sm'
  return mine ? 'bg-[#fe2c55] text-white rounded-2xl' : 'bg-[#f1f1f2] text-black rounded-2xl'
}

const TIME = '09:41'

/** Một tin nhắn (chữ, thoại, ảnh, link, cuộc gọi) với kiểu bong bóng theo từng nền tảng */
export default function MessageBubble({ msg, platform, contactName, avatarUrl, flagged, callDone, onAnswer }: Props) {
  if (msg.from === 'system') {
    return (
      <div
        className={`pop mx-3 my-1 rounded-lg px-3 py-1.5 text-center text-[11px] ${
          flagged ? 'bg-red-100 text-red-700 ring-2 ring-red-500' : 'bg-black/5 text-slate-500'
        }`}
      >
        {msg.text}
        {flagged && <div className="font-bold">🚩 Red Flag</div>}
      </div>
    )
  }

  const mine = msg.from === 'me'
  const kind = msg.kind ?? 'text'
  const noPad = kind === 'image'
  const ring = flagged ? 'ring-2 ring-red-500' : ''
  const bg = flagged && !mine ? 'bg-red-50 text-black rounded-[18px]' : bubbleStyle(platform, mine)

  let content
  if (kind === 'voice' && msg.voice)
    content = <VoiceBubble seconds={msg.voice.seconds} profile={msg.voice.profile} transcript={msg.text ?? ''} onDark={mine && platform !== 'zalo'} />
  else if (kind === 'image' && msg.image) content = <MockImage type={msg.image.type} params={msg.image.params} />
  else if (kind === 'link' && msg.link)
    content = (
      <div className="w-[220px]">
        <div className="mb-1.5 flex h-20 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500 to-orange-400 text-3xl">💰</div>
        <div className="text-[11px] uppercase text-slate-500">{msg.link.domain}</div>
        <div className="text-sm font-semibold leading-tight">{msg.link.title}</div>
        <div className="text-[12px] text-slate-600">{msg.link.desc}</div>
      </div>
    )
  else if (kind === 'call')
    content = (
      <div className="w-[200px]">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500 text-white"><VideoIcon size={18} /></span>
          <div className="leading-tight">
            <div className="text-sm font-semibold">Cuộc gọi video</div>
            <div className="text-[11px] text-slate-500">{callDone ? 'Đã kết thúc' : 'Cuộc gọi đến…'}</div>
          </div>
        </div>
        {!callDone && (
          <button onClick={onAnswer} className="mt-2 w-full rounded-full bg-green-500 py-1.5 text-sm font-semibold text-white active:scale-95">
            Nghe máy
          </button>
        )}
      </div>
    )
  else content = <span className="whitespace-pre-wrap">{msg.text}</span>

  return (
    <div className={`pop flex items-end gap-1.5 ${mine ? 'justify-end' : 'justify-start'}`}>
      {!mine && <Avatar name={contactName} avatarUrl={avatarUrl} size={platform === 'messenger' ? 28 : 32} />}
      <div className="flex max-w-[82%] flex-col md:max-w-[min(82%,36rem)]">
        <div className={`overflow-hidden text-[14px] leading-snug ${noPad ? 'rounded-lg' : 'px-3 py-2'} ${bg} ${ring}`}>
          {content}
          {platform === 'zalo' && !noPad && <div className="mt-0.5 text-[10px] text-slate-400">{TIME}</div>}
        </div>
        {flagged && <span className="mt-0.5 text-[11px] font-bold text-red-600">🚩 Red Flag</span>}
      </div>
    </div>
  )
}
