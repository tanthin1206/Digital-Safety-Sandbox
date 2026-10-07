import type { VoiceProfile } from '../scenarios/types'

const PROFILES: Record<VoiceProfile, { pitch: number; rate: number }> = {
  friend: { pitch: 1.1, rate: 1.05 },
  relative: { pitch: 1.4, rate: 0.92 },
  recruiter: { pitch: 1.3, rate: 1.1 },
}

export const canSpeak = () => typeof window !== 'undefined' && 'speechSynthesis' in window

function pickVoice() {
  return window.speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith('vi'))
}

export function stopSpeech() {
  if (canSpeak()) window.speechSynthesis.cancel()
}

/** Đọc văn bản bằng giọng tiếng Việt của trình duyệt (dùng làm "voice thoại" mô phỏng). */
export function speak(text: string, profile: VoiceProfile, onEnd?: () => void) {
  if (!canSpeak()) {
    onEnd?.()
    return
  }
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'vi-VN'
  const v = pickVoice()
  if (v) u.voice = v
  u.pitch = PROFILES[profile].pitch
  u.rate = PROFILES[profile].rate
  u.onend = () => onEnd?.()
  u.onerror = () => onEnd?.()
  window.speechSynthesis.speak(u)
}
