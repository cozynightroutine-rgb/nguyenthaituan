import { ArrowRight, ArrowUpRight, GraduationCap, BadgeCheck, Building2 } from 'lucide-react';
import { aboutSections, profile } from '../data';
import { useReveal } from '../useReveal';

function Hero() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-teal-200/50 blur-3xl" />
        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-teal-100/40 blur-3xl" />
      </div>

      <div className="container-wide grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Text block */}
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="eyebrow mb-5">Hồ sơ học tập · Portfolio</p>
          <h1 className="display text-5xl leading-[1.04] sm:text-6xl lg:text-7xl">
            Nguyễn Thái
            <br />
            <span className="gradient-text">Tuấn</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-600">
            Sinh viên Quản Trị Kinh Doanh lưu trữ và nhìn lại toàn bộ quá trình
            học tập — từ kỹ năng nền tảng đến các nhiệm vụ phức tạp hơn.
          </p>

          <dl className="mt-8 grid gap-3 sm:grid-cols-2">
            <InfoRow icon={BadgeCheck} label="Mã sinh viên" value={profile.msv} />
            <InfoRow icon={GraduationCap} label="Ngành học" value={profile.major} />
            <InfoRow icon={Building2} label="Trường" value={profile.school} span />
          </dl>
        </div>

        {/* Avatar */}
        <div
          className={`relative transition-all delay-150 duration-700 ${
            visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-teal-200/60 to-amber-100/40 blur-2xl scale-110" />
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-ink-200/70 bg-white shadow-2xl shadow-ink-900/10">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="eager"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent p-6 pt-20">
              <p className="font-serif text-xl text-ink-50">{profile.name}</p>
              <p className="text-sm text-ink-300">{profile.major}</p>
            </div>
          </div>
          <div className="absolute -right-3 -top-3 hidden h-20 w-20 rotate-6 items-center justify-center rounded-2xl bg-amber-400 text-ink-900 shadow-lg shadow-amber-500/30 sm:flex transition-transform duration-300 hover:rotate-3 hover:scale-105">
            <span className="font-serif text-2xl font-medium">UEB</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  span,
}: {
  icon: typeof BadgeCheck;
  label: string;
  value: string;
  span?: boolean;
}) {
  return (
    <div
      className={`group flex items-center gap-3 rounded-xl border border-ink-200/70 bg-white/70 px-4 py-3 transition-all duration-300 hover:border-teal-300/70 hover:bg-teal-50/50 hover:shadow-sm ${
        span ? 'sm:col-span-2' : ''
      }`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700 transition-transform duration-300 group-hover:scale-110">
        <Icon size={18} />
      </span>
      <div className="min-w-0">
        <dt className="text-xs uppercase tracking-wider text-ink-400">{label}</dt>
        <dd className="truncate text-sm font-medium text-ink-800">{value}</dd>
      </div>
    </div>
  );
}

function Section({ section }: { section: (typeof aboutSections)[number] }) {
  const { ref, visible } = useReveal<HTMLElement>();
  const Icon = section.icon;
  return (
    <section
      id={section.id}
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} border-t border-ink-200/60 py-16 sm:py-20`}
    >
      <div className="container-prose">
        <div className="mb-8 flex items-center gap-4">
          <span className="font-serif text-5xl font-light text-ink-200 sm:text-6xl select-none">
            {section.index}
          </span>
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-700 text-ink-50 shadow-md shadow-teal-900/20">
            <Icon size={20} />
          </span>
        </div>
        <h2 className="display text-3xl sm:text-4xl">{section.title}</h2>

        <div className="mt-6 space-y-4">
          {section.paragraphs.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-ink-700">
              {p}
            </p>
          ))}
        </div>

        {section.highlights && (
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {section.highlights.map((h, i) => (
              <li
                key={i}
                className="group flex items-center gap-3 rounded-xl border border-ink-200/70 bg-white/60 px-4 py-3 transition-all duration-300 hover:border-teal-300 hover:bg-teal-50/60 hover:shadow-sm"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500 transition-transform duration-300 group-hover:scale-[2]" />
                <span className="text-sm font-medium text-ink-700">{h}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function CtaNext({ onClick }: { onClick: () => void }) {
  const { ref, visible } = useReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} border-t border-ink-200/60 py-20`}
    >
      <div className="container-prose text-center">
        <p className="eyebrow mb-4">Tiếp theo</p>
        <h2 className="display text-3xl sm:text-4xl">
          Xem quá trình xử lý của 6 bài học
        </h2>
        <p className="mx-auto mt-4 max-w-md text-ink-600">
          Mỗi bài học là một bước trưởng thành — từ tổ chức tệp tin đến làm việc
          nhóm trực tuyến và tổng hợp sản phẩm.
        </p>
        <button
          onClick={onClick}
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink-950 px-7 py-3.5 text-sm font-medium text-ink-50 shadow-lg shadow-ink-900/20 transition-all duration-300 hover:gap-3 hover:bg-teal-700 hover:shadow-teal-700/30"
        >
          Đi tới Projects
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
    </section>
  );
}

export default function AboutPage({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <main>
      <Hero />
      {aboutSections.map((s) => (
        <Section key={s.id} section={s} />
      ))}
      <CtaNext onClick={() => onNavigate('/projects')} />
      <div className="container-prose pb-6 text-right">
        <button
          onClick={() => onNavigate('/projects')}
          className="link-underline inline-flex items-center gap-1 text-sm text-teal-700 hover:text-teal-800"
        >
          Xem quá trình xử lý của 6 bài học <ArrowUpRight size={14} />
        </button>
      </div>
    </main>
  );
}
