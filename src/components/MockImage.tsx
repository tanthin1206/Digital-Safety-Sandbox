import type { ImageType } from '../scenarios/types'

function Stamp() {
  return (
    <div className="pointer-events-none absolute right-2 top-2 rotate-[-12deg] rounded border-2 border-red-500/70 px-1.5 text-[9px] font-black tracking-wider text-red-500/70">
      MÔ PHỎNG
    </div>
  )
}

function Row({ k, v, bold }: { k: string; v: string; bold?: boolean }) {
  return (
    <div className="flex justify-between gap-2 border-b border-dashed border-slate-200 py-1">
      <span className="text-slate-500">{k}</span>
      <span className={`text-right ${bold ? 'font-bold text-red-600' : 'font-medium text-slate-800'}`}>{v}</span>
    </div>
  )
}

type Props = { type: ImageType; params?: Record<string, string>; large?: boolean }

const REAL_IMAGES: Partial<Record<ImageType, { src: string; caption: string }>> = {
  'fake-bill': { src: 'images/fake_banking_bill.jpg', caption: 'Biên lai Napas 24/7 (Fake Bill)' },
  'hospital': { src: 'images/hospital_bill.jpg', caption: 'Phiếu tạm ứng viện phí Cấp cứu 115' },
  'telegram-group': { src: 'images/telegram_task_group.jpg', caption: 'Ảnh chụp nhóm Telegram VIP' },
  'dvc-notice': { src: 'images/dvc_official_notice.jpg', caption: 'Công văn khẩn Đề án 06 giả mạo' },
  'border-job': { src: 'images/border_job_banner.jpg', caption: 'Poster tuyển dụng Mộc Bài' },
}

