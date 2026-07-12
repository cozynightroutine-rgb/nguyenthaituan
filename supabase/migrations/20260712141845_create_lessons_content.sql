/*
# Create lesson_content table

1. New Tables
   - `lesson_content`
     - `id` (text, primary key) — matches the project id in data.ts (e.g. 'bai-1')
     - `title` (text) — display title
     - `sections` (jsonb) — array of {heading, body} objects for structured content
     - `created_at` (timestamptz)

2. Security
   - Enable RLS on `lesson_content`.
   - Allow anon + authenticated SELECT (public portfolio — read-only).
   - No insert/update/delete from frontend needed (content is static/seeded).

3. Notes
   - Content is seeded via SQL below.
   - The `sections` column stores structured text so the frontend can render
     headings and paragraphs without parsing raw strings.
*/

CREATE TABLE IF NOT EXISTS lesson_content (
  id          text PRIMARY KEY,
  title       text NOT NULL,
  sections    jsonb NOT NULL DEFAULT '[]',
  created_at  timestamptz DEFAULT now()
);

ALTER TABLE lesson_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_lesson_content" ON lesson_content;
CREATE POLICY "anon_select_lesson_content" ON lesson_content FOR SELECT
  TO anon, authenticated USING (true);

-- ── Seed content ────────────────────────────────────────────────────────────

INSERT INTO lesson_content (id, title, sections) VALUES

('bai-1', 'Quản lý tệp & đặt tên file', '[
  {"heading": "Mục tiêu bài học", "body": "Rèn kỹ năng tổ chức thư mục và đặt tên file theo quy tắc thống nhất, giúp dễ tìm kiếm, theo dõi phiên bản và chia sẻ với người khác."},
  {"heading": "Quy ước đặt tên file", "body": "Mình áp dụng cấu trúc: YYYYMMDD_montasinh_phienbản. Ví dụ: 20240315_baicuoiki_v2.docx. Cách này giúp sắp xếp tự động theo ngày và phân biệt rõ các bản nháp với bản cuối."},
  {"heading": "Cấu trúc thư mục", "body": "Tổ chức theo năm học → học kỳ → môn học. Mỗi môn có ba thư mục con: /tàiliệu (giáo trình, slide), /bàitập (bản đang làm), /nộp (bản cuối đã gửi). Việc tách riêng giúp tránh nhầm lẫn giữa bản nháp và bản hoàn thiện."},
  {"heading": "Kiểm soát phiên bản", "body": "Mỗi lần chỉnh sửa quan trọng, mình lưu thêm bản mới thay vì ghi đè. Cuối cùng chỉ giữ lại bản cuối và một bản nháp gần nhất để tránh thư mục bị lộn xộn."},
  {"heading": "Điểm rút ra", "body": "Thói quen đặt tên nhất quán tiết kiệm rất nhiều thời gian tìm kiếm về sau. Mình từng mất cả buổi tìm một file vì đặt tên tuỳ hứng — giờ thì không còn xảy ra nữa."}
]'::jsonb),

('bai-2', 'Xử lý dữ liệu cơ bản', '[
  {"heading": "Mục tiêu bài học", "body": "Học cách đọc, hiểu và tóm tắt dữ liệu từ bảng biểu, biểu đồ và báo cáo thống kê — rút ra nhận xét có cơ sở thay vì chỉ liệt kê số."},
  {"heading": "Xác định biến và đơn vị", "body": "Bước đầu tiên khi gặp bảng số liệu là xác định: biến nào được đo, đơn vị là gì, và thời điểm thu thập là khi nào. Bỏ qua bước này dễ dẫn đến so sánh nhầm giữa các đơn vị khác nhau."},
  {"heading": "Tóm tắt bằng câu nhận xét", "body": "Thay vì chép lại toàn bộ bảng, mình luyện thói quen viết 2–3 câu nêu xu hướng chính: giá trị nào cao nhất/thấp nhất, có sự thay đổi đáng kể nào không, và điều đó có nghĩa gì trong bối cảnh bài."},
  {"heading": "Kiểm tra trước khi dùng", "body": "Luôn đối chiếu số liệu với nguồn gốc: tổng có khớp không, các mốc thời gian có nhất quán không. Một lần mình phát hiện bảng Excel bị lỗi công thức vì không kiểm tra — may là trước khi nộp."},
  {"heading": "Điểm rút ra", "body": "Dữ liệu chỉ có giá trị khi được đọc đúng. Kỹ năng đọc bảng số liệu và viết nhận xét ngắn gọn, chính xác là nền tảng cho bất kỳ bài phân tích nào sau này."}
]'::jsonb),

