import type { LucideIcon } from 'lucide-react';
import avatarImg from './assets/images/db3aad7c-a1ac-4b64-9c3c-427036e440f6.jpg';
import {
  Sparkles,
  GraduationCap,
  ListChecks,
  Target,
  Compass,
  BookOpen,
  FolderSearch,
  FileSpreadsheet,
  ShieldCheck,
  Users,
  Bot,
  Presentation,
  Brain,
  Quote,
} from 'lucide-react';

export const profile = {
  name: 'Nguyễn Thái Tuấn',
  msv: '25051699',
  major: 'Quản Trị Kinh Doanh',
  school: 'Đại học Kinh tế - ĐHQGHN (VNU-UEB)',
  avatar: avatarImg,
};

export type AboutSection = {
  id: string;
  index: string;
  title: string;
  icon: LucideIcon;
  paragraphs: string[];
  highlights?: string[];
};

export const aboutSections: AboutSection[] = [
  {
    id: 'bat-dau',
    index: '01',
    title: 'Bắt đầu từ mình',
    icon: Sparkles,
    paragraphs: [
      'Trước khi làm bài, mình luôn chia nhỏ yêu cầu để biết mình cần làm gì trước, làm gì sau. Mình cẩn thận trong việc lưu trữ, đặt tên file rõ ràng và trích dẫn nguồn đầy đủ để sau này có thể quay lại kiểm chứng bất cứ lúc nào.',
      'Mình sử dụng AI như một công cụ hỗ trợ — lên dàn ý, gợi ý cấu trúc, sửa lỗi diễn đạt. Nhưng bản thân mình vẫn là người tự đối chiếu số liệu, kiểm tra tính hợp lý và chịu trách nhiệm cho nội dung cuối cùng.',
      'Mình đặc biệt hứng thú với làm việc nhóm — nơi mỗi người đóng góp một góc nhìn và cùng nhau hoàn thiện một sản phẩm tốt hơn bất kỳ cá nhân nào làm riêng lẻ.',
    ],
    highlights: [
      'Chia nhỏ yêu cầu thành bước',
      'Đặt tên file & trích dẫn nguồn',
      'AI hỗ trợ — mình quyết định',
      'Thích làm việc nhóm',
    ],
  },
  {
    id: 'thong-tin',
    index: '02',
    title: 'Thông tin học tập',
    icon: GraduationCap,
    paragraphs: [
      'Mình hiện là sinh viên ngành Quản Trị Kinh Doanh tại Đại học Kinh tế — Đại học Quốc gia Hà Nội (VNU-UEB).',
      'Chương trình học giúp mình tiếp cận nhiều lĩnh vực từ quản trị nhân sự, hành vi khách hàng đến vận hành dự án và truyền thông kinh doanh — những mảng mình muốn đào sâu hơn trong thời gian tới.',
    ],
  },
  {
    id: 'xu-ly',
    index: '03',
    title: 'Cách mình xử lý bài',
    icon: ListChecks,
    paragraphs: [
      'Quy trình làm việc của mình được đúc kết thành các từ khóa ngắn gọn nhưng đủ để giữ nhịp công việc không bị đứt đoạn.',
    ],
    highlights: [
      'Chia yêu cầu thành bước',
      'Đặt tên file rõ ràng',
      'Ghi lại nguồn',
      'Kiểm tra số liệu',
      'Theo dõi deadline',
      'Chỉnh bản cuối',
    ],
  },
  {
    id: 'ky-nang',
    index: '04',
    title: 'Kỹ năng mình muốn rèn',
    icon: Target,
    paragraphs: [
      'Mình tập trung rèn bốn nhóm kỹ năng nền tảng để phục vụ cho cả học tập lẫn công việc sau này.',
    ],
    highlights: [
      'Phân tích thông tin',
      'Lập kế hoạch & làm việc nhóm',
      'Đọc & xử lý dữ liệu',
      'Dùng công cụ số / AI có trách nhiệm, có kiểm chứng',
    ],
  },
  {
    id: 'huong-phat-trien',
    index: '05',
    title: 'Hướng mình muốn phát triển',
    icon: Compass,
    paragraphs: [
      'Mình muốn phát triển theo sự kết hợp giữa "tư duy quản trị" và "khả năng xử lý dữ liệu, giao tiếp nhóm" — vừa có cái nhìn tổng thể của người quản lý, vừa có kỹ năng thực thi cụ thể.',
      'Các lĩnh vực mình quan tâm đặc biệt bao gồm:',
    ],
    highlights: [
      'Quản trị nhân sự',
      'Hành vi khách hàng',
      'Vận hành dự án',
      'Truyền thông kinh doanh',
    ],
  },
  {
    id: 'portfolio',
    index: '06',
    title: 'Portfolio này giúp mình nhìn lại điều gì?',
    icon: BookOpen,
    paragraphs: [
      'Portfolio này chứa "6 bài học" phản ánh sự trưởng thành từ kỹ năng nền tảng đến các nhiệm vụ phức tạp hơn — quản lý tệp, đánh giá nguồn, viết prompt AI, làm việc nhóm trực tuyến…',
      'Mình nhận ra rằng chất lượng bài tập không chỉ nằm ở kết quả cuối cùng, mà còn ở toàn bộ quá trình tổ chức và quản lý công việc phía sau nó.',
    ],
  },
];

