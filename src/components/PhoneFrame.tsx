import type { ReactNode } from 'react'
import type { Platform } from '../scenarios/types'
import {
  Back, DotsIcon, ImageIcon, LikeIcon, ListIcon, MicIcon, PhoneIcon, PlusIcon, SendIcon, SmileIcon, VideoIcon,
} from './Icons'

export function Avatar({
  name,
  avatarUrl,
  size = 32,
  className = '',
}: {
  name: string
  avatarUrl?: string
  size?: number
  className?: string
}) {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className={`shrink-0 rounded-full object-cover border border-slate-200/50 shadow-xs ${className}`}
        style={{ width: size, height: size }}
      />
    )
  }
  const hues = ['#f97316', '#8b5cf6', '#10b981', '#ec4899', '#0ea5e9']
  const bg = hues[name.charCodeAt(0) % hues.length]
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-bold text-white shadow-xs ${className}`}
      style={{ width: size, height: size, background: bg, fontSize: size * 0.42 }}
    >
      {name.charAt(0)}
    </div>
  )
}

function StatusBar({ dark, show }: { dark: boolean; show: boolean }) {
  if (!show) return <div className="h-1" />
  return (
    <div className={`flex items-center justify-between px-5 pt-1.5 text-[11px] font-semibold ${dark ? 'text-white' : 'text-black'}`}>
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span>5G</span>
        <span className="inline-block h-2.5 w-5 rounded-sm border border-current p-px">
          <span className="block h-full w-3/4 rounded-[1px] bg-current" />
        </span>
      </span>
    </div>
  )
}

export const AREA_BG: Record<Platform, string> = {
  messenger: '#ffffff',
  zalo: '#e2e9f1',
  tiktok: '#ffffff',
}

export type ViewMode = 'web' | 'phone'

const URLS: Record<Platform, string> = {
  messenger: 'messenger.com/t/minhanh',
  zalo: 'chat.zalo.me',
  tiktok: 'tiktok.com/messages',
}

type Props = {
  platform: Platform
  mode: ViewMode
  name: string
  status: string
  avatarUrl?: string
  onBack: () => void
  children: ReactNode
  footer?: ReactNode
  overlay?: ReactNode
}

/** Khung chat mô phỏng sát Messenger / Zalo / TikTok, hiển thị dạng điện thoại hoặc dạng web */
export default function PhoneFrame({ platform, mode, name, status, avatarUrl, onBack, children, footer, overlay }: Props) {
  const frame =
    mode === 'phone'
      ? 'h-[82vh] max-h-[760px] max-w-[380px] rounded-[2.2rem] border-[7px] border-slate-900 shadow-2xl'
      : 'h-[calc(100dvh-6.5rem)] max-w-none rounded-lg border border-slate-300 shadow-xl'
  return (
    <div className={`relative mx-auto flex w-full flex-col overflow-hidden bg-white ${frame}`}>
      {mode === 'web' && (
        <div className="flex items-center gap-2 border-b border-slate-300 bg-slate-100 py-1.5 pl-3 pr-48">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <div className="ml-2 flex-1 rounded-md bg-white px-3 py-1 text-xs text-slate-500">🔒 {URLS[platform]}</div>
        </div>
      )}
      {platform === 'messenger' && (
        <div className="border-b border-slate-200 bg-white pb-2">
          <StatusBar dark={false} show={mode === 'phone'} />
          <div className="flex items-center gap-2 px-2 pt-1.5">
            <button onClick={onBack} className="text-[#0084ff]"><Back size={26} /></button>
            <div className="relative">
              <Avatar name={name} avatarUrl={avatarUrl} size={36} />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="truncate text-[15px] font-bold text-black">{name}</div>
              <div className="text-[11px] text-slate-500">{status}</div>
            </div>
            <PhoneIcon size={22} className="text-[#0084ff]" />
            <VideoIcon size={24} className="ml-2 text-[#0084ff]" />
            <DotsIcon size={22} className="ml-2 text-[#0084ff]" />
          </div>
        </div>
      )}
      {platform === 'zalo' && (
        <div className="bg-[#0068ff] pb-2.5 text-white">
          <StatusBar dark show={mode === 'phone'} />
          <div className="flex items-center gap-2 px-2 pt-1.5">
            <button onClick={onBack}><Back size={26} /></button>
            <Avatar name={name} avatarUrl={avatarUrl} size={36} className="border-white/50" />
            <div className="min-w-0 flex-1 leading-tight">
              <div className="truncate text-[16px] font-semibold">{name}</div>
              <div className="text-[11px] opacity-90">{status}</div>
            </div>
            <PhoneIcon size={21} />
            <VideoIcon size={23} className="ml-3" />
            <ListIcon size={22} className="ml-3" />
          </div>
        </div>
      )}
      {platform === 'tiktok' && (
        <div className="border-b border-slate-200 bg-white pb-2">
          <StatusBar dark={false} show={mode === 'phone'} />
          <div className="flex items-center px-2 pt-1.5 text-black">
            <button onClick={onBack}><Back size={26} /></button>
            <div className="flex flex-1 flex-col items-center leading-tight">
              <div className="flex items-center gap-1.5">
                <Avatar name={name} avatarUrl={avatarUrl} size={24} />
                <span className="max-w-[170px] truncate text-[15px] font-bold">{name}</span>
              </div>
              <span className="text-[10px] text-slate-500">{status}</span>
            </div>
            <DotsIcon size={22} />
          </div>
        </div>
      )}

      <div className="flex-1 space-y-1 overflow-y-auto px-2.5 py-3" style={{ background: AREA_BG[platform] }}>
        {children}
      </div>

      {footer}

      {platform === 'messenger' && (
        <div className="flex items-center gap-3 border-t border-slate-100 bg-white px-3 py-2 text-[#0084ff]">
          <PlusIcon size={22} /><ImageIcon size={22} /><MicIcon size={22} />
          <div className="flex-1 rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-400">Aa</div>
          <LikeIcon size={22} />
        </div>
      )}
      {platform === 'zalo' && (
        <div className="flex items-center gap-3 border-t border-slate-200 bg-white px-3 py-2 text-slate-500">
          <SmileIcon size={23} />
          <div className="flex-1 text-sm text-slate-400">Tin nhắn</div>
          <DotsIcon size={22} /><MicIcon size={22} /><ImageIcon size={22} />
        </div>
      )}
      {platform === 'tiktok' && (
        <div className="flex items-center gap-2 border-t border-slate-100 bg-white px-3 py-2 text-slate-500">
          <div className="flex flex-1 items-center justify-between rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-400">
            Gửi tin nhắn...<SmileIcon size={20} />
          </div>
          <SendIcon size={22} />
        </div>
      )}
      {overlay}
    </div>
  )
}
