import type { Scenario } from './types'

const TRAP = '🔴 SẬP BẪY!'
const SAFE = '🟢 CHÍNH XÁC!'
const PERM = { app: 'DịchVụCông QuốcGia' }

export const scenario4: Scenario = {
  id: 'sc4-fake-app',
  title: 'Giả mạo Công an / Đề án 06: Dụ cài mã độc VNeID giả mạo',
  description: 'Zalo · Dọa lỗi định danh hủy thi tốt nghiệp, gửi công văn dấu đỏ giả, ép cài file APK chiếm quyền Trợ năng.',
  platform: 'zalo',
  contactName: 'Trung úy Lê Tuấn Anh | Đề Án 06 BCA',
  contactStatus: 'Cán bộ thường trực cơ sở dữ liệu',
  avatarUrl: 'images/avatar_can_bo_bca.jpg',
  redFlags: [
    { id: 'gov-impersonation', label: 'Mạo danh cán bộ Công an / Đề án 06', explanation: 'Công an và cơ quan chức năng KHÔNG BAO GIỜ làm việc hay xử lý hồ sơ dữ liệu dân cư qua tin nhắn Zalo cá nhân.' },
    { id: 'exam-threat', label: 'Đe dọa khóa hồ sơ thi tốt nghiệp / tuyển sinh', explanation: 'Kẻ lừa đảo đánh trúng điểm yếu sợ hãi lớn nhất của học sinh: nguy cơ bị hủy tư cách thi để ép làm theo mà không kịp hỏi người lớn.' },
    { id: 'fake-notice', label: 'Công văn đóng dấu đỏ giả mạo', explanation: 'Văn bản giả dùng con dấu scan, sai thể thức hành chính, sai chức danh và sai font chữ tiêu chuẩn của cơ quan nhà nước.' },
    { id: 'fake-domain', label: 'Tên miền .vip mạo danh cổng thông tin Chính phủ', explanation: 'Cổng thông tin cơ quan nhà nước Việt Nam BẮT BUỘC có tên miền kết thúc bằng ".gov.vn". Tuyệt đối không có đuôi .vip hay .cc.' },
    { id: 'sideload-apk', label: 'Dụ tải file .apk ngoài kho Google Play / App Store', explanation: 'Ứng dụng chính thống VNeID hoặc Dịch vụ công chỉ phát hành trên CH Play và Apple Store. File .apk gửi qua Zalo là mã độc 100%.' },
    { id: 'accessibility-trojan', label: 'Ép bật quyền "Trợ năng" (Accessibility)', explanation: 'Quyền Trợ năng cho phép ứng dụng đọc trộm màn hình, tự động bấm chuyển tiền và kiểm soát hoàn toàn điện thoại từ xa.' },
  ],
  checks: [
    {
      id: 'zoom-notice', tool: 'zoom', label: 'Soi kỹ công văn dấu đỏ Đề án 06', verdict: 'warn',
      title: 'Giám định công văn "Yêu cầu rà soát mã định danh"',
      body: 'Văn bản có nhiều dấu hiệu làm giả nghiệp dư bằng Photoshop.',
      image: { type: 'dvc-notice', params: { docNumber: '318/TB-C06-ĐA06' } },
      rows: [
        { k: 'Thể thức văn bản', v: 'Sai chuẩn Nghị định 30/2020/NĐ-CP về công tác văn thư' },
        { k: 'Con dấu & chữ ký', v: 'Con dấu scan mờ viền, chữ ký cắt dán chèn lên số văn bản' },
        { k: 'Thời hạn', v: 'Yêu cầu xử lý gấp trong 2 tiếng - đặc trưng ép tâm lý của tội phạm' },
      ],
      flagId: 'fake-notice',
    },
    {
      id: 'link', tool: 'link', label: 'Kiểm tra link dichvucong-gov.vip', verdict: 'warn',
      title: 'Phân tích tên miền dichvucong-gov.vip (giả lập)',
      body: 'Tên miền mạo danh máy chủ Cổng Dịch vụ công Quốc gia.',
      rows: [
        { k: 'Đuôi tên miền', v: '.vip (Tên miền thương mại rác, KHÔNG PHẢI .gov.vn)' },
        { k: 'Chủ sở hữu', v: 'Đăng ký ẩn danh tại nước ngoài' },
        { k: 'Hành vi phát hiện', v: 'Tự động tải về gói cài đặt chứa mã độc chiếm quyền điều khiển' },
      ],
      flagId: 'fake-domain',
    },
    {
      id: 'scan', tool: 'app', label: 'Quét file CongDichVuCong_v2.apk', verdict: 'warn',
      title: 'Phân tích mã độc di động Android (giả lập)',
      body: 'Phát hiện Trojan gián điệp ngân hàng (Banking Trojan).',
      rows: [
        { k: 'Quyền nguy hiểm', v: 'Trợ năng (AccessibilityService), Đọc tin nhắn (READ_SMS), Ghi đè màn hình' },
        { k: 'Mối đe dọa', v: 'Chiếm quyền điều khiển thiết bị từ xa (RAT), tự đọc mã OTP, làm đen màn hình chuyển tiền' },
        { k: 'Cảnh báo', v: 'ĐỘC HẠI MỨC CAO NHẤT' },
      ],
      flagId: 'accessibility-trojan',
    },
    {
      id: 'call-police', tool: 'call', label: 'Gọi Công an Phường / Huyện theo hotline lưu sẵn', verdict: 'ok',
      title: 'Liên hệ Trực ban Công an Phường nơi cư trú',
      body: 'Cán bộ Công an trực ban lập tức bác bỏ thông tin và cảnh báo thủ đoạn lừa đảo.',
      speech: { profile: 'recruiter', text: 'Trực ban Công an Phường xin nghe. Cháu tuyệt đối không làm theo! Công an không bao giờ làm việc qua Zalo, không gửi link tải app APK nào hết. Mọi điều chỉnh định danh đều phải ra trụ sở công an trực tiếp.' },
      flagId: 'gov-impersonation',
    },
    {
      id: 'call-fake-officer', tool: 'call', label: 'Gọi vào số "Trung úy Anh" trong tin nhắn', verdict: 'warn', risky: true,
      title: 'Gọi số điện thoại kẻ lừa đảo mạo danh',
      body: 'Đối tượng dùng giọng gắt gỏng, đọc điều luật hình sự và lớn tiếng đe dọa nhằm gây hoảng loạn.',
      speech: { profile: 'recruiter', text: 'Alo! Tôi là cán bộ Tuấn Anh đây. Cháu có biết là hồ sơ định danh của cháu đang sai lệch năm sinh không? Nếu trước 17h hôm nay cháu không cài phần mềm đồng bộ thì trường sẽ hủy mã thi tốt nghiệp của cháu đấy nhé!' },
    },
  ],
  variants: [
    {},
    {
      'Lê Tuấn Anh': 'Nguyễn Văn Minh', 'dichvucong-gov.vip': 'vneid-dancu06.top',
      '318/TB-C06-ĐA06': '452/CV-BCA-QLHC',
    },
  ],
  stages: [
    {
      messages: [
        { from: 'them', text: 'Chào cháu, tôi là Trung úy Lê Tuấn Anh - Cán bộ chuyên trách Đề án 06 quận/huyện. Tôi gửi công văn khẩn cấp yêu cầu cháu rà soát thông tin mã định danh cá nhân phục vụ kỳ thi sắp tới.', delayMs: 1000, flagId: 'gov-impersonation' },
        { from: 'them', kind: 'image', image: { type: 'dvc-notice', params: { docNumber: '318/TB-C06-ĐA06' } }, delayMs: 1600, flagId: 'fake-notice' },
        { from: 'them', text: 'Hệ thống phát hiện tài khoản VNeID của cháu chưa cập nhật sinh trắc học và lệch dữ liệu năm sinh với Bộ GD&ĐT. Nếu không hoàn tất trước 17h chiều nay, hồ sơ dự thi của cháu sẽ bị hệ thống TỰ ĐỘNG HỦY TƯ CÁCH THI!', delayMs: 1900, flagId: 'exam-threat' },
        { from: 'them', kind: 'link', link: { title: 'Cổng Dịch Vụ Công Quốc Gia - Cập nhật dữ liệu số 06', domain: 'dichvucong-gov.vip', desc: 'Tải ứng dụng Dịch Vụ Công v2.0 để xác thực khuôn mặt từ xa' }, delayMs: 1500, flagId: 'fake-domain' },
      ],
      choices: [
        { id: 'panic-click', label: '📲 Bấm link tải ngay vì sợ bị hủy thi', reply: 'Cháu hoảng quá, để cháu tải về làm theo ngay chú ơi!', outcome: 'continue', next: 1 },
        { id: 'ask-station', label: '🏢 Xin phép ra trụ sở Công an Phường làm trực tiếp', reply: 'Dạ chiều nay cháu với mẹ sẽ ra thẳng Công an Phường làm trực tiếp được không ạ?', outcome: 'continue', next: 2 },
        { id: 'call-parents-now', verifies: true, label: '📞 Tắt tin nhắn, gọi ngay cho bố mẹ và thầy cô chủ nhiệm', reply: 'Cháu sẽ báo với bố mẹ và cô giáo chủ nhiệm để xác minh lại.', outcome: 'safe', feedbackTitle: SAFE, feedbackBody: 'Quyết định cực kỳ chuẩn xác! Mọi thông tin liên quan đến hồ sơ thi cử đều phải qua nhà trường và phụ huynh. Tuyệt đối không tự ý xử lý theo lời đe dọa của người lạ trên mạng.' },
      ],
    },
    {
      messages: [
        { from: 'them', text: 'Sau khi tải file CongDichVuCong_v2.apk về máy, cháu bấm Cài đặt. Máy có cảnh báo "Tệp có thể gây hại" thì cứ chọn "Vẫn cài đặt" nhé.', delayMs: 1300, flagId: 'sideload-apk' },
        { from: 'them', kind: 'image', image: { type: 'permission', params: PERM }, delayMs: 1600, flagId: 'accessibility-trojan' },
        { from: 'them', kind: 'voice', voice: { seconds: 11, profile: 'recruiter' }, text: 'Cháu nghe chú dặn này: Khi mở app, máy sẽ hỏi cấp quyền Hỗ trợ Trợ năng Accessibility, cháu phải bấm Cho phép bật xanh lên nhé. Đây là quyền bảo mật của Bộ Công an để AI quét khuôn mặt đồng bộ hồ sơ.', delayMs: 2200, flagId: 'accessibility-trojan' },
        { from: 'them', text: 'Bật xong màn hình sẽ tạm tắt đen khoảng 5 phút để hệ thống truyền dữ liệu về máy chủ, cháu TUYỆT ĐỐI không bấm tắt nguồn hay thoát ra!', delayMs: 1800 },
      ],
      choices: [
        { id: 'grant-permission', label: '⚙️ Bật quyền Trợ năng cho app lạ', reply: 'Dạ cháu đã bật quyền Trợ năng theo lời chú rồi ạ', outcome: 'trap', feedbackTitle: TRAP, feedbackBody: 'Cực kỳ nguy hiểm! Khi bạn bật quyền "Trợ năng", kẻ gian từ xa đã kiểm soát 100% điện thoại. Màn hình đen là lúc chúng âm thầm mở ứng dụng ngân hàng, đọc trộm OTP và rút sạch tiền trong tài khoản của bạn và bố mẹ.' },
        { id: 'stop-app', verifies: true, label: '🛑 Nhận diện mã độc nguy hiểm, xóa file và ngắt mạng', reply: 'Cơ quan nhà nước không bao giờ bắt bật quyền Trợ năng trên điện thoại. Tôi không cài!', outcome: 'safe', feedbackTitle: SAFE, feedbackBody: 'Tuyệt vời! Bạn vừa chặn đứng một vụ tấn công mã độc ngân hàng nguy hiểm nhất hiện nay. Không một ứng dụng chính thống nào được phép đòi quyền Trợ năng để can thiệp sâu vào hệ thống điện thoại.' },
      ],
    },
    {
      messages: [
        { from: 'them', text: 'Cháu không hiểu à?! Cán bộ ở phường không phụ trách dữ liệu máy chủ quốc gia, ra đó xếp hàng mất cả ngày không kịp trước 17h đâu!', delayMs: 1400, flagId: 'exam-threat' },
        { from: 'them', text: 'Tôi đang tạo điều kiện hỗ trợ trực tuyến cho học sinh vùng ưu tiên. Cháu không làm theo hướng dẫn ngay thì tự chịu trách nhiệm nếu bị cấm thi nhé!', delayMs: 1700 },
      ],
      choices: [
        { id: 'scared-obey', label: '😨 Sợ bị kỷ luật nên bấm link làm theo', reply: 'Dạ chú đừng báo hủy thi của cháu, cháu cài liền đây ạ', outcome: 'continue', next: 1 },
        { id: 'firm-stand', verifies: true, label: '🛡️ Kiên quyết: Chỉ làm việc trực tiếp tại trụ sở Công an', reply: 'Công an thật luôn tiếp dân tại trụ sở. Nếu có sai sót em sẽ ra tận nơi làm việc với cán bộ tiếp dân.', outcome: 'safe', feedbackTitle: SAFE, feedbackBody: 'Bản lĩnh tuyệt vời! Kẻ lừa đảo rất sợ nạn nhân ra cơ quan công an thật hoặc hỏi người lớn. Thái độ kiên định của bạn đã vô hiệu hóa hoàn toàn chiêu trò thao túng tâm lý bằng quyền lực ảo.' },
      ],
    },
  ],
}

