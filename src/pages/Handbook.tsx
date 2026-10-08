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
      'Tặng kèm hoa hồng nhỏ (500k - 1 triệu hoặc tiền cà phê) để kích thích lòng tham và làm mờ sự cảnh giác.',
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
    summary: 'Kẻ lừa đảo thu thập hình ảnh và video của người thân nạn nhân trên Facebook/TikTok, dùng công nghệ AI Deepfake hoán đổi khuôn mặt và bắt chước giọng nói. Chúng thực hiện cuộc gọi video ngắn vài giây rồi giả vờ mất mạng, sau đó nhắn tin thông báo người thân bị tai nạn nguy kịch cần chuyển gấp viện phí cấp cứu.',
    tactics: [
      'Thực hiện cuộc gọi video Deepfake chỉ kéo dài 3 - 5 giây với hình ảnh giật cục, ánh mắt đờ đẫn, khẩu hình miệng không khớp giọng nói.',
      'Cố tình rung lắc camera và tắt phụp cuộc gọi, lấy lý do "sóng trong bệnh viện quá yếu" hoặc "đang chạy theo băng ca cấp cứu".',
      'Gửi kèm hóa đơn viện phí mổ não/chấn thương sọ não giả mạo có mộc đỏ giả của Bệnh viện Chợ Rẫy hoặc Việt Đức.',
      'Hối thúc chuyển khoản ngay trong vòng 10 phút, nếu không "bác sĩ sẽ không phẫu thuật và nguy hiểm tính mạng".',
    ],
    psychology: 'Đánh thẳng vào tình phụ tử, tình thân gia đình, tạo sự hoảng loạn tột độ khiến não bộ nạn nhân rơi vào trạng thái tê liệt lý trí, lập tức chuyển tiền mà không kịp suy xét.',
    redFlags: [
      'Cuộc gọi video ngắn bất thường, khuôn mặt méo mó, nhấp nháy khi cử động, giọng nói đều đều như robot.',
      'Hối thúc chuyển tiền viện phí vào tài khoản cá nhân của "y tá/bác sĩ" thay vì tài khoản chính thức của bệnh viện.',
      'Không chịu nghe lại cuộc gọi video mà chỉ nhắn tin liên tục.',
    ],
    defense: [
      'Hỏi ngay một câu hỏi bí mật mà chỉ hai người trong gia đình biết (ví dụ: "Hôm qua nhà mình ăn món gì?", "Tên con cún ở quê là gì?").',
      'Cúp máy và gọi điện thoại di động thông thường (sóng viễn thông) vào số máy gốc của người thân.',
      'Gọi điện trực tiếp vào hotline tổng đài của bệnh viện để xác minh có bệnh nhân tên đó đang cấp cứu hay không.',
    ],
    quote: '"Trong cơn hoảng loạn, 1 phút dừng lại thở sâu và kiểm chứng sẽ cứu cả gia đình khỏi mất tiền oan!"',
  },
  {
    id: 'telegram-task',
    scenarioId: 'sc3-tiktok-job',
    title: 'Bẫy Cộng Tác Viên Telegram: "Nhiệm Vụ Đơn Hàng Phúc Lợi"',
    subtitle: 'Thao túng chi phí chìm (Sunk Cost) và bẫy Ponzi đóng tiền cứu vốn',
    category: 'Lừa đảo việc làm trực tuyến',
    icon: '📈',
    dangerLevel: 'Cực kỳ nguy hiểm',
    badgeColor: 'bg-purple-600',
    avatar: 'images/avatar_thu_trang.jpg',
    summary: 'Tiếp cận học sinh qua TikTok/Facebook tuyển cộng tác viên xem video, thả tim hoặc đánh giá sản phẩm Shopee nhận lương 300k - 500k/ngày. Ban đầu trả hoa hồng thật 30k - 50k để tạo lòng tin, sau đó lôi kéo vào nhóm Telegram VIP làm "nhiệm vụ liên kết" bắt nạp tiền lớn rồi chiếm đoạt.',
    tactics: [
      'Tặng tiền hoa hồng thật ở 1-2 nhiệm vụ đầu tiên để nạn nhân tin là công việc có thật.',
      'Dẫn dắt nạn nhân vào nhóm chat Telegram có 50 - 100 thành viên (thực chất toàn là "chim mồi" nick ảo của cùng một băng nhóm).',
      'Đưa ra các đơn hàng giá trị cao (2 triệu, 5 triệu, 20 triệu) và yêu cầu nạp tiền để hưởng hoa hồng 30%.',
      'Khi nạn nhân muốn rút tiền, hệ thống viện cớ "sai cú pháp lệnh", "chậm tiến độ", ép phải nạp thêm gấp đôi số tiền cũ để "cứu tiền treo".',
    ],
    psychology: 'Khai thác tâm lý muốn kiếm tiền tiêu vặt dễ dàng của học sinh, sau đó khóa chặt nạn nhân bằng bẫy "Chi phí chìm" (Sunk Cost Fallacy): vì tiếc số tiền đã nạp trước đó nên cắn răng vay mượn nạp thêm để mong lấy lại vốn.',
    redFlags: [
      'Công việc làm online nhưng bắt người lao động phải tự nạp tiền túi vào trước.',
      'Trong nhóm chat Telegram, các thành viên liên tục khoe ảnh biên lai chuyển tiền thành công hàng chục triệu một cách đáng ngờ.',
      'Khi rút tiền luôn có lý do phát sinh lỗi và bắt nộp thêm tiền phạt/phí bảo hiểm.',
    ],
    defense: [
      'Khắc cốt ghi tâm: BẤT KỲ CÔNG VIỆC TUYỂN DỤNG NÀO YÊU CẦU NẠP TIỀN ĐỀU LÀ 100% LỪA ĐẢO.',
      'Dừng nạp tiền ngay lập tức khi hệ thống báo lỗi, chấp nhận mất khoản tiền nhỏ ban đầu thay vì mất toàn bộ tài sản gia đình.',
      'Chặn ngay các nhóm Telegram tuyển dụng và báo cáo tài khoản lừa đảo.',
    ],
    quote: '"Không có miếng phô mai nào miễn phí ngoài chiếc bẫy chuột. Càng nạp tiền cứu vốn là càng lún sâu vào đầm lầy!"',
  },
  {
    id: 'vneid-trojan',
    scenarioId: 'sc4-fake-app',
    title: 'Giả Danh Cán Bộ VNeID Đề Án 06 Cài Trojan Chiếm Quyền',
    subtitle: 'Dụ tải file .apk kích hoạt Accessibility trộm mã OTP ngân hàng',
    category: 'Mã độc tống tiền & Trộm dữ liệu ngân hàng',
    icon: '🏛️',
    dangerLevel: 'Đặc biệt nghiêm trọng',
    badgeColor: 'bg-amber-600',
    avatar: 'images/avatar_can_bo_bca.jpg',
    summary: 'Kẻ gian đóng giả Cán bộ Công an phụ trách Đề án 06, gọi điện thông báo hồ sơ định danh điện tử VNeID mức 2 bị lỗi thông tin. Chúng hướng dẫn nạn nhân tải file ứng dụng .apk giả mạo Cổng Dịch vụ công để chiếm quyền Trợ năng (Accessibility Service) trên điện thoại Android, tự động theo dõi màn hình và trộm tiền ngân hàng trong đêm.',
    tactics: [
      'Đọc chính xác họ tên, số CCCD, ngày sinh của nạn nhân để tạo uy tín tuyệt đối (dữ liệu thu thập từ các vụ lộ lọt thông tin trên mạng).',
      'Đe dọa sẽ khóa tài khoản định danh, phạt tiền hoặc cưỡng chế nếu không cập nhật thông tin trong ngày.',
      'Gửi đường link giả mạo có giao diện giống hệt Cổng Dịch vụ công Quốc gia để tải file cài đặt (ví dụ: `dichvucong.apk`).',
      'Hướng dẫn nạn nhân vào cài đặt máy bật quyền "Trợ năng" (Accessibility Service) và quyền "Hiển thị trên ứng dụng khác".',
    ],
    psychology: 'Lợi dụng tâm lý sợ hãi trước cơ quan pháp luật, sợ bị phạt và tính cả tin của người dân vào những thủ tục hành chính số mới triển khai.',
    redFlags: [
      'Cán bộ Công an gọi điện thoại hoặc nhắn tin qua Zalo yêu cầu tải phần mềm.',
      'Ứng dụng không tải từ Google Play Store / Apple App Store mà tải qua đường link lạ đuôi `.apk`.',
      'Ứng dụng đòi quyền "Trợ năng" (Accessibility) — quyền lực nhất trên Android cho phép ứng dụng đọc màn hình và tự bấm nút.',
    ],
    defense: [
      'Nguyên tắc bất di bất dịch: Cơ quan Công an TUYỆT ĐỐI KHÔNG làm việc, hướng dẫn cài đặt phần mềm qua điện thoại hay Zalo.',
      'Mọi thủ tục định danh VNeID mức 2 bắt buộc phải đến trực tiếp Công an phường/xã nơi cư trú.',
      'Tuyệt đối không bao giờ cài file `.apk` từ nguồn bên ngoài và không bật quyền Trợ năng cho bất kỳ app lạ nào.',
    ],
    quote: '"Cấp quyền Trợ năng cho file apk lạ cũng giống như trao chìa khóa két sắt của bạn cho kẻ trộm!"',
  },
  {
    id: 'border-job',
    scenarioId: 'sc5-abroad-job',
    title: 'Việc Nhẹ Lương Cao KCN Mộc Bài: Bẫy Buôn Người Biên Giới',
    subtitle: 'Đài thọ toàn bộ chi phí để bắt cóc ép làm việc lừa đảo tại Campuchia',
    category: 'Tội phạm buôn bán người xuyên biên giới',
    icon: '⚠️',
    dangerLevel: 'Cực kỳ nguy hiểm',
    badgeColor: 'bg-red-700',
    avatar: 'images/avatar_hoang_long.jpg',
    summary: 'Đăng tin tuyển dụng nhân viên trực chat, đánh máy, chăm sóc khách hàng game tại cửa khẩu Mộc Bài Tây Ninh với mức lương 25 - 40 triệu/tháng. Hứa hẹn đài thọ vé xe, không cần bằng cấp. Khi nạn nhân đến nơi, chúng đưa qua đường mòn biên giới sang Campuchia, nhốt trong các đặc khu lừa đảo, đánh đập và tống tiền chuộc gia đình.',
    tactics: [
      'Vẽ ra bức tranh việc nhẹ lương cao: chỉ ngồi gõ máy tính văn phòng, bao ăn ở khách sạn, lương khởi điểm 1.000 USD.',
      'Hào phóng đài thọ toàn bộ chi phí di chuyển: chuyển khoản tiền xe bus, vé máy bay hoặc cho xe riêng đến tận nhà đón.',
      'Yêu cầu nạn nhân giữ bí mật với gia đình vì "chính sách công ty bảo mật".',
      'Khi xe đến Tây Ninh, chúng đổi sang xe máy hoặc đi bộ vượt biên giới qua đường tiểu ngạch ban đêm để tránh cửa khẩu chính thức.',
    ],
    psychology: 'Khai thác hoàn cảnh khó khăn, tâm lý muốn tự lập sớm của học sinh nghèo hoặc sự bất mãn với gia đình, tạo cảm giác được công ty trân trọng và chào đón nồng nhiệt.',
    redFlags: [
      'Việc làm phổ thông không yêu cầu kinh nghiệm, bằng cấp nhưng trả lương cao hơn cả cử nhân đại học (30 - 50 triệu/tháng).',
      'Địa điểm làm việc mập mờ, sát biên giới Tây Ninh, Mộc Bài, Campuchia, Lào.',
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

type Props = {
  onStartGame?: () => void
  onOpenChat: (scenarioId: string) => void
}

export default function Handbook({ onOpenChat }: Props) {
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = TOPICS.filter((t) =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

      {/* 5 Hình thức lừa đảo - Dàn hàng ngang đa cột */}
      <div className="mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>🛡️ Danh Sách 5 Chiêu Trò Lừa Đảo Phổ Biến</span>
              <span className="rounded-full bg-indigo-100 text-indigo-700 text-xs px-2.5 py-0.5 font-bold">{filtered.length} chuyên đề</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Nhấn vào từng kịch bản để mở đoạn chat thực tế mô phỏng:
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="🔍 Tìm kiếm chiêu trò..."
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
        </div>

        {/* Grid cards dàn hàng ngang */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((topic, i) => (
            <div
              key={topic.id}
              onClick={() => onOpenChat(topic.scenarioId)}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div>
                {/* Header Top Bar */}
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-5 py-3">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <span>{topic.icon}</span>
                    <span className="truncate">{topic.category}</span>
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white ${topic.badgeColor}`}>
                    {topic.dangerLevel}
                  </span>
                </div>

                {/* Main Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="flex items-start gap-3.5">
                    <img
                      src={topic.avatar}
                      alt={topic.title}
                      className="h-14 w-14 rounded-full object-cover shrink-0 border-2 border-white shadow-md ring-2 ring-slate-100 group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-bold text-indigo-600">
                        Chuyên đề {i + 1}
                      </div>
                      <h3 className="font-extrabold text-base text-slate-900 leading-snug mt-0.5 group-hover:text-indigo-600 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {topic.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button: MỞ ĐOẠN CHAT THỰC TẾ */}
              <div className="border-t border-slate-100 bg-slate-50/70 p-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onOpenChat(topic.scenarioId)
                  }}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 py-3 px-4 text-center text-xs sm:text-sm font-bold text-white shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 group-hover:shadow-md"
                >
                  <span>💬 Mở đoạn chat thực tế</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
