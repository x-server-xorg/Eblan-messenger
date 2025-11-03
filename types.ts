
export interface User {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  isOnline: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  file?: {
    name: string;
    size: number;
    url: string;
  };
}

export interface Chat {
  id: string;
  participants: User[];
  messages: Message[];
}
