import { useState } from 'react'

type ScamTopic = {
  id: string
  scenarioId: string
  title: string
  subtitle: string
  category: string
  icon: string
  dangerLevel: 'Cực kỳ nguy hiểm' | 'Đặc biệt nghiêm trọng' | 'Nguy cơ cao'
  badgeColor: string
  avatar: string
  summary: string
  tactics: string[]
  psychology: string
  redFlags: string[]
  defense: string[]
  quote: string
}

const TOPICS: ScamTopic[] = [
  {
    id: 'fake-bill',
    scenarioId: 'sc1-messenger',
    title: 'Bẫy "Fake Bill Biến Động Số Dư" & Chiếm Đoạt Nick',
    subtitle: 'Lừa chuyển tiền hộ qua biên lai ngân hàng Photoshop',
    category: 'Gian lận tài chính & Hack tài khoản',
    icon: '💳',
    dangerLevel: 'Nguy cơ cao',
    badgeColor: 'bg-blue-600',
    avatar: 'images/avatar_minh_anh.jpg',
    summary: 'Kẻ gian hack tài khoản mạng xã hội của bạn bè/người thân, chủ động trò chuyện tự nhiên rồi nhờ nhận và chuyển hộ tiền mua hàng vì app ngân hàng bị nghẽn hạn mức. Kẻ lừa đảo gửi biên lai Napas 24/7 giả mạo để ép nạn nhân chuyển tiền thật.',
    tactics: [
      'Dùng công cụ trực tuyến tạo bill chuyển khoản ngân hàng giả (Fake Bill) có đầy đủ tên, số tài khoản của nạn nhân trong 10 giây.',
      'Lấy cớ lỗi mạng liên ngân hàng Napas, nghẽn đường truyền cuối tuần để giải thích vì sao tiền chưa vào tài khoản.',
      'Tặng kèm hoa hồng nhỏ (500k - 1 triệu hoặc tiền trà sữa) để kích thích lòng tham và làm mờ sự cảnh giác.',
      'Tài khoản thụ hưởng chuyển đi là tài khoản "rác" đứng tên người lạ.',
    ],
    psychology: 'Lợi dụng tình bạn, sự tin tưởng thân thiết giữa bạn bè và lòng tham số tiền hoa hồng nhỏ để nạn nhân vội vàng ra quyết định mà không kiểm tra số dư thực tế.',
    redFlags: [
      'Số dư trong ứng dụng ngân hàng thực tế CHƯA TĂNG, chỉ có ảnh chụp màn hình gửi qua tin nhắn.',
      'Người nhận tiền không phải người quen mà là tài khoản cá nhân hoàn toàn xa lạ.',
      'Liên tục hối thúc chuyển gấp vì "sắp bị hủy đơn hàng/mất cọc".',
    ],
    defense: [
      'Quy tắc vàng: Chỉ tin vào thông báo biến động số dư trong chính app ngân hàng của bạn, KHÔNG BAO GIỜ tin ảnh chụp biên lai gửi qua chat.',
      'Ngay lập tức gọi điện thoại truyền thống (qua sóng SIM) vào số cũ đã lưu của bạn bè để kiểm chứng danh tính.',
      'Bật bảo mật 2 lớp (2FA) cho tất cả tài khoản mạng xã hội để tránh bị hack nick.',
    ],
    quote: '"Tiền chưa nổi trong app thì 100% là chưa chuyển, dù biên lai có sắc nét đến đâu!"',
  },
  {
    id: 'deepfake-call',
    scenarioId: 'sc2-deepfake-call',
    title: 'Deepfake AI Video Call & Bẫy Cảm Xúc "Viện Phí Cấp Cứu"',
    subtitle: 'Ghép mặt giọng nói người thân đòi tiền mổ khẩn cấp',
    category: 'Trí tuệ nhân tạo (AI) Deepfake',
    icon: '🎭',
    dangerLevel: 'Đặc biệt nghiêm trọng',
    badgeColor: 'bg-rose-600',
    avatar: 'images/avatar_chu_tuan.jpg',
    summary: 'Kẻ lừa đảo sử dụng công nghệ Deepfake AI hoán đổi khuôn mặt và bắt chước giọng nói của người thân để gọi video call 3-5 giây. Sau đó dập máy lấy cớ sóng yếu, nhắn tin dồn dập báo người nhà bị tai nạn nguy kịch đang chờ mổ để ép chuyển viện phí.',
    tactics: [
      'Thu thập video, hình ảnh và giọng nói của người thân trên mạng xã hội để train mô hình Deepfake.',
      'Chỉ gọi video 3-5 giây với hình ảnh giật méo rồi cúp máy ngay nhằm tránh bị phát hiện lỗi khẩu hình của AI.',
      'Dựng kịch bản tai nạn giao thông chấn thương sọ não, gửi phiếu viện phí giả mạo có dấu đỏ.',
      'Cấm gọi lại điện thoại với lý do "nội quy phòng cấp cứu ICU cấm nghe máy".',
      'Yêu cầu nộp tiền vào số tài khoản cá nhân của "bác sĩ trực" hoặc "kế toán viện".',
    ],
    psychology: 'Kích hoạt nỗi sợ hãi tột cùng về sinh mạng người thân, khiến nạn nhân hoảng loạn, tê liệt khả năng tư duy logic và sẵn sàng dốc hết tiền tiết kiệm để cứu người.',
    redFlags: [
      'Cuộc gọi video ngắn bất thường, hình ảnh rung nhòe, cử động miệng không khớp âm thanh.',
      'Cấm gọi điện thoại kiểm tra, dặn giấu người nhà (sợ bố mẹ cao huyết áp ngất).',
      'Viện phí nhưng bắt chuyển vào tài khoản cá nhân trôi nổi.',
    ],
    defense: [
      'Cúp máy ngay và gọi trực tiếp vào số SIM di động của người thân hoặc các thành viên khác trong gia đình.',
      'Hỏi "câu hỏi bí mật" mà chỉ người trong nhà mới biết (tên thú cưng, kỷ niệm gia đình).',
      'Gọi trực tiếp tới số tổng đài chính thức của bệnh viện để tra cứu danh sách bệnh nhân cấp cứu.',
      'Lưu ý: Bệnh viện công lập luôn ưu tiên cứu chữa tính mạng trước, không bao giờ vì chưa có tiền tài khoản cá nhân mà bỏ mặc bệnh nhân.',
    ],
    quote: '"Càng hoảng loạn kẻ gian càng dễ dắt mũi. Hãy hít sâu 3 giây và bấm gọi số SIM kiểm chứng!"',
  },
  {
    id: 'task-scam',
    scenarioId: 'sc3-tiktok-job',
    title: 'Bẫy CTV Nhiệm Vụ Ảo Telegram & "Chi Phí Chìm"',
    subtitle: 'Thả thính tiền thật, lôi kéo vào nhóm VIP rồi đóng băng tiền',
    category: 'Lừa đảo nhiệm vụ & Thao túng chi phí chìm',
    icon: '📈',
    dangerLevel: 'Đặc biệt nghiêm trọng',
    badgeColor: 'bg-amber-600',
    avatar: 'images/avatar_thu_trang.jpg',
    summary: 'Dụ dỗ học sinh làm CTV thả tim video hoặc đánh giá sản phẩm. Ban đầu chuyển khoản thật 30.000đ - 50.000đ để tạo niềm tin tuyệt đối, sau đó mời vào nhóm VIP Telegram và tung chiêu "sai cú pháp đóng băng tiền" để ép nạp tiền chuộc ngày càng lớn.',
    tactics: [
      'Dùng chiêu "thả con săn sắt": Chuyển khoản thật số tiền nhỏ ban đầu để nạn nhân tin là uy tín 100%.',
      'Lôi kéo vào nhóm chat Telegram có sẵn hàng chục nick "chim mồi" (shills) liên tục khoe bill tiền về chục triệu.',
      'Yêu cầu nạp đơn hàng trên trang web giả mạo do chúng tự lập trình (tên miền .vip, .cc).',
      'Dàn cảnh "Lỗi cú pháp mã giao dịch", thông báo tiền bị treo tại cổng thanh toán.',
      'Ép nạp bù lệnh gấp 2, gấp 5 lần trong vòng 10-15 phút để cứu lại số tiền trước đó.',
    ],
    psychology: 'Đánh vào Bẫy chi phí chìm (Sunk Cost Fallacy): Vì tiếc số tiền vài trăm nghìn đã nạp, nạn nhân cắn răng vay mượn hàng triệu, hàng chục triệu với hy vọng lấy lại được vốn.',
    redFlags: [
      'Việc làm đơn giản (thả tim, like video) nhưng cam kết thu nhập 300k - 1 triệu/ngày.',
      'Nhóm Telegram chặn tin nhắn của thành viên, chỉ có vài tài khoản liên tục tung hứng.',
      'Bắt đóng tiền/nạp tiền trước để làm nhiệm vụ.',
      'Cái cớ "sai cú pháp", "lỗi hệ thống" và đe dọa mất tiền nếu không nạp bù ngay.',
    ],
    defense: [
      'Quy tắc bất biến: BẤT KỲ CÔNG VIỆC NÀO YÊU CẦU NẠP TIỀN TRƯỚC = 100% LỪA ĐẢO.',
      'Dũng cảm cắt lỗ: Nhận diện bẫy ngay khi bị báo lỗi và dừng lại, tuyệt đối không nạp thêm một xu nào.',
      'Rời nhóm Telegram, chặn tài khoản và cảnh báo cho bạn bè cùng biết.',
    ],
    quote: '"Khoản tiền nạp vào bẫy nhiệm vụ sẽ không bao giờ rút ra được. Dừng lại sớm là giữ được tiền!"',
  },
  {
    id: 'fake-app',
    scenarioId: 'sc4-fake-app',
    title: 'Mạo Danh Công An / Đề Án 06 & Mã Độc Chiếm Quyền Trợ Năng',
    subtitle: 'Dọa hủy thi tốt nghiệp, dụ cài file APK đánh cắp tài khoản ngân hàng',
    category: 'Mã độc di động & Tấn công phi kỹ thuật',
    icon: '🛡️',
    dangerLevel: 'Cực kỳ nguy hiểm',
    badgeColor: 'bg-emerald-700',
    avatar: 'images/avatar_can_bo_bca.jpg',
    summary: 'Tự xưng cán bộ Đề án 06 Bộ Công An thông báo hồ sơ định danh sinh trắc học VNeID của học sinh bị lệch năm sinh, đe dọa hủy tư cách thi chuyển cấp/tốt nghiệp. Hướng dẫn tải file APK giả mạo và lừa bật quyền Trợ năng (Accessibility) để chiếm quyền điều khiển điện thoại từ xa.',
    tactics: [
      'Gửi công văn hỏa tốc có Quốc huy, tiêu ngữ và dấu đỏ scan giả mạo.',
      'Đe dọa khóa mã dự thi tốt nghiệp nếu không cập nhật trước mốc giờ nhất định (ép thời gian trong ngày).',
      'Gửi link tải file cài đặt CongDichVuCong_v2.apk từ tên miền rác .vip.',
      'Dụ bật quyền Trợ năng (Accessibility Service) và Đọc SMS với lý do "để AI của Bộ Công an quét mặt đồng bộ".',
      'Sau khi bật, mã độc làm tối màn hình nạn nhân, âm thầm mở app ngân hàng, đọc trộm mã OTP và vét sạch tiền.',
    ],
    psychology: 'Lợi dụng tâm lý sợ hãi bị kỷ luật, sợ bị đình chỉ thi và uy quyền của lực lượng công an để ép nạn nhân tuân lệnh một cách mù quáng.',
    redFlags: [
      'Công an KHÔNG BAO GIỜ làm việc hoặc yêu cầu chỉnh sửa hồ sơ qua tin nhắn Zalo cá nhân.',
      'Đường link có đuôi lạ (.vip, .cc, .top) thay vì tên miền chuẩn của cơ quan nhà nước (.gov.vn).',
      'Bắt tải file .apk cài ngoài kho ứng dụng Google Play / App Store.',
      'Đòi cấp quyền "Trợ năng" (Accessibility) - quyền kiểm soát tối cao của hệ điều hành Android.',
    ],
    defense: [
      'Mọi thông tin chỉnh sửa dữ liệu dân cư BẮT BUỘC phải ra trực tiếp trụ sở Công an Phường/Xã.',
      'Tuyệt đối KHÔNG cài đặt bất kỳ file .apk nào được gửi qua tin nhắn mạng xã hội.',
      'Nếu lỡ cài đặt: Lập tức ngắt kết nối Wi-Fi/4G, tắt nguồn điện thoại, dùng máy khác đổi mật khẩu ngân hàng và ra trung tâm bảo hành khôi phục cài đặt gốc.',
    ],
    quote: '"Cơ quan nhà nước chỉ tiếp dân tại trụ sở. Không ai hướng dẫn cập nhật định danh qua Zalo!"',
  },
  {
    id: 'border-job',
    scenarioId: 'sc5-abroad-job',
    title: 'Bẫy Việc Làm "CSKH Mộc Bài" & Cạm Bẫy Buôn Người',
    subtitle: 'Vỏ bọc KCN Tây Ninh, xe đón đêm đưa thẳng qua biên giới sòng bạc',
    category: 'Mua bán người & Cưỡng bức lao động',
    icon: '🚨',
    dangerLevel: 'Cực kỳ nguy hiểm',
    badgeColor: 'bg-purple-700',
    avatar: 'images/avatar_hoang_long.jpg',
    summary: 'Đăng tin tuyển dụng nhân viên văn phòng trực chat game online tại Khu kinh tế Cửa khẩu Mộc Bài - Tây Ninh với lương 18-25 triệu/tháng, bao ăn ở máy lạnh. Thực chất hẹn xe 16 chỗ đón đêm để chở thẳng nạn nhân qua đường tiểu ngạch sang các sòng bạc Campuchia để giam giữ, tra tấn và tống tiền chuộc.',
    tactics: [
      'Ngụy trang địa điểm làm việc tại các KCN giáp ranh biên giới (Mộc Bài, Long An, Bình Phước) để nạn nhân không phòng bị.',
      'Hứa hẹn mức lương 18 - 25 triệu/tháng chỉ để ngồi máy lạnh gõ phím, cam kết "thử việc 2 ngày không thích thì về".',
      'Hẹn xe đón ban đêm (21h - 22h) bằng xe 16 chỗ kính tối màu tại các bến xe hoặc cây xăng vắng.',
      'Dặn dứt khoát KHÔNG ĐƯỢC kể cho bố mẹ, bạn bè (lấy cớ suất tuyển nội bộ).',
      'Yêu cầu mang theo CCCD gốc: ngay khi lên xe hoặc qua biên giới sẽ bị tịch thu toàn bộ giấy tờ và điện thoại.',
    ],
    psychology: 'Đánh trúng khao khát kiếm tiền nhanh của học sinh mới tốt nghiệp, thiếu kiến thức xã hội và dễ bị dụ dỗ bởi chiêu bài "việc nhẹ lương cao - bao trọn gói".',
    redFlags: [
      'Công việc lao động phổ thông, không bằng cấp nhưng trả lương cao hơn cả cử nhân đại học.',
      'Không có hợp đồng lao động, không có số nhà trụ sở rõ ràng tại Việt Nam.',
      'Dặn dò giấu giếm gia đình, hẹn đón ban đêm tại các điểm gom người bất thường.',
    ],
    defense: [
      'Luôn chia sẻ mọi thông tin tìm việc làm xa với cha mẹ, người thân đáng tin cậy.',
      'Tuyệt đối KHÔNG BAO GIỜ bước chân lên các chuyến xe đưa đón ban đêm không rõ pháp nhân.',
      'Tra cứu tính pháp lý của doanh nghiệp tại Sở Lao động - Thương binh & Xã hội.',
      'Gọi ngay cho Cảnh sát Hình sự hoặc Tổng đài Quốc gia Bảo vệ Trẻ em 111 khi phát hiện dấu hiệu dụ dỗ vượt biên.',
    ],
    quote: '"Không có chiếc bánh vẽ nào miễn phí ở biên giới. Lời dặn giấu gia đình chính là sợi dây trói buôn người!"',
  },
]

