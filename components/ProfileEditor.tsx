
import React, { useState } from 'react';
import { User } from '../types';
import { X, Camera, Sparkles } from 'lucide-react';

interface ProfileEditorProps {
  user: User;
  onSave: (updatedUser: User) => void;
  onClose: () => void;
  onGenerateBio: () => Promise<string>;
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({ user, onSave, onClose, onGenerateBio }) => {
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [avatar, setAvatar] = useState(user.avatar);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = () => {
    onSave({ ...user, username, bio, avatar });
  };
  
  const handleGenerateBio = async () => {
    setIsGenerating(true);
    const generatedBio = await onGenerateBio();
    setBio(generatedBio);
    setIsGenerating(false);
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 relative animate-fade-in">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold mb-6 text-center">Редактировать профиль</h2>
        
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img src={avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover mb-2" />
            <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
              <Camera size={16} className="text-white" />
            </label>
            <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1">Имя пользователя (@username)</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-400 mb-1">Описание</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={handleGenerateBio}
                disabled={isGenerating}
                className="flex items-center justify-center gap-2 mt-2 text-sm text-blue-400 hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <Sparkles size={16} />
                {isGenerating ? 'Генерация...' : 'Сгенерировать с помощью ИИ'}
            </button>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors">Отмена</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">Сохранить</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;
