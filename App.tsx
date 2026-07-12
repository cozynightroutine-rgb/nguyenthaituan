import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ConclusionPage from './pages/ConclusionPage';

type Page = 'about' | 'projects' | 'conclusion';

function getPageId(href: string): Page {
  if (href === '/projects') return 'projects';
  if (href === '/conclusion') return 'conclusion';
  return 'about';
}

export default function App() {
  const [page, setPage] = useState<Page>(() => getPageId(window.location.pathname));

  const navigate = (href: string) => {
    const id = getPageId(href);
    setPage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState({}, '', href);
  };

  useEffect(() => {
    const onPop = () => setPage(getPageId(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return (
    <div className="min-h-screen bg-ink-50 flex flex-col">
      <Navbar current={page} onNavigate={navigate} />
      <div key={page} className="flex-1 page-enter">
        {page === 'about'      && <AboutPage      onNavigate={navigate} />}
        {page === 'projects'   && <ProjectsPage   onNavigate={navigate} />}
        {page === 'conclusion' && <ConclusionPage onNavigate={navigate} />}
      </div>
      <Footer onNavigate={navigate} />
    </div>
  );
}
