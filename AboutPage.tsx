import { useState, useRef, useCallback } from 'react';
import { supabase, type Lesson, type LessonFile } from '../lib/supabase';
import LessonDetail from './LessonDetail';

type Props = {
  lesson: Lesson;
};

export default function LessonCard({ lesson }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [files, setFiles] = useState<LessonFile[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = useCallback(async () => {
    setLoadingFiles(true);
    const { data, error } = await supabase
      .from('lesson_files')
      .select('*')
      .eq('lesson_id', lesson.id)
      .order('created_at', { ascending: true });
    if (!error) setFiles(data ?? []);
    setLoadingFiles(false);
  }, [lesson.id]);

  const handleToggle = () => {
    const next = !expanded;
    setExpanded(next);
    if (next && files.length === 0 && !loadingFiles) {
      fetchFiles();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const text = await file.text();
    const { error } = await supabase.from('lesson_files').insert({
      lesson_id: lesson.id,
      file_name: file.name,
      file_content: text,
      file_type: file.type || file.name.split('.').pop() || '',
    });

    if (error) {
      alert('Tải lên thất bại: ' + error.message);
    } else {
      await fetchFiles();
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeleteFile = async (fileId: string) => {
    if (!confirm('Xoá file này?')) return;
    const { error } = await supabase.from('lesson_files').delete().eq('id', fileId);
    if (error) {
      alert('Xoá thất bại: ' + error.message);
    } else {
      setFiles((prev) => prev.filter((f) => f.id !== fileId));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-shadow hover:shadow-md">
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
      >
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-slate-800 group-hover:text-sky-700 transition-colors">
            {lesson.title}
          </h2>
          <p className="mt-1 text-sm text-slate-500 line-clamp-1">{lesson.summary}</p>
        </div>
        <div className="flex items-center gap-3 ml-4 shrink-0">
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full transition-colors ${
              expanded
                ? 'bg-sky-100 text-sky-700'
                : 'bg-slate-100 text-slate-600 group-hover:bg-sky-50 group-hover:text-sky-600'
            }`}
          >
            {expanded ? 'Thu gọn' : 'Xem chi tiết'}
          </span>
          <svg
            className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
              expanded ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {expanded && (
        <div className="lesson-detail-enter border-t border-slate-100">
          <LessonDetail
            lesson={lesson}
            files={files}
            loadingFiles={loadingFiles}
            uploading={uploading}
            fileInputRef={fileInputRef}
            onUpload={handleFileUpload}
            onDeleteFile={handleDeleteFile}
          />
        </div>
      )}
    </div>
  );
}
