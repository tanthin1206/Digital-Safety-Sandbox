# Digital Safety Sandbox

Web app mô phỏng lừa đảo mạng (3 tình huống) cho học sinh. Vite + React + TypeScript + Tailwind.

## Chạy thử

```
npm install
npm run dev
```

## Kết nối Google Sheets
1. Tạo Google Sheet mới > Extensions > Apps Script, dán nội dung `apps-script/Code.gs`.
2. Project Settings > Script properties: thêm `TEACHER_KEY` (mật khẩu giáo viên).
3. Deploy > New deployment > Web app (Execute as: Me, Access: Anyone). Copy URL `/exec`.
4. Local: tạo `.env.local` với `VITE_SHEET_URL=<URL>`.
   GitHub: Settings > Secrets and variables > Actions > thêm secret `VITE_SHEET_URL`.

## Deploy GitHub Pages
Đẩy code lên nhánh `main`, vào Settings > Pages > Source: **GitHub Actions**. Workflow `.github/workflows/deploy.yml` sẽ tự build và publish.

## Dashboard giáo viên
Mở `<link>/#/teacher`, nhập `TEACHER_KEY`.

## Thêm kịch bản
Tạo file mới trong `src/scenarios/` theo kiểu `Scenario` rồi thêm vào `src/scenarios/index.ts`. (Phần kết quả/dashboard đang tính theo 3 tình huống, chỉnh `Result` nếu đổi số lượng.)