('bai-3', 'Đánh giá nguồn thông tin', '[
  {"heading": "Mục tiêu bài học", "body": "Phân biệt nguồn tin đáng tin cậy với nguồn không đáng tin, áp dụng các tiêu chí đánh giá có hệ thống và lập danh mục tài liệu tham khảo đúng chuẩn."},
  {"heading": "Tiêu chí đánh giá CRAAP", "body": "Mình dùng bộ tiêu chí Currency (tính cập nhật), Relevance (mức độ liên quan), Authority (uy tín tác giả/cơ quan), Accuracy (độ chính xác), Purpose (mục đích xuất bản). Áp dụng cho từng nguồn trước khi trích dẫn."},
  {"heading": "Ưu tiên nguồn học thuật", "body": "Bài báo khoa học trên tạp chí Scopus/ISI, sách từ NXB đại học hàng đầu (Oxford, Cambridge, Elsevier, Springer) được ưu tiên nhất. Nguồn mở (web, blog) chỉ dùng để bổ sung thông tin cập nhật, không dùng làm luận cứ chính."},
  {"heading": "Cách ghi nguồn ngay khi đọc", "body": "Mình ghi chú nguồn đầy đủ ngay lúc đọc vào một file tham khảo riêng — tên tác giả, năm, tên bài, nơi xuất bản. Để đến lúc viết mới tìm lại rất tốn thời gian và dễ quên mất."},
  {"heading": "Điểm rút ra", "body": "Chất lượng bài viết phụ thuộc rất nhiều vào chất lượng nguồn. Một nguồn tốt không chỉ tăng độ tin cậy mà còn giúp mình lập luận chặt chẽ và tự tin hơn khi trình bày."}
]'::jsonb),

('bai-4', 'Viết prompt AI có trách nhiệm', '[
  {"heading": "Mục tiêu bài học", "body": "Học cách tương tác với AI hiệu quả và có trách nhiệm — viết prompt rõ ràng, yêu cầu minh bạch về giả định, và luôn kiểm chứng kết quả trước khi dùng."},
  {"heading": "Cấu trúc prompt hiệu quả", "body": "Prompt tốt gồm ba phần: (1) Vai trò — mô tả AI cần đóng vai gì, (2) Yêu cầu cụ thể — muốn làm gì, với dữ liệu gì, (3) Định dạng đầu ra — cần bảng, danh sách hay đoạn văn. Prompt càng rõ, kết quả càng sát nhu cầu."},
  {"heading": "Yêu cầu AI liệt kê giả định", "body": "Mình thường thêm vào cuối prompt: Liệt kê các giả định bạn đang sử dụng và những điểm bạn chưa chắc chắn. Điều này giúp mình biết chỗ nào cần đối chiếu thêm thay vì tin mù quáng."},
  {"heading": "Kiểm chứng kết quả", "body": "Mọi số liệu, tên người, sự kiện mà AI đưa ra đều phải được đối chiếu với nguồn độc lập. AI có thể bịa dẫn chứng nghe rất thuyết phục — mình đã từng bị lừa một lần với một số liệu thống kê không tồn tại."},
  {"heading": "Điểm rút ra", "body": "AI là công cụ hỗ trợ mạnh mẽ nhưng không thay thế được tư duy phê phán. Người dùng AI có trách nhiệm là người dùng có khả năng kiểm chứng — không phải người tin tưởng hoàn toàn."}
]'::jsonb),

