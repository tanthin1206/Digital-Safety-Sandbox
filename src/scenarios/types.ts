export type Platform = 'messenger' | 'zalo' | 'tiktok'
export type VoiceProfile = 'friend' | 'relative' | 'recruiter'
export type ImageType = 'invoice' | 'hospital' | 'license' | 'earnings' | 'permission' | 'offer' | 'fake-bill' | 'dvc-notice' | 'telegram-group' | 'border-job'
export type CheckTool = 'call' | 'bank' | 'link' | 'company' | 'profile' | 'zoom' | 'app'

export type Message = {
  from: 'them' | 'me' | 'system'
  /** Mặc định là 'text' */
  kind?: 'text' | 'voice' | 'image' | 'link' | 'call'
  /** Nội dung chữ; với 'voice' đây là lời thoại (dùng để đọc bằng giọng nói) */
  text?: string
  /** Độ trễ (ms) trước khi tin nhắn xuất hiện */
  delayMs?: number
  /** Gắn với một Red Flag; sẽ được tô đỏ sau khi học sinh chọn */
  flagId?: string
  voice?: { seconds: number; profile: VoiceProfile }
  /** params: các giá trị hiển thị trên ảnh (có thể đổi theo biến thể) */
  image?: { type: ImageType; params?: Record<string, string> }
  link?: { title: string; domain: string; desc: string }
  /** Cuộc gọi video giả lập: lần lượt đọc từng câu */
  call?: { lines: string[]; profile: VoiceProfile }
}

export type RedFlag = {
  id: string
  label: string
  explanation: string
}

export type Choice = {
  id: string
  label: string
  /** Tin nhắn của học sinh hiển thị trong khung chat khi chọn */
  reply?: string
  /** 'continue' = tiếp tục sang giai đoạn `next`; 'trap'/'safe' = kết thúc tình huống */
  outcome: 'continue' | 'trap' | 'safe'
  next?: number
  /** Lựa chọn này tự nó là một hành động xác minh đúng (tính điểm "kiểm tra") */
  verifies?: boolean
  feedbackTitle?: string
  feedbackBody?: string
}

/** Công cụ kiểm tra/gọi xác minh mà học sinh có thể dùng trước khi quyết định */
export type Check = {
  id: string
  tool: CheckTool
  label: string
  /** Chỉ xuất hiện từ giai đoạn này trở đi (mặc định 0) */
  fromStage?: number
  verdict: 'warn' | 'ok' | 'neutral'
  /** true = hành động sai cách (vd: gọi vào số của kẻ lừa đảo), bị trừ điểm */
  risky?: boolean
  title: string
  body: string
  rows?: { k: string; v: string }[]
  /** Red Flag được tiết lộ khi dùng công cụ này */
  flagId?: string
  /** Lời thoại đọc to (với công cụ gọi điện) */
  speech?: { text: string; profile: VoiceProfile }
  /** Ảnh được phóng to (với công cụ zoom) */
  image?: { type: ImageType; params?: Record<string, string> }
}

export type Stage = {
  messages: Message[]
  choices: Choice[]
}

export type Scenario = {
  id: string
  title: string
  description: string
  platform: Platform
  contactName: string
  contactStatus: string
  avatarUrl?: string
  redFlags: RedFlag[]
  checks: Check[]
  /** Mỗi biến thể là bảng thay chuỗi (tên, số tiền...) áp dụng cho toàn bộ kịch bản. Phần tử đầu {} = bản gốc */
  variants: Record<string, string>[]
  /** stages[0] là phần mở đầu; các stage sau là nhánh tuỳ lựa chọn */
  stages: Stage[]
}
