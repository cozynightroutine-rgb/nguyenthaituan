import { useState, useCallback, useEffect } from 'react';
import { ArrowRight, X, Loader2, AlertCircle, ChevronRight } from 'lucide-react';
import { projects, type Project } from '../data';
import { useReveal } from '../useReveal';
import { supabase, type LessonContent } from '../supabase';

function Intro() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section className="relative overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 right-1/4 h-72 w-96 rounded-full bg-teal-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-56 w-80 rounded-full bg-amber-100/50 blur-3xl" />
      </div>
      <div
        ref={ref}
        className={`container-wide transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <p className="eyebrow mb-5">Projects · Sáu bài học</p>
        <h1 className="display max-w-3xl text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
          Sáu bài học,
          <br />
          <span className="gradient-text">một quá trình trưởng thành</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
          Từ kỹ năng nền tảng như quản lý tệp tin đến những nhiệm vụ phức tạp hơn
          — viết prompt AI, làm việc nhóm trực tuyến và tổng hợp sản phẩm. Chọn
          một bài học để xem nội dung chi tiết.
        </p>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const { ref, visible } = useReveal<HTMLButtonElement>();
  const Icon = project.icon;
  return (
    <button
      ref={ref}
      onClick={onOpen}
      className={`reveal ${
        visible ? 'is-visible' : ''
      } group relative flex flex-col overflow-hidden rounded-3xl border border-ink-200/70 bg-white/70 p-6 text-left backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-teal-300 hover:shadow-xl hover:shadow-ink-900/8 sm:p-7`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-50/0 to-teal-100/0 transition-all duration-500 group-hover:from-teal-50/50 group-hover:to-teal-100/30" />

      <div className="relative flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-700 text-ink-50 shadow-md shadow-teal-900/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-teal-700/40">
          <Icon size={22} />
        </span>
        <span className="font-serif text-sm font-medium text-ink-300 transition-colors duration-300 group-hover:text-ink-400">
          {project.number}
        </span>
      </div>

      <h3 className="relative mt-5 font-serif text-2xl font-medium text-ink-900 transition-colors duration-300 group-hover:text-teal-800">
        {project.title}
      </h3>
      <p className="relative mt-1 text-sm font-medium text-teal-700">{project.subtitle}</p>
      <p className="relative mt-4 text-sm leading-relaxed text-ink-600">{project.summary}</p>

      <div className="relative mt-5 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded-full bg-ink-100 px-3 py-1 text-xs font-medium text-ink-600 transition-colors duration-300 group-hover:bg-teal-100 group-hover:text-teal-700"
          >
            {t}
          </span>
        ))}
      </div>

      <span className="relative mt-5 inline-flex items-center gap-1 text-sm font-medium text-teal-700 transition-all duration-300 group-hover:gap-2">
        Xem nội dung bài học <ChevronRight size={15} />
      </span>
    </button>
  );
}

function LessonModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [content, setContent] = useState<LessonContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('lesson_content')
      .select('*')
      .eq('id', project.id)
      .maybeSingle();

    if (err) {
      setError(err.message);
    } else {
      setContent(data);
    }
    setLoading(false);
  }, [project.id]);

  // Fetch on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchContent(); }, []);

  const Icon = project.icon;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="animate-scale-in relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-ink-50 shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-ink-200/70 bg-white px-6 py-5 sm:px-8">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-700 text-ink-50 shadow-md">
            <Icon size={22} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">
              {project.number}
            </p>
            <h3 className="font-serif text-xl font-medium leading-tight text-ink-900 sm:text-2xl">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-100 text-ink-600 transition-colors hover:bg-ink-200 hover:text-ink-900"
            aria-label="Đóng"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          {loading && (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-ink-400">
              <Loader2 size={28} className="animate-spin text-teal-600" />
              <p className="text-sm">Đang tải nội dung…</p>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
              <AlertCircle size={24} className="text-red-500" />
              <p className="text-sm text-red-700">{error}</p>
              <button
                onClick={fetchContent}
                className="rounded-full bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
              >
                Thử lại
              </button>
            </div>
          )}

          {!loading && !error && !content && (
            <div className="flex flex-col items-center gap-2 py-16 text-ink-400">
              <p className="text-sm">Chưa có nội dung cho bài học này.</p>
            </div>
          )}

          {!loading && !error && content && (
            <div className="space-y-6">
              {content.sections.map((section, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-ink-200/70 bg-white px-5 py-5"
                >
                  <h4 className="font-serif text-base font-semibold text-ink-900 sm:text-lg">
                    {section.heading}
                  </h4>
                  <div className="mt-2 text-sm leading-relaxed text-ink-700 whitespace-pre-line">
                    {section.body}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-ink-200/70 bg-white px-6 py-4 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700"
                >
                  {t}
                </span>
              ))}
            </div>
            <button
              onClick={onClose}
              className="rounded-full bg-ink-950 px-5 py-2 text-sm font-medium text-ink-50 transition-colors hover:bg-teal-700"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CtaNext({ onClick }: { onClick: () => void }) {
  const { ref, visible } = useReveal<HTMLElement>();
  return (
    <section ref={ref} className={`reveal ${visible ? 'is-visible' : ''} py-20`}>
      <div className="container-prose text-center">
        <p className="eyebrow mb-4">Tiếp theo</p>
        <h2 className="display text-3xl sm:text-4xl">Nhìn lại toàn bộ quá trình</h2>
        <p className="mx-auto mt-4 max-w-md text-ink-600">
          Sau sáu bài học, mình đúc kết lại những thay đổi về tư duy, kỹ năng và
          phong cách làm việc.
        </p>
        <button
          onClick={onClick}
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink-950 px-7 py-3.5 text-sm font-medium text-ink-50 shadow-lg transition-all duration-300 hover:gap-3 hover:bg-teal-700"
        >
          Đi tới Conclusion
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
    </section>
  );
}

export default function ProjectsPage({ onNavigate }: { onNavigate: (href: string) => void }) {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <main>
      <Intro />
      <section className="pb-8">
        <div className="container-wide grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={() => setActive(p)} />
          ))}
        </div>
      </section>
      <CtaNext onClick={() => onNavigate('/conclusion')} />
      {active && <LessonModal project={active} onClose={() => setActive(null)} />}
    </main>
  );
}