('bai-5', 'Áp dụng pháp luật — Quyết định công nhận thỏa thuận', '[
  {"heading": "Câu hỏi trọng tâm", "body": "Vì sao quyết định công nhận sự thỏa thuận vẫn là một hình thức áp dụng pháp luật, mặc dù không có xét xử bằng bản án?"},
  {"heading": "Phân tích", "body": "Dù không trải qua một phiên tòa xét xử tranh tụng và không ban hành bản án, việc ra quyết định công nhận sự thỏa thuận của những người có liên quan vẫn mang đầy đủ các đặc trưng của hoạt động áp dụng pháp luật."},
  {"heading": "Mang tính quyền lực nhà nước", "body": "Tòa án không tự động đóng dấu mà thẩm phán phải tiến hành kiểm tra, đánh giá tính hợp pháp của thỏa thuận. Từ đó xem các bên có tự nguyện không, có bị lừa dối, ép buộc không, có trốn tránh nghĩa vụ với người thứ ba hay vi phạm pháp luật không."},
  {"heading": "Chủ thể thực hiện", "body": "Do cơ quan nhà nước có thẩm quyền thực hiện theo những thủ tục do pháp luật tố tụng quy định — đây là yếu tố phân biệt với các thỏa thuận dân sự thông thường."},
  {"heading": "Hậu quả pháp lý", "body": "Quyết định này có hiệu lực pháp luật ngay lập tức. Nó có giá trị cưỡng chế thi hành tương đương với một bản án đã có hiệu lực pháp luật, và được bảo đảm thực hiện bằng sức mạnh của nhà nước nếu một trong các bên sau đó lật lọng, không tự nguyện tuân thủ."},
  {"heading": "Kết luận", "body": "Ba đặc trưng trên (quyền lực nhà nước, chủ thể có thẩm quyền, hậu quả pháp lý cưỡng chế) là đủ để xác định đây là hoạt động áp dụng pháp luật — hình thức không nhất thiết phải là bản án mới có giá trị pháp lý."}
]'::jsonb),

('bai-6', 'Đánh giá nguồn tin học thuật — AI và giáo dục', '[
  {"heading": "Chủ đề nghiên cứu", "body": "Tác động của trí tuệ nhân tạo AI đến hiệu quả học tập của sinh viên đại học."},
  {"heading": "Phạm vi tìm kiếm", "body": "Mục tiêu: Tìm hiểu các lợi ích và thách thức khi sinh viên sử dụng các công cụ AI trong việc học tập. Phạm vi: Các nghiên cứu từ 2022–2026, tập trung vào giáo dục đại học toàn cầu và tại Việt Nam."},
  {"heading": "Bảng đánh giá độ tin cậy", "body": "10 nguồn được đánh giá:\n• AI in Higher Education (Smith et al., 2024) — Tạp chí Q1, trích dẫn cao (500+) → 5/5\n• Generative AI and Student Ethics (Nguyễn, 2023) — MDPI, bối cảnh Đông Nam Á → 4.5/5\n• The Impact of ChatGPT on Learning (Jones, 2023) — ScienceDirect, khảo sát 10.000 SV → 5/5\n• AI-Driven Personalization (Lee & Kim, 2025) — Tạp chí IEEE → 5/5\n• Chatbots in Medical Education (Brown, 2024) — Tạp chí Y khoa → 4.5/5\n• The AI Era in Pedagogy (Oxford UP, 2023) — NXB đại học hàng đầu → 5/5\n• Luận văn AI & SV Việt Nam (ĐHQG, 2024) → 4/5\n• Forbes Education: AI Trends (2025) → 3.5/5\n• Báo cáo UNESCO về AI và Giáo dục (2023) → 4.5/5\n• Blog Microsoft Research (2024) → 4/5"},
  {"heading": "Phân tích độ tin cậy", "body": "Tác giả: Ưu tiên chuyên gia có H-index cao, thuộc đại học danh tiếng. Cơ quan xuất bản: Tạp chí Scopus/ISI, NXB Elsevier/Springer có độ tin cậy cao nhất nhờ phản biện nghiêm ngặt. Tính cập nhật: Với chủ đề AI, tài liệu từ 2023 trở lại mới đảm bảo thực tiễn. Phương pháp: Bài có phương pháp định lượng/định tính rõ ràng đáng tin hơn nhận định cá nhân."},
  {"heading": "Danh mục tài liệu tham khảo", "body": "1. Brown, A. (2024). Chatbots in Medical Education. Journal of Educational Technology, 15(2), pp. 45-60.\n2. Jones, M. (2023). The Impact of ChatGPT on Learning. Global Education Review, 10(1), pp. 12-25.\n3. Lee, S. and Kim, J. (2025). AI-Driven Personalization in Higher Ed. 2nd edn. Academic Press.\n4. Nguyễn, V. A. (2023). Generative AI and Student Ethics in Vietnam. Southeast Asian Social Science, 8(3), pp. 100-115.\n5. UNESCO (2023). Guidance for generative AI in education and research. UNESCO Publishing."}
]'::jsonb)

ON CONFLICT (id) DO UPDATE
  SET title    = EXCLUDED.title,
      sections = EXCLUDED.sections;
