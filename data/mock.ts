
import { User, Chat } from '../types';

export const mockUser: User = {
  id: 'user-1',
  username: '@you',
  avatar: 'https://picsum.photos/seed/you/200',
  bio: 'Just a mock user.',
  isOnline: true,
};

const otherUsers: User[] = [
  {
    id: 'user-2',
    username: '@alice',
    avatar: 'https://picsum.photos/seed/alice/200',
    bio: 'Привет! Я Алиса.',
    isOnline: true,
  },
  {
    id: 'user-3',
    username: '@bob',
    avatar: 'https://picsum.photos/seed/bob/200',
    bio: 'Backend разработчик',
    isOnline: false,
  },
  {
    id: 'user-4',
    username: '@charlie',
    avatar: 'https://picsum.photos/seed/charlie/200',
    bio: 'Люблю путешествовать',
    isOnline: true,
  },
];

export const mockChats: Chat[] = [
  {
    id: 'chat-1',
    participants: [mockUser, otherUsers[0]],
    messages: [
      { id: 'msg-1', senderId: 'user-2', text: 'Привет! Как дела?', timestamp: Date.now() - 1000 * 60 * 5 },
      { id: 'msg-2', senderId: 'user-1', text: 'Привет, все отлично! А у тебя?', timestamp: Date.now() - 1000 * 60 * 4 },
      { id: 'msg-3', senderId: 'user-2', text: 'Тоже неплохо. Пойдем завтра в кино?', timestamp: Date.now() - 1000 * 60 * 3 },
    ],
  },
  {
    id: 'chat-2',
    participants: [mockUser, otherUsers[1]],
    messages: [
      { id: 'msg-4', senderId: 'user-3', text: 'Скинь пожалуйста тот файл', timestamp: Date.now() - 1000 * 60 * 60 * 2 },
      { id: 'msg-5', senderId: 'user-1', text: 'Да, конечно. Лови', timestamp: Date.now() - 1000 * 60 * 60 * 1, file: { name: 'project-brief.pdf', size: 123456, url: '#' } },
    ],
  },
  {
    id: 'chat-3',
    participants: [mockUser, otherUsers[2]],
    messages: [
      { id: 'msg-6', senderId: 'user-4', text: 'Видел новый трейлер?', timestamp: Date.now() - 1000 * 60 * 60 * 24 },
    ],
  },
];
