import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navItems, profile } from './data';

type Props = {
  current: string;
  onNavigate: (href: string) => void;
};

export default function Navbar({ current, onNavigate }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 24);

      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? Math.round((scrollY / docH) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    onNavigate(href);
    setOpen(false);
  };

  return (
    <>
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 z-[60] h-[2px] bg-gradient-to-r from-teal-600 to-teal-400 transition-all duration-100"
        style={{ width: `${progress}%` }}
      />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ink-50/90 backdrop-blur-md border-b border-ink-200/60 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-wide flex h-16 items-center justify-between sm:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNav('/')}
            className="group flex items-center gap-3"
            aria-label="Về trang chủ"
          >
            <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-teal-700 text-ink-50 font-serif text-sm font-medium shadow-md ring-2 ring-teal-700/20 transition-all duration-300 group-hover:scale-105 group-hover:ring-teal-500/40">
              T
            </span>
            <span className={`hidden font-serif text-base font-medium transition-colors duration-300 sm:block ${scrolled ? 'text-ink-900' : 'text-ink-800'}`}>
              {profile.name}
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 sm:flex">
            {navItems.map((item) => {
              const active = current === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.href)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    active
                      ? 'text-teal-700'
                      : scrolled
                      ? 'text-ink-600 hover:text-ink-900 hover:bg-ink-100'
                      : 'text-ink-700 hover:text-ink-900 hover:bg-white/50'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-4 -bottom-px h-0.5 rounded-full bg-teal-600 animate-fade-in" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile burger */}
          <button
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors sm:hidden ${
              scrolled ? 'text-ink-700 hover:bg-ink-100' : 'text-ink-800 hover:bg-white/50'
            }`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Mở menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile drawer */}
        {open && (
          <div className="border-t border-ink-200/60 bg-ink-50/95 backdrop-blur-md animate-slide-down sm:hidden">
            <div className="container-wide flex flex-col gap-1 py-3">
              {navItems.map((item) => {
                const active = current === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.href)}
                    className={`rounded-xl px-4 py-3 text-left text-base font-medium transition-colors ${
                      active
                        ? 'bg-teal-50 text-teal-700'
                        : 'text-ink-700 hover:bg-ink-100'
                    }`}
                  >
                    {item.label}
                    {active && <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-teal-500" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
