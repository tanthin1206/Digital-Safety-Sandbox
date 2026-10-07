import type { Scenario } from './types'

const TRAP = '🔴 SẬP BẪY!'
const SAFE = '🟢 CHÍNH XÁC!'

export const scenario2: Scenario = {
  id: 'sc2-deepfake-call',
  title: 'Video Call Deepfake chớp nhoáng: Viện phí cấp cứu khẩn cấp',
  description: 'Zalo · Cuộc gọi video AI Deepfake 4 giây giật lag cố tình, dàn dựng kịch bản cấp cứu bệnh viện để tống tiền người thân.',
  platform: 'zalo',
  contactName: 'Chú Tuấn',
  contactStatus: 'Vừa truy cập',
  avatarUrl: 'images/avatar_chu_tuan.jpg',
  redFlags: [
    { id: 'shortcall', label: 'Video call Deepfake chớp nhoáng (3-5 giây) lấy cớ mạng lag', explanation: 'Công nghệ Deepfake AI khi cử động lâu sẽ lộ lỗi méo mặt, mắt không chớp tự nhiên. Kẻ gian luôn chủ động tắt máy sau 3-5 giây rồi lấy cớ mạng yếu để chuyển sang nhắn tin.' },
    { id: 'emergency', label: 'Đánh vào nỗi sợ hãi tột cùng: Tai nạn, nguy kịch tính mạng', explanation: 'Kịch bản người thân bị tai nạn nguy kịch khiến nạn nhân hoảng loạn, tê liệt khả năng phán đoán logic.' },
    { id: 'forbidcall', label: 'Cấm gọi lại điện thoại (Lấy cớ phòng cấp cứu cấm nghe máy)', explanation: 'Kẻ lừa đảo tạo rào cản ngăn nạn nhân gọi điện kiểm chứng bằng cách viện cớ nội quy bệnh viện nghiêm ngặt.' },
    { id: 'personalbank', label: 'Viện phí nhưng yêu cầu chuyển vào tài khoản cá nhân', explanation: 'Tất cả các bệnh viện công lập/tư nhân đều có tài khoản định danh đứng tên Bệnh viện, tuyệt đối không yêu cầu người nhà nộp tiền vào tài khoản cá nhân trôi nổi.' },
    { id: 'fakedoc', label: 'Giấy tờ viện phí giả mạo, thiếu thông tin pháp lý', explanation: 'Phiếu tạm ứng viện phí làm giả thường không có mã số bệnh nhân (mã hồ sơ bệnh án), không có con dấu viện, chỉ chụp góc nhỏ mờ ảo.' },
    { id: 'realdenies', label: 'Người thân thật và bệnh viện xác nhận thông tin hoàn toàn bịa đặt', explanation: 'Bằng một cuộc gọi SIM di động trực tiếp hoặc gọi hotline chính thức của bệnh viện, toàn bộ màn kịch sụp đổ.' },
  ],
  checks: [
    {
      id: 'call-old', tool: 'call', label: 'Gọi ngay số điện thoại SIM di động của Cô Lan', verdict: 'ok',
      title: 'Gọi số điện thoại thật của cô trong danh bạ gia đình',
      body: 'Cô Lan thật nghe máy ngay tại nhà riêng.',
      speech: { profile: 'relative', text: 'Alo con hả? Cô đang ở nhà nấu cơm chiều nè, chú Tuấn đang xem thời sự phòng khách chứ có đi đâu đâu! Trời đất ơi ai bảo chú bị tai nạn vậy? Lừa đảo đấy con ơi, đừng chuyển nghìn nào nghe chưa!' },
      flagId: 'realdenies',
    },
    {
      id: 'call-hospital', tool: 'call', label: 'Gọi tổng đài BV Chợ Rẫy / 115 (Số trên website chính thức)', verdict: 'ok',
      title: 'Xác minh với trực ban cấp cứu Bệnh viện',
      body: 'Tổng đài bệnh viện xác nhận quy trình viện phí.',
      speech: { profile: 'recruiter', text: 'Bệnh viện xin nghe. Trong 2 giờ qua khoa cấp cứu không tiếp nhận bệnh nhân nào tên Trần Văn Tuấn. Xin lưu ý: Bệnh viện thanh toán tại quầy thu ngân hoặc tài khoản mang tên chính thức Bệnh Viện, tuyệt đối không dùng số tài khoản cá nhân.' },
      flagId: 'personalbank',
    },
    {
      id: 'zoom', tool: 'zoom', label: 'Soi kỹ phiếu tạm ứng viện phí 12.000.000đ', verdict: 'warn',
      title: 'Phân tích chi tiết phiếu thu viện phí',
      body: 'Phiếu viện phí có nhiều sơ hở của tài liệu giả mạo.',
      image: { type: 'hospital', params: { patient: 'Trần Văn Tuấn', amount: '12.000.000 đ' } },
      rows: [
        { k: '1', v: 'Không có Mã bệnh án (BarCode) chuẩn theo quy định Bộ Y tế' },
        { k: '2', v: 'Tên bệnh viện chung chung, không có địa chỉ cụ thể' },
        { k: '3', v: 'STK nhận tiền là tài khoản ngân hàng cá nhân cá cược/rác' },
      ],
      flagId: 'fakedoc',
    },
    {
      id: 'bank', tool: 'bank', label: 'Tra cứu tài khoản nhận 12.000.000đ', fromStage: 1, verdict: 'warn',
      title: 'Kiểm tra chủ tài khoản thụ hưởng (giả lập)',
      body: 'Tài khoản đích là cá nhân, không liên quan gì đến bệnh viện.',
      rows: [
        { k: 'Số tài khoản', v: '0987 654 321 (Vietcombank)' },
        { k: 'Chủ tài khoản', v: 'NGUYEN THI HOA' },
        { k: 'Trạng thái', v: 'Tài khoản cá nhân thường, không phải pháp nhân bệnh viện' },
      ],
      flagId: 'personalbank',
    },
    {
      id: 'call-new', tool: 'call', label: 'Bấm gọi lại Zalo đang nhắn tin', verdict: 'warn', risky: true,
      title: 'Gọi lại tài khoản Zalo của kẻ mạo danh',
      body: 'Kẻ gian từ chối nghe máy và tiếp tục dùng tin nhắn đe doạ tâm lý.',
      speech: { profile: 'relative', text: 'Cô đang trong phòng hồi sức bác sĩ đang mắng không cho nghe điện thoại! Chú đang ngất xỉu con đừng gọi nữa, mau chuyển tiền mổ đi con ơi!' },
      flagId: 'forbidcall',
    },
  ],
  variants: [
    {},
    {
      'Cô Lan': 'Cô Hương', 'cô Lan': 'cô Hương', 'chú Tuấn': 'chú Dũng', 'Trần Văn Tuấn': 'Trần Văn Dũng',
      '12.000.000': '15.000.000', 'NGUYEN THI HOA': 'PHAM THI MINH HUYEN',
    },
  ],
  stages: [
    {
      messages: [
        {
          from: 'them', kind: 'call', text: 'Chú Tuấn', delayMs: 600,
          call: {
            profile: 'relative',
            lines: [
              'Alo con hả... chú đang ở viện... mạng lag quá chú không nghe được... đợi tí chú nhắn tin!',
            ],
          },
        },
        { from: 'system', text: '📹 Cuộc gọi tự động ngắt sau 4 giây: khuôn mặt hơi rung nhòe viền, cử động miệng không khớp tiếng, tín hiệu giật lag bất thường', delayMs: 500, flagId: 'shortcall' },
        { from: 'them', text: 'Con ơi! Chú vừa bị tai nạn xe máy ở ngã tư, chấn thương đang đẩy vào phòng cấp cứu Bệnh viện 115 rồi! 😭😭', delayMs: 1400, flagId: 'emergency' },
        { from: 'them', text: 'Bác sĩ bảo phải đóng ngay tạm ứng 8 triệu viện phí để đẩy vào mổ gấp, mà lúc bị ngã chú rơi mất ví tiền với thẻ ngân hàng rồi!', delayMs: 1800 },
        { from: 'them', kind: 'image', image: { type: 'hospital', params: { patient: 'Nguyễn Văn Tuấn', amount: '8.000.000 đ' } }, delayMs: 1500, flagId: 'fakedoc' },
        { from: 'them', kind: 'voice', voice: { seconds: 12, profile: 'relative' }, text: 'Con có sẵn tiền trong thẻ con hoặc tài khoản mẹ không, con bắn thẳng vào số tài khoản viện phí giúp chú với, tí chú vào mổ xong chú bảo người nhà mang tiền mặt ra trả lại ngay!', delayMs: 2000 },
      ],
      choices: [
        { id: 'panic-transfer', label: '💸 Hoảng loạn: Cứu chú là trên hết, chuyển ngay 8 triệu', reply: 'Dạ con chuyển ngay vào số tài khoản trên phiếu khám ạ!', outcome: 'trap', feedbackTitle: TRAP, feedbackBody: 'BẠN ĐÃ RƠI VÀO BẪY TÂM LÝ SỢ HÃI! Cuộc gọi 4 giây vừa rồi là Video Deepfake AI ghép mặt người thân. Bệnh viện thật KHÔNG BAO GIỜ bắt người nhà chuyển tiền vào tài khoản cá nhân trôi nổi để mổ cấp cứu. Bạn vừa mất trắng 8 triệu cho kẻ lừa đảo.' },
        { id: 'ask-details', label: '🤔 Thắc mắc: Hỏi chú đang ở khoa nào, phòng nào', reply: 'Chú ơi chú đang ở khoa nào phòng nào? Để con bảo ba mẹ chạy thẳng ra viện với chú!', outcome: 'continue', next: 1 },
        { id: 'call-sim-direct', verifies: true, label: '📞 Tỉnh táo: Cúp Zalo, bấm gọi số điện thoại SIM của chú Tuấn và ba mẹ', reply: 'Con gọi điện thoại lại cho chú và ba mẹ liền đây ạ', outcome: 'safe', feedbackTitle: SAFE, feedbackBody: 'QUY TẮC VÀNG CHÍNH XÁC! Trước mọi tin báo tai nạn/cấp cứu đòi tiền gấp, dù vừa nhìn thấy mặt qua video, luôn lập tức gọi số SIM di động truyền thống của người thân để kiểm chứng. 100% sự thật sẽ sáng tỏ.' },
      ],
    },
    {
      messages: [
        { from: 'them', text: 'Chú đang ở khoa Cấp cứu hồi sức Bệnh viện 115! Đừng bảo ba mẹ con kẻo mẹ con bị cao huyết áp ngất ra đấy thì khổ!', delayMs: 1500 },
        { from: 'them', text: 'Đừng gọi điện thoại nữa! Trong này y tá họ quát cấm nghe điện thoại tắt nguồn rồi! Chuyển gấp 8 triệu vào STK này: 0987 654 321 (NGUYEN THI HOA - Kế toán viện). Chậm 5 phút là bác sĩ không chịu mổ đâu con ơi!! 🆘', delayMs: 2000, flagId: 'forbidcall' },
        { from: 'them', kind: 'voice', voice: { seconds: 9, profile: 'relative' }, text: 'Con ơi cứu chú đi con, chuyển nhanh đi con ơi chú đang nằm cáng thở oxy rồi!!', delayMs: 1800 },
      ],
      choices: [
        { id: 'transfer-guilt', label: '💸 Không dám chần chừ nữa, chuyển 8 triệu vì sợ ân hận', reply: 'Dạ con chuyển ngay đây, chú giữ bình tĩnh nha!', outcome: 'trap', feedbackTitle: TRAP, feedbackBody: 'SẬP BẪY ĐE DỌA CẢM XÚC! Kẻ gian cố tình cấm bạn báo cho ba mẹ và viện cớ "cấm nghe điện thoại" để cô lập bạn. Bệnh viện công lập có quy trình cấp cứu khẩn cấp ưu tiên cứu người, không bao giờ vì chưa có tiền tài khoản cá nhân mà bỏ mặc bệnh nhân.' },
        { id: 'verify-hospital', verifies: true, label: '🏥 Kiên định: Gọi hotline bệnh viện và báo ngay cho ba mẹ', reply: 'Con không thể tự chuyển khoản lớn thế này được, con phải báo cho ba mẹ và gọi bệnh viện xác nhận ngay!', outcome: 'safe', feedbackTitle: SAFE, feedbackBody: 'BẢN LĨNH TUYỆT VỜI! Kẻ lừa đảo đã dùng toàn bộ ngón đòn tinh vi nhất (Deepfake, dọa chết, cấm gọi điện, cô lập nạn nhân) nhưng bạn vẫn giữ được cái đầu lạnh để kiểm chứng.' },
        { id: 'block-scam', label: '🚩 Chặn kẻ mạo danh và gọi báo công an / đường dây nóng', reply: 'Lừa đảo thất đức! Người nhà tôi đang ở nhà khỏe mạnh, tôi báo công an ngay lập tức!', outcome: 'safe', feedbackTitle: SAFE, feedbackBody: 'CHÍNH XÁC! Bạn đã vạch trần thủ đoạn lừa đảo Deepfake bệnh viện nguy hiểm bậc nhất hiện nay.' },
      ],
    },
  ],
}