export type Project = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  summary: string;
  takeaways: string[];
  tags: string[];
};

export const projects: Project[] = [
  {
    id: 'bai-1',
    number: 'Bài 01',
    title: 'Quản lý tệp & đặt tên file',
    subtitle: 'Nền tảng tổ chức công việc',
    icon: FolderSearch,
    summary:
      'Học cách tổ chức thư mục, đặt tên file theo quy tắc thống nhất và lưu trữ có phiên bản để dễ quay lại kiểm chứng.',
    takeaways: [
      'Đặt tên file theo cấu trúc: ngày_vấn_đề_phiên_bản',
      'Tách thư mục theo từng môn học và từng giai đoạn',
      'Lưu bản nháp và bản cuối riêng biệt',
    ],
    tags: ['Tổ chức file', 'Quy ước đặt tên', 'Lưu trữ'],
  },
  {
    id: 'bai-2',
    number: 'Bài 02',
    title: 'Đánh giá nguồn thông tin',
    subtitle: 'Phân biệt nguồn tin đáng tin cậy',
    icon: ShieldCheck,
    summary:
      'Rèn kỹ năng đánh giá độ tin cậy của nguồn — phân biệt tài liệu học thuật, báo chí và nội dung tự phát hành.',
    takeaways: [
      'Kiểm tra tác giả, cơ quan phát hành và ngày cập nhật',
      'So sánh nhiều nguồn trước khi trích dẫn',
      'Ghi rõ nguồn ngay lúc đọc, không để tới lúc viết',
    ],
    tags: ['Kiểm chứng', 'Trích dẫn', 'Độ tin cậy'],
  },
  {
    id: 'bai-3',
    number: 'Bài 03',
    title: 'Xử lý dữ liệu cơ bản',
    subtitle: 'Đọc và tóm tắt dữ liệu',
    icon: FileSpreadsheet,
    summary:
      'Làm quen với việc đọc bảng số liệu, tóm tắt thông tin chính và rút ra nhận xét có cơ sở từ dữ liệu thô.',
    takeaways: [
      'Xác định nhanh biến chính và đơn vị đo',
      'Tóm tắt bằng 2–3 câu thay vì chép nguyên bảng',
      'Đối chiếu số liệu với nguồn gốc trước khi dùng',
    ],
    tags: ['Đọc dữ liệu', 'Tóm tắt', 'Nhận xét'],
  },
  {
    id: 'bai-4',
    number: 'Bài 04',
    title: 'Viết prompt AI có trách nhiệm',
    subtitle: 'Dùng AI như một công cụ hỗ trợ',
    icon: Bot,
    summary:
      'Học cách viết prompt rõ ràng, yêu cầu AI trích dẫn nguồn và luôn tự kiểm chứng kết quả trước khi sử dụng.',
    takeaways: [
      'Viết prompt theo cấu trúc: vai trò — yêu cầu — định dạng',
      'Yêu cầu AI liệt kê giả định và điểm chưa chắc',
      'Tự đối chiếu mọi số liệu AI đưa ra',
    ],
    tags: ['Prompt', 'AI hỗ trợ', 'Kiểm chứng'],
  },
  {
    id: 'bai-5',
    number: 'Bài 05',
    title: 'Làm việc nhóm trực tuyến',
    subtitle: 'Phối hợp qua công cụ số',
    icon: Users,
    summary:
      'Thực hành phân công việc, theo dõi tiến độ và giữ liên lạc qua công cụ trực tuyến để nhóm cùng tiến bộ.',
    takeaways: [
      'Phân công rõ người — việc — hạn',
      'Cập nhật tiến độ định kỳ trên công cụ chung',
      'Ghi lại quyết định nhóm để tránh hiểu nhầm',
    ],
    tags: ['Làm việc nhóm', 'Phối hợp', 'Công cụ số'],
  },
  {
    id: 'bai-6',
    number: 'Bài 06',
    title: 'Tổng hợp & trình bày',
    subtitle: 'Kết nối kỹ năng thành sản phẩm',
    icon: Presentation,
    summary:
      'Kết hợp các kỹ năng trên để tạo ra một sản phẩm hoàn chỉnh — từ tìm nguồn, xử lý dữ liệu đến trình bày cuối cùng.',
    takeaways: [
      'Gộp kỹ năng nhỏ thành quy trình làm bài hoàn chỉnh',
      'Trình bày rõ ràng, có cấu trúc và trích dẫn đầy đủ',
      'Tự xem lại toàn bộ quá trình trước khi nộp',
    ],
    tags: ['Tổng hợp', 'Trình bày', 'Quy trình'],
  },
];

