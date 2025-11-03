
import React, { useRef, useEffect, useState } from 'react';
import { User, Chat } from '../types';
import Message from './Message';
import MessageInput from './MessageInput';
import { Phone, Video, MoreVertical } from 'lucide-react';
import CallModal from './CallModal';

interface ChatWindowProps {
  chat: Chat;
  currentUser: User;
  onSendMessage: (text: string, file?: File) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat, currentUser, onSendMessage }) => {
  const otherUser = chat.participants.find(p => p.id !== currentUser.id)!;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isCalling, setIsCalling] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [chat.messages]);

  return (
    <div className="flex-1 flex flex-col h-full">
      <header className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <img src={otherUser.avatar} alt={otherUser.username} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <p className="font-semibold">{otherUser.username}</p>
            <p className="text-sm text-gray-400">{otherUser.isOnline ? 'в сети' : 'не в сети'}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-gray-400">
          <button onClick={() => setIsCalling(true)} className="hover:text-white transition-colors"><Phone size={22} /></button>
          <button onClick={() => setIsCalling(true)} className="hover:text-white transition-colors"><Video size={22} /></button>
          <button className="hover:text-white transition-colors"><MoreVertical size={22} /></button>
        </div>
      </header>
      <div className="flex-1 p-6 overflow-y-auto bg-gray-800/50" style={{ backgroundImage: "url('https://i.pinimg.com/originals/85/ec/df/85ecdf1c361109f7955d93b450b5590d.jpg')", backgroundSize: 'cover', backgroundBlendMode: 'overlay'}}>
        <div className="flex flex-col gap-4">
          {chat.messages.map((msg) => (
            <Message key={msg.id} message={msg} isCurrentUser={msg.senderId === currentUser.id} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <MessageInput onSendMessage={onSendMessage} />
       {isCalling && <CallModal user={otherUser} onClose={() => setIsCalling(false)} />}
    </div>
  );
};

export default ChatWindow;
