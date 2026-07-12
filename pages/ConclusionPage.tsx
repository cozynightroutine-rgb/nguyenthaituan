import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { reflections, closingQuote, profile } from '../data';
import { useReveal } from '../useReveal';

function Hero() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-20 h-72 w-96 rounded-full bg-amber-200/35 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-80 rounded-full bg-teal-200/40 blur-3xl" />
      </div>
      <div
        ref={ref}
        className={`container-prose text-center transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <p className="eyebrow mb-5">Conclusion · Nhìn lại quá trình</p>
        <h1 className="display text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
          Mỗi bài học
          <br />
          <span className="gradient-text">là một bước trưởng thành</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
          Nhìn lại sáu bài học, mình thấy rõ hơn cách tư duy, kỹ năng và phong
          cách làm việc của mình đã thay đổi.
        </p>
      </div>
    </section>
  );
}

function QuoteBlock() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const QuoteIcon = closingQuote.icon;
  return (
    <section className="py-12 sm:py-16">
      <div
        ref={ref}
        className={`container-prose reveal ${visible ? 'is-visible' : ''}`}
      >
        <figure className="relative overflow-hidden rounded-3xl border border-teal-900/20 bg-gradient-to-br from-teal-800 to-teal-950 p-8 text-center shadow-xl shadow-teal-900/20 sm:p-14">
          {/* Decorative blur */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-teal-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" />

          <QuoteIcon
            size={40}
            className="relative mx-auto mb-6 text-teal-300"
            strokeWidth={1.5}
          />
          <blockquote className="relative font-serif text-2xl font-light leading-relaxed text-ink-50 sm:text-3xl">
            "{closingQuote.text}"
          </blockquote>
          <figcaption className="relative mt-6 text-sm uppercase tracking-[0.2em] text-teal-300">
            — {closingQuote.author}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function ReflectionCard({
  item,
  index,
}: {
  item: (typeof reflections)[number];
  index: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const Icon = item.icon;
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} group relative overflow-hidden rounded-3xl border border-ink-200/70 bg-white/70 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg hover:shadow-ink-900/5`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Hover accent */}
      <div className="absolute left-0 top-0 h-1 w-0 rounded-t-3xl bg-gradient-to-r from-teal-500 to-teal-300 transition-all duration-500 group-hover:w-full" />

      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700 transition-all duration-500 group-hover:bg-teal-100 group-hover:scale-110">
          <Icon size={20} />
        </span>
        <h3 className="font-serif text-xl font-medium text-ink-900">
          {item.title}
        </h3>
      </div>
      <p className="mt-4 text-base leading-relaxed text-ink-600">{item.body}</p>
    </div>
  );
}

function Outro({ onNavigate }: { onNavigate: (href: string) => void }) {
  const { ref, visible } = useReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} border-t border-ink-200/60 py-20`}
    >
      <div className="container-prose text-center">
        <p className="eyebrow mb-4">Cảm ơn đã đọc</p>
        <h2 className="display text-3xl sm:text-4xl">
          Hồ sơ này sẽ tiếp tục cập nhật
        </h2>
        <p className="mx-auto mt-4 max-w-md text-ink-600">
          Mình sẽ bổ sung thêm bài học và dự án mới khi quá trình học tập tiếp
          diễn. Quay lại trang đầu để xem lại giới thiệu, hoặc xem lại sáu bài học.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('/')}
            className="group inline-flex items-center gap-2 rounded-full bg-ink-950 px-6 py-3 text-sm font-medium text-ink-50 shadow-lg transition-all duration-300 hover:gap-3 hover:bg-teal-700"
          >
            Về trang chủ
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
          <button
            onClick={() => onNavigate('/projects')}
            className="group inline-flex items-center gap-2 rounded-full border border-ink-300 px-6 py-3 text-sm font-medium text-ink-700 transition-all duration-300 hover:border-teal-500 hover:text-teal-700"
          >
            Xem lại Projects
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>

        <div className="mt-14 inline-flex flex-col items-center gap-1 rounded-2xl border border-ink-200/70 bg-white/70 px-8 py-5">
          <p className="font-serif text-lg text-ink-700">{profile.name}</p>
          <p className="text-sm text-ink-400 font-mono">{profile.msv}</p>
          <p className="mt-1 text-xs text-ink-400">{profile.school}</p>
        </div>
      </div>
    </section>
  );
}

export default function ConclusionPage({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <main>
      <Hero />
      <QuoteBlock />
      <section className="pb-8">
        <div className="container-wide grid gap-5 sm:grid-cols-2">
          {reflections.map((r, i) => (
            <ReflectionCard key={r.id} item={r} index={i} />
          ))}
        </div>
      </section>
      <Outro onNavigate={onNavigate} />
    </main>
  );
}
