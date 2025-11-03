
import React, { useState, useEffect } from 'react';
import { User, Chat, Message } from './types';
import { mockUser, mockChats } from './data/mock';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import ProfileEditor from './components/ProfileEditor';
import { generateBio as fetchGeneratedBio } from './services/geminiService';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>(mockUser);
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    if (chats.length > 0) {
      setActiveChat(chats[0]);
    }
  }, []);

  const handleSendMessage = (text: string, file?: File) => {
    if (!activeChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      text,
      timestamp: Date.now(),
      ...(file && {
        file: {
          name: file.name,
          size: file.size,
          url: URL.createObjectURL(file),
        },
      }),
    };

    const updatedChats = chats.map((chat) =>
      chat.id === activeChat.id
        ? { ...chat, messages: [...chat.messages, newMessage] }
        : chat
    );

    setChats(updatedChats);
    setActiveChat(updatedChats.find(c => c.id === activeChat.id) || null);
  };

  const handleProfileSave = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    setIsEditingProfile(false);
  };
  
  const generateBio = async () => {
      const bio = await fetchGeneratedBio();
      return bio;
  };

  const filteredChats = chats.filter(chat => {
    const otherUser = chat.participants.find(p => p.id !== currentUser.id);
    return otherUser?.username.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex h-screen w-full bg-gray-900 text-white overflow-hidden">
      <Sidebar
        currentUser={currentUser}
        chats={filteredChats}
        activeChat={activeChat}
        onChatSelect={setActiveChat}
        onEditProfile={() => setIsEditingProfile(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <main className="flex-1 flex flex-col bg-gray-800">
        {activeChat ? (
          <ChatWindow
            chat={activeChat}
            currentUser={currentUser}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <p>Выберите чат, чтобы начать общение</p>
          </div>
        )}
      </main>
      {isEditingProfile && (
        <ProfileEditor
          user={currentUser}
          onSave={handleProfileSave}
          onClose={() => setIsEditingProfile(false)}
          onGenerateBio={generateBio}
        />
      )}
    </div>
  );
};

export default App;