export default function Handbook({ onStartGame, onPickScenario }: { onStartGame: () => void; onPickScenario: (id: string) => void }) {
  const [selectedTopic, setSelectedTopic] = useState<ScamTopic>(TOPICS[0])
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = TOPICS.filter((t) =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.summary.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 text-white shadow-xl sm:p-10 border border-slate-800">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-3.5 py-1 text-xs font-semibold text-indigo-300 border border-indigo-400/30">
            📖 Mục 1: Cẩm Nang Phòng Thủ Không Gian Mạng
          </div>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl text-white">
            Sổ tay số "Giải mã Ma Trận"
          </h1>
          <div className="mt-1 text-base sm:text-lg font-semibold text-indigo-200">
            Nhận diện các hình thức lừa đảo phổ biến
          </div>
          <p className="mt-2 text-sm text-slate-300 sm:text-base leading-relaxed">
            Nhận diện chuyên sâu 5 phương thức lừa đảo trực tuyến tinh vi nhất tại Việt Nam hiện nay. Nắm bắt tâm lý tội phạm, vạch trần các đòn thao túng và trang bị lá chắn số an toàn.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onStartGame}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg transition hover:from-blue-500 hover:to-indigo-500 active:scale-95"
            >
              <span>🎮 Trải nghiệm thực tế với trò chơi Tàn Ảo</span>
              <span>→</span>
            </button>
            <span className="text-xs text-slate-400">
              ⚡ Mô phỏng thực tế 100% tình huống thực chiến
            </span>
          </div>
        </div>

        {/* Decorative background element */}
        <div className="pointer-events-none absolute -right-10 -bottom-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="pointer-events-none absolute right-20 top-10 text-8xl opacity-10">
          🛡️
        </div>
      </div>

      {/* Pocket Rules: 3 KHÔNG - 2 PHẢI */}
      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/80 p-5 shadow-xs">
        <div className="flex items-center gap-2 font-bold text-amber-900 text-sm sm:text-base">
          <span>⚡ CẨM NANG BỎ TÚI: NGUYÊN TẮC "3 KHÔNG - 2 PHẢI" ĐỂ KHÔNG BAO GIỜ BỊ LỪA</span>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 text-xs text-slate-800">
          <div className="rounded-xl bg-white p-3 border border-amber-200/60 shadow-xs">
            <div className="font-bold text-red-600 flex items-center gap-1">❌ 1. KHÔNG VỘI VÀNG</div>
            <p className="mt-1 text-slate-600">Trước mọi tin nhắn hối thúc hay dọa dẫm, hãy dừng lại ít nhất 5 phút để suy nghĩ.</p>
          </div>
          <div className="rounded-xl bg-white p-3 border border-amber-200/60 shadow-xs">
            <div className="font-bold text-red-600 flex items-center gap-1">❌ 2. KHÔNG NẠP TIỀN</div>
            <p className="mt-1 text-slate-600">Bất kỳ việc làm online hay nhận quà nào bắt đóng tiền cọc/phí trước đều là bẫy lừa đảo.</p>
          </div>
          <div className="rounded-xl bg-white p-3 border border-amber-200/60 shadow-xs">
            <div className="font-bold text-red-600 flex items-center gap-1">❌ 3. KHÔNG TẢI FILE LẠ</div>
            <p className="mt-1 text-slate-600">Tuyệt đối không cài file .apk ngoài kho ứng dụng và không bật quyền Trợ năng (Accessibility).</p>
          </div>
          <div className="rounded-xl bg-white p-3 border border-amber-200/60 shadow-xs">
            <div className="font-bold text-emerald-700 flex items-center gap-1">✅ 4. PHẢI GỌI SIM XÁC MINH</div>
            <p className="mt-1 text-slate-600">Luôn dùng cuộc gọi di động truyền thống để kiểm chứng danh tính người thân/bạn bè.</p>
          </div>
          <div className="rounded-xl bg-white p-3 border border-amber-200/60 shadow-xs">
            <div className="font-bold text-emerald-700 flex items-center gap-1">✅ 5. PHẢI HỎI NGƯỜI LỚN</div>
            <p className="mt-1 text-slate-600">Tâm sự ngay với cha mẹ, thầy cô trước mọi vấn đề liên quan đến tiền bạc hay đi xa.</p>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Left Sidebar + Right Reader */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Navigation: List of scam topics */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Danh sách chiêu trò ({filtered.length})
            </h2>
          </div>

          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="🔍 Tìm kiếm chiêu trò lừa đảo..."
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 shadow-xs focus:border-indigo-500 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          <div className="space-y-2">
            {filtered.map((topic, i) => {
              const active = selectedTopic.id === topic.id
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className={`w-full text-left rounded-2xl border p-4 transition-all duration-200 flex items-start gap-3.5 ${
                    active
                      ? 'border-indigo-600 bg-white shadow-md ring-2 ring-indigo-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 shadow-xs'
                  }`}
                >
                  <img
                    src={topic.avatar}
                    alt={topic.title}
                    className="h-12 w-12 rounded-full object-cover shrink-0 border border-slate-200 shadow-xs"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                      <span>{topic.icon}</span>
                      <span className="truncate">{topic.category}</span>
                    </div>
                    <h3 className={`mt-0.5 font-bold text-sm leading-snug ${active ? 'text-indigo-900' : 'text-slate-900'}`}>
                      {i + 1}. {topic.title}
                    </h3>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold text-white ${topic.badgeColor}`}>
                        {topic.dangerLevel}
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Reader: Deep Dive into Selected Topic */}
        <div className="lg:col-span-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            {/* Header info */}
            <div className="border-b border-slate-100 pb-5">
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold text-white ${selectedTopic.badgeColor}`}>
                  {selectedTopic.dangerLevel}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Phân loại: {selectedTopic.category}
                </span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {selectedTopic.title}
              </h2>
              <p className="mt-1 text-sm font-medium text-indigo-600">
                {selectedTopic.subtitle}
              </p>
            </div>

            {/* Quick summary & Quote */}
            <div className="mt-5 space-y-4">
              <p className="text-sm text-slate-700 leading-relaxed font-normal bg-slate-50 p-4 rounded-xl border border-slate-100">
                {selectedTopic.summary}
              </p>

              <blockquote className="rounded-xl border-l-4 border-indigo-600 bg-indigo-50/50 p-3.5 text-xs italic font-semibold text-indigo-950">
                {selectedTopic.quote}
              </blockquote>
            </div>

            {/* Psychological manipulation */}
            <div className="mt-6">
              <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wide text-slate-800">
                <span>🧠 Đòn bẫy tâm lý của tội phạm</span>
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed bg-rose-50/70 p-3.5 rounded-xl border border-rose-100 text-rose-950">
                {selectedTopic.psychology}
              </p>
            </div>

            {/* Common Tactics */}
            <div className="mt-6">
              <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wide text-slate-800">
                <span>🎭 Thủ đoạn kịch bản thường gặp</span>
              </h4>
              <ul className="mt-2.5 space-y-2 text-xs sm:text-sm text-slate-700">
                {selectedTopic.tactics.map((tac, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-200 text-[11px] font-bold text-slate-700 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{tac}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Red Flags Signs */}
            <div className="mt-6">
              <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wide text-red-700">
                <span>🚩 Dấu hiệu nhận biết (Red Flags)</span>
              </h4>
              <div className="mt-2.5 space-y-2">
                {selectedTopic.redFlags.map((flag, idx) => (
                  <div key={idx} className="flex items-start gap-2 rounded-xl bg-red-50/80 p-3 text-xs sm:text-sm text-red-900 border border-red-100">
                    <span className="shrink-0 font-bold text-red-600">⚠️</span>
                    <span>{flag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Defense Strategy */}
            <div className="mt-6">
              <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wide text-emerald-700">
                <span>🛡️ Biện pháp phòng vệ chuẩn mực</span>
              </h4>
              <div className="mt-2.5 space-y-2">
                {selectedTopic.defense.map((def, idx) => (
                  <div key={idx} className="flex items-start gap-2 rounded-xl bg-emerald-50/80 p-3 text-xs sm:text-sm text-emerald-950 border border-emerald-100">
                    <span className="shrink-0 font-bold text-emerald-600">✓</span>
                    <span>{def}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Practice in Tan Ao Button */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                Bạn đã nắm rõ lý thuyết? Hãy thử sức đối mặt trực tiếp với kẻ lừa đảo trong trò chơi!
              </div>
              <button
                onClick={() => onPickScenario(selectedTopic.scenarioId)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md transition hover:bg-slate-800 active:scale-95"
              >
                <span>🎮 Vào thực chiến trong Tàn Ảo</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