/** "Hình ảnh" hiển thị trong tin nhắn và công cụ soi chiếu. Tất cả hình ảnh và thông tin là mô phỏng giáo dục. */
export default function MockImage({ type, params, large }: Props) {
  const realImg = REAL_IMAGES[type]
  if (realImg) {
    return (
      <div className={`relative overflow-hidden rounded-xl border border-slate-300 shadow-md ${large ? 'w-[290px]' : 'w-[230px]'}`}>
        <Stamp />
        <img
          src={realImg.src}
          alt={realImg.caption}
          className="w-full h-auto object-cover max-h-[380px] bg-slate-100"
          loading="lazy"
        />
        <div className="bg-slate-900/85 backdrop-blur-xs px-2.5 py-1 text-[10px] text-white flex items-center justify-between">
          <span className="font-semibold text-amber-300">{realImg.caption}</span>
          <span className="text-[9px] text-slate-300">🔍 Phóng to</span>
        </div>
      </div>
    )
  }

  const p = (k: string, d: string) => params?.[k] ?? d
  const box = `relative overflow-hidden text-[11px] ${large ? 'w-[230px] origin-top scale-[1.2]' : 'w-[230px]'}`

  if (type === 'invoice')
    return (
      <div className={`${box} bg-white p-3`}>
        <Stamp />
        <div className="text-center text-[10px] font-bold text-blue-700">TRUNG TÂM ANH NGỮ {p('center', 'BRIGHT')}</div>
        <div className="mb-1 text-center text-sm font-black text-slate-800">PHIẾU THU HỌC PHÍ</div>
        <Row k="Học viên" v={p('student', 'Nguyễn Minh Anh')} />
        <Row k="Khoá học" v="IELTS 6.5 - Quý 4" />
        <Row k="Hạn nộp" v="HÔM NAY" bold />
        <Row k="Số tiền" v={p('amount', '3.000.000 đ')} bold />
        <Row k="STK nhận" v="0123 456 789" />
        <Row k="Chủ TK" v={p('owner', 'TRAN THI KIM NGAN')} />
        <div className="mt-2 text-right text-[9px] italic text-slate-400">Kế toán (đã ký)</div>
      </div>
    )

  if (type === 'hospital')
    return (
      <div className={`${box} bg-white p-3`}>
        <Stamp />
        <div className="text-center text-[10px] font-bold text-emerald-700">BỆNH VIỆN ĐA KHOA (GIẢ LẬP)</div>
        <div className="mb-1 text-center text-sm font-black text-slate-800">PHIẾU TẠM ỨNG VIỆN PHÍ</div>
        <Row k="Bệnh nhân" v={p('patient', 'Trần Văn Tuấn')} />
        <Row k="Khoa" v="Cấp cứu - Chấn thương" />
        <Row k="Tình trạng" v="Chờ mổ khẩn" bold />
        <Row k="Tạm ứng" v={p('amount', '12.000.000 đ')} bold />
        <Row k="Trạng thái" v="CHƯA THANH TOÁN" bold />
        <div className="mt-2 flex justify-between text-[9px] italic text-slate-400">
          <span>Bác sĩ điều trị</span>
          <span>Thu ngân</span>
        </div>
      </div>
    )

  if (type === 'license')
    return (
      <div className={`${box} border-4 border-double border-amber-600 bg-amber-50 p-3 text-center`}>
        <Stamp />
        <div className="text-[9px] font-bold text-slate-700">CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
        <div className="mt-1 text-xs font-black text-amber-800">GIẤY CHỨNG NHẬN ĐĂNG KÝ DOANH NGHIỆP</div>
        <div className="mt-2 text-[10px] text-slate-700">{p('company', 'CÔNG TY TNHH TM SAO VIỆT')}</div>
        <div className="text-[10px] text-slate-600">Mã số thuế: 0123456789</div>
        <div className="text-[10px] text-slate-600">Ngành nghề: Thương mại điện tử</div>
        <div className="mx-auto mt-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-red-500 text-[8px] font-bold text-red-500">
          ĐÃ DUYỆT
        </div>
      </div>
    )

  if (type === 'permission')
    return (
      <div className={`${box} bg-white p-3`}>
        <Stamp />
        <div className="pr-14 text-[12px] font-bold text-slate-800">Cho phép "{p('app', 'SoLienLac+')}" truy cập?</div>
        {['Trợ năng (điều khiển màn hình)', 'Đọc và gửi tin nhắn SMS', 'Hiển thị trên ứng dụng khác', 'Quản trị thiết bị'].map((t) => (
          <div key={t} className="flex items-center gap-2 border-b border-slate-100 py-1.5 text-slate-700">
            <span className="text-green-600">✔</span>
            {t}
          </div>
        ))}
        <div className="mt-2 flex justify-end gap-3 text-[11px] font-bold">
          <span className="text-slate-400">TỪ CHỐI</span>
          <span className="text-blue-600">CHO PHÉP TẤT CẢ</span>
        </div>
      </div>
    )

  if (type === 'offer')
    return (
      <div className={`${box} bg-white p-3`}>
        <Stamp />
        <div className="text-center text-[10px] font-bold text-rose-700">TẬP ĐOÀN GOLDEN LINK (GIẢ LẬP)</div>
        <div className="mb-1 text-center text-sm font-black text-slate-800">THƯ MỜI LÀM VIỆC</div>
        <Row k="Vị trí" v="CSKH online" />
        <Row k="Nơi làm việc" v="Campuchia" bold />
        <Row k="Lương" v={p('salary', '25-60 triệu/tháng')} bold />
        <Row k="Bằng cấp" v="KHÔNG YÊU CẦU" />
        <Row k="Quyền lợi" v="Bao vé máy bay, ăn ở" />
        <Row k="Hồ sơ" v="Hộ chiếu / CCCD" />
        <Row k="Địa chỉ tại VN" v="(không ghi)" />
      </div>
    )

  if (type === 'fake-bill')
    return (
      <div className={`${box} rounded-lg bg-emerald-950 p-3 text-white shadow-md`}>
        <Stamp />
        <div className="flex items-center justify-between border-b border-emerald-800 pb-2">
          <div className="flex items-center gap-1.5">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">✓</div>
            <span className="text-[10px] font-bold tracking-wide text-emerald-400">CHUYỂN TIỀN THÀNH CÔNG</span>
          </div>
          <span className="text-[9px] text-emerald-300">24/7 NAPAS</span>
        </div>
        <div className="my-2.5 text-center">
          <div className="text-[10px] text-slate-300">Số tiền chuyển</div>
          <div className="text-xl font-extrabold text-emerald-300 tracking-tight">{p('amount', '5.000.000 đ')}</div>
        </div>
        <div className="space-y-1 rounded bg-black/30 p-2 text-[10px]">
          <div className="flex justify-between"><span className="text-slate-400">Người nhận:</span><span className="font-semibold text-white">{p('recipient', 'NGUYEN HOANG LONG (Bạn)')}</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Ngân hàng:</span><span className="text-slate-200">MB BANK</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Số TK nhận:</span><span className="text-slate-200">{p('acc', '9988****123')}</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Nội dung:</span><span className="text-slate-200">{p('desc', 'Minh Anh chuyen tien hang')}</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Mã giao dịch:</span><span className="font-mono text-[9px] text-emerald-400">FT24100799281</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Thời gian:</span><span className="text-slate-400">Vừa xong (09:40)</span></div>
        </div>
        <div className="mt-1 text-center text-[8px] text-slate-400 italic">Biên lai ngân hàng số tự động</div>
      </div>
    )

  if (type === 'dvc-notice')
    return (
      <div className={`${box} border border-red-700 bg-red-50/50 p-2.5 shadow-sm text-slate-900`}>
        <Stamp />
        <div className="text-center border-b border-red-200 pb-1.5">
          <div className="text-[8px] font-bold text-slate-600 uppercase">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
          <div className="text-[7px] text-slate-500">Độc lập - Tự do - Hạnh phúc</div>
          <div className="mt-1 text-[9px] font-black text-red-700 leading-tight">CỔNG DỊCH VỤ CÔNG QUỐC GIA - ĐỀ ÁN 06</div>
          <div className="text-[8px] font-bold text-slate-800">THÔNG BÁO KHẨN ĐỐI SOÁT DỮ LIỆU ĐỊNH DANH HỌC SINH</div>
        </div>
        <div className="mt-1.5 space-y-1 text-[9px]">
          <div><b>Học sinh:</b> {p('studentName', 'Nguyễn Hoàng Long')} - <b>Trường:</b> THPT Chuyên (Giả lập)</div>
          <div className="text-red-700 font-semibold">Tình trạng: <span className="underline">LỆCH MÃ ĐỊNH DANH VNeID MỨC 2</span></div>
          <div className="text-slate-700 leading-snug">Hồ sơ chưa đồng bộ với CSDL Quốc gia. <b>Hạn chót 17h00 hôm nay</b> để kịp cấp Số báo danh thi tuyển sinh. Quá hạn sẽ bị khóa danh sách dự thi.</div>
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-red-200 pt-1 text-[8px]">
          <span className="text-slate-500">Ký duyệt điện tử: 2025/CA-CSQLHC</span>
          <span className="rounded bg-red-600 px-1 py-0.5 font-bold text-white">ĐÓNG DẤU MẬT</span>
        </div>
      </div>
    )

  if (type === 'telegram-group')
    return (
      <div className={`${box} rounded-lg bg-[#182533] p-2.5 text-white shadow-md font-sans`}>
        <Stamp />
        <div className="border-b border-slate-700 pb-1 flex items-center justify-between">
          <div>
            <div className="font-bold text-[10px] text-sky-400">HỘI CTV ĐÁNH GIÁ TIKTOK SHOP VIP</div>
            <div className="text-[8px] text-slate-400">48 thành viên · 19 online</div>
          </div>
          <span className="text-xs">📢</span>
        </div>
        <div className="my-1.5 space-y-1.5 text-[9px]">
          <div className="bg-[#243447] p-1.5 rounded">
            <span className="text-amber-400 font-bold">Thảo My (L11):</span> Đã nhận 420.000đ đơn 300k về ví rồi admin ơi! Uy tín thật luôn 🎉
          </div>
          <div className="bg-[#243447] p-1.5 rounded">
            <span className="text-sky-300 font-bold">Hoàng Bách:</span> Ai nạp đơn VIP 1 triệu chưa? Nhận lại 1tr450k trong 3 phút sướng thật sự.
          </div>
          <div className="bg-[#2b5278] p-1.5 rounded text-white border-l-2 border-sky-400">
            <span className="text-rose-300 font-bold">Trưởng nhóm - Thùy Dung:</span> Còn 2 suất đơn bù hoa hồng 35% cho thành viên mới, ai nhận ib ngay!
          </div>
        </div>
        <div className="text-center text-[8px] text-slate-400">Tin nhắn tự động cập nhật liên tục</div>
      </div>
    )

  if (type === 'border-job')
    return (
      <div className={`${box} border-2 border-indigo-600 bg-indigo-50/60 p-2.5 text-slate-900 shadow-sm`}>
        <Stamp />
        <div className="text-center border-b border-indigo-200 pb-1">
          <div className="text-[10px] font-black text-indigo-900">VĂN PHÒNG CÔNG NGHỆ & CSKH MỘC BÀI</div>
          <div className="text-[8px] text-indigo-600 font-bold">TUYỂN DỤNG TRỰC TIẾP TẠI TÂY NINH (KHÔNG QUA TRUNG GIAN)</div>
        </div>
        <div className="mt-1.5 space-y-1 text-[9px]">
          <Row k="Vị trí" v="Trực chat page / CSKH máy lạnh" />
          <Row k="Yêu cầu" v="16-25 tuổi, gõ máy tính cơ bản" />
          <Row k="Thu nhập" v={p('salary', '18 - 28 triệu/tháng')} bold />
          <Row k="Ăn ở" v="Bao trọn ký túc xá máy lạnh 2 người" />
          <Row k="Đưa đón" v="Xe 16 chỗ đón miễn phí tại TP.HCM" />
          <Row k="Cam kết" v="KHÔNG THU PHÍ - THỬ VIỆC 2 NGÀY" bold />
        </div>
        <div className="mt-1 text-[8px] text-slate-500 italic text-center">Mang theo CCCD làm thẻ ra vào khu công nghiệp</div>
      </div>
    )

  return (
    <div className={`${box} bg-slate-900 p-3 text-white`}>
      <Stamp />
      <div className="text-[10px] text-slate-400">Ví của tôi</div>
      <div className="text-[10px] text-green-400">✔ Rút tiền thành công</div>
      <div className="mb-2 text-2xl font-black">+5.200.000 đ</div>
      {[
        [p('n1', 'Mai** (L11)'), '+5.200.000'],
        ['Hùng** (SV)', '+3.800.000'],
        ['Thảo** (L12)', '+7.100.000'],
      ].map(([n, a]) => (
        <div key={n} className="flex justify-between border-t border-slate-700 py-1">
          <span className="text-slate-300">{n}</span>
          <span className="font-bold text-green-400">{a}</span>
        </div>
      ))}
      <div className="mt-1 text-[9px] text-slate-500">Cập nhật: hôm nay 09:12</div>
    </div>
  )
}
