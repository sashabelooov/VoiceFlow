import React from 'react';
import { HistoryItem } from '../types';
import { XMarkIcon, TrashIcon, FileAudioIcon, ArchiveBoxIcon, StarIcon } from './Icons';
import { formatDuration } from '../services/audioUtils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onDelete: (e: React.MouseEvent, id: string) => void;
  currentItemId?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  history, 
  onSelect, 
  onDelete,
  currentItemId 
}) => {
  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar Panel */}
      <div 
        className={`
          fixed top-0 left-0 bottom-0 z-50 w-80 
          bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800
          shadow-2xl transform transition-transform duration-300 ease-out
          flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <ArchiveBoxIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Analysis History
          </h2>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 dark:text-slate-500">
              <FileAudioIcon className="w-12 h-12 mb-3 opacity-50" />
              <p className="text-sm font-medium">No saved analyses yet</p>
              <p className="text-xs mt-1">Upload an audio file to start</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {history.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onSelect(item)}
                    className={`
                      w-full text-left p-3 rounded-xl border transition-all duration-200 group relative
                      ${currentItemId === item.id
                        ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 ring-1 ring-indigo-500/20'
                        : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-sm'
                      }
                    `}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h3 className={`text-sm font-semibold truncate pr-6 ${currentItemId === item.id ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-200'}`}>
                        {item.result.fileName || 'Unknown File'}
                      </h3>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>{formatDuration(item.result.duration)}</span>
                      <div className="flex items-center gap-3">
                         <span className="flex items-center gap-1">
                           <StarIcon className="w-3 h-3 text-amber-500" />
                           {item.result.score}
                         </span>
                         <span>{new Date(item.result.timestamp || 0).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => onDelete(e, item.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <p className="text-xs text-center text-slate-400">
            {history.length} {history.length === 1 ? 'item' : 'items'} saved in session
          </p>
        </div>
      </div>
    </>
  );
};