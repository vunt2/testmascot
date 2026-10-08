# Chim Lạc — Mascot Guide Demo 🐦

Một trang demo giáo dục bằng **Next.js 15 + React 19 + TypeScript**, có linh vật Chim Lạc bay từ góc màn hình tới các điểm hướng dẫn.

## Chạy thử

Yêu cầu Node.js 20 trở lên.

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Những gì có trong demo

- Dashboard học tập giả lập: thẻ khóa học, bộ lọc, lộ trình và danh sách việc cần làm.
- Chim Lạc lơ lửng ở góc màn hình và bay tới 4 điểm qua tính năng guided tour.
- Bóng thoại hướng dẫn có nút Tiếp theo, Quay lại, Bỏ qua.
- Hiệu ứng chúc mừng, nút ẩn/hiện mascot, lưu trạng thái tour trên thiết bị.
- Hỗ trợ responsive và reduced motion.

## Tách biệt và tái sử dụng

**Mascot** chỉ nằm trong `src/components/chim-lac/`. 
**Demo page** nằm trong `src/app/` và có thể xóa sau này.

Tài liệu chi tiết và ví dụ copy sang sản phẩm chính: [src/components/chim-lac/README.md](src/components/chim-lac/README.md).

## Về hình ảnh

Đã tích hợp **chính ảnh Chim Lạc gốc bạn gửi** (bản WebP tách nền, thu nhỏ để tối ưu tốc độ) cho nhân vật bay ở góc màn hình: `public/mascot/chim-lac.webp`. Nhân vật lớn trên banner là SVG lấy cảm hứng từ ảnh gốc, có chuyển động cánh và đuôi. Bạn có thể thay ảnh WebP bằng bản độ phân giải cao hơn mà không cần sửa logic tour. Khi dùng ảnh raster, chim bay/lơ lửng như một sprite; cánh chưa đập độc lập.

## Triển khai trực tuyến

Cách đơn giản: import repository vào [Vercel](https://vercel.com/new), chọn framework Next.js, rồi Deploy. Phần này cần chủ repository phê duyệt kết nối và triển khai. Chỉ GitHub repository thôi chưa tạo ra URL demo trực tuyến.

## Kiểm tra

```bash
npm run typecheck
npm run build
```
