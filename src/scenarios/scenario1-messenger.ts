import type { Scenario } from './types'

const TRAP = '🔴 SẬP BẪY!'
const SAFE = '🟢 CHÍNH XÁC!'

export const scenario1: Scenario = {
  id: 'sc1-messenger',
  title: 'Bạn thân bị hack nick: Bẫy "Fake Bill" chuyển khoản hộ',
  description: 'Messenger · Hack tài khoản bạn thân, dùng ảnh biên lai ngân hàng giả mạo (Fake Bill) để lừa bạn chuyển tiền thật.',
  platform: 'messenger',
  contactName: 'Minh Anh',
  contactStatus: 'Đang hoạt động',
  avatarUrl: 'images/avatar_minh_anh.jpg',
  redFlags: [
    { id: 'hacked', label: 'Tài khoản bạn thân bị chiếm đoạt (Hack nick)', explanation: 'Kẻ gian thường chiếm quyền Messenger của bạn bè để mượn tiền hoặc nhờ chuyển khoản, tận dụng sự tin tưởng của bạn bè thân thiết.' },
    { id: 'bait', label: 'Mồi nhử hoa hồng / tiền cảm ơn', explanation: 'Hứa hẹn cho 1.000.000đ tiền trà sữa để kích thích lòng tham và giảm sự cảnh giác của nạn nhân.' },
    { id: 'fakebill', label: 'Biên lai chuyển khoản giả mạo (Fake Bill Photoshop)', explanation: 'Các trang web tạo bill giả tràn lan trên mạng, chỉ mất 10 giây để tạo biên lai chuyển tiền y như thật với số tài khoản và tên của bạn.' },
    { id: 'delay', label: 'Lấy cớ "nghẽn mạng liên ngân hàng" để ép chuyển tiền trước', explanation: 'Khi tiền chưa vào tài khoản thực tế, kẻ lừa đảo luôn bịa lý do nghẽn mạng để hối thúc bạn bỏ tiền túi chuyển trước.' },
    { id: 'urgent', label: 'Tạo tâm lý khẩn cấp (sợ mất cọc, huỷ đơn)', explanation: 'Khiến nạn nhân hoảng hốt, không kịp suy nghĩ và không kịp kiểm tra kỹ biến động số dư trong app ngân hàng.' },
    { id: 'thirdparty', label: 'Chuyển tiền vào tài khoản người lạ', explanation: 'Tài khoản người nhận không trùng tên bạn thân, mà là tài khoản ngân hàng "rác" của đường dây lừa đảo.' },
    { id: 'realdenies', label: 'Bạn thật xác nhận tài khoản mạng xã hội vừa bị hack', explanation: 'Gọi điện thoại truyền thống (qua SIM di động) là cách duy nhất xác thực được chính chủ khi tài khoản chat bị xâm phạm.' },
  ],
  checks: [
    {
      id: 'call-old', tool: 'call', label: 'Gọi SIM di động thật của Minh Anh', verdict: 'ok',
      title: 'Gọi số điện thoại đã lưu trong danh bạ',
      body: 'Bạn thật nghe máy và lập tức cảnh báo.',
      speech: { profile: 'friend', text: 'Alo mày hả? Đừng nghe lời nhắn trên Messenger nha! Nick tao vừa bị hack sáng nay, tao đang nhờ người lấy lại. Nó vừa đi nhắn vay tiền lung tung khắp nơi đó!' },
      flagId: 'realdenies',
    },
    {
      id: 'zoom', tool: 'zoom', label: 'Soi kỹ biên lai chuyển tiền 5.000.000đ', fromStage: 0, verdict: 'warn',
      title: 'Phân tích chi tiết biên lai giao dịch',
      body: 'Biên lai có dấu hiệu cắt ghép bằng công cụ Fake Bill.',
      image: { type: 'fake-bill', params: { amount: '5.000.000 đ', recipient: 'NGUYEN HOANG LONG (Bạn)', acc: '9988****123' } },
      rows: [
        { k: '1', v: 'Font chữ số tiền 5.000.000 đ sắc nét bất thường so với nền' },
        { k: '2', v: 'Độ mờ xung quanh tên người nhận có dấu vết chắp vá' },
        { k: '3', v: 'App ngân hàng của bạn CHƯA hề có thông báo biến động số dư' },
      ],
      flagId: 'fakebill',
    },
    {
      id: 'bank', tool: 'bank', label: 'Tra cứu tài khoản nhận 4.000.000đ', fromStage: 1, verdict: 'warn',
      title: 'Tra cứu chủ tài khoản thụ hưởng (giả lập)',
      body: 'Tài khoản đích thuộc về cá nhân không rõ lai lịch, vừa mở trực tuyến.',
      rows: [
        { k: 'Số tài khoản', v: '0981 234 567 (Ngân hàng số Timo)' },
        { k: 'Chủ tài khoản', v: 'DANG VAN THANG' },
        { k: 'Ghi chú', v: 'Tài khoản mới kích hoạt eKYC 3 ngày trước' },
      ],
      flagId: 'thirdparty',
    },
    {
      id: 'call-new', tool: 'call', label: 'Bấm gọi video call trên Messenger', verdict: 'warn', risky: true,
      title: 'Gọi video trực tiếp trên cửa sổ chat',
      body: 'Kẻ lừa đảo từ chối nhận cuộc gọi để tránh lộ mặt.',
      speech: { profile: 'friend', text: 'Ê tao đang đi xe ngoài đường ồn lắm không nghe máy được đâu, mày kiểm tra bill rồi bắn tiền giúp tao gấp đi không người ta hủy đơn!' },
      flagId: 'hacked',
    },
  ],
  variants: [
    {},
    {
      'Minh Anh': 'Đức Huy', '5.000.000': '6.000.000', '4.000.000': '5.000.000', '1.000.000': '1.000.000',
      'bàn phím cơ': 'máy tính bảng cũ', 'DANG VAN THANG': 'HOANG XUAN PHUC',
    },
  ],
  stages: [
    {
      messages: [
        { from: 'them', text: 'Ê Long ơi, đang ở nhà hay đi đâu đấy? Rảnh tay 2 phút không tao nhờ xíu việc gấp với!', delayMs: 800 },
        { from: 'them', text: 'Tao vừa pass lại cái bàn phím cơ cho ông anh kia mà app ngân hàng của tao hôm nay bị quá hạn mức nhận tiền ngày rồi 🤦‍♂️', delayMs: 1500 },
        { from: 'them', text: 'Tao gửi số tài khoản của mày cho ổng bắn sang trước 5 triệu nha? Lát mày chuyển lại 4 triệu sang bên lấy linh kiện giúp tao, còn 1 triệu mày giữ lấy uống trà sữa coi như tao cảm ơn!', delayMs: 1800, flagId: 'bait' },
        { from: 'them', kind: 'image', image: { type: 'fake-bill', params: { amount: '5.000.000 đ', recipient: 'NGUYEN HOANG LONG (Bạn)', acc: '9988****123' } }, delayMs: 1600, flagId: 'fakebill' },
        { from: 'them', kind: 'voice', voice: { seconds: 8, profile: 'friend' }, text: 'Mày ơi ổng vừa bắn 5 triệu thành công qua cho mày rồi đó, tao gửi bill qua rồi đấy mày check xem nhé!', delayMs: 1800 },
      ],
      choices: [
        { id: 'check-app', label: '📱 Bật app ngân hàng của mình lên kiểm tra số dư', reply: 'Đợi tao mở app ngân hàng check xem tiền vào tài khoản chưa đã', outcome: 'continue', next: 1 },
        { id: 'transfer-fast', label: '💸 Thấy bill uy tín rồi, bắn 4 triệu giúp bạn ngay', reply: 'Ok thấy bill thành công rồi, gửi tao số tài khoản bên kia tao chuyển hộ cho', outcome: 'trap', feedbackTitle: TRAP, feedbackBody: 'Bạn đã rơi vào bẫy "Fake Bill" kinh điển! Ảnh biên lai ngân hàng chỉ là sản phẩm tạo bằng Photoshop. Trong tài khoản bạn KHÔNG hề có tiền, bạn vừa dùng 4 triệu tiền túi của mình nộp cho kẻ lừa đảo.' },
        { id: 'call-sim', verifies: true, label: '📞 Cảnh giác: Gọi số điện thoại SIM di động của bạn để kiểm tra', reply: 'Khoan đã, để tao gọi điện thoại trực tiếp cho mày hỏi cho rõ', outcome: 'safe', feedbackTitle: SAFE, feedbackBody: 'Cực kỳ sáng suốt! Khi bạn bè bất ngờ nhờ nhận tiền hoặc chuyển khoản hộ, gọi điện thoại qua SIM di động (không gọi qua app mạng xã hội) là cách duy nhất vạch trần kẻ mạo danh.' },
      ],
    },
    {
      messages: [
        { from: 'them', text: 'Sao rồi mày ơi? Ổng giục tao giao mã lấy hàng quá trời nè!', delayMs: 1000 },
        { from: 'them', text: 'À tiền chưa thấy cộng đúng không? Cuối tuần chuyển 247 liên ngân hàng bị nghẽn lệnh đấy, trước tao cũng bị treo 15-20 phút mới nổi tiền.', delayMs: 1800, flagId: 'delay' },
        { from: 'them', text: 'Mày có sẵn tiền trong thẻ bắn trước 4 triệu qua STK: 0981 234 567 (DANG VAN THANG) giúp tao đi! Tiền tao chuyển cho mày đằng nào chả vào, tao bạn bè thân thiết lừa mày làm gì!', delayMs: 2000, flagId: 'urgent' },
        { from: 'them', kind: 'voice', voice: { seconds: 11, profile: 'friend' }, text: 'Nhanh giúp tao với bạn ơi, chậm 5 phút nữa người ta huỷ đơn của tao là tao đền tiền chết luôn á, giúp tao một lần này đi tao mang ơn mày cả đời!', delayMs: 2200 },
      ],
      choices: [
        { id: 'transfer-now', label: '💸 Thấy bạn nài nỉ khẩn thiết quá, chuyển trước 4 triệu', reply: 'Thôi được rồi, tao chuyển trước cho mày 4 triệu nè', outcome: 'trap', feedbackTitle: TRAP, feedbackBody: 'SẬP BẪY TÂM LÝ! Kẻ gian đã lợi dụng lòng tốt và tâm lý nể bạn bè. Quy tắc bất di bất dịch: TIỀN CHƯA THỰC SỰ NỔI TRÊN APP THÌ TUYỆT ĐỐI KHÔNG CHUYỂN KHOẢN ĐI.' },
        { id: 'wait-money', label: '⏳ Kiên quyết: Khi nào tài khoản mình báo có tiền mới chuyển', reply: 'Bao giờ app ngân hàng tao báo ting ting có tiền vào thì tao chuyển hộ, không thì chịu nha mày!', outcome: 'safe', feedbackTitle: SAFE, feedbackBody: 'Chính xác! Không bao giờ chuyển tiền dựa trên ảnh chụp màn hình hay lời hứa hẹn nghẽn mạng. Chỉ tin vào biến động số dư thực tế do ngân hàng thông báo.' },
        { id: 'report-hack', verifies: true, label: '🚩 Nhận diện nick bị hack: Chặn và cảnh báo các bạn khác', reply: 'Mày không phải Minh Anh thật, nick này bị hack rồi. Tao báo cho cả lớp biết!', outcome: 'safe', feedbackTitle: SAFE, feedbackBody: 'Xuất sắc! Bạn đã nhận diện toàn bộ các dấu hiệu của tài khoản bị chiếm đoạt và bẫy Fake Bill.' },
      ],
    },
  ],
}
