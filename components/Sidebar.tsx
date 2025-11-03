
import React from 'react';
import { User, Chat } from '../types';
import { Settings, Search } from 'lucide-react';

interface SidebarProps {
  currentUser: User;
  chats: Chat[];
  activeChat: Chat | null;
  onChatSelect: (chat: Chat) => void;
  onEditProfile: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentUser,
  chats,
  activeChat,
  onChatSelect,
  onEditProfile,
  searchTerm,
  onSearchChange
}) => {
  return (
    <aside className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 bg-gray-900 border-r border-gray-700 flex flex-col">
      <header className="p-4 border-b border-gray-700 flex justify-between items-center">
        <div className="flex items-center gap-3">
            <img src={currentUser.avatar} alt={currentUser.username} className="w-10 h-10 rounded-full object-cover"/>
            <span className="font-semibold">{currentUser.username}</span>
        </div>
        <button onClick={onEditProfile} className="text-gray-400 hover:text-white transition-colors">
            <Settings size={20} />
        </button>
      </header>
      <div className="p-4">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Поиск по @username"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ul>
          {chats.map((chat) => {
            const otherUser = chat.participants.find(p => p.id !== currentUser.id)!;
            const lastMessage = chat.messages[chat.messages.length - 1];
            return (
              <li
                key={chat.id}
                onClick={() => onChatSelect(chat)}
                className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${
                  activeChat?.id === chat.id ? 'bg-blue-600/30' : 'hover:bg-gray-800'
                }`}
              >
                <div className="relative">
                    <img src={otherUser.avatar} alt={otherUser.username} className="w-12 h-12 rounded-full object-cover"/>
                    {otherUser.isOnline && <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-gray-900"></span>}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold truncate">{otherUser.username}</p>
                    <span className="text-xs text-gray-400">
                      {new Date(lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">{lastMessage.text || 'Файл'}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
