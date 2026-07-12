import { useState } from 'react';
import { ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { projects, type Project } from '../data';
import { useReveal } from '../useReveal';

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
          một bài học để xem chi tiết.
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
      className={`reveal ${visible ? 'is-visible' : ''} group relative flex flex-col overflow-hidden rounded-3xl border border-ink-200/70 bg-white/70 p-6 text-left backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-teal-300 hover:shadow-xl hover:shadow-ink-900/8 sm:p-7`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {/* Hover gradient */}
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
      <p className="relative mt-1 text-sm text-teal-700 font-medium">{project.subtitle}</p>
      <p className="relative mt-4 text-sm leading-relaxed text-ink-600">
        {project.summary}
      </p>

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

      <span className="relative mt-5 inline-flex items-center gap-1 text-sm font-medium text-teal-700 transition-all duration-300 group-hover:gap-2 group-hover:text-teal-600">
        Xem chi tiết <ArrowUpRight size={15} />
      </span>
    </button>
  );
}

function Modal({ project, onClose }: { project: Project; onClose: () => void }) {
  const Icon = project.icon;
  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="animate-scale-in relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-ink-50 p-7 shadow-2xl sm:rounded-3xl sm:p-9"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-ink-100 text-ink-600 transition-colors hover:bg-ink-200 hover:text-ink-900"
          aria-label="Đóng"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-700 text-ink-50 shadow-md">
            <Icon size={26} />
          </span>
          <div>
            <p className="font-serif text-sm font-medium text-ink-400">
              {project.number}
            </p>
            <h3 className="font-serif text-2xl font-medium text-ink-900">
              {project.title}
            </h3>
          </div>
        </div>

        <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 inline-block px-3 py-1 rounded-full">
          {project.subtitle}
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-700">
          {project.summary}
        </p>

        <h4 className="mt-7 text-xs font-semibold uppercase tracking-wider text-ink-400">
          Điểm rút ra
        </h4>
        <ul className="mt-3 space-y-2.5">
          {project.takeaways.map((t, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl border border-ink-200/70 bg-white px-4 py-3"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
              <span className="text-sm leading-relaxed text-ink-700">{t}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
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
          className="mt-6 w-full rounded-2xl bg-ink-950 py-3 text-sm font-medium text-ink-50 transition-colors hover:bg-teal-700"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}

function CtaNext({ onClick }: { onClick: () => void }) {
  const { ref, visible } = useReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} py-20`}
    >
      <div className="container-prose text-center">
        <p className="eyebrow mb-4">Tiếp theo</p>
        <h2 className="display text-3xl sm:text-4xl">
          Nhìn lại toàn bộ quá trình
        </h2>
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
      {active && <Modal project={active} onClose={() => setActive(null)} />}
    </main>
  );
}
