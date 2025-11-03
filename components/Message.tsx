
import React from 'react';
import { Message as MessageType } from '../types';
import { FileText, Download } from 'lucide-react';

interface MessageProps {
  message: MessageType;
  isCurrentUser: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isCurrentUser }) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  return (
    <div className={`flex items-end gap-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg ${
          isCurrentUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-700 text-white rounded-bl-none'
        }`}
      >
        {message.text && <p className="text-sm break-words">{message.text}</p>}
        {message.file && (
          <a href={message.file.url} download={message.file.name} className="flex items-center gap-3 p-2 bg-black/20 rounded-lg mt-2 hover:bg-black/40 transition-colors">
            <FileText className="text-white" size={32} />
            <div className="flex-1">
              <p className="font-semibold text-sm truncate">{message.file.name}</p>
              <p className="text-xs text-gray-300">{formatFileSize(message.file.size)}</p>
            </div>
            <Download className="text-gray-300" size={20} />
          </a>
        )}
        <p className={`text-xs mt-1 text-right ${isCurrentUser ? 'text-blue-200' : 'text-gray-400'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

export default Message;
