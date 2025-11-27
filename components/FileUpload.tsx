import React, { useRef, useState } from 'react';
import { UploadIcon } from './Icons';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  disabled: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('audio/')) {
        onFileSelect(file);
      } else {
        alert("Please upload a valid audio file.");
      }
    }
  };

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative overflow-hidden group cursor-pointer
        w-full max-w-2xl mx-auto h-64
        border-2 border-dashed rounded-3xl
        flex flex-col items-center justify-center text-center
        transition-all duration-300 ease-out
        ${disabled 
          ? 'opacity-50 cursor-not-allowed border-slate-200 dark:border-slate-700' 
          : 'hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10'}
        ${isDragging 
          ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 scale-[1.02]' 
          : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'}
      `}
    >
      <input
        type="file"
        accept="audio/*"
        ref={inputRef}
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled}
      />
      
      <div className="z-10 flex flex-col items-center gap-4 p-6">
        <div className={`
          w-16 h-16 rounded-full flex items-center justify-center
          transition-colors duration-300
          ${isDragging 
            ? 'bg-indigo-600 text-white' 
            : 'bg-indigo-100 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-indigo-500'}
        `}>
          <UploadIcon className="w-8 h-8" />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">
            {isDragging ? 'Drop audio file here' : 'Upload call recording'}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto">
            Drag and drop or click to browse. Supported formats: MP3, WAV, AAC, M4A.
          </p>
        </div>
      </div>
    </div>
  );
};