import type { RefObject } from 'react';
import type { Lesson, LessonFile } from '../lib/supabase';

type Props = {
  lesson: Lesson;
  files: LessonFile[];
  loadingFiles: boolean;
  uploading: boolean;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteFile: (fileId: string) => void;
};

export default function LessonDetail({
  lesson,
  files,
  loadingFiles,
  uploading,
  fileInputRef,
  onUpload,
  onDeleteFile,
}: Props) {
  return (
    <div className="px-6 py-6 bg-slate-50/50">
      {/* Existing lesson content */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-5 bg-sky-600 rounded-full" />
          <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
            Nội dung bài học
          </h3>
        </div>
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-700 leading-relaxed whitespace-pre-line">
            {lesson.content}
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          Tài liệu đính kèm
        </span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      {/* Uploaded file content section */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-5 bg-emerald-600 rounded-full" />
            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
              Nội dung file đã tải lên
            </h3>
          </div>
          <label
            className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
              uploading
                ? 'bg-slate-300 text-slate-500 cursor-wait'
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            {uploading ? 'Đang tải...' : 'Tải file lên'}
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.md,.json,.csv,.html,.css,.js,.ts,.tsx,.jsx,.py,.xml,.log,.text"
              onChange={onUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>

        {loadingFiles && (
          <div className="flex items-center gap-2 text-slate-400 text-sm py-4">
            <div className="animate-spin h-4 w-4 border-2 border-slate-300 border-t-slate-500 rounded-full" />
            Đang tải tài liệu...
          </div>
        )}

        {!loadingFiles && files.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-sm border border-dashed border-slate-200 rounded-lg">
            Chưa có file nào được tải lên cho bài học này.
          </div>
        )}

        {!loadingFiles && files.length > 0 && (
          <div className="space-y-3">
            {files.map((file) => (
              <div
                key={file.id}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden fade-in"
              >
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-100">
                  <div className="flex items-center gap-2 min-w-0">
                    <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm font-medium text-slate-700 truncate">
                      {file.file_name}
                    </span>
                    {file.file_type && (
                      <span className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
                        {file.file_type}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => onDeleteFile(file.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors p-1 shrink-0"
                    title="Xoá file"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <div className="px-4 py-3 max-h-80 overflow-y-auto">
                  <pre className="text-sm text-slate-700 whitespace-pre-wrap break-words font-mono leading-relaxed">
                    {file.file_content}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
