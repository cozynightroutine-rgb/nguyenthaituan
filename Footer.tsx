import { navItems, profile } from './data';
import { ArrowUpRight } from 'lucide-react';

export default function Footer({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <footer className="border-t border-ink-200/60 bg-ink-950 text-ink-200">
      <div className="container-wide py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-[1fr_auto]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 text-ink-50 font-serif text-sm font-medium shadow">
                T
              </span>
              <p className="font-serif text-xl font-medium text-ink-50">
                {profile.name}
              </p>
            </div>
            <p className="text-sm text-ink-400 leading-relaxed max-w-xs">
              {profile.major} · {profile.school}
            </p>
            <p className="mt-3 text-xs text-ink-500 font-mono">{profile.msv}</p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-2 sm:items-end">
            <p className="text-xs uppercase tracking-widest text-ink-500 mb-2">Điều hướng</p>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.href)}
                className="group inline-flex items-center gap-1.5 text-sm text-ink-400 transition-colors hover:text-teal-400"
              >
                {item.label}
                <ArrowUpRight
                  size={12}
                  className="opacity-0 -translate-x-1 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                />
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-ink-800 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-ink-600">
            © {new Date().getFullYear()} {profile.name} · Hồ sơ học tập cá nhân
          </p>
          <p className="text-xs text-ink-600">Được xây dựng với React + Vite + Supabase</p>
        </div>
      </div>
    </footer>
  );
}
