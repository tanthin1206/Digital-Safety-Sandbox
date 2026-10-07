import type { Scenario } from './types'

const TRAP = '🔴 SẬP BẪY!'
const SAFE = '🟢 CHÍNH XÁC!'

export const scenario5: Scenario = {
  id: 'sc5-abroad-job',
  title: 'Bẫy "Việc nhẹ lương cao" Mộc Bài: Cạm bẫy buôn người qua biên giới',
  description: 'Messenger · Đội lốt trực page game online tại Tây Ninh, bao ăn ở xe đưa đón, dặn giấu gia đình đi đêm.',
  platform: 'messenger',
  contactName: 'Hoàng Long - Nhân Sự KCN Mộc Bài',
  contactStatus: 'Đang hoạt động',
  avatarUrl: 'images/avatar_hoang_long.jpg',
  redFlags: [
    { id: 'disguised-location', label: 'Vỏ bọc "Khu kinh tế Mộc Bài / Long An giáp ranh"', explanation: 'Bọn buôn người không dại gì nói thẳng đi Campuchia mà nói dối là làm việc tại khu công nghiệp sát biên giới Tây Ninh để nạn nhân mất cảnh giác.' },
    { id: 'too-good-entry', label: 'Lương 18-25 triệu chỉ để gõ phím, không cần bằng cấp', explanation: 'Mức thu nhập phi thực tế cho lao động phổ thông chưa có kinh nghiệm. Mồi nhử "thử việc 2 ngày không thích thì về" là lời nói dối chí mạng.' },
    { id: 'isolate-victim', label: 'Dặn giấu gia đình, lấy cớ "suất tuyển nội bộ"', explanation: 'Chiêu bài cô lập nạn nhân: ngăn cản nạn nhân hỏi ý kiến cha mẹ, thầy cô trước khi bị đưa lên xe.' },
    { id: 'shuttle-trap', label: 'Hẹn đón ban đêm bằng xe kín tại bến xe / điểm vắng', explanation: 'Xe trung chuyển 16 chỗ dán phim cách nhiệt tối màu chạy thẳng qua đường tiểu ngạch biên giới trong đêm, tước đoạt hoàn toàn khả năng kháng cự.' },
    { id: 'cccd-confiscation', label: 'Yêu cầu mang theo CCCD gốc để làm thủ tục', explanation: 'Khi lên xe hoặc vừa qua biên giới, chúng sẽ lập tức thu giữ toàn bộ giấy tờ tùy thân và điện thoại để khống chế, đòi tiền chuộc hàng trăm triệu.' },
  ],
  checks: [
    {
      id: 'zoom-job', tool: 'zoom', label: 'Soi poster tuyển dụng KCN Mộc Bài', verdict: 'warn',
      title: 'Phân tích thông báo tuyển dụng việc làm',
      body: 'Thông tin tuyển dụng có tất cả các dấu hiệu của đường dây đưa người vượt biên trái phép.',
      image: { type: 'border-job', params: { salary: '18 - 25 Triệu/tháng' } },
      rows: [
        { k: 'Địa điểm làm việc', v: 'Mập mờ "Khu kinh tế Mộc Bài", không có số nhà, tên tòa nhà cụ thể' },
        { k: 'Hợp đồng lao động', v: 'Không có hợp đồng pháp lý, không đóng BHXH theo luật Việt Nam' },
        { k: 'Phương tiện đưa đón', v: 'Hẹn đón 21h đêm tại cây xăng gần bến xe An Sương - thủ đoạn gom người né công an' },
      ],
      flagId: 'disguised-location',
    },
    {
      id: 'company', tool: 'company', label: 'Tra cứu pháp nhân "Tập đoàn Game SunRise"', verdict: 'warn',
      title: 'Tra cứu hệ thống ĐKKD Bộ Kế hoạch & Đầu tư',
      body: 'Không tồn tại doanh nghiệp hay văn phòng đại diện nào tại Tây Ninh với tên gọi này.',
      rows: [
        { k: 'Tên đơn vị', v: 'TẬP ĐOÀN CÔNG NGHỆ GIẢI TRÍ SUNRISE MỘC BÀI' },
        { k: 'Tình trạng pháp lý', v: 'Hoàn toàn không có đăng ký doanh nghiệp tại Việt Nam' },
        { k: 'Cảnh báo Bộ Công an', v: 'Khu vực giáp ranh Mộc Bài - Bavet có hàng chục casino và ổ nhóm lừa đảo trực tuyến' },
      ],
      flagId: 'too-good-entry',
    },
    {
      id: 'call-police', tool: 'call', label: 'Gọi Đường dây nóng Phòng CSHS / Chống buôn người', verdict: 'ok',
      title: 'Tư vấn từ Cán bộ Phòng Cảnh sát Hình sự (PC02)',
      body: 'Cảnh sát khẩn cấp cảnh báo đây là cái bẫy buôn người đặc biệt nguy hiểm.',
      speech: { profile: 'recruiter', text: 'Cảnh sát hình sự xin nghe. Em tuyệt đối không được đi! Đây là thủ đoạn lừa bán người sang các đặc khu casino Campuchia để ép lừa đảo qua mạng. Khi xe chạy qua biên giới chúng sẽ đánh đập, tịch thu điện thoại và bắt gia đình chuộc hàng trăm triệu đồng.' },
      flagId: 'shuttle-trap',
    },
    {
      id: 'call-recruiter', tool: 'call', label: 'Gọi số "Anh Long nhân sự"', verdict: 'warn', risky: true,
      title: 'Gọi số điện thoại đối tượng môi giới',
      body: 'Kẻ môi giới sử dụng giọng điệu thân thiện, thúc ép bạn mang CCCD và ra điểm hẹn một mình.',
      speech: { profile: 'recruiter', text: 'Em cứ yên tâm, xe 16 chỗ đón tận nơi miễn phí. Em đừng nói với bố mẹ kẻo các cụ ở quê lạc hậu lại cản trở em kiếm tiền. Nhớ mang theo CCCD gốc tối nay 9 giờ có mặt ở bến xe nha!' },
    },
  ],
  variants: [
    {},
    { 'Hoàng Long': 'Thanh Tùng', 'SunRise': 'Dragon Star', '18 - 25 Triệu': '20 - 30 Triệu', 'An Sương': 'Miền Tây' },
  ],
  stages: [
    {
      messages: [
        { from: 'them', text: 'Chào em! Anh Long bên nhân sự Tập đoàn Công nghệ Game SunRise đây. Anh thấy em có để lại thông tin tìm việc văn phòng làm tại khu vực phía Nam đúng không em?', delayMs: 800 },
        { from: 'them', kind: 'image', image: { type: 'border-job', params: { salary: '18 - 25 Triệu/tháng' } }, delayMs: 1500, flagId: 'too-good-entry' },
        { from: 'them', text: 'Bên anh cần tuyển gấp 10 bạn trực tổng đài và chat chăm sóc khách hàng game trực tuyến tại Văn phòng đại diện Khu kinh tế Cửa khẩu Mộc Bài (Tây Ninh). Lương cứng 18-25 triệu + bao ăn ở phòng máy lạnh 100%!', delayMs: 1800, flagId: 'disguised-location' },
        { from: 'them', text: 'Công việc chỉ ngồi văn phòng gõ máy tính, không cần bằng cấp hay kinh nghiệm gì cả. Công ty có xe 16 chỗ đưa đón MIỄN PHÍ từ Bến xe An Sương chạy thẳng tới ký túc xá công ty nha!', delayMs: 1800 },
      ],
      choices: [
        { id: 'ask-schedule', label: '🚌 Hỏi thời gian xe đón và thủ tục mang theo', reply: 'Dạ nghe hấp dẫn quá, xe đón mấy giờ và em cần chuẩn bị những gì vậy anh?', outcome: 'continue', next: 1 },
        { id: 'ask-border', label: '❓ Hỏi sao địa điểm lại nằm sát biên giới Campuchia', reply: 'Ủa sao văn phòng lại đặt ở sát cửa khẩu Mộc Bài giáp biên giới vậy anh?', outcome: 'continue', next: 2 },
        { id: 'refuse-straight', verifies: true, label: '🛡️ Nhận diện bẫy buôn người Mộc Bài, từ chối và báo phụ huynh', reply: 'Em không quan tâm việc này, em xin phép từ chối.', outcome: 'safe', feedbackTitle: SAFE, feedbackBody: 'Quyết định cứu rỗi tương lai! Tuyệt đối không bao giờ tin các lời mời làm việc "không bằng cấp, lương trên 15 triệu" tại các khu vực giáp biên giới. Hàng ngàn nạn nhân đã bị lừa bán sang các sòng bạc với kịch bản y hệt.' },
      ],
    },
    {
      messages: [
        { from: 'them', text: 'Tối nay 21h30 có chuyến xe chở các bạn đợt này xuất phát từ Cây xăng gần Bến xe An Sương. Em chỉ cần chuẩn bị vài bộ quần áo và BẮT BUỘC mang theo bản gốc Căn cước công dân (CCCD) để anh làm thẻ ra vào khu công nghiệp.', delayMs: 1400, flagId: 'cccd-confiscation' },
        { from: 'them', kind: 'voice', voice: { seconds: 12, profile: 'recruiter' }, text: 'Em lưu ý dặn kỹ này: Đây là suất tuyển nội bộ do anh bảo lãnh riêng, em tuyệt đối KHÔNG ĐƯỢC nói cho bố mẹ hay bạn bè biết nhé. Người lớn ở quê hay lo hão rồi cản trở đường làm giàu của em đó.', delayMs: 2200, flagId: 'isolate-victim' },
        { from: 'them', text: 'Em cứ lên xe đi thử 2 ngày trải nghiệm ký túc xá, nếu không ưng công ty cho xe đưa em về tận nhà miễn phí, không mất một đồng nào đâu mà sợ!', delayMs: 1600, flagId: 'shuttle-trap' },
      ],
      choices: [
        { id: 'get-on-van', label: '🎒 Lén xếp đồ, cầm CCCD ra điểm hẹn lên xe', reply: 'Dạ vâng anh, 9h tối nay em có mặt tại cây xăng lên xe ạ!', outcome: 'trap', feedbackTitle: TRAP, feedbackBody: 'THẢM KỊCH ĐÃ XẢY RA! Chiếc xe 16 chỗ tối màu sẽ không dừng ở Tây Ninh mà đưa thẳng bạn vượt biên giới trong đêm sang Bavet/Sihanoukville (Campuchia). Tại đây bạn sẽ bị giam lỏng, tra tấn, ép làm việc lừa đảo 16h/ngày và gia đình bị tống tiền 200 - 500 triệu đồng tiền chuộc.' },
        { id: 'call-parents-police', verifies: true, label: '🚨 Không đi! Báo ngay cho cha mẹ và gọi Cảnh sát Hình sự', reply: 'Tôi đã báo thông tin xe đón và số điện thoại của anh cho cơ quan Công an.', outcome: 'safe', feedbackTitle: SAFE, feedbackBody: 'BẠN ĐÃ THOÁT KHỎI BẪY BUÔN NGƯỜI TỬ THẦN! Lời dặn "giấu gia đình" và "hẹn xe đón ban đêm" chính là dấu hiệu 100% của tội phạm mua bán người xuyên quốc gia.' },
      ],
    },
    {
      messages: [
        { from: 'them', text: 'À vì khu kinh tế cửa khẩu được miễn thuế doanh nghiệp công nghệ cao nên tập đoàn mới đặt trụ sở ở đó em ơi, văn phòng máy lạnh xịn sò lắm!', delayMs: 1300 },
        { from: 'them', text: 'Em đừng có nghe đồn bậy bạ trên mạng. Toàn các bạn làm biếng không chịu làm rồi bịa chuyện. Rất nhiều bạn sinh viên làm ở đây gửi về cho mẹ mỗi tháng 20 triệu đó.', delayMs: 1600 },
        { from: 'them', kind: 'voice', voice: { seconds: 8, profile: 'recruiter' }, text: 'Chỉ còn đúng 1 chỗ trên xe tối nay thôi em, em không chốt nhanh là anh nhường cho bạn khác ở Bình Dương đấy nhé.', delayMs: 1800 },
      ],
      choices: [
        { id: 'reassured-go', label: '😰 Nghe giải thích xuôi tai nên đồng ý đi', reply: 'Dạ vậy anh giữ chỗ xe tối nay cho em với nha', outcome: 'continue', next: 1 },
        { id: 'firm-no', verifies: true, label: '🛑 Cảnh giác: Từ chối dứt khoát và chặn liên lạc', reply: 'Mọi công việc mập mờ địa chỉ em đều không tham gia. Chào anh.', outcome: 'safe', feedbackTitle: SAFE, feedbackBody: 'Tuyệt vời! Bản năng cảnh giác đã cứu sống bạn. Mọi lời giải thích "miễn thuế", "văn phòng hiện đại" chỉ là bức bình phong che giấu mạng lưới sòng bạc và lừa đảo bên kia biên giới.' },
      ],
    },
  ],
}

