import { useState } from 'react'

export type AnalysisResult = {
  scamScore: number
  riskLevel: 'CỰC KỲ NGUY HIỂM' | 'NGUY CƠ CAO' | 'CẢNH GIÁC' | 'AN TOÀN'
  detectedKeywords: string[]
  matchedScenario: string
  summary: string
  psychologicalTricks: string
  tacticsAnalysis: string
  urgentAdvice: string[]
}

const SAMPLE_MESSAGES = [
  {
    title: '✈️ Việc nhẹ Mộc Bài - Đài thọ vé',
    text: 'Em ơi bên anh tuyển nhân viên chăm sóc khách hàng game trực tuyến tại cửa khẩu Mộc Bài Tây Ninh. Lương khởi điểm 28 triệu/tháng, đài thọ vé máy bay và xe đón tận nơi, không cần bằng cấp hay kinh nghiệm. Liên hệ qua Telegram @tuyendung_vip nhé!',
  },
  {
    title: '💰 Bẫy CTV Telegram làm nhiệm vụ',
    text: 'Chào bạn, bên mình tuyển CTV đánh giá shop TikTok/Shopee kiếm 300k - 800k/ngày tại nhà. Chỉ cần follow thả tim nhận hoa hồng 30% ngay. Tham gia nhóm Telegram VIP để nhận lệnh chuyển khoản và làm nhiệm vụ đơn hàng phúc lợi.',
  },
  {
    title: '🏛️ Cán bộ gọi cập nhật VNeID mức 2',
    text: 'Tôi là Trung úy Tuấn Anh - Cán bộ Đề án 06 Công an quận. Hồ sơ định danh VNeID mức 2 của em bị sai lệch nhóm máu và quê quán. Em tải ngay ứng dụng dichvucong.apk theo đường link này về cài đặt và cấp quyền trợ năng để tôi đồng bộ lại gấp, nếu không sẽ bị khóa số định danh.',
  },
  {
    title: '💳 Nhờ nhận tiền và chuyển hộ Napas',
    text: 'Long à, tao gửi bill chuyển khoản 35 triệu qua Napas 24/7 rồi nè. Do app ngân hàng tao đang nghẽn hạn mức cuối tuần nên tiền nổi chậm xíu. Mày chuyển gấp giùm tao 30 triệu vào STK này để giữ cọc mua máy tính nhé, tao tặng mày 1 triệu tiền cà phê!',
  },
  {
    title: '☕ Bạn bè rủ đi chơi (Tin an toàn)',
    text: 'Chiều mai tan học rảnh không Tuấn ơi? Đi trà sữa với nhóm tao ở quán Gongcha gần cổng trường nhé, tầm 5h chiều tao qua đón.',
  },
]

const FIXED_MODEL = 'gemini-3.5-flash-lite'