export type Reflection = {
  id: string;
  title: string;
  icon: LucideIcon;
  body: string;
};

export const reflections: Reflection[] = [
  {
    id: 'tu-duy',
    title: 'Tư duy thay đổi',
    icon: Brain,
    body: 'Mình đi từ việc "làm xong cho có" sang "làm có tổ chức" — mỗi bài không chỉ là kết quả, mà là một lần rèn quy trình.',
  },
  {
    id: 'ky-nang',
    title: 'Kỹ năng tích lũy',
    icon: Sparkles,
    body: 'Từ kỹ năng nền tảng như đặt tên file, mình dần làm được những việc phức tạp hơn: đánh giá nguồn, viết prompt AI, phối hợp nhóm trực tuyến.',
  },
  {
    id: 'trach-nhiem',
    title: 'Trách nhiệm với nội dung',
    icon: ShieldCheck,
    body: 'AI hỗ trợ, nhưng mình là người chịu trách nhiệm cuối cùng. Mình luôn đối chiếu số liệu và kiểm chứng nguồn trước khi sử dụng.',
  },
  {
    id: 'phong-cach',
    title: 'Phong cách làm việc',
    icon: ListChecks,
    body: 'Chia nhỏ yêu cầu, ghi rõ nguồn, theo dõi deadline, chỉnh bản cuối — một thói quen nhỏ nhưng giữ công việc không bị đứt đoạn.',
  },
];

export const closingQuote = {
  text: 'Chất lượng bài tập không chỉ nằm ở kết quả, mà ở cả quá trình tổ chức phía sau nó.',
  author: 'Nguyễn Thái Tuấn',
  icon: Quote,
};

export const navItems = [
  { id: 'about', label: 'About me', href: '/' },
  { id: 'projects', label: 'Projects', href: '/projects' },
  { id: 'conclusion', label: 'Conclusion', href: '/conclusion' },
] as const;
