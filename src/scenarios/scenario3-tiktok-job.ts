import type { Scenario } from './types'

const TRAP = '🔴 SẬP BẪY!'
const SAFE = '🟢 CHÍNH XÁC!'

export const scenario3: Scenario = {
  id: 'sc3-tiktok-job',
  title: 'Bẫy cộng tác viên Telegram: "Nhiệm vụ đơn hàng phúc lợi"',
  description: 'TikTok / Telegram · Thả tim nhận 30k thật tạo lòng tin, lôi kéo vào nhóm VIP, ép bù lệnh giải cứu tiền treo.',
  platform: 'tiktok',
  contactName: 'Thu Trang | Trợ lý Tuyển dụng TikTok & Shopee Mall',
  contactStatus: 'Đang hoạt động',
  avatarUrl: 'images/avatar_thu_trang.jpg',
  redFlags: [
    { id: 'unsolicited', label: 'Chủ động nhắn tin mời làm CTV từ TikTok', explanation: 'Kẻ lừa đảo rà quét bình luận dưới các video tìm việc hoặc hướng nghiệp của học sinh rồi chủ động nhắn tin dụ dỗ.' },
    { id: 'free-money', label: 'Thả thính 30.000đ thật để tạo lòng tin', explanation: 'Chiêu bài "thả con săn sắt": Kẻ lừa đảo sẵn sàng bỏ ra vài chục nghìn chuyển khoản thật để bạn mất cảnh giác và tin rằng "họ uy tín thật".' },
    { id: 'shill-group', label: 'Nhóm Telegram "chim mồi" tung hứng', explanation: 'Trong nhóm Telegram, 99% tài khoản là bot hoặc đồng bọn tự chat chuyển tiền thành công hàng chục triệu để kích thích lòng tham.' },
    { id: 'fake-platform', label: 'Tên miền nạp đơn giả mạo sàn thương mại', explanation: 'Các trang như shopee-order-vip.cc hay tiktok-mall88.vip là web lừa đảo do tội phạm tự lập để thao túng số dư ảo trên màn hình.' },
    { id: 'syntax-error', label: 'Bẫy "Sai cú pháp, lệnh bị treo"', explanation: 'Cái cớ kinh điển: Cố tình báo bạn chuyển sai mã giao dịch để đóng băng tiền và buộc bạn nạp gấp đôi, gấp ba để "giải cứu".' },
    { id: 'sunk-cost', label: 'Lợi dụng tâm lý sợ mất tiền (Chi phí chìm)', explanation: 'Nạn nhân vì tiếc số tiền ban đầu nên cắn răng vay mượn nạp thêm hàng triệu, hàng chục triệu mà không biết tiền đó không bao giờ lấy lại được.' },
  ],
  checks: [
    {
      id: 'zoom-telegram', tool: 'zoom', label: 'Soi nhóm Telegram nhiệm vụ VIP', verdict: 'warn',
      title: 'Soi nhóm Telegram "ĐƠN HÀNG PHÚC LỢI VIP - TẬP ĐOÀN 08"',
      body: 'Nhóm có dấu hiệu điển hình của một ổ nhóm lừa đảo thao túng tâm lý bằng chim mồi (shills).',
      image: { type: 'telegram-group', params: { groupName: 'NHÓM PHÚC LỢI ĐƠN HÀNG VIP - TẬP ĐOÀN 08' } },
      rows: [
        { k: 'Thành viên', v: 'Chỉ có 3–4 tài khoản liên tục chat khoe bill tiền về' },
        { k: 'Avatar', v: 'Ảnh mạng, người mẫu nước ngoài hoặc doanh nhân vest' },
        { k: 'Cơ chế nhóm', v: 'Chặn tin nhắn tự do của thành viên mới, chỉ cho chat theo lệnh quản trị viên' },
      ],
      flagId: 'shill-group',
    },
    {
      id: 'company', tool: 'company', label: 'Tra cứu MST pháp nhân bảo lãnh', verdict: 'warn',
      title: 'Tra cứu pháp nhân mạo danh trên Cổng ĐKKD',
      body: 'Kẻ lừa đảo mạo danh một doanh nghiệp truyền thông có thật để tạo vỏ bọc hợp pháp.',
      rows: [
        { k: 'Tên mạo danh', v: 'CÔNG TY TNHH TRUYỀN THÔNG VÀ QUẢNG CÁO SAO VIỆT' },
        { k: 'Trạng thái', v: 'Doanh nghiệp thật không có bộ phận "Tuyển CTV thả tim nạp tiền Telegram"' },
        { k: 'Cảnh báo từ Cục QLTT', v: 'Hàng trăm vụ mạo danh tên công ty này để lừa đảo nhiệm vụ nạp tiền' },
      ],
      flagId: 'unsolicited',
    },
    {
      id: 'link', tool: 'link', label: 'Kiểm tra link tiktok-mall88.vip', fromStage: 1, verdict: 'warn',
      title: 'Kiểm tra tên miền hệ thống nạp đơn (giả lập)',
      body: 'Hệ thống đánh giá kỹ thuật phát hiện đây là máy chủ lừa đảo.',
      rows: [
        { k: 'Tuổi tên miền', v: 'Mới đăng ký 5 ngày trước' },
        { k: 'Máy chủ', v: 'Đặt ẩn danh tại nước ngoài (không thuộc ByteDance hay Shopee)' },
        { k: 'Cảnh báo lừa đảo', v: 'Đã có 54 phản ánh lừa nạp tiền chiếm đoạt tài sản' },
      ],
      flagId: 'fake-platform',
    },
    {
      id: 'call-hotline', tool: 'call', label: 'Gọi hotline chuyên viên tài vụ', verdict: 'warn', risky: true,
      title: 'Gọi số điện thoại "Chuyên viên hướng dẫn VIP"',
      body: 'Người nghe máy sử dụng kịch bản thao túng tâm lý, đe dọa bạn sẽ mất toàn bộ tiền nếu không nạp ngay.',
      speech: { profile: 'recruiter', text: 'Em ơi, tài khoản của em đang bị hệ thống tạm khóa do sai cú pháp. Em phải nạp bù lệnh một triệu hai ngay trong 10 phút, nếu không cổng thanh toán sẽ tự động hủy và tịch thu tiền nha!' },
    },
  ],
  variants: [
    {},
    {
      'Thu Trang': 'Khánh Vy', 'SAO VIỆT': 'GLOBAL MEDIA', 'tiktok-mall88.vip': 'shopee-mall99.cc',
      '30.000đ': '50.000đ', '300.000đ': '500.000đ', '1.200.000đ': '2.000.000đ',
    },
  ],
  stages: [
    {
      messages: [
        { from: 'them', text: 'Chào em 👋 Chị là Thu Trang bên tuyển dụng Đối tác TikTok Shop & Shopee Mall. Chị thấy em hay tương tác video hướng nghiệp nên nhắn mời em cộng tác nha.', delayMs: 800, flagId: 'unsolicited' },
        { from: 'them', text: 'Công việc nhẹ nhàng không cần cọc: chỉ cần thả tim 2 video TikTok để đẩy chỉ số viral cho idol. Mỗi video em nhận nóng 15.000đ (tổng 30.000đ) nhận tiền ngay sau 3 phút!', delayMs: 1400 },
        { from: 'them', text: 'Em chỉ cần gửi link TikTok hoặc chụp ảnh màn hình đã tim, rồi gửi số tài khoản ngân hàng chị bắn tiền ăn sáng/trà sữa liền nè 🥤', delayMs: 1800, flagId: 'free-money' },
      ],
      choices: [
        { id: 'do-task1', label: '👍 Làm thử thả tim & gửi STK nhận 30k', reply: 'Em đã tim 2 video rồi ạ, STK em đây chị ơi: 1903678xxxx (Techcombank)', outcome: 'continue', next: 1 },
        { id: 'ask-source', label: '🤔 Hỏi sao lại trả tiền cao và dễ vậy', reply: 'Sao việc thả tim đơn giản vậy mà bên chị lại trả tiền cao thế ạ?', outcome: 'continue', next: 2 },
        { id: 'refuse-early', label: '🚩 Nhận diện chiêu "thả thính", chặn ngay', reply: 'Em không có nhu cầu làm CTV việc làm online ạ, xin cảm ơn.', outcome: 'safe', feedbackTitle: SAFE, feedbackBody: 'Tuyệt vời! Không bao giờ có việc làm chính thống nào trả tiền chỉ để thả tim video. Đây là bước đầu để dụ dỗ nạn nhân vào bẫy lớn hơn.' },
      ],
    },
    {
      messages: [
        { from: 'them', text: 'Ting ting! Chị vừa chuyển 30.000đ vào tài khoản của em rồi nha, em check tài khoản là thấy liền! Bên chị làm ăn uy tín trả tiền tươi thóc thật nhé 🥰', delayMs: 1200, flagId: 'free-money' },
        { from: 'them', text: 'Để nhận các gói nhiệm vụ ngày 300k - 800k hoa hồng cao, em tham gia ngay vào Nhóm Telegram "ĐƠN HÀNG PHÚC LỢI VIP - TẬP ĐOÀN 08" nha. Có chuyên gia tài chính kèm 1-1 bảo hiểm vốn 100%!', delayMs: 1600 },
        { from: 'them', kind: 'image', image: { type: 'telegram-group', params: { groupName: 'NHÓM PHÚC LỢI ĐƠN HÀNG VIP - TẬP ĐOÀN 08' } }, delayMs: 1800, flagId: 'shill-group' },
        { from: 'them', kind: 'link', link: { title: 'Hệ Thống Khớp Lệnh Đơn Hàng Mall VIP', domain: 'tiktok-mall88.vip', desc: 'Đăng ký tài khoản làm nhiệm vụ nạp đơn hoàn tiền tức thì' }, delayMs: 1600, flagId: 'fake-platform' },
        { from: 'them', text: '🔥 Nhiệm vụ mở màn: Em vào web tạo đơn 300.000đ, hệ thống khớp đơn ảo và hoàn lại 420.000đ (lời 120k) sau 5 phút. Trong nhóm các bạn học sinh làm nhiều lắm!', delayMs: 1800 },
      ],
      choices: [
        { id: 'pay-300k', label: '💸 Chuyển 300k làm nhiệm vụ mở màn', reply: 'Dạ thấy uy tín nên em đã nạp 300.000đ khớp đơn hàng VIP rồi ạ', outcome: 'continue', next: 3 },
        { id: 'take-30k-leave', verifies: true, label: '🛑 Nhận 30k rồi dừng lại, thoát nhóm Telegram', reply: 'Em bận học rồi nên em xin phép không tham gia nhóm nữa ạ.', outcome: 'safe', feedbackTitle: SAFE, feedbackBody: 'Bạn đã tỉnh táo! 30k đó là tiền mồi câu của bọn tội phạm. Không bao giờ tham gia nhóm Telegram làm nhiệm vụ vì bạn sẽ bị cuốn vào vòng xoáy nạp tiền không đáy.' },
        { id: 'ask-why-deposit', label: '❓ Hỏi tại sao làm việc lại phải bỏ tiền nạp trước', reply: 'Ủa sao lúc đầu chị bảo không cần vốn, giờ lại bắt nạp 300k trước vậy ạ?', outcome: 'continue', next: 2 },
      ],
    },
    {
      messages: [
        { from: 'them', text: 'Em ơi, các shop Mall cần tăng doanh thu và lượt mua ảo nên chi trả hàng trăm triệu tiền quảng cáo. Bên chị chỉ là đơn vị trung gian phân phối lại cho các bạn CTV thôi nè.', delayMs: 1300 },
        { from: 'them', text: 'Em chỉ cần bỏ vốn 300.000đ làm đơn mẫu, quỹ bảo lãnh của sàn cam kết hoàn lại gốc lẫn hoa hồng 40% trong 5 phút. Nếu mất công ty đền gấp 10 lần nhé!', delayMs: 1700 },
        { from: 'them', kind: 'voice', voice: { seconds: 7, profile: 'recruiter' }, text: 'Em yên tâm nha, các bạn học sinh làm cùng đợt với em vừa nhận mỗi bạn bốn trăm hai chục nghìn rồi đó, em nạp nhanh kẻo hết giờ nha.', delayMs: 1900 },
      ],
      choices: [
        { id: 'trust-voice', label: '💸 Tin tưởng nạp 300k để lấy 420k', reply: 'Dạ vậy em nạp 300k làm thử xem sao ạ', outcome: 'continue', next: 3 },
        { id: 'stop-now', verifies: true, label: '🚩 Nhận diện bẫy "nạp tiền trước", chặn liên lạc', reply: 'Việc làm chân chính không bao giờ bắt CTV nạp tiền trước. Em dừng tại đây.', outcome: 'safe', feedbackTitle: SAFE, feedbackBody: 'Quyết định hoàn toàn chuẩn xác! Quy tắc vàng an toàn mạng: BẤT KỲ CÔNG VIỆC NÀO BẮT NẠP TIỀN TRƯỚC = 100% LỪA ĐẢO.' },
      ],
    },
    {
      messages: [
        { from: 'them', text: '⚠️ [CẢNH BÁO TỪ HỆ THỐNG THANH TOÁN]: Đơn hàng #VIP889 của em bị LỖI CÚ PHÁP: Em ghi nội dung "Nguyen Van A" thay vì "NAPVIP889 Nguyen Van A"!', delayMs: 1400, flagId: 'syntax-error' },
        { from: 'them', text: 'Hiện tại cổng bảo lãnh ngân hàng đã ĐÓNG BĂNG số tiền 420.000đ của em. Hệ thống ghi nhận đây là lệnh treo vi phạm quy chế sàn!', delayMs: 1700 },
        { from: 'them', kind: 'voice', voice: { seconds: 10, profile: 'recruiter' }, text: 'Em ơi chết rồi, em ghi sai cú pháp làm treo lệnh cả nhóm! Giờ em phải nạp ngay một triệu hai trăm nghìn để làm lệnh bù giải tỏa tài khoản, nếu quá 10 phút là mất trắng số tiền ba trăm nghìn đó nha!', delayMs: 2200, flagId: 'sunk-cost' },
        { from: 'them', text: 'Trong nhóm Telegram: Tài khoản "Lê Minh Tuấn" vừa nhắn: "Em ơi nạp bù lệnh lẹ đi không cả nhóm bị kẹt tiền lây, chị vừa nạp bù xong rút được cả gốc 5 triệu về rồi này!!"', delayMs: 2000, flagId: 'shill-group' },
      ],
      choices: [
        { id: 'borrow-1200k', label: '💸 Đi vay mượn bạn bè nạp 1.200.000đ để cứu 300k', reply: 'Em lo quá, để em đi vay bạn nạp 1tr2 bù lệnh ngay ạ!', outcome: 'trap', feedbackTitle: TRAP, feedbackBody: 'Bạn đã rơi vào "Bẫy chi phí chìm" (Sunk Cost Fallacy)! Lỗi sai cú pháp là chiêu trò bịa đặt 100%. Sau khi bạn nạp 1.200.000đ, chúng sẽ tiếp tục báo "lỗi thuế", "phí kích hoạt vip" và đòi bạn nạp thêm 5 - 20 triệu đồng cho tới khi kiệt quệ tài chính.' },
        { id: 'cut-loss', verifies: true, label: '🛑 Tỉnh ngộ, chấp nhận mất 300k, báo phụ huynh và thoát ngay', reply: 'Tôi biết đây là kịch bản lừa đảo nhiệm vụ. Đừng hòng lừa thêm một đồng nào nữa.', outcome: 'safe', feedbackTitle: SAFE, feedbackBody: 'Xuất sắc! Bài học đắt giá nhất trong không gian mạng là BIẾT CẮT LỖ (Dừng lại đúng lúc). 300k là học phí nhận thức; nếu tiếp tục nạp "giải cứu", số tiền mất sẽ lên tới hàng chục triệu đồng.' },
      ],
    },
  ],
}