export default function AiGuard() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '')
  const [selectedModel, setSelectedModel] = useState(() => {
    const saved = localStorage.getItem('gemini_model')
    void saved
    return FIXED_MODEL
  })
  const [showKeyModal, setShowKeyModal] = useState(false)
  const [inputKey, setInputKey] = useState(apiKey)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [testingKey, setTestingKey] = useState(false)
  const [keyTestStatus, setKeyTestStatus] = useState<{ success: boolean; message: string } | null>(null)

  const handleSaveKey = () => {
    localStorage.setItem('gemini_api_key', inputKey.trim())
    localStorage.setItem('gemini_model', selectedModel)
    setApiKey(inputKey.trim())
    setShowKeyModal(false)
  }

  const handleTestKey = async (keyToTest: string) => {
    const k = keyToTest.trim()
    if (!k) {
      setKeyTestStatus({
        success: false,
        message: 'Vui lòng nhập khóa Gemini API trước khi kiểm tra.',
      })
      return
    }
    setTestingKey(true)
    setKeyTestStatus(null)

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 8000)

    try {
      // 1. Verify API Key with Google's official models list endpoint (ultra fast, < 0.5s)
      const listRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${k}`,
        { signal: controller.signal },
      )

      if (!listRes.ok) {
        const errData = await listRes.json().catch(() => ({}))
        const errMsg = errData?.error?.message || `Mã lỗi HTTP ${listRes.status}`
        setKeyTestStatus({
          success: false,
          message: `Xác thực thất bại từ Google: ${errMsg}`,
        })
        return
      }

      const listData = await listRes.json().catch(() => ({}))
      const rawModels: { name: string; supportedGenerationMethods?: string[] }[] = listData?.models || []
      const availableModels = rawModels
        .filter((m) => !m.supportedGenerationMethods || m.supportedGenerationMethods.includes('generateContent'))
        .map((m) => m.name.replace(/^models\//, ''))

      // Determine best active model supported by this key
      let bestModel = selectedModel
      if (!availableModels.includes(bestModel)) {
        const priority = [FIXED_MODEL]
        const matched = priority.find((p) => availableModels.includes(p))
        bestModel = matched || FIXED_MODEL
      }

      // 2. Perform a fast ping generate test
      let pingOk = false
      let replyText = 'OK'
      try {
        const pingRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${bestModel}:generateContent?key=${k}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: 'Trả lời 1 từ: OK' }] }],
            }),
            signal: controller.signal,
          },
        )
        if (pingRes.ok) {
          const pingData = await pingRes.json().catch(() => ({}))
          replyText = pingData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'OK'
          pingOk = true
        }
      } catch {
        // Ping error/timeout is non-fatal if listRes was 200 OK
      }

      setSelectedModel(bestModel)
      localStorage.setItem('gemini_model', bestModel)

      setKeyTestStatus({
        success: true,
        message: pingOk
          ? `Kết nối thành công! Khóa API Gemini hợp lệ với mô hình [${bestModel}] (Google phản hồi: "${replyText}"). Sẵn sàng phân tích an toàn mạng.`
          : `Khóa API Gemini hợp lệ! Đã xác thực tài khoản với Google AI Studio (Mô hình phát hiện: [${bestModel}]).`,
      })
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        setKeyTestStatus({
          success: false,
          message: 'Quá thời gian kết nối (Timeout sau 8 giây). Vui lòng kiểm tra lại mạng Internet hoặc VPN.',
        })
      } else {
        const msg = err instanceof Error ? err.message : 'Lỗi kết nối'
        setKeyTestStatus({
          success: false,
          message: `Lỗi kết nối: ${msg}. Vui lòng kiểm tra lại đường truyền mạng.`,
        })
      }
    } finally {
      clearTimeout(timer)
      setTestingKey(false)
    }
  }

  // Smart heuristic analyzer (works immediately even without API key)
  const analyzeWithHeuristics = (text: string): AnalysisResult => {
    const lower = text.toLowerCase()
    const detected: string[] = []
    let score = 0
    let scenario = 'Chưa xác định rõ'
    let tricks = 'Lợi dụng sự tò mò và thiếu cảnh giác.'
    let tactics = 'Kẻ gian tiếp cận qua tin nhắn để thăm dò phản ứng của nạn nhân.'
    let advice = [
      'Xác thực lại danh tính người gửi qua cuộc gọi điện thoại trực tiếp.',
      'Không chia sẻ thông tin cá nhân hoặc chuyển bất kỳ khoản tiền nào.',
      'Chia sẻ với người thân, thầy cô khi cảm thấy bất an.',
    ]

    // Rule 1: Mộc Bài / Buôn người
    if (
      lower.includes('mộc bài') ||
      lower.includes('campuchia') ||
      lower.includes('đài thọ vé') ||
      lower.includes('xe đón') ||
      (lower.includes('tây ninh') && lower.includes('lương')) ||
      (lower.includes('không cần bằng cấp') && lower.includes('triệu'))
    ) {
      if (lower.includes('đài thọ vé')) detected.push('Đài thọ vé máy bay')
      if (lower.includes('mộc bài') || lower.includes('tây ninh') || lower.includes('campuchia')) detected.push('Địa bàn biên giới Mộc Bài / Campuchia')
      if (lower.includes('telegram')) detected.push('Việc làm Telegram')
      if (lower.includes('không cần bằng cấp')) detected.push('Không cần bằng cấp / kinh nghiệm')
      if (lower.includes('triệu')) detected.push('Lương ảo 20-40 triệu')
      score = 98
      scenario = 'Bẫy tuyển dụng việc nhẹ lương cao — Buôn người sang Campuchia / KCN Mộc Bài'
      tricks = 'Đánh vào tâm lý khao khát kiếm tiền nhanh của học sinh, thanh thiếu niên; dụ dỗ bằng chiêu đài thọ vé máy bay và cam kết việc nhẹ.'
      tactics = 'Kẻ môi giới chiêu mộ nạn nhân qua mạng, hứa bao trọn chi phí di chuyển. Khi đến Tây Ninh sẽ đưa qua biên giới bằng đường mòn rồi ép làm việc lừa đảo 14-16 tiếng/ngày, đánh đập và đòi tiền chuộc hàng trăm triệu.'
      advice = [
        'Tuyệt đối KHÔNG ĐI THEO sự dẫn dắt của người lạ hoặc lên các chuyến xe "đài thọ" đến khu vực biên giới.',
        'Tuyệt đối không gửi ảnh chụp CCCD, hộ chiếu hay định vị cho đối tượng.',
        'Báo ngay cho cha mẹ, nhà trường và gọi Tổng đài Quốc gia Bảo vệ Trẻ em 111 hoặc cơ quan Công an gần nhất.',
      ]
    }
    // Rule 2: Telegram task scam
    else if (
      (lower.includes('telegram') && (lower.includes('nhiệm vụ') || lower.includes('hoa hồng') || lower.includes('ctv'))) ||
      (lower.includes('nhiệm vụ') && lower.includes('hoa hồng')) ||
      lower.includes('đơn hàng phúc lợi') ||
      lower.includes('bù lệnh')
    ) {
      if (lower.includes('telegram')) detected.push('Việc làm Telegram')
      if (lower.includes('nhiệm vụ')) detected.push('Làm nhiệm vụ đơn hàng')
      if (lower.includes('hoa hồng')) detected.push('Hoa hồng cao 20% - 30%')
      if (lower.includes('ctv')) detected.push('Tuyển CTV online nhẹ nhàng')
      score = 95
      scenario = 'Bẫy Cộng Tác Viên Telegram làm nhiệm vụ ảo chiếm đoạt tiền nạp'
      tricks = 'Tạo mồi nhử bằng các khoản tiền thưởng nhỏ ban đầu (30k - 50k), sau đó dẫn dụ vào bẫy "chi phí chìm" (Sunk Cost Fallacy) để ép nạn nhân nạp tiền cứu vốn.'
      tactics = 'Mời tham gia nhóm chat toàn chim mồi giả vờ nhận tiền tỷ lệ cao. Nạn nhân được yêu cầu nạp tiền để thực hiện nhiệm vụ giá trị lớn hơn, sau đó hệ thống báo "lỗi cú pháp" và bắt nạp thêm gấp đôi để rút vốn.'
      advice = [
        'Không bao giờ nạp tiền để nhận việc làm. Một công việc chân chính không bao giờ bắt người lao động ứng tiền trước.',
        'Dừng nạp tiền ngay lập tức, không tin vào lời hứa "nạp thêm để gỡ lệnh hoàn tiền".',
        'Chụp lại tin nhắn, sao kê tài khoản ngân hàng và trình báo cơ quan Công an.',
      ]
    }
    // Rule 3: VNeID / BCA scam
    else if (
      lower.includes('vneid') ||
      lower.includes('đề án 06') ||
      lower.includes('.apk') ||
      lower.includes('dịch vụ công') ||
      lower.includes('định danh mức 2') ||
      lower.includes('trung úy') ||
      lower.includes('công an')
    ) {
      if (lower.includes('vneid')) detected.push('Giả mạo VNeID')
      if (lower.includes('đề án 06')) detected.push('Lấy danh nghĩa Đề án 06')
      if (lower.includes('.apk')) detected.push('Cài đặt file mã độc .apk')
      if (lower.includes('trợ năng') || lower.includes('quyền')) detected.push('Yêu cầu bật quyền Trợ năng (Accessibility)')
      score = 98
      scenario = 'Giả danh Cán bộ Công an / VNeID Đề án 06 lừa cài mã độc Trojan trộm tiền'
      tricks = 'Đe dọa khóa mã định danh, phạt hành chính hoặc dọa liên quan đến án ma túy/rửa tiền để gây hoảng sợ.'
      tactics = 'Gửi link web giả mạo Cổng Dịch vụ công để dụ tải file .apk. Ứng dụng độc hại này yêu cầu quyền Trợ năng để đọc trộm mã OTP và tự động chuyển sạch tiền khỏi tài khoản ngân hàng.'
      advice = [
        'Công an KHÔNG BAO GIỜ làm việc hay hướng dẫn cài đặt phần mềm qua điện thoại hay Zalo.',
        'Tuyệt đối không nhấn vào link lạ và không tải bất kỳ file có đuôi .apk nào.',
        'Mọi thủ tục VNeID bắt buộc phải thực hiện trực tiếp tại Công an phường/xã.',
      ]
    }
    // Rule 4: Fake Bill / Hack nick
    else if (
      lower.includes('fake bill') ||
      lower.includes('chuyển hộ') ||
      lower.includes('napas') ||
      lower.includes('nghẽn hạn mức') ||
      lower.includes('gửi bill') ||
      (lower.includes('chuyển khoản') && lower.includes('cà phê') && lower.includes('stk'))
    ) {
      if (lower.includes('napas') || lower.includes('bill')) detected.push('Biên lai chuyển khoản Napas giả mạo')
      if (lower.includes('nghẽn hạn mức') || lower.includes('lỗi mạng')) detected.push('Lấy cớ nghẽn mạng / nghẽn hạn mức')
      if (lower.includes('chuyển hộ') || lower.includes('nhận hộ')) detected.push('Nhờ nhận tiền và chuyển tiền hộ')
      if (lower.includes('cà phê') || lower.includes('hoa hồng')) detected.push('Mồi chài tiền cà phê / hoa hồng')
      score = 90
      scenario = 'Bẫy "Fake Bill biến động số dư" & Chiếm đoạt tài khoản bạn bè'
      tricks = 'Lợi dụng lòng tốt, sự tin tưởng giữa bạn bè và sự gấp gáp để nạn nhân không kịp kiểm tra số dư thực tế.'
      tactics = 'Dùng phần mềm Photoshop hoặc web tạo bill giả sắc nét, hứa gửi kèm tiền hoa hồng nhỏ, hối thúc chuyển gấp sang STK người lạ.'
      advice = [
        'Chỉ tin vào thông báo biến động số dư trong chính app ngân hàng của bạn, KHÔNG tin ảnh chụp bill.',
        'Gọi ngay cuộc gọi thoại SIM (sóng viễn thông) vào số cũ đã lưu của bạn bè để xác thực nick có bị hack hay không.',
      ]
    }
    // Rule 5: Safe message check
    else if (
      lower.includes('trà sữa') ||
      lower.includes('đi học') ||
      lower.includes('bài tập') ||
      lower.includes('mai tan học') ||
      lower.includes('đá bóng')
    ) {
      score = 5
      scenario = 'Tin nhắn trao đổi học tập / bạn bè thông thường'
      tricks = 'Không phát hiện yếu tố thao túng tâm lý độc hại.'
      tactics = 'Nội dung giao tiếp bình thường giữa bạn bè hoặc người thân.'
      advice = [
        'Tin nhắn an toàn, không có dấu hiệu lừa đảo.',
        'Vẫn giữ thói quen bảo vệ thông tin mật và mật khẩu cá nhân.',
      ]
    } else {
      score = 45
      scenario = 'Nội dung chưa đủ dữ liệu xác định kịch bản cụ thể'
      detected.push('Cần kiểm tra kỹ nguồn gốc người gửi')
      tricks = 'Cảnh giác với các tin nhắn từ người lạ trên mạng xã hội.'
      tactics = 'Nội dung ngắn hoặc không chứa từ khóa lừa đảo rõ ràng.'
      advice = [
        'Không chuyển tiền hay cung cấp mã OTP/mật khẩu cho bất kỳ ai.',
        'Hỏi ý kiến cha mẹ hoặc thầy cô nếu cảm thấy nghi ngờ.',
      ]
    }

    if (detected.length === 0 && score > 20) {
      detected.push('Dấu hiệu hối thúc bất thường')
    }

    let riskLevel: AnalysisResult['riskLevel'] = 'CỰC KỲ NGUY HIỂM'
    if (score < 20) riskLevel = 'AN TOÀN'
    else if (score < 60) riskLevel = 'CẢNH GIÁC'
    else if (score < 80) riskLevel = 'NGUY CƠ CAO'

    return {
      scamScore: score,
      riskLevel,
      detectedKeywords: detected,
      matchedScenario: scenario,
      summary: `Cảnh báo nguy cơ lừa đảo ${score}% - Phát hiện các từ khóa rủi ro: [${detected.join('], [')}]`,
      psychologicalTricks: tricks,
      tacticsAnalysis: tactics,
      urgentAdvice: advice,
    }
  }

  // Call Gemini API if key is present
  const analyzeWithGemini = async (text: string, key: string): Promise<AnalysisResult> => {
    const prompt = `Bạn là Trợ lý ảo AI "Cảnh Vệ Số" - chuyên gia an ninh mạng bảo vệ học sinh, thanh thiếu niên trước các thủ đoạn lừa đảo tại Việt Nam.
Hãy phân tích đoạn tin nhắn tuyển dụng hoặc rủ rê sau đây:
"""${text}"""

YÊU CẦU: Trả về kết quả hoàn toàn bằng cú pháp JSON hợp lệ, KHÔNG sử dụng markdown format hay giải thích thêm ngoài JSON:
{
  "scamScore": number, // từ 0 đến 100
  "riskLevel": "CỰC KỲ NGUY HIỂM" | "NGUY CƠ CAO" | "CẢNH GIÁC" | "AN TOÀN",
  "detectedKeywords": ["Từ khóa rủi ro 1", "Từ khóa rủi ro 2", "Từ khóa rủi ro 3"],
  "matchedScenario": "Tên kịch bản lừa đảo đối chiếu cụ thể",
  "summary": "Cảnh báo nguy cơ lừa đảo X% - Phát hiện các từ khóa rủi ro: [Từ khóa 1], [Từ khóa 2]",
  "psychologicalTricks": "Mô tả đòn bẫy thao túng tâm lý mà kẻ gian đang sử dụng",
  "tacticsAnalysis": "Phân tích bóc trần chiêu trò thủ đoạn",
  "urgentAdvice": ["Lời khuyên khẩn cấp 1", "Lời khuyên khẩn cấp 2", "Lời khuyên khẩn cấp 3"]
}`

    const first = FIXED_MODEL
    const chain = [first]
    const errors: string[] = []

    for (const model of chain) {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), 20000)
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { responseMimeType: 'application/json' },
            }),
            signal: controller.signal,
          },
        )

        if (!res.ok) {
          const err = await res.json().catch(() => ({}))
          const msg = err?.error?.message || `Mã lỗi ${res.status}`
          errors.push(`[${model}] ${msg}`)
          // Sai khóa / bị chặn thì thử model khác cũng vô ích
          if (res.status === 401 || res.status === 403) break
          continue
        }

        const data = await res.json()
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text
        if (!rawText) {
          errors.push(`[${model}] Không có dữ liệu phản hồi`)
          continue
        }

        const cleaned = String(rawText)
          .replace(/^\s*```(?:json)?/i, '')
          .replace(/```\s*$/, '')
          .trim()
        const parsed = JSON.parse(cleaned) as AnalysisResult
        if (typeof parsed.scamScore !== 'number') {
          errors.push(`[${model}] Dữ liệu sai định dạng`)
          continue
        }
        parsed.detectedKeywords ??= []
        parsed.urgentAdvice ??= []
        if (model !== selectedModel) {
          setSelectedModel(model)
          localStorage.setItem('gemini_model', model)
        }
        return parsed
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          errors.push(`[${model}] quá 20 giây không phản hồi`)
        } else {
          errors.push(`[${model}] ${err instanceof Error ? err.message : String(err)}`)
        }
      } finally {
        clearTimeout(timer)
      }
    }

    throw new Error(errors.join(' | '))
  }

  const handleAnalyze = async () => {
    if (!message.trim()) {
      setErrorMsg('Vui lòng dán hoặc nhập nội dung tin nhắn cần phân tích.')
      return
    }
    setErrorMsg('')
    setLoading(true)

    try {
      if (apiKey.trim()) {
        const geminiRes = await analyzeWithGemini(message, apiKey.trim())
        setResult(geminiRes)
      } else {
        // Fallback to high-accuracy built-in scanner
        await new Promise((r) => setTimeout(r, 600)) // smooth scanning effect
        const res = analyzeWithHeuristics(message)
        setResult(res)
      }
    } catch (err: unknown) {
      console.warn('Gemini API call failed, falling back to heuristic engine:', err)
      const res = analyzeWithHeuristics(message)
      setResult(res)
      const detail = err instanceof Error ? err.message : String(err)
      setErrorMsg(
        `Gemini API lỗi nên đã dùng Động cơ Cảnh Vệ Số tích hợp. Chi tiết lỗi từ Google: ${detail}`,
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header section */}
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/60">
            🤖 Mục 3: Trợ Lý Ảo AI · Phòng Vệ Thông Minh
          </div>
          <h1 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl flex items-center gap-2.5">
            <span>Trợ lý ảo AI "Cảnh Vệ Số"</span>
            <span className="rounded-full bg-indigo-600 px-2.5 py-0.5 text-xs font-bold text-white uppercase tracking-wider">
              Gemini 3.5 Flash-Lite
            </span>
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Học sinh có thể copy/paste đoạn tin nhắn tuyển dụng hoặc rủ rê làm "việc nhẹ lương cao" vào khung chat. AI sẽ phân tích các từ khóa, đối chiếu kịch bản lừa đảo và cảnh báo mức độ rủi ro ngay lập tức.
          </p>
        </div>

        {/* API Key configuration & Test Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              if (!apiKey) {
                setShowKeyModal(true)
                setKeyTestStatus({
                  success: false,
                  message: 'Chưa cài đặt API Key. Vui lòng nhập khóa Gemini API trước khi kiểm tra.',
                })
              } else {
                handleTestKey(apiKey)
              }
            }}
            disabled={testingKey}
            className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3.5 py-2 text-xs font-bold shadow-xs transition active:scale-95 disabled:opacity-50"
            title="Kiểm tra kết nối trực tiếp đến Google Gemini API"
          >
            <span>{testingKey ? '⏳' : '🧪'}</span>
            <span>{testingKey ? 'Đang kiểm tra...' : 'Kiểm tra API Key'}</span>
          </button>

          <button
            onClick={() => {
              setKeyTestStatus(null)
              setInputKey(apiKey)
              setShowKeyModal(true)
            }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition active:scale-95"
          >
            <span>🔑</span>
            <span>{apiKey ? 'API Key: Đã kết nối' : 'Cài đặt Gemini API'}</span>
          </button>
        </div>
      </div>

      {/* Test status banner on main page */}
      {keyTestStatus && !showKeyModal && (
        <div
          className={`mt-4 rounded-2xl p-4 text-xs sm:text-sm font-medium flex items-center justify-between gap-3 border shadow-xs animate-in fade-in duration-200 ${
            keyTestStatus.success
              ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
              : 'bg-rose-50 text-rose-900 border-rose-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="text-base shrink-0">{keyTestStatus.success ? '✅' : '❌'}</span>
            <span>{keyTestStatus.message}</span>
          </div>
          <button
            onClick={() => setKeyTestStatus(null)}
            className="text-slate-400 hover:text-slate-600 font-bold px-2 py-1 shrink-0"
            title="Đóng thông báo"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Input Section */}
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xs">
        {/* Quick Sample Presets */}
        <div className="mb-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
            <span>⚡ Mẫu tin nhắn thử nghiệm nhanh:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_MESSAGES.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setMessage(sample.text)
                  setResult(null)
                  setErrorMsg('')
                }}
                className="rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition active:scale-95"
              >
                {sample.title}
              </button>
            ))}
          </div>
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Dán hoặc nhập nội dung tin nhắn tuyển dụng, rủ rê việc làm lạ, tin nhắn nhờ chuyển tiền... vào đây để AI phân tích..."
            className="w-full rounded-2xl border border-slate-300 p-4 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-600 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 leading-relaxed font-sans"
          />
          {message && (
            <button
              onClick={() => {
                setMessage('')
                setResult(null)
                setErrorMsg('')
              }}
              className="absolute right-3 top-3 rounded-lg bg-slate-100 hover:bg-slate-200 px-2 py-1 text-xs text-slate-500"
            >
              Xóa nội dung
            </button>
          )}
        </div>

        {errorMsg && (
          <div className="mt-3 rounded-xl bg-amber-50 p-3 text-xs text-amber-800 border border-amber-200 flex items-center gap-2">
            <span>ℹ️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            🛡️ Bảo vệ dữ liệu cá nhân: Tin nhắn chỉ được dùng để phân tích bảo mật tức thì.
          </div>
          <button
            disabled={loading}
            onClick={handleAnalyze}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-3.5 text-sm font-extrabold text-white shadow-md hover:from-blue-500 hover:to-purple-500 transition active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>AI đang quét & phân tích...</span>
              </>
            ) : (
              <>
                <span>🔍 Phân tích rủi ro lừa đảo ngay</span>
                <span>→</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Result Display */}
      {result && (
        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl transition-all">
          {/* Top Banner Alert */}
          <div
            className={`p-6 sm:p-7 text-white ${
              result.scamScore >= 80
                ? 'bg-gradient-to-r from-red-600 to-rose-700'
                : result.scamScore >= 50
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-700'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-extrabold tracking-wide uppercase">
                  {result.scamScore >= 80 ? '🚨' : result.scamScore >= 50 ? '⚠️' : '✅'}{' '}
                  {result.riskLevel}
                </span>
                <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  Cảnh báo nguy cơ lừa đảo {result.scamScore}%
                </h2>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium opacity-95">
                  <span>Phát hiện các từ khóa rủi ro:</span>
                  {result.detectedKeywords.map((kw, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg bg-black/25 px-2.5 py-0.5 font-bold text-yellow-200 border border-white/20"
                    >
                      [{kw}]
                    </span>
                  ))}
                </div>
              </div>

              {/* Big Score Gauge */}
              <div className="flex flex-col items-center justify-center shrink-0 rounded-2xl bg-white/15 p-4 backdrop-blur-sm border border-white/20 min-w-28 text-center">
                <span className="text-3xl sm:text-4xl font-black">{result.scamScore}%</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider opacity-85">
                  Chỉ số rủi ro
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Matched Scenario */}
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/80">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                🎯 Kịch bản lừa đảo đối chiếu:
              </div>
              <div className="mt-1 text-base font-extrabold text-slate-900">
                {result.matchedScenario}
              </div>
            </div>

            {/* Psychological Tricks */}
            <div className="rounded-2xl bg-rose-50/70 p-4 border border-rose-100">
              <div className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                <span>🧠 Đòn bẫy thao túng tâm lý:</span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-slate-800 leading-relaxed">
                {result.psychologicalTricks}
              </p>
            </div>

            {/* Tactics Analysis */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                🎭 Phân tích bóc trần chiêu trò:
              </div>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/60 p-4 rounded-xl border border-slate-100">
                {result.tacticsAnalysis}
              </p>
            </div>

            {/* Urgent Advice */}
            <div className="rounded-2xl bg-emerald-50/80 p-5 border border-emerald-200/80">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                <span>🛡️ Lời khuyên & Biện pháp phòng vệ khẩn cấp:</span>
              </div>
              <ul className="mt-2.5 space-y-2 text-xs sm:text-sm text-emerald-950 font-medium">
                {result.urgentAdvice.map((adv, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold text-emerald-600 shrink-0">✓</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Gemini API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>🔑 Cài đặt Gemini API Key</span>
              </h3>
              <button
                onClick={() => setShowKeyModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed">
                Hệ thống mặc định đã tích hợp sẵn AI Cảnh Vệ Số có thể quét ngay lập tức. Nếu bạn có <strong>Google Gemini API Key</strong> riêng, hãy dán vào đây để kích hoạt mô hình <strong>Gemini 3.5 Flash-Lite</strong>.
              </p>

              <div className="rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-800">
                Mô hình sử dụng: Gemini 3.5 Flash-Lite <span className="font-mono font-normal text-indigo-600">({FIXED_MODEL})</span>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Gemini API Key:
                </label>
                <div className="mt-1 flex gap-2">
                  <input
                    type="password"
                    value={inputKey}
                    onChange={(e) => {
                      setInputKey(e.target.value)
                      setKeyTestStatus(null)
                    }}
                    placeholder="AIzaSy..."
                    className="flex-1 rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => handleTestKey(inputKey)}
                    disabled={testingKey || !inputKey.trim()}
                    className="shrink-0 inline-flex items-center gap-1 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 px-3.5 py-2 text-xs font-bold transition active:scale-95 disabled:opacity-40"
                    title="Kiểm tra khóa API trực tiếp"
                  >
                    <span>{testingKey ? '⏳' : '🧪'}</span>
                    <span>{testingKey ? 'Đang test...' : 'Kiểm tra'}</span>
                  </button>
                </div>
              </div>

              {/* In-modal test feedback */}
              {keyTestStatus && (
                <div
                  className={`rounded-xl p-3 text-xs font-medium border leading-relaxed animate-in fade-in duration-150 ${
                    keyTestStatus.success
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                      : 'bg-rose-50 text-rose-900 border-rose-200'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="shrink-0 text-sm">{keyTestStatus.success ? '✅' : '❌'}</span>
                    <span className="flex-1">{keyTestStatus.message}</span>
                  </div>
                </div>
              )}

              <div className="text-[11px] text-slate-400">
                Chưa có khóa API? Lấy khóa miễn phí tại{' '}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline font-semibold"
                >
                  Google AI Studio
                </a>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
              <button
                onClick={() => {
                  setInputKey('')
                  localStorage.removeItem('gemini_api_key')
                  setApiKey('')
                  setShowKeyModal(false)
                }}
                className="rounded-xl px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700"
              >
                Xóa Key
              </button>
              <button
                onClick={handleSaveKey}
                className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-slate-800"
              >
                Lưu cài đặt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
