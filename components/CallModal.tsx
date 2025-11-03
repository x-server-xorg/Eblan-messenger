
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { PhoneOff, Mic, MicOff, Video, VideoOff } from 'lucide-react';

interface CallModalProps {
  user: User;
  onClose: () => void;
}

const CallModal: React.FC<CallModalProps> = ({ user, onClose }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-sm p-8 text-center flex flex-col items-center gap-6 animate-fade-in">
        <img src={user.avatar} alt={user.username} className="w-28 h-28 rounded-full object-cover ring-4 ring-green-500/50" />
        <div>
            <h3 className="text-2xl font-bold">{user.username}</h3>
            <p className="text-green-400 mt-1">{formatTime(elapsedTime)}</p>
        </div>

        <div className="flex items-center justify-center gap-6 mt-4">
          <button 
            onClick={() => setIsMuted(!isMuted)} 
            className={`p-4 rounded-full transition-colors ${isMuted ? 'bg-gray-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </button>
          <button 
            onClick={() => setIsCameraOff(!isCameraOff)} 
            className={`p-4 rounded-full transition-colors ${isCameraOff ? 'bg-gray-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            {isCameraOff ? <VideoOff size={24} /> : <Video size={24} />}
          </button>
        </div>
        
        <button 
          onClick={onClose} 
          className="mt-8 flex items-center gap-3 px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
        >
          <PhoneOff size={20} />
          <span>Завершить звонок</span>
        </button>
      </div>
    </div>
  );
};

export default CallModal;
